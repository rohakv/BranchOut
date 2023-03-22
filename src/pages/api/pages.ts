/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    sessionData: any;
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
        },
        {
          name: "page_for_friend",
          pageURL: "/hirad"
        }
      ];
    }

    res.json({ pages });
  } else {
    res.send("WRONG METHOD");
  }
}