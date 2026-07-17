import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { apps } from "@/data/apps";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Snow Studios" },
      { name: "description", content: "Get in touch about SF POPOS, NY POPS, Shelf Track, or Snow Studios." },
      { property: "og:title", content: "Contact — Snow Studios" },
      { property: "og:description", content: "Get in touch about SF POPOS, NY POPS, Shelf Track, or Snow Studios." },
    ],
  }),
  component: ContactPage,
});

const CATEGORIES = [
  { id: "bug", label: "Bug report" },
  { id: "feature", label: "Feature request" },
  { id: "support", label: "General support" },
  { id: "other", label: "Something else" },
] as const;

const APP_OPTIONS = [
  { slug: "general", name: "Snow Studios (general)" },
  ...apps.map((a) => ({ slug: a.slug, name: a.name })),
];

const CONTACT_EMAIL = "samuel@snowstudios.app";

function ContactPage() {
  const [app, setApp] = useState("general");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["id"]>("bug");
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const appLabel = useMemo(
    () => APP_OPTIONS.find((a) => a.slug === app)?.name ?? "Snow Studios",
    [app],
  );
  const categoryLabel = useMemo(
    () => CATEGORIES.find((c) => c.id === category)?.label ?? "",
    [category],
  );

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (name.length > 100) e.name = "Name is too long.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Please enter a valid email.";
    if (!subject.trim()) e.subject = "Please add a subject.";
    if (subject.length > 140) e.subject = "Subject is too long.";
    if (!message.trim()) e.message = "Please write a message.";
    if (message.length > 5000) e.message = "Message is too long.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const attachmentNote = files.length
      ? `\n\nAttachments (please attach in your mail client after it opens):\n${files
          .map((f) => `- ${f.name} (${Math.round(f.size / 1024)} KB)`)
          .join("\n")}`
      : "";

    const body = [
      `App: ${appLabel}`,
      `Category: ${categoryLabel}`,
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
      attachmentNote,
    ].join("\n");

    const subjectLine = `[${appLabel} · ${categoryLabel}] ${subject}`;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subjectLine,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  };

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const next = Array.from(list).filter((f) => f.size <= 10 * 1024 * 1024).slice(0, 5);
    setFiles(next);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-40">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/40">
          Contact
        </p>
        <h1 className="font-display mt-4 text-5xl font-medium tracking-tight md:text-6xl">
          Say hi.
        </h1>
        <p className="mt-4 max-w-xl text-lg font-light text-ink/60">
          Bugs, ideas, feedback, or just hello — pick the app, tell me what's up, and
          I'll get back to you.
        </p>

        {sent ? (
          <div className="mt-12 rounded-2xl border border-ink/10 bg-stone p-8 shadow-sm">
            <p className="font-display text-2xl">Your mail app should be open.</p>
            <p className="mt-3 text-sm text-ink/60">
              If nothing happened, email me directly at{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 rounded-full border border-ink/15 px-5 py-2 text-sm hover:bg-ink/5"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 space-y-6">
            <Field label="Which app is this about?">
              <div className="flex flex-wrap gap-2">
                {APP_OPTIONS.map((a) => (
                  <button
                    key={a.slug}
                    type="button"
                    onClick={() => setApp(a.slug)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      app === a.slug
                        ? "border-ink bg-ink text-canvas"
                        : "border-ink/15 text-ink/70 hover:bg-ink/5"
                    }`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="What kind of message?">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      category === c.id
                        ? "border-ink bg-ink text-canvas"
                        : "border-ink/15 text-ink/70 hover:bg-ink/5"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Your name" error={errors.name}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="w-full rounded-xl border border-ink/15 bg-stone px-4 py-3 text-sm outline-none focus:border-ink/40"
                  placeholder="Jane Appleseed"
                />
              </Field>
              <Field label="Your email" error={errors.email}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  className="w-full rounded-xl border border-ink/15 bg-stone px-4 py-3 text-sm outline-none focus:border-ink/40"
                  placeholder="you@example.com"
                />
              </Field>
            </div>

            <Field label="Subject" error={errors.subject}>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={140}
                className="w-full rounded-xl border border-ink/15 bg-stone px-4 py-3 text-sm outline-none focus:border-ink/40"
                placeholder="Short summary"
              />
            </Field>

            <Field label="Message" error={errors.message}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={5000}
                rows={8}
                className="w-full resize-y rounded-xl border border-ink/15 bg-stone px-4 py-3 text-sm outline-none focus:border-ink/40"
                placeholder="Tell me what's going on…"
              />
              <p className="mt-1 text-right text-[11px] text-ink/40">
                {message.length} / 5000
              </p>
            </Field>

            <Field label="Attach screenshots (optional, up to 5 · 10MB each)">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onFiles(e.target.files)}
                className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:text-canvas hover:file:bg-ink/80"
              />
              {files.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-ink/60">
                  {files.map((f) => (
                    <li key={f.name}>
                      · {f.name} — {Math.round(f.size / 1024)} KB
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-[11px] text-ink/40">
                Your mail app will open with the message pre-filled — drag your
                screenshots into it before sending.
              </p>
            </Field>

            <div className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-ink/50">
                Prefer email? Write me at{" "}
                <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
              <button
                type="submit"
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition hover:bg-ink/85"
              >
                Send message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}