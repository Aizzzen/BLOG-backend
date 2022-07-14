import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";


// pipe - преобразовывают входные данные(строка в число) || валидация
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        // получаем объект для валидации === тело запроса
        // plainToClass - преобразует значение в нужный класс
        const obj = plainToClass(metadata.metatype, value)
        // получаем ошибки
        const errors = await validate(obj)

        if(errors.length) {
            // constraints - получить параметры из dto
            let message = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            throw new ValidationException(message)
        }
        return value
    }
}
