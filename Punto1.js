const fs = require('fs/promises');
const path = require('path');

async function crearArchivo(num) {
    const texto = `Este es el archivo número ${num}`;
    const ruta = path.join(__dirname, 'archivos', `archivo_${num}.txt`);
    await fs.writeFile(ruta, texto);
}