import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

// lesson* ディレクトリを検索してエントリポイントとして追加
const lessonEntries = {};
const rootDir = path.resolve(__dirname);

fs.readdirSync(rootDir).forEach((dir) => {
  const fullDir = path.join(rootDir, dir);
  if (dir.startsWith("lesson") && fs.statSync(fullDir).isDirectory()) {
    lessonEntries[dir] = path.join(fullDir, "index.html");
  }
});

export default defineConfig({
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: {
        ...lessonEntries,
        "vite-project": "./vite-project/index.html",
      },
    },
  },
});
