"use client";

import { FormEvent, useMemo, useState } from "react";

type Role = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  urgent?: boolean;
};

const roles: Role[] = [
  {
    id: "ui-designer",
    name: "UI Designer",
    description:
      "Design polished interfaces, menus, HUDs and systems that make PSTD feel like a finished game.",
    category: "DESIGN",
    icon: "UI",
    urgent: true
  },
  {
    id: "map-builder",
    name: "Map Builder",
    description:
      "Build detailed, immersive and gameplay-focused maps, environments and locations for PSTD.",
    category: "BUILDING",
    icon: "MAP"
  },
  {
    id: "modeler",
    name: "3D Modeler",
    description:
      "Create characters, enemies, props, environments and other 3D assets for PSTD.",
    category: "3D ART",
    icon: "3D"
  },
  {
    id: "artist",
    name: "2D Artist",
    description:
      "Create thumbnails, promotional artwork, icons, concepts and other visual assets.",
    category: "ART",
    icon: "2D"
  },
  {
    id: "vfx",
    name: "VFX Artist",
    description:
      "Create satisfying attacks, abilities, impacts, explosions and other visual effects.",
    category: "EFFECTS",
    icon: "FX"
  },
  {
    id: "sfx",
    name: "SFX / Sound Designer",
    description:
      "Create sound effects, UI sounds, ability sounds and other audio for PSTD.",
    category: "AUDIO",
    icon: "SFX"
  },
  {
    id: "animator",
    name: "Animator",
    description:
      "Create smooth character, enemy, ability and cinematic animations.",
    category: "ANIMATION",
    icon: "AN"
  }
];

