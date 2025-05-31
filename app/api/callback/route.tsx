import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!state) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const params = new URLSearchParams();
  params.append("code", code || "");
  params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI || "");
  params.append("grant_type", "authorization_code");

  const authHeader = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return NextResponse.json({
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
      refresh_token: response.data.refresh_token,
    });
  } catch (error) {
    console.error("Spotify token error:", error);
    return new NextResponse("Authentication failed", { status: 500 });
  }
}
