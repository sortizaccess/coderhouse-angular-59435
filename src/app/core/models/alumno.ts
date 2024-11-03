import { Persona } from './persona'; 

export class Alumno implements Persona {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: Date;
    genero: string;
    password: string;
    token: string;

    constructor(id: string, nombre: string, apellido: string, email: string, fechaNacimiento: Date, genero: string, password: string, token: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.password = password;
        this.token = token;
    }
}