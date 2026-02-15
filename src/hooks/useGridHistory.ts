import { useState, useCallback, useEffect } from 'react';
import { MAX_HISTORY } from '../constants';
import type { Grid, Label, HistorySnapshot } from '../types';

export function useGridHistory(
  grid: Grid,
  labels: Label[],
  setGrid: (v: Grid | ((prev: Grid) => Grid)) => void,
  setLabels: (v: Label[] | ((prev: Label[]) => Label[])) => void
) {
  const [history, setHistory] = useState<HistorySnapshot[]>([]);

  const saveToHistory = useCallback(() => {
    const snapshot: HistorySnapshot = {
      grid: { ...grid },
      labels: [...labels],
    };
    setHistory((prev) => [...prev, snapshot].slice(-MAX_HISTORY));
  }, [grid, labels]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setGrid(previous.grid);
    setLabels(previous.labels);
    setHistory((prev) => prev.slice(0, -1));
  }, [history, setGrid, setLabels]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === 'z' &&
        !['TEXTAREA', 'INPUT'].includes(
          (document.activeElement as HTMLElement)?.tagName || ''
        )
      ) {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo]);

  return { history, saveToHistory, undo };
}
