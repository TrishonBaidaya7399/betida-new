"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useWalletStore } from "@/store/wallet-store";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import GlobalModal from "./global-modal/global-modal";
import ViewInCurrencyModalContentWrapper from "../modals/view-in-currency-modal";

interface Currency {
  value: string;
  label: string;
  icon: string;
  amount: string;
  balance?: string;
}

const currencies: Currency[] = [
  {
    value: "BTC",
    label: "Bitcoin",
    icon: "/icons/bit-coin-svg.svg",
    amount: "0.00",
    balance: "0",
  },
  {
    value: "ETH",
    label: "Ethereum",
    icon: "/icons/ethereum-svg.svg",
    amount: "0.00",
    balance: "0",
  },
  {
    value: "USDT",
    label: "USD Tether",
    icon: "/icons/usdt-svg.svg",
    amount: "0.00",
    balance: "0",
  },
  {
    value: "LTC",
    label: "Litecoin",
    icon: "/icons/ltc-svg.svg",
    amount: "0.00",
    balance: "0",
  },
];

export default function GlobalWalletCurrencySelect() {
  const t = useTranslations("header");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState("EUR");
  const [selectedSymbol, setSelectedSymbol] = useState("€");

  const { selectedCurrency, setSelectedCurrency } = useWalletStore();

  useEffect(() => {
    const urlCurrency = searchParams.get("currency");
    if (urlCurrency && urlCurrency !== selectedCurrency) {
      setSelectedCurrency(urlCurrency);
    } else if (!urlCurrency && selectedCurrency !== currencies[0].value) {
      setSelectedCurrency(currencies[0].value);
    }
  }, [searchParams, selectedCurrency, setSelectedCurrency]);

  const selected = currencies.find((c) => c.value === selectedCurrency)!;

  const updateURLAndStore = (value: string) => {
    setSelectedCurrency(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("currency", value);
    router.replace(`?${params.toString()}`, { scroll: false });
    setOpen(false);
  };

  const handleFiatSelect = (code: string, symbol: string) => {
    setSelectedFiat(code);
    setSelectedSymbol(symbol);
    setModalOpen(false);
    toast.success(`Display currency set to ${code}`);
  };

  return (
    <>
      <div className="flex items-stretch h-10 bg-background rounded-lg overflow-hidden p-1.5">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className="flex items-center gap-2 px-3 text-foreground cursor-pointer"
              aria-label="Select currency"
            >
              <Image
                src={selected.icon}
                alt={selected.label}
                width={20}
                height={20}
                className="shrink-0"
              />

              <span className="text-sm font-medium">
                {selectedSymbol} {selected.amount}
              </span>
              <div className="bg-foreground/20 rounded-full flex items-center justify-center size-6">
                <ChevronDown
                  className={`w-4 h-4 text-foreground transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
          </PopoverTrigger>

          <PopoverContent
            className="w-80 border-0 shadow-2xl rounded-xl overflow-hidden  p-0"
            align="end"
            sideOffset={8}
          >
            <Command>
              <div className="flex items-center gap-2 bg-background-2 m-3 rounded-lg">
                <CommandInput
                  placeholder={t("searchCurrency") || "Search currency..."}
                  className="h-8 text-sm placeholder:text-foreground/50 focus:ring-0"
                />
              </div>

              <div className="max-h-96 overflow-y-auto px-3">
                <CommandList>
                  <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
                    {t("noResults") || "No currency found"}
                  </CommandEmpty>
                  <div className="flex flex-col gap-1 pb-2">
                    {currencies.map((currency) => {
                      const isSelected = currency.value === selectedCurrency;

                      return (
                        <CommandItem
                          key={currency.value}
                          value={currency.value}
                          onSelect={(value) => {
                            updateURLAndStore(value);
                          }}
                          className={`
                            flex items-center justify-between px-4 py-1.5 cursor-pointer rounded-none
                            transition-colors
                            ${isSelected ? "bg-accent" : "hover:bg-foreground/5"}
                            `}
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={currency.icon}
                              alt={currency.label}
                              width={28}
                              height={28}
                              className="rounded-full"
                            />
                            <span className="text-sm font-medium text-foreground">
                              {currency.value}
                            </span>
                          </div>
                          <div className="flex flex-col items-end gap-0.5">
                            <span className="text-sm font-medium text-foreground">
                              {selectedSymbol} {currency.amount}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {currency.balance}
                            </span>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </div>
                </CommandList>
              </div>
            </Command>

            <div className="flex items-center justify-between px-4 py-3 bg-background-2 border-t border-border">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary/80 transition-colors"
              >
                <span>{t("viewInCurrency")}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  className="relative w-9 h-5 bg-foreground/20 rounded-full transition-colors data-[state=on]:bg-primary"
                  data-state="off"
                  aria-label="Toggle hide small balances"
                >
                  <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-background rounded-full transition-transform data-[state=on]:translate-x-4" />
                </button>
                <span className="text-xs text-foreground/70">
                  {t("hideSmall")}
                </span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {/* === DEPOSIT BUTTON === */}
        <Button
          variant="cyanGradient"
          size="sm"
          className="h-full px-4 text-sm font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            toast.info("Deposit feature is coming soon!");
          }}
        >
          {t("depositLink")}
        </Button>
      </div>
      {/* === GLOBAL MODAL === */}
      <GlobalModal
        title={t("viewInCurrency")}
        open={modalOpen}
        onOpenChange={setModalOpen}
      >
        <Suspense
          fallback={
            <div className="p-6 text-center">Loading currencies...</div>
          }
        >
          <ViewInCurrencyModalContentWrapper
            selected={selectedFiat}
            onSelect={handleFiatSelect}
          />
        </Suspense>
      </GlobalModal>
    </>
  );
}
