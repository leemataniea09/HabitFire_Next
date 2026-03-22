'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Flame, Zap, Trash2, Pencil, Check } from 'lucide-react'

const categoryColors: Record<string, string> = {
  Health:       'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  Learning:     'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Wellness:     'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  Tech:         'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
  Fitness:      'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  Mindfulness:  'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Nutrition:    'bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-300',
  Social:       'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  Finance:      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  Creative:     'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300',
}

interface HabitCardProps {
  name: string
  description?: string
  streak: number
  category?: string
  completed?: boolean
  onLog?: () => void
  onDelete?: () => void
  onRename?: (name: string) => void
}

export function HabitCard({
  name,
  description,
  streak,
  category,
  completed,
  onLog,
  onDelete,
  onRename,
}: HabitCardProps) {
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(name)

  const handleRename = () => {
    if (editName.trim()) {
      onRename?.(editName.trim())
      setEditing(false)
    }
  }

  return (
    <Card className={`transition-all hover:shadow-md ${completed ? 'border-primary' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            {editing ? (
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-primary"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename()
                    if (e.key === 'Escape') setEditing(false)
                  }}
                  autoFocus
                />
                <Button size="sm" onClick={handleRename}>Save</Button>
              </div>
            ) : (
              <CardTitle className="text-lg">{name}</CardTitle>
            )}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {category && (
  <Badge
    variant="secondary"
    className={`ml-2 ${categoryColors[category] || 'bg-gray-100 text-gray-700'}`}
  >
    {category}
  </Badge>
)}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">{streak} day streak</span>
          </div>
          <div className="flex items-center gap-1">
            {!editing && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditing(true)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant={completed ? 'secondary' : 'default'}
              disabled={completed}
              onClick={onLog}
              className="gap-1"
            >
              {completed ? (
                <><Check className="h-3.5 w-3.5" /> Done</>
              ) : 'Log Today'}
            </Button>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}