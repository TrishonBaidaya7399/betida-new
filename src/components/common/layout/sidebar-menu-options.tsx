// components/common/layout/sidebar-menu-options.ts
import AffiliateSvg from "@/components/svg-icons/affiliate-svg";
import BlogSvg from "@/components/svg-icons/menu-items/blog-svg";
import BonusSvg from "@/components/svg-icons/menu-items/bonus-svg";
import CasinoSvg from "@/components/svg-icons/menu-items/casino-svg";
import CryptoFeatureSvg from "@/components/svg-icons/menu-items/crypto-feature-svg";
import ForumSvg from "@/components/svg-icons/menu-items/forum-svg";
import LiveSupportsSvg from "@/components/svg-icons/menu-items/live-supports-svg";
import LotterySvg from "@/components/svg-icons/menu-items/lottery-svg";
import ProbablyFairSvg from "@/components/svg-icons/menu-items/probably-fair-svg";
import PromotionsSvg from "@/components/svg-icons/menu-items/promotions-svg";
import ResponsiveGamblingSvg from "@/components/svg-icons/menu-items/responsive-gambling-svg";
import SponsorshipsSvg from "@/components/svg-icons/menu-items/sponsorships-svg";
import SportsBettingInsightsSvg from "@/components/svg-icons/menu-items/sports-betting-insights-svg";
import SportsSvg from "@/components/svg-icons/menu-items/sports-svg";
import VipClubSvg from "@/components/svg-icons/vip-club-svg";
import type { MenuItem } from "@/types/layout-types";

// === CASINO MENU ===
export const casinoItems: MenuItem[] = [
  { text: "Favorites", href: "/casino/favorites", requiresAuth: true },
  { text: "Recent", href: "/casino/recent", requiresAuth: true },
  { text: "Brand Name Originals", href: "/casino/group/brand-originals" },
  { text: "Brand Name Exclusive", href: "/casino/group/brand-exclusive" },
  { text: "Slots", href: "/casino/group/slots" },
  { text: "Live Casino", href: "/casino/group/live-casino" },
  { text: "Feature Buy-in", href: "/casino/group/feature-buy-in" },
  { text: "New Releases", href: "/casino/group/new-releases" },
  { text: "Burst Games", href: "/casino/group/burst-games" },
  { text: "Poker", href: "/casino/group/poker" },
  { text: "Bingo", href: "/casino/group/bingo" },
  { text: "Table Games", href: "/casino/group/table-games" },
  { text: "Blackjack", href: "/casino/group/blackjack" },
  { text: "Roulette", href: "/casino/group/roulette" },
  { text: "Baccarat", href: "/casino/group/baccarat" },
  { text: "Game Shows", href: "/casino/group/game-shows" },
  { text: "Providers", href: "/casino/group/providers" },
  { text: "Themes", href: "/casino/group/themes" },
];

// === SPORTS MENU ===
export const sportItems: MenuItem[] = [
  { text: "Soccer", href: "/sports/soccer" },
  { text: "Tennis", href: "/sports/tennis" },
  { text: "Basketball", href: "/sports/basketball" },
  { text: "Cricket", href: "/sports/cricket" },
  { text: "FIFA", href: "/sports/fifa" },
  { text: "American Football", href: "/sports/american-football" },
  { text: "Ice Hockey", href: "/sports/ice-hockey" },
  { text: "Baseball", href: "/sports/baseball" },
  { text: "Handball", href: "/sports/handball" },
  { text: "Racing", href: "/sports/racing" },
];

// === LOTTERY MENU ===
export const lotteryItems: MenuItem[] = [
  { text: "My Bets", href: "/lottery/my-bets", requiresAuth: true },
  { text: "All Lotteries", href: "/lottery/all" },
  { text: "Picks For You", href: "/lottery/picks" },
  { text: "My Favorites", href: "/lottery/favorites", requiresAuth: true },
  { text: "Brand Name Lottery", href: "/lottery/brand" },
  { text: "Popular", href: "/lottery/popular" },
];

// === CRYPTO FUTURES MENU ===
export const cryptoFuturesItems: MenuItem[] = [
  { text: "High Low", href: "/crypto-futures/high-low" },
  { text: "Up Down", href: "/crypto-futures/up-down" },
  { text: "High Low Spread", href: "/crypto-futures/spread" },
  { text: "Tap Trading", href: "/crypto-futures/tap" },
];

// === PROMOTIONS MENU ===
export const promotionsItems: MenuItem[] = [
  { text: "Daily Contest", href: "/promotions/daily-contest" },
  { text: "Weekly Raffle", href: "/promotions/weekly-raffle" },
  { text: "Refer and Earn", href: "/promotions/refer-earn" },
];

// === SPONSORSHIPS MENU ===
export const sponsorshipsItems: MenuItem[] = [
  { text: "Sponsorships Journey", href: "/sponsorships/journey" },
  { text: "O'HIGGINS", href: "/sponsorships/ohiggins" },
  { text: "Jason Derulo", href: "/sponsorships/jason-derulo" },
  { text: "Lil Pump", href: "/sponsorships/lil-pump" },
  { text: "Colby Covington", href: "/sponsorships/colby-covington" },
  { text: "Miami Club", href: "/sponsorships/miami-club" },
  { text: "Betida Game Esports", href: "/sponsorships/betida-esports" },
  { text: "Antonio Brown", href: "/sponsorships/antonio-brown" },
  {
    text: "St. Kitts & Nevis Patriots",
    href: "/sponsorships/stkitts-patriots",
  },
  { text: "Kwara United", href: "/sponsorships/kwara-united" },
  { text: "Sashimi Poker", href: "/sponsorships/sashimi-poker" },
];

// === MAIN MENU SECTIONS ===
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
    casinoActive: true,
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
    sportsActive: true,
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
      { text: "Bonus", href: "/bonus", icon: BonusSvg },
      { text: "Quest Hub", href: "/quest-hub",  },
      { text: "Challenge", href: "/challenge", },
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
];
