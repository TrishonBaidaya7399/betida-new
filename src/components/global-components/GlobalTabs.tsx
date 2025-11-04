"use client";

import type { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface TabProps {
  value: string;
  label: string;
  ariaLabel?: string;
}

export type TabVariant = "default" | "border";

export function GlobalTabs({
  value,
  onValueChange,
  data,
  extraContent,
  variant = "default",
}: {
  value: string;
  onValueChange: (value: string) => void;
  data: TabProps[];
  extraContent?: ReactNode;
  variant?: TabVariant;
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList
        className={cn(
          "flex gap-6 p-1 rounded-lg bg-background-2 overflow-x-auto tab-scrollbar h-11 items-center",
          variant === "border" && "gap-0"
        )}
      >
        {data.map((tab) => {
          const isActive = value === tab.value;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-all duration-300",
                "data-[state=active]:shadow-none border-none bg-transparent!",
                // DEFAULT VARIANT (Buttons)
                variant === "default" && [
                  "rounded-md",
                  isActive
                    ? "bg-background-4 text-foreground"
                    : "bg-background-2 text-muted-foreground hover:bg-background-3",
                ],
                // BORDER VARIANT (Solid primary underline)
                variant === "border" && [
                  "bg-transparent rounded-none border-b-2 border-transparent pb-3",
                  isActive
                    ? "text-foreground border-primary"
                    : "text-muted-foreground hover:text-foreground",
                ]
              )}
            >
              <span className="flex items-center justify-center w-full h-full">
                {tab.label}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {extraContent && (
        <div className="mt-4 flex justify-end">{extraContent}</div>
      )}
    </Tabs>
  );
}
