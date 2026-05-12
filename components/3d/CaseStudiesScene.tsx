"use client";

import { Canvas } from "@react-three/fiber";
import { Float, RoundedBox, Torus } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataCube({
  position,
  color,
  delay,
}: {
  position: [number, number, number];
  color: string;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + delay;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox
        ref={meshRef}
        args={[0.8, 0.8, 0.8]}
        radius={0.1}
        position={position}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          metalness={0.5}
          roughness={0.2}
        />
      </RoundedBox>
    </Float>
  );
}

function ConnectionRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      ringRef.current.rotation.x = Math.PI / 4;
    }
  });

  return (
    <Torus ref={ringRef} args={[3, 0.02, 16, 100]}>
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.4}
        emissive="#8b5cf6"
        emissiveIntensity={0.3}
      />
    </Torus>
  );
}

function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    const angle = (i / 3) * ((Math.PI * 2) / (count / 3));
    const radius = 2 + Math.random() * 2;
    positions[i] = Math.cos(angle) * radius;
    positions[i + 1] = (Math.random() - 0.5) * 3;
    positions[i + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06b6d4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function CaseStudiesScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight
            position={[-10, -10, 5]}
            intensity={0.5}
            color="#06b6d4"
          />

          <DataCube position={[-2.5, 1, 0]} color="#8b5cf6" delay={0} />
          <DataCube position={[2.5, -0.5, -1]} color="#06b6d4" delay={1} />
          <DataCube position={[0, 1.5, -2]} color="#a855f7" delay={2} />

          <ConnectionRing />
          <DataParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
