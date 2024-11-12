# Proyecto final

Proyecto creado con [Angular CLI](https://github.com/angular/angular-cli) 18.2.4.

## Credenciales para Testing

<p>Administrador => <b>Email: </b>admin_test@email.com | <b>Password: </b>1234</p>
<p>Estándar => <b>Email: </b>luis_ramirez@email.com | <b>Password: </b>luis98pass</p>

## Consignas

<b>Curso Angular: Proyecto Final</b>

<b>Administración de Alumnos y Cursos</b> 

Creación de un proyecto frontend basado en Angular para gestionar los asistentes a una serie de cursos.
Deberá contener el perfil de administrador, el cual podrá listar, realizar altas y bajas de los alumnos, cursos e inscripciones, y modificar sus datos. También podrá crear y modificar usuarios.
El perfil usuario podrá listar los alumnos y los cursos, pero solo podrá agregar o eliminar inscripciones de alumnos en los cursos. No podrá realizar ninguna operación sobre los usuarios.

Objetivo 1: Dominar los conceptos iniciales, intermedios y avanzados para realizar un desarrollo basado en Angular y TypeScript.

Objetivo 2: Comprender el concepto de componentes y servicios para su reutilización en otros proyectos.

Objetivo 3: Comprender el concepto de módulos, lazy loading, rutas y la organización del proyecto en módulos core, shared y feature.

Objetivo 4: Integrar el patrón de estado global Redux y comprender la importancia de su uso utilizando la librería NgRx.

Objetivo 5: Realizar tests unitarios del proyecto frontend.

<b>Piezas sugeridas</b>

    Barra de navegación lateral con las opciones de menú para acceder a las diferentes funcionalidades de la aplicación.
    
    Toolbar en la que se muestre el nombre de la aplicación, el título de la funcionalidad que está presente y el nombre del usuario logueado.
    
    Componente de Login para autenticar usuarios.
    
    Listado de alumnos en formato de tabla con la posibilidad de ver el detalle y los cursos en los que está inscrito, y la posibilidad de agregar, eliminar y modificar datos de los mismos.
    
    Vista para inscribir a un alumno en un curso.
    
    Vista para desinscribir a un alumno de un curso.
    
    Vista para listar, agregar, modificar y eliminar usuarios.
    
    Opción de desloguearse en la aplicación desde la barra lateral.
    
    Backend de prueba en la nube (sugerido mockapi.io).

<b>Requisitos base</b>

Los requisitos base serán parte de los criterios de evaluación para aprobar el proyecto.
Deberá implementar un componente de login que se mostrará al inicio de la aplicación o cuando se intente acceder a cualquier ruta sin un usuario logueado.
Una vez logueado el usuario, se presentarán las opciones de menú según su perfil: los administradores tienen todas las opciones, mientras que a los usuarios comunes no se les debería mostrar la opción de "Usuarios".
En el perfil de usuario solo se podrán listar los alumnos y los cursos, pero sí se podrá inscribir o desinscribir alumnos en los cursos.
Como backend se podrá utilizar una cuenta en mockapi.io (u otro de preferencia) donde se encontrarán los recursos.
    
    Usuarios (con email, password, nombre, dirección, teléfono y perfil).
    
    Alumnos (nombre, perfil (que puede ser: desarrollador, IT, usuario final), sexo).
    
    Curso (nombre, cantidad de horas, cantidad de clases, nombre del profesor asignado).
    
    Inscripciones (id del alumno, id del curso inscrito, fecha de inscripción, id del usuario que lo inscribió).

<b>Puntos Extras</b>

Los requisitos extra para pro-coders no se incluyen en los criterios de evaluación.
    
    Correcta maquetación.
    
    Buenas prácticas de codificación.
    
    Tests unitarios.

<b>Dont’s</b>

No es recomendable.
    
    No tener errores en la consola.
    
    No mostrar console.log().


 
