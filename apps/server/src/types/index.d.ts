import { Request } from "express";

export type AuthenticatedRequest = Request & {
    user?: any
}