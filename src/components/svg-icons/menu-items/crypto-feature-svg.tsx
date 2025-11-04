import { cn } from "@/lib/utils";
import type { SvgIconPropType } from "@/types/types";

function CryptoFeatureSvg({
  size = 24,
  ariaLabel = "Crypto Feature icon",
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
        d="M16 20V13H20V20H16ZM10 20V4H14V20H10ZM4 20V9H8V20H4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default CryptoFeatureSvg;
