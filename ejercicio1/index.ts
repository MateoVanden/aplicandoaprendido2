import PromptSync from "prompt-sync";
import { crearTarea, Tarea } from "./tareas.js";
const prompt = PromptSync();
let tareas: Tarea[] = [];

function esperarTeclaParaContinuar(): void {
    prompt('Presiona Enter para continuar...');
}

function limpiarPantalla(): void {
    process.stdout.write('\x1Bc'); // o '\033c' 
}

function menu() {
    let opcion: number;
    do {
        console.log("1.Ver mis tareas");
        console.log("2.Buscar tarea");
        console.log("3.Agregar una tarea");
        console.log("4.Salir");
        opcion = parseInt(prompt("Ingrese la opcion que desea realizar: "));

        switch (opcion) {
            case 1:
                verTarea();
                esperarTeclaParaContinuar();
                limpiarPantalla();
                break;
            case 2:
                let nombre: string = "";
                if (tareas.length === 0) {
                    console.log("No hay tareas cargadas por el momento ");
                }
                else {
                    nombre = prompt("Ingrese el titulo de la tarea que desea buscar: ");
                    while (nombre === "") {
                        nombre = prompt("ERROR, ingrese el titulo porfavor: ");
                    }
                }
                buscarTarea(nombre);
                esperarTeclaParaContinuar();
                limpiarPantalla();
                break;
            case 3:
                agregarTarea();
                esperarTeclaParaContinuar();
                limpiarPantalla();
                break;
            case 4:
                console.log("Gracias por usar el programa");
                break;
            default:
                console.log("ERROR, opcion incorrecta");
                break;
        }
    } while (opcion != 4);
}


function agregarTarea() {
    const nuevaTarea = crearTarea();

    let titulo = prompt("Designe el título de la tarea: ");
    while (titulo === "") {
        titulo = prompt("El titulo es OBLIGATORIO ingrese nuevamente: ");
    }
    nuevaTarea.titulo = titulo;
    let descripcion = prompt("Designe la descripción de la tarea: ");
    nuevaTarea.descripcion = descripcion;
    let estado = prompt("Designe el estado de la tarea (P)pendiente,(E)en curso,(T)terminado,(C)cancelado: ").toUpperCase();
    while (estado != "P" && estado != "E" && estado != "T" && estado != "C") {
        estado = prompt("ERROR: el estado ingresado es inválido, ingrese nuevamente: ").toUpperCase();
    }
    nuevaTarea.estado = estado;
    let dificultad = prompt("Designe la dificultad de la tarea (F)facil,(M)media,(D)dificil: ").toUpperCase();
    while (dificultad != "F" && dificultad != "M" && dificultad != "D") {
        dificultad = prompt("ERROR: la dificultad ingresada es inválida, ingrese nuevamente: ").toUpperCase();
    }
    nuevaTarea.dificultad = dificultad;

    tareas.push(nuevaTarea);
}

function verTarea(): void {
    let opcion:number;
    do {
        console.log("Que tareas desea ver??? ");
        console.log("1.Todas ");
        console.log("2.Pendientes ");
        console.log("3.En curso ");
        console.log("4.Terminadas ");
        console.log("0.Volver al menu");
        opcion= parseInt(prompt("Ingrese la opcion que desee: "));

        switch (opcion) {
            case 1:
                if (tareas.length === 0) {
                    console.log("No hay ninguna tarea ");
                }
                else {
                    console.log("Estas son todas tus tareas: ");
                    for (let i = 0; i < tareas.length; i++) {
                        console.log(`[${i + 1}] ${tareas[i].titulo}.`);
                    }
                }
                esperarTeclaParaContinuar();
                limpiarPantalla();
                break;
            case 2:
                let band = 0;
                for (let i = 0; i < tareas.length; i++) {
                    if (tareas[i].estado === "P") {
                        band = 1;
                        console.log("Estas son tus tareas con estado pendiente: ");
                        console.log(`[${i + 1}] ${tareas[i].titulo}.`);
                    }
                }
                if (band == 0) {
                    console.log("No tienes tareas con estado pendiente ");
                }
                esperarTeclaParaContinuar();
                limpiarPantalla();
                break;
            case 3:
                let band1 = 0;
                for (let i = 0; i < tareas.length; i++) {
                    if (tareas[i].estado === "E") {
                        band1 = 1;
                        console.log("Estas son tus tareas con estado pendiente: ");
                        console.log(`[${i + 1}] ${tareas[i].titulo}.`);
                    }
                }
                if (band1 == 0) {
                    console.log("No tienes tareas con estado en curso ");
                }
                esperarTeclaParaContinuar();
                limpiarPantalla();
                break;
            case 4:
                let band2 = 0;
                for (let i = 0; i < tareas.length; i++) {
                    if (tareas[i].estado === "T") {
                        band2 = 1;
                        console.log("Estas son tus tareas con estado pendiente: ");
                        console.log(`[${i + 1}] ${tareas[i].titulo}.`);
                    }
                }
                if (band2 == 0) {
                    console.log("No tienes tareas con estado terminada ");
                }
                esperarTeclaParaContinuar();
                limpiarPantalla();
                break;
            case 0:
                limpiarPantalla();
                console.log("Volviendo al menu ");
                menu();
            default:
                console.log("ERROR, opcion incorrecta ");
                break;
        }

    } while (opcion != 0)
}

