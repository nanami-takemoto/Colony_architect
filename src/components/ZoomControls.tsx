import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function ZoomControls({ zoom, onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <div className="absolute bottom-8 right-8 flex items-center bg-[#161b22] rounded-full border border-gray-700 shadow-2xl p-1 gap-1">
      <button
        onClick={onZoomOut}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-700 text-gray-400 transition"
      >
        <Minus size={18} />
      </button>
      <div className="w-16 text-center text-xs font-mono font-bold text-gray-500">
        {Math.round(zoom * 100)}%
      </div>
      <button
        onClick={onZoomIn}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-700 text-gray-400 transition"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
