
export class Curso {
    id: number;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    dificultad: string; // Por ejemplo, "Principiante", "Intermedio", "Avanzado"

    constructor(id: number, nombre: string, descripcion: string, fechaInicio: Date, dificultad: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.dificultad = dificultad;
    }
}