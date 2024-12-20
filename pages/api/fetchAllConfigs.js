import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const dirPath = path.join(process.cwd(), "utilities/pageConfigs/formPages");
  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".json"));

  res.status(200).json(files);
}
