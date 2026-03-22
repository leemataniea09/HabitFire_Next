'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) router.push('/')
  }, [user, loading, router])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-3">
        <div className="text-4xl">✦</div>
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8 text-center">

        {/* Logo */}
        <div className="space-y-3">
          <div className="text-5xl">✦</div>
          <h1 className="text-3xl font-bold tracking-tight">HabitFire</h1>
          <p className="text-muted-foreground text-sm">
            she believed she could, so she did.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Sign in */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Sign in to sync your habits across all devices
          </p>

          <Button
            onClick={signInWithGoogle}
            className="w-full gap-3"
            size="lg"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Your data is private and securely stored in the cloud.
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l6-6C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 10-1.9 13.7-5l-6.3-5.2C29.6 35.6 26.9 36.5 24 36.5c-5.2 0-9.6-3.5-11.2-8.3l-6.5 5C9.5 39.6 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.8l6.3 5.2C41.3 35.3 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
    </svg>
  )
}