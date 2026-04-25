import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, use_case, details } = body

    if (!name || !email || !use_case) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, use_case' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      // If Supabase is not configured, still return success (graceful degradation)
      console.warn('Supabase not configured — custom request not persisted:', { name, email, use_case })
      return NextResponse.json({ success: true, persisted: false })
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/custom_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        use_case: use_case.trim(),
        details: details?.trim() || null,
        status: 'new',
        source: 'attendy-web',
        created_at: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Supabase insert error:', errorText)
      // Still return success to the user — don't block UX over DB errors
      return NextResponse.json({ success: true, persisted: false })
    }

    return NextResponse.json({ success: true, persisted: true })
  } catch (err) {
    console.error('Custom request API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}