import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import './Stack.css';

interface AnimationConfig {
  stiffness: number;
  damping: number;
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: React.ReactNode[];
  animationConfig?: AnimationConfig;
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  /** The card that should sit on the front of the stack (index into `cards`). */
  activeIndex?: number;
  /** Fired with the front card's index whenever the stack changes internally. */
  onTopChange?: (index: number) => void;
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  activeIndex,
  onTopChange,
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const onTopChangeRef = useRef(onTopChange);
  useEffect(() => {
    onTopChangeRef.current = onTopChange;
  }, [onTopChange]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  /* Reverse initial order: sendToBack unshifts the front card, so starting
     with 01 on the front makes autoplay cycle 1 → 2 → 3 → … → 6 → 1. */
  const buildStack = (source: React.ReactNode[]) =>
    source.map((content, index) => ({ id: index + 1, content })).reverse();

  const [stack, setStack] = useState<{ id: number; content: React.ReactNode }[]>(() => buildStack(cards));

  useEffect(() => {
    if (cards.length) {
      setStack(buildStack(cards));
    }
  }, [cards]);

  // Bring the requested card to the front when activeIndex changes.
  useEffect(() => {
    if (activeIndex == null) return;
    setStack(prev => {
      const targetId = activeIndex + 1;
      if (prev[prev.length - 1]?.id === targetId) return prev;
      const idx = prev.findIndex(c => c.id === targetId);
      if (idx === -1) return prev;
      const next = [...prev];
      const [card] = next.splice(idx, 1);
      next.push(card);
      return next;
    });
  }, [activeIndex]);

  const sendToBack = (id: number) => {
    setStack(prev => {
      const idx = prev.findIndex(c => c.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      const [card] = next.splice(idx, 1);
      next.unshift(card);
      return next;
    });
  };

  /* Report the front card's index whenever the deck order changes. */
  useEffect(() => {
    if (stack.length) {
      onTopChangeRef.current?.(stack[stack.length - 1].id - 1);
    }
  }, [stack]);

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        const isFront = index === stack.length - 1;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className={`card${isFront ? ' card--front' : ''}`}
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '90% 90%',
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
