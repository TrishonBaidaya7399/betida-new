"use client";

import { Suspense } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import Image from "next/image";

const fiatCurrencies = [
  { code: "TRY", flag: "tr", name: "Turkish Lira", symbol: "₺" },
  { code: "USD", flag: "us", name: "US Dollar", symbol: "$" },
  { code: "BRL", flag: "br", name: "Brazilian Real", symbol: "R$" },
  { code: "INR", flag: "in", name: "Indian Rupee", symbol: "₹" },
  { code: "EUR", flag: "eu", name: "Euro", symbol: "€" },
  { code: "RUB", flag: "ru", name: "Russian Ruble", symbol: "₽" },
  { code: "NGN", flag: "ni", name: "Nigerian Naira", symbol: "₦" },
  { code: "IDR", flag: "id", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "BDT", flag: "bd", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "PHP", flag: "ph", name: "Philippine Peso", symbol: "₱" },
  { code: "VND", flag: "vn", name: "Vietnamese Dong", symbol: "₫" },
  { code: "THB", flag: "th", name: "Thai Baht", symbol: "฿" },
  { code: "KZT", flag: "kz", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "MAD", flag: "ma", name: "Moroccan Dirham", symbol: "د.م." },
  { code: "ZAR", flag: "za", name: "South African Rand", symbol: "R" },
  { code: "PLN", flag: "pl", name: "Polish Złoty", symbol: "zł" },
  { code: "CUP", flag: "cu", name: "Cuban Peso", symbol: "$" },
  { code: "KRW", flag: "kr", name: "South Korean Won", symbol: "₩" },
  { code: "JPY", flag: "jp", name: "Japanese Yen", symbol: "¥" },
];

interface ViewInCurrencyModalContentProps {
  selected: string;
  onSelect: (code: string, symbol: string) => void;
}

function ViewInCurrencyModalContent({
  selected,
  onSelect,
}: ViewInCurrencyModalContentProps) {
  const t = useTranslations("header");

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {t("viewInCurrencyDesc") ||
          "Select the desired currency to display. The currencies will be shown in approximated values."}
      </p>

      <Command className="rounded-lg bg-transparent">
        <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg">
          <CommandInput
            placeholder={t("search") || "Search"}
            className="h-8 text-sm placeholder:text-foreground/50 focus:ring-0"
          />
        </div>
        <CommandList className="max-h-100">
          <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
            {t("noResults") || "No currency found"}
          </CommandEmpty>
          <div className="flex flex-col gap-1">
            {fiatCurrencies.map((currency) => {
              const isSelected = currency.code === selected;
              return (
                <CommandItem
                  key={currency.code}
                  value={currency.code}
                  onSelect={() => onSelect(currency?.code, currency?.symbol)}
                  className={`
                  flex items-center justify-between px-4 py-2 cursor-pointer
                  ${isSelected ? "bg-accent" : "hover:bg-foreground/5"}
                `}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 overflow-hidden">
                      <Image
                        src={`https://flagcdn.com/80x60/${currency.flag}.png`}
                        alt={currency.name}
                        width={16}
                        height={12}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {currency.code}
                    </span>
                  </div>
                  {isSelected ? (
                    <span className="size-6 rounded0full border bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-background" />
                    </span>
                  ) : (
                    <span className="size-6 rounded0full bg-background border rounded-full" />
                  )}
                </CommandItem>
              );
            })}
          </div>
        </CommandList>
      </Command>
    </div>
  );
}

export default function ViewInCurrencyModalContentWrapper(
  props: ViewInCurrencyModalContentProps
) {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <ViewInCurrencyModalContent {...props} />
    </Suspense>
  );
}
