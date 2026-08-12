import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export type SpecularSize = 'sm' | 'md' | 'lg' | 'xl';

export interface SpecularButtonProps {
  size?: SpecularSize;
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
}

const SIZES: Record<SpecularSize, React.CSSProperties> = {
  sm: { padding: '7px 15px', fontSize: 12, fontWeight: 600 },
  md: { padding: '10px 20px', fontSize: 13, fontWeight: 600 },
  lg: { padding: '14px 24px', fontSize: 14, fontWeight: 600 },
  xl: { padding: '16px 30px', fontSize: 15, fontWeight: 600 },
};

let keyframesInjected = false;
const ensureKeyframes = () => {
  if (keyframesInjected || typeof document === 'undefined') return;
  keyframesInjected = true;
  const style = document.createElement('style');
  style.textContent = `@keyframes specular-shine {
    0%   { transform: translateX(-160%) skewX(-18deg); }
    55%  { transform: translateX(160%) skewX(-18deg); }
    100% { transform: translateX(160%) skewX(-18deg); }
  }`;
  document.head.appendChild(style);
};

/* Brand presets — the site keeps its orange look while using the glass style */
export const specularPrimary: Partial<SpecularButtonProps> = {
  radius: 14,
  baseColor: '#E87722',
  textColor: '#ffffff',
  lineColor: 'rgba(255,255,255,0.3)',
  tint: '#F5A623',
  tintOpacity: 0.45,
  intensity: 1,
  shineSize: 10,
  shineFade: 45,
  thickness: 1,
  speed: 0.35,
  followMouse: true,
  proximity: 220,
};

export const specularOutlineLight: Partial<SpecularButtonProps> = {
  radius: 14,
  baseColor: 'rgba(255,255,255,0.04)',
  textColor: 'rgba(255,255,255,0.75)',
  lineColor: 'rgba(255,255,255,0.16)',
  tint: 'rgba(255,255,255,0.5)',
  tintOpacity: 0.18,
  intensity: 1,
  shineSize: 10,
  shineFade: 35,
  thickness: 1,
  speed: 0.35,
  followMouse: true,
  proximity: 220,
};

export const specularOutlineDark: Partial<SpecularButtonProps> = {
  radius: 14,
  baseColor: 'rgba(20,20,20,0.05)',
  textColor: '#3a3a3a',
  lineColor: 'rgba(20,20,20,0.16)',
  tint: 'rgba(20,20,20,0.35)',
  tintOpacity: 0.25,
  intensity: 1,
  shineSize: 10,
  shineFade: 35,
  thickness: 1,
  speed: 0.35,
  followMouse: true,
  proximity: 220,
};

export const SpecularButton: React.FC<SpecularButtonProps> = ({
  size = 'md',
  radius = 16,
  tint = '#ffffff',
  tintOpacity = 0,
  blur = 0,
  textColor = '#f5f5f5',
  lineColor = '#ffffff',
  baseColor = '#525252',
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  followMouse = false,
  proximity = 250,
  autoAnimate = false,
  type = 'button',
  onClick,
  href,
  to,
  target,
  rel,
  ariaLabel,
  className,
  style,
  disabled,
  children,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(false);
  const setRef = (el: HTMLElement | null) => { ref.current = el; };

  useEffect(() => { ensureKeyframes(); }, []);

  /* Follow the mouse near the button (proximity radius) when enabled */
  useEffect(() => {
    if (!followMouse) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const radius = Math.max(rect.width, rect.height) / 2 + proximity;
      if (dist <= radius) {
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [followMouse, proximity]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: radius,
    border: `${thickness}px solid ${lineColor}`,
    background: `linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.1) 100%), ${baseColor}`,
    color: textColor,
    overflow: 'hidden',
    textDecoration: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
    opacity: disabled ? 0.35 : 1,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 3px rgba(0,0,0,0.18), 0 4px 18px rgba(0,0,0,0.18)',
    outline: 'none',
    ...SIZES[size],
    ...style,
  };

  const glowOpacity = tintOpacity * intensity;

  const inner = (
    <>
      {/* Mouse-following glow */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '160%',
          height: '160%',
          left: pos ? `${pos.x}%` : '50%',
          top: pos ? `${pos.y}%` : '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${tint} 0%, transparent 60%)`,
          opacity: active ? glowOpacity : 0,
          filter: blur ? `blur(${blur}px)` : undefined,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Shine sweep */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-25%',
          bottom: '-25%',
          width: `${shineSize * 2}%`,
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${shineFade / 100}) 50%, transparent 100%)`,
          transform: active ? 'translateX(160%) skewX(-18deg)' : 'translateX(-160%) skewX(-18deg)',
          transition: autoAnimate ? undefined : `transform ${speed}s cubic-bezier(0.25, 0.8, 0.35, 1)`,
          animation: autoAnimate ? `specular-shine ${speed * 3}s linear infinite` : undefined,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {children}
      </span>
    </>
  );

  const common = {
    ref: setRef,
    className,
    style: containerStyle,
    'aria-label': ariaLabel,
    onClick,
  };

  if (to) {
    return (
      <Link to={to} {...common}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} {...common}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} {...common}>
      {inner}
    </button>
  );
};
