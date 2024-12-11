import { UseInterceptors, applyDecorators } from "@nestjs/common";
import { ResponseValidationInterceptor } from "src/interceptor/validate-response.interceptor";

export function ValidateResponse(dto: new () => object) {
  return applyDecorators(UseInterceptors(new ResponseValidationInterceptor(dto)));
}
