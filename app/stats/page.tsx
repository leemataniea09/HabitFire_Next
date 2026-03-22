'use client'

import { Header } from '@/components/header'
import { StatCard } from '@/components/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Flame, Target, TrendingUp, Calendar, Zap, Award } from 'lucide-react'

export default function StatsPage() {
  const habitCompletion = [
    { name: 'Exercise', value: 95, fill: 'var(--primary)' },
    { name: 'Reading', value: 88, fill: 'var(--accent)' },
    { name: 'Meditation', value: 92, fill: 'var(--secondary)' },
    { name: 'Coding', value: 75, fill: 'var(--muted)' },
  ]

  const monthlyTrend = [
    { month: 'Jan', completion: 65 },
    { month: 'Feb', completion: 72 },
    { month: 'Mar', completion: 78 },
    { month: 'Apr', completion: 85 },
  ]

  const categoryStats = [
    { name: 'Health', habits: 3, completion: 88 },
    { name: 'Learning', habits: 2, completion: 85 },
    { name: 'Wellness', habits: 2, completion: 90 },
    { name: 'Tech', habits: 1, completion: 75 },
  ]

  const stats = [
    { title: 'Total Habits', value: 8, icon: Target, description: 'Habits being tracked' },
    { title: 'Current Streaks', value: 24, icon: Flame, description: 'Average streak days', trend: 15 },
    { title: 'This Month', value: '82%', icon: TrendingUp, description: 'Completion rate' },
    { title: 'Days Tracked', value: 127, icon: Calendar, description: 'Since you started' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Statistics" />
      
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold">Your Habit Statistics</h2>
          <p className="text-muted-foreground">Comprehensive view of your habit tracking progress</p>
        </div>

        {/* Main Stats */}
        <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-8 mb-8 md:grid-cols-2">
          {/* Habit Completion Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Habit Completion Rates</CardTitle>
              <CardDescription>Success rate for each habit</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={habitCompletion}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {habitCompletion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Completion by habit category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="completion" fill="var(--primary)" name="Completion Rate" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Trend Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Completion Trend</CardTitle>
            <CardDescription>Your progress over the last 4 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--primary)', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Detailed statistics for each category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((category) => (
                <div key={category.name} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex-1">
                    <h4 className="font-semibold">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.habits} habit{category.habits !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${category.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold w-12 text-right">{category.completion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
