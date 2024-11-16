
export class Alumno {
    id: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    genero: string;
    
    constructor(id: string, nombre: string, apellido: string, genero: string, fechaNacimiento: Date) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.genero = genero;
        this.fechaNacimiento = fechaNacimiento;
    }
}