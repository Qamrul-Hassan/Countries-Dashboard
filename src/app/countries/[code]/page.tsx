import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { getReligionDataByCountry } from "@/lib/religion-data";
import type { Country } from "@/types/country";

type PageProps = {
  params: Promise<{
    code: string;
  }>;
};

async function getCountry(code: string): Promise<Country> {
  try {
    const res = await api.get<Country | Country[]>(
      `/alpha/${code}?fields=name,flag,cca3,region,subregion,population,area,capital,flags,continents,timezones,borders,tld,fifa,independent,unMember,startOfWeek,landlocked,gini,altSpellings,idd,postalCode,latlng,capitalInfo,car,languages,religion,religions,currencies,maps,coatOfArms,demonyms`
    );
    const country = Array.isArray(res.data) ? res.data[0] : res.data;

    if (!country?.name?.common || !country?.flags?.svg) {
      notFound();
    }

    if (!country.religions && !country.religion) {
      country.religions = await getReligionDataByCountry(
        country.cca3,
        country.region
      );
    }

    return country;
  } catch {
    notFound();
  }
}

function formatArea(area?: number) {
  return area ? `${area.toLocaleString()} km^2` : "N/A";
}

function formatCoordinates(coords?: number[]) {
  if (!coords || coords.length < 2) {
    return "N/A";
  }

  return `${coords[0].toFixed(2)}, ${coords[1].toFixed(2)}`;
}

function formatList(values?: string[]) {
  if (!values || values.length === 0) {
    return "N/A";
  }

  return values.join(", ");
}

function formatLanguages(languages?: Record<string, string>) {
  const values = languages ? Object.values(languages) : [];
  return values.length > 0 ? values.join(", ") : "N/A";
}

function formatReligions(
  religions?: Record<string, number | string>,
  religion?: string
) {
  if (religions && Object.keys(religions).length > 0) {
    const sortedEntries = Object.entries(religions).sort((a, b) => {
      const aNumber = typeof a[1] === "number" ? a[1] : Number(a[1]);
      const bNumber = typeof b[1] === "number" ? b[1] : Number(b[1]);

      const aValid = Number.isFinite(aNumber);
      const bValid = Number.isFinite(bNumber);

      if (aValid && bValid) {
        return bNumber - aNumber;
      }

      if (aValid) {
        return -1;
      }

      if (bValid) {
        return 1;
      }

      return a[0].localeCompare(b[0]);
    });

    const values = sortedEntries.map(([name, rawValue]) => {
      const numericValue =
        typeof rawValue === "number" ? rawValue : Number(rawValue);
      if (!Number.isFinite(numericValue)) {
        return `${name} (${rawValue})`;
      }

      if (numericValue <= 1) {
        return `${name} (${(numericValue * 100).toFixed(1)}%)`;
      }

      if (numericValue <= 100) {
        return `${name} (${numericValue.toFixed(1)}%)`;
      }

      return `${name} (${numericValue.toLocaleString()})`;
    });

    return values.join(", ");
  }

  return religion || "N/A";
}

function formatCurrencies(
  currencies?: Record<string, { name: string; symbol?: string }>
) {
  if (!currencies) {
    return "N/A";
  }

  const values = Object.values(currencies).map((currency) => {
    if (!currency.symbol) {
      return currency.name;
    }

    return `${currency.name} (${currency.symbol})`;
  });

  return values.length > 0 ? values.join(", ") : "N/A";
}

