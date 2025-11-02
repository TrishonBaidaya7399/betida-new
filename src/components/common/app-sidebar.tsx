"use client";
import { useSidebarStore } from "@/store/sidebar-store";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import Image from "next/image";
import { CardSim, ChevronRight, HelpCircle, ListVideo } from "lucide-react";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import AnimatedHamburger from "../global-components/animated-hamburger";

// Types
export interface MenuItem {
  text: string;
  icon?: any;
  href?: string;
  onclick?: () => void;
  navigateTo?: string;
  children?: MenuItem[];
  casinoOnly?: boolean;
  sportsOnly?: boolean;
  requiresAuth?: boolean;
}

export const casinoItems: MenuItem[] = [
  {
    text: "Favourites",
    href: "/casino/favourites",
    requiresAuth: true,
  },
  {
    text: "Recent",
    href: "/casino/recent",
    requiresAuth: true,
  },
  { text: "Challenges", href: "/casino/challenges" },
  {
    text: "My Bets",
    href: "/my-bets",
    requiresAuth: true,
  },
  {
    text: "Games",
    children: [
      { text: "New Releases", href: "/casino/group/new-releases" },
      { text: "Slots", href: "/casino/group/slots" },
      { text: "Stake Originals", href: "/casino/group/stake-originals" },
      {
        text: "ForuStake Exclusivesm",
        href: "/casino/group/foruStake-exclusivesm",
      },
      { text: "Live Casino", href: "/casino/group/live-casino" },
      { text: "Game Shows", href: "/casino/group/game-shows" },
      { text: "Burst Games", href: "/casino/group/burst-games" },
      { text: "Stake Poker", href: "/casino/group/stake-poker" },
      { text: "Bonus Buy", href: "/casino/group/bonus-buy" },
      { text: "Blackjack", href: "/casino/group/blackjack" },
      { text: "Baccarat", href: "/casino/group/baccarat" },
      { text: "Roulette", href: "/casino/group/roulette" },
      { text: "Publishers", href: "/casino/group/publishers" },
    ],
  },
];

export const sportItems: MenuItem[] = [
  { text: "Live Events", href: "/sports/live-events" },
  { text: "Starting Soon", href: "/sports/upcoming" },
  {
    text: "My Bets",
    href: "/my-bets",
    requiresAuth: true,
  },
];

