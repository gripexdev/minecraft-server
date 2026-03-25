import { useReducedMotion } from 'framer-motion'
import {
  lazy,
  startTransition,
  Suspense,
  useEffect,
  useState,
} from 'react'
import type { HTMLAttributes } from 'react'

type SceneHeroProps = HTMLAttributes<HTMLDivElement>
type RenderMode = 'scene' | 'fallback'

const SceneHeroCanvas = lazy(() => import('./SceneHeroCanvas'))

const fallbackBlocks = [
  { left: '34%', width: '6%', height: '12%' },
  { left: '39%', width: '7%', height: '18%' },
  { left: '45%', width: '8%', height: '22%' },
  { left: '52%', width: '7%', height: '19%' },
  { left: '58%', width: '6%', height: '13%' },
]

const fallbackParticles = [
  { left: '12%', top: '14%', size: '0.4rem', delay: '0s' },
  { left: '24%', top: '20%', size: '0.55rem', delay: '0.9s' },
  { left: '39%', top: '12%', size: '0.35rem', delay: '0.4s' },
  { left: '58%', top: '26%', size: '0.5rem', delay: '1.1s' },
  { left: '72%', top: '18%', size: '0.45rem', delay: '0.2s' },
  { left: '82%', top: '32%', size: '0.38rem', delay: '1.3s' },
]

const fallbackCharacters = [
  {
    left: '16%',
    scale: 0.88,
    skin: '#c38a61',
    hair: '#eff2f8',
    torso: '#a8aeb6',
    chest: '#d8dee5',
    pants: '#7a8087',
    boots: '#434951',
    sword: 'left',
  },
  {
    left: '35%',
    scale: 0.98,
    skin: '#c98f63',
    hair: '#2c6a34',
    torso: '#3f8f45',
    chest: '#6bd367',
    pants: '#232829',
    boots: '#13361f',
    sword: null,
  },
  {
    left: '52%',
    scale: 1.04,
    skin: '#d59569',
    hair: '#6f4e37',
    torso: '#4e88db',
    chest: '#78acf5',
    pants: '#5f48be',
    boots: '#39275e',
    sword: 'right',
  },
  {
    left: '71%',
    scale: 0.9,
    skin: '#8c929b',
    hair: '#c7ced6',
    torso: '#707780',
    chest: '#c0c6cf',
    pants: '#666d75',
    boots: '#353a40',
    sword: 'right',
  },
] as const

function resolveRenderMode(shouldReduceMotion: boolean): RenderMode {
  if (shouldReduceMotion || typeof window === 'undefined') {
    return 'fallback'
  }

  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2', {
        powerPreference: 'high-performance',
      }) ??
      canvas.getContext('webgl', {
        powerPreference: 'high-performance',
      }) ??
      canvas.getContext('experimental-webgl')

    return gl ? 'scene' : 'fallback'
  } catch {
    return 'fallback'
  }
}

export function SceneHero({ className = '', ...props }: SceneHeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const [renderMode, setRenderMode] = useState<RenderMode>('fallback')

  useEffect(() => {
    startTransition(() => {
      setRenderMode(resolveRenderMode(Boolean(shouldReduceMotion)))
    })
  }, [shouldReduceMotion])

  return (
    <div
      aria-hidden="true"
      className={`${className} pointer-events-none overflow-hidden`.trim()}
      {...props}
    >
      {renderMode === 'scene' ? (
        <Suspense fallback={<HeroSceneFallback />}>
          <SceneHeroCanvas />
        </Suspense>
      ) : (
        <HeroSceneFallback />
      )}
    </div>
  )
}

