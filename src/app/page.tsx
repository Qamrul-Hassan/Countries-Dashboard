import { api } from "@/lib/api";
import type { Country } from "@/types/country";
import HomeClient from "@/components/HomeClient";

async function getCountries(): Promise<Country[]> {
  const res = await api.get<Country[]>(
    "/all?fields=name,cca3,region,subregion,population,area,capital,flags"
  );
  return res.data;
}

export default async function HomePage() {
  const countries = await getCountries();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Countries</h1>
      <p className="text-muted-foreground mb-6">
        Explore basic information about countries around the world.
      </p>

      <HomeClient countries={countries} />
    </section>
  );
}