export const sportItems2: MenuItem[] = [
  {
    text: "Soccer",
    children: [
      { text: "Live & Upcoming", href: "/sports/soccer" },
      {
        text: "Outrights",
        href: "/sports/soccer?tabName=myBets&tab=outrights",
      },
      { text: "WC Qualification", href: "/sports/soccer" },
      { text: "WC Qualification,", href: "/sports/soccer" },
      {
        text: "View All",
        href: "/sports/soccer?tabName=myBets&tab=all-soccer",
      },
    ],
  },
  {
    text: "Tennis",
    children: [
      { text: "Live & Upcoming", href: "/sports/tennis" },
      {
        text: "Outrights",
        href: "/sports/tennis?tabName=myBets&tab=outrights",
      },
      { text: "WC Qualification", href: "/sports/tennis" },
      { text: "WC Qualification,", href: "/sports/tennis" },
      {
        text: "View All",
        href: "/sports/tennis?tabName=myBets&tab=all-tennis",
      },
    ],
  },
  {
    text: "Baseball",
    children: [
      { text: "Live & Upcoming", href: "/sports/baseball" },
      {
        text: "Outrights",
        href: "/sports/baseball?tabName=myBets&tab=outrights",
      },
      { text: "WC Qualification", href: "/sports/baseball" },
      { text: "WC Qualification,", href: "/sports/baseball" },
      {
        text: "View All",
        href: "/sports/baseball?tabName=myBets&tab=all-baseball",
      },
    ],
  },
  {
    text: "Basketball",
    children: [
      { text: "Live & Upcoming", href: "/sports/basketball" },
      {
        text: "Outrights",
        href: "/sports/basketball?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/basketball" },
      { text: "NBL", href: "/sports/basketball" },
      { text: "PBA, Philippine Cup", href: "/sports/basketball" },
      {
        text: "View All",
        href: "/sports/basketball?tabName=myBets&tab=all-basketball",
      },
    ],
  },
  {
    text: "American Football",
    children: [
      { text: "Live & Upcoming", href: "/sports/american-football" },
      {
        text: "Outrights",
        href: "/sports/american-football?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/american-football" },
      { text: "NBL", href: "/sports/american-football" },
      { text: "PBA, Philippine Cup", href: "/sports/american-football" },
      {
        text: "View All",
        href: "/sports/american-football?tabName=myBets&tab=all-american-football",
      },
    ],
  },
  {
    text: "Racing",
    children: [
      { text: "Live & Upcoming", href: "/sports/racing" },
      {
        text: "Outrights",
        href: "/sports/racing?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/racing" },
      { text: "NBL", href: "/sports/racing" },
      { text: "PBA, Philippine Cup", href: "/sports/racing" },
      {
        text: "View All",
        href: "/sports/racing?tabName=myBets&tab=all-racing",
      },
    ],
  },
  {
    text: "Cricket",
    children: [
      { text: "Live & Upcoming", href: "/sports/cricket" },
      {
        text: "Outrights",
        href: "/sports/cricket?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/cricket" },
      { text: "NBL", href: "/sports/cricket" },
      { text: "PBA, Philippine Cup", href: "/sports/cricket" },
      {
        text: "View All",
        href: "/sports/cricket?tabName=myBets&tab=all-cricket",
      },
    ],
  },
  {
    text: "Golf",
    children: [
      { text: "Live & Upcoming", href: "/sports/golf" },
      { text: "Outrights", href: "/sports/golf?tabName=myBets&tab=outrights" },
      { text: "NBA Preseason", href: "/sports/golf" },
      { text: "NBL", href: "/sports/golf" },
      { text: "PBA, Philippine Cup", href: "/sports/golf" },
      { text: "View All", href: "/sports/golf?tabName=myBets&tab=all-golf" },
    ],
  },
  {
    text: "League of Legends",
    children: [
      { text: "Live & Upcoming", href: "/sports/league-of-legends" },
      {
        text: "Outrights",
        href: "/sports/league-of-legends?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/league-of-legends" },
      { text: "NBL", href: "/sports/league-of-legends" },
      { text: "PBA, Philippine Cup", href: "/sports/league-of-legends" },
      {
        text: "View All",
        href: "/sports/league-of-legends?tabName=myBets&tab=all-league-of-legends",
      },
    ],
  },
  {
    text: "Dota 2",
    children: [
      { text: "Live & Upcoming", href: "/sports/dota-2" },
      {
        text: "Outrights",
        href: "/sports/dota-2?tabName=myBets&tab=outrights",
      },
      { text: "NBA Preseason", href: "/sports/dota-2" },
      { text: "NBL", href: "/sports/dota-2" },
      { text: "PBA, Philippine Cup", href: "/sports/dota-2" },
      {
        text: "View All",
        href: "/sports/dota-2?tabName=myBets&tab=all-dota-2",
      },
    ],
  },
];

