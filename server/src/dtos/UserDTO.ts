export default interface IUserDTO {
    id?: number;
    name: string;
    email: string;
    password: string;
    sobrenome: string;
    bio?: string;
    whatsapp?: string;
    avatar?: string;
    created_at?: string;
    updated_at?: string;
}
