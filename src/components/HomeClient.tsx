"use client";

import CountryList from "@/components/CountryList";
import type { Country } from "@/types/country";

export default function HomeClient({
  countries,
}: {
  countries: Country[];
}) {
  return <CountryList countries={countries} />;
}
