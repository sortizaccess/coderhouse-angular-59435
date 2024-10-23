
export class Curso {
    id: number;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    dificultad: string; // Por ejemplo, "Principiante", "Intermedio", "Avanzado"
    idClase: number;

    constructor(id: number, nombre: string, descripcion: string, fechaInicio: Date, dificultad: string, idClase: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.dificultad = dificultad;
        this.idClase = idClase;
    }
}