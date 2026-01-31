export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}
