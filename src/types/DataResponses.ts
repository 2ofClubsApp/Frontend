import * as React from "react";

export type StatusResponse = {
    data: {
        code: number,
        message: string,
        data: {
            Token: string
        }
    }
}

export type Status = {
    code: number,
    message: string,
    data: {}
}

export type tag = {
    id: number,
    name: string,
    isActive: boolean
}