import { Persona } from "./persona";

export class Clase {
    id: number;
    materia: string;
    profesor: Persona;
    aula: string; 
  
    constructor(id: number, materia: string, profesor: Persona, aula: string) {
      this.id = id;
      this.materia = materia;
      this.profesor = profesor;
      this.aula = aula;
    }
}
  