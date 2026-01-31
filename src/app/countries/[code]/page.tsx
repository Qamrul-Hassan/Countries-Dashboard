import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import type { Country } from "@/types/country";

type PageProps = {
  params: {
    code: string;
  };
};

async function getCountry(code: string): Promise<Country> {
  try {
    const res = await api.get<Country[]>(
      `/alpha/${code}?fields=name,cca3,region,population,flags`
    );

    if (!res.data || res.data.length === 0) {
      notFound();
    }

    return res.data[0];
  } catch {
    notFound();
  }
}

export default async function CountryDetailsPage({
  params,
}: PageProps) {
  const country = await getCountry(params.code);

  return (
    <section className="max-w-3xl">
      <Link href="/" className="inline-block mb-6 text-sm underline">
        ← Back to countries
      </Link>

      <Image
        src={country.flags.svg}
        alt={country.flags.alt || country.name.common}
        width={800}
        height={500}
        className="w-full h-64 object-cover rounded-lg mb-6"
        unoptimized
      />

      <h1 className="text-3xl font-bold mb-4">
        {country.name.common}
      </h1>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Official name:</span>{" "}
          {country.name.official}
        </p>

        <p>
          <span className="font-medium">Region:</span>{" "}
          {country.region}
        </p>

        <p>
          <span className="font-medium">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>
      </div>
    </section>
  );
}
