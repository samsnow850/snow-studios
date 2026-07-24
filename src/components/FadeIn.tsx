import { motion, type Transition } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

const transitionDefaults: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 24,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ ...transitionDefaults, duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: transitionDefaults },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
