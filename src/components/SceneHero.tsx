import { motion, useReducedMotion } from 'framer-motion'
import type { HTMLAttributes } from 'react'

type SceneHeroProps = HTMLAttributes<HTMLDivElement>
type Point = [number, number]

type IsoBlockProps = {
  x: number
  y: number
  halfWidth: number
  halfHeight: number
  depth: number
  topFill: string
  leftFill: string
  rightFill: string
  stroke?: string
  opacity?: number
}

type PropProps = {
  x: number
  y: number
  scale?: number
}

type Tile = IsoBlockProps & {
  key: string
}

const ambientParticles = [
  { left: '11%', top: '18%', size: 9, duration: 9.6, delay: 0.2 },
  { left: '20%', top: '33%', size: 6, duration: 8.1, delay: 1.1 },
  { left: '33%', top: '13%', size: 8, duration: 10.4, delay: 0.5 },
  { left: '56%', top: '24%', size: 7, duration: 7.9, delay: 1.5 },
  { left: '73%', top: '16%', size: 9, duration: 9.1, delay: 0.4 },
  { left: '84%', top: '31%', size: 7, duration: 8.7, delay: 1.8 },
]

const floatingBlocks = [
  {
    x: 286,
    y: 332,
    halfWidth: 20,
    halfHeight: 11,
    depth: 24,
    delay: 0.4,
  },
  {
    x: 628,
    y: 318,
    halfWidth: 22,
    halfHeight: 12,
    depth: 26,
    delay: 1.4,
  },
  {
    x: 688,
    y: 430,
    halfWidth: 16,
    halfHeight: 9,
    depth: 18,
    delay: 0.9,
  },
]

const pathTileKeys = new Set(['1-2', '2-1', '2-2', '3-1'])
const islandLevels = [
  [0, 1, 1, 1, 0],
  [1, 2, 2, 2, 1],
  [1, 2, 3, 2, 1],
  [0, 1, 2, 1, 0],
]

const islandTiles: Tile[] = []

for (let rowIndex = 0; rowIndex < islandLevels.length; rowIndex += 1) {
  for (
    let columnIndex = 0;
    columnIndex < islandLevels[rowIndex].length;
    columnIndex += 1
  ) {
    const level = islandLevels[rowIndex][columnIndex]

    if (level === 0) {
      continue
    }

    const key = `${rowIndex}-${columnIndex}`
    const isPath = pathTileKeys.has(key)
    const isBeaconTile = rowIndex === 2 && columnIndex === 2

    islandTiles.push({
      key,
      x: 450 + (columnIndex - rowIndex) * 72,
      y: 430 + (columnIndex + rowIndex) * 38 - level * 24,
      halfWidth: 72,
      halfHeight: 38,
      depth: 112 + level * 18,
      topFill: isBeaconTile
        ? '#7EE094'
        : isPath
          ? '#7B8F86'
          : '#5AAE61',
      leftFill: isBeaconTile ? '#38533E' : isPath ? '#495851' : '#5D3C21',
      rightFill: isBeaconTile ? '#A5F0BA' : isPath ? '#697B73' : '#77502E',
      stroke: 'rgba(235,255,239,0.08)',
    })
  }
}

const supportBlocks: Tile[] = [
  {
    key: 'support-center',
    x: 450,
    y: 636,
    halfWidth: 58,
    halfHeight: 30,
    depth: 118,
    topFill: '#2C1E14',
    leftFill: '#130D09',
    rightFill: '#3C281B',
    opacity: 0.94,
  },
  {
    key: 'support-left',
    x: 380,
    y: 668,
    halfWidth: 42,
    halfHeight: 22,
    depth: 94,
    topFill: '#251911',
    leftFill: '#100B08',
    rightFill: '#332218',
    opacity: 0.9,
  },
  {
    key: 'support-right',
    x: 520,
    y: 666,
    halfWidth: 42,
    halfHeight: 22,
    depth: 94,
    topFill: '#251911',
    leftFill: '#100B08',
    rightFill: '#332218',
    opacity: 0.9,
  },
]

function pointsToString(points: Point[]) {
  return points.map(([x, y]) => `${x},${y}`).join(' ')
}

