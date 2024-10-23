import { Persona } from "./persona";

export class Clase {
    id: number;
    contenido: string;
    profesor: string; //profesor: Persona;
    aula: string; 
  
    constructor(id: number, contenido: string, profesor: string, aula: string) {
      this.id = id;
      this.contenido = contenido;
      //this.profesor = profesor;
      this.profesor = profesor;
      this.aula = aula;
    }
}
  