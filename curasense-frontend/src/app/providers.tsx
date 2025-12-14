"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/motion";
import { AuthProvider } from "@/lib/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
            },
            classNames: {
              toast: "backdrop-blur-xl",
            },
          }}
          richColors
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
