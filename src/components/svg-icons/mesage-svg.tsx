import { cn } from "@/lib/utils";
import type { SvgIconPropType } from "@/types/types";

function MessageSvg({
  size = 24,
  ariaLabel = "Message icon",
  className,
}: SvgIconPropType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground", className)}
    >
      <path
        d="M20 2C20.55 2 21.0211 2.1959 21.4131 2.58789C21.8051 2.97989 22.0007 3.45067 22 4V16C22 16.55 21.8044 17.0211 21.4131 17.4131C21.0218 17.8051 20.5507 18.0007 20 18H6L3.7002 20.2998C3.38357 20.6164 3.02091 20.6873 2.6123 20.5127C2.2037 20.3381 1.99939 20.0258 2 19.5752V4C2 3.45 2.19589 2.97922 2.58789 2.58789C2.97989 2.19656 3.45067 2.00067 4 2H20ZM7 11C7 13.2091 8.79086 15 11 15H13C15.2091 15 17 13.2091 17 11H7Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
    </svg>
  );
}

export default MessageSvg;
