import type { NextApiRequest, NextApiResponse } from "next";
import { RiYoutubeLine } from "react-icons/ri";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    id: any | undefined;
  };
}

export default function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body.id) {
      res.end("No req.body");
    }

    console.log(typeof req.body.id);

    if (req.body.id === "rohak") {
      const pageData = [
        "Rohak's Page",
        {
          type: "YouTube",
          url: "https://youtube.com/rohak"
        },
        {
          type: "Google",
          url: "https://google.com/rohakv"
        }
      ];

      res.json(pageData);
    }

    if (req.body.id === "friend") {
      const pageData = [
        "friend's Page",
        {
          type: "Github",
          url: "https://github.com/friend"
        },
        {
          type: "Instagram",
          url: "https://instagram.com/friend"
        }
      ]

      res.json(pageData);
    }

    res.end("NO_PAGE")
    
  } else {
    res.send("WRONG METHOD");
  }
}