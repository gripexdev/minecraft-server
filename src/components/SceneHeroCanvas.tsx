import { Float, Sparkles, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import {
  Color,
  Group,
  InstancedMesh,
  MathUtils,
  Matrix4,
  Object3D,
  Vector3,
} from 'three'

type Vec3 = [number, number, number]

type Block = {
  position: Vec3
  scale: Vec3
  color: string
}

type Accent = {
  position: Vec3
  scale: number
  color: string
}

type CharacterPalette = {
  skin: string
  hair: string
  torso: string
  torsoFront: string
  pants: string
  boots: string
  cape?: string
  hood?: string
  armorPrimary?: string
  armorSecondary?: string
  eye?: string
  swordGlow?: string
}

type CharacterVariant = 'classic' | 'hooded' | 'knight' | 'sentinel'

type CharacterConfig = {
  key: string
  position: Vec3
  rotation: number
  scale: number
  phase: number
  variant: CharacterVariant
  swordHand: 'left' | 'right' | null
  palette: CharacterPalette
}

type VoxelCuboidProps = {
  position: Vec3
  size: Vec3
  color: string
  rotation?: Vec3
  roughness?: number
  metalness?: number
  emissive?: string
  emissiveIntensity?: number
}

export default function SceneHeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.1]}
      camera={{ position: [0, 1.36, 10.15], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.75 }}
    >
      <fog attach="fog" args={['#050b09', 9, 26]} />
      <ambientLight intensity={0.62} color="#d8ffe2" />
      <directionalLight position={[6, 8, 5]} intensity={1.15} color="#f0fff4" />
      <pointLight position={[0, 2.8, 0]} intensity={16} distance={12} color="#89ff95" />
      <pointLight position={[-4.4, 4.8, -2.8]} intensity={9} distance={18} color="#89a7ff" />
      <spotLight
        position={[0.2, 5.8, 5.8]}
        angle={0.34}
        penumbra={0.85}
        intensity={34}
        distance={18}
        color="#f8fff8"
      />
      <pointLight position={[0.4, 1.8, 4.2]} intensity={7.2} distance={8} color="#bfe8ff" />

      <CameraRig />

      <group position={[0, -0.4, 0]}>
        <FloatingIsland />
        <MiniIsland position={[-4.9, -1.2, -5.6]} scale={0.48} />
        <MiniIsland position={[5.2, -0.6, -4.8]} scale={0.36} />
        <SkyShards />
        <AtmospherePlanes />
      </group>

      <Sparkles
        count={52}
        scale={[18, 8, 18]}
        size={2.4}
        speed={0.12}
        opacity={0.3}
        color="#90ff94"
      />
      <Sparkles
        count={24}
        scale={[20, 11, 20]}
        size={2.2}
        speed={0.08}
        opacity={0.12}
        color="#8fa8ff"
      />
      <Stars radius={28} depth={10} count={120} factor={3.2} fade speed={0.18} />
    </Canvas>
  )
}

function CameraRig() {
  const lookTarget = useRef(new Vector3(0.16, 0.68, 1.9))

  useFrame((state, delta) => {
    const smoothDelta = Math.min(delta, 0.05)
    const elapsed = state.clock.getElapsedTime()
    const targetX = state.pointer.x * 0.42
    const targetY = 1.28 + state.pointer.y * 0.16 + Math.sin(elapsed * 0.18) * 0.06
    const targetZ = 10.08 + Math.sin(elapsed * 0.16) * 0.05

    state.camera.position.x = MathUtils.damp(
      state.camera.position.x,
      targetX,
      4.4,
      smoothDelta,
    )
    state.camera.position.y = MathUtils.damp(
      state.camera.position.y,
      targetY,
      4.1,
      smoothDelta,
    )
    state.camera.position.z = MathUtils.damp(
      state.camera.position.z,
      targetZ,
      4.4,
      smoothDelta,
    )

    lookTarget.current.x = MathUtils.damp(
      lookTarget.current.x,
      0.16 + state.pointer.x * 0.18,
      3.4,
      smoothDelta,
    )
    lookTarget.current.y = MathUtils.damp(
      lookTarget.current.y,
      0.66 + state.pointer.y * 0.08 + Math.sin(elapsed * 0.22) * 0.04,
      3.2,
      smoothDelta,
    )
    lookTarget.current.z = MathUtils.damp(
      lookTarget.current.z,
      1.9 + Math.cos(elapsed * 0.15) * 0.04,
      3.2,
      smoothDelta,
    )

    state.camera.lookAt(lookTarget.current)
  })

  return null
}

