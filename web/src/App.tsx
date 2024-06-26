import { useEffect } from "react";

import { Routes } from "./routes.tsx";
import { getConfig } from "./api/config";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

import { save } from "./services/localStorage.service.ts";
import "./App.css";
import { Header } from "./components/Header/Header.tsx";
import { Footer } from "./components/Footer.tsx";
import { SnackbarProvider } from "notistack";
import { LoadingContextProvider } from "./contexts/LoadingContext.tsx";

function App() {
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await getConfig();
        save("config", JSON.stringify(config));
      } catch (error) {
        console.error("Error al obtener la configuración:", error);
      }
    };

    fetchConfig();
  }, []);

  return (
    <LoadingContextProvider>
      <AuthContextProvider>
        <div className="h-screen flex flex-col font-sans">
          <Header />
          <SnackbarProvider />

          <div className="p-8 flex-1">
            <Routes />
          </div>
          <Footer />
        </div>
      </AuthContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
