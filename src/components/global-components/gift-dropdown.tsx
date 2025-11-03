"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import GiftSvg from "@/components/svg-icons/gift-svg";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import PointerSvg from "../svg-icons/pointer-svg";

interface Bonus {
  id: string;
  title: string;
  amount: string;
  action: string;
  type: "deposit" | "verification";
}

const bonuses: Bonus[] = [
  {
    id: "1",
    title: "1st Deposit Bonus 120%",
    amount: "Up to € 578.40",
    action: "Deposit",
    type: "deposit",
  },
  {
    id: "2",
    title: "Email Verification",
    amount: "Up to € 578.40",
    action: "Claim",
    type: "deposit",
  },
  {
    id: "3",
    title: "1st Deposit Bonus 120%",
    amount: "Up to € 578.40",
    action: "Claim",
    type: "deposit",
  },
];

export default function GiftDropdown() {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="gray"
          size="sm"
          className="relative"
          aria-label="Gifts"
        >
          <GiftSvg className="w-4 h-4 text-muted-foreground" />
          {bonuses?.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-linear-to-r from-primary to-foreground rounded-full text-xs font-semibold text-background">
              {bonuses?.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 bg-background border border-border rounded-xl overflow-hidden shadow-2xl p-3"
        align="end"
        sideOffset={8}
      >
        <div className="flex flex-col gap-2">
          {bonuses.map((bonus) => (
            <div
              key={bonus.id}
              className="flex items-center justify-between p-2 bg-sidebar rounded-lg hover:bg-foreground/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <PointerSvg />
                <div>
                  <p className="text-sm font-medium text-foreground text-wrap line-clamp-2">
                    {bonus.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {bonus.amount}
                  </p>
                </div>
              </div>
              <Button
                variant={bonus.type === "deposit" ? "cyanGradient" : "gray"}
                size="sm"
                className="text-xs"
                aria-label="Deposit gift"
              >
                {bonus.action}
              </Button>
            </div>
          ))}

          <button
            className="flex items-center justify-center gap-2 p-2 border-2 text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors bg-background rounded-lg "
            aria-label="Bonus Dashboard"
          >
            <span>{t("bonusDashboard") || "Bonus Dashboard"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
