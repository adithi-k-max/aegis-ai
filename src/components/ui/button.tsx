import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-xs font-bold tracking-widest uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#141414] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#141414] text-white hover:bg-[#141414]/90 shadow-none",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-none",
        outline: "border border-[#141414]/20 bg-transparent hover:bg-[#141414]/5 text-[#141414] shadow-none",
        secondary: "bg-[#141414]/5 text-[#141414] hover:bg-[#141414]/10 shadow-none",
        ghost: "hover:bg-[#141414]/5 text-[#141414]",
        link: "text-[#141414] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-[10px]",
        lg: "h-12 px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
