import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { configureSwagger, setGlobalPrefix } from "./config";
import { EnvService } from "./env/env.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const [result] = errors.map(
          (error) => error.constraints[Object.keys(error.constraints)[0]],
        );

        return new UnprocessableEntityException(result);
      },
    }),
  );

  const envService = app.get<EnvService>(EnvService);

  const port = envService.get("PORT");

  setGlobalPrefix(app);
  configureSwagger(app);

  await app.listen(port, () => {
    console.log("Server running on port " + port);
  });
}
bootstrap();
