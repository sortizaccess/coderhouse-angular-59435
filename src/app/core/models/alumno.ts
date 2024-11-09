import { Persona } from './persona'; 

export class Alumno extends Persona {
    id: string;
    email: string;
    password: string;
    token: string;

    constructor(id: string, email: string, password: string, token: string) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.token = token;
    }
}