import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

export interface CardColor {
  base: string;
  dark: string;
  hi: string;
}

interface BounceCardsProps {
  className?: string;
  cards?: React.ReactNode[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  onCardClick?: (index: number) => void;
  activeIndex?: number;
  /** Unique per-card colors (all in the orange family here). */
  cardColors?: CardColor[];
  /** Cards that should be raised as the "active section". */
  lifted?: boolean[];
  /** Cards that should be dimmed (the other section). */
  dimmed?: boolean[];
}

const DEFAULT_TRANSFORMS = [
  'rotate(12deg) translate(-195px)',
  'rotate(7deg) translate(-130px)',
  'rotate(2deg) translate(-65px)',
  'rotate(-2deg) translate(65px)',
  'rotate(-7deg) translate(130px)',
  'rotate(-12deg) translate(195px)',
];

export default function BounceCards({
  className = '',
  cards = [],
  containerWidth = 480,
  containerHeight = 150,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = DEFAULT_TRANSFORMS,
  enableHover = true,
  onCardClick,
  activeIndex = 0,
  cardColors,
  lifted = [],
  dimmed = [],
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bounce-card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    }
    if (transformStr === 'none') {
      return 'rotate(0deg)';
    }
    return `${transformStr} rotate(0deg)`;
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    }
    return baseTransform === 'none'
      ? `translate(${offsetX}px)`
      : `${baseTransform} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    cards.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] ?? 'none';

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(target, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto',
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    cards.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] ?? 'none';
      gsap.to(target, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {cards.map((card, idx) => {
        const c = cardColors?.[idx];
        const vars = c
          ? ({ '--card-base': c.base, '--card-dark': c.dark, '--card-hi': c.hi } as React.CSSProperties)
          : undefined;
        return (
          <div
            key={idx}
            className={`bounce-card bounce-card-${idx}${activeIndex === idx ? ' bounce-card--active' : ''}${lifted[idx] ? ' bounce-card--lifted' : ''}${dimmed[idx] ? ' bounce-card--dimmed' : ''}`}
            style={{
              transform: transformStyles[idx] ?? 'none',
              ...vars,
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
            onClick={() => onCardClick?.(idx)}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
