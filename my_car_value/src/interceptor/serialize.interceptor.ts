import {CallHandler, ExecutionContext, NestInterceptor, UseInterceptors} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {plainToClass} from "class-transformer";
import {UserDto} from "../users/dtos/user.dto";

interface ClassConstructor {
    new (...args: any[]): {}
}
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements  NestInterceptor {

    constructor(private dto: any) {

    }
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        // Runs before the request is handled
        console.log('Before request')
        return next.handle().pipe(
            map((data: any) => {
                // Runs before the response is sent out
                console.log('After request')

                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true
                })
            })
        );
    }

}