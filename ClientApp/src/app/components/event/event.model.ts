export interface Events {
    id?: number
    name: string
    description: string
    local: string
    date: Date
    eventTypeId : number
    eventType?: {
        id: number
        description: string
    }
}
