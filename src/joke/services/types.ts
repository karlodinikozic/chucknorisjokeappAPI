export type ChuckNorisResponseType = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

interface IJokeService {
  getJoke(): Promise<ChuckNorisResponseType>;
}

export default IJokeService