export const sportItems3: MenuItem[] = [
  {
    text: "All Sports",
    children: [
      {
        text: "Soccer",
        href: "/sports/soccer?tabName=myBets&tab=outrights",
      },
      {
        text: "Tennis",
        href: "/sports/tennis?tabName=myBets&tab=outrights",
      },
      {
        text: "Baseball",
        href: "/sports/baseball?tabName=myBets&tab=outrights",
      },
      {
        text: "Basketball",
        href: "/sports/basketball?tabName=myBets&tab=outrights",
      },
      {
        text: "American Football",
        href: "/sports/american-football?tabName=myBets&tab=outrights",
      },
      {
        text: "Racing",
        href: "/sports/racing?tabName=myBets&tab=outrights",
      },
      {
        text: "Cricket",
        href: "/sports/cricket?tabName=myBets&tab=outrights",
      },
      {
        text: "Golf",
        href: "/sports/golf?tabName=myBets&tab=outrights",
      },
      {
        text: "League of Legends",
        href: "/sports/league-of-legends?tabName=myBets&tab=outrights",
      },
      {
        text: "Dota 2",
        href: "/sports/dota-2?tabName=myBets&tab=outrights",
      },
    ],
  },
  {
    text: "All Esports",
    children: [
      {
        text: "Age of Empires",
        href: "/sports/age-of-empires?tabName=myBets&tab=outrights",
      },
      {
        text: "Arena of Valor",
        href: "/sports/arena-of-valor?tabName=myBets&tab=outrights",
      },
      {
        text: "CS2",
        href: "/sports/cs2?tabName=myBets&tab=outrights",
      },
      {
        text: "CS2 Duels",
        href: "/sports/CS2-Duels?tabName=myBets&tab=outrights",
      },
      {
        text: "Dota 2",
        href: "/sports/dota-2?tabName=myBets&tab=outrights",
      },
      {
        text: "Dota 2 Duels",
        href: "/sports/dota-2-duels?tabName=myBets&tab=outrights",
      },
    ],
  },
  {
    text: "All Racing",
    children: [
      {
        text: "Horse Racing",
        href: "/sports/horse-racing?tabName=myBets&tab=outrights",
      },
      {
        text: "Greyhounds",
        href: "/sports/greyhounds?tabName=myBets&tab=outrights",
      },
      {
        text: "Harness Racing",
        href: "/sports/harness-racing?tabName=myBets&tab=outrights",
      },
    ],
  },
];

export const menuItems1: MenuItem[] = [
  {
    text: "Promotions",
    children: [
      {
        text: "$75k Weekly Raffle",
        onclick: () => {
          const { toggleWeeklyRaffleModalOpen } = useSidebarStore.getState();
          toggleWeeklyRaffleModalOpen();
        },
        navigateTo: "?modal=weeklyRaffle", // Add navigation target
      },
      {
        text: "$100k Race",
        onclick: () => {
          const { toggleHundredRaceModalOpen } = useSidebarStore.getState();
          toggleHundredRaceModalOpen();
        },
        navigateTo: "?modal=100kRace",
      },
      {
        text: "Pragmatic Drops & Wins",
        href: "/promotions/pragmatic-drops-and-wins",
      },
      { text: "View All", href: "/promotions?tab=all-promotions" },
    ],
  },
  { text: "Affiliate", href: "/affiliate" },
  { text: "VIP Club", href: "/vip-club" },
  { text: "Blog", href: "/blog" },
  { text: "Forum", href: "#" },
];

export const menuItems2: MenuItem[] = [
  {
    text: "Sponsorships",
    icon: HelpCircle,
    children: [
      { text: "Drake", href: "/drake" },
      { text: "Stake F1 Team", href: "/sponsorships/stake-f1-team" },
      { text: "UFC", href: "/sponsorships/ufc" },
      {
        text: "Everton Football Club",
        href: "/sponsorships/everton-football-club",
      },
      {
        text: "Esporte Clube Juventude",
        href: "/sponsorships/esporte-clube-juventude",
      },
      { text: "FBC Melgar", href: "/sponsorships/fbc-melgar" },
      {
        text: "Enyimba Football Club",
        href: "/sponsorships/enyimba-football-club",
      },
      {
        text: "Trinbago Knight Riders",
        href: "/sponsorships/trinbago-knight-riders",
      },
      { text: "Fortaleza CEIF", href: "/sponsorships/fortaleza-ceif" },
      {
        text: "Club Deportivo Ñublense",
        href: "/sponsorships/club-deportivo-nublense",
      },
      { text: "Davis Cup", href: "/sponsorships/davis-cup" },
      { text: "Team Vitality", href: "/sponsorships/team-vitality" },
      { text: "Kun Agüero", href: "/sponsorships/kun-agueero" },
      { text: "Patrice Evra", href: "/sponsorships/patrice-evra" },
      { text: "Israel Adesanya", href: "/sponsorships/israel-adesanya" },
      { text: "Alex Pereira", href: "/sponsorships/alex-pereira" },
      {
        text: "Valentina Shevchenko",
        href: "/sponsorships/valentina-shevchenko",
      },
      { text: "Merab Dvalishvili", href: "/sponsorships/merab-dvalishvili" },
    ],
  },
  {
    text: "Responsible Gambling",
    icon: CardSim,
    href: "/responsible-gambling",
  },
  { text: "Live Support", icon: ListVideo, href: "#" },
];

