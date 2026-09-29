"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface TerminalLine {
  type: "command" | "output";
  text: string;
}

interface HeroTerminalProps {
  locale: "es" | "en";
}

const LINES_ES: TerminalLine[] = [
  { type: "command", text: "whoami" },
  { type: "output", text: "ricardo-vazquez · Java Backend Developer" },
  { type: "command", text: "cat ~/profile/focus.txt" },
  {
    type: "output",
    text: "Java · Spring Boot · REST APIs · SQL · Microservices",
  },
  { type: "command", text: "cat ~/learning/security.txt" },
  {
    type: "output",
    text: "interés activo en appsec · Spring Security · JWT · SSL/TLS · OWASP Top 10",
  },
  { type: "command", text: "ls ~/experience" },
  { type: "output", text: "banco-del-bienestar/  xelex-industrial/" },
];

const LINES_EN: TerminalLine[] = [
  { type: "command", text: "whoami" },
  { type: "output", text: "ricardo-vazquez · Java Backend Developer" },
  { type: "command", text: "cat ~/profile/focus.txt" },
  {
    type: "output",
    text: "Java · Spring Boot · REST APIs · SQL · Microservices",
  },
  { type: "command", text: "cat ~/learning/security.txt" },
  {
    type: "output",
    text: "active interest in appsec · Spring Security · JWT · SSL/TLS · OWASP Top 10",
  },
  { type: "command", text: "ls ~/experience" },
  { type: "output", text: "banco-del-bienestar/  xelex-industrial/" },
];

export function HeroTerminal({ locale }: HeroTerminalProps) {
  const lines = locale === "es" ? LINES_ES : LINES_EN;
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? lines.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleCount(lines.length);
      return;
    }

    setVisibleCount(0);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleCount(index);
      if (index >= lines.length) {
        window.clearInterval(timer);
      }
    }, 420);

    return () => window.clearInterval(timer);
  }, [lines.length, reduceMotion]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/80 bg-[#0b1220] shadow-2xl shadow-blue-950/40">
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/90 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <p className="ml-2 font-mono text-xs text-slate-400">ricardo@portfolio:~</p>
      </div>
      <div className="min-h-[220px] space-y-2 p-4 font-mono text-[13px] leading-relaxed md:min-h-[260px] md:text-sm">
        <AnimatePresence initial={false}>
          {lines.slice(0, visibleCount).map((line, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              key={`${line.type}-${index}-${line.text}`}
              transition={{ duration: 0.2 }}
            >
              {line.type === "command" ? (
                <p className="text-slate-300">
                  <span className="text-emerald-400">➜</span>{" "}
                  <span className="text-blue-300">~</span>{" "}
                  <span className="text-slate-100">{line.text}</span>
                </p>
              ) : (
                <p className="pl-4 text-slate-400">{line.text}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {visibleCount < lines.length ? (
          <span className="terminal-caret ml-1 inline-block h-4 w-2 bg-blue-400 align-middle" />
        ) : (
          <p className="text-slate-300">
            <span className="text-emerald-400">➜</span>{" "}
            <span className="text-blue-300">~</span>{" "}
            <span className="terminal-caret ml-1 inline-block h-4 w-2 bg-blue-400 align-middle" />
          </p>
        )}
      </div>
    </div>
  );
}
