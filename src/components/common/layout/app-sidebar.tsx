"use client";
import { useSidebarStore } from "@/store/sidebar-store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight} from "lucide-react";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import AnimatedHamburger from "../../global-components/animated-hamburger";
import { casinoItems, menuItems1, menuItems2, sportItems, sportItems2, sportItems3 } from "./sidebar-menu-options";
import type { MenuItem } from "@/types/layout-types";

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
        hidden md:flex flex-col z-50 sticky top-0 left-0 h-screen w-64
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
    </nav>
  );
}