function IsoBlock({
  x,
  y,
  halfWidth,
  halfHeight,
  depth,
  topFill,
  leftFill,
  rightFill,
  stroke = 'rgba(220,255,228,0.08)',
  opacity = 1,
}: IsoBlockProps) {
  const top = pointsToString([
    [x, y - halfHeight],
    [x + halfWidth, y],
    [x, y + halfHeight],
    [x - halfWidth, y],
  ])

  const left = pointsToString([
    [x - halfWidth, y],
    [x, y + halfHeight],
    [x, y + halfHeight + depth],
    [x - halfWidth, y + depth],
  ])

  const right = pointsToString([
    [x + halfWidth, y],
    [x, y + halfHeight],
    [x, y + halfHeight + depth],
    [x + halfWidth, y + depth],
  ])

  return (
    <g opacity={opacity}>
      <polygon
        points={left}
        fill={leftFill}
        stroke={stroke}
        strokeLinejoin="round"
      />
      <polygon
        points={right}
        fill={rightFill}
        stroke={stroke}
        strokeLinejoin="round"
      />
      <polygon
        points={top}
        fill={topFill}
        stroke={stroke}
        strokeLinejoin="round"
      />
    </g>
  )
}

function IsoTree({ x, y, scale = 1 }: PropProps) {
  return (
    <g>
      <IsoBlock
        x={x}
        y={y}
        halfWidth={14 * scale}
        halfHeight={8 * scale}
        depth={78 * scale}
        topFill="#986D37"
        leftFill="#5A3917"
        rightFill="#B47D3F"
        stroke="rgba(255,244,226,0.08)"
      />
      <IsoBlock
        x={x}
        y={y - 56 * scale}
        halfWidth={40 * scale}
        halfHeight={22 * scale}
        depth={28 * scale}
        topFill="#4DA85A"
        leftFill="#235231"
        rightFill="#6BD17A"
      />
      <IsoBlock
        x={x - 28 * scale}
        y={y - 38 * scale}
        halfWidth={24 * scale}
        halfHeight={14 * scale}
        depth={22 * scale}
        topFill="#4B9F57"
        leftFill="#204C2D"
        rightFill="#63C872"
      />
      <IsoBlock
        x={x + 28 * scale}
        y={y - 38 * scale}
        halfWidth={24 * scale}
        halfHeight={14 * scale}
        depth={22 * scale}
        topFill="#4B9F57"
        leftFill="#204C2D"
        rightFill="#63C872"
      />
      <IsoBlock
        x={x}
        y={y - 88 * scale}
        halfWidth={24 * scale}
        halfHeight={14 * scale}
        depth={20 * scale}
        topFill="#63C872"
        leftFill="#285733"
        rightFill="#85E091"
      />
    </g>
  )
}

function BeaconRig({
  x,
  y,
  shouldReduceMotion,
}: {
  x: number
  y: number
  shouldReduceMotion: boolean
}) {
  return (
    <g>
      <motion.g
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.56, 0.92, 0.56],
                scaleY: [0.98, 1.04, 0.98],
              }
        }
        transition={{
          duration: 5.6,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          transformOrigin: `${x}px 110px`,
        }}
      >
        <ellipse
          cx={x}
          cy={y - 110}
          rx="92"
          ry="92"
          fill="rgba(137,255,160,0.24)"
          filter="url(#softBlur)"
        />
        <rect
          x={x - 28}
          y="112"
          width="56"
          height={y - 112}
          rx="28"
          fill="url(#beaconAura)"
        />
        <rect
          x={x - 8}
          y="116"
          width="16"
          height={y - 128}
          rx="8"
          fill="url(#beaconCore)"
        />
      </motion.g>

      <ellipse
        cx={x}
        cy={y + 34}
        rx="84"
        ry="34"
        fill="rgba(120,255,146,0.18)"
        filter="url(#softBlur)"
      />

      <IsoBlock
        x={x}
        y={y}
        halfWidth={58}
        halfHeight={30}
        depth={34}
        topFill="#B6C7CD"
        leftFill="#55616A"
        rightFill="#E7F2F5"
      />
      <IsoBlock
        x={x}
        y={y - 34}
        halfWidth={40}
        halfHeight={22}
        depth={28}
        topFill="#90FFD3"
        leftFill="#3E7D62"
        rightFill="#D6FFF0"
        stroke="rgba(248,255,250,0.24)"
      />
    </g>
  )
}

