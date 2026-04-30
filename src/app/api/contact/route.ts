import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Inline zod-like validation without the dep — using manual check
// (avoids adding zod to package.json for one endpoint)
function validateForm(data: unknown): {
  ok: boolean;
  error?: string;
  value?: Record<string, string>;
} {
  if (typeof data !== "object" || data === null) {
    return { ok: false, error: "Invalid payload" };
  }
  const d = data as Record<string, unknown>;

  const required: [string, string][] = [
    ["organisation_name", "Organisation name is required"],
    ["contact_name", "Your name is required"],
    ["contact_phone", "Phone number is required"],
    ["use_case", "Please describe your needs"],
  ];

  for (const [field, msg] of required) {
    if (!d[field] || typeof d[field] !== "string" || !String(d[field]).trim()) {
      return { ok: false, error: msg };
    }
  }

  // Phone: must be at least 10 digits
  const phone = String(d.contact_phone).replace(/\D/g, "");
  if (phone.length < 10) {
    return { ok: false, error: "Enter a valid Nigerian phone number" };
  }

  return {
    ok: true,
    value: {
      organisation_name: String(d.organisation_name).trim(),
      contact_name: String(d.contact_name).trim(),
      contact_phone: phone,
      contact_email: String(d.contact_email ?? "").trim(),
      industry_hint: String(d.industry_hint ?? "").trim(),
      use_case: String(d.use_case).trim(),
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateForm(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("custom_requests").insert({
      organisation_name: validation.value!.organisation_name,
      contact_name: validation.value!.contact_name,
      contact_phone: validation.value!.contact_phone,
      contact_email: validation.value!.contact_email || null,
      industry_hint: validation.value!.industry_hint || null,
      use_case: validation.value!.use_case,
      status: "new",
    });

    if (error) {
      console.error("contact insert error:", error.message);
      return NextResponse.json(
        { error: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}