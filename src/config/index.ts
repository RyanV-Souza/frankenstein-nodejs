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

  SwaggerModule.createDocument(app, config);
}

export function setGlobalPrefix(app: INestApplication) {
  app.setGlobalPrefix("api");
}
