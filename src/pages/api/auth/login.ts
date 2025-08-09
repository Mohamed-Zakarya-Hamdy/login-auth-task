import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";

const TOKEN_URL =
  process.env.API_TOKEN_URL ||
  "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token";
const COOKIE_NAME = "ys_token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing credentials" });

  try {
    const resp = await axios.post(
      TOKEN_URL,
      { email, password, isEmployee: true },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const token = resp.data?.token;
    if (!token)
      return res
        .status(500)
        .json({ message: "Token not returned from auth server" });

    const cookie = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, 
    });

    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ ok: true });
  } catch (err: any) {
    const status = err.response?.status || 500;
    const data = err.response?.data || { message: err.message || "Auth error" };
    res.status(status).json(data);
  }
}
