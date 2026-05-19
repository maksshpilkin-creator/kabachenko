"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Environment, Text } from "@react-three/drei"
import { useRef, useMemo } from "react"
import type * as THREE from "three"

function GoldSphere({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#c9a96e"
          roughness={0.2}
          metalness={0.9}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function GoldRing({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#c9a96e"
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 80
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#c9a96e" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function FloatingText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Text
      ref={textRef}
      font="/fonts/Inter-Bold.ttf"
      fontSize={0.18}
      color="#8a8278"
      anchorX="center"
      anchorY="middle"
      position={[0, -2.2, 0]}
      letterSpacing={0.35}
    >
      SAINT-PETERSBURG
    </Text>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#f5f0eb" />
        <directionalLight position={[-3, 3, -3]} intensity={0.5} color="#c9a96e" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#c9a96e" />

        <GoldSphere position={[3, 1.2, -1]} scale={0.7} />
        <GoldSphere position={[-3.5, -0.8, -2]} scale={0.45} />
        <GoldSphere position={[2.5, -1.8, -1.5]} scale={0.3} />

        <GoldRing position={[-2.5, 1.5, 0]} scale={1.2} />
        <GoldRing position={[3.5, -1, -0.5]} scale={0.8} />
        <GoldRing position={[0, 2.5, -2]} scale={0.6} />

        <Particles />
        <FloatingText />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
