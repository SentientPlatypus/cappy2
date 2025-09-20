/**
 * Button Component
 * 
 * Flexible button component with multiple variants and sizes using CVA (Class Variance Authority).
 * Built on top of Radix UI Slot for composability and proper forwarding.
 * 
 * Features:
 * - 6 variants: default, destructive, outline, secondary, ghost, link
 * - 4 sizes: sm, default, lg, icon
 * - Full accessibility with focus rings and disabled states
 * - SVG icon optimization with automatic sizing
 * - asChild prop for rendering as different elements via Slot
 * 
 * Usage:
 * <Button variant="outline" size="lg">Click me</Button>
 * <Button asChild><Link to="/home">Home</Link></Button>
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// CVA configuration for all button variants and sizes
const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      // Visual style variants
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",         // Primary brand button
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Delete/danger actions
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Secondary actions
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",   // Tertiary actions
        ghost: "hover:bg-accent hover:text-accent-foreground",                      // Minimal buttons
        link: "text-primary underline-offset-4 hover:underline",                    // Link-style buttons
      },
      // Size variants
      size: {
        default: "h-10 px-4 py-2",   // Standard button size
        sm: "h-9 rounded-md px-3",   // Compact button
        lg: "h-11 rounded-md px-8",  // Large button with more padding
        icon: "h-10 w-10",           // Square icon-only button
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// TypeScript interface extending HTML button props + CVA variant props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Render as child element (via Radix Slot)
}

// Forward ref component for proper ref forwarding
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot if asChild is true, otherwise render as button
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
