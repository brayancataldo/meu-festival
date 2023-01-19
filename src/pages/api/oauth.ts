// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const SCOPE = "user-top-read&=user-read-email";
  res.status(200).json({
    link: `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=${SCOPE}&response_type=code`,
  });
}
