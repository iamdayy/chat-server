export interface Config {
  NODE_ENV: string;
  PORT: number;
  DB_URI: string;
  DB_NAME: string;
  EMAIL: string;
  PASSWORD: string;
  ENV: "test" | "dev" | "prod";
  SECRET: string;
}

export interface Setting {
  notification: boolean;
  language: string | 'id' | 'en';
  wallpaper: string;
}
export interface User {
  name: {
    first: string;
    last?: string;
  };
  avatar: string;
  username: string;
  active: boolean;
  bio: string;
  email: string;
  phone: string;
  freinds: string[];
  setting: Setting;
  fcm: string;
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
