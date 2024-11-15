import { Persona } from "./persona";

export class Usuario extends Persona  {
    id: string;
    email: string;
    password: string;
    token: string;
    esAdmin: boolean;

    constructor(id: string, email: string, password: string, token: string, esAdmin: boolean) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.token = token;
        this.esAdmin = esAdmin;
    }
}