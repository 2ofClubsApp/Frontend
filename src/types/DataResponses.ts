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

export type eventGET = {
    id: number,
    name: string,
    description: string,
    location: string,
    fee: number
}

export type eventPOST = {
    name: string,
    description: string,
    location: string,
    fee: number
}