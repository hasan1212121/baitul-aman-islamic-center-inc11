import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Next.js Edge friendly in-memory storage. Note setting resets on cold boot unless wired to Vercel KV or real db.
let configOptions = {
  notice: [
    { text: "Welcome to Baitul Aman Islamic Center Inc.", textAR: "مرحبًا بكم في مركز بيت الأمان الإسلامي.", textBN: "বায়তুল আমান ইসলামিক সেন্টারে স্বাগতম।", expiresAt: "" },
    { text: "Please remember to silence your devices during prayer.", textAR: "يرجى تذكر كتم صوت أجهزتكم أثناء الصلاة.", textBN: "দয়া করে নামাজের সময় আপনার ডিভাইসগুলি নীরব রাখতে মনে রাখবেন।", expiresAt: "" }
  ],
  prayerTimes: {
    Fajr: "5:45 AM",
    Dhuhr: "1:30 PM",
    Asr: "6:00 PM",
    Maghrib: "7:35 PM",
    Isha: "9:15 PM",
    Jummah: "1:30 PM"
  }
};

export async function GET() {
  return NextResponse.json(configOptions, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (body.notice !== undefined) configOptions.notice = body.notice;
    if (body.prayerTimes !== undefined) configOptions.prayerTimes = body.prayerTimes;
    return NextResponse.json({ success: true, data: configOptions });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to parse data" }, { status: 400 });
  }
}