export const menuSections = [
  { items: casinoItems, casinoActive: true },
  { items: sportItems, sportsActive: true },
  {
    items: sportItems2,
    sportsActive: true,
    type: "group",
    title: "Top Sports",
  },
  { items: sportItems3, sportsActive: true, type: "group" },
  { items: menuItems1, type: "group" },
  { items: menuItems2, type: "group" },
];

// === SIDEBAR MENU ITEM COMPONENT ===
function SidebarMenuItem({
  item,
  depth = 0,
}: {
  item: MenuItem;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  //   const { toggleWeeklyRaffleModalOpen, toggleHundredRaceModalOpen } =
  //     useSidebarStore();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href && pathname.startsWith(item.href);

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
  };

  const Icon = item.icon;

  return (
    <div
      className={`${depth > 0 ? "ml-4" : "bg-background-2 rounded-lg"} ${isActive ? "bg-linear-to-r from-primary to-bg-background text-accent-foreground" : ""}`}
    >
      <div
        onClick={handleClick}
        className={`
          flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all hover:bg-linear-to-r from-primary to-bg-background
          ${depth === 0 ? "text-sm" : "text-xs"}
        `}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4" />}
          <span>{item.text}</span>
        </div>
        {hasChildren && (
          <div className="bg-foreground/15 rounded-full p-1.5">
            <ChevronRight
              className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
            />
          </div>
        )}
      </div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-0.5">
              {item.children!.map((child, i) => (
                <div
                  key={i}
                  className={`flex flex-row items-center pl-4  ${pathname === child.href ? "bg-linear-to-r from-primary to-bg-background text-accent-foreground" : "hover:bg-linear-to-r from-primary to-bg-background"}
                    `}
                >
                  <ChevronRight className="size-4" />
                  <Link
                    href={child.href || "#"}
                    className="
                    block px-3 py-2 rounded-md text-xs transition-colors"
                  >
                    {child.text}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// === MAIN SIDEBAR ===
export default function AppSidebar() {
  const { mobileOpen, toggleMobileOpen } = useSidebarStore();
  const pathname = usePathname();
  const casinoActive = pathname.startsWith("/casino");
  const sportsActive = pathname.startsWith("/sports");

  return (
    <nav
      className={`
        hidden md:flex flex-col z-60 sticky top-0 left-0 h-screen w-64
         bg-sidebar shrink-0 overflow-y-auto no-scrollbar
        transition-all duration-300 shadow-md
      `}
    >
      {/* === LOGO + NAME === */}
      <div className="flex items-center gap-6 p-3">
        <div className="hidden md:block">
          <AnimatedHamburger isOpen={mobileOpen} onClick={toggleMobileOpen} />
        </div>
        <div className="flex flex-row items-center gap-3">
          <Image
            src="/logos/logo.webp"
            alt="Betida"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-2xl font-bold text-foreground">BETIDA</span>
        </div>
      </div>

      {/* === MENU SECTIONS === */}
      <div className="flex-1 px-3 pb-4 space-y-4 overflow-y-auto">
        {menuSections.map((section, idx) => {
          const showSection =
            (!section.casinoActive || casinoActive) &&
            (!section.sportsActive || sportsActive);

          if (!showSection) {
            return null;
          }

          return (
            <div key={idx} className="space-y-1.5">
              {section.title && (
                <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              {section.items.map((item, i) => (
                <SidebarMenuItem key={i} item={item} />
              ))}
            </div>
          );
        })}
      </div>

      {/* === COLLAPSE BUTTON (Optional) === */}
      <div className="p-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={toggleMobileOpen}
        >
          <ChevronRight
            className={`w-4 h-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </div>
    </nav>
  );
}
