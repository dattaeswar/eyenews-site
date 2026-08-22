// Generates an 11-step (50-950) Tailwind color scale from extracted brand colors
// and verifies WCAG AA contrast for the pairings the site actually uses.

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}
function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r, g, b].map((v) => Math.round(v * 255));
}
function rgbToHex([r, g, b]) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}
function relLuminance([r, g, b]) {
  const c = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(hexA, hexB) {
  const La = relLuminance(hexToRgb(hexA));
  const Lb = relLuminance(hexToRgb(hexB));
  const [lighter, darker] = La > Lb ? [La, Lb] : [Lb, La];
  return (lighter + 0.05) / (darker + 0.05);
}

// Standard Tailwind-shaped lightness curve (steeper at the light end).
const STEPS = {
  50: 97, 100: 94, 200: 87, 300: 78, 400: 65,
  500: 52, 600: 42, 700: 33, 800: 25, 900: 18, 950: 11,
};

function buildScale(hex, { satBoost = 1 } = {}) {
  const [h, s] = rgbToHsl(hexToRgb(hex));
  const sat = Math.min(100, s * satBoost);
  const scale = {};
  for (const [step, l] of Object.entries(STEPS)) {
    scale[step] = rgbToHex(hslToRgb(h, sat, l));
  }
  return scale;
}

const EXTRACTED = {
  navy: "#0f2648",     // dominant wordmark / ring color (node-vibrant DarkVibrant ~ #041c45)
  crimson: "#b90c12",  // "NEWS" wordmark + tagline bar
  saffron: "#e4781e",  // eye icon top arc
  green: "#358e62",    // eye icon bottom arc
};

const primary = buildScale(EXTRACTED.navy);
const accent = buildScale(EXTRACTED.crimson, { satBoost: 1.05 });
// Neutral scale: same hue family as the navy (cool undertone), heavily desaturated.
const [navyH] = rgbToHsl(hexToRgb(EXTRACTED.navy));
const neutral = {};
for (const [step, l] of Object.entries(STEPS)) {
  neutral[step] = rgbToHex(hslToRgb(navyH, 12, l));
}

console.log("PRIMARY (navy)", primary);
console.log("ACCENT (crimson)", accent);
console.log("NEUTRAL (cool gray)", neutral);
console.log("\nContrast checks (WCAG AA body text needs >= 4.5:1, large/UI text >= 3:1):");
console.log("primary-700 on white:", contrast(primary[700], "#ffffff").toFixed(2));
console.log("primary-800 on white:", contrast(primary[800], "#ffffff").toFixed(2));
console.log("primary-900 on white:", contrast(primary[900], "#ffffff").toFixed(2));
console.log("white on primary-600:", contrast("#ffffff", primary[600]).toFixed(2));
console.log("white on primary-700:", contrast("#ffffff", primary[700]).toFixed(2));
console.log("neutral-600 on white:", contrast(neutral[600], "#ffffff").toFixed(2));
console.log("neutral-700 on white:", contrast(neutral[700], "#ffffff").toFixed(2));
console.log("accent-600 on white:", contrast(accent[600], "#ffffff").toFixed(2));
console.log("accent-700 on white:", contrast(accent[700], "#ffffff").toFixed(2));
console.log("white on accent-600:", contrast("#ffffff", accent[600]).toFixed(2));
console.log("white on accent-700:", contrast("#ffffff", accent[700]).toFixed(2));
