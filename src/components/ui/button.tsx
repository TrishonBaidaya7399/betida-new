"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        gray: "bg-background-2 text-white hover:bg-foreground/25",
        ghost: "bg-transparent text-white hover:bg-gray-500",
        outline:
          "border-2 border-white-3 bg-background text-white hover:bg-gray-900",
        link: "h-fit w-fit p-0 rounded-none border-b border-foreground/55 bg-transparent text-foreground/80 hover:text-foreground",
        orangeGradient:
          "bg-gradient-to-t from-orange-1 to-yellow-1 text-white hover:opacity-80",
        purpleGradient:
          "bg-gradient-to-t from-purple-1 to-blue-1 text-white hover:opacity-80",
        greenGradient:
          "bg-gradient-to-t from-cyan-1 to-green-1 text-white hover:opacity-80",
        cyanGradient:
          "bg-gradient-to-r from-primary to-primary-2 text-background hover:opacity-90 shadow-md",
      },
      size: {
        default: "h-10",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8 text-base",
        icon: "size-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "gray",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  prefetch?: boolean;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

// === Button Component ===
function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  href,
  prefetch,
  disabled,
  icon,
  children,
  ariaLabel,
  onClick,
  ...props
}: ButtonProps) {
  // === Accessibility warning ===
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const hasLabel = !!children || !!ariaLabel;
      if (!hasLabel) {
        console.warn(
          "Button missing accessible name: Add children (text) or ariaLabel prop."
        );
      }
    }
  }, [children, ariaLabel]);

  const Comp = asChild && href ? Link : asChild ? Slot : "button";
  const isLink = Comp === Link;

  const classes = cn(
    buttonVariants({ variant, size, fullWidth, className }),"cursor-pointer",
    disabled && "cursor-not-allowed opacity-50"
  );

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    // Call original onClick with correct event type
    if (onClick) {
      // @ts-ignore - we know it's safe
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const linkProps = isLink
    ? {
        href,
        prefetch: prefetch ?? "auto",
      }
    : {};

  if (isLink) {
    return (
      <Link
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={handleClick}
        {...linkProps}
        {...(props as any)}
      >
        {children}
        {icon && <span aria-hidden="true">{icon}</span>}
      </Link>
    );
  }

  if (asChild) {
    return (
      <Slot
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={handleClick}
        {...(props as any)}
      >
        <span>
          {children}
          {icon && <span aria-hidden="true">{icon}</span>}
        </span>
      </Slot>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onClick={handleClick}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      {icon && <span aria-hidden="true">{icon}</span>}
    </button>
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };
