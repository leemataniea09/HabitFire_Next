'use client'

import { Header } from '@/components/header'
import { HabitCard } from '@/components/habit-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Circle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface DailyLog {
  id: number
  name: string
  completed: boolean
  notes?: string
  color: 'pink' | 'peach' | 'lavender' | 'orange' | 'purple' | 'gold'
  streak: number
  category: string
}

export default function DailyLogPage() {
  const [logs, setLogs] = useState<DailyLog[]>([
    {
      id: 1,
      name: 'Morning Exercise',
      completed: true,
      notes: 'Did 30 mins of running',
      color: 'pink',
      streak: 12,
      category: 'Health',
    },
    {
      id: 2,
      name: 'Read',
      completed: false,
      notes: '',
      color: 'lavender',
      streak: 8,
      category: 'Learning',
    },
    {
      id: 3,
      name: 'Meditation',
      completed: true,
      notes: 'Morning meditation - felt great',
      color: 'peach',
      streak: 15,
      category: 'Wellness',
    },
    {
      id: 4,
      name: 'Code Practice',
      completed: false,
      notes: '',
      color: 'purple',
      streak: 5,
      category: 'Tech',
    },
  ])

  const toggleHabit = (id: number) => {
    setLogs(logs.map(log => log.id === id ? { ...log, completed: !log.completed } : log))
  }

  const completedCount = logs.filter(log => log.completed).length
  const completionPercentage = Math.round((completedCount / logs.length) * 100)

  return (
    <div className="min-h-screen bg-background">
      <Header title="Daily Log" />
      
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        {/* Back Button */}
        <Link href="/" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Date and Progress */}
        <div className="mb-8 space-y-4">
          <div>
            <h2 className="text-3xl font-bold">Today's Checklist</h2>
            <p className="text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Progress Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Today's Progress</span>
                  <span className="text-lg font-bold text-primary">{completionPercentage}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">{completedCount} of {logs.length} habits completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Habits List */}
        <div className="space-y-4 mb-8">
          {logs.map((log) => (
            <Card key={log.id} className={`transition-all ${log.completed ? 'border-primary/50 bg-primary/5' : ''}`}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleHabit(log.id)}
                      className="mt-1 flex-shrink-0 focus:outline-none"
                    >
                      {log.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${log.completed ? 'text-muted-foreground line-through' : ''}`}>
                        {log.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="inline-block rounded-full px-2 py-1 text-xs bg-secondary">{log.category}</span>
                        <span>Streak: <strong className="text-primary">{log.streak}</strong> days</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  {log.completed || log.notes ? (
                    <div className="pl-10 space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Notes</label>
                      <Textarea
                        placeholder="Add notes about this habit..."
                        defaultValue={log.notes}
                        className="min-h-20 resize-none text-sm"
                      />
                    </div>
                  ) : (
                    <div className="pl-10">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => toggleHabit(log.id)}
                      >
                        Mark as Complete
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
            <CardDescription>You're doing great!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              You've completed <strong>{completedCount} out of {logs.length}</strong> habits today. {
                completionPercentage === 100 ? '🎉 Perfect day!' : 
                completionPercentage >= 75 ? 'Almost there!' :
                'Keep going!'
              }
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
