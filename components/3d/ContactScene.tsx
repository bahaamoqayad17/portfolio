"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PulsingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.1,
      );
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[3, 0, -2]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

function FloatingEnvelope() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={[-3, 0.5, -1]}>
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.1]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.5}
          metalness={0.3}
        />
      </mesh>
      {/* Envelope flap */}
      <mesh position={[0, 0.4, 0]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.2, 0.5, 0.05]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function ConnectingLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const points = [];
  for (let i = 0; i < 20; i++) {
    points.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
      ),
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
    </lineSegments>
  );
}

export function ContactScene() {
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
            position={[-10, -10, 5]}
            intensity={0.5}
            color="#06b6d4"
          />

          <PulsingSphere />
          <FloatingEnvelope />
          <ConnectingLines />
        </Suspense>
      </Canvas>
    </div>
  );
}
