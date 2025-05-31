import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const SCOPE = "user-top-read";

  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.set("client_id", process.env.SPOTIFY_CLIENT_ID || "");
  url.searchParams.set("redirect_uri", process.env.SPOTIFY_REDIRECT_URI || "");
  url.searchParams.set("scope", SCOPE);
  url.searchParams.set("response_type", "code");

  return NextResponse.json({ link: url.toString() });
}
