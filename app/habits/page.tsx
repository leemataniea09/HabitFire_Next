'use client'

import { Header } from '@/components/header'
import { HabitCard } from '@/components/habit-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search } from 'lucide-react'
import { useState } from 'react'

export default function HabitsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data - replace with real data later
  const allHabits = [
    { id: 1, name: 'Morning Exercise', description: '30 min workout', streak: 12, category: 'Health', color: 'pink' as const },
    { id: 2, name: 'Read', description: '30 pages daily', streak: 8, category: 'Learning', color: 'lavender' as const },
    { id: 3, name: 'Meditation', description: '10 min mindfulness', streak: 15, category: 'Wellness', color: 'peach' as const },
    { id: 4, name: 'Code Practice', description: '1 hour coding', streak: 5, category: 'Tech', color: 'purple' as const },
    { id: 5, name: 'Journal', description: '5 min journaling', streak: 10, category: 'Mental', color: 'gold' as const },
    { id: 6, name: 'Drink Water', description: '8 glasses daily', streak: 20, category: 'Health', color: 'orange' as const },
  ]

  const categories = ['all', 'Health', 'Learning', 'Wellness', 'Tech', 'Mental']

  const filteredHabits = allHabits.filter(habit => {
    const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || habit.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header title="My Habits" />
      
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Manage Your Habits</h2>
              <p className="text-muted-foreground">Create, edit, and track all your habits</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  New Habit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Habit</DialogTitle>
                  <DialogDescription>Add a new habit to track and build</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Habit Name</Label>
                    <Input id="name" placeholder="e.g., Morning Run" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="e.g., 5km morning run" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="learning">Learning</SelectItem>
                        <SelectItem value="wellness">Wellness</SelectItem>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="mental">Mental</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Create Habit</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search habits..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Habits Grid */}
        {filteredHabits.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredHabits.map((habit) => (
              <div key={habit.id} className="cursor-pointer">
                <HabitCard {...habit} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-lg font-medium text-muted-foreground">No habits found</p>
              <p className="text-sm text-muted-foreground">Create your first habit to get started</p>
            </CardContent>
          </Card>
        )}

        {/* Category Stats */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{allHabits.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Habits being tracked</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{allHabits.filter(h => h.streak > 0).length}</p>
              <p className="text-xs text-muted-foreground mt-1">With current streaks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Average Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{Math.round(allHabits.reduce((sum, h) => sum + h.streak, 0) / allHabits.length)}</p>
              <p className="text-xs text-muted-foreground mt-1">Days average</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
