"use client";

import React, { useEffect, useState } from "react";
import { useSidebarStore } from "@/store/sidebar-store";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppHeader from "@/components/common/app-header";
import AppSidebar from "@/components/common/app-sidebar";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const { mobileOpen } = useSidebarStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-background text-foreground relative flex items-start min-h-screen pb-24 md:pb-0">
        <AppSidebar />
        <div
          className={`mx-auto min-h-[calc(100vh-4rem)] ${mobileOpen
              ? "w-full md:w-[calc(100%-5rem)]"
              : "w-full md:w-[calc(100%-15.3rem)]"
            }`}
        >
          <AppHeader />
          <main>{children}</main>
          {/* <Toaster />
          <Footer /> */}
        </div>
        {/* <MobileFooter />
        <MobileBrowsePanel /> */}
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
          <div className="bg-background text-foreground relative flex items-start min-h-screen pb-24 md:pb-0">
            <AppSidebar />
            <div
              className={`mx-auto min-h-screen ${mobileOpen
                  ? "w-full md:w-[calc(100%-5rem)]"
                  : "w-full md:w-[calc(100%-15.3rem)]"
                }`}
            >
              <AppHeader />
              <main>{children}</main>
              <Toaster />
              {/* <Footer /> */}
            </div>
            {/* <MobileFooter />
            <MobileBrowsePanel /> */}
          </div>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
