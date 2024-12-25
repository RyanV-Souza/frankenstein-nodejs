import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Backoffice API")
    .setDescription("Documentação das rotas do sistema")
    .setVersion("1.0")
    .addBearerAuth(undefined, "access-token")
    .addSecurityRequirements("access-token")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("doc", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: (a, b) => {
        const order = {
          get: "0",
          post: "1",
          patch: "2",
          put: "3",
          delete: "4",
        };

        return (
          order[a.get("method")].localeCompare(order[b.get("method")]) ||
          a.get("path").localeCompare(b.get("path"))
        );
      },
    },
  });
}

export function setGlobalPrefix(app: INestApplication) {
  app.setGlobalPrefix("api");
}
