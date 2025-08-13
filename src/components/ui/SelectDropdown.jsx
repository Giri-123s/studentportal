/**
 * SelectDropdown
 * Accessible, responsive dropdown replacement for native <select>.
 * Props:
 * - value: string
 * - options: Array<{label: string, value: string}>
 * - onChange: (value: string) => void
 * - placeholder?: string
 */
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SelectDropdown = ({ value, options, onChange, placeholder = 'Select' }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (buttonRef.current?.contains(e.target) || listRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full justify-between inline-flex items-center rounded border border-sky-300 bg-slate-700 px-3 py-2 text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate text-left">
          {current ? current.label : <span className="text-sky-300/80">{placeholder}</span>}
        </span>
        <ChevronDown className="ml-2 h-4 w-4 text-sky-300" />
      </button>
      {open && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 max-h-60 w-full min-w-[10rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`cursor-pointer select-none px-4 py-2 ${
                value === opt.value ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;