function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(154,255,155,0.14),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(130,162,255,0.14),transparent_24%),linear-gradient(180deg,rgba(3,10,8,0.08),rgba(2,5,4,0.74)_68%,rgba(2,4,4,0.98)_100%)]" />

      <div className="absolute left-1/2 top-[28%] h-44 w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-200/0 via-emerald-200/45 to-emerald-200/0 blur-md sm:h-56" />
      <div className="absolute left-1/2 top-[30%] h-20 w-20 -translate-x-1/2 rounded-[1.7rem] border border-emerald-200/14 bg-gradient-to-br from-emerald-300/14 via-white/6 to-sky-400/10 shadow-[0_0_70px_rgba(125,255,137,0.16)] backdrop-blur-xl [transform:rotate(18deg)] sm:h-28 sm:w-28" />

      <div className="absolute left-1/2 top-[48%] h-[30%] w-[46%] -translate-x-1/2 rounded-[44%] bg-[radial-gradient(circle_at_50%_20%,rgba(43,104,58,0.92),rgba(18,36,27,0.98))] shadow-[0_24px_90px_rgba(0,0,0,0.42)]">
        <div className="absolute inset-x-[16%] top-[-10%] h-[18%] rounded-[32%] bg-[linear-gradient(180deg,#39764b,#275636)]" />
        {fallbackBlocks.map((block) => (
          <div
            key={`${block.left}-${block.height}`}
            className="absolute bottom-[-22%] rounded-b-md bg-gradient-to-b from-[#18201d] to-[#0b100f]"
            style={{
              left: block.left,
              width: block.width,
              height: block.height,
            }}
          />
        ))}
        <div className="absolute left-[28%] top-[26%] h-3 w-3 rounded-full bg-emerald-200/70 blur-[2px]" />
        <div className="absolute right-[24%] top-[32%] h-2.5 w-2.5 rounded-full bg-sky-200/70 blur-[2px]" />

        {fallbackCharacters.map((character) => (
          <div
            key={character.left}
            className="absolute bottom-[14%] h-[44%] w-[14%] -translate-x-1/2"
            style={{
              left: character.left,
              transform: `translateX(-50%) scale(${character.scale})`,
            }}
          >
            <div className="absolute left-[24%] top-0 h-[22%] w-[52%] rounded-[0.2rem]" style={{ background: character.skin }} />
            <div className="absolute left-[18%] top-[18%] h-[10%] w-[64%] rounded-[0.15rem]" style={{ background: character.hair }} />
            <div className="absolute left-[20%] top-[26%] h-[24%] w-[60%] rounded-[0.15rem]" style={{ background: character.torso }} />
            <div className="absolute left-[28%] top-[31%] h-[13%] w-[44%] rounded-[0.15rem]" style={{ background: character.chest }} />
            <div className="absolute left-[2%] top-[28%] h-[22%] w-[16%] rounded-[0.15rem]" style={{ background: character.skin }} />
            <div className="absolute right-[2%] top-[28%] h-[22%] w-[16%] rounded-[0.15rem]" style={{ background: character.skin }} />
            <div className="absolute left-[22%] top-[50%] h-[28%] w-[16%] rounded-[0.15rem]" style={{ background: character.pants }} />
            <div className="absolute right-[22%] top-[50%] h-[28%] w-[16%] rounded-[0.15rem]" style={{ background: character.pants }} />
            <div className="absolute left-[21%] top-[77%] h-[7%] w-[18%] rounded-[0.12rem]" style={{ background: character.boots }} />
            <div className="absolute right-[21%] top-[77%] h-[7%] w-[18%] rounded-[0.12rem]" style={{ background: character.boots }} />
            {character.sword ? (
              <div
                className="absolute top-[36%] h-[32%] w-[8%] rounded-[0.15rem] bg-[#d6fff5] shadow-[0_0_16px_rgba(143,252,255,0.38)]"
                style={{
                  [character.sword === 'left' ? 'left' : 'right']: '-10%',
                  transform:
                    character.sword === 'left'
                      ? 'rotate(24deg)'
                      : 'rotate(-24deg)',
                }}
              />
            ) : null}
          </div>
        ))}
      </div>

      {fallbackParticles.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full bg-emerald-200/80 shadow-[0_0_12px_rgba(145,255,158,0.7)] animate-[pulse_5s_ease-in-out_infinite]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}
