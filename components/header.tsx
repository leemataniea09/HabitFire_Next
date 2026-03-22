import { ThemeToggle } from '@/components/theme-toggle'
import { Link } from 'lucide-react'

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Link className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-balance">{title}</h1>
            <p className="text-sm text-muted-foreground">Build better habits</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
