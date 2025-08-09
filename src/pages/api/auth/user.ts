import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { parse } from "cookie";

const USER_URL =
  process.env.USER_INFO_URL ||
  "https://api-yeshtery.dev.meetusvr.com/v1/user/info";
const COOKIE_NAME = "ys_token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.headers.cookie;
  const parsed = cookies ? parse(cookies) : {};
  const token = parsed[COOKIE_NAME];

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const resp = await axios.get(USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json(resp.data);
  } catch (err: any) {
    const status = err.response?.status || 500;
    const data = err.response?.data || {
      message: err.message || "User fetch error",
    };
    res.status(status).json(data);
  }
}
