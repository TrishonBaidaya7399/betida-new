"use client";

import { useEffect, useState, Suspense } from "react";
import { useSidebarStore } from "@/store/sidebar-store";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import type { MenuItem } from "@/types/layout-types";
import { menuSections } from "./app-sidebar";
import Image from "next/image";
import { useLocale } from "next-intl";

// === SKELETON LOADER ===
function MenuSkeleton() {
  return (
    <div className="p-4 space-y-1.5 mb-3">
      <div className="h-12 bg-foreground/10 rounded-lg animate-pulse" />
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-10 bg-foreground/5 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

// === MENU ITEM COMPONENT ===
function MobileMenuItem({
  item,
  depth = 0,
}: {
  item: MenuItem;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href && pathname.startsWith(item.href);
  const isInGroup = depth > 0;
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
          flex w-full items-center justify-between px-3 py-2 cursor-pointer transition-all text-left
          ${
            isInGroup
              ? "rounded-none first:rounded-t-lg last:rounded-b-lg text-sm"
              : "rounded-lg"
          }
          ${
            isActive
              ? "bg-linear-to-r from-primary to-background text-accent-foreground"
              : "hover:bg-foreground/10"
          }
        `}
      >
        <div className="flex items-center gap-3 flex-1">
          {Icon && item.text !== "Language" && <Icon className="w-4 h-4" />}
          {item.text === "Language" && currentLanguage?.flag && (
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
          {item.text !== "Language" && (
            <span className={isInGroup ? "text-sm" : ""}>{item.text}</span>
          )}
        </div>
        {item.badge && (
          <span className="bg-foreground/15 text-foreground text-xs px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronRight
            className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
          />
        )}
      </button>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && open && (
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
                      flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors text-left
                      ${
                        isChildActive
                          ? "bg-linear-to-r from-primary to-background text-accent-foreground"
                          : "hover:bg-foreground/5"
                      }
                    `}
                  >
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

// === MAIN PANEL ===
export default function MobileBrowsePanel() {
  const pathname = usePathname();
  const { browseOpen, setBrowseOpen } = useSidebarStore();

  useEffect(() => {
    if (browseOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [browseOpen]);

  useEffect(() => {
    setBrowseOpen(false);
  }, [pathname, setBrowseOpen]);

  return (
    <AnimatePresence>
      {browseOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 top-16 bottom-16 z-40 bg-sidebar overflow-y-auto md:hidden"
        >
          {/* === MENU SECTIONS === */}
          <div className="px-4 pb-6 space-y-1.5">
            <Suspense fallback={<MenuSkeleton />}>
              {menuSections.map((section, idx) => (
                <div key={idx} className="space-y-1.5">
                  {"type" in section && section.type === "group" ? (
                    <div className="bg-background-2 rounded-lg overflow-hidden">
                      {section.items.map((item, i) => (
                        <MobileMenuItem key={i} item={item} depth={1} />
                      ))}
                    </div>
                  ) : (
                    section.items.map((item, i) => (
                      <MobileMenuItem key={i} item={item} />
                    ))
                  )}
                </div>
              ))}
            </Suspense>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
