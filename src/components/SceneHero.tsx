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

const ambientParticles = [
  { left: '12%', top: '18%', size: 10, duration: 8.8, delay: 0.2 },
  { left: '24%', top: '32%', size: 6, duration: 7.8, delay: 1.1 },
  { left: '34%', top: '14%', size: 8, duration: 10.2, delay: 0.7 },
  { left: '58%', top: '22%', size: 8, duration: 8.4, delay: 1.5 },
  { left: '74%', top: '17%', size: 10, duration: 9.1, delay: 0.4 },
  { left: '82%', top: '34%', size: 7, duration: 7.6, delay: 1.9 },
]

const floatingBlocks = [
  {
    x: 320,
    y: 374,
    halfWidth: 24,
    halfHeight: 13,
    depth: 36,
    delay: 0.3,
  },
  {
    x: 585,
    y: 340,
    halfWidth: 20,
    halfHeight: 11,
    depth: 31,
    delay: 1.4,
  },
  {
    x: 670,
    y: 430,
    halfWidth: 16,
    halfHeight: 9,
    depth: 24,
    delay: 0.9,
  },
]

const floorTiles = Array.from({ length: 6 }, (_, row) =>
  Array.from({ length: 6 }, (_, column) => {
    const focusBand = row >= 1 && row <= 3 && column >= 1 && column <= 4

    return {
      x: 450 + (column - row) * 68,
      y: 704 + (column + row) * 36,
      halfWidth: 64,
      halfHeight: 34,
      depth: focusBand ? 28 : 22,
      topFill: focusBand ? '#143523' : '#0d1f17',
      leftFill: focusBand ? '#0d2619' : '#08120e',
      rightFill: focusBand ? '#19402a' : '#10261b',
      opacity: focusBand ? 1 : 0.9,
    }
  }),
).flat()

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

