"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Country } from "@/types/country";

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
        new Set(countries.map((c) => c.region).filter(Boolean))
      ),
    [countries]
  );

  const filteredCountries = useMemo(() => {
    const result = countries.filter((c) => {
      const matchSearch = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchRegion =
        region === "all" || c.region === region;
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
    }

    return result;
  }, [countries, search, region, sort]);

  return (
    <>
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="search"
          placeholder="Search country"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2"
        />

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="all">All regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="none">No sorting</option>
          <option value="pop-desc">Population ↓</option>
          <option value="pop-asc">Population ↑</option>
          <option value="area-desc">Area ↓</option>
          <option value="area-asc">Area ↑</option>
        </select>

        <button
          onClick={resetFilters}
          className="border rounded-md px-4 py-2 text-sm"
        >
          Reset
        </button>
      </div>

      {/* Cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCountries.map((c) => (
          <li
            key={c.cca3}
            className="
              relative
              border rounded-lg overflow-hidden
              bg-white dark:bg-zinc-900
              text-zinc-900 dark:text-zinc-100
              shadow-sm
              transition-shadow duration-200 ease-out
              hover:shadow-lg
            "
          >
            <Image
              src={c.flags.png}
              alt={c.flags.alt || c.name.common}
              width={400}
              height={250}
              className="h-40 w-full object-cover"
              unoptimized
            />

            <div className="p-4 space-y-1 text-sm">
              <h2 className="font-semibold text-base">
                {c.name.common}
              </h2>

              <p className="text-muted-foreground">
                {c.subregion || c.region}
              </p>

              <p>Capital: {c.capital?.[0] ?? "N/A"}</p>
              <p>
                Population:{" "}
                {c.population.toLocaleString()}
              </p>
              <p>
                Area:{" "}
                {c.area
                  ? `${c.area.toLocaleString()} km²`
                  : "N/A"}
              </p>
              <p className="text-muted-foreground">
                Code: {c.cca3}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
