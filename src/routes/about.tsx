import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StoreBadges } from "@/components/StoreBadges";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";
import sailingPhoto from "@/assets/samuel-snow.jpg.asset.json";
import instagramLogo from "@/assets/instagram-logo.png.asset.json";

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

function About() {
  return (
    <div className="min-h-screen bg-canvas pb-40 text-ink">
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-24 md:pt-36">
        <FadeIn>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
            About
          </p>
          <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
            Samuel Snow
          </h1>
          <p className="mt-3 text-sm text-ink/40">
            Independent developer behind SF POPOS, NY POPS, and Shelf Track.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <StaggerContainer className="space-y-6 text-lg font-light leading-relaxed text-ink/80" stagger={0.1}>
            <StaggerItem>
              <p>
                Hi, I’m Samuel, the creator of SF POPOS. I’ve always been inspired by the hidden corners of San Francisco — those little parks, plazas, and terraces that most people walk by without noticing. This project is my way of helping others discover and enjoy these unique spaces.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                I built SF POPOS to combine two passions of mine: thoughtful design and a love for the city. My goal is to make it easy, fun, and beautiful to explore these spots, whether you’re looking for a quiet lunch break retreat, a hidden rooftop view, or just a new place to experience the city.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                Thanks for stopping by — I hope SF POPOS helps you uncover your next favorite hidden gem in San Francisco.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.35 }}
                className="mb-8 overflow-hidden rounded-2xl border border-ink/10 shadow-lg"
              >
                <img
                  src={sailingPhoto.url}
                  alt="Samuel sailing on the bay"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink/40">
                Elsewhere
              </h2>
              <StoreBadges
                appStore="https://apps.apple.com/us/developer/samuel-snow/id1829824175"
                playStore="https://play.google.com/store/apps/dev?id=7438315602211912725"
                className="mb-6"
              />
              <ul className="space-y-3">
                <li>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/samsnow850"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center gap-2 text-ink/80 transition-opacity hover:opacity-80"
                  >
                    <img
                      src={instagramLogo.url}
                      alt="Instagram"
                      className="h-8 w-8"
                      loading="lazy"
                    />
                  </motion.a>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
