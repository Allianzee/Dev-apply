"use client";

import { FormEvent, useMemo, useState } from "react";

type Role = {
  id: string;
  name: string;
  description: string;
  icon: string;
  urgent?: boolean;
};

const roles: Role[] = [
  {
    id: "ui-designer",
    name: "UI Designer",
    description: "Design polished, functional interfaces for PSTD.",
    icon: "UI",
    urgent: true
  },
  {
    id: "modeler",
    name: "Modeler",
    description: "Create characters, enemies, props and map assets.",
    icon: "3D"
  },
  {
    id: "artist",
    name: "Artist",
    description: "Create thumbnails, promotional art and in-game visuals.",
    icon: "ART"
  },
  {
    id: "vfx",
    name: "VFX Artist",
    description: "Make abilities, attacks, impacts and other effects pop.",
    icon: "FX"
  },
  {
    id: "sfx",
    name: "SFX / Sound Designer",
    description: "Create and implement sounds that fit the game.",
    icon: "SFX"
  },
  {
    id: "animator",
    name: "Animator",
    description: "Create character, enemy and ability animations.",
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
    }, 50);
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please choose a role first.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("role", selected?.name ?? selectedRole);

    if (files.length) {
      data.delete("portfolio");
      for (const file of files) data.append("portfolio", file);
    }

    setLoading(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setSubmitted(true);
      form.reset();
      setFiles([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-black text-black">
              P
            </div>
            <div>
              <p className="font-bold tracking-tight">PSTD</p>
              <p className="text-xs text-zinc-500">Development Team</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400">
            Applications open
          </span>
        </header>

        {submitted ? (
          <section className="mx-auto mt-20 max-w-2xl glass rounded-3xl p-8 text-center sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 text-2xl text-indigo-300">
              ✓
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Application submitted.
            </h1>
            <p className="mt-4 leading-7 text-zinc-400">
              Your application has been sent to the PSTD development team.
              If we&apos;re interested, we&apos;ll contact you through Discord.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
            >
              Submit another application
            </button>
          </section>
        ) : (
          <>
            <section className="pb-16 pt-20 text-center sm:pt-28">
              <div className="mx-auto mb-5 inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-300">
                We&apos;re looking for developers
              </div>
              <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-[-0.04em] sm:text-7xl">
                Join the <span className="text-indigo-300">PSTD</span> team.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                We&apos;re expanding the development team and looking for
                talented people who want to help make PSTD better.
              </p>
            </section>

            <section>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Choose a role</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Select what you want to apply for.
                  </p>
                </div>
                <span className="hidden text-xs text-zinc-600 sm:block">
                  01 / 02
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => chooseRole(role.id)}
                    className={`role-card relative rounded-2xl border p-5 text-left ${
                      selectedRole === role.id
                        ? "selected"
                        : "border-white/[0.08] bg-white/[0.025]"
                    }`}
                  >
                    {role.urgent && (
                      <span className="absolute right-4 top-4 rounded-full bg-indigo-400/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                        Most needed
                      </span>
                    )}
                    <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] text-[10px] font-black text-zinc-300">
                      {role.icon}
                    </span>
                    <h3 className="font-bold">{role.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {role.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            <section
              id="application-form"
              className="mt-20 scroll-mt-8 pb-16"
            >
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Your application</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {selected
                      ? `Applying for ${selected.name}`
                      : "Choose a role above to get started."}
                  </p>
                </div>
                <span className="hidden text-xs text-zinc-600 sm:block">
                  02 / 02
                </span>
              </div>

              <form
                onSubmit={submitApplication}
                className="glass rounded-3xl p-5 sm:p-8"
              >
                <input type="hidden" name="role" value={selected?.name ?? ""} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Discord username *
                    </span>
                    <input
                      className="field"
                      name="discord"
                      required
                      placeholder="username"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Age *
                    </span>
                    <input
                      className="field"
                      name="age"
                      required
                      type="number"
                      min="13"
                      max="100"
                      placeholder="16"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Email *
                    </span>
                    <input
                      className="field"
                      name="email"
                      required
                      type="email"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Years of experience *
                    </span>
                    <input
                      className="field"
                      name="experience"
                      required
                      placeholder="e.g. 2 years"
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Portfolio / past work
                    </span>
                    <textarea
                      className="field min-h-28 resize-y"
                      name="portfolioLinks"
                      placeholder="Paste links to your previous work, portfolio, Roblox games, etc."
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Upload work samples
                    </span>
                    <input
                      className="field cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:font-semibold file:text-black"
                      name="portfolio"
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(event) =>
                        setFiles(Array.from(event.target.files ?? []))
                      }
                    />
                    <p className="mt-2 text-xs text-zinc-600">
                      PNG, JPG or WEBP. Up to 5 images, 7 MB each.
                    </p>
                  </label>
                </div>

                <div className="mt-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Why should we choose you? *
                    </span>
                    <textarea
                      className="field min-h-36 resize-y"
                      name="why"
                      required
                      placeholder="Tell us about yourself, what you can bring to PSTD, and why you want to join."
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      Anything else?
                    </span>
                    <textarea
                      className="field min-h-28 resize-y"
                      name="anything"
                      placeholder="Availability, additional information, or anything else you want us to know."
                    />
                  </label>
                </div>

                {error && (
                  <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-zinc-600">
                    By submitting, you confirm that the information provided
                    is accurate.
                  </p>
                  <button
                    disabled={loading || !selectedRole}
                    className="rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loading ? "Submitting..." : "Submit application"}
                  </button>
                </div>
              </form>
            </section>
          </>
        )}

        <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-zinc-600">
          PSTD Development Team
        </footer>
      </div>
    </main>
  );
}