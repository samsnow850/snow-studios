import { useEffect, useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Facebook,
  Twitter,
  Dribbble,
  Youtube,
  Linkedin,
  Instagram,
} from "lucide-react";

const navLinks = ["Domain", "Servers", "Cloud", "Managed", "Email", "Privacy"];

const footerColumns: { title: string; links: string[] }[] = [
  { title: "SERVERS", links: ["Web Servers", "VPS Servers", "Cloud Servers", "Managed Instances", "Bare Metal"] },
  { title: "DOMAINS", links: ["Find Domain", "Move Domains", "DNS Manager", "Domain Costs"] },
  { title: "HELP US", links: ["Open a Ticket", "FAQs", "Docs", "Tutorials", "Forum"] },
  { title: "ABOUT", links: ["Our Story", "Leadership Team", "Press Room", "We Hire", "Alliance", "Blog"] },
];

const socials = [Facebook, Twitter, Dribbble, Youtube, Linkedin, Instagram];

function NexovaLogo() {
  return (
    <svg viewBox="0 0 480 480" className="w-8 h-8" fill="white" aria-hidden>
      <path d="M480 240a240 240 0 0 0-240 240 240 240 0 0 0 240-240Z" />
      <path d="M240 0A240 240 0 0 0 0 240 240 240 0 0 0 240 0Z" />
      <path d="M480 240A240 240 0 0 0 240 0a240 240 0 0 0 240 240Z" />
      <path d="M240 480A240 240 0 0 0 0 240a240 240 0 0 0 240 240Z" />
    </svg>
  );
}

export function Nexova404() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      const id = requestAnimationFrame(() => setMenuVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [mobileMenuOpen]);

  const openMenu = () => setMobileMenuOpen(true);
  const closeMenu = () => {
    setMenuVisible(false);
    setTimeout(() => setMobileMenuOpen(false), 500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-auto bg-black"
      style={{ fontFamily: '"Helvetica Now Var", Helvetica, Arial, sans-serif' }}
    >
      <div className="relative min-h-screen flex flex-col">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Nav */}
          <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5">
            <a href="/" className="flex items-center gap-2">
              <NexovaLogo />
              <span className="text-white text-xl font-bold tracking-wider">NEXOVA</span>
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200"
                >
                  {l}
                </a>
              ))}
            </div>

            <a
              href="#"
              className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full"
            >
              LOG IN <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={mobileMenuOpen ? closeMenu : openMenu}
              className="lg:hidden relative z-[60] w-8 h-8 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <Menu
                className={`w-6 h-6 text-white absolute transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`w-6 h-6 text-white absolute transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                }`}
              />
            </button>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <>
              <div
                onClick={closeMenu}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-[400ms] ${
                  menuVisible ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="absolute left-0 right-0 top-[68px] z-50">
                <div className="absolute inset-0 backdrop-blur-xl rounded-b-2xl" />
                <div className="relative z-10 flex flex-col items-center gap-6 py-10">
                  {navLinks.map((l, i) => (
                    <a
                      key={l}
                      href="#"
                      onClick={closeMenu}
                      className="text-white/80 hover:text-white text-lg sm:text-xl font-light tracking-[0.08em] transition-all duration-[400ms] ease-out"
                      style={{
                        opacity: menuVisible ? 1 : 0,
                        transform: menuVisible ? "translateY(0)" : "translateY(12px)",
                        transitionDelay: menuVisible ? `${350 + i * 50}ms` : "0ms",
                      }}
                    >
                      {l}
                    </a>
                  ))}
                  <a
                    href="#"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-[400ms] ease-out"
                    style={{
                      opacity: menuVisible ? 1 : 0,
                      transform: menuVisible ? "translateY(0)" : "translateY(12px)",
                      transitionDelay: menuVisible ? `${350 + navLinks.length * 50}ms` : "0ms",
                    }}
                  >
                    LOG IN <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </>
          )}

          {/* Hero */}
          <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16 md:py-0">
            <h1 className="text-white/80 text-lg sm:text-3xl md:text-5xl font-light leading-snug tracking-tight mb-1 sm:mb-2">
              This page seems to have
            </h1>
            <h1 className="text-white/80 text-lg sm:text-3xl md:text-5xl font-light leading-snug tracking-tight mb-8 sm:mb-12">
              slipped beyond our reach :/
            </h1>

            <div className="relative mb-8 sm:mb-12 w-full flex justify-center overflow-visible">
              <span className="four-oh-four text-[80px] sm:text-[140px] md:text-[200px] lg:text-[260px] font-black text-white leading-none tracking-tighter select-none">
                404
              </span>
            </div>

            <a
              href="/"
              className="liquid-glass text-white text-[10px] sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full uppercase"
            >
              Return to Main Page
            </a>
          </section>

          {/* Footer */}
          <footer className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 pb-8 sm:pb-10 pt-10 sm:pt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-6">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <h3 className="text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] mb-3 sm:mb-4">
                    {col.title}
                  </h3>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="text-white/50 hover:text-white/80 text-[10px] sm:text-xs transition-colors duration-200"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="col-span-2 lg:col-span-2">
                <h3 className="text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] mb-3 sm:mb-4">
                  JOIN FOR EXCLUSIVE DEALS
                </h3>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex max-w-sm"
                >
                  <input
                    type="email"
                    placeholder="Type your email to sign up"
                    className="flex-1 min-w-0 bg-white rounded-l-md px-3 py-2 text-xs text-black placeholder-black/50 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-xs font-bold tracking-wider rounded-r-md px-4"
                  >
                    SEND IT
                  </button>
                </form>

                <h3 className="text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] mt-5 sm:mt-6 mb-3">
                  CONNECT
                </h3>
                <div className="flex items-center gap-3">
                  {socials.map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-white/50 hover:text-white transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}