"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useLocale } from "next-intl"

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Türkçe", value: "tr" },
  { label: "Deutsch", value: "de" },
  { label: "Español", value: "es" },
] satisfies { label: string; value: string }[]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const currentOption = languageOptions.find((o) => o.value === locale) ?? languageOptions[0]

  const handleSelect = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale })
      router.refresh()
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="gray"
          className="bg-background-2 justify-between"
          aria-label={`Current language: ${currentOption.label}`}
        >
          {currentOption.label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="end">
        {languageOptions.map((option) => (
          <div
            key={option.value}
            className={`
              px-3 py-2 cursor-pointer text-sm font-medium transition-colors
              hover:bg-background-2
              ${option.value === locale ? "bg-background-2/80" : ""}
            `}
            onClick={() => handleSelect(option.value)}
            role="option"
            aria-selected={option.value === locale}
          >
            {option.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}