export function SceneHero({ className = '', ...props }: SceneHeroProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={`${className} pointer-events-none overflow-hidden`.trim()}
      {...props}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(148,255,158,0.16),transparent_28%),radial-gradient(circle_at_76%_18%,rgba(123,153,255,0.14),transparent_22%),linear-gradient(180deg,rgba(7,13,10,0.18),rgba(4,8,6,0.78)_60%,rgba(2,4,4,0.96)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_16%),radial-gradient(circle_at_50%_100%,rgba(1,5,4,0.94),transparent_44%)]" />
      <div className="absolute inset-x-[8%] inset-y-[7%] rounded-[2.2rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />
      <div className="absolute inset-x-[16%] top-[8%] h-28 rounded-full bg-emerald-300/14 blur-3xl sm:h-36" />
      <div className="absolute left-1/2 top-[11%] h-52 w-36 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(140,255,166,0.22),rgba(140,255,166,0.02))] blur-3xl sm:h-64 sm:w-44" />

      {ambientParticles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full bg-emerald-100/80 shadow-[0_0_18px_rgba(153,255,176,0.56)]"
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
                  scale: [0.96, 1.14, 0.96],
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
            <linearGradient id="sceneShell" x1="450" y1="92" x2="450" y2="866">
              <stop stopColor="#13221A" />
              <stop offset="0.54" stopColor="#0A120E" />
              <stop offset="1" stopColor="#060A08" />
            </linearGradient>
            <linearGradient id="sceneStroke" x1="450" y1="92" x2="450" y2="866">
              <stop stopColor="rgba(226,255,233,0.16)" />
              <stop offset="1" stopColor="rgba(226,255,233,0.03)" />
            </linearGradient>
            <linearGradient id="beamFill" x1="450" y1="128" x2="450" y2="618">
              <stop stopColor="rgba(186,255,200,0)" />
              <stop offset="0.25" stopColor="rgba(186,255,200,0.24)" />
              <stop offset="0.62" stopColor="rgba(144,255,164,0.72)" />
              <stop offset="1" stopColor="rgba(144,255,164,0)" />
            </linearGradient>
            <linearGradient id="beamCore" x1="450" y1="152" x2="450" y2="580">
              <stop stopColor="rgba(243,255,246,0.04)" />
              <stop offset="0.56" stopColor="rgba(243,255,246,0.88)" />
              <stop offset="1" stopColor="rgba(243,255,246,0)" />
            </linearGradient>
            <radialGradient id="portalGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(450 430) rotate(90) scale(220 220)">
              <stop stopColor="rgba(149,255,171,0.42)" />
              <stop offset="0.58" stopColor="rgba(149,255,171,0.12)" />
              <stop offset="1" stopColor="rgba(149,255,171,0)" />
            </radialGradient>
            <linearGradient id="ringStroke" x1="292" y1="418" x2="608" y2="418">
              <stop stopColor="rgba(206,255,217,0.14)" />
              <stop offset="0.5" stopColor="rgba(206,255,217,0.78)" />
              <stop offset="1" stopColor="rgba(206,255,217,0.14)" />
            </linearGradient>
            <radialGradient id="floorGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(450 720) rotate(90) scale(230 260)">
              <stop stopColor="rgba(102,255,134,0.24)" />
              <stop offset="1" stopColor="rgba(102,255,134,0)" />
            </radialGradient>
            <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="26" />
            </filter>
            <filter id="floorBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="38" />
            </filter>
          </defs>

          <rect
            x="118"
            y="94"
            width="664"
            height="772"
            rx="70"
            fill="url(#sceneShell)"
            stroke="rgba(225,255,232,0.08)"
          />

          <path
            d="M118 502L198 450L254 478L344 398L430 456L430 866H118V502Z"
            fill="#0A1610"
            opacity="0.82"
          />
          <path
            d="M782 502L700 448L644 476L560 406L470 456V866H782V502Z"
            fill="#0A1610"
            opacity="0.82"
          />
          <path
            d="M188 398L244 358L324 394L390 346L454 380V446H188V398Z"
            fill="#11241B"
            opacity="0.78"
          />
          <path
            d="M708 398L652 358L572 394L506 346L442 380V446H708V398Z"
            fill="#11241B"
            opacity="0.78"
          />

          <ellipse
            cx="450"
            cy="632"
            rx="230"
            ry="118"
            fill="url(#floorGlow)"
            filter="url(#floorBlur)"
            opacity="0.9"
          />
          <ellipse
            cx="450"
            cy="434"
            rx="178"
            ry="178"
            fill="url(#portalGlow)"
            filter="url(#softBlur)"
          />
          <rect x="414" y="126" width="72" height="472" rx="36" fill="url(#beamFill)" />
          <rect x="442" y="148" width="16" height="430" rx="8" fill="url(#beamCore)" />

          <ellipse
            cx="450"
            cy="430"
            rx="152"
            ry="152"
            stroke="url(#ringStroke)"
            strokeWidth="2"
            strokeDasharray="12 12"
            opacity="0.7"
          />

          <IsoBlock
            x={270}
            y={548}
            halfWidth={72}
            halfHeight={38}
            depth={170}
            topFill="#132A1D"
            leftFill="#0A1710"
            rightFill="#1A3A29"
            opacity={0.9}
          />
          <IsoBlock
            x={630}
            y={512}
            halfWidth={80}
            halfHeight={42}
            depth={194}
            topFill="#132A1D"
            leftFill="#0A1710"
            rightFill="#1A3A29"
            opacity={0.9}
          />

          <path
            d="M250 474L344 418L344 676L250 730V474Z"
            fill="rgba(168,255,186,0.08)"
          />
          <path
            d="M650 440L556 386L556 654L650 708V440Z"
            fill="rgba(143,164,255,0.08)"
          />

          {floorTiles.map((tile, index) => (
            <IsoBlock
              key={`${tile.x}-${tile.y}-${index}`}
              x={tile.x}
              y={tile.y}
              halfWidth={tile.halfWidth}
              halfHeight={tile.halfHeight}
              depth={tile.depth}
              topFill={tile.topFill}
              leftFill={tile.leftFill}
              rightFill={tile.rightFill}
              opacity={tile.opacity}
              stroke="rgba(220,255,228,0.05)"
            />
          ))}

          <IsoBlock
            x={450}
            y={616}
            halfWidth={118}
            halfHeight={60}
            depth={54}
            topFill="#1A442D"
            leftFill="#0C2016"
            rightFill="#245A3A"
          />
          <IsoBlock
            x={450}
            y={576}
            halfWidth={88}
            halfHeight={46}
            depth={40}
            topFill="#275C3C"
            leftFill="#143121"
            rightFill="#33784B"
          />
          <IsoBlock
            x={450}
            y={542}
            halfWidth={54}
            halfHeight={28}
            depth={28}
            topFill="#316F47"
            leftFill="#173624"
            rightFill="#4A9A61"
          />

          <motion.g
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -18, 0],
                  }
            }
            transition={{
              duration: 6.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            <ellipse
              cx="450"
              cy="462"
              rx="118"
              ry="54"
              fill="rgba(146,255,168,0.18)"
              filter="url(#softBlur)"
            />
            <IsoBlock
              x={450}
              y={448}
              halfWidth={58}
              halfHeight={32}
              depth={78}
              topFill="#8DFFAA"
              leftFill="#2B6C47"
              rightFill="#B6FFD0"
              stroke="rgba(245,255,248,0.28)"
            />
            <IsoBlock
              x={450}
              y={428}
              halfWidth={32}
              halfHeight={18}
              depth={36}
              topFill="#F5FFF7"
              leftFill="#83D89E"
              rightFill="#D5FFE3"
              stroke="rgba(245,255,248,0.32)"
              opacity={0.9}
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
                duration: 5.4,
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
                topFill="#95FFAE"
                leftFill="#215A39"
                rightFill="#CAFFDB"
                stroke="rgba(240,255,244,0.18)"
                opacity={0.9}
              />
            </motion.g>
          ))}

          <path
            d="M450 310L510 344L450 378L390 344L450 310Z"
            fill="rgba(245,255,248,0.22)"
            opacity="0.65"
          />
        </svg>
      </motion.div>
    </div>
  )
}