function FloatingIsland() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return
    }

    const smoothDelta = Math.min(delta, 0.05)
    const elapsed = state.clock.getElapsedTime()

    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      Math.sin(elapsed * 0.46) * 0.06,
      3.2,
      smoothDelta,
    )
    groupRef.current.rotation.x = MathUtils.damp(
      groupRef.current.rotation.x,
      Math.sin(elapsed * 0.24) * 0.018,
      2.6,
      smoothDelta,
    )
    groupRef.current.rotation.z = MathUtils.damp(
      groupRef.current.rotation.z,
      Math.cos(elapsed * 0.28) * 0.018,
      2.6,
      smoothDelta,
    )
  })

  return (
    <group ref={groupRef}>
      <IslandBody />
      <RelicCore />
      <VoxelSquad />
      <IslandAccents />
      <mesh position={[0, -4.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.9, 48]} />
        <meshBasicMaterial color="#04100b" opacity={0.9} transparent />
      </mesh>
    </group>
  )
}

function IslandBody() {
  const meshRef = useRef<InstancedMesh>(null)

  const blocks = useMemo<Block[]>(() => {
    const items: Block[] = []

    for (let x = -4; x <= 4; x += 1) {
      for (let z = -4; z <= 4; z += 1) {
        const distance = Math.hypot(x, z)
        const ridge = Math.sin(x * 1.12) * 0.24 + Math.cos(z * 1.18) * 0.22
        const topHeight = Math.max(1, Math.round(3.4 - distance * 0.52 + ridge))

        for (let y = 0; y < topHeight; y += 1) {
          const isTop = y === topHeight - 1
          items.push({
            position: [x * 0.88, y * 0.72 - 1.7, z * 0.88],
            scale: [0.84, 0.7, 0.84],
            color: isTop
              ? distance < 2.4
                ? '#2f7340'
                : '#275c37'
              : y > topHeight - 3
                ? '#3a2d1f'
                : '#19211c',
          })
        }

        const hanging =
          distance < 3.3 ? Math.max(0, Math.round(2.8 - distance * 0.74 + ridge)) : 0

        for (let y = 1; y <= hanging; y += 1) {
          items.push({
            position: [x * 0.88, -2.4 - y * 0.72, z * 0.88],
            scale: [0.82, 0.68, 0.82],
            color: y < hanging ? '#0f1614' : '#1a2520',
          })
        }
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
    <instancedMesh ref={meshRef} args={[undefined, undefined, blocks.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.88} metalness={0.05} />
    </instancedMesh>
  )
}

function RelicCore() {
  const relicRef = useRef<Group>(null)
  const ringRefs = useRef<Group[]>([])

  useFrame((state, delta) => {
    if (!relicRef.current) {
      return
    }

    const smoothDelta = Math.min(delta, 0.05)
    const elapsed = state.clock.getElapsedTime()
    relicRef.current.rotation.y += smoothDelta * 0.2
    relicRef.current.position.y = MathUtils.damp(
      relicRef.current.position.y,
      1.38 + Math.sin(elapsed * 0.84) * 0.06,
      3.2,
      smoothDelta,
    )

    ringRefs.current.forEach((ring, index) => {
      ring.rotation.z += smoothDelta * (0.24 + index * 0.06)
      ring.rotation.y += smoothDelta * (0.1 + index * 0.04)
    })
  })

  return (
    <group ref={relicRef} position={[0, 1.2, -0.82]} scale={0.92}>
      <mesh position={[0, -1.22, 0]}>
        <boxGeometry args={[1.4, 0.42, 1.4]} />
        <meshStandardMaterial color="#102018" roughness={0.42} metalness={0.18} />
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <boxGeometry args={[0.7, 0.8, 0.7]} />
        <meshStandardMaterial
          color="#132419"
          emissive="#6fe180"
          emissiveIntensity={0.12}
          roughness={0.34}
        />
      </mesh>

      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.26, 2.5, 0.26]} />
        <meshStandardMaterial
          color="#d1f3d6"
          emissive="#98ff9d"
          emissiveIntensity={0.74}
          roughness={0.16}
          metalness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.05, 0.22, 0.22]} />
        <meshStandardMaterial
          color="#d4ffde"
          emissive="#89ff95"
          emissiveIntensity={0.58}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[0.34, 0.54, 0.34]} />
        <meshStandardMaterial color="#0f1612" roughness={0.2} metalness={0.18} />
      </mesh>

      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[0.36, 5.8, 0.36]} />
        <meshBasicMaterial color="#93ff99" transparent opacity={0.16} toneMapped={false} />
      </mesh>

      {[0, 1, 2].map((index) => (
        <group
          key={index}
          ref={(node) => {
            if (node) {
              ringRefs.current[index] = node
            }
          }}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.55 + index * 0.28, 0]}>
            <torusGeometry args={[1.4 + index * 0.24, 0.03, 12, 48]} />
            <meshBasicMaterial
              color={index === 1 ? '#8aa8ff' : '#94ff9a'}
              transparent
              opacity={0.34 - index * 0.06}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {[0, 1, 2, 3].map((index) => {
        const angle = (Math.PI * 2 * index) / 4
        return (
          <Float
            key={index}
            speed={1.2 + index * 0.14}
            rotationIntensity={0.3}
            floatIntensity={0.45}
          >
            <mesh
              position={[
                Math.cos(angle) * 1.85,
                1.1 + (index % 2) * 0.24,
                Math.sin(angle) * 1.85,
              ]}
              rotation={[angle, angle * 0.65, 0]}
            >
              <boxGeometry args={[0.24, 0.24, 0.24]} />
              <meshStandardMaterial
                color="#102019"
                emissive={index % 2 === 0 ? '#91ff98' : '#90a8ff'}
                emissiveIntensity={0.55}
                roughness={0.24}
                metalness={0.18}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function IslandAccents() {
  const meshRef = useRef<InstancedMesh>(null)

  const accents = useMemo<Accent[]>(
    () => [
      { position: [-1.1, 0.92, 1.2], scale: 0.28, color: '#8fff97' },
      { position: [1.35, 1.12, -0.8], scale: 0.3, color: '#96a8ff' },
      { position: [2.1, 0.92, 1.1], scale: 0.22, color: '#8fff97' },
      { position: [-2.05, 0.88, -1.3], scale: 0.2, color: '#96a8ff' },
    ],
    [],
  )

  useLayoutEffect(() => {
    if (!meshRef.current) {
      return
    }

    const mesh = meshRef.current
    const dummy = new Object3D()
    const matrix = new Matrix4()

    accents.forEach((accent, index) => {
      dummy.position.set(...accent.position)
      dummy.scale.set(accent.scale, accent.scale, accent.scale)
      dummy.updateMatrix()
      matrix.copy(dummy.matrix)
      mesh.setMatrixAt(index, matrix)
      mesh.setColorAt(index, new Color(accent.color))
    })

    mesh.instanceMatrix.needsUpdate = true

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }
  }, [accents])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, accents.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial emissiveIntensity={0.42} roughness={0.24} metalness={0.14} />
    </instancedMesh>
  )
}

function VoxelSquad() {
  const groupRef = useRef<Group>(null)
  const squad = useMemo<CharacterConfig[]>(
    () => [
      {
        key: 'iron-knight',
        position: [-1.58, -0.02, 0.5],
        rotation: 0.38,
        scale: 0.86,
        phase: 0.1,
        variant: 'knight',
        swordHand: 'left',
        palette: {
          skin: '#c38a61',
          hair: '#eef1f6',
          torso: '#8a9098',
          torsoFront: '#d7dde4',
          pants: '#767b84',
          boots: '#434950',
          cape: '#1a2025',
          armorPrimary: '#d6dbe2',
          armorSecondary: '#7d8791',
          eye: '#7cb8ff',
          swordGlow: '#8df9ff',
        },
      },
      {
        key: 'forest-ranger',
        position: [-0.44, 0.02, 1.02],
        rotation: 0.16,
        scale: 0.95,
        phase: 0.48,
        variant: 'hooded',
        swordHand: null,
        palette: {
          skin: '#c98f63',
          hair: '#204f28',
          torso: '#3e8d44',
          torsoFront: '#6bd367',
          pants: '#232829',
          boots: '#13361f',
          cape: '#173522',
          hood: '#2c6a34',
          eye: '#76b8ff',
        },
      },
      {
        key: 'village-champion',
        position: [0.68, 0.06, 1.24],
        rotation: -0.08,
        scale: 1,
        phase: 0.88,
        variant: 'classic',
        swordHand: 'right',
        palette: {
          skin: '#d59569',
          hair: '#6f4e37',
          torso: '#4e88db',
          torsoFront: '#78acf5',
          pants: '#5f48be',
          boots: '#39275e',
          eye: '#78b9ff',
          swordGlow: '#8ffcff',
        },
      },
      {
        key: 'stone-sentinel',
        position: [1.76, -0.03, 0.36],
        rotation: -0.34,
        scale: 0.88,
        phase: 1.34,
        variant: 'sentinel',
        swordHand: 'right',
        palette: {
          skin: '#8c929b',
          hair: '#b7bdc5',
          torso: '#707780',
          torsoFront: '#c0c6cf',
          pants: '#666d75',
          boots: '#353a40',
          armorPrimary: '#c7ced6',
          armorSecondary: '#717983',
          eye: '#dcecff',
          swordGlow: '#8ff7ff',
        },
      },
    ],
    [],
  )

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return
    }

    const smoothDelta = Math.min(delta, 0.05)
    const elapsed = state.clock.getElapsedTime()

    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      0.48 + Math.sin(elapsed * 0.36) * 0.03,
      2.8,
      smoothDelta,
    )
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      Math.sin(elapsed * 0.22) * 0.035,
      2.4,
      smoothDelta,
    )
  })

  return (
    <group ref={groupRef} position={[0.12, 0.48, 1.86]} scale={1.26}>
      <mesh position={[0.1, -0.14, 0.42]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.2, 40]} />
        <meshBasicMaterial color="#07110d" transparent opacity={0.34} />
      </mesh>
      <mesh position={[0.12, 1.1, -0.62]}>
        <planeGeometry args={[6.2, 3.8]} />
        <meshBasicMaterial
          color="#8efc98"
          transparent
          opacity={0.045}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {squad.map(({ key, ...character }) => (
        <VoxelChampion key={key} {...character} />
      ))}
    </group>
  )
}

