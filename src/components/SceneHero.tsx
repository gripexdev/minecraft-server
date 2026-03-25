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
type DeviceNavigator = Navigator & { deviceMemory?: number }

const SceneHeroCanvas = lazy(() => import('./SceneHeroCanvas'))

const fallbackColumns = [
  { left: '4%', width: '8%', height: '18%' },
  { left: '11%', width: '7%', height: '26%' },
  { left: '18%', width: '9%', height: '20%' },
  { left: '27%', width: '10%', height: '33%' },
  { left: '37%', width: '8%', height: '24%' },
  { left: '45%', width: '9%', height: '36%' },
  { left: '54%', width: '7%', height: '28%' },
  { left: '61%', width: '11%', height: '42%' },
  { left: '72%', width: '8%', height: '30%' },
  { left: '80%', width: '10%', height: '24%' },
  { left: '90%', width: '7%', height: '16%' },
]

const fallbackParticles = [
  { left: '12%', top: '14%', size: '0.4rem', delay: '0s' },
  { left: '24%', top: '20%', size: '0.55rem', delay: '0.9s' },
  { left: '39%', top: '12%', size: '0.35rem', delay: '0.4s' },
  { left: '58%', top: '26%', size: '0.5rem', delay: '1.1s' },
  { left: '72%', top: '18%', size: '0.45rem', delay: '0.2s' },
  { left: '82%', top: '32%', size: '0.38rem', delay: '1.3s' },
]

function resolveRenderMode(shouldReduceMotion: boolean): RenderMode {
  if (shouldReduceMotion || typeof window === 'undefined') {
    return 'fallback'
  }

  const deviceNavigator = navigator as DeviceNavigator
  const lowPowerDevice =
    (deviceNavigator.deviceMemory !== undefined &&
      deviceNavigator.deviceMemory <= 4) ||
    navigator.hardwareConcurrency <= 4

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

    return gl && !lowPowerDevice ? 'scene' : 'fallback'
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(154,255,155,0.12),transparent_30%),radial-gradient(circle_at_82%_24%,rgba(130,162,255,0.14),transparent_24%),linear-gradient(180deg,rgba(3,10,8,0.08),rgba(2,5,4,0.72)_64%,rgba(2,4,4,0.98)_100%)]" />

      <div className="absolute right-[10%] top-[22%] h-24 w-24 rounded-[1.75rem] border border-emerald-200/14 bg-gradient-to-br from-emerald-300/14 via-white/6 to-sky-400/10 shadow-[0_0_70px_rgba(125,255,137,0.16)] backdrop-blur-xl [transform:rotate(18deg)] sm:h-32 sm:w-32" />
      <div className="absolute right-[15%] top-[24%] h-44 w-2 rounded-full bg-gradient-to-b from-emerald-200/0 via-emerald-200/40 to-emerald-200/0 blur-md sm:h-56" />

      <div className="absolute inset-x-0 bottom-0 h-[48%]">
        {fallbackColumns.map((column) => (
          <div
            key={`${column.left}-${column.height}`}
            className="absolute bottom-0 rounded-t-md border border-white/5 bg-gradient-to-t from-[#020403] via-[#08120d] to-[#12301e]"
            style={{
              left: column.left,
              width: column.width,
              height: column.height,
            }}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#030504] to-transparent" />
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
