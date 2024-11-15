import { Persona } from './persona'; 

export class Alumno extends Persona {
    id: string;
    fechaNacimiento: Date;
    genero: string;
    
    constructor(id: string, genero: string, fechaNacimiento: Date) {
        super();
        this.id = id;
        this.genero = genero;
        this.fechaNacimiento = fechaNacimiento;
    }
}