export type Client = {
  name: string;
  services: string;
  website: string;
  phone?: string;
};

export type Project = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  img: string;
  description: string;
  techstack: string[];
  limitations: string[];
  client: Client;
};
