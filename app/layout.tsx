"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/'

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              {!isLoginPage && (
                <header className="bg-background border-b">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                      <MainNav />
                      <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <UserNav />
                      </div>
                    </div>
                  </div>
                </header>
              )}
              <main className="flex-grow">
                <div className={`max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ${isLoginPage ? 'px-4' : ''}`}>
                  {children}
                </div>
              </main>
              <footer className="bg-background border-t py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
                  © 2023 LMS. All rights reserved.
                </div>
              </footer>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

