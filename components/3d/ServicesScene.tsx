"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Icosahedron,
  Octahedron,
  Dodecahedron,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingShape({
  position,
  color,
  Shape,
  size = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  Shape: typeof Icosahedron | typeof Octahedron | typeof Dodecahedron;
  size?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <Shape ref={meshRef} args={[size, 0]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.2}
          speed={3}
        />
      </Shape>
    </Float>
  );
}

function ConnectingLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const points = [
    new THREE.Vector3(-3, 1, 0),
    new THREE.Vector3(0, -1, 1),
    new THREE.Vector3(0, -1, 1),
    new THREE.Vector3(3, 1, -1),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
    </lineSegments>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 12;
    positions[i + 1] = (Math.random() - 0.5) * 8;
    positions[i + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#06b6d4"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export function ServicesScene() {
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
            color="#a855f7"
          />

          <RotatingShape
            position={[-3.5, 1.5, -1]}
            color="#8b5cf6"
            Shape={Icosahedron}
            size={0.8}
            speed={0.8}
          />
          <RotatingShape
            position={[0, -1.5, 0]}
            color="#06b6d4"
            Shape={Octahedron}
            size={1}
            speed={1.2}
          />
          <RotatingShape
            position={[3.5, 1, -0.5]}
            color="#a855f7"
            Shape={Dodecahedron}
            size={0.7}
            speed={1}
          />

          <ConnectingLines />
          <FloatingParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
