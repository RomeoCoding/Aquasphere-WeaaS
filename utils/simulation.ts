import { SceneObject, AssetType, TransmitterProperties, HeatmapData } from '../types';

// Simplified utility to generate plausible heatmap data for the frontend demo.
export const generateHeatmapData = (
  sceneObjects: SceneObject[],
  gridSize: number = 100
): HeatmapData => {
  const transmitters = sceneObjects.filter(
    (obj) => obj.type === AssetType.Transmitter
  ) as (SceneObject & { properties: TransmitterProperties })[];

  if (transmitters.length === 0) {
    return null;
  }

  const heatmap: number[][] = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));

  let maxSignal = -Infinity;
  let minSignal = Infinity;

  // 1. Calculate raw signal strength (superposition of fields)
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      // Grid position is normalized from 0-10, gridSize is number of cells
      const gridX = (x / gridSize) * 10;
      const gridY = (y / gridSize) * 10;
      
      let totalFieldStrength = 0;

      for (const tx of transmitters) {
        const txX = tx.properties.position.x;
        const txY = tx.properties.position.y;
        const power = tx.properties.transmitPower; // in dBm

        // Convert dBm to a linear scale for amplitude
        // A ∝ 10^(P_tx / 20)
        const amplitude = Math.pow(10, power / 20);

        const distance = Math.sqrt(Math.pow(gridX - txX, 2) + Math.pow(gridY - txY, 2));

        // Avoid singularity at the source
        if (distance < 0.1) {
            totalFieldStrength += amplitude / 0.1;
            continue;
        }

        // Inverse-square law for field strength
        const fieldStrength = amplitude / (distance * distance);
        totalFieldStrength += fieldStrength;
      }
      
      heatmap[y][x] = totalFieldStrength;
      if (totalFieldStrength > maxSignal) maxSignal = totalFieldStrength;
      if (totalFieldStrength < minSignal) minSignal = totalFieldStrength;
    }
  }

  // 2. Convert to dB and normalize
  const finalHeatmap: number[][] = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
        const strength = heatmap[y][x];
        // Convert to a dB-like scale. 20 * log10(Field)
        // Add a small epsilon to avoid log(0)
        let dbValue = 20 * Math.log10(strength + 1e-9);

        // Cap values to a reasonable range (e.g., -100 to -30 dBm) for visualization
        dbValue = Math.max(-100, Math.min(dbValue, -30));
        
        finalHeatmap[y][x] = dbValue;
    }
  }

  return finalHeatmap;
};
