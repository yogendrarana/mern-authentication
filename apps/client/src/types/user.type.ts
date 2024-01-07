export type RegisterCredentialsType = {
    name: string,
    email: string,
    password: string,
    confirm_password: string
}

export type LoginCredentialsType = {
    email: string,
    password: string,
}