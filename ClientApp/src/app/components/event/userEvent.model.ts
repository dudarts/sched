export interface UserEvent {
    userId: number
    user?: {
        id: number
        description: string
    }
    eventId: number
    event?: {
        id: number
        description: string
    }
}
