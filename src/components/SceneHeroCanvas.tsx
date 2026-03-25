import { Float, Sparkles, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { Color, Group, InstancedMesh, Matrix4, Object3D } from 'three'

type TerrainBlock = {
  position: [number, number, number]
  scale: [number, number, number]
  color: string
}

export default function SceneHeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.35]}
      camera={{ position: [0, 5.5, 14], fov: 40, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#08110d', 12, 34]} />
      <ambientLight intensity={0.6} color="#bafdb9" />
      <directionalLight position={[8, 12, 4]} intensity={1.2} color="#e6ffe6" />
      <pointLight position={[3.4, 2.6, 1.4]} intensity={18} distance={11} color="#85ff8e" />
      <pointLight position={[-4.6, 5.2, -3.5]} intensity={11} distance={16} color="#6f9cff" />

      <CameraRig />

      <group rotation={[0, -0.26, 0]}>
        <VoxelTerrain />
        <FloatingBeacon />
        <SkyShards />
        <GroundMist />
      </group>

      <Sparkles
        count={70}
        scale={[18, 8, 18]}
        size={2.4}
        speed={0.16}
        opacity={0.42}
        color="#8cff88"
      />
      <Sparkles
        count={42}
        scale={[18, 10, 18]}
        size={2.9}
        speed={0.12}
        opacity={0.22}
        color="#8ba6ff"
      />
      <Stars radius={32} depth={14} count={180} factor={4} fade speed={0.35} />
    </Canvas>
  )
}

function CameraRig() {
  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()
    const targetX = state.pointer.x * 1.4
    const targetY = 5.3 + state.pointer.y * 0.7 + Math.sin(elapsed * 0.22) * 0.18
    const targetZ = 13.8 + Math.sin(elapsed * 0.16) * 0.14

    state.camera.position.x += (targetX - state.camera.position.x) * delta * 1.3
    state.camera.position.y += (targetY - state.camera.position.y) * delta * 1.1
    state.camera.position.z += (targetZ - state.camera.position.z) * delta * 1.2
    state.camera.lookAt(0, -1.2, 0)
  })

  return null
}

function VoxelTerrain() {
  const meshRef = useRef<InstancedMesh>(null)

  const blocks = useMemo<TerrainBlock[]>(() => {
    const items: TerrainBlock[] = []

    for (let z = -9; z <= 9; z += 1) {
      for (let x = -9; x <= 9; x += 1) {
        const distance = Math.hypot(x * 0.95, z * 0.82)
        const baseHeight =
          2.7 -
          distance * 0.16 +
          Math.sin(x * 0.82) * 0.5 +
          Math.cos(z * 0.74) * 0.45

        const height = Math.max(0.4, baseHeight)
        const brightness = Math.max(10, 20 - distance * 0.85 + height * 3.4)

        items.push({
          position: [x * 0.96, height / 2 - 4.35, z * 0.96],
          scale: [0.92, height, 0.92],
          color: `hsl(${138 - distance * 2.2}, 38%, ${brightness}%)`,
        })
      }
    }

    return items
  }, [])

  useLayoutEffect(() => {
    if (!meshRef.current) {
      return
    }

    const mesh = meshRef.current
    const dummy = new Object3D()
    const matrix = new Matrix4()

    blocks.forEach((block, index) => {
      dummy.position.set(...block.position)
      dummy.scale.set(...block.scale)
      dummy.updateMatrix()
      matrix.copy(dummy.matrix)
      mesh.setMatrixAt(index, matrix)
      mesh.setColorAt(index, new Color(block.color))
    })

    mesh.instanceMatrix.needsUpdate = true

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }
  }, [blocks])

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, blocks.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.82} metalness={0.08} />
      </instancedMesh>
      <mesh position={[0, -4.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[15, 48]} />
        <meshBasicMaterial color="#06100c" opacity={0.92} transparent />
      </mesh>
    </group>
  )
}

