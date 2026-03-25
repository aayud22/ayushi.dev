"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyIconButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 cursor-pointer ml-1 text-slate-400 hover:text-slate-900 transition-all rounded-md focus:outline-none flex items-center justify-center"
      aria-label={`Copy ${textToCopy} to clipboard`}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}