export default function Applications() {
  const [selectedRole, setSelectedRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const selected = useMemo(
    () => roles.find((role) => role.id === selectedRole),
    [selectedRole]
  );

  function chooseRole(id: string) {
    setSelectedRole(id);
    setSubmitted(false);
    setError("");

    setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }

  async function submitApplication(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!selectedRole) {
      setError("Please choose a role before submitting.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    data.set("role", selected?.name ?? selectedRole);

    data.delete("portfolio");

    for (const file of files) {
      data.append("portfolio", file);
    }

    setLoading(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Something went wrong."
        );
      }

      setSubmitted(true);
      setFiles([]);

      form.reset();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting your application."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden">

      {/* BACKGROUND */}

      <div className="site-background">
        <div className="background-grid" />

        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <div className="glow glow-three" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">

        {/* HEADER */}

        <header className="flex items-center justify-between border-b border-white/[0.06] py-6">

          <div className="flex items-center gap-4">

            <div className="studio-mark">
              DS
            </div>

            <div>

              <div className="flex items-start">

                <span className="studio-name">
                  DELAYED STUDIOS
                </span>

                <sup className="ml-1 text-[9px] font-bold text-zinc-500">
                  TM
                </sup>

              </div>

              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-600">
                Independent Game Studio
              </p>

            </div>

          </div>

          <div className="hidden items-center gap-3 sm:flex">

            <div className="status-dot" />

            <span className="text-xs font-medium text-zinc-500">
              Applications Open
            </span>

          </div>

        </header>

        {submitted ? (

          /* =====================================
             SUCCESS SCREEN
          ===================================== */

          <section className="success-wrapper">

            <div className="success-card">

              <div className="success-icon">
                <span>✓</span>
              </div>

              <div className="success-label">
                APPLICATION RECEIVED
              </div>

              <h1>
                You&apos;re officially in the queue.
              </h1>

              <p>
                Your application has been sent to the
                Delayed Studios™ development team.
                If we think you&apos;re a good fit for PSTD,
                we&apos;ll reach out to you through Discord.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="primary-button"
              >
                Submit another application

                <span>
                  →
                </span>

              </button>

            </div>

          </section>

        ) : (

          <>

            {/* =====================================
               HERO
            ===================================== */}

            <section className="hero">

              <div className="hero-eyebrow">

                <span className="eyebrow-line" />

                DELAYED STUDIOS™

                <span className="eyebrow-line" />

              </div>

              <div className="hero-title-small">
                IS LOOKING FOR
              </div>

              <h1 className="hero-title">

                <span className="hero-title-light">
                  THE NEXT
                </span>

                <span className="hero-title-gradient">
                  DEVELOPER.
                </span>

              </h1>

              <p className="hero-description">
                PSTD is growing, and we&apos;re looking for talented
                people who want to help us build something
                genuinely awesome.
              </p>

              <div className="hero-meta">

                <div className="meta-item">

                  <strong>
                    07
                  </strong>

                  <span>
                    OPEN ROLES
                  </span>

                </div>

                <div className="meta-divider" />

                <div className="meta-item">

                  <strong>
                    01
                  </strong>

                  <span>
                    PROJECT
                  </span>

                </div>

                <div className="meta-divider" />

                <div className="meta-item">

                  <strong>
                    ∞
                  </strong>

                  <span>
                    ROOM TO GROW
                  </span>

                </div>

              </div>

            </section>

            {/* =====================================
               PROJECT BANNER
            ===================================== */}

            <section className="project-banner">

              <div className="project-left">

                <div className="pstd-logo">
                  P
                </div>

                <div>

                  <div className="project-overline">
                    JOIN THE DEVELOPMENT TEAM
                  </div>

                  <h2>
                    PROJECT <span>PSTD</span>
                  </h2>

                </div>

              </div>

              <div className="project-right">

                <span>
                  Made by Delayed Studios™
                </span>

                <span className="project-arrow">
                  ↗
                </span>

              </div>

            </section>

            {/* =====================================
               ROLES
            ===================================== */}

            <section className="roles-section">

              <div className="section-heading">

                <div>

                  <div className="section-number">
                    01 — POSITIONS
                  </div>

                  <h2>
                    Pick your role.
                  </h2>

                  <p>
                    Choose the position that matches what
                    you&apos;re best at.
                  </p>

                </div>

                <div className="desktop-step">

                  <span>
                    01
                  </span>

                  <div />

                  <span className="muted">
                    02
                  </span>

                </div>

              </div>

              <div className="roles-grid">

                {roles.map((role, index) => (

                  <button
                    key={role.id}
                    type="button"
                    onClick={() => chooseRole(role.id)}
                    className={`new-role-card ${
                      selectedRole === role.id
                        ? "new-role-selected"
                        : ""
                    } ${
                      role.urgent
                        ? "new-role-featured"
                        : ""
                    }`}
                  >

                    {role.urgent && (

                      <div className="needed-badge">

                        <span />

                        MOST NEEDED

                      </div>

                    )}

                    <div className="role-top">

                      <span className="role-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="role-category">
                        {role.category}
                      </span>

                    </div>

                    <div className="new-role-icon">
                      {role.icon}
                    </div>

                    <h3>
                      {role.name}
                    </h3>

                    <p>
                      {role.description}
                    </p>

                    <div className="role-bottom">

                      <span>
                        APPLY FOR ROLE
                      </span>

                      <span className="role-arrow">
                        →
                      </span>

                    </div>

                  </button>

                ))}

              </div>

            </section>

            {/* =====================================
               APPLICATION FORM
            ===================================== */}

            <section
              id="application-form"
              className="application-section"
            >

              <div className="section-heading">

                <div>

                  <div className="section-number">
                    02 — APPLICATION
                  </div>

                  <h2>
                    Tell us about yourself.
                  </h2>

                  <p>
                    Give us everything we need to know.
                  </p>

                </div>

                <div className="desktop-step">

                  <span className="muted">
                    01
                  </span>

                  <div />

                  <span>
                    02
                  </span>

                </div>

              </div>

              <form
                onSubmit={submitApplication}
                className="application-card"
              >

                {/* SELECTED ROLE */}

                <div className="selected-role">

                  <div>

                    <span>
                      APPLYING FOR
                    </span>

                    <strong>
                      {selected
                        ? selected.name
                        : "No role selected"}
                    </strong>

                  </div>

                  {selected && (

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole("");
                        setError("");
                      }}
                    >
                      Change
                    </button>

                  )}

                </div>

                <input
                  type="hidden"
                  name="role"
                  value={selected?.name ?? ""}
                />

                {/* PERSONAL INFORMATION */}

                <div className="form-section">

                  <div className="form-section-title">

                    <span>
                      01
                    </span>

                    <div>

                      <h3>
                        Personal information
                      </h3>

                      <p>
                        Basic information so we know
                        who&apos;s behind the application.
                      </p>

                    </div>

                  </div>

                  <div className="form-grid">

                    <label className="modern-field">

                      <span>
                        Discord username
                        <b>*</b>
                      </span>

                      <input
                        name="discord"
                        required
                        placeholder="yourusername"
                      />

                    </label>

                    <label className="modern-field">

                      <span>
                        Age
                        <b>*</b>
                      </span>

                      <input
                        name="age"
                        required
                        type="number"
                        min="13"
                        max="100"
                        placeholder="16"
                      />

                    </label>

                    <label className="modern-field">

                      <span>
                        Email address
                        <b>*</b>
                      </span>

                      <input
                        name="email"
                        required
                        type="email"
                        placeholder="you@example.com"
                      />

                    </label>

                    <label className="modern-field">

                      <span>
                        Years of experience
                        <b>*</b>
                      </span>

                      <input
                        name="experience"
                        required
                        placeholder="e.g. 2 years"
                      />

                    </label>

                  </div>

                </div>

                {/* EXPERIENCE */}

                <div className="form-section">

                  <div className="form-section-title">

                    <span>
                      02
                    </span>

                    <div>

                      <h3>
                        Your experience
                      </h3>

                      <p>
                        Show us what you&apos;ve worked on
                        before.
                      </p>

                    </div>

                  </div>

                  <label className="modern-field">

                    <span>
                      Portfolio & previous work
                    </span>

                    <textarea
                      name="portfolioLinks"
                      placeholder="Paste links to your portfolio, Roblox games, previous projects, ArtStation, YouTube, etc."
                    />

                  </label>

                  <label className="upload-area">

                    <input
                      name="portfolio"
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(event) =>
                        setFiles(
                          Array.from(
                            event.target.files ?? []
                          )
                        )
                      }
                    />

                    <div className="upload-icon">
                      +
                    </div>

                    <div>

                      <strong>
                        Drop your work here
                      </strong>

                      <p>
                        or click to browse your files
                      </p>

                    </div>

                    <span className="upload-limit">

                      {files.length > 0
                        ? `${files.length} file${
                            files.length === 1
                              ? ""
                              : "s"
                          } selected`
                        : "PNG / JPG / WEBP"}

                    </span>

                  </label>

                  <p className="upload-note">
                    Up to 5 images · 7 MB per image
                  </p>

                </div>

                {/* ABOUT */}

                <div className="form-section">

                  <div className="form-section-title">

                    <span>
                      03
                    </span>

                    <div>

                      <h3>
                        About you
                      </h3>

                      <p>
                        This is where you sell yourself.
                      </p>

                    </div>

                  </div>

                  <label className="modern-field">

                    <span>
                      Why should we choose you?
                      <b>*</b>
                    </span>

                    <textarea
                      name="why"
                      required
                      className="large-textarea"
                      placeholder="Tell us about yourself, your strengths, what you can bring to PSTD, and why you want to join Delayed Studios™."
                    />

                  </label>

                  <label className="modern-field">

                    <span>
                      Anything else?
                    </span>

                    <textarea
                      name="anything"
                      placeholder="Availability, additional skills, previous team experience, or anything else you'd like us to know."
                    />

                  </label>

                </div>

                {/* ERROR */}

                {error && (

                  <div className="error-box">

                    <span>
                      !
                    </span>

                    <p>
                      {error}
                    </p>

                  </div>

                )}

                {/* SUBMIT */}

                <div className="submit-area">

                  <div className="submit-info">

                    <div className="secure-mark">
                      ✓
                    </div>

                    <p>
                      Your application will be reviewed
                      privately by the PSTD team.
                    </p>

                  </div>

                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !selectedRole
                    }
                    className="submit-button"
                  >

                    <span>
                      {loading
                        ? "SENDING APPLICATION..."
                        : "SUBMIT APPLICATION"}
                    </span>

                    {!loading && (

                      <span className="submit-arrow">
                        →
                      </span>

                    )}

                  </button>

                </div>

              </form>

            </section>

          </>

        )}

        {/* =====================================
           FOOTER
        ===================================== */}

        <footer className="site-footer">

          <div>

            <div className="footer-brand">

              DELAYED STUDIOS

              <sup>
                TM
              </sup>

            </div>

            <p>
              Building games worth remembering.
            </p>

          </div>

          <div className="footer-right">
            PSTD Developer Applications
          </div>

        </footer>

      </div>

    </main>
  );
                }
