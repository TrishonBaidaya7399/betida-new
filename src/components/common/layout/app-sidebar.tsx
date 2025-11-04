"use client";
import { useSidebarStore } from "@/store/sidebar-store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Globe } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import AnimatedHamburger from "../../global-components/animated-hamburger";
import type { MenuItem } from "@/types/layout-types";
import CasinoSvg from "@/components/svg-icons/menu-items/casino-svg";
import {
  casinoItems,
  cryptoFuturesItems,
  lotteryItems,
  promotionsItems,
  sponsorshipsItems,
  sportItems,
} from "./sidebar-menu-options";
import SportsSvg from "@/components/svg-icons/menu-items/sports-svg";
import LotterySvg from "@/components/svg-icons/menu-items/lottery-svg";
import CryptoFeatureSvg from "@/components/svg-icons/menu-items/crypto-feature-svg";
import PromotionsSvg from "@/components/svg-icons/menu-items/promotions-svg";
import SponsorshipsSvg from "@/components/svg-icons/menu-items/sponsorships-svg";
import LiveSupportsSvg from "@/components/svg-icons/menu-items/live-supports-svg";
import SportsBettingInsightsSvg from "@/components/svg-icons/menu-items/sports-betting-insights-svg";
import BlogSvg from "@/components/svg-icons/menu-items/blog-svg";
import ResponsiveGamblingSvg from "@/components/svg-icons/menu-items/responsive-gambling-svg";
import ProbablyFairSvg from "@/components/svg-icons/menu-items/probably-fair-svg";
import ForumSvg from "@/components/svg-icons/menu-items/forum-svg";
import BonusSvg from "@/components/svg-icons/menu-items/bonus-svg";
import VipClubSvg from "@/components/svg-icons/vip-club-svg";
import AffiliateSvg from "@/components/svg-icons/affiliate-svg";
import { useLocale } from "next-intl";

export const menuSections = [
  {
    items: [
      {
        text: "Casino",
        href: "/casino",
        icon: CasinoSvg,
        children: casinoItems,
      },
    ],
    casinoActive: false,
  },
  {
    items: [
      {
        text: "Sports",
        href: "/sports",
        icon: SportsSvg,
        children: sportItems,
      },
    ],
    sportsActive: false,
  },
  {
    items: [
      {
        text: "Lottery",
        href: "/lottery",
        icon: LotterySvg,
        children: lotteryItems,
      },
    ],
  },
  {
    items: [
      {
        text: "Crypto Futures",
        href: "/crypto-futures",
        icon: CryptoFeatureSvg,
        children: cryptoFuturesItems,
      },
    ],
  },
  {
    items: [
      {
        text: "Promotions",
        href: "/promotions",
        icon: PromotionsSvg,
        children: promotionsItems,
      },
    ],
  },
  {
    items: [
      { text: "VIP Club", href: "/vip-club", icon: VipClubSvg },
      { text: "Bonus", href: "/bonus", icon: BonusSvg, badge: "+120%" },
      { text: "Quest Hub", href: "/quest-hub" },
      { text: "Challenge", href: "/challenge" },
      { text: "Affiliate", href: "/affiliate", icon: AffiliateSvg },
      { text: "Forum", href: "/forum", icon: ForumSvg },
      { text: "Provably Fair", href: "/provably-fair", icon: ProbablyFairSvg },
      {
        text: "Responsible Gambling",
        href: "/responsible-gambling",
        icon: ResponsiveGamblingSvg,
      },
      { text: "Blog", href: "/blog", icon: BlogSvg },
      {
        text: "Sport Betting Insights",
        href: "/insights",
        icon: SportsBettingInsightsSvg,
      },
    ],
    type: "group" as const,
  },
  {
    items: [
      {
        text: "Sponsorships",
        href: "/sponsorships",
        icon: SponsorshipsSvg,
        children: sponsorshipsItems,
      },
    ],
  },
  {
    items: [{ text: "Live Support", href: "/support", icon: LiveSupportsSvg }],
  },
  {
    items: [
      {
        text: "Language",
        icon: Globe,
        children: [
          { text: "English", href: "#", locale: "en", flag: "gb" },
          { text: "Türkçe", href: "#", locale: "tr", flag: "tr" },
          { text: "Deutsch", href: "#", locale: "de", flag: "de" },
          { text: "Español", href: "#", locale: "es", flag: "es" },
        ],
      },
    ],
  },
];

