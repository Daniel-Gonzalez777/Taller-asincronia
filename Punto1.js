const fs = require('fs/promises');
const path = require('path');

async function crearArchivo(num) {
    const texto = `Este es el archivo número ${num}`;
    const ruta = path.join(__dirname, 'archivos', `archivo_${num}.txt`);
    await fs.writeFile(ruta, texto);
}

async function crearArchivos(cantidad) {
    const carpeta = path.join(__dirname, 'archivos');

    await fs.mkdir(carpeta, { recursive: false });

    const tareas = [];
    for (let i = 1; i <= cantidad; i++) {
        tareas.push(crearArchivo(i));
    }

    await Promise.all(tareas);
    console.log(`Se generaron ${cantidad} archivos.`);
}

crearArchivos(1000);