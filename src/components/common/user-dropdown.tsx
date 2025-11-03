"use client";

import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  LogOut,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import WalletSvg from "../svg-icons/wallet-svg";
import WithdrawSvg from "../svg-icons/withdraw-svg";
import BuyCryptoSvg from "../svg-icons/buy-crypto-svg";
import TransactionsSvg from "../svg-icons/transactions-svg";
import BetHistorySvg from "../svg-icons/bet-history-svg";
import RolloverOverviewSvg from "../svg-icons/rollover-overview-svg";
import VipClubSvg from "../svg-icons/vip-club-svg";
import VaultProSvg from "../svg-icons/vault-pro-svg";
import AffiliateSvg from "../svg-icons/affiliate-svg";
import UserSvg from "../svg-icons/user-svg";
import SettingsSvg from "../svg-icons/settings-svg";
import { useTranslations } from "next-intl";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

export default function UserDropdown() {
  const { user: authUser, clearUser } = useAuthStore();
  const t = useTranslations('userMenu')

  const userMenuItems: MenuItem[] = [
  { icon: <WalletSvg />, label: `${t('wallet')}`, onClick: () => {} },
  {
    icon: <WithdrawSvg />,
    label: `${t('Withdraw')}`,
    href: "/withdraw",
  },
  {
    icon: <BuyCryptoSvg />,
    label: `${t('BuyCrypto')}`,
    href: "/buy-crypto",
  },
  {
    icon: <TransactionsSvg />,
    label: `${t("Transactions")}`,
    href: "/transactions",
  },
  { icon: <BetHistorySvg />, label: `${t("Bet History")}`, href: "/bets" },
  {
    icon: <RolloverOverviewSvg />,
    label: `${t("Rollover Overview")}`,
    href: "/rollover",
  },
  { icon: <VipClubSvg />, label: `${t("VIP Club")}`, onClick: () => {} },
  {
    icon: <VaultProSvg />,
    label: `${t("Vault Pro")}`,
    href: "/vault-pro",
  },
  {
    icon: <AffiliateSvg />,
    label: `${t("Affiliate")}`,
    href: "/affiliate",
  },
  { icon: <UserSvg />, label: `${t("My Profile")}`, href: "/profile" },
  {
    icon: <SettingsSvg />,
    label: `${t("Global Settings")}`,
    href: "/settings",
  },
];

  const handleLogout = () => {
    clearUser();
    toast.success("Logged out successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="User menu options for navigation"
        asChild
      >
        <Button
          aria-label="User menu"
          variant="ghost"
          size="icon"
          className="size-10 rounded-full hover:bg-accent"
        >
          {authUser?.profilePicture ? (
            <div className="size-10 min-w-10 rounded-full bg-primary flex items-center justify-center text-foreground text-xl font-semibold">
              <Image
                alt={authUser?.username}
                height={40}
                width={40}
                className="rounded-full h-full w-full"
                src={authUser?.profilePicture || "/avatar.webp"}
              />
            </div>
          ) : (
            <div className="size-10 min-w-10 rounded-full bg-primary flex items-center justify-center text-foreground text-xl font-semibold">
              {authUser?.username?.[0] || "U"}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 p-2 bg-background border"
      >
        {/* === MENU ITEMS === */}
        {userMenuItems.map((item, i) => (
          <DropdownMenuItem
            key={i}
            className="gap-3 px-3 py-2 text-sm cursor-pointer duration-300 hover:bg-foreground/15"
            onClick={item.onClick}
            asChild={!!item.href}
            aria-label={item.label}
          >
            {item.href ? (
              <Link
                aria-label={item.label}
                prefetch
                href={item.href}
                className="flex items-center gap-3 w-full"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3 w-full">
                {item.icon}
                <span>{item.label}</span>
              </div>
            )}
          </DropdownMenuItem>
        ))}

        {/* === LOGOUT === */}
        <DropdownMenuItem
          onClick={handleLogout}
          aria-label="Logout"
          className="gap-3 px-3 py-2 text-sm cursor-pointer duration-300 hover:bg-foreground/15"
        >
          <LogOut />
          <span>{t('Log Out')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
