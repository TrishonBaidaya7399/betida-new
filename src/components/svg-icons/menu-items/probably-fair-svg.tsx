import { cn } from "@/lib/utils";
import type { SvgIconPropType } from "@/types/types";

function ProbablyFairSvg({
  size = 24,
  ariaLabel = "Probably Fair icon",
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
        d="M11 22V2H13V22H11ZM15 17V7H18V17H15ZM6 17V7H9V17H6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ProbablyFairSvg;
