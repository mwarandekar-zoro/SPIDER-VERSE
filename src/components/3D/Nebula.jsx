import Glow from '../Effects/Glow';

const NEBULA_CLOUDS = [
  { color: '#b026ff', position: [-6, 3, -14], scale: 9, intensity: 0.06 },
  { color: '#00f0ff', position: [7, -4, -18], scale: 11, intensity: 0.05 },
  { color: '#ff5fd1', position: [-4, -5, -20], scale: 8, intensity: 0.055 },
  { color: '#7c2ecf', position: [5, 5, -16], scale: 7.5, intensity: 0.06 },
  { color: '#00f0ff', position: [0, -7, -24], scale: 10, intensity: 0.045 },
];

/**
 * Large, very soft glow clouds scattered through the deep
 * background — reuses the Glow primitive from the Effects folder
 * at a much bigger scale. Makes the void read as a living,
 * color-washed multiverse from the first frame, before any
 * interaction happens, rather than solid black with a few faint
 * points floating in it.
 */
export default function Nebula() {
  return (
    <group>
      {NEBULA_CLOUDS.map((cloud, i) => (
        <group key={i} position={cloud.position}>
          <Glow color={cloud.color} radius={1} scale={cloud.scale} intensity={cloud.intensity} />
        </group>
      ))}
    </group>
  );
}
