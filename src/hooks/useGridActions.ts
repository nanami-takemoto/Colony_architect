import { useCallback } from 'react';
import { GRID_SIZE } from '../constants';
import type { Grid, Label } from '../types';

export function useGridActions(
  grid: Grid,
  setGrid: (v: Grid | ((prev: Grid) => Grid)) => void,
  saveToHistory: () => void,
  activeType: string,
  activeColor: string,
  drawMode: string,
  rectSize: { w: number; h: number },
  labels: Label[],
  setLabelEditor: (v: { x: number; y: number; text: string } | null) => void
) {
  const applyRectangle = useCallback(
    (x1: number, y1: number, x2: number, y2: number, type: string, color?: string) => {
      setGrid((prev) => {
        const newGrid = { ...prev };
        const startX = Math.min(x1, x2),
          endX = Math.max(x1, x2);
        const startY = Math.min(y1, y2),
          endY = Math.max(y1, y2);
        for (let y = startY; y <= endY; y++) {
          for (let x = startX; x <= endX; x++) {
            const key = `${x},${y}`;
            if (type === 'floor' && prev[key] && prev[key].type !== 'empty')
              continue;
            if (type === 'empty') delete newGrid[key];
            else newGrid[key] = { type, color };
          }
        }
        return newGrid;
      });
    },
    [setGrid]
  );

  const handleTileAction = useCallback(
    (x: number, y: number, isClick = false) => {
      if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return;

      if (activeType === 'label') {
        if (!isClick) return;
        saveToHistory();
        const existing = labels.find((l) => l.x === x && l.y === y);
        setLabelEditor({ x, y, text: existing ? existing.text : '' });
        return;
      }

      if (activeType === 'ruler' || activeType === 'floor') return;

      setGrid((prev) => {
        const newGrid = { ...prev };
        const apply = (tx: number, ty: number) => {
          if (tx < 0 || tx >= GRID_SIZE || ty < 0 || ty >= GRID_SIZE) return;
          const key = `${tx},${ty}`;
          if (
            activeType === 'floor' &&
            prev[key] &&
            prev[key].type !== 'empty'
          )
            return;
          if (activeType === 'empty') delete newGrid[key];
          else
            newGrid[key] = {
              type: activeType,
              color: activeType === 'object' ? activeColor : undefined,
            };
        };
        if (drawMode === 'rect' && activeType === 'object') {
          for (let dy = 0; dy < rectSize.h; dy++)
            for (let dx = 0; dx < rectSize.w; dx++) apply(x + dx, y + dy);
        } else {
          apply(x, y);
        }
        return newGrid;
      });
    },
    [
      activeType,
      labels,
      drawMode,
      rectSize,
      activeColor,
      saveToHistory,
      setGrid,
      setLabelEditor,
    ]
  );

  return { applyRectangle, handleTileAction };
}
