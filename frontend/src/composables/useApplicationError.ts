import type { ApplicationError } from '../types'

export function isApplicationError(errorPayload: any): errorPayload is ApplicationError {
    return errorPayload && errorPayload.name != undefined && errorPayload.message != undefined;
}