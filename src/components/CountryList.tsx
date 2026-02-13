"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Country } from "@/types/country";

function getPrimaryCurrency(
  currencies?: Record<string, { name: string; symbol?: string }>
) {
  if (!currencies) {
    return "N/A";
  }

  const firstCurrency = Object.values(currencies)[0];
  if (!firstCurrency) {
    return "N/A";
  }

  return firstCurrency.symbol
    ? `${firstCurrency.name} (${firstCurrency.symbol})`
    : firstCurrency.name;
}

export default function CountryList({
  countries,
}: {
  countries: Country[];
}) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [sort, setSort] = useState("none");

  const resetFilters = () => {
    setSearch("");
    setRegion("all");
    setSort("none");
  };

  const regions = useMemo(
    () =>
      Array.from(
        new Set(countries.map((country) => country.region).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b)),
    [countries]
  );

  const filteredCountries = useMemo(() => {
    const result = countries.filter((country) => {
      const matchSearch = country.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchRegion = region === "all" || country.region === region;
      return matchSearch && matchRegion;
    });

    switch (sort) {
      case "pop-desc":
        result.sort((a, b) => b.population - a.population);
        break;
      case "pop-asc":
        result.sort((a, b) => a.population - b.population);
        break;
      case "area-desc":
        result.sort((a, b) => (b.area ?? 0) - (a.area ?? 0));
        break;
      case "area-asc":
        result.sort((a, b) => (a.area ?? 0) - (b.area ?? 0));
        break;
      default:
        break;
    }

    return result;
  }, [countries, search, region, sort]);

  return (
    <section aria-labelledby="countries-section-heading" className="space-y-8">
      <h2 id="countries-section-heading" className="sr-only">
        Country explorer filters and results
      </h2>

      <form
        className="panel p-4 sm:p-5"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Filter countries"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end">
          <label className="field-label" htmlFor="country-search">
            Search country
          </label>
          <input
            id="country-search"
            type="search"
            placeholder="Type a country name"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="control-input sm:col-span-2 lg:col-span-1"
          />

          <label className="field-label" htmlFor="region-filter">
            Region
          </label>
          <select
            id="region-filter"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="control-input control-select"
          >
            <option value="all">All regions</option>
            {regions.map((singleRegion) => (
              <option key={singleRegion} value={singleRegion}>
                {singleRegion}
              </option>
            ))}
          </select>

          <label className="field-label" htmlFor="sort-filter">
            Sort by
          </label>
          <select
            id="sort-filter"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="control-input control-select"
          >
            <option value="none">No sorting</option>
            <option value="pop-desc">Population (high to low)</option>
            <option value="pop-asc">Population (low to high)</option>
            <option value="area-desc">Area (high to low)</option>
            <option value="area-asc">Area (low to high)</option>
          </select>

          <button type="button" onClick={resetFilters} className="btn-accent">
            Reset filters
          </button>
        </div>
      </form>

      <p className="text-sm font-bold uppercase tracking-[0.1em] text-[color:var(--muted-text)]" aria-live="polite">
        Showing {filteredCountries.length} of {countries.length} countries
      </p>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-label="Countries">
        {filteredCountries.map((country, index) => (
          <li key={country.cca3} className="h-full">
            <article className="country-card flex h-full flex-col" style={{ animationDelay: `${Math.min(index * 45, 450)}ms` }}>
              <div className="relative overflow-hidden">
                <Image
                  src={country.flags.png}
                  alt={country.flags.alt || `${country.name.common} flag`}
                  width={640}
                  height={360}
                  className="h-44 w-full object-cover"
                  unoptimized
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div className="space-y-3">
                  <header className="space-y-1.5">
                    <h3 className="text-xl font-black tracking-tight text-[color:var(--text-strong)]">
                      {country.name.common}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--muted-text)]">
                      {country.subregion || country.region}
                    </p>
                  </header>

                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div>
                      <dt className="info-key">Capital</dt>
                      <dd className="info-value">{country.capital?.[0] ?? "N/A"}</dd>
                    </div>
                    <div>
                      <dt className="info-key">Population</dt>
                      <dd className="info-value">{country.population.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="info-key">Currency</dt>
                      <dd className="info-value">{getPrimaryCurrency(country.currencies)}</dd>
                    </div>
                    <div>
                      <dt className="info-key">Code</dt>
                      <dd className="info-value">{country.cca3}</dd>
                    </div>
                  </dl>
                </div>

                <Link
                  href={`/countries/${country.cca3}`}
                  className="btn-primary inline-flex w-full justify-center"
                  aria-label={`View full details for ${country.name.common}`}
                >
                  View details
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {filteredCountries.length === 0 ? (
        <div className="panel p-8 text-center">
          <p className="text-base font-semibold text-[color:var(--text-strong)]">No countries match your filters.</p>
          <p className="mt-1 text-sm text-[color:var(--muted-text)]">Try clearing search or selecting another region.</p>
          <button type="button" onClick={resetFilters} className="btn-accent mt-4">
            Clear filters
          </button>
        </div>
      ) : null}
    </section>
  );
}

