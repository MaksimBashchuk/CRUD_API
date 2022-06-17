import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

export class App {
  private PORT: number | string;
  public server: http.Server;

  constructor() {
    this.PORT = process.env.PORT || 5000;
    this.server = http.createServer();
  }

  init = () => {
    this.server.listen(this.PORT, () => {
      console.log(`Server started on port: ${this.PORT}!`);
    });
  };
}
