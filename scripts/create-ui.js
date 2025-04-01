import fs from "node:fs";
import path from "node:path";

const filesToCheck = [
  "app/ui/atoms/index.tsx",
  "app/ui/molecules/index.tsx",
  "app/ui/organisms/index.tsx",
  "app/hooks/index.tsx",
  "app/features/index.tsx",
];

for (const filePath of filesToCheck) {
  const fullPath = path.resolve(path.dirname(""), filePath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, "");
    console.log(`Created file: ${fullPath}`);
  }
}