function SidebarMenuItem({
  item,
  depth = 0,
}: {
  item: MenuItem;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { mobileOpen } = useSidebarStore();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href && pathname.startsWith(item.href);
  const isInGroup = depth > 0;
  const locale = useLocale();
  const currentLanguage = item.children?.find(
    (child) => child.locale === locale
  );

  const handleClick = () => {
    if (item.onclick) {
      item.onclick();
      if (item.navigateTo) {
        window.history.pushState({}, "", item.navigateTo);
      }
    }
    if (hasChildren) {
      setOpen(!open);
    }
    if (item.locale) {
      router.replace(pathname, { locale: item.locale });
      router.refresh();
    }
  };

  const Icon = item.icon;

  return (
    <div
      className={isInGroup ? "" : "bg-background-2 rounded-lg overflow-hidden"}
    >
      {/* Parent */}
      <button
        onClick={handleClick}
        className={`
          flex w-full items-center justify-between px-3 py-2 cursor-pointer transition-all text-left duration-300
          ${
            isInGroup
              ? "rounded-none first:rounded-t-lg last:rounded-b-lg text-sm"
              : "rounded-lg"
          }
          ${
            isActive
              ? "bg-linear-to-r from-primary to-primary-2 text-Background"
              : "hover:bg-linear-to-r hover:from-primary hover:via-primary hover:to-background-1 duration-300"
          }
        `}
      >
        <div
          className={`flex items-center gap-3 flex-1 ${mobileOpen ? "justify-center" : ""}`}
        >
          {Icon && item.text !== "Language" && <Icon className="w-4 h-4" />}
          {item.text === "Language" && currentLanguage?.flag && !mobileOpen && (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 overflow-hidden rounded-sm">
                <Image
                  src={`https://flagcdn.com/80x60/${currentLanguage.flag}.png`}
                  alt={currentLanguage.text}
                  width={20}
                  height={15}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={isInGroup ? "text-sm" : ""}>
                {currentLanguage.text}
              </span>
            </div>
          )}
          {item.text !== "Language" && !mobileOpen && (
            <>
              <span className={isInGroup ? "text-sm" : ""}>{item.text}</span>
              {item.badge && (
                <span className="bg-foreground/55 text-foreground text-xs px-2 py-0.5 rounded-full ml-auto">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </div>
        {hasChildren && !mobileOpen && (
          <ChevronRight
            className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
          />
        )}
      </button>

      {/* Children - Only show when expanded and not collapsed */}
      <AnimatePresence>
        {hasChildren && open && !mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-background-2"
          >
            <div className="pt-1 space-y-0.5">
              {item.children!.map((child, i) => {
                const isChildActive =
                  child.href && pathname.startsWith(child.href);
                const ChildIcon = child.icon;

                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (child.locale) {
                        router.replace(pathname, { locale: child.locale });
                        router.refresh();
                      }
                    }}
                    className={`
                      flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors text-left duration-300
                      ${
                        isChildActive
                          ? "bg-linear-to-r from-primary to-primary-2 text-Background"
                          : "hover:bg-linear-to-r hover:from-primary hover:via-primary hover:to-background-1 duration-300"
                      }
                    `}
                  >
                    {ChildIcon && <ChildIcon className="w-4 h-4" />}
                    {child.flag && (
                      <div className="w-5 h-5 overflow-hidden rounded-sm">
                        <Image
                          src={`https://flagcdn.com/80x60/${child.flag}.png`}
                          alt={child.text}
                          width={20}
                          height={15}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <span className="flex flex-row items-center gap-1">
                      <ChevronRight
                        size={20}
                        className="text-foreground"
                        strokeWidth={2}
                      />
                      {child.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AppSidebar() {
  const { mobileOpen, toggleMobileOpen } = useSidebarStore();
  const pathname = usePathname();
  const casinoActive = pathname.startsWith("/casino");
  const sportsActive = pathname.startsWith("/sports");

  return (
    <nav
      className={`
        hidden md:flex flex-col z-50 sticky top-0 left-0 h-screen
        bg-sidebar shrink-0 overflow-y-auto
        transition-all duration-300 shadow-md
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
        ${mobileOpen ? "w-16" : "w-64"}
      `}
    >
      {/* LOGO + HAMBURGER */}
      <div className="flex items-center p-3 gap-3">
        <AnimatedHamburger isOpen={mobileOpen} onClick={toggleMobileOpen} />
        <AnimatePresence>
          {!mobileOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 overflow-hidden"
            >
              <Image
                src="/logos/logo.webp"
                alt="Betida"
                width={32}
                height={32}
                className="w-8 h-8"
                priority
                fetchPriority="high"
              />
              <span className="text-2xl font-bold text-foreground whitespace-nowrap">
                BETIDA
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MENU SECTIONS */}
      <div className="flex-1 px-3 pb-4 space-y-3 overflow-y-auto">
        {menuSections.map((section, idx) => {
          const showSection =
            (!section.casinoActive || casinoActive) &&
            (!section.sportsActive || sportsActive);

          if (!showSection) {
            return null;
          }

          return (
            <div key={idx} className="space-y-1.5">
              {"type" in section && section.type === "group" ? (
                <div className="bg-background-2 rounded-lg overflow-hidden">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className={mobileOpen ? "flex justify-center" : ""}
                    >
                      <div className={mobileOpen ? "w-10" : "w-full"}>
                        <SidebarMenuItem item={item} depth={1} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                section.items.map((item, i) => (
                  <div
                    key={i}
                    className={mobileOpen ? "flex justify-center" : ""}
                  >
                    <div className={mobileOpen ? "w-10" : "w-full"}>
                      <SidebarMenuItem item={item} />
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
