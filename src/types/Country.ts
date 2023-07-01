// interface for what data we will use
export interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  capital: string;
  population: number;
  languages: {
    [key: string]: string;
  };
  startOfWeek: string;
}
