"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Box ref={meshRef} args={[1.5, 1.5, 1.5]} position={[-2, 0, 0]}>
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.6}
          wireframe
        />
      </Box>
    </Float>
  );
}

function GlowingSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere args={[1, 64, 64]} position={[2, 0.5, 0]}>
        <MeshDistortMaterial
          color="#a855f7"
          transparent
          opacity={0.7}
          distort={0.3}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

function OrbitingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <Torus ref={ringRef} args={[2.5, 0.05, 16, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#06b6d4"
        transparent
        opacity={0.5}
        emissive="#06b6d4"
        emissiveIntensity={0.5}
      />
    </Torus>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function AboutScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#06b6d4"
          />

          <FloatingCube />
          <GlowingSphere />
          <OrbitingRing />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
