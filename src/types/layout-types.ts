export interface MenuItem {
  text: string;
  href?: string;
  icon?: React.FC<any>;
  children?: MenuItem[];
  requiresAuth?: boolean;
  onclick?: () => void;
  navigateTo?: string;
  badge?: string;
  locale?: string;
  flag?: string
}
