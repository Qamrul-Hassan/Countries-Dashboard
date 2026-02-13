export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<
      string,
      {
        official: string;
        common: string;
      }
    >;
  };
  flag?: string;
  cca3: string;
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  capital?: string[];
  continents?: string[];
  timezones?: string[];
  borders?: string[];
  tld?: string[];
  fifa?: string;
  independent?: boolean;
  unMember?: boolean;
  startOfWeek?: string;
  landlocked?: boolean;
  gini?: Record<string, number>;
  altSpellings?: string[];
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  postalCode?: {
    format?: string;
    regex?: string;
  };
  latlng?: number[];
  capitalInfo?: {
    latlng?: number[];
  };
  car?: {
    side?: string;
  };
  languages?: Record<string, string>;
  currencies?: Record<
    string,
    {
      name: string;
      symbol?: string;
    }
  >;
  maps?: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  demonyms?: {
    eng?: {
      f: string;
      m: string;
    };
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}
