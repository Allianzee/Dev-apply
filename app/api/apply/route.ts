import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 7 * 1024 * 1024;
const MAX_FILES = 5;

function clean(value: FormDataEntryValue | null, max = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;

  if (!webhook) {
    return NextResponse.json(
      { error: "Application system is not configured yet." },
      { status: 500 }
    );
  }

  try {
    const form = await request.formData();

    const role = clean(form.get("role"), 100);
    const discord = clean(form.get("discord"), 100);
    const age = clean(form.get("age"), 10);
    const email = clean(form.get("email"), 200);
    const experience = clean(form.get("experience"), 100);
    const portfolioLinks = clean(form.get("portfolioLinks"), 3000);
    const why = clean(form.get("why"), 4000);
    const anything = clean(form.get("anything"), 3000);

    if (!role || !discord || !age || !email || !experience || !why) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const ageNumber = Number(age);
    if (!Number.isInteger(ageNumber) || ageNumber < 13 || ageNumber > 100) {
      return NextResponse.json(
        { error: "Please enter a valid age." },
        { status: 400 }
      );
    }

    const files = form
      .getAll("portfolio")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_FILES} images.` },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        return NextResponse.json(
          { error: "Only PNG, JPG and WEBP files are allowed." },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Each uploaded image must be 7 MB or smaller." },
          { status: 400 }
        );
      }
    }

    const embed = {
      title: "New PSTD Developer Application",
      color: 0x818cf8,
      fields: [
        { name: "Role", value: role, inline: true },
        { name: "Discord", value: discord, inline: true },
        { name: "Age", value: age, inline: true },
        { name: "Email", value: email, inline: true },
        { name: "Experience", value: experience, inline: true },
        {
          name: "Portfolio Links",
          value: portfolioLinks || "None provided",
          inline: false
        },
        {
          name: "Why should we choose you?",
          value: why,
          inline: false
        },
        {
          name: "Anything else?",
          value: anything || "None provided",
          inline: false
        }
      ],
      footer: {
        text: "PSTD Developer Applications"
      },
      timestamp: new Date().toISOString()
    };

    const payload = new FormData();
    payload.append(
      "payload_json",
      JSON.stringify({
        username: "PSTD Applications",
        embeds: [embed]
      })
    );

    for (const [index, file] of files.entries()) {
      payload.append(`files[${index}]`, file, file.name);
    }

    const discordResponse = await fetch(webhook, {
      method: "POST",
      body: payload
    });

    if (!discordResponse.ok) {
      console.error(
        "Discord webhook failed:",
        discordResponse.status,
        await discordResponse.text()
      );

      return NextResponse.json(
        { error: "The application could not be sent. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application submission error:", error);

    return NextResponse.json(
      { error: "Something went wrong while submitting your application." },
      { status: 500 }
    );
  }
    }
