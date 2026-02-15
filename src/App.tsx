import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { TRANSLATIONS, COLORS, GRID_SIZE, CELL_SIZE } from './constants';
import { useGridHistory } from './hooks/useGridHistory';
import { useGridActions } from './hooks/useGridActions';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GridCanvas } from './components/GridCanvas';
import { MemoPanel } from './components/MemoPanel';
import { ZoomControls } from './components/ZoomControls';
import { LabelEditorModal } from './components/LabelEditorModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import type { Grid, Label, DragRange } from './types';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ja'>('ja');
  const t = TRANSLATIONS[lang];

  const [grid, setGrid] = useState<Grid>({});
  const [labels, setLabels] = useState<Label[]>([]);
  const [memoText, setMemoText] = useState('');
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [isGridEmphasized, setIsGridEmphasized] = useState(false);

  const [activeType, setActiveType] = useState('floor');
  const [activeColor, setActiveColor] = useState(COLORS[7]);
  const [drawMode, setDrawMode] = useState<'pen' | 'rect'>('pen');
  const [rectSize, setRectSize] = useState({ w: 3, h: 3 });

  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState(1.4);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [labelEditor, setLabelEditor] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  const [dragRange, setDragRange] = useState<DragRange | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { history, saveToHistory, undo } = useGridHistory(
    grid,
    labels,
    setGrid,
    setLabels
  );

  const { applyRectangle, handleTileAction } = useGridActions(
    grid,
    setGrid,
    saveToHistory,
    activeType,
    activeColor,
    drawMode,
    rectSize,
    labels,
    setLabelEditor
  );

  const getGridCoords = useCallback(
    (e: React.MouseEvent) => {
      if (!gridRef.current) return { x: 0, y: 0 };
      const rect = gridRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / (CELL_SIZE * zoom));
      const y = Math.floor((e.clientY - rect.top) / (CELL_SIZE * zoom));
      return { x, y };
    },
    [zoom]
  );

  const onGridMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const { x, y } = getGridCoords(e);
      if (activeType === 'ruler' || activeType === 'floor') {
        setDragRange({ startX: x, startY: y, endX: x, endY: y });
      } else {
        saveToHistory();
      }
      setIsDrawing(true);
      handleTileAction(x, y, true);
    },
    [activeType, getGridCoords, saveToHistory, handleTileAction]
  );

  const onGridMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawing) return;
      const { x, y } = getGridCoords(e);
      if (activeType === 'ruler' || activeType === 'floor') {
        setDragRange((prev) =>
          prev ? { ...prev, endX: x, endY: y } : null
        );
      } else if (activeType !== 'label') {
        if (drawMode === 'pen' || activeType !== 'object')
          handleTileAction(x, y);
      }
    },
    [
      isDrawing,
      activeType,
      drawMode,
      getGridCoords,
      handleTileAction,
    ]
  );

  const onGlobalMouseUp = useCallback(() => {
    if (isDrawing && activeType === 'floor' && dragRange) {
      saveToHistory();
      applyRectangle(
        dragRange.startX,
        dragRange.startY,
        dragRange.endX,
        dragRange.endY,
        'floor'
      );
    }
    setIsDrawing(false);
    setDragRange(null);
  }, [isDrawing, activeType, dragRange, saveToHistory, applyRectangle]);

  const saveLabel = useCallback(() => {
    if (!labelEditor) return;
    setLabels((prev) => {
      const others = prev.filter(
        (l) => !(l.x === labelEditor.x && l.y === labelEditor.y)
      );
      return labelEditor.text.trim()
        ? [
            ...others,
            { ...labelEditor, text: labelEditor.text.toUpperCase() },
          ]
        : others;
    });
    setLabelEditor(null);
  }, [labelEditor]);

  const overlayBounds = useMemo(() => {
    if (!dragRange) return null;
    const x1 = Math.min(dragRange.startX, dragRange.endX);
    const y1 = Math.min(dragRange.startY, dragRange.endY);
    const x2 = Math.max(dragRange.startX, dragRange.endX);
    const y2 = Math.max(dragRange.startY, dragRange.endY);
    return {
      left: x1 * CELL_SIZE,
      top: y1 * CELL_SIZE,
      width: (x2 - x1 + 1) * CELL_SIZE,
      height: (y2 - y1 + 1) * CELL_SIZE,
      tilesW: x2 - x1 + 1,
      tilesH: y2 - y1 + 1,
    };
  }, [dragRange]);

  const handleResetConfirm = useCallback(() => {
    saveToHistory();
    setGrid({});
    setLabels([]);
    setShowResetConfirm(false);
  }, [saveToHistory]);

  return (
    <div
      className="flex flex-col h-screen bg-[#0d1117] text-gray-200 font-sans overflow-hidden select-none"
      onMouseUp={onGlobalMouseUp}
    >
      <Header
        t={t}
        lang={lang}
        onLangToggle={() => setLang(lang === 'en' ? 'ja' : 'en')}
        isGridEmphasized={isGridEmphasized}
        onGridEmphasizedToggle={() => setIsGridEmphasized(!isGridEmphasized)}
        canUndo={history.length > 0}
        onUndo={undo}
        onResetClick={() => setShowResetConfirm(true)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          t={t}
          activeType={activeType}
          onActiveTypeChange={setActiveType}
          drawMode={drawMode}
          onDrawModeChange={setDrawMode}
          rectSize={rectSize}
          onRectSizeChange={setRectSize}
          activeColor={activeColor}
          onActiveColorChange={setActiveColor}
        />

        <main className="flex-1 relative bg-[#0d1117] overflow-auto flex items-center justify-center p-24">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #334155 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <MemoPanel
            t={t}
            isOpen={isMemoOpen}
            onToggle={() => setIsMemoOpen(!isMemoOpen)}
            memoText={memoText}
            onMemoTextChange={setMemoText}
          />

          <GridCanvas
            ref={gridRef}
            grid={grid}
            labels={labels}
            overlayBounds={overlayBounds}
            zoom={zoom}
            isGridEmphasized={isGridEmphasized}
            activeType={activeType}
            onMouseDown={onGridMouseDown}
            onMouseMove={onGridMouseMove}
            setLabelEditor={setLabelEditor}
          />

          <ZoomControls
            zoom={zoom}
            onZoomIn={() => setZoom((z) => Math.min(3, z + 0.1))}
            onZoomOut={() => setZoom((z) => Math.max(0.3, z - 0.1))}
          />
        </main>

        {labelEditor && (
          <LabelEditorModal
            t={t}
            editor={labelEditor}
            onEditorChange={setLabelEditor}
            onClose={() => setLabelEditor(null)}
            onSave={saveLabel}
            onClear={() => setLabelEditor({ ...labelEditor, text: '' })}
          />
        )}

        {showResetConfirm && (
          <ResetConfirmModal
            t={t}
            onConfirm={handleResetConfirm}
            onCancel={() => setShowResetConfirm(false)}
          />
        )}
      </div>

      <footer className="bg-[#161b22] border-t border-gray-800 px-6 py-2 flex justify-between items-center text-[10px] text-gray-500 font-medium">
        <div className="flex gap-6">
          <span className="flex items-center gap-2 font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />{' '}
            {t.simActive}
          </span>
          <span>Grid: {GRID_SIZE}x{GRID_SIZE} Unit</span>
        </div>
      </footer>
    </div>
  );
}
