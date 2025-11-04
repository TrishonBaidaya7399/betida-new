"use client";

import { Suspense, useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Türkçe", value: "tr" },
  { label: "Deutsch", value: "de" },
  { label: "Español", value: "es" },
] satisfies { label: string; value: string }[];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const currentOption =
    languageOptions.find((o) => o.value === locale) ?? languageOptions[0];

  const handleSelect = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Suspense fallback={<div className="bg-gray rounded-lg size-10" />}>
          <Button
            variant="gray"
            size="icon"
            aria-label={`Current language: ${currentOption.label}`}
          >
            <Globe className="w-4 h-4 text-foreground/70" />
            <span className="sr-only">{currentOption.label}</span>
          </Button>
        </Suspense>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 p-1 bg-card border-border shadow-lg rounded-lg"
      >
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`
              flex items-center justify-between px-3 py-2 text-sm font-medium cursor-pointer
              rounded-md transition-colors
              ${
                option.value === locale
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50 text-foreground"
              }
            `}
          >
            <span>{option.label}</span>
            {option.value === locale && (
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
