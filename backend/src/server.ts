import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";
import { seedDefaultWorkTypes } from "./config/seed";

let server: ReturnType<typeof app.listen> | undefined;

async function bootstrap() {
  await seedDefaultWorkTypes();

  server = app.listen(env.port, () => {
    console.log(`Server is running on http://localhost:${env.port}`);
  });
}

async function shutdown() {
  await prisma.$disconnect();
  server?.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

bootstrap().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
