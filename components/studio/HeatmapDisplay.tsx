import React, { useEffect, useRef } from 'react';
import { HeatmapData } from '../../types';

interface HeatmapDisplayProps {
  heatmapData: HeatmapData;
  opacity: number;
}

// Viridis color map RGB values
const viridis_colors = [
  [68, 1, 84],    // #440154
  [59, 82, 139],  // #3b528b
  [33, 145, 140], // #21918c
  [94, 201, 98],  // #5ec962
  [253, 231, 37]  // #fde725
];

// Linear interpolation function
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Maps a normalized value (0-1) to a Viridis color
const viridis = (t: number) => {
  t = Math.max(0, Math.min(1, t));
  const c1_idx = Math.floor(t * (viridis_colors.length - 2));
  const c2_idx = c1_idx + 1;
  const segment_t = (t * (viridis_colors.length - 1)) - c1_idx;

  const r = Math.floor(lerp(viridis_colors[c1_idx][0], viridis_colors[c2_idx][0], segment_t));
  const g = Math.floor(lerp(viridis_colors[c1_idx][1], viridis_colors[c2_idx][1], segment_t));
  const b = Math.floor(lerp(viridis_colors[c1_idx][2], viridis_colors[c2_idx][2], segment_t));
  
  return [r, g, b];
};


const HeatmapDisplay: React.FC<HeatmapDisplayProps> = ({ heatmapData, opacity }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (heatmapData && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const numRows = heatmapData.length;
      if (numRows === 0) return; // Guard against empty heatmap data
      const numCols = heatmapData[0].length;
      if (numCols === 0) return; // Guard against rows with no data

      const cellSizeX = canvas.width / numCols;
      const cellSizeY = canvas.height / numRows;

      // Find min/max values in the data for color scaling
      let minVal = Infinity;
      let maxVal = -Infinity;
      heatmapData.forEach(row => {
        row.forEach(val => {
          if (val < minVal) minVal = val;
          if (val > maxVal) maxVal = val;
        });
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const range = maxVal - minVal;

      for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
          const value = heatmapData[y][x];
          // FIX: If range is 0, all values are the same. Avoid division by zero (NaN).
          // Default to a mid-range color (0.5) if all values are identical.
          const normalized = range > 0 ? (value - minVal) / range : 0.5;
          const [r, g, b] = viridis(normalized);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fillRect(x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
        }
      }
    }
  }, [heatmapData, opacity]);

  if (!heatmapData) return null;

  return (
    <canvas
      ref={canvasRef}
      width="1000"
      height="1000"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default HeatmapDisplay;