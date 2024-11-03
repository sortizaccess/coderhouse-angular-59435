import { Persona } from './persona'; 

export class Alumno implements Persona {
    legajo: number;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: Date;
    genero: string;
    password: string;
    token: string;

    constructor(legajo: number, nombre: string, apellido: string, email: string, fechaNacimiento: Date, genero: string, password: string, token: string) {
        this.legajo = legajo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.password = password;
        this.token = token;
    }
}