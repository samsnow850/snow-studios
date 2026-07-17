import { createFileRoute } from "@tanstack/react-router";
import { useRef, type ElementType, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StoreBadges } from "@/components/StoreBadges";
import sailingPhoto from "@/assets/samuel-snow.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Samuel Snow" },
      { name: "description", content: "About Samuel Snow, independent developer behind SF POPOS, NY POPS, and Shelf Track." },
      { property: "og:title", content: "About — Samuel Snow" },
      { property: "og:description", content: "About Samuel Snow, independent developer behind SF POPOS, NY POPS, and Shelf Track." },
    ],
  }),
  component: About,
});

const EASING = [0.25, 0.1, 0.25, 1] as const;

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
};

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  as = "div",
}: FadeInProps) {
  const MotionTag = motion.create(as as any);
  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px", amount: 0 }}
      variants={{
        hidden: { opacity: 0, x, y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { delay, duration, ease: EASING },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

const PARAGRAPH =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

function AnimatedParagraph() {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = PARAGRAPH.split("");
  return (
    <p
      ref={containerRef}
      className="font-kanit text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
      style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
    >
      {chars.map((ch, i) => (
        <Char key={i} ch={ch} index={i} total={chars.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

function Char({
  ch,
  index,
  total,
  progress,
}: {
  ch: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const charProgress = index / total;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const display = ch === " " ? "\u00A0" : ch;
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ opacity: 0 }}>{display}</span>
      <motion.span style={{ position: "absolute", inset: 0, opacity }}>
        {display}
      </motion.span>
    </span>
  );
}

const CORNER_IMAGES = [
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    className: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]",
    delay: 0.1,
    x: -80,
    alt: "",
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    className: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]",
    delay: 0.25,
    x: -80,
    alt: "",
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    className: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]",
    delay: 0.15,
    x: 80,
    alt: "",
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    className: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]",
    delay: 0.3,
    x: 80,
    alt: "",
  },
];

function About() {
  return (
    <div className="font-kanit bg-[#0C0C0C] text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
        {CORNER_IMAGES.map((img, i) => (
          <FadeIn
            key={i}
            as="img"
            delay={img.delay}
            duration={0.9}
            x={img.x}
            y={0}
            className={`absolute z-0 h-auto pointer-events-none ${img.className}`}
            // @ts-expect-error img props passthrough
            src={img.src}
            alt={img.alt}
          />
        ))}

        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 w-full">
            <FadeIn delay={0} y={40}>
              <h1
                className="hero-heading font-black uppercase leading-none tracking-tight text-center"
                style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
              >
                About me
              </h1>
            </FadeIn>
            <AnimatedParagraph />
          </div>

          <FadeIn delay={0.3} y={20}>
            <a
              href="#contact"
              className="inline-block rounded-full text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-opacity duration-200 hover:opacity-90 active:opacity-75"
              style={{
                background:
                  "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                boxShadow:
                  "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                outline: "2px solid #E3E3E3",
                outlineOffset: -3,
              }}
            >
              Contact Me
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Bio + links */}
      <section id="contact" className="px-5 sm:px-8 md:px-10 pb-24 pt-8">
        <div className="mx-auto max-w-4xl grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6 text-lg font-light leading-relaxed text-white/80">
            <p>
              Hi, I'm Samuel, the creator of SF POPOS. I've always been inspired by the hidden corners of San Francisco — those little parks, plazas, and terraces that most people walk by without noticing.
            </p>
            <p>
              I built SF POPOS to combine two passions of mine: thoughtful design and a love for the city. My goal is to make it easy, fun, and beautiful to explore these spots.
            </p>
            <p>
              Thanks for stopping by — I hope SF POPOS helps you uncover your next favorite hidden gem in San Francisco.
            </p>
          </div>
          <div>
            <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <img
                src={sailingPhoto.url}
                alt="Samuel sailing on the bay"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
              Elsewhere
            </h2>
            <StoreBadges
              appStore="https://apps.apple.com/us/developer/samuel-snow/id1620253929"
              className="mb-6"
            />
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/samsnow850"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg text-white/80 transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}