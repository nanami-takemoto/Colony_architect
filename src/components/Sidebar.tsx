import React from 'react';
import { Pencil, Grid3X3 } from 'lucide-react';
import { TILE_TYPES_CONFIG, COLORS } from '../constants';
import type { Translations } from '../types';

interface SidebarProps {
  t: Translations;
  activeType: string;
  onActiveTypeChange: (type: string) => void;
  drawMode: string;
  onDrawModeChange: (mode: 'pen' | 'rect') => void;
  rectSize: { w: number; h: number };
  onRectSizeChange: (size: { w: number; h: number }) => void;
  activeColor: string;
  onActiveColorChange: (color: string) => void;
}

export function Sidebar({
  t,
  activeType,
  onActiveTypeChange,
  drawMode,
  onDrawModeChange,
  rectSize,
  onRectSizeChange,
  activeColor,
  onActiveColorChange,
}: SidebarProps) {
  return (
    <aside className="w-72 bg-[#161b22] border-r border-gray-800 p-4 flex flex-col gap-6 overflow-y-auto z-10 shadow-2xl scrollbar-hide">
      <section>
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
          {t.construction}
        </h3>
        <div className="flex flex-col gap-2">
          {Object.values(TILE_TYPES_CONFIG).map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => onActiveTypeChange(type.id)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                  activeType === type.id
                    ? 'bg-blue-600/10 border-blue-500 text-blue-100 shadow-inner'
                    : 'bg-[#0d1117] border-gray-700 hover:border-gray-500 text-gray-400'
                }`}
              >
                <div
                  className={`p-1.5 rounded ${
                    activeType === type.id ? 'bg-blue-600 shadow-lg' : 'bg-gray-800'
                  }`}
                >
                  <Icon
                    size={16}
                    className={activeType === type.id ? 'text-white' : 'text-gray-400'}
                  />
                </div>
                <span className="text-sm font-bold">{t[type.labelKey as keyof Translations]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {activeType === 'object' && (
        <section className="bg-black/20 p-4 rounded-xl border border-gray-800 space-y-4 animate-in fade-in duration-300">
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">
              {t.mode}
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => onDrawModeChange('pen')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded border text-xs font-bold transition ${
                  drawMode === 'pen'
                    ? 'bg-gray-700 border-gray-500'
                    : 'bg-transparent border-gray-800 text-gray-600'
                }`}
              >
                <Pencil size={12} /> {t.penMode}
              </button>
              <button
                onClick={() => onDrawModeChange('rect')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded border text-xs font-bold transition ${
                  drawMode === 'rect'
                    ? 'bg-gray-700 border-gray-500'
                    : 'bg-transparent border-gray-800 text-gray-600'
                }`}
              >
                <Grid3X3 size={12} /> {t.gridMode}
              </button>
            </div>
          </div>
          {drawMode === 'rect' && (
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[9px] text-gray-500 uppercase font-bold">
                  {t.width}
                </label>
                <input
                  type="number"
                  value={rectSize.w}
                  onChange={(e) =>
                    onRectSizeChange({
                      ...rectSize,
                      w: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full bg-[#0d1117] border border-gray-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>
              <div className="flex-1">
                <label className="text-[9px] text-gray-500 uppercase font-bold">
                  {t.height}
                </label>
                <input
                  type="number"
                  value={rectSize.h}
                  onChange={(e) =>
                    onRectSizeChange({
                      ...rectSize,
                      h: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full bg-[#0d1117] border border-gray-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>
            </div>
          )}
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">
              {t.color}
            </h4>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onActiveColorChange(c)}
                  className={`w-6 h-6 rounded-full border-2 transition ${
                    activeColor === c
                      ? 'border-white scale-110 shadow-lg'
                      : 'border-transparent hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <div className="mt-auto p-4 bg-blue-900/10 border border-blue-900/20 rounded-xl">
        <p className="text-[10px] text-blue-400/80 leading-relaxed italic">
          {t.tip}
        </p>
      </div>
    </aside>
  );
}
