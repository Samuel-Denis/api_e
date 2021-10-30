interface ICreateUser {
    name: string;
    password: string;
    email: string;
    id?: string;
    avatar?: string;
}

export { ICreateUser }