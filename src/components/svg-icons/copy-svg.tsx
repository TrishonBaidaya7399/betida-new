import { cn } from "@/lib/utils";
import type { SvgIconPropType } from "@/types/types";

function CopySvg({
  size = 24,
  ariaLabel = "Copy icon",
  className,
}: SvgIconPropType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground", className)}
    >
      <path
        d="M4.66667 11.9999V1.33325H13.3333V11.9999H4.66667ZM2 14.6666V3.99992H3.33333V13.3333H10.6667V14.6666H2Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
    </svg>
  );
}

export default CopySvg;
