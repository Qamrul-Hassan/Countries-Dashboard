type ReligionBreakdown = Record<string, number>;

const REMOTE_RELIGION_DATA_URL =
  "https://gist.githubusercontent.com/edoardottt/24cad484796d2cf6167e45595bcf2f50/raw/b5885db4011ecfbf72f4fdb37f6ea9fe39ecf9a2/ReligionByCountry2020.csv";

const CATEGORY_NAMES = [
  "Christianity",
  "Islam",
  "Unaffiliated",
  "Hinduism",
  "Buddhism",
  "Folk religions",
  "Other religions",
  "Judaism",
] as const;

const localFallbackReligionDataByCca3: Record<string, ReligionBreakdown> = {
  ARG: { Christianity: 88.0, Unaffiliated: 10.0, "Other religions": 2.0 },
  AUS: { Christianity: 44.0, Unaffiliated: 39.0, Islam: 3.0, Hinduism: 2.0, Buddhism: 2.0, "Other religions": 10.0 },
  BGD: { Islam: 91.0, Hinduism: 8.0, Buddhism: 0.6, Christianity: 0.3, "Other religions": 0.1 },
  BRA: { Christianity: 89.0, Unaffiliated: 8.0, "Other religions": 3.0 },
  CAN: { Christianity: 53.0, Unaffiliated: 35.0, Islam: 5.0, Hinduism: 3.0, Buddhism: 1.0, "Other religions": 3.0 },
  CHN: { Unaffiliated: 52.0, "Folk religions": 21.0, Buddhism: 18.0, Christianity: 5.0, Islam: 2.0, "Other religions": 2.0 },
  DEU: { Christianity: 51.0, Unaffiliated: 40.0, Islam: 6.0, "Other religions": 3.0 },
  EGY: { Islam: 90.0, Christianity: 10.0 },
  ESP: { Christianity: 69.0, Unaffiliated: 28.0, Islam: 2.0, "Other religions": 1.0 },
  ETH: { Christianity: 62.0, Islam: 35.0, "Folk religions": 2.0, "Other religions": 1.0 },
  FRA: { Christianity: 47.0, Unaffiliated: 40.0, Islam: 8.0, Buddhism: 2.0, Judaism: 1.0, "Other religions": 2.0 },
  GBR: { Christianity: 46.0, Unaffiliated: 37.0, Islam: 6.0, Hinduism: 2.0, Sikhism: 1.0, Buddhism: 1.0, "Other religions": 7.0 },
  IDN: { Islam: 87.0, Christianity: 10.0, Hinduism: 2.0, Buddhism: 1.0 },
  IND: { Hinduism: 79.8, Islam: 14.2, Christianity: 2.3, Buddhism: 0.7, "Other religions": 3.0 },
  IRN: { Islam: 99.0, "Other religions": 1.0 },
  IRQ: { Islam: 97.0, Christianity: 1.0, "Other religions": 2.0 },
  ITA: { Christianity: 79.0, Unaffiliated: 15.0, Islam: 4.0, "Other religions": 2.0 },
  JPN: { "Folk religions": 48.0, Buddhism: 46.0, Christianity: 1.0, "Other religions": 5.0 },
  MEX: { Christianity: 89.0, Unaffiliated: 8.0, "Other religions": 3.0 },
  NGA: { Islam: 53.0, Christianity: 46.0, "Folk religions": 1.0 },
  PAK: { Islam: 96.5, Hinduism: 2.1, Christianity: 1.3, "Other religions": 0.1 },
  RUS: { Christianity: 71.0, Unaffiliated: 15.0, Islam: 10.0, "Other religions": 4.0 },
  SAU: { Islam: 93.0, Christianity: 4.0, Hinduism: 2.0, "Other religions": 1.0 },
  TUR: { Islam: 99.0, "Other religions": 1.0 },
  USA: { Christianity: 63.0, Unaffiliated: 29.0, Judaism: 2.0, Islam: 1.0, Buddhism: 1.0, Hinduism: 1.0, "Other religions": 3.0 },
  ZAF: { Christianity: 79.0, Unaffiliated: 15.0, Islam: 2.0, Hinduism: 1.0, "Folk religions": 1.0, "Other religions": 2.0 },
};

