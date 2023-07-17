import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Input({
  className,
  ...inputProps
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      {...inputProps}
      type="text"
      className={twMerge(
        "flex px-2 py-1 items-center justify-between gap-2 w-full cursor-default rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400",
        className
      )}
    />
  );
}
