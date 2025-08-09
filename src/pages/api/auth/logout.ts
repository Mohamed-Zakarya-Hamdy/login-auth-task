import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const COOKIE_NAME = "ys_token";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ ok: true });
}
