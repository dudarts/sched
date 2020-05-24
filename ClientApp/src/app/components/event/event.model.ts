export interface Events {
    id?: number
    name: string
    description: string
    local: string
    eventTypeId : number
    eventType: {
        id: number
        description: string
    }
}
