'use client'

import { useState } from 'react'
import { AlertCircle, LayoutDashboard, Settings, Users } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Dashboard() {
  const [showEnvironmentCheck, setShowEnvironmentCheck] = useState(true)
  const [isCorrectEnvironment, setIsCorrectEnvironment] = useState(false)

  // Function to check if we're in Telegram environment
  const checkEnvironment = () => {
    // You can implement your actual environment check here
    return window.Telegram !== undefined
  }

  // Toggle environment check
  const toggleEnvironmentCheck = () => {
    setShowEnvironmentCheck(!showEnvironmentCheck)
    if (!showEnvironmentCheck) {
      setIsCorrectEnvironment(checkEnvironment())
    }
  }

  if (showEnvironmentCheck && !isCorrectEnvironment) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-2xl space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Environment Not Supported</AlertTitle>
            <AlertDescription>
              This application is designed to run within the Telegram environment.
              Please open this app using Telegram on your device.
            </AlertDescription>
          </Alert>
          <Button onClick={toggleEnvironmentCheck} variant="outline">
            Continue Anyway
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-bold">Digital Nomads Identity Verification</h1>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={toggleEnvironmentCheck}
          >
            Toggle Environment Check
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r bg-muted/40 lg:block">
          <nav className="space-y-2 p-4">
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg bg-secondary px-3 py-2 text-secondary-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-secondary"
            >
              <Users className="h-4 w-4" />
              <span>Verification</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-secondary"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>Your current verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Pending</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Required documentation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2/3 Submitted</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>Actions needed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Submit ID</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}