function getOpenStreetMapEmbedUrl(latlng?: number[]) {
  if (!latlng || latlng.length < 2) {
    return null;
  }

  const lat = latlng[0];
  const lon = latlng[1];
  const delta = 6;

  const minLon = Math.max(-180, lon - delta);
  const minLat = Math.max(-90, lat - delta);
  const maxLon = Math.min(180, lon + delta);
  const maxLat = Math.min(90, lat + delta);

  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lon}`;
}

function formatNativeNames(
  nativeName?: Record<string, { official: string; common: string }>
) {
  if (!nativeName) {
    return "N/A";
  }

  const names = Object.values(nativeName).map((item) => item.common);
  if (names.length === 0) {
    return "N/A";
  }

  return Array.from(new Set(names)).join(", ");
}

function formatCallingCode(idd?: { root?: string; suffixes?: string[] }) {
  if (!idd?.root) {
    return "N/A";
  }

  const suffix = idd.suffixes?.[0];
  return suffix ? `${idd.root}${suffix}` : idd.root;
}

function formatGini(gini?: Record<string, number>) {
  if (!gini) {
    return "N/A";
  }

  const latestYear = Object.keys(gini)
    .map((year) => Number(year))
    .filter((year) => Number.isFinite(year))
    .sort((a, b) => b - a)[0];

  if (!latestYear) {
    return "N/A";
  }

  const value = gini[String(latestYear)];
  return value ? `${value} (${latestYear})` : "N/A";
}

function formatPopulationDensity(population: number, area?: number) {
  if (!area || area <= 0) {
    return "N/A";
  }

  return `${(population / area).toFixed(1)} per km^2`;
}

export default async function CountryDetailsPage({ params }: PageProps) {
  const { code } = await params;
  const country = await getCountry(code);

  const mapEmbedUrl = getOpenStreetMapEmbedUrl(country.latlng);
  const coatOfArmsSrc = country.coatOfArms?.svg || country.coatOfArms?.png;

  return (
    <section className="space-y-6">
      <Link href="/" className="btn-accent inline-flex items-center px-3 py-2 text-xs">
        Back to countries
      </Link>

      <article className="panel overflow-hidden">
        <Image
          src={country.flags.svg}
          alt={country.flags.alt || `${country.name.common} flag`}
          width={1200}
          height={640}
          className="h-56 w-full object-cover sm:h-72"
          unoptimized
        />

        <div className="space-y-6 p-5 sm:p-6">
          <header className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--muted-text)]">
              {country.subregion || country.region}
            </p>
            <h1 className="text-3xl font-black tracking-tight text-[#662416] dark:text-[#e5792a] sm:text-4xl">
              {country.name.common}
            </h1>
            <p className="text-sm text-[color:var(--muted-text)]">{country.name.official}</p>
          </header>

          <section aria-labelledby="core-facts" className="space-y-3">
            <h2 id="core-facts" className="text-sm font-black uppercase tracking-[0.1em] text-[color:var(--text-strong)]">
              Core facts
            </h2>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="info-key">Capital</dt>
                <dd className="info-value">{country.capital?.[0] ?? "N/A"}</dd>
              </div>
              <div>
                <dt className="info-key">Population</dt>
                <dd className="info-value">{country.population.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="info-key">Area</dt>
                <dd className="info-value">{formatArea(country.area)}</dd>
              </div>
              <div>
                <dt className="info-key">Country code</dt>
                <dd className="info-value">{country.cca3}</dd>
              </div>
              <div>
                <dt className="info-key">Flag emoji</dt>
                <dd className="info-value">{country.flag || "N/A"}</dd>
              </div>
              <div>
                <dt className="info-key">UN member</dt>
                <dd className="info-value">{country.unMember ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt className="info-key">Independent</dt>
                <dd className="info-value">{country.independent ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt className="info-key">Population density</dt>
                <dd className="info-value">
                  {formatPopulationDensity(country.population, country.area)}
                </dd>
              </div>
              <div>
                <dt className="info-key">Calling code</dt>
                <dd className="info-value">{formatCallingCode(country.idd)}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="culture-society" className="space-y-3">
            <h2 id="culture-society" className="text-sm font-black uppercase tracking-[0.1em] text-[color:var(--text-strong)]">
              Culture and society
            </h2>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="info-key">Languages</dt>
                <dd className="info-value">{formatLanguages(country.languages)}</dd>
              </div>
              <div>
                <dt className="info-key">Religions</dt>
                <dd className="info-value">
                  {formatReligions(country.religions, country.religion)}
                </dd>
              </div>
              <div>
                <dt className="info-key">Native names</dt>
                <dd className="info-value">{formatNativeNames(country.name.nativeName)}</dd>
              </div>
              <div>
                <dt className="info-key">Demonyms (EN)</dt>
                <dd className="info-value">
                  {country.demonyms?.eng ? `${country.demonyms.eng.m} / ${country.demonyms.eng.f}` : "N/A"}
                </dd>
              </div>
              <div>
                <dt className="info-key">Start of week</dt>
                <dd className="info-value">{country.startOfWeek || "N/A"}</dd>
              </div>
              <div>
                <dt className="info-key">Driving side</dt>
                <dd className="info-value">{country.car?.side || "N/A"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="info-key">Timezones</dt>
                <dd className="info-value">{formatList(country.timezones)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="info-key">Alternative spellings</dt>
                <dd className="info-value">{formatList(country.altSpellings)}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="geo-map" className="space-y-3">
            <h2 id="geo-map" className="text-sm font-black uppercase tracking-[0.1em] text-[color:var(--text-strong)]">
              Geography and map
            </h2>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="info-key">Continents</dt>
                <dd className="info-value">{formatList(country.continents)}</dd>
              </div>
              <div>
                <dt className="info-key">Coordinates</dt>
                <dd className="info-value">{formatCoordinates(country.latlng)}</dd>
              </div>
              <div>
                <dt className="info-key">Landlocked</dt>
                <dd className="info-value">{country.landlocked ? "Yes" : "No"}</dd>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <dt className="info-key">Borders</dt>
                <dd className="info-value">{formatList(country.borders)}</dd>
              </div>
              <div>
                <dt className="info-key">Border countries count</dt>
                <dd className="info-value">{country.borders?.length ?? 0}</dd>
              </div>
            </dl>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-xl border border-[color:var(--border)]">
                <iframe
                  title={`${country.name.common} map`}
                  src={mapEmbedUrl}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {country.maps?.googleMaps ? (
                <a
                  href={country.maps.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex px-3 py-2 text-xs"
                >
                  Open in Google Maps
                </a>
              ) : null}
              {country.maps?.openStreetMaps ? (
                <a
                  href={country.maps.openStreetMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent inline-flex px-3 py-2 text-xs"
                >
                  Open in OpenStreetMap
                </a>
              ) : null}
            </div>
          </section>

          <section aria-labelledby="economy-identity" className="space-y-3">
            <h2 id="economy-identity" className="text-sm font-black uppercase tracking-[0.1em] text-[color:var(--text-strong)]">
              Economy and identity
            </h2>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="info-key">Currencies</dt>
                <dd className="info-value">{formatCurrencies(country.currencies)}</dd>
              </div>
              <div>
                <dt className="info-key">Top-level domain</dt>
                <dd className="info-value">{formatList(country.tld)}</dd>
              </div>
              <div>
                <dt className="info-key">FIFA code</dt>
                <dd className="info-value">{country.fifa || "N/A"}</dd>
              </div>
              <div>
                <dt className="info-key">Capital coordinates</dt>
                <dd className="info-value">{formatCoordinates(country.capitalInfo?.latlng)}</dd>
              </div>
              <div>
                <dt className="info-key">Postal code format</dt>
                <dd className="info-value">{country.postalCode?.format || "N/A"}</dd>
              </div>
              <div>
                <dt className="info-key">Gini index</dt>
                <dd className="info-value">{formatGini(country.gini)}</dd>
              </div>
              {coatOfArmsSrc ? (
                <div className="sm:col-span-2 lg:col-span-2">
                  <dt className="info-key">Coat of arms</dt>
                  <dd className="mt-2">
                    <Image
                      src={coatOfArmsSrc}
                      alt={`${country.name.common} coat of arms`}
                      width={160}
                      height={160}
                      className="h-20 w-auto"
                      unoptimized
                    />
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>
        </div>
      </article>
    </section>
  );
}
