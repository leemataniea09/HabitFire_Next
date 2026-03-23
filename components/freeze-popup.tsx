'use client'

import { Button } from '@/components/ui/button'

interface FreezePopupProps {
  habitName: string
  onFreeze: () => void
  onSkip: () => void
}

export function FreezePopup({ habitName, onFreeze, onSkip }: FreezePopupProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.6)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }}>
      <div className="bg-background border border-border rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
        <div className="text-5xl">🧊</div>
        <h2 className="text-xl font-bold">You missed yesterday</h2>
        <p className="text-muted-foreground text-sm">
          You didn't complete{' '}
          <span className="text-primary font-semibold">"{habitName}"</span>{' '}
          yesterday. Use a streak freeze to keep your streak alive?
        </p>
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Your streak will be protected for 1 day
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onSkip}>
            Skip
          </Button>
          <Button className="flex-2" onClick={onFreeze}>
            🧊 Use Freeze
          </Button>
        </div>
      </div>
    </div>
  )
}