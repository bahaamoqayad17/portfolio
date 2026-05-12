"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2, 20]} />
        <MeshDistortMaterial
          color="#a855f7"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#7c3aed"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRing({
  radius,
  speed,
  color,
  thickness = 0.02,
}: {
  radius: number;
  speed: number;
  color: string;
  thickness?: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x =
        Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        roughness={0.3}
        metalness={0.9}
      />
    </mesh>
  );
}

function FloatingParticle({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime + delay;
      meshRef.current.position.y = position[1] + Math.sin(t * 2) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(t * 1.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color="#14b8a6"
        emissive="#14b8a6"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-5, 5, 5]} intensity={0.5} color="#a855f7" />
          <pointLight position={[5, -5, 5]} intensity={0.5} color="#14b8a6" />

          <GlowingSphere />

          <OrbitingRing radius={3} speed={0.3} color="#a855f7" />
          <OrbitingRing
            radius={3.5}
            speed={-0.2}
            color="#14b8a6"
            thickness={0.015}
          />
          <OrbitingRing
            radius={4}
            speed={0.15}
            color="#8b5cf6"
            thickness={0.01}
          />

          {/* Floating particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <FloatingParticle
              key={i}
              position={[
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4,
              ]}
              delay={i * 0.5}
            />
          ))}

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
