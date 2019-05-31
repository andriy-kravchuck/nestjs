import { UnprocessableEntityException } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export async function validationError(dto: any, data: any){
    const item = plainToClass(dto, data)
    const errors = await validate(item);

    const errorMessages = errors.reduce((accum, { property, constraints }) => {
        return { ...accum, [property]: Object.values(constraints) };
    }, {});

    if (Object.keys(errorMessages).length) {
        throw new UnprocessableEntityException(errorMessages);
    }
}
