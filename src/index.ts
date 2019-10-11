import { OrderkingApiApplication } from "./application";
import { ApplicationConfig } from "@loopback/core";

export { OrderkingApiApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new OrderkingApiApplication(options);
  await app.boot();
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log("listening on %s", app.httpServer.url);
  console.log(`Try ${url}/ping`);

  return app;
}
