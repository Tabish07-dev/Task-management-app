import { clsx } from "clsx";
import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", loading = false, children, disabled, ...props },
  ref
) {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-medium transition disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-400",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  };

  return (
    <button ref={ref} className={clsx(base, variants[variant], className)} disabled={disabled || loading} {...props}>
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          <span>Please wait...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
