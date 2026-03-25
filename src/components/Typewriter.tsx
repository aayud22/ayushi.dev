"use client";

import { useEffect, useMemo, useState } from "react";

type TypewriterProps = {
  words: string[];
  className?: string;
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
  cursorClassName?: string;
};

export function Typewriter({
  words,
  className,
  typingSpeedMs = 70,
  deletingSpeedMs = 45,
  pauseMs = 800,
  cursorClassName,
}: TypewriterProps) {
  const safeWords = useMemo(
    () => (words.length ? words : [""]),
    [words],
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const currentWord = safeWords[wordIndex % safeWords.length] ?? "";

    const atFullWord = text === currentWord;
    const atEmpty = text.length === 0;

    const speed = isDeleting ? deletingSpeedMs : typingSpeedMs;

    const delay = atFullWord || (atEmpty && isDeleting) ? pauseMs : speed;

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (atFullWord) {
          setIsDeleting(true);
          return;
        }
        setText(currentWord.slice(0, text.length + 1));
        return;
      }

      if (atEmpty) {
        setIsDeleting(false);
        setWordIndex((v) => (v + 1) % safeWords.length);
        return;
      }

      setText(currentWord.slice(0, text.length - 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    deletingSpeedMs,
    isDeleting,
    pauseMs,
    reduceMotion,
    safeWords,
    text,
    typingSpeedMs,
    wordIndex,
  ]);

  if (reduceMotion) {
    return <span className={className}>{safeWords[0]}</span>;
  }

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden
        className={
          cursorClassName ??
          "inline-block w-[0.12em] translate-y-[0.08em] animate-pulse"
        }
      >
        |
      </span>
    </span>
  );
}
