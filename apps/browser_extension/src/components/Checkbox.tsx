import type { ChangeEventHandler, ReactNode } from "react";
export const Checkbox = ({
  children,
  onChange,
  checked,
  disabled,
}: {
  children: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  disabled?: boolean;
}) => {
  return (
    <label
      className={`flex flex-row gap-2 items-center ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <input
        className="size-4 rounded border-stone-300 dark:border-stone-600 text-coral-500 
          focus:ring-coral-500 focus:ring-offset-0 accent-coral-500 dark:accent-coral-400
          disabled:opacity-50"
        type="checkbox"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      {children}
    </label>
  );
};
