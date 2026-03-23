'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import { Header } from '@/components/header'
import { HabitCard } from '@/components/habit-card'
import { StatCard } from '@/components/stat-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Target, Zap, TrendingUp, Plus, Loader2 } from 'lucide-react'
import type { Habit } from '@/lib/dateUtils'
import { FreezePopup } from '@/components/freeze-popup'
import { requestNotificationPermission, startReminderScheduler } from '@/lib/notificationService'
import { shouldShowFreezePopup, applyFreeze } from '@/lib/streakUtils'
import { useEffect, useState, useCallback, useRef } from 'react'
import {
  today,
  newHabit,
  calcStreak,
  calcLongest,
  loadHabitsFromFirestore,
  saveHabitToFirestore,
  updateHabitInFirestore,
  deleteHabitFromFirestore,
} from '@/lib/dateUtils'

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [habits, setHabits] = useState<Habit[]>([])
  const [habitsLoading, setHabitsLoading] = useState(false)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('') 
  const [freezeQueue, setFreezeQueue] = useState<Habit[]>([])
const [dismissedFreezeToday] = useState<Set<string>>(() => {
  try {
    return new Set(JSON.parse(sessionStorage.getItem('freezeDismissed') || '[]'))
  } catch { return new Set() }
})
const habitsRef = useRef<Habit[]>([])
const dismissFreezePopup = (habitId: string) => {
  dismissedFreezeToday.add(habitId)
  try {
    sessionStorage.setItem('freezeDismissed', JSON.stringify([...dismissedFreezeToday]))
  } catch (e) { /* ignore */ }
  setFreezeQueue((prev) => prev.slice(1))
}

const handleUseFreeze = async () => {
  if (!freezeQueue.length || !user) return
  const habit = freezeQueue[0]
  const updatedFreezeDates = applyFreeze(habit.freezeDates || [])
  await updateHabitInFirestore(user.uid, habit.id, { freezeDates: updatedFreezeDates })
  setHabits((prev) =>
    prev.map((h) => h.id === habit.id ? { ...h, freezeDates: updatedFreezeDates } : h)
  )
  dismissFreezePopup(habit.id)
}

const handleSkipFreeze = () => {
  if (freezeQueue.length) dismissFreezePopup(freezeQueue[0].id)
}

