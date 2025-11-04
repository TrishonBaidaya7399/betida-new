"use client";

import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useWalletStore } from "@/store/wallet-store";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Info, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import GlobalModal from "@/components/global-components/global-modal/global-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CopySvg from "../svg-icons/copy-svg";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const cryptoOptions = [
  { value: "USDT", label: "USDT", icon: "/icons/usdt-svg.svg" },
  { value: "BTC", label: "BTC", icon: "/icons/bit-coin-svg.svg" },
  { value: "ETH", label: "ETH", icon: "/icons/ethereum-svg.svg" },
  { value: "LTC", label: "LTC", icon: "/icons/ltc-svg.svg" },
];

const networkOptions = {
  USDT: ["Tron (TRC20)", "Ethereum (ERC20)"],
  BTC: ["Bitcoin"],
  ETH: ["Ethereum"],
  LTC: ["Litecoin"],
} as const;

const bonusOptions = [
  "120% bonus + 100 Free Spin in Casino",
  "50% bonus on first deposit",
  "No bonus",
];

const sampleAddress = "TTHN6EDBXTD5x9fhSJkmvfAAQVKkfJawW9";
type Network = (typeof networkOptions)[keyof typeof networkOptions][number];

export default function DepositModal() {
  const t = useTranslations("DepositModal");
  const {
    isDepositModalOpen,
    closeDepositModal,
    selectedCurrency,
    setSelectedCurrency,
  } = useWalletStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [tab, setTab] = useState("crypto");
  const [alertVisible, setAlertVisible] = useState(true);
  const [network, setNetwork] = useState<Network>("Tron (TRC20)");
  const [bonus, setBonus] = useState(bonusOptions[0]);

  useEffect(() => {
    const availableNetworks = networkOptions[
      selectedCurrency as keyof typeof networkOptions
    ] as readonly Network[] | undefined;
    if (!availableNetworks) {return};
    if (!availableNetworks.includes(network)) {
      setNetwork(availableNetworks[0] as Network);
    }
  }, [selectedCurrency, network]);

  const handleClose = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("deposit-tab");
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
    closeDepositModal();
  };

  const handleTabChange = (value: string) => {
    setTab(value);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("deposit-tab", value);
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  };

  return (
    <GlobalModal
      open={isDepositModalOpen}
      onOpenChange={(open) => !open && handleClose()}
      title={t("title")}
      className="w-full max-w-full md:max-w-130"
      contentClass="p-0"
    >
      {/* Tabs */}
      <div className="relative flex border-b border-background-3">
        <button
          onClick={() => handleTabChange("crypto")}
          className={`relative flex-1 py-3 text-sm font-medium transition-all duration-300 ${
            tab === "crypto"
              ? "text-foreground"
              : "text-foreground/55 hover:text-foreground"
          }`}
          aria-label={t("tabs.crypto")}
        >
          {t("tabs.crypto")}
          {tab === "crypto" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary to-primary-2" />
          )}
        </button>
        <button
          onClick={() => handleTabChange("fiat")}
          className={`relative flex-1 py-3 text-sm font-medium transition-all duration-300 ${
            tab === "fiat"
              ? "text-foreground"
              : "text-foreground/55 hover:text-foreground"
          }`}
          aria-label={t("tabs.fiat")}
        >
          {t("tabs.fiat")}
          {tab === "fiat" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary to-primary-2" />
          )}
        </button>
      </div>

      {/* Crypto Tab */}
      {tab === "crypto" ? (
        <div className="p-4 bg-background rounded-b-lg">
          <div className="space-y-6 bg-background-2 rounded-lg p-4">
            {/* Currency Badges */}
            <div className="flex gap-2 flex-wrap">
              {cryptoOptions.slice(0, 4).map((opt) => (
                <Badge
                  key={opt.value}
                  variant={
                    selectedCurrency === opt.value ? "default" : "secondary"
                  }
                  className={cn(
                    "cursor-pointer",
                    selectedCurrency === opt.value &&
                      "bg-primary text-foreground"
                  )}
                  onClick={() => setSelectedCurrency(opt.value)}
                >
                  <Image
                    src={opt.icon}
                    alt={opt.label}
                    width={16}
                    height={16}
                    className="mr-1"
                  />
                  {opt.label}
                </Badge>
              ))}
              <Badge
                variant="secondary"
                className="cursor-pointer flex flex-row h-6 items-center gap-2"
              >
                <div className="flex -space-x-2 w-fit">
                  <Avatar className="w-fit cursor-pointer">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-background-3">
                      <div className="flex gap-1">
                        {[
                          { icon: "/icons/usdt-svg.svg", name: "usdt" },
                          { icon: "/icons/ethereum-svg.svg", name: "ethereum" },
                          { icon: "/icons/bit-coin-svg.svg", name: "bitcoin" },
                        ].map((coin, i) => (
                          <Image
                            key={i}
                            src={coin.icon}
                            alt={coin.name}
                            width={16}
                            height={16}
                            className="shrink-0"
                          />
                        ))}
                      </div>
                    </AvatarFallback>
                  </Avatar>
                </div>{" "}
                {t("more")} <ChevronRight size={20} strokeWidth={2} />
              </Badge>
            </div>

            <div className="text-sm text-foreground/55">
              {t("didntSee")}{" "}
              <button className="text-foreground font-semibold cursor-pointer">
                {t("addHere")}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-medium">
                  {t("depositCurrency")}
                </label>
                <Select
                  value={selectedCurrency}
                  onValueChange={setSelectedCurrency}
                >
                  <SelectTrigger className="bg-background! w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background w-full">
                    {cryptoOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span className="flex items-center gap-2">
                          <Image
                            src={opt.icon}
                            alt={opt.label}
                            width={20}
                            height={20}
                          />
                          {opt.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-medium">
                  {t("chooseNetwork")}
                </label>
                <Select
                  value={network}
                  onValueChange={(val) => setNetwork(val as Network)}
                >
                  <SelectTrigger className="bg-background! w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background w-full">
                    {networkOptions[
                      selectedCurrency as keyof typeof networkOptions
                    ].map((net) => (
                      <SelectItem key={net} value={net}>
                        {net}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground font-semibold">
              <Info className="w-4 h-4" />
              <a href="#">{t("howToDeposit")}</a>
            </div>

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-sm font-medium flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-8 gap-1">
                    <span>{t("chooseBonus")}</span>
                    <span className="flex items-end justify-end text-sm text-foreground/55 w-fit">
                      {t("minDeposit")}:{" "}
                      <span className="font-bold ml-1">5.00 USDT</span>
                    </span>
                  </label>
                  <Select value={bonus} onValueChange={setBonus}>
                    <SelectTrigger className="bg-background! w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bonusOptions.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {alertVisible && (
                <div className="bg-background p-3 rounded-lg flex items-start gap-2 text-xs text-foreground/55">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <Info className="w-4 h-4 mt-0.5 shrink-0" />
                      <p>
                        {t.rich("bonusInfo", {
                          casino: (chunks) => (
                            <span className="font-semibold text-foreground">
                              {chunks}
                            </span>
                          ),
                          wager: (chunks) => (
                            <span className="font-semibold text-foreground">
                              {chunks}
                            </span>
                          ),
                        })}
                      </p>
                    </div>
                    <button className="text-primary-2 font-semibold underline w-fit ml-6">
                      {t("bonusTC")}
                    </button>
                  </div>
                  <Button
                    variant="ghost"
                    className="p-0 h-fit hover:bg-transparent hover:text-danger"
                    onClick={() => setAlertVisible(false)}
                  >
                    <X />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-4 items-start">
              <div className="shrink-0 p-2 bg-foreground rounded-lg">
                <QRCode value={sampleAddress} size={140} />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm text-foreground/55 font-medium">
                  {t("depositAddress")}
                </label>
                <div className="bg-background p-3 rounded-lg font-mono text-sm break-all">
                  {sampleAddress}
                </div>
                <Button
                  variant="gray"
                  size="sm"
                  className="mt-2 w-full bg-foreground/15"
                  onClick={() => {
                    navigator.clipboard.writeText(sampleAddress);
                    toast.success(t("copySuccess"));
                  }}
                >
                  <CopySvg className="w-4 h-4" />
                  {t("copyAddress")}
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-foreground/55 bg-background p-2 rounded-lg">
              <Info className="w-4 h-4 mt-0.5 shrink-0" />
              <p>
                {t.rich("sendOnly", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
                <br />
                {t.rich("minTransfer", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-background rounded-b-lg">
          <div className="text-center rounded-lg p-4">
            <div className="text-foreground/55 bg-background-2 rounded-lg py-12 px-4 md:px-8">
              <p className="text-lg mb-2">{t("fiatUnavailable")}</p>
              <p className="text-sm">{t("useCrypto")}</p>
            </div>
          </div>
        </div>
      )}
    </GlobalModal>
  );
}
