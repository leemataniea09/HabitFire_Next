'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function MonthlyPage() {
  const [month, setMonth] = useState(new Date(2024, 2)) // March 2024
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  
  // Mock completion data for the month
  const completionData: Record<number, number> = {
    1: 100, 2: 75, 3: 100, 4: 50, 5: 100,
    6: 100, 7: 75, 8: 100, 9: 100, 10: 75,
    11: 100, 12: 100, 13: 75, 14: 100, 15: 100,
    16: 75, 17: 100, 18: 50, 19: 100, 20: 100,
    21: 75, 22: 100, 23: 100, 24: 75, 25: 100,
    26: 100, 27: 75, 28: 100, 29: 100, 30: 75,
    31: 100,
  }

  const getCompletionColor = (percentage: number) => {
    if (percentage === 100) return 'bg-primary text-primary-foreground'
    if (percentage >= 75) return 'bg-primary/75 text-primary-foreground'
    if (percentage >= 50) return 'bg-primary/50 text-primary-foreground'
    return 'bg-secondary text-secondary-foreground'
  }

  const monthDays = Array.from({ length: firstDay }).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))
  
  const avgCompletion = Math.round(Object.values(completionData).reduce((a, b) => a + b) / daysInMonth)
  const perfectDays = Object.values(completionData).filter(v => v === 100).length

  const prevMonth = () => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))
  const nextMonth = () => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))

  return (
    <div className="min-h-screen bg-background">
      <Header title="Monthly Calendar" />
      
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">{month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
          <p className="text-muted-foreground">View your completion status for the entire month</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{avgCompletion}%</p>
              <p className="text-xs text-muted-foreground mt-1">Across all days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Perfect Days</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{perfectDays}</p>
              <p className="text-xs text-muted-foreground mt-1">100% completion</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Days</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{daysInMonth}</p>
              <p className="text-xs text-muted-foreground mt-1">In the month</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Click on any day to see details</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day, index) => (
                  <div key={index}>
                    {day ? (
                      <button
                        className={`w-full aspect-square rounded-lg font-semibold text-sm transition-all hover:shadow-md ${getCompletionColor(completionData[day as number])}`}
                        title={`${day} - ${completionData[day as number]}% completed`}
                      >
                        {day}
                      </button>
                    ) : (
                      <div className="w-full aspect-square rounded-lg bg-muted/20"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Completion Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-primary"></div>
                <span className="text-sm">100% Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-primary/75"></div>
                <span className="text-sm">75% Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-primary/50"></div>
                <span className="text-sm">50% Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-secondary"></div>
                <span className="text-sm">Below 50%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