// Group habits by category
const groupedHabits = habits.reduce<Record<string, Habit[]>>((acc, habit) => {
  const key = habit.category || 'Uncategorized'
  if (!acc[key]) acc[key] = []
  acc[key].push(habit)
  return acc
}, {})
  

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) router.push('/login')
  }, [user, authLoading, router])

  // Load habits from Firestore
  useEffect(() => {
    if (!user) return
    let cancelled = false
    setHabitsLoading(true)
    loadHabitsFromFirestore(user.uid).then((loaded: Habit[]) => {
      if (!cancelled) {
        setHabits(loaded)
        setHabitsLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [user])
  // Keep habitsRef in sync
useEffect(() => {
  habitsRef.current = habits
}, [habits])

// Check freeze popup after habits load
useEffect(() => {
  if (!habits.length) return
  const needFreeze = habits.filter((h) =>
    shouldShowFreezePopup(h, dismissedFreezeToday.has(h.id))
  )
  setFreezeQueue(needFreeze)
}, [habits, dismissedFreezeToday])

// Request notification permission
useEffect(() => {
  if (user) requestNotificationPermission()
}, [user])

// Start reminder scheduler
useEffect(() => {
  if (!user) return
  const stop = startReminderScheduler(() => habitsRef.current)
  return () => stop()
}, [user])

  // Add habit
const addHabit = async () => {
  const n = newName.trim()
  if (!n || !user) return
  const habit = newHabit(n, newCategory || undefined)
  setNewName('')
  setNewCategory('')
  setHabits((prev) => [...prev, habit])
  await saveHabitToFirestore(user.uid, habit)
}

  // Log today
  const logHabit = useCallback(async (id: string) => {
    if (!user) return
    const t = today()
    setHabits((prev) => {
      const updated = prev.map((h) =>
        h.id === id && !h.log.includes(t)
          ? { ...h, log: [...h.log, t] }
          : h
      )
      const updatedHabit = updated.find((h) => h.id === id)
      if (updatedHabit) saveHabitToFirestore(user.uid, updatedHabit)
      return updated
    })
  }, [user])

  // Delete habit
  const deleteHabit = useCallback(async (id: string) => {
    if (!user) return
    if (!confirm('Delete this habit?')) return
    await deleteHabitFromFirestore(user.uid, id)
    setHabits((prev) => prev.filter((h) => h.id !== id))
  }, [user])

  // Rename habit
  const renameHabit = useCallback(async (id: string, name: string) => {
    if (!user) return
    await updateHabitInFirestore(user.uid, id, { name })
    setHabits((prev) => prev.map((h) => h.id === id ? { ...h, name } : h))
  }, [user])

  // Stats
  const totalStreak = habits.reduce((sum, h) => sum + calcStreak(h.log, h.freezeDates), 0)
  const completedToday = habits.filter((h) => h.log.includes(today())).length
  const completionRate = habits.length ? Math.round((completedToday / habits.length) * 100) : 0
  const bestStreak = habits.reduce((m, h) => Math.max(m, calcLongest(h.log)), 0)

  const stats = [
    { title: 'Total Streaks', value: totalStreak, icon: Flame, description: 'Combined streak days' },
    { title: 'Habits Completed', value: `${completionRate}%`, icon: Target, description: "Today's completion rate" },
    { title: 'Done Today', value: `${completedToday}/${habits.length}`, icon: Zap, description: 'Habits logged today' },
    { title: 'Best Streak', value: bestStreak, icon: TrendingUp, description: 'Your longest streak' },
  ]

  if (authLoading || !user) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )

  return (
  <>
  <div className="min-h-screen bg-background">
      <Header title="HabitFire" />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">

        {/* Welcome */}
        <div className="mb-8 space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.displayName?.split(' ')[0]}!
          </h2>
          <p className="text-muted-foreground">
            {completedToday === habits.length && habits.length > 0
              ? 'All habits done today! You are unstoppable.'
              : `${completedToday} of ${habits.length} habits done today.`}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Add Habit */}
{/* Add Habit */}
<div className="mb-6 flex flex-col gap-3 sm:flex-row">
  <input
    className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
    placeholder="Add a new habit..."
    value={newName}
    onChange={(e) => setNewName(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && addHabit()}
  />
  <select
    className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
    value={newCategory}
    onChange={(e) => setNewCategory(e.target.value)}
  >
    <option value="">No category</option>
    <option value="Health">Health</option>
    <option value="Learning">Learning</option>
    <option value="Wellness">Wellness</option>
    <option value="Tech">Tech</option>
    <option value="Fitness">Fitness</option>
    <option value="Mindfulness">Mindfulness</option>
    <option value="Nutrition">Nutrition</option>
    <option value="Social">Social</option>
    <option value="Finance">Finance</option>
    <option value="Creative">Creative</option>
  </select>
  <Button onClick={addHabit} className="gap-2">
    <Plus className="h-4 w-4" />
    Add
  </Button>
</div>

        {/* Habits */}
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="text-2xl font-semibold">Today's Habits</h3>
            <p className="text-sm text-muted-foreground">
              {habits.length} habits to complete today
            </p>
          </div>

          {habitsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : habits.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-12 text-center">
              <p className="text-muted-foreground text-sm">No habits yet. Add your first one above!</p>
            </div>
          ) : (
            <div className="space-y-8">
  {Object.entries(groupedHabits).map(([category, categoryHabits]) => (
    <div key={category}>
      {/* Category header */}
      <div className="mb-3 flex items-center gap-3">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {category}
        </h4>
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">
          {categoryHabits.filter(h => h.log.includes(today())).length}/{categoryHabits.length} done
        </span>
      </div>

      {/* Habits grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {categoryHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            name={habit.name}
            streak={calcStreak(habit.log, habit.freezeDates)}
            completed={habit.log.includes(today())}
            category={habit.category}
            onLog={() => logHabit(habit.id)}
            onDelete={() => deleteHabit(habit.id)}
            onRename={(name: string) => renameHabit(habit.id, name)}
          />
        ))}
      </div>
    </div>
  ))}
</div>
          )}
        </div>

        {/* Progress Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today</CardTitle>
              <CardDescription>Completion rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-lg font-bold text-primary">{completionRate}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Best Streak</CardTitle>
              <CardDescription>Your longest run</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Days</span>
                  <span className="text-lg font-bold text-primary">{bestStreak}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Math.min(100, (bestStreak / 30) * 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    {/* Freeze popup */}
    {freezeQueue.length > 0 && (
      <FreezePopup
        habitName={freezeQueue[0].name}
        onFreeze={handleUseFreeze}
        onSkip={handleSkipFreeze}
      />
    )}
  </>
  )
}
