import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
    new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        // run something before a request is handled
        // by the request handler
        console.log("I am running before handler" + context);
        console.log(this.dto);

        return handler.handle().pipe(
            map((data: any) => {
                // run something before the response is sent out
                console.log("I am running before response is sent out", data);
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })

            })
        )

    }
}