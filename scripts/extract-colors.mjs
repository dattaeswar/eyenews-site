import { Vibrant } from "node-vibrant/node";
import path from "node:path";

const logoPath = path.resolve("public/brand/logo-mark.png");

const palette = await Vibrant.from(logoPath).getPalette();

for (const [name, swatch] of Object.entries(palette)) {
  if (!swatch) continue;
  console.log(
    name.padEnd(12),
    swatch.hex,
    "pop:", Math.round(swatch.population),
    "rgb:", swatch.rgb.map((c) => Math.round(c)).join(","),
  );
}