function VoxelChampion({
  position,
  rotation,
  scale,
  phase,
  variant,
  swordHand,
  palette,
}: CharacterConfig) {
  const rootRef = useRef<Group>(null)
  const headRef = useRef<Group>(null)
  const capeRef = useRef<Group>(null)
  const leftArmRef = useRef<Group>(null)
  const rightArmRef = useRef<Group>(null)
  const armored = variant === 'knight' || variant === 'sentinel'

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()
    const smoothDelta = Math.min(delta, 0.05)

    if (rootRef.current) {
      rootRef.current.position.y = MathUtils.damp(
        rootRef.current.position.y,
        position[1] + Math.sin(elapsed * 0.78 + phase) * 0.028,
        4,
        smoothDelta,
      )
      rootRef.current.rotation.y = MathUtils.damp(
        rootRef.current.rotation.y,
        rotation + Math.sin(elapsed * 0.28 + phase) * 0.032,
        3.2,
        smoothDelta,
      )
    }

    if (headRef.current) {
      headRef.current.rotation.x = MathUtils.damp(
        headRef.current.rotation.x,
        Math.sin(elapsed * 0.52 + phase) * 0.018,
        3,
        smoothDelta,
      )
      headRef.current.rotation.y = MathUtils.damp(
        headRef.current.rotation.y,
        Math.sin(elapsed * 0.42 + phase) * 0.055,
        3,
        smoothDelta,
      )
    }

    if (capeRef.current) {
      capeRef.current.rotation.x = MathUtils.damp(
        capeRef.current.rotation.x,
        -0.12 + Math.sin(elapsed * 0.74 + phase) * 0.035,
        2.8,
        smoothDelta,
      )
    }

    if (leftArmRef.current) {
      const isSwordArm = swordHand === 'left'
      leftArmRef.current.rotation.x = MathUtils.damp(
        leftArmRef.current.rotation.x,
        isSwordArm
          ? 0.7 + Math.sin(elapsed * 0.58 + phase) * 0.04
          : -0.1 + Math.sin(elapsed * 0.84 + phase) * 0.1,
        3.2,
        smoothDelta,
      )
      leftArmRef.current.rotation.z = MathUtils.damp(
        leftArmRef.current.rotation.z,
        isSwordArm ? 0.08 : 0.015,
        3.2,
        smoothDelta,
      )
    }

    if (rightArmRef.current) {
      const isSwordArm = swordHand === 'right'
      rightArmRef.current.rotation.x = MathUtils.damp(
        rightArmRef.current.rotation.x,
        isSwordArm
          ? 0.7 + Math.sin(elapsed * 0.58 + phase) * 0.04
          : -0.1 - Math.sin(elapsed * 0.84 + phase) * 0.1,
        3.2,
        smoothDelta,
      )
      rightArmRef.current.rotation.z = MathUtils.damp(
        rightArmRef.current.rotation.z,
        isSwordArm ? -0.08 : -0.015,
        3.2,
        smoothDelta,
      )
    }
  })

  return (
    <group ref={rootRef} position={position} rotation={[0, rotation, 0]} scale={scale}>
      {palette.cape ? (
        <group ref={capeRef} position={[0, 1.08, -0.24]}>
          <VoxelCuboid
            position={[0, 0.1, -0.04]}
            size={[0.84, 1.08, 0.05]}
            color={palette.cape}
            emissive={variant === 'hooded' ? '#6ee57f' : undefined}
            emissiveIntensity={variant === 'hooded' ? 0.06 : undefined}
            roughness={0.62}
          />
        </group>
      ) : null}

      <VoxelCuboid
        position={[0, 1.05, 0]}
        size={[0.78, 0.96, 0.42]}
        color={palette.torso}
        roughness={0.84}
      />

      {armored ? (
        <>
          <VoxelCuboid
            position={[0, 1.06, 0.22]}
            size={[0.64, 0.78, 0.1]}
            color={palette.armorPrimary ?? palette.torsoFront}
            roughness={0.34}
            metalness={0.34}
          />
          <VoxelCuboid
            position={[0, 0.63, 0.18]}
            size={[0.78, 0.14, 0.12]}
            color={palette.armorSecondary ?? palette.pants}
            roughness={0.42}
            metalness={0.18}
          />
          <VoxelCuboid
            position={[-0.38, 1.4, 0.02]}
            size={[0.18, 0.2, 0.36]}
            color={palette.armorPrimary ?? palette.torsoFront}
            roughness={0.34}
            metalness={0.32}
          />
          <VoxelCuboid
            position={[0.38, 1.4, 0.02]}
            size={[0.18, 0.2, 0.36]}
            color={palette.armorPrimary ?? palette.torsoFront}
            roughness={0.34}
            metalness={0.32}
          />
        </>
      ) : (
        <VoxelCuboid
          position={[0, 1.06, 0.24]}
          size={[0.42, 0.56, 0.06]}
          color={palette.torsoFront}
          emissive={variant === 'hooded' ? '#7cff87' : variant === 'classic' ? '#7caeff' : undefined}
          emissiveIntensity={variant === 'hooded' ? 0.08 : variant === 'classic' ? 0.05 : undefined}
          roughness={0.52}
        />
      )}

      <VoxelCuboid
        position={[0, 0.62, 0]}
        size={[0.82, 0.12, 0.46]}
        color={variant === 'classic' ? '#2b3348' : variant === 'hooded' ? '#151a15' : '#4f5661'}
        roughness={0.7}
      />

      <group ref={headRef} position={[0, 1.82, 0]}>
        <VoxelCuboid position={[0, 0, 0]} size={[0.72, 0.72, 0.72]} color={palette.skin} />

        {variant === 'hooded' ? (
          <>
            <VoxelCuboid
              position={[0, 0.24, -0.02]}
              size={[0.82, 0.2, 0.82]}
              color={palette.hood ?? palette.hair}
              roughness={0.7}
            />
            <VoxelCuboid
              position={[0, 0.04, -0.12]}
              size={[0.82, 0.72, 0.18]}
              color={palette.hood ?? palette.hair}
              roughness={0.74}
            />
            <VoxelCuboid
              position={[0, 0.12, 0.34]}
              size={[0.72, 0.38, 0.08]}
              color={palette.hood ?? palette.hair}
              roughness={0.72}
            />
          </>
        ) : variant === 'knight' ? (
          <>
            <VoxelCuboid
              position={[0, 0.24, -0.02]}
              size={[0.84, 0.18, 0.82]}
              color={palette.armorPrimary ?? palette.hair}
              roughness={0.34}
              metalness={0.4}
            />
            <VoxelCuboid
              position={[0, 0, -0.1]}
              size={[0.84, 0.78, 0.18]}
              color={palette.armorPrimary ?? palette.hair}
              roughness={0.38}
              metalness={0.36}
            />
            <VoxelCuboid
              position={[0, -0.18, 0.3]}
              size={[0.72, 0.18, 0.08]}
              color={palette.armorSecondary ?? palette.hair}
              roughness={0.44}
              metalness={0.22}
            />
          </>
        ) : variant === 'sentinel' ? (
          <>
            <VoxelCuboid
              position={[0, 0.24, -0.02]}
              size={[0.84, 0.18, 0.82]}
              color={palette.armorPrimary ?? palette.hair}
              roughness={0.42}
              metalness={0.24}
            />
            <VoxelCuboid
              position={[0, 0.12, 0.34]}
              size={[0.72, 0.34, 0.08]}
              color={palette.armorSecondary ?? palette.hair}
              roughness={0.54}
              metalness={0.18}
            />
            <VoxelCuboid
              position={[0, -0.18, 0.32]}
              size={[0.32, 0.14, 0.08]}
              color="#42474d"
              roughness={0.62}
            />
          </>
        ) : (
          <>
            <VoxelCuboid
              position={[0, 0.24, -0.02]}
              size={[0.8, 0.18, 0.8]}
              color={palette.hair}
              roughness={0.8}
            />
            <VoxelCuboid
              position={[0, 0.1, 0.34]}
              size={[0.7, 0.34, 0.08]}
              color={palette.hair}
              roughness={0.84}
            />
          </>
        )}

        <mesh position={[-0.16, 0.03, 0.38]}>
          <boxGeometry args={[0.08, 0.08, 0.05]} />
          <meshBasicMaterial color={palette.eye ?? '#e9fff3'} toneMapped={false} />
        </mesh>
        <mesh position={[0.16, 0.03, 0.38]}>
          <boxGeometry args={[0.08, 0.08, 0.05]} />
          <meshBasicMaterial color={palette.eye ?? '#e9fff3'} toneMapped={false} />
        </mesh>
      </group>

      <group ref={leftArmRef} position={[-0.5, 1.34, 0]}>
        <VoxelArm variant={variant} palette={palette} />
        {swordHand === 'left' ? <DiamondSword glow={palette.swordGlow} hand="left" /> : null}
      </group>

      <group ref={rightArmRef} position={[0.5, 1.34, 0]}>
        <VoxelArm variant={variant} palette={palette} />
        {swordHand === 'right' ? <DiamondSword glow={palette.swordGlow} hand="right" /> : null}
      </group>

      <group position={[-0.18, 0.36, 0]}>
        <VoxelLeg variant={variant} palette={palette} />
      </group>
      <group position={[0.18, 0.36, 0]}>
        <VoxelLeg variant={variant} palette={palette} />
      </group>
    </group>
  )
}

