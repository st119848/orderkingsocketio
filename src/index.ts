import { OrderkingApiApplication } from "./application";
import { ApplicationConfig } from "@loopback/core";

export { OrderkingApiApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new OrderkingApiApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  const socketurl = app.httpServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Socket server run at ${socketurl}`);
  console.log(`Try ${url}/ping`);

  return app;
}
