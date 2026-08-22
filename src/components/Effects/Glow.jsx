/**
 * A soft additive-feeling glow shell around a point light source or
 * emissive object. No real postprocessing/bloom library is
 * installed (kept dependency-light per section 4), so this fakes
 * the effect with a larger, low-opacity transparent sphere behind
 * the object it's glowing around.
 */
export default function Glow({ color = '#b026ff', radius = 1, intensity = 0.15, scale = 1.8 }) {
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={intensity} depthWrite={false} />
    </mesh>
  );
}
