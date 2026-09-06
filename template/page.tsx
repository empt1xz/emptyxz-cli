"use client";

import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [pkgManager, setPkgManager] = useState<"node">("node");

  const commands: Record<string, string> = {
    node: "npx emptyxz init",
  };

  function handleCopy() {
    navigator.clipboard.writeText(commands[pkgManager]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
      <main className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="44" height="44">
              <path
                d="M16 2 L28 9 V23 L16 30 L4 23 V9 Z"
                fill="url(#g2)"
                stroke="var(--line)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#AD0707" />
                  <stop offset="100%" stopColor="rgb(255, 2, 2)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h1 className="wordmark">EMPTYXZ</h1>

          <p className="tagline">
            Scaffold a production-ready app in one command, no config to babysit
          </p>

          <div className="cta-row">
            <a href="#github" className="cta-outline">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.48c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.96 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.08-1.88 3.75-3.67 3.95.29.25.54.73.54 1.48v2.2c0 .21.14.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              Star on GitHub
            </a>
            <a href="#docs" className="cta-outline">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 1.6h6l2.4 2.4v10.4H4z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 8h4M6 10.4h4M6 5.6h1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              Read the docs
            </a>
          </div>

          <div className="install-card">
            <div className="install-tabs" role="tablist">
              {(["node"] as const).map((pm) => (
                <button
                  key={pm}
                  role="tab"
                  aria-selected={pkgManager === pm}
                  className={`install-tab ${pkgManager === pm ? "active" : ""}`}
                  onClick={() => setPkgManager(pm)}
                >
                  {pm === "node" ? "node.js" : pm}
                </button>
              ))}
            </div>
            <div className="install-cmd">
              <code>{commands[pkgManager]}</code>
              <button
                className="copy-btn"
                onClick={handleCopy}
                aria-label="Copy command"
              >
                {copied ? (
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8.5 6.2 12 13 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <rect
                      x="5.5"
                      y="5.5"
                      width="8"
                      height="9"
                      rx="1.2"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M3 10.2V3.4A1.4 1.4 0 0 1 4.4 2h6.4"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
