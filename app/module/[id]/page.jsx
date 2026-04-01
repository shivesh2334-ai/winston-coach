"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MODULE_MAP, MODULES } from "../../../lib/modules";

const colorAccent = {
  amber: { text: "#e2a83a", bg: "rgba(212,137,30,0.08)", border: "rgba(212,137,30,0.25)", ring: "rgba(212,137,30,0.5)", light: "#fef3c7" },
  rose: { text: "#fb7185", bg: "rgba(244,63,94,0.08)", border: "rgba(244,63,94,0.25)", ring: "rgba(244,63,94,0.5)", light: "#ffe4e6" },
  violet: { text: "#a78bfa", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", ring: "rgba(139,92,246,0.5)", light: "#ede9fe" },
  cyan: { text: "#22d3ee", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.25)", ring: "rgba(6,182,212,0.5)", light: "#cffafe" },
  emerald: { text: "#34d399", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)", ring: "rgba(16,185,129,0.5)", light: "#d1fae5" },
  orange: { text: "#fb923c", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.25)", ring: "rgba(249,115,22,0.5)", light: "#ffedd5" },
};

function parseMarkdownToSections(text) {
  if (!text) return [];
  const lines = text.split("\n");
  const sections = [];
  let current = null;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { heading: line.replace("## ", "").trim(), content: "" };
    } else {
      if (current) {
        current.content += line + "\n";
      }
    }
  }
  if (current) sections.push(current);
  return sections;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderInlineMarkdown(text) {
  // Very simple inline markdown: **bold**, *italic*, `code`
  let result = escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e8edf5;font-weight:600">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:#93a9cc">$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:rgba(255,255,255,0.06);padding:0.1rem 0.35rem;border-radius:3px;font-family:var(--font-mono),monospace;font-size:0.85em;color:#93a9cc">$1</code>');
  return result;
}

function RenderContent({ text, accentColor }) {
  const lines = text.trim().split("\n");
  const elements = [];
  let listItems = [];
  let blockquoteLines = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} style={{ paddingLeft: "1.25rem", marginBottom: "0.75rem" }}>
          {listItems.map((item, i) => (
            <li key={i} style={{ color: "#c8d4e6", lineHeight: 1.75, marginBottom: "0.3rem", fontSize: "0.92rem" }}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const flushBlockquote = () => {
    if (blockquoteLines.length > 0) {
      elements.push(
        <blockquote key={`bq-${elements.length}`} style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: "1rem", marginLeft: 0, background: `${accentColor}0a`, padding: "0.75rem 1rem", borderRadius: "0 4px 4px 0", marginBottom: "0.75rem" }}>
          {blockquoteLines.map((l, i) => (
            <p key={i} style={{ color: "#b8c8e0", fontStyle: "italic", margin: 0, fontSize: "0.92rem", lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(l) }} />
          ))}
        </blockquote>
      );
      blockquoteLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("### ")) {
      flushList();
      flushBlockquote();
      elements.push(
        <h3 key={`h3-${i}`} className="font-display" style={{ fontSize: "1.05rem", fontWeight: 500, color: "#c0cedf", marginTop: "1rem", marginBottom: "0.4rem" }}>
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ") || (line.match(/^\d+\. /))) {
      flushBlockquote();
      const content = line.replace(/^[-*]\s/, "").replace(/^\d+\.\s/, "");
      listItems.push(content);
    } else if (line.startsWith("> ")) {
      flushList();
      blockquoteLines.push(line.replace(/^>\s?/, ""));
    } else if (line.trim() === "---" || line.trim() === "***") {
      flushList();
      flushBlockquote();
      elements.push(
        <hr key={`hr-${i}`} style={{ borderColor: "rgba(255,255,255,0.07)", margin: "1rem 0" }} />
      );
    } else if (line.trim() === "") {
      flushList();
      flushBlockquote();
    } else {
      flushList();
      flushBlockquote();
      if (line.trim()) {
        elements.push(
          <p key={`p-${i}`} style={{ color: "#c8d4e6", lineHeight: 1.8, marginBottom: "0.6rem", fontSize: "0.92rem" }}
            dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }} />
        );
      }
    }
  }

  flushList();
  flushBlockquote();
  return <div>{elements}</div>;
}

