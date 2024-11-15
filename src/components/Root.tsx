import { FC, useEffect, useState } from 'react'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'

export const Root: FC = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initApp = async () => {
      try {
        await retrieveLaunchParams()
        setIsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize app:', error)
      }
    }

    initApp()
  }, [])

  if (!isInitialized) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Digital Nomad Identity Verification</h1>
      {/*main app content here */}
    </div>
  )
}