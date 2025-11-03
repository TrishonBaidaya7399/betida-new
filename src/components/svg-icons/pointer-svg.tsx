import { cn } from "@/lib/utils";
import type { SvgIconPropType } from "@/types/types";

function PointerSvg({
  size = 24,
  ariaLabel = "Affiliate icon",
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
        opacity="0.3"
        d="M16.4706 16.4711C21.4096 11.5321 23.4106 5.52708 20.9416 3.05808C18.4726 0.588081 12.4676 2.59008 7.52862 7.52808C2.58962 12.4681 0.588618 18.4731 3.05762 20.9421C5.52762 23.4121 11.5326 21.4091 16.4706 16.4711Z"
        fill="currentColor"
      />
      <path
        opacity="0.3"
        d="M7.52862 16.4711C2.58962 11.5331 0.588618 5.52708 3.05762 3.05808C5.52662 0.588081 11.5316 2.59008 16.4706 7.52808C21.4096 12.4681 23.4106 18.4731 20.9416 20.9421C18.4716 23.4121 12.4666 21.4091 7.52862 16.4711Z"
        fill="currentColor"
      />
      <path
        d="M14.5 12C14.5 12.663 14.2366 13.2989 13.7678 13.7678C13.2989 14.2366 12.663 14.5 12 14.5C11.337 14.5 10.7011 14.2366 10.2322 13.7678C9.76339 13.2989 9.5 12.663 9.5 12C9.5 11.337 9.76339 10.7011 10.2322 10.2322C10.7011 9.76339 11.337 9.5 12 9.5C12.663 9.5 13.2989 9.76339 13.7678 10.2322C14.2366 10.7011 14.5 11.337 14.5 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default PointerSvg;
