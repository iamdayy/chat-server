export interface Config {
  NODE_ENV: string;
  PORT: string;
  DB_URI: string;
  DB_NAME: string;
  EMAIL: string;
  PASSWORD: string;
  ENV: "test" | "dev" | "prod";
  SECRET: string;
}

export interface User {
  name: {
    first: string;
    last?: string;
  };
  username: string;
  active: boolean;
  bio: string;
  email: string;
  phone: string;
  freinds: string[];
  requests: string[];
}

interface MessageBody {
  text: string;
  image: string;
}

export interface Message {
  body: MessageBody;
  from: string;
  to: string;
  formself?: boolean;
}
