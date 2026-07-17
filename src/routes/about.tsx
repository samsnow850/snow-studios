import { createFileRoute } from "@tanstack/react-router";
import { StoreBadges } from "@/components/StoreBadges";

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
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-20 md:pt-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-ink/40">
              About me
            </h1>
            <div className="space-y-6 text-2xl font-light leading-snug text-ink/80">
              <p>
                Hi, I'm Samuel, the creator of SF POPOS. I've always been inspired by the hidden corners of San Francisco — those little parks, plazas, and terraces that most people walk by without noticing. This project is my way of helping others discover and enjoy these unique spaces.
              </p>
              <p>
                I built SF POPOS to combine two passions of mine: thoughtful design and a love for the city. My goal is to make it easy, fun, and beautiful to explore these spots, whether you're looking for a quiet lunch break retreat, a hidden rooftop view, or just a new place to experience the city.
              </p>
              <p>
                Thanks for stopping by — I hope SF POPOS helps you uncover your next favorite hidden gem in San Francisco.
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-ink/40">
              Elsewhere
            </h2>
            <StoreBadges appStore="https://apps.apple.com/us/developer/samuel-snow/id1620253929" className="mb-6" />
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="text-lg transition-colors hover:text-[var(--color-accent-blue)]"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}