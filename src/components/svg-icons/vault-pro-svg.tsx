import { cn } from "@/lib/utils";
import type { SvgIconPropType } from "@/types/types";

function VaultProSvg({
  size = 24,
  ariaLabel = "Vault Pro icon",
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
        d="M3 12V17C3 18.1 3.39167 19.0417 4.175 19.825C4.95833 20.6083 5.9 21 7 21H17C18.1 21 19.0417 20.6083 19.825 19.825C20.6083 19.0417 21 18.1 21 17V12H17V14C17 14.55 16.8043 15.021 16.413 15.413C16.0217 15.805 15.5507 16.0007 15 16H9C8.45 16 7.97933 15.8043 7.588 15.413C7.19667 15.0217 7.00067 14.5507 7 14V12H3ZM9 12V14H15V12H9ZM3 10H21V7C21 5.9 20.6083 4.95833 19.825 4.175C19.0417 3.39167 18.1 3 17 3H7C5.9 3 4.95833 3.39167 4.175 4.175C3.39167 4.95833 3 5.9 3 7V10Z"
        fill="white"
        fill-opacity="0.55"
      />
    </svg>
  );
}

export default VaultProSvg;
