import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    sessionData: Session;
  };
}

export default function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    let pages;

    const session = req.body.sessionData;

    if (session["id"] === "hello") {
      pages = [
        {
          name: "first_page",
          pageURL: "/rohak"
        }
      ];
    }

    res.json({ pages });
  } else {
    res.send("WRONG METHOD");
  }
}