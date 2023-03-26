import type { NextApiRequest, NextApiResponse } from "next";

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

    res.end("id is not rohak")
    
  } else {
    res.send("WRONG METHOD");
  }
}