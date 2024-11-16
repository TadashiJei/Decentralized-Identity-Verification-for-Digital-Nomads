import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Root } from "./components/Root";
import { EnvUnsupported } from "./components/EnvUnsupported";
import { init } from "./init";
import { useState, useEffect } from "react";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

const [isLoading, setIsLoading] = useState(true); // Initialize outside useEffect
const [error, setError] = useState<Error | null>(null); // Initialize outside useEffect

const renderApp = async () => {
  useEffect(() => {
    const initApp = async () => {
      try {
        await init();
        const params = await retrieveLaunchParams();
        root.render(
          <StrictMode>
            {params ? <Root /> : <EnvUnsupported />}
          </StrictMode>
        );
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return null; // Return null to avoid unnecessary rendering
};

renderApp();
