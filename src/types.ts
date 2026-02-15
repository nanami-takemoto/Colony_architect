import type { LucideIcon } from 'lucide-react';

export type Grid = Record<string, { type: string; color?: string }>;

export interface Label {
  x: number;
  y: number;
  text: string;
}

export interface HistorySnapshot {
  grid: Grid;
  labels: Label[];
}

export interface TileTypeConfig {
  id: string;
  labelKey: string;
  color: string;
  icon: LucideIcon;
}

export type LangKey = 'en' | 'ja';

export interface Translations {
  title: string;
  subtitle: string;
  undo: string;
  reset: string;
  gridFocus: string;
  construction: string;
  utility: string;
  eraser: string;
  floor: string;
  wall: string;
  door: string;
  object: string;
  addLabel: string;
  ruler: string;
  resetTitle: string;
  resetDesc: string;
  clearAll: string;
  cancel: string;
  areaDesignation: string;
  location: string;
  labelPlaceholder: string;
  labelClear: string;
  labelConfirm: string;
  simActive: string;
  tip: string;
  langBtn: string;
  mode: string;
  penMode: string;
  gridMode: string;
  width: string;
  height: string;
  color: string;
  memoTitle: string;
  memoPlaceholder: string;
}

export interface DragRange {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface OverlayBounds {
  left: number;
  top: number;
  width: number;
  height: number;
  tilesW: number;
  tilesH: number;
}