export default function ModulePage() {
  const params = useParams();
  const mod = MODULE_MAP[params.id];
  const [inputs, setInputs] = useState({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const outputRef = useRef(null);

  const c = mod ? colorAccent[mod.color] : colorAccent.amber;

  // Auto-scroll output
  useEffect(() => {
    if (loading && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, loading]);

  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center">
          <p style={{ color: "var(--text-secondary)" }}>Module not found</p>
          <Link href="/" className="text-amber-400 mt-4 block hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    // Validate all inputs
    for (const field of mod.inputs) {
      if (!inputs[field.id] || !inputs[field.id].trim()) {
        setError(`Please fill in: ${field.label}`);
        return;
      }
    }

    setError("");
    setOutput("");
    setDone(false);
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: mod.id,
          userPrompt: mod.userPrompt(inputs),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Generation failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setOutput(accumulated);
      }

      setDone(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOutput("");
    setDone(false);
    setError("");
    setLoading(false);
  };

  const sections = parseMarkdownToSections(output);

  // Adjacent modules for nav
  const modIndex = MODULES.findIndex((m) => m.id === mod.id);
  const prevMod = MODULES[modIndex - 1];
  const nextMod = MODULES[modIndex + 1];

  return (
    <div className="min-h-screen relative" style={{ background: "var(--bg-primary)" }}>
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Color ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${c.bg.replace("0.08", "0.12")} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Top nav */}
        <nav className="flex items-center justify-between mb-12 animate-fade-up">
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <span style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
              className="group-hover:text-amber-400 text-sm">← All Modules</span>
          </Link>
          <div className="flex items-center gap-3">
            {prevMod && (
              <Link href={`/module/${prevMod.id}`}
                className="text-xs px-3 py-1.5 rounded-lg no-underline transition-colors"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-subtle)"}
              >
                ← {prevMod.number}
              </Link>
            )}
            {nextMod && (
              <Link href={`/module/${nextMod.id}`}
                className="text-xs px-3 py-1.5 rounded-lg no-underline transition-colors"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-subtle)"}
              >
                {nextMod.number} →
              </Link>
            )}
          </div>
        </nav>

        {/* Module header */}
        <header className="mb-10 animate-fade-up delay-1">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl" style={{ color: c.text }}>{mod.icon}</span>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs" style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}>
                  MODULE {mod.number}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                  {mod.subtitle}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                {mod.title}
              </h1>
            </div>
          </div>
          <p className="text-base leading-relaxed max-w-2xl ml-16" style={{ color: "var(--text-secondary)" }}>
            {mod.description}
          </p>
        </header>

        <div className="divider mb-10" />

        {/* Input form */}
        {!done && (
          <section className="mb-10 animate-fade-up delay-2">
            <h2 className="font-display text-lg mb-6" style={{ color: "var(--text-secondary)" }}>
              Tell me about your presentation
            </h2>
            <div className="grid gap-5">
              {mod.inputs.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm mb-2 font-mono"
                    style={{ color: "var(--text-muted)", letterSpacing: "0.04em" }}>
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="input-field"
                      rows={3}
                      placeholder={field.placeholder}
                      value={inputs[field.id] || ""}
                      onChange={(e) => setInputs({ ...inputs, [field.id]: e.target.value })}
                      onFocus={e => e.target.style.borderColor = c.ring}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                  ) : (
                    <input
                      type="text"
                      className="input-field"
                      placeholder={field.placeholder}
                      value={inputs[field.id] || ""}
                      onChange={(e) => setInputs({ ...inputs, [field.id]: e.target.value })}
                      onFocus={e => e.target.style.borderColor = c.ring}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !loading) handleGenerate();
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <p className="mt-4 text-sm px-4 py-3 rounded-lg"
                style={{ color: "#fb7185", background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)" }}>
                {error}
              </p>
            )}

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
                style={{
                  background: loading
                    ? "rgba(212,137,30,0.3)"
                    : `linear-gradient(135deg, ${c.text} 0%, ${c.border.replace("0.25", "0.9")} 100%)`,
                }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin inline-block" />
                    Generating...
                  </>
                ) : (
                  <>Generate with Winston AI →</>
                )}
              </button>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                Powered by Claude AI
              </span>
            </div>
          </section>
        )}

        {/* Streaming output */}
        {(output || loading) && (
          <section className="animate-fade-up">
            {/* Output header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: done ? c.text : "#22c55e" }} />
                <span className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                  {done ? "Analysis complete" : "Generating your presentation guide..."}
                </span>
              </div>
              {done && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(output);
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-subtle)"}
                  >
                    Copy raw
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ color: c.text, border: `1px solid ${c.border}` }}
                  >
                    ← Edit inputs
                  </button>
                </div>
              )}
            </div>

            {/* Sections */}
            {sections.length > 0 ? (
              <div className="space-y-4">
                {sections.map((section, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-6 animate-fade-up"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 rounded-full" style={{ background: c.text }} />
                      <h2 className="font-display text-lg" style={{ color: c.text }}>
                        {section.heading}
                      </h2>
                    </div>
                    <RenderContent text={section.content} accentColor={c.text} />
                  </div>
                ))}

                {/* Streaming tail - show if still loading */}
                {loading && (
                  <div className="rounded-xl p-6"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {output.split("\n").slice(-1)[0]}
                    </span>
                    <span className="cursor-blink" />
                  </div>
                )}
              </div>
            ) : (
              /* Raw streaming before sections appear */
              <div
                ref={outputRef}
                className="rounded-xl p-6 font-mono text-sm leading-relaxed overflow-y-auto"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                  maxHeight: "400px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {output}
                {loading && <span className="cursor-blink" />}
              </div>
            )}

            {/* Next module prompt */}
            {done && nextMod && (
              <div
                className="mt-8 p-5 rounded-xl flex items-center justify-between animate-fade-up delay-3"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
              >
                <div>
                  <p className="text-xs font-mono mb-1" style={{ color: "var(--text-muted)" }}>
                    NEXT MODULE
                  </p>
                  <p className="font-display text-base" style={{ color: "var(--text-primary)" }}>
                    {nextMod.title}
                  </p>
                </div>
                <Link
                  href={`/module/${nextMod.id}`}
                  className="text-xs px-4 py-2 rounded-lg no-underline"
                  style={{ background: colorAccent[nextMod.color].bg, color: colorAccent[nextMod.color].text, border: `1px solid ${colorAccent[nextMod.color].border}` }}
                >
                  Continue →
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
