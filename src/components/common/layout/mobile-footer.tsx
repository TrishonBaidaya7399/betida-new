"use client";

import BetsSvg from "@/components/svg-icons/bets-svg";
import BrowseIcon from "@/components/svg-icons/menu-items/browser-svg";
import CasinoSvg from "@/components/svg-icons/menu-items/casino-svg";
import SportsSvg from "@/components/svg-icons/menu-items/sports-svg";
import MessageSvg from "@/components/svg-icons/mesage-svg";
import { Link, usePathname } from "@/i18n/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function MobileFooter() {
  const pathname = usePathname();
  const { setBrowseOpen } = useSidebarStore();
  const t = useTranslations("MobileFooter");

  const navItems = [
    {
      label: t("browse"),
      icon: BrowseIcon,
      action: () => setBrowseOpen(true),
      isActive: false,
    },
    {
      label: t("casino"),
      href: "/casino",
      icon: CasinoSvg,
      isActive: pathname.startsWith("/casino"),
    },
    {
      label: t("bets"),
      href: "/my-bets",
      icon: BetsSvg,
      isActive: pathname.startsWith("/my-bets"),
    },
    {
      label: t("sports"),
      href: "/sports",
      icon: SportsSvg,
      isActive: pathname.startsWith("/sports"),
    },
    {
      label: t("chat"),
      href: "#",
      icon: MessageSvg,
      isActive: false,
      onClick: () => toast.info(t("chatComingSoon")),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-around py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isActive;

          const content = (
            <>
              <Icon
                className={`w-6 h-6 transition-all ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs mt-1 font-medium transition-all ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </>
          );

          if (item.href && item.href !== "#") {
            return (
              <Link
                key={item.label}
                prefetch
                href={item.href}
                className={`
                  flex flex-col items-center justify-center w-full py-1.5
                  transition-all duration-200 rounded-lg
                  ${
                    isActive
                      ? "bg-linear-to-t from-primary/10 to-background"
                      : "hover:bg-foreground/5"
                  }
                `}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              onClick={item.onClick || item.action}
              className={`
                flex flex-col items-center justify-center w-full py-1.5
                transition-all duration-200 rounded-lg
                ${
                  isActive
                    ? "bg-linear-to-t from-primary/10 to-background"
                    : "hover:bg-foreground/5"
                }
              `}
              aria-label={item.label}
            >
              {content}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
