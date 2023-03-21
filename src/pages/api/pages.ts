import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    session: Session;
  };
}

export default function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    const session = req.body.session;

    console.log("Server: " + JSON.stringify(session));

    res.send("HELLO");
  } else {
    res.send("GET REQUEST")
  }
}