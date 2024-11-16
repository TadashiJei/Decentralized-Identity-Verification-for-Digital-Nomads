import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { retrieveLaunchParams } from "@telegram-apps/sdk-react"
import { Root } from "@/components/Root"
import { EnvUnsupported } from "@/components/EnvUnsupported"
import { init } from "@/init"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

const renderApp = async () => {
  try {
    await init()
    const params = await retrieveLaunchParams({
      botId: process.env.VITE_TELEGRAM_BOT_ID || ''
    })
    
    root.render(
      <StrictMode>
        {params ? <Root /> : <EnvUnsupported />}
      </StrictMode>
    )
  } catch (error) {
    console.error('Failed to initialize app:', error)
    root.render(
      <StrictMode>
        <EnvUnsupported />
      </StrictMode>
    )
  }
}

renderApp()