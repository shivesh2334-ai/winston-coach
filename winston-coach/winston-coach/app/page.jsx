"use client";
import Link from "next/link";
import { MODULES } from "../lib/modules";

const colorMap = {
  amber: {
    icon: "text-amber-400",
    border: "border-amber-400/20 hover:border-amber-400/50",
    number: "text-amber-500/40",
    glow: "hover:shadow-amber-500/5",
    dot: "bg-amber-400",
    tag: "bg-amber-400/10 text-amber-300",
  },
  rose: {
    icon: "text-rose-400",
    border: "border-rose-400/20 hover:border-rose-400/50",
    number: "text-rose-500/40",
    glow: "hover:shadow-rose-500/5",
    dot: "bg-rose-400",
    tag: "bg-rose-400/10 text-rose-300",
  },
  violet: {
    icon: "text-violet-400",
    border: "border-violet-400/20 hover:border-violet-400/50",
    number: "text-violet-500/40",
    glow: "hover:shadow-violet-500/5",
    dot: "bg-violet-400",
    tag: "bg-violet-400/10 text-violet-300",
  },
  cyan: {
    icon: "text-cyan-400",
    border: "border-cyan-400/20 hover:border-cyan-400/50",
    number: "text-cyan-500/40",
    glow: "hover:shadow-cyan-500/5",
    dot: "bg-cyan-400",
    tag: "bg-cyan-400/10 text-cyan-300",
  },
  emerald: {
    icon: "text-emerald-400",
    border: "border-emerald-400/20 hover:border-emerald-400/50",
    number: "text-emerald-500/40",
    glow: "hover:shadow-emerald-500/5",
    dot: "bg-emerald-400",
    tag: "bg-emerald-400/10 text-emerald-300",
  },
  orange: {
    icon: "text-orange-400",
    border: "border-orange-400/20 hover:border-orange-400/50",
    number: "text-orange-500/40",
    glow: "hover:shadow-orange-500/5",
    dot: "bg-orange-400",
    tag: "bg-orange-400/10 text-orange-300",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen relative" style={{ background: "var(--bg-primary)" }}>
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Ambient glow top */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,137,30,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-20 animate-fade-up">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: "rgba(212,137,30,0.15)", border: "1px solid rgba(212,137,30,0.3)" }}
            >
              <span className="text-amber-400 text-sm">W</span>
            </div>
            <span className="text-sm font-mono" style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}>
              WINSTON COACH
            </span>
          </div>

          <h1
            className="font-display text-6xl md:text-7xl lg:text-8xl leading-none mb-6"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Presentation
            <br />
            <em className="font-display italic" style={{ color: "#d4891e" }}>
              Intelligence
            </em>
          </h1>

          <div className="divider my-8 max-w-md" />

          <p
            className="text-lg max-w-2xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Six frameworks from Patrick Winston&apos;s legendary MIT{" "}
            <em>How to Speak</em> lecture — adapted into an AI coach that
            builds unforgettable presentations, one module at a time.
          </p>

          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                Patrick Winston's MIT Framework
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                AI-Powered Output
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                6 Proven Modules
              </span>
            </div>
          </div>
        </header>

        {/* Winston quote */}
        <div
          className="mb-16 p-6 rounded-xl animate-fade-up delay-2"
          style={{
            background: "rgba(212,137,30,0.04)",
            border: "1px solid rgba(212,137,30,0.15)",
          }}
        >
          <p
            className="font-display text-xl italic leading-relaxed"
            style={{ color: "rgba(226,168,58,0.85)" }}
          >
            &ldquo;The quality of your communication determines the quality of
            your impact. You may have the best idea in the world, but if you
            can&apos;t communicate it, it&apos;s worth nothing.&rdquo;
          </p>
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            — Patrick Henry Winston, MIT AI Lab Director
          </p>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod, i) => {
            const c = colorMap[mod.color];
            return (
              <Link
                key={mod.id}
                href={`/module/${mod.id}`}
                className={`module-card block rounded-xl border p-6 cursor-pointer no-underline animate-fade-up delay-${i + 2}`}
                style={{
                  background: "var(--bg-card)",
                  borderColor: "rgba(255,255,255,0.07)",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colorBorderHover(mod.color);
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${colorShadow(mod.color)}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`text-3xl font-display ${c.icon}`}
                    aria-hidden="true"
                  >
                    {mod.icon}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
                  >
                    {mod.number}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="font-display text-xl leading-snug mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {mod.title}
                </h2>
                <p
                  className={`text-xs mb-3 font-mono ${c.icon}`}
                  style={{ letterSpacing: "0.08em" }}
                >
                  {mod.subtitle}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {mod.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${c.tag}`}
                  >
                    {mod.inputs.length} inputs
                  </span>
                  <span
                    className={`text-xs ${c.icon} flex items-center gap-1`}
                  >
                    Open →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Winston Coach — Built on Patrick Winston&apos;s{" "}
              <em>How to Speak</em>, MIT OpenCourseWare
            </p>
            <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              Powered by Claude AI
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function colorBorderHover(color) {
  const map = {
    amber: "rgba(251,191,36,0.4)",
    rose: "rgba(251,113,133,0.4)",
    violet: "rgba(167,139,250,0.4)",
    cyan: "rgba(34,211,238,0.4)",
    emerald: "rgba(52,211,153,0.4)",
    orange: "rgba(251,146,60,0.4)",
  };
  return map[color] || "rgba(255,255,255,0.2)";
}

function colorShadow(color) {
  const map = {
    amber: "rgba(212,137,30,0.08)",
    rose: "rgba(244,63,94,0.08)",
    violet: "rgba(139,92,246,0.08)",
    cyan: "rgba(6,182,212,0.08)",
    emerald: "rgba(16,185,129,0.08)",
    orange: "rgba(249,115,22,0.08)",
  };
  return map[color] || "rgba(255,255,255,0.04)";
}
