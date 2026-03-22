'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/stat-card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function WeeklyPage() {
  const [weekOffset, setWeekOffset] = useState(0)

  // Mock data for the week
  const weeklyData = [
    { day: 'Mon', completed: 3, total: 4, percentage: 75 },
    { day: 'Tue', completed: 4, total: 4, percentage: 100 },
    { day: 'Wed', completed: 2, total: 4, percentage: 50 },
    { day: 'Thu', completed: 3, total: 4, percentage: 75 },
    { day: 'Fri', completed: 4, total: 4, percentage: 100 },
    { day: 'Sat', completed: 3, total: 4, percentage: 75 },
    { day: 'Sun', completed: 2, total: 4, percentage: 50 },
  ]

  const habitData = [
    { habit: 'Exercise', mon: 1, tue: 1, wed: 0, thu: 1, fri: 1, sat: 1, sun: 0 },
    { habit: 'Read', mon: 1, tue: 1, wed: 1, thu: 1, fri: 1, sat: 1, sun: 1 },
    { habit: 'Meditate', mon: 1, tue: 1, wed: 0, thu: 1, fri: 1, sat: 1, sun: 1 },
    { habit: 'Code', mon: 0, tue: 1, wed: 1, thu: 0, fri: 1, sat: 0, sun: 0 },
  ]

  const stats = [
    { title: 'Weekly Completion', value: '75%', icon: TrendingUp, description: 'Average completion rate' },
    { title: 'Days Completed', value: '6/7', icon: TrendingUp, description: 'Days with 100% completion' },
    { title: 'Best Habit', value: 'Reading', icon: TrendingUp, description: '7 days completed' },
    { title: 'Improvement', value: '+15%', icon: TrendingUp, description: 'vs previous week', trend: 15 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Weekly Stats" />
      
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold">Weekly Overview</h2>
          <p className="text-muted-foreground">March 10 - March 16, 2024</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Daily Completion Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daily Completion Rate</CardTitle>
            <CardDescription>Habits completed each day this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  cursor={{ fill: 'var(--primary)/10' }}
                />
                <Bar dataKey="completed" fill="var(--primary)" name="Completed" />
                <Bar dataKey="total" fill="var(--secondary)" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Habit Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Habit Performance</CardTitle>
            <CardDescription>Completion status for each habit this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {habitData.map((habit) => (
                <div key={habit.habit} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{habit.habit}</span>
                    <span className="text-xs text-muted-foreground">
                      {[habit.mon, habit.tue, habit.wed, habit.thu, habit.fri, habit.sat, habit.sun].filter(Boolean).length}/7 days
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                      <div
                        key={day}
                        className={`h-8 w-full rounded-md border ${
                          habit[day as keyof typeof habit]
                            ? 'bg-primary border-primary'
                            : 'bg-secondary/50 border-secondary'
                        }`}
                        title={day}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Trend</CardTitle>
            <CardDescription>Your completion percentage over the past 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { week: 'Week 1', completion: 60 },
                { week: 'Week 2', completion: 65 },
                { week: 'Week 3', completion: 70 },
                { week: 'Week 4', completion: 75 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--primary)', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setWeekOffset(weekOffset - 1)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous Week
          </Button>
          <Link href="/monthly">
            <Button variant="outline">
              View Monthly
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
