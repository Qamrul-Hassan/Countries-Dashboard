import { api } from "@/lib/api";
import type { Country } from "@/types/country";
import HomeClient from "@/components/HomeClient";

async function getCountries(): Promise<Country[]> {
  const res = await api.get<Country[]>(
    "/all?fields=name,cca3,region,subregion,population,area,capital,currencies,flags"
  );
  return res.data;
}

export default async function HomePage() {
  const countries = await getCountries();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-black uppercase tracking-[0.08em] text-[color:var(--text-strong)] sm:text-4xl">
          Countries
        </h1>
        <p className="max-w-2xl text-sm font-medium text-[color:var(--muted-text)] sm:text-base">
          Explore essential country facts with fast filters, responsive cards, and accessible interactions.
        </p>
      </header>

      <HomeClient countries={countries} />
    </section>
  );
}
