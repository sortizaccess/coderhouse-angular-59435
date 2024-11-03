export class Inscripcion {
    id: string;
    idAlumno: number;
    idCurso: number;
    fechaInscripcion: Date;
    estado: string;
    
    constructor(id: string, idAlumno: number, idCurso: number, fechaInscripcion: Date, estado: string) {
        this.id = id;
        this.idAlumno = idAlumno;
        this.idCurso = idCurso;
        this.fechaInscripcion = fechaInscripcion;
        this.estado = estado;
      }
  }
  