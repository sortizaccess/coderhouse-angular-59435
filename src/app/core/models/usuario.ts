
export class Usuario  {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    token: string;
    esAdmin: boolean;

    constructor(id: string, nombre: string, apellido: string, email: string, password: string, token: string, esAdmin: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.token = token;
        this.esAdmin = esAdmin;
    }
}