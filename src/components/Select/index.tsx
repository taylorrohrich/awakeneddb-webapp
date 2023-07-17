import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { twMerge } from "tailwind-merge";

interface Props<T extends string | number | undefined> {
  options: { id: T; name: string }[];
  value?: T;
  placeholder?: string;
  onChange: (id: T) => void;
  className?: string;
  id: string;
  label?: string;
}

export function Select<T extends string | number | undefined>({
  options,
  value,
  onChange,
  id,
  placeholder = "Select an Option",
  className,
  label,
}: Props<T>) {
  const ref = useRef(null);

  const [open, setOpen] = useState(false);
  useClickAway(ref, () => {
    setOpen(false);
  });
  const selectedOption = useMemo(
    () => options.find(({ id }) => id === value),
    [options, value]
  );
  return (
    <div className={twMerge("relative", className)} id={id} aria-label={label}>
      <button
        onClick={() => setOpen((open) => !open)}
        type="button"
        className="flex px-2 py-1 items-center justify-between gap-2 w-full cursor-default rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={twMerge(selectedOption?.name ? "" : "text-gray-400")}>
          {selectedOption?.name ?? placeholder}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="w-3" />
      </button>
      {open && (
        <ul
          ref={ref}
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          tabIndex={-1}
          role="listbox"
          aria-activedescendant={`${id}-option-${value}`}
        >
          {options.map(({ id, name }) => {
            const selected = id === value;
            return (
              <li
                onClick={() => {
                  onChange(id);
                  setOpen(false);
                }}
                key={id ?? name}
                className="text-gray-900 relative cursor-default select-none p-1 px-2 hover:bg-gray-100 aria-selected:text-indigo-500 border-b aria-selected:border-indigo-500 last:border-none"
                id={`${id}-option-${id}`}
                aria-selected={selected}
                role="option"
              >
                {name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