function VoxelArm({
  variant,
  palette,
}: {
  variant: CharacterVariant
  palette: CharacterPalette
}) {
  const armored = variant === 'knight' || variant === 'sentinel'

  return (
    <>
      <VoxelCuboid
        position={[0, -0.12, 0]}
        size={[0.3, 0.42, 0.3]}
        color={armored ? palette.armorPrimary ?? palette.torso : palette.torso}
        roughness={armored ? 0.4 : 0.82}
        metalness={armored ? 0.26 : 0.02}
      />
      <VoxelCuboid
        position={[0, -0.54, 0]}
        size={[0.26, 0.42, 0.26]}
        color={armored ? palette.armorSecondary ?? palette.skin : palette.skin}
        roughness={armored ? 0.46 : 0.88}
        metalness={armored ? 0.16 : 0}
      />
      <VoxelCuboid
        position={[0, -0.82, 0.02]}
        size={[0.3, 0.12, 0.3]}
        color={armored ? palette.armorPrimary ?? palette.torso : palette.skin}
        roughness={armored ? 0.38 : 0.84}
        metalness={armored ? 0.16 : 0}
      />
    </>
  )
}

function VoxelLeg({
  variant,
  palette,
}: {
  variant: CharacterVariant
  palette: CharacterPalette
}) {
  const armored = variant === 'knight' || variant === 'sentinel'

  return (
    <>
      <VoxelCuboid
        position={[0, 0.22, 0]}
        size={[0.3, 0.48, 0.3]}
        color={armored ? palette.armorSecondary ?? palette.pants : palette.pants}
        roughness={armored ? 0.5 : 0.84}
        metalness={armored ? 0.14 : 0}
      />
      <VoxelCuboid
        position={[0, -0.18, 0]}
        size={[0.28, 0.38, 0.28]}
        color={armored ? palette.armorPrimary ?? palette.pants : palette.pants}
        roughness={armored ? 0.44 : 0.86}
        metalness={armored ? 0.16 : 0}
      />
      <VoxelCuboid
        position={[0, -0.42, 0.02]}
        size={[0.32, 0.16, 0.34]}
        color={palette.boots}
        roughness={0.9}
      />
    </>
  )
}

