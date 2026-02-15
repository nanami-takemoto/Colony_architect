import React, { forwardRef } from 'react';
import { GRID_SIZE, CELL_SIZE, TILE_TYPES_CONFIG } from '../constants';
import type { Grid, Label, OverlayBounds } from '../types';

interface GridCanvasProps {
  grid: Grid;
  labels: Label[];
  overlayBounds: OverlayBounds | null;
  zoom: number;
  isGridEmphasized: boolean;
  activeType: string;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  setLabelEditor: (v: { x: number; y: number; text: string } | null) => void;
}

export const GridCanvas = forwardRef<HTMLDivElement, GridCanvasProps>(
  function GridCanvas(
    {
      grid,
      labels,
      overlayBounds,
      zoom,
      isGridEmphasized,
      activeType,
      onMouseDown,
      onMouseMove,
      setLabelEditor,
    },
    ref
  ) {
  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      className="grid shadow-2xl bg-[#161b22]/80 border border-gray-700 backdrop-blur-sm relative cursor-crosshair"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
        transform: `scale(${zoom})`,
        transition: 'transform 0.1s',
      }}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
        const x = i % GRID_SIZE;
        const y = Math.floor(i / GRID_SIZE);
        const tile = grid[`${x},${y}`];
        const config = tile
          ? TILE_TYPES_CONFIG[tile.type.toUpperCase()]
          : null;
        let bgColor = 'transparent';
        if (tile)
          bgColor =
            tile.type === 'object'
              ? tile.color!
              : (config?.color || 'transparent');
        return (
          <div
            key={i}
            className={`border-[0.5px] transition-colors duration-200 ${
              isGridEmphasized ? 'border-white/30' : 'border-white/5'
            }`}
            style={{ backgroundColor: bgColor }}
          >
            {tile?.type === 'object' && (
              <div className="w-full h-full bg-white/5" />
            )}
          </div>
        );
      })}

      {overlayBounds && (
        <div
          className={`absolute border-2 pointer-events-none flex items-center justify-center z-40 transition-colors ${
            activeType === 'floor'
              ? 'border-blue-400 bg-blue-400/10'
              : 'border-blue-500 bg-blue-500/20'
          }`}
          style={{
            left: overlayBounds.left,
            top: overlayBounds.top,
            width: overlayBounds.width,
            height: overlayBounds.height,
          }}
        >
          <div
            className={`${
              activeType === 'floor' ? 'bg-blue-500' : 'bg-blue-600'
            } text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap`}
          >
            {overlayBounds.tilesW} x {overlayBounds.tilesH}
          </div>
        </div>
      )}

      {labels.map((l, i) => (
        <div
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            if (activeType === 'label') setLabelEditor(l);
          }}
          className="absolute pointer-events-auto cursor-help whitespace-nowrap text-[8px] font-black text-white bg-black/70 px-1.5 py-0.5 rounded shadow-md tracking-tighter border border-white/20 flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
          style={{
            left: l.x * CELL_SIZE + CELL_SIZE / 2,
            top: l.y * CELL_SIZE + CELL_SIZE / 2,
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
          }}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
});
