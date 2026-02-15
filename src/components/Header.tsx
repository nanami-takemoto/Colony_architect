import React from 'react';
import { Layout as LayoutIcon, Globe, Hash, Undo2, RotateCcw } from 'lucide-react';
import type { Translations } from '../types';

interface HeaderProps {
  t: Translations;
  lang: string;
  onLangToggle: () => void;
  isGridEmphasized: boolean;
  onGridEmphasizedToggle: () => void;
  canUndo: boolean;
  onUndo: () => void;
  onResetClick: () => void;
}

export function Header({
  t,
  lang,
  onLangToggle,
  isGridEmphasized,
  onGridEmphasizedToggle,
  canUndo,
  onUndo,
  onResetClick,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#161b22] border-b border-gray-800 shadow-xl z-30">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
          <LayoutIcon size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase leading-none">
            {t.title}
          </h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onLangToggle}
          className="px-3 py-2 rounded-md text-xs font-bold border border-gray-700 bg-gray-800/50 hover:bg-gray-700 transition flex items-center gap-2 mr-2"
        >
          <Globe size={14} className="text-blue-400" /> {t.langBtn}
        </button>

        <div className="h-6 w-px bg-gray-800 mr-2" />

        <button
          onClick={onGridEmphasizedToggle}
          className={`px-3 py-2 rounded-md text-sm font-medium border transition flex items-center gap-2 ${
            isGridEmphasized
              ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
              : 'bg-gray-800 border-gray-700 hover:border-gray-500 text-gray-400'
          }`}
        >
          <Hash size={16} /> {t.gridFocus}
        </button>

        <button
          disabled={!canUndo}
          onClick={onUndo}
          className={`px-3 py-2 rounded-md text-sm font-medium border transition flex items-center gap-2 ${
            canUndo
              ? 'bg-gray-800 border-gray-600 hover:border-gray-400 text-white'
              : 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          <Undo2 size={16} /> {t.undo}
        </button>
        <button
          onClick={onResetClick}
          className="bg-red-900/20 hover:bg-red-900/40 text-red-400 px-4 py-2 rounded-md text-sm font-medium transition border border-red-900/50 flex items-center gap-2"
        >
          <RotateCcw size={16} /> {t.reset}
        </button>
      </div>
    </header>
  );
}
