"use client"

import { FC, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Smartphone } from 'lucide-react'

export const EnvUnsupported: FC = () => {
  const [platform, isDark] = useMemo(() => {
    let platform = 'device';
    let isDark = false;

    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('android')) {
        platform = 'Android';
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        platform = 'iOS';
      }

      isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return [platform, isDark];
  }, []);

  return (
    <div className={`container mx-auto p-4 min-h-screen flex items-center justify-center ${isDark ? 'dark' : ''}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Environment Not Supported</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Unsupported Environment</AlertTitle>
            <AlertDescription>
              This application is designed to run within the Telegram environment.
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Smartphone className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-lg font-medium">
              Please open this app using Telegram on your {platform}.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}