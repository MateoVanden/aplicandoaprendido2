export function crearTarea(titulo = "Sin título", descripcion = "Sin descripción", estado = "P", dificultad = "F") {
    return {
        titulo: titulo,
        descripcion: descripcion,
        estado: estado,
        dificultad: dificultad
    };
}