function buscarTarea(nombre: string): void {
    let arrayCadena: number[] = [], band = 0;
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].titulo.toLowerCase().includes(nombre.toLowerCase())) {
            arrayCadena.push(i);
            band++
        }
    }
    if (band === 0) {
        console.log("No hay tareas relacionadas con la búsqueda.");
        esperarTeclaParaContinuar();
    }
    else {
        console.log(`Hubieron ${band} coincidencias en la búsqueda: `);
        for (let i = 0; i < arrayCadena.length; i++) {
            console.log(`[${arrayCadena[i] + 1}] ${tareas[arrayCadena[i]].titulo} `);
        }
    }
    mostrarDetalles();
}

function mostrarDetalles() {
    let i: number = parseInt(prompt("Desea ver los detalles de alguna tarea, ingrese el indice si no 0 para volver al menu: "));
    let tareaAux:Tarea = crearTarea();
    let op: any;
    tareaAux = tareas[i - 1];
    if (i === 0) {
        console.log("Volviendo al menu... ");
        esperarTeclaParaContinuar();
    }
    else {
        console.log("---------------------------------");
        console.log("Esta es la tarea que elegiste: ");
        console.log(`Título: ${tareas[i - 1].titulo}.`);
        console.log(`Descripcion: ${tareas[i - 1].descripcion}.`);
        if (tareas[i - 1].estado == "P") {
            console.log("Estado: Pendiente");
        }
        else {
            if (tareas[i - 1].estado == "T") {
                console.log("Estado: Terminada");
            }
            else {
                if (tareas[i - 1].estado == "E") {
                    console.log("Estado: En curso");
                }
                else {
                    console.log("Estado: Cancelada");
                }
            }
        }
        if (tareas[i - 1].dificultad == "F") {
            console.log("Dificultad: 🔥");
        }
        else {
            if (tareas[i - 1].dificultad == "M") {
                console.log("Dificultad: 🔥🔥");
            }
            else {
                console.log("Dificultad: 🔥🔥🔥");
            }
        }
        op = prompt("Si desea editar la tarea, ingrese (E), o (0) para volver: ").toUpperCase();
        while (op != "E" && op != "0") {
            op = prompt("Ingreso una opcion invalida, vuelva a ingresar: ").toUpperCase();
        }
        if (op === 0) {
            limpiarPantalla();
            console.log("Volviendo al menu principal...");
        }
        else {
            let editar: number;
            do {
                console.log("-------------------------------------");
                console.log("1.Editar titulo ");
                console.log("2.Editar descripcion ");
                console.log("3.Editar estado ");
                console.log("4.Editar dificultad ");
                console.log("0.Terminar de editar y guardar los datos ");
                editar = parseInt(prompt("Ingrese una opcion: "));

                switch (editar) {
                    case 1:
                        let titulo = prompt("Designe el nuevo título de la tarea: ");
                        while (titulo === "") {
                            titulo = prompt("El titulo es OBLIGATORIO ingrese nuevamente: ");
                        }
                        tareaAux.titulo = titulo;
                        break;
                    case 2:
                        let descripcion = prompt("Designe la nueva descripción de la tarea: ");
                        tareaAux.descripcion = descripcion;
                        break;
                    case 3:
                        let estado = prompt("Designe el nuevo estado de la tarea (P)pendiente,(E)en curso,(T)terminado,(C)cancelado: ").toUpperCase();
                        while (estado != "P" && estado != "E" && estado != "T" && estado != "C") {
                            estado = prompt("ERROR: el estado ingresado es inválido, ingrese nuevamente: ").toUpperCase();
                        }
                        tareaAux.estado = estado;
                        break;
                    case 4:
                        let dificultad = prompt("Designe la nueva dificultad de la tarea (F)facil,(M)media,(D)dificil: ").toUpperCase();
                        while (dificultad != "F" && dificultad != "M" && dificultad != "D") {
                            dificultad = prompt("ERROR: la dificultad ingresada es inválida, ingrese nuevamente: ").toUpperCase();
                        }
                        tareaAux.dificultad = dificultad;
                        break;
                    case 0:
                        console.log("Datos guardados exitosamente, volviendo al menu anterior...");
                        break;
                    default:
                        console.log("ERROR, opcion incorrecta ");
                        break;
                }

            } while (editar != 0)
        }
    }
}

//MAIN
esperarTeclaParaContinuar();
menu();