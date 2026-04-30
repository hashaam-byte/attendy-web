import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function validateBody(data: unknown): {
  ok: boolean;
  error?: string;
  value?: { name: string; email: string; use_case: string; details: string | null };
} {
  if (typeof data !== "object" || data === null)
    return { ok: false, error: "Invalid payload" };

  const d = data as Record<string, unknown>;

  if (!d.name || typeof d.name !== "string" || !d.name.trim())
    return { ok: false, error: "Name is required" };

  if (!d.email || typeof d.email !== "string" || !d.email.includes("@"))
    return { ok: false, error: "Valid email is required" };

  if (!d.use_case || typeof d.use_case !== "string" || !d.use_case.trim())
    return { ok: false, error: "Organisation / use case is required" };

  return {
    ok: true,
    value: {
      name: String(d.name).trim().slice(0, 80),
      email: String(d.email).trim().toLowerCase(),
      use_case: String(d.use_case).trim().slice(0, 120),
      details: d.details ? String(d.details).trim().slice(0, 800) : null,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateBody(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Map to custom_requests table schema
    const { error } = await supabase.from("custom_requests").insert({
      organisation_name: validation.value!.use_case,  // use_case is the org/use-case field
      contact_name: validation.value!.name,
      contact_phone: "N/A",                            // not collected in this form
      contact_email: validation.value!.email,
      use_case: validation.value!.details ?? validation.value!.use_case,
      industry_hint: "other",
      status: "new",
    });

    if (error) {
      console.error("custom-request insert error:", error.message);
      // Graceful degradation — still return success so the user isn't blocked
      return NextResponse.json({ success: true, persisted: false });
    }

    return NextResponse.json({ success: true, persisted: true });
  } catch (err) {
    console.error("custom-request route error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}