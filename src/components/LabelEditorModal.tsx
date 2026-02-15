import React from 'react';
import { Type, X } from 'lucide-react';
import type { Translations } from '../types';

interface LabelEditorModalProps {
  t: Translations;
  editor: { x: number; y: number; text: string };
  onEditorChange: (v: { x: number; y: number; text: string }) => void;
  onClose: () => void;
  onSave: () => void;
  onClear: () => void;
}

export function LabelEditorModal({
  t,
  editor,
  onEditorChange,
  onClose,
  onSave,
  onClear,
}: LabelEditorModalProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1c2128] border border-gray-700 rounded-xl p-5 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Type size={16} className="text-blue-500" /> {t.areaDesignation}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>
        <input
          autoFocus
          type="text"
          placeholder={t.labelPlaceholder}
          value={editor.text}
          onChange={(e) =>
            onEditorChange({ ...editor, text: e.target.value })
          }
          onKeyDown={(e) => e.key === 'Enter' && onSave()}
          className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none mb-4 font-mono shadow-inner text-center"
        />
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs font-bold text-gray-400 transition"
          >
            {t.labelClear}
          </button>
          <button
            onClick={onSave}
            className="flex-[2] px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition shadow-lg"
          >
            {t.labelConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}
