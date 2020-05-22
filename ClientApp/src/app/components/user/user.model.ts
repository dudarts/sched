export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    passwordConfirm? : string
    birthDate: Date;
    gender: string;
}
