import React from 'react';
import type { Translations } from '../types';

interface ResetConfirmModalProps {
  t: Translations;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ResetConfirmModal({
  t,
  onConfirm,
  onCancel,
}: ResetConfirmModalProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#161b22] border border-gray-700 rounded-xl p-6 max-w-sm w-full shadow-2xl text-center">
        <h2 className="text-lg font-bold text-white mb-2">{t.resetTitle}</h2>
        <p className="text-gray-400 text-sm mb-6">{t.resetDesc}</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium border border-red-700 transition shadow-lg"
          >
            {t.clearAll}
          </button>
          <button
            onClick={onCancel}
            className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
