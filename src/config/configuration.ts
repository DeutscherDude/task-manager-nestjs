export default () => ({
  app_port: parseInt(process.env.APP_PORT, 10) || 3000,
  db: {
    uri: process.env.MONGO_CONNSTRING,
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    host: process.env.MONGO_HOST || 'localhost',
    name: process.env.MONGO_DATABASE || 'nest-mongo',
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
  },
});

export interface MongoConfig {
  uri: string;
  port: number;
  host: string;
  name: string;
  user: string;
  password: string;
}

export interface AppConfig {
  app_port: number;
  db: MongoConfig;
}
