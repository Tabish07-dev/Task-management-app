import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, error, className, ...props }, ref) {
  return (
    <div className="w-full">
      {label ? <label className="mb-2 block text-sm text-slate-300">{label}</label> : null}
      <input
        ref={ref}
        className={`w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 ${error ? "border-rose-500" : ""} ${className || ""}`}
        {...props}
      />
      {error ? <p className="mt-2 text-sm text-rose-400">{error}</p> : null}
    </div>
  );
});

export default Input;