function DiamondSword({
  hand,
  glow = '#8ffcff',
}: {
  hand: 'left' | 'right'
  glow?: string
}) {
  const handRotation: Vec3 =
    hand === 'left' ? [0.18, -0.12, 0.44] : [0.18, 0.12, -0.44]
  const handOffset = hand === 'left' ? -0.06 : 0.06

  return (
    <group position={[handOffset, -0.84, 0.08]} rotation={handRotation}>
      <VoxelCuboid position={[0, -0.12, 0]} size={[0.12, 0.28, 0.12]} color="#2a231e" />
      <VoxelCuboid position={[0, 0.14, 0]} size={[0.38, 0.1, 0.12]} color="#5a4330" />
      <VoxelCuboid
        position={[0, 0.44, 0]}
        size={[0.16, 0.34, 0.16]}
        color={glow}
        emissive={glow}
        emissiveIntensity={0.28}
        roughness={0.26}
      />
      <VoxelCuboid
        position={[0, 1.02, 0]}
        size={[0.14, 0.82, 0.08]}
        color="#d7fff4"
        emissive={glow}
        emissiveIntensity={0.16}
        roughness={0.2}
        metalness={0.2}
      />
      <VoxelCuboid
        position={[0, 1.5, 0]}
        size={[0.1, 0.18, 0.06]}
        color="#f2fffb"
        emissive={glow}
        emissiveIntensity={0.1}
        roughness={0.16}
      />
    </group>
  )
}

