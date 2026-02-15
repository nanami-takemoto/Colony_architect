import React from 'react';
import { StickyNote, ChevronLeft } from 'lucide-react';
import type { Translations } from '../types';

interface MemoPanelProps {
  t: Translations;
  isOpen: boolean;
  onToggle: () => void;
  memoText: string;
  onMemoTextChange: (value: string) => void;
}

export function MemoPanel({
  t,
  isOpen,
  onToggle,
  memoText,
  onMemoTextChange,
}: MemoPanelProps) {
  return (
    <div
      className={`absolute top-6 left-6 z-20 transition-all duration-300 ease-in-out shadow-2xl border border-gray-700 bg-[#161b22]/95 backdrop-blur rounded-xl overflow-hidden flex flex-col ${
        isOpen ? 'w-64 h-80' : 'w-10 h-10'
      }`}
    >
      <div
        className="flex items-center justify-between p-2 bg-[#21262d] cursor-pointer"
        onClick={onToggle}
      >
        {isOpen ? (
          <>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <StickyNote size={14} className="text-yellow-500" /> {t.memoTitle}
            </div>
            <ChevronLeft size={16} />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <StickyNote size={16} className="text-yellow-500" />
          </div>
        )}
      </div>
      {isOpen && (
        <textarea
          className="flex-1 bg-transparent p-4 text-sm text-gray-200 focus:outline-none resize-none"
          placeholder={t.memoPlaceholder}
          value={memoText}
          onChange={(e) => onMemoTextChange(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}
