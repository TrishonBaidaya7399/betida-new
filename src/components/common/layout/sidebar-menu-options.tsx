import { useSidebarStore } from "@/store/sidebar-store";
import type { MenuItem } from "@/types/layout-types";
import { CardSim, HelpCircle, ListVideo } from "lucide-react";

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