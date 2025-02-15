export default async function handler(req: { query: { url: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; send: (arg0: Buffer) => void; }) {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: "Missing image URL" });
    }
  
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
  
      res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
      res.setHeader("Content-Type", "image/jpeg");
      res.send(Buffer.from(buffer));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch image" });
    }
  }
  