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