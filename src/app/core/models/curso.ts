
export class Curso {
    id: string;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    dificultad: string; // Por ejemplo, "Principiante", "Intermedio", "Avanzado"

    constructor(id: string, nombre: string, descripcion: string, fechaInicio: Date, dificultad: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.dificultad = dificultad;
    }
}