function SwordMonument({
  x,
  y,
  shouldReduceMotion,
}: {
  x: number
  y: number
  shouldReduceMotion: boolean
}) {
  return (
    <motion.g
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -3, 0],
            }
      }
      transition={{
        duration: 6.2,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    >
      <ellipse
        cx={x}
        cy={y + 58}
        rx="30"
        ry="14"
        fill="rgba(0,0,0,0.28)"
      />

      <g transform={`rotate(34 ${x} ${y + 8})`}>
        <rect
          x={x - 5}
          y={y + 8}
          width="10"
          height="84"
          rx="4"
          fill="url(#bladeGradient)"
        />
        <rect x={x - 16} y={y + 78} width="32" height="8" rx="4" fill="#D9F8FF" />
        <rect x={x - 4} y={y + 86} width="8" height="24" rx="4" fill="#7C4B27" />
        <rect x={x - 10} y={y + 104} width="20" height="10" rx="4" fill="#3A2214" />
      </g>
    </motion.g>
  )
}

function TreasureCrate({ x, y, scale = 1 }: PropProps) {
  return (
    <g>
      <IsoBlock
        x={x}
        y={y}
        halfWidth={20 * scale}
        halfHeight={11 * scale}
        depth={28 * scale}
        topFill="#D08232"
        leftFill="#6F3918"
        rightFill="#E59B4B"
      />
      <rect
        x={x - 3 * scale}
        y={y + 10 * scale}
        width={6 * scale}
        height={12 * scale}
        rx={2 * scale}
        fill="#F6E1A8"
      />
      <path
        d={`M ${x - 17 * scale} ${y + 2 * scale} L ${x + 17 * scale} ${y + 20 * scale}`}
        stroke="rgba(54,24,11,0.34)"
        strokeWidth={2 * scale}
      />
    </g>
  )
}

export function SceneHero({ className = '', ...props }: SceneHeroProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={`${className} pointer-events-none overflow-hidden`.trim()}
      {...props}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(144,255,160,0.18),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(108,138,255,0.16),transparent_22%),linear-gradient(180deg,rgba(10,18,13,0.1),rgba(5,10,8,0.82)_62%,rgba(2,4,4,0.98)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_16%),radial-gradient(circle_at_50%_100%,rgba(1,4,3,0.96),transparent_46%)]" />
      <div className="absolute inset-x-[8%] inset-y-[7%] rounded-[2.2rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />
      <div className="absolute inset-x-[18%] top-[10%] h-28 rounded-full bg-emerald-300/12 blur-3xl sm:h-36" />

      {ambientParticles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-[3px] bg-emerald-100/80 shadow-[0_0_18px_rgba(153,255,176,0.56)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -16, 0],
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.94, 1.12, 0.94],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="absolute inset-[5.5%]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -8, 0],
                scale: [1, 1.008, 1],
              }
        }
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      >
        <svg
          viewBox="0 0 900 980"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="beaconAura" x1="450" y1="112" x2="450" y2="470">
              <stop stopColor="rgba(180,255,191,0)" />
              <stop offset="0.24" stopColor="rgba(180,255,191,0.22)" />
              <stop offset="0.65" stopColor="rgba(132,255,151,0.74)" />
              <stop offset="1" stopColor="rgba(132,255,151,0)" />
            </linearGradient>
            <linearGradient id="beaconCore" x1="450" y1="118" x2="450" y2="462">
              <stop stopColor="rgba(241,255,245,0.08)" />
              <stop offset="0.55" stopColor="rgba(241,255,245,0.94)" />
              <stop offset="1" stopColor="rgba(241,255,245,0)" />
            </linearGradient>
            <linearGradient id="bladeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F0FEFF" />
              <stop offset="0.38" stopColor="#9FE9FF" />
              <stop offset="1" stopColor="#3CC9F7" />
            </linearGradient>
            <radialGradient
              id="skyGlow"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(450 420) rotate(90) scale(220 220)"
            >
              <stop stopColor="rgba(117,255,142,0.26)" />
              <stop offset="1" stopColor="rgba(117,255,142,0)" />
            </radialGradient>
            <radialGradient
              id="floorGlow"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(450 730) rotate(90) scale(260 160)"
            >
              <stop stopColor="rgba(94,255,122,0.22)" />
              <stop offset="1" stopColor="rgba(94,255,122,0)" />
            </radialGradient>
            <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="26" />
            </filter>
            <filter id="wideBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="44" />
            </filter>
          </defs>

          <rect
            x="116"
            y="90"
            width="668"
            height="786"
            rx="74"
            fill="rgba(7,12,9,0.74)"
            stroke="rgba(230,255,234,0.08)"
          />
          <rect
            x="138"
            y="112"
            width="624"
            height="742"
            rx="56"
            stroke="rgba(230,255,234,0.05)"
          />

          <path
            d="M112 488L188 440L248 468L320 418L404 462L404 876H112V488Z"
            fill="#08120D"
            opacity="0.9"
          />
          <path
            d="M788 494L714 446L652 474L580 422L496 466V876H788V494Z"
            fill="#08120D"
            opacity="0.9"
          />
          <path
            d="M194 378L258 340L324 372L402 328L470 362V428H194V378Z"
            fill="#122119"
            opacity="0.72"
          />
          <path
            d="M706 372L642 334L576 366L498 322L430 356V424H706V372Z"
            fill="#122119"
            opacity="0.72"
          />

          <ellipse
            cx="450"
            cy="428"
            rx="196"
            ry="170"
            fill="url(#skyGlow)"
            filter="url(#softBlur)"
          />
          <ellipse
            cx="450"
            cy="730"
            rx="252"
            ry="132"
            fill="url(#floorGlow)"
            filter="url(#wideBlur)"
          />

          <motion.g
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -10, 0],
                  }
            }
            transition={{
              duration: 7.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            <BeaconRig x={450} y={484} shouldReduceMotion={Boolean(shouldReduceMotion)} />

            {supportBlocks.map((block) => (
              <IsoBlock
                key={block.key}
                x={block.x}
                y={block.y}
                halfWidth={block.halfWidth}
                halfHeight={block.halfHeight}
                depth={block.depth}
                topFill={block.topFill}
                leftFill={block.leftFill}
                rightFill={block.rightFill}
                opacity={block.opacity}
              />
            ))}

            {islandTiles.map((tile) => (
              <IsoBlock
                key={tile.key}
                x={tile.x}
                y={tile.y}
                halfWidth={tile.halfWidth}
                halfHeight={tile.halfHeight}
                depth={tile.depth}
                topFill={tile.topFill}
                leftFill={tile.leftFill}
                rightFill={tile.rightFill}
                stroke={tile.stroke}
                opacity={tile.opacity}
              />
            ))}

            <IsoTree x={344} y={454} scale={1.04} />
            <IsoTree x={566} y={438} scale={0.96} />

            <TreasureCrate x={346} y={572} scale={1.04} />
            <SwordMonument x={578} y={534} shouldReduceMotion={Boolean(shouldReduceMotion)} />

            <IsoBlock
              x={504}
              y={560}
              halfWidth={30}
              halfHeight={16}
              depth={20}
              topFill="#7C9388"
              leftFill="#47564F"
              rightFill="#9FB3AA"
            />
            <IsoBlock
              x={394}
              y={530}
              halfWidth={30}
              halfHeight={16}
              depth={20}
              topFill="#63B468"
              leftFill="#5C3B21"
              rightFill="#7B5230"
            />
          </motion.g>

          {floatingBlocks.map((block) => (
            <motion.g
              key={`${block.x}-${block.y}`}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -12, 0],
                      x: [0, 3, 0],
                    }
              }
              transition={{
                duration: 5.2,
                delay: block.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            >
              <IsoBlock
                x={block.x}
                y={block.y}
                halfWidth={block.halfWidth}
                halfHeight={block.halfHeight}
                depth={block.depth}
                topFill="#73DA81"
                leftFill="#4C311E"
                rightFill="#8C5D37"
                opacity={0.92}
              />
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </div>
  )
}
