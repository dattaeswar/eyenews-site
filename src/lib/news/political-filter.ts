// Plain keyword heuristic, not a trained classifier — deliberately simple, transparent and
// easy for a non-engineer to extend later (just add a string to one of the arrays below).
// It will misclassify some edge cases in either direction; that's an accepted trade-off given
// there's no political-news-specific API available.

const POLITICAL_KEYWORDS = [
  // Indian institutions & roles
  "parliament", "lok sabha", "rajya sabha", "assembly", "legislative council", "mla", "mlc",
  "mp ", "rajya sabha mp", "chief minister", " cm ", "prime minister", " pm modi", "governor",
  "cabinet", "ministry", "minister", "election commission", "lieutenant governor", "vidhan sabha",
  "no-confidence", "ordinance", "bill passed", "budget session", "assembly session", "by-poll",
  "bypoll", "civic polls", "panchayat election", "municipal election",
  // Parties
  "bjp", "congress party", "indian national congress", " inc ", "aap", "ysrcp", "tdp", "brs",
  "trs", "bharat rashtra samithi", "telangana rashtra samithi", "jana sena", "dmk", "aiadmk",
  "shiv sena", "ncp", "cpi(m)", "cpi(m", "cpi ", "rjd", "jd(u)", "samajwadi party", "bsp",
  "akali dal", "trinamool", "aimim",
  // Elections & campaigns generally
  "election", "poll", "polling", "voter", "electorate", "constituency", "campaign trail",
  "manifesto", "referendum", "exit poll", "opinion poll", "coalition", "alliance government",
  "political party", "politician", "political leader", "opposition leader", "ruling party",
  // International politics / diplomacy
  "geopolit", "diplomat", "diplomatic", "sanctions", "summit", "treaty", "coup", "regime",
  "white house", "kremlin", "downing street", "united nations", "security council", "nato",
  "european union", "senate", "congressional", "president ", "presidential", "administration",
  "foreign policy", "impeachment", "state department", "parliament dissolved",
];

const AP_KEYWORDS = [
  "andhra pradesh", "amaravati", "vijayawada", "visakhapatnam", "vizag", "tirupati", "guntur",
  "nellore", "kurnool", "kadapa", "anantapur", "chandrababu naidu", "n. chandrababu naidu",
  "ysrcp", "y.s. jagan", "jagan mohan reddy", "jagan reddy", "tdp", "pawan kalyan", "jana sena",
  "ys sharmila",
];

const TELANGANA_KEYWORDS = [
  "telangana", "hyderabad", "warangal", "karimnagar", "khammam", "nizamabad", "brs",
  "bharat rashtra samithi", "telangana rashtra samithi", "trs", "k. chandrashekar rao",
  "kcr", "revanth reddy", "k.t. rama rao", "ktr", "harish rao",
];

function normalize(text: string): string {
  return ` ${text.toLowerCase()} `;
}

export function isPolitical(text: string): boolean {
  const t = normalize(text);
  return POLITICAL_KEYWORDS.some((k) => t.includes(k));
}

export function matchesAndhraPradesh(text: string): boolean {
  const t = normalize(text);
  return AP_KEYWORDS.some((k) => t.includes(k));
}

export function matchesTelangana(text: string): boolean {
  const t = normalize(text);
  return TELANGANA_KEYWORDS.some((k) => t.includes(k));
}