const regionalFallbackReligionData: Record<string, ReligionBreakdown> = {
  Africa: { Christianity: 49.0, Islam: 42.0, "Folk religions": 6.0, Unaffiliated: 2.0, "Other religions": 1.0 },
  Americas: { Christianity: 76.0, Unaffiliated: 19.0, Islam: 1.0, Judaism: 1.0, "Other religions": 3.0 },
  Asia: { Islam: 27.0, Hinduism: 25.0, Unaffiliated: 21.0, Buddhism: 12.0, Christianity: 7.0, "Folk religions": 6.0, "Other religions": 2.0 },
  Europe: { Christianity: 74.0, Unaffiliated: 19.0, Islam: 4.0, "Other religions": 3.0 },
  Oceania: { Christianity: 67.0, Unaffiliated: 24.0, Hinduism: 2.0, Buddhism: 2.0, Islam: 1.0, "Other religions": 4.0 },
};

let remoteReligionDataPromise: Promise<Record<string, ReligionBreakdown>> | null =
  null;

function parseIntLike(value: string) {
  const normalized = value.replace(/,/g, "").replace(/"/g, "").trim();
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function splitCsvLine(line: string) {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current);
  return result.map((entry) => entry.trim());
}

function parseReligionData(rawText: string) {
  const lines = rawText.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    return {};
  }

  const header = splitCsvLine(lines[0]).map((h) => h.toLowerCase());
  const cca3Index =
    header.findIndex((h) => h.includes("iso3")) >= 0
      ? header.findIndex((h) => h.includes("iso3"))
      : header.findIndex((h) => h.includes("code"));
  const allReligionsIndex = header.findIndex((h) => h.includes("all religions"));

  const categoryIndexes = CATEGORY_NAMES.map((category) =>
    header.findIndex((h) => h === category.toLowerCase())
  );

  const parsed: Record<string, ReligionBreakdown> = {};

  for (const line of lines.slice(1)) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    const cells = splitCsvLine(trimmed);
    if (cells.length < 12) {
      continue;
    }

    const cca3 =
      cca3Index >= 0 && cells[cca3Index]
        ? cells[cca3Index].toUpperCase()
        : cells[cells.length - 1].toUpperCase();
    if (!/^[A-Z]{3}$/.test(cca3)) {
      continue;
    }

    const allReligions =
      allReligionsIndex >= 0
        ? parseIntLike(cells[allReligionsIndex] || "")
        : parseIntLike(cells[cells.length - 3] || "");
    if (allReligions <= 0) {
      continue;
    }

    const categoryCounts =
      categoryIndexes.every((index) => index >= 0)
        ? categoryIndexes.map((index) => parseIntLike(cells[index] || ""))
        : cells.slice(cells.length - 11, cells.length - 3).map(parseIntLike);

    if (categoryCounts.length !== CATEGORY_NAMES.length) {
      continue;
    }

    const breakdown: ReligionBreakdown = {};

    for (let i = 0; i < CATEGORY_NAMES.length; i += 1) {
      const count = categoryCounts[i];
      if (count <= 0) {
        continue;
      }

      const percent = Number(((count / allReligions) * 100).toFixed(1));
      if (percent > 0) {
        breakdown[CATEGORY_NAMES[i]] = percent;
      }
    }

    if (Object.keys(breakdown).length > 0) {
      parsed[cca3] = breakdown;
    }
  }

  return parsed;
}

async function loadRemoteReligionData() {
  if (!remoteReligionDataPromise) {
    remoteReligionDataPromise = fetch(REMOTE_RELIGION_DATA_URL, {
      next: { revalidate: 86400 },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load religion data: ${response.status}`);
        }

        return response.text();
      })
      .then(parseReligionData)
      .catch(() => ({}));
  }

  return remoteReligionDataPromise;
}

export async function getReligionDataByCountry(
  cca3?: string,
  region?: string
): Promise<ReligionBreakdown | undefined> {
  const normalized = cca3?.toUpperCase();
  const remoteData = await loadRemoteReligionData();

  if (normalized) {
    const byCountry =
      remoteData[normalized] || localFallbackReligionDataByCca3[normalized];
    if (byCountry) {
      return byCountry;
    }
  }

  if (region) {
    return regionalFallbackReligionData[region];
  }

  return undefined;
}
