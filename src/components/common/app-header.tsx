"use client";
import { Button } from "../ui/button";
import { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  LogOut,
  Settings,
  Headset,
  Gift,
  Shield,
  BarChart3,
  History,
  Crown,
  Wallet,
  ArrowDownUp,
  Gem,
  Users,
  Search,
  BellDot,
} from "lucide-react";
// import { useAuthStore } from "@/store/auth-store";
import { Link, useRouter } from "@/i18n/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
// import { debounce } from "@/lib/utils";
import LanguageSwitcher from "../global-components/language-dropdown";
import AnimatedHamburger from "../global-components/animated-hamburger";

export default function AppHeader() {
//   const [showSearchModal, setShowSearchModal] = useState(false);
  const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");
  const [loadingNoti, setLoadingNoti] = useState(true);
  const {
    toggleAuthModalOpen,
    toggleWalletSetupModalOpen,
    toggleVipProgressModalOpen,
  } = useSidebarStore();
  const { mobileOpen, toggleMobileOpen } = useSidebarStore();
//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const authUser = useAuthStore((state) => state.user);
const authUser = {
    name: 'Trishon Baidaya',
    email: 'admin@gmail.com'
}

  const handleLoginClick = () => {
    router.push("?auth-tab=login");
    toggleAuthModalOpen();
  };

//   const debouncedUpdateQueryParams = useMemo(() => {
//     return debounce((text: string) => {
//       setSearchTerm(text);
//     }, 500);
//   }, []);

  const handleNotiOpenChange = (open: boolean) => {
    if (open) {
      setLoadingNoti(true);
      setTimeout(() => setLoadingNoti(false), 1000);
    }
  };

  const handleRegisterClick = () => {
    router.push("?auth-tab=register");
    toggleAuthModalOpen();
  };

  const handleWalletClick = () => {
    router.push("?wallet-tab=welcome");
    toggleWalletSetupModalOpen();
  };

//   const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     debouncedUpdateQueryParams(value);
//   };

//   const handleLogoutClick = () => {
//     setIsLogoutModalOpen(true);
//   };

//   const handleLogoutConfirm = () => {
//     toast.success("Logged out successfully!");
//   };

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-sidebar backdrop-blur supports-backdrop-filter:bg-sidebar">
      <Suspense
        fallback={
          <div className="app-container flex items-center justify-between py-3 opacity-50 pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="w-32 h-8 bg-foreground/15 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-8 bg-foreground/15 rounded animate-pulse" />
              <div className="w-32 h-8 bg-foreground/15 rounded animate-pulse" />
            </div>
          </div>
        }
      >
        <div className="app-container flex items-center justify-between md:justify-end p-3">
          <div className="md:hidden block">
            <AnimatedHamburger isOpen={mobileOpen} onClick={toggleMobileOpen} />
          </div>
          {/* Right: Auth / User Actions */}
          {authUser ? (
            <div className="flex items-center gap-2">
              <Button
                variant="gray"
                size="icon"
                onClick={() => {
                  console.log(
                    "Search button clicked – functionality coming soon"
                  );
                }}
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
              </Button>
              {/* Wallet Balance */}
              {/* <GlobalWalletCurrencySelect /> */}

              {/* Deposit Button */}
              <Button
                variant="cyanGradient"
                size="sm"
                className="hidden sm:flex h-8 px-3 text-xs font-semibold"
                onClick={handleWalletClick}
              >
                Deposit
              </Button>

              {/* Mobile Deposit */}
              <Button
                variant="cyanGradient"
                size="icon"
                className="sm:hidden w-8 h-8"
                onClick={handleWalletClick}
              >
                <ArrowDownUp className="w-4 h-4" />
              </Button>

              {/* Notifications */}
              <DropdownMenu onOpenChange={handleNotiOpenChange}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-8 h-8 rounded-full hover:bg-accent"
                  >
                    <BellDot className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-0">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Mark all as read
                    </Button>
                  </div>
                  {loadingNoti ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <div className="w-16 h-16 mx-auto mb-3 bg-muted/50 rounded-full animate-pulse" />
                      <p>Loading notifications...</p>
                    </div>
                  ) : (
                    <div className="max-h-96 overflow-y-auto">
                      {[
                        {
                          title: "Deposit Successful",
                          amount: "+€50.00",
                          time: "2 min ago",
                        },
                        {
                          title: "Bet Won",
                          amount: "+€120.50",
                          time: "5 min ago",
                        },
                        { title: "New Promotion", time: "1 hour ago" },
                      ].map((n, i) => (
                        <DropdownMenuItem
                          key={i}
                          className="p-3 gap-3 cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                            <Gift className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{n.title}</p>
                            {n.amount && (
                              <p className="text-sm font-semibold text-green-500">
                                {n.amount}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {n.time}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full hover:bg-accent"
                  >
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                      {authUser.name?.[0] || "U"}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2">
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {authUser.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {authUser.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {authUser.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {[
                    {
                      icon: <Wallet className="w-4 h-4" />,
                      label: "Wallet",
                      onClick: handleWalletClick,
                    },
                    {
                      icon: <ArrowDownUp className="w-4 h-4" />,
                      label: "Deposit",
                      onClick: handleWalletClick,
                    },
                    {
                      icon: <History className="w-4 h-4" />,
                      label: "Transactions",
                      href: "/transactions",
                    },
                    {
                      icon: <BarChart3 className="w-4 h-4" />,
                      label: "Bet History",
                      href: "/bets",
                    },
                    {
                      icon: <Crown className="w-4 h-4" />,
                      label: "VIP Club",
                      onClick: toggleVipProgressModalOpen,
                    },
                    {
                      icon: <Gem className="w-4 h-4" />,
                      label: "Rollover Overview",
                      href: "/rollover",
                    },
                    {
                      icon: <Users className="w-4 h-4" />,
                      label: "Affiliate",
                      href: "/affiliate",
                    },
                    {
                      icon: <Settings className="w-4 h-4" />,
                      label: "Settings",
                      href: "/settings",
                    },
                    {
                      icon: <Shield className="w-4 h-4" />,
                      label: "Responsible Gambling",
                      href: "/responsible-gambling",
                    },
                    {
                      icon: <Headset className="w-4 h-4" />,
                      label: "Live Support",
                      href: "/support",
                    },
                  ].map((item, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="gap-3 px-3 py-2 text-sm cursor-pointer"
                      onClick={item.onClick}
                      asChild={!!item.href}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="flex items-center gap-3"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <>
                          {item.icon}
                          <span>{item.label}</span>
                        </>
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-3 px-3 py-2 text-sm text-destructive cursor-pointer"
                    // onClick={handleLogoutClick}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            /* === UNAUTHENTICATED STATE - EXACTLY AS IN IMAGE === */
            <div className="flex items-center gap-2">
              {/* Sign In Button */}
              <Button variant="outline" onClick={handleLoginClick}>
                Sign In
              </Button>

              {/* Sign Up Button */}
              <Button variant="cyanGradient" onClick={handleRegisterClick}>
                Sign Up
              </Button>

              {/* Language Selector */}
              <LanguageSwitcher />
              {/* Search Icon (Mobile Only) */}
              <Button
                variant="gray"
                size="icon"
                onClick={() => {
                  console.log(
                    "Search button clicked – functionality coming soon"
                  );
                }}
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          )}
        </div>
      </Suspense>

      {/* Modals */}
      {/* <AuthModal />
      <ForgetPasswordModal />
      <WalletSetupModal />
      <WalletOpenModal />
      <LogoutModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        onConfirm={handleLogoutConfirm}
      /> */}
    </header>
  );
}
