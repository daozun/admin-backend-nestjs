import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError, TypeORMError } from 'typeorm';
import { Response } from 'express';
import { BaseResponse } from "../common/baseReponse";
import { Reflector } from '@nestjs/core';

@Catch(QueryFailedError)
export class ErrorExceptionFilter implements ExceptionFilter {
    constructor(public reflector: Reflector) {}
    
    catch(exception: any, host: ArgumentsHost) {
        console.log('%c [ exception ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', exception)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }

        // if (exception instanceof QueryFailedError) {
        //     console.log('%c [ exception ]-27', 'font-size:13px; background:pink; color:#bf2c9f;', exception)
        //     // status = exception.getStatus();
        //     // message = exception.message;
        // }        

        response.status(status).json({
            statusCode: status,
            message: message,
        });
    }
}