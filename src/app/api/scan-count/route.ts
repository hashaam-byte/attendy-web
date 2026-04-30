import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// This route uses a public anon client — RLS allows anon COUNT on attendance_logs
// Cache for 1 hour via Next.js revalidation
export const revalidate = 3600;

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { count, error } = await supabase
      .from("attendance_logs")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("scan-count error:", error.message);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json(
      { count: count ?? 0 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (err) {
    console.error("scan-count unexpected:", err);
    return NextResponse.json({ count: 0 });
  }
}