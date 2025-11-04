"use client";
import { Button } from "../../ui/button";
import { Suspense } from "react";
import { Search } from "lucide-react";
// import { useAuthStore } from "@/store/auth-store";
import { useSidebarStore } from "@/store/sidebar-store";
// import { debounce } from "@/lib/utils";
import LanguageSwitcher from "../../global-components/language-dropdown";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { ButtonGroup } from "../../ui/button-group";
import UserDropdown from "../user-dropdown";
import { useTranslations } from "next-intl";
import MessageSvg from "@/components/svg-icons/mesage-svg";
import NotiSvg from "@/components/svg-icons/noti-svg";
import GlobalWalletCurrencySelect from "@/components/global-components/global-wallet-currency-select";
import GiftDropdown from "@/components/global-components/gift-dropdown";
import Image from "next/image";

export default function AppHeader() {
  const t = useTranslations("header");
  //   const [showSearchModal, setShowSearchModal] = useState(false);
  //   const [searchTerm, setSearchTerm] = useState("");
  const { toggleAuthModalOpen } = useSidebarStore();
  //   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user: authUser, setUser } = useAuthStore();
  //   const debouncedUpdateQueryParams = useMemo(() => {
  //     return debounce((text: string) => {
  //       setSearchTerm(text);
  //     }, 500);
  //   }, []);

  const handleLoginClick = () => {
    setUser({
      username: "Trishon Baidaya",
      email: "admin@gmail.com",
      vipProgress: 75,
      level: "Bronze",
      nextLevel: "Silver",
      showPopupItem: true,
    });

    toast.info("Authentication will be implemented in the next update.");
    toggleAuthModalOpen();
  };

  const handleRegisterClick = () => {
    setUser({
      username: "New User",
      email: "newuser@example.com",
      vipProgress: 0,
      level: "None",
      nextLevel: "Bronze",
      showPopupItem: true,
    });

    toast.info("Sign-up flow is under development.");
    toggleAuthModalOpen();
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
    <header className="sticky top-0 left-0 z-49 w-full bg-sidebar backdrop-blur supports-backdrop-filter:bg-sidebar">
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
          <div className="md:hidden flex flex-row items-center gap-3">
            <Image
              src="/logos/logo.webp"
              alt="Betida"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            {/* <span className="text-2xl font-bold text-foreground">BETIDA</span> */}
          </div>
          {authUser ? (
            <div className="flex items-center gap-2">
              <Button
                variant="gray"
                size="sm"
                onClick={() => {
                  console.log(
                    "Search button clicked – functionality coming soon"
                  );
                }}
                aria-label="Search"
                className="hidden md:block"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
              </Button>
              {/* Wallet Balance */}
              <GlobalWalletCurrencySelect />
              <span className="hidden md:block">
                <GiftDropdown />
              </span>

              {/* Notifications */}
              <ButtonGroup className="bg-gray hidden sm:block">
                <Button
                  variant="gray"
                  aria-label="messages and chats"
                  className="border-r"
                >
                  <MessageSvg />
                </Button>
                <Button
                  variant="gray"
                  size="icon"
                  className="relative"
                  aria-label="Notifications"
                >
                  <NotiSvg className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-linear-to-r from-primary to-foreground rounded-full text-xs font-semibold text-background">
                    2
                  </span>
                </Button>
              </ButtonGroup>

              {/* User Menu */}
              <UserDropdown />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Sign In Button */}
              <Button
                variant="outline"
                aria-label="Sign-in"
                onClick={handleLoginClick}
              >
                {t("signin")}
              </Button>

              {/* Sign Up Button */}
              <Button
                variant="cyanGradient"
                aria-label="Sign-up"
                onClick={handleRegisterClick}
              >
                {t("signup")}
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