function FloatingBeacon() {
  const beaconRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!beaconRef.current) {
      return
    }

    beaconRef.current.rotation.y += delta * 0.28
    beaconRef.current.position.y = 1.3 + Math.sin(state.clock.getElapsedTime() * 1.1) * 0.12
  })

  return (
    <group ref={beaconRef} position={[3.2, 1.3, 0]}>
      <Float speed={1.4} rotationIntensity={0.14} floatIntensity={0.5}>
        <mesh rotation={[0.4, 0.3, 0]}>
          <boxGeometry args={[1.7, 1.7, 1.7]} />
          <meshStandardMaterial
            color="#0d2618"
            emissive="#6be078"
            emissiveIntensity={0.82}
            roughness={0.25}
            metalness={0.35}
          />
        </mesh>

        <mesh rotation={[0.4, 0.3, 0]} scale={1.08}>
          <boxGeometry args={[1.7, 1.7, 1.7]} />
          <meshBasicMaterial
            color="#9effaa"
            transparent
            opacity={0.18}
            wireframe
            toneMapped={false}
          />
        </mesh>

        <mesh position={[0, -2.7, 0]}>
          <boxGeometry args={[0.4, 5.5, 0.4]} />
          <meshBasicMaterial
            color="#8dff93"
            transparent
            opacity={0.16}
            toneMapped={false}
          />
        </mesh>

        {[0, 1, 2].map((index) => {
          const offset = (Math.PI * 2 * index) / 3

          return (
            <Float
              key={index}
              speed={1.6 + index * 0.1}
              rotationIntensity={0.4}
              floatIntensity={0.65}
            >
              <mesh
                position={[
                  Math.cos(offset) * 2.1,
                  -0.2 + index * 0.18,
                  Math.sin(offset) * 2.1,
                ]}
                rotation={[offset, offset * 0.7, 0]}
              >
                <boxGeometry args={[0.36, 0.36, 0.36]} />
                <meshStandardMaterial
                  color="#13271b"
                  emissive={index === 1 ? '#7fbaff' : '#86ff8b'}
                  emissiveIntensity={0.55}
                  roughness={0.24}
                  metalness={0.2}
                />
              </mesh>
            </Float>
          )
        })}
      </Float>
    </group>
  )
}

function SkyShards() {
  const shards: Array<{
    position: [number, number, number]
    scale: number
    color: string
    emissive: string
  }> = [
    {
      position: [-6.8, 4.6, -6.4],
      scale: 0.8,
      color: '#16301f',
      emissive: '#6fe281',
    },
    {
      position: [-3.8, 6.1, -8],
      scale: 0.52,
      color: '#10261a',
      emissive: '#7da7ff',
    },
    {
      position: [6.8, 5.3, -7.2],
      scale: 0.72,
      color: '#15311f',
      emissive: '#6fe281',
    },
    {
      position: [8.2, 3.9, -5.4],
      scale: 0.48,
      color: '#0f2318',
      emissive: '#7da7ff',
    },
  ]

  return (
    <>
      {shards.map((shard, index) => (
        <Float
          key={`${shard.position.join('-')}-${index}`}
          speed={0.8 + index * 0.12}
          rotationIntensity={0.25}
          floatIntensity={0.4}
        >
          <mesh position={shard.position} scale={shard.scale} rotation={[0.4, 0.6, 0.2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={shard.color}
              emissive={shard.emissive}
              emissiveIntensity={0.34}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function GroundMist() {
  const planes = [
    {
      position: [0, -3.85, -1.5] as [number, number, number],
      scale: [18, 6.5, 1] as [number, number, number],
      color: '#74ff8d',
      opacity: 0.08,
    },
    {
      position: [2.4, -3.25, 2.2] as [number, number, number],
      scale: [9, 3.8, 1] as [number, number, number],
      color: '#88b2ff',
      opacity: 0.06,
    },
  ]

  return (
    <>
      {planes.map((plane) => (
        <mesh
          key={`${plane.position.join('-')}-${plane.color}`}
          position={plane.position}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={plane.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={plane.color}
            transparent
            opacity={plane.opacity}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  )
}
