import http from 'http';
import dotenv from 'dotenv';
import { router } from './router';

dotenv.config();

export class App {
  private PORT: number | string;
  public server: http.Server;

  constructor() {
    this.PORT = process.env.PORT || 5000;
    this.server = http.createServer(router);
  }

  init = () => {
    this.server.listen(this.PORT, () => {
      console.log(`Server started on port: ${this.PORT}!`);
    });
  };
}
