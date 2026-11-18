import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, useTexture, ContactShadows } from '@react-three/drei';

const SCREEN_W = 1.48;
const SCREEN_H = 3.1;
const BODY_W = 1.64;
const BODY_H = 3.28;
const DEPTH = 0.16;

const roundedRect = (w, h, r) => {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ShapeGeometry(s, 12);
  // Map UVs to 0..1 across the rectangle so the texture fills it.
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  }
  return geo;
};

const Phone = ({ screen, pointer }) => {
  const group = useRef();
  const texture = useTexture(screen);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const screenGeo = useMemo(() => roundedRect(SCREEN_W, SCREEN_H, 0.14), []);
  const { gl } = useThree();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // Scroll progress of the canvas through the viewport: -1 (below) .. 1 (above)
    const rect = gl.domElement.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const progress = THREE.MathUtils.clamp((vh / 2 - (rect.top + rect.height / 2)) / vh, -1, 1);
    const t = state.clock.elapsedTime;

    const targetY = -0.45 + progress * 0.9 + pointer.current.x * 0.45;
    const targetX = 0.08 - pointer.current.y * 0.3 + Math.sin(t * 0.8) * 0.03;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 4, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -0.04 + pointer.current.x * -0.05, 4, delta);
    g.position.y = Math.sin(t * 1.1) * 0.06;
  });

  return (
    <group ref={group}>
      <RoundedBox args={[BODY_W, BODY_H, DEPTH]} radius={0.18} smoothness={6}>
        <meshStandardMaterial color="#121218" metalness={0.75} roughness={0.28} />
      </RoundedBox>
      {/* Screen */}
      <mesh geometry={screenGeo} position={[0, 0, DEPTH / 2 + 0.002]}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* Camera bump on the back */}
      <RoundedBox args={[0.55, 0.55, 0.05]} radius={0.12} position={[-0.42, 1.2, -DEPTH / 2 - 0.02]}>
        <meshStandardMaterial color="#1c1c24" metalness={0.8} roughness={0.25} />
      </RoundedBox>
      {/* Side button */}
      <mesh position={[BODY_W / 2 + 0.01, 0.7, 0]}>
        <boxGeometry args={[0.03, 0.4, 0.06]} />
        <meshStandardMaterial color="#2a2a33" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

const Phone3D = ({ screen, active = true }) => {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 5.9], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, -2, 2]} intensity={0.8} color="#7c7cff" />
      <pointLight position={[0, 0, -3]} intensity={6} color="#38bdf8" />
      <Phone screen={screen} pointer={pointer} />
      <ContactShadows position={[0, -1.75, 0]} opacity={0.45} scale={6} blur={2.6} far={3} />
    </Canvas>
  );
};

export default Phone3D;
