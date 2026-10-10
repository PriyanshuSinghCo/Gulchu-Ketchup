import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const sameDay = (a, b) => a && b && a.getTime() === b.getTime();
const toIso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const formatLong = (d) =>
  d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

function DatePicker({ name, placeholder = "Pick a date" }) {
  const today = startOfDay(new Date());
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [direction, setDirection] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Form reset clears the hidden input; mirror that in state
  useEffect(() => {
    const formEl = rootRef.current?.closest("form");
    if (!formEl) return undefined;
    const onReset = () => setSelected(null);
    formEl.addEventListener("reset", onReset);
    return () => formEl.removeEventListener("reset", onReset);
  }, []);

  const isCurrentMonth =
    view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();

  const shiftMonth = (n) => {
    setDirection(n);
    setView((v) => new Date(v.getFullYear(), v.getMonth() + n, 1));
  };

  const pick = (d) => {
    setSelected(d);
    setView(new Date(d.getFullYear(), d.getMonth(), 1));
    setOpen(false);
  };

  const leading = (view.getDay() + 6) % 7;
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];

  const quick = [
    { label: "In 3 days", date: addDays(today, 3) },
    { label: "In a week", date: addDays(today, 7) },
    { label: "In 2 weeks", date: addDays(today, 14) },
  ];

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={selected ? formatLong(selected) : ""} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`hero-copy flex w-full items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
          open ? "border-[#c62828] bg-white" : "border-[#1a1210]/10 bg-[#faf7f2] hover:border-[#1a1210]/25"
        }`}
      >
        <FiCalendar className={`shrink-0 ${selected ? "text-[#c62828]" : "text-[#1a1210]/35"}`} />
        <span className={`flex-1 truncate ${selected ? "font-semibold text-[#1a1210]" : "text-[#1a1210]/35"}`}>
          {selected ? formatLong(selected) : placeholder}
        </span>
        {selected && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear date"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                setSelected(null);
              }
            }}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#1a1210]/40 hover:bg-[#1a1210]/[0.06] hover:text-[#1a1210]"
          >
            <FiX />
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Choose a date"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 z-40 mt-2 w-[min(320px,calc(100vw-2rem))] origin-top rounded-2xl border border-[#1a1210]/[0.08] bg-white p-4 shadow-[0_24px_60px_-20px_rgba(26,18,16,0.35)] sm:left-auto sm:right-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                disabled={isCurrentMonth}
                aria-label="Previous month"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1a1210] transition-colors hover:bg-[#f6f1ea] disabled:opacity-25"
              >
                <FiChevronLeft />
              </button>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={view.toISOString()}
                  initial={{ opacity: 0, x: direction * 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -12 }}
                  transition={{ duration: 0.15 }}
                  className="hero-copy text-sm font-bold text-[#1a1210]"
                >
                  {view.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                </motion.p>
              </AnimatePresence>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1a1210] transition-colors hover:bg-[#f6f1ea]"
              >
                <FiChevronRight />
              </button>
            </div>

            {/* Weekdays */}
            <div className="mt-3 grid grid-cols-7 text-center">
              {WEEKDAYS.map((d) => (
                <span key={d} className="hero-copy py-1 text-[11px] font-semibold text-[#1a1210]/40">
                  {d}
                </span>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-y-1 text-center">
              {cells.map((d, i) => {
                if (!d) return <span key={`e-${i}`} />;
                const past = d < today;
                const isToday = sameDay(d, today);
                const isSel = sameDay(d, selected);
                return (
                  <button
                    key={toIso(d)}
                    type="button"
                    disabled={past}
                    onClick={() => pick(d)}
                    aria-label={formatLong(d)}
                    aria-pressed={isSel}
                    className={`hero-copy relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                      isSel
                        ? "bg-[#c62828] font-bold text-white shadow-[0_6px_14px_-6px_rgba(198,40,40,0.9)]"
                        : past
                          ? "text-[#1a1210]/20"
                          : "font-medium text-[#1a1210] hover:bg-[#c62828]/10 hover:text-[#c62828]"
                    }`}
                  >
                    {d.getDate()}
                    {isToday && !isSel && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#c62828]" aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick picks */}
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#1a1210]/[0.07] pt-3">
              {quick.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => pick(q.date)}
                  className={`hero-copy rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    sameDay(q.date, selected)
                      ? "bg-[#1a1210] text-white"
                      : "bg-[#f6f1ea] text-[#1a1210]/70 hover:bg-[#ece4d9]"
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DatePicker;
