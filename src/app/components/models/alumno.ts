import { Persona } from './persona'; 

export class Alumno implements Persona {
    legajo: number;
    fechaInscripcion: Date;
    activo: boolean;
    nombre: string;
    apellido: string;
    nacimiento: Date;
    genero: string;

    constructor(legajo: number, fechaInscripcion: Date, nombre: string, apellido: string, nacimiento: Date, genero: string) {
        this.legajo = legajo;
        this.fechaInscripcion = fechaInscripcion;
        this.activo = true;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacimiento = nacimiento;
        this.genero = genero;
    }
}