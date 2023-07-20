import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { groupBy } from "lodash";
import { useMemo, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { twMerge } from "tailwind-merge";

type Option<T> = {
  id: T;
  name: string;
  group?: string;
};
interface Props<T> {
  options: Option<T>[];
  value?: T;
  placeholder?: string;
  onChange: (id: T) => void;
  className?: string;
  id: string;
  label?: string;
}

export function Select<T extends undefined | number>({
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

  const parsedOptions = useMemo(() => {
    const groupedOptions = groupBy(options, "group");
    const resultingOptions: (Option<T> | string)[] = [];
    Object.keys(groupedOptions).forEach((groupName) => {
      if (groupName !== "undefined") {
        resultingOptions.push(groupName);
      }
      groupedOptions[groupName].forEach((option) => {
        resultingOptions.push(option);
      });
    });

    return resultingOptions;
  }, [options]);

  const selectedOption = useMemo(
    () => options.find(({ id }) => id === value),
    [options, value]
  );
  return (
    <div className={twMerge("relative", className)} aria-label={label}>
      <button
        id={id}
        onClick={() => setOpen((open) => !open)}
        type="button"
        className="flex px-2 py-1 items-center justify-between gap-2 w-full cursor-default rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={twMerge(selectedOption?.name ? "" : "text-gray-400")}>
          {selectedOption?.name
            ? `${selectedOption?.group ? selectedOption.group + " | " : ""}${
                selectedOption.name
              }`
            : placeholder}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
      </button>
      {open && (
        <ul
          ref={ref}
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          tabIndex={-1}
          role="listbox"
          aria-activedescendant={`${id}-option-${value}`}
        >
          {parsedOptions.map((option) => {
            if (typeof option === "string")
              return (
                <li
                  key={option}
                  role="option"
                  className="font-semibold p-1 px-2"
                  aria-selected={false}
                >
                  {option}
                </li>
              );
            const selected = option.id === value;
            return (
              <li
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
                key={option.id ?? option.name}
                className="text-gray-900 relative cursor-default select-none p-1 px-2 hover:bg-gray-100 aria-selected:bg-indigo-100"
                id={`${id}-option-${option.id}`}
                aria-selected={selected}
                role="option"
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