function VoxelCuboid({
  position,
  size,
  color,
  rotation,
  roughness = 0.78,
  metalness = 0.04,
  emissive,
  emissiveIntensity = 0,
}: VoxelCuboidProps) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? '#000000'}
        emissiveIntensity={emissive ? emissiveIntensity : 0}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  )
}

function MiniIsland({
  position,
  scale,
}: {
  position: Vec3
  scale: number
}) {
  return (
    <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.25}>
      <group position={position} scale={scale}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[3.1, 0.8, 3.1]} />
          <meshStandardMaterial color="#2a6337" roughness={0.82} />
        </mesh>
        <mesh position={[0, -1.05, 0]}>
          <boxGeometry args={[2.1, 1.05, 2.1]} />
          <meshStandardMaterial color="#18211d" roughness={0.88} />
        </mesh>
      </group>
    </Float>
  )
}

function SkyShards() {
  const shards: Array<{
    position: Vec3
    scale: number
    emissive: string
  }> = [
    { position: [-6.4, 4.3, -4.4], scale: 0.66, emissive: '#8fff99' },
    { position: [-3.9, 5.2, -6.1], scale: 0.48, emissive: '#8fa7ff' },
    { position: [6.5, 4.5, -4.9], scale: 0.72, emissive: '#8fff99' },
    { position: [4.4, 5.6, -6.6], scale: 0.42, emissive: '#8fa7ff' },
  ]

  return (
    <>
      {shards.map((shard, index) => (
        <Float
          key={`${shard.position.join('-')}-${index}`}
          speed={0.7 + index * 0.1}
          rotationIntensity={0.2}
          floatIntensity={0.25}
        >
          <mesh position={shard.position} scale={shard.scale} rotation={[0.3, 0.6, 0.18]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#10221a"
              emissive={shard.emissive}
              emissiveIntensity={0.34}
              roughness={0.22}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function AtmospherePlanes() {
  const planeRef = useRef<Group>(null)

  useFrame((state) => {
    if (!planeRef.current) {
      return
    }

    planeRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.12
  })

  return (
    <group ref={planeRef}>
      <mesh position={[0, -3.6, 0.8]} rotation={[-Math.PI / 2, 0, 0]} scale={[12, 4.8, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#83ff94"
          transparent
          opacity={0.06}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[2.8, -2.8, -1.2]} rotation={[-Math.PI / 2, 0, 0]} scale={[7, 3.2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#8ea7ff"
          transparent
          opacity={0.05}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
