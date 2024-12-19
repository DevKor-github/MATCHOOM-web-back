import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class IsTimeFormatConstraint implements ValidatorConstraintInterface{
    validate(time: any, args: ValidationArguments){
        const reg = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
        return typeof time === 'string' && reg.test(time)
    }

    defaultMessages(args: ValidationArguments){
        return '시간 형식이 올바르지 않습니다'
    }
}

export function IsTime(validationOptions?: ValidationOptions){
    return function (object: Object, propName: string){
        registerDecorator({ 
            target: object.constructor, 
            propertyName: propName, 
            options: validationOptions, 
            constraints: [], 
            validator: IsTimeFormatConstraint,
        })
    }
}