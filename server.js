const express = require('express');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const server = express();
const port = 3000;

server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());

function generarEnlaceUnico() {
    var stamp = new Date().getTime();
    return stamp;
}
//generar archivo nuevo
server.post('/generar-archivo', (req, res) => {
    const contenido = req.body.contenido;

    if (!contenido) {
        res.status(400).send('No hay nada que guardar.');
        return;
    }

    const idG = `${generarEnlaceUnico()}`
    const nombreArchivo = `${idG}.txt`;
    const rutaArchivo = path.join(__dirname, 'archivos', nombreArchivo);

    // poner tree: en la primera para setearla
    const contenidoArchivo = `${idG}\n${contenido}`;

    fs.writeFile(rutaArchivo, contenidoArchivo, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al generar el archivo');
            return;
        }
        console.log(`Archivo ${nombreArchivo} generado.`);
        let nombreMuestra = nombreArchivo.slice(0, -4);
        //res.status(200).send(`http://localhost:3000/view.html/${nombreMuestra}`);
        res.send(idG);
    });
});

//generar archivo copia
server.post('/generar-archivo-copia', (req, res) => {
    const contenido = req.body.contenido;
    const url = req.headers.referer; // obtiene la URL
    const lastSlashIndex = url.lastIndexOf('/');
    const idPadre = url.substring(lastSlashIndex + 1); // extrae el ID del padre de la URL

    if (!contenido) {
        res.status(400).send('El contenido del archivo no fue proporcionado.');
        return;
    }

    const idG = generarEnlaceUnico();
    const nombreArchivo = `${idG}.txt`;
    const rutaArchivo = path.join(__dirname, 'archivos', nombreArchivo); // ruta del archivo

    let contenidoArchivo = contenido;
    if (!contenido.startsWith(idPadre + '-')) {
        // Agrega el id padre
        contenidoArchivo = `${idPadre}-${contenido}`;
    } else {
        contenidoArchivo = contenido.replace(`${idPadre}-`, `${idPadre}-${idG}-`);
    }

    fs.writeFile(rutaArchivo, contenidoArchivo, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Archivo ${nombreArchivo} generado.`);
        res.send(idG.toString());
    });
});

//fin del generar copia

//eliminar hijos
server.get('/eliminar-archivos', async (req, res) => {
    try {
        const id = req.query.id;
        const rutaArchivos = path.join(__dirname, 'archivos');
        const files = await fs.promises.readdir(rutaArchivos);

        await Promise.all(files.map(async (file) => {
            const filePath = path.join(rutaArchivos, file);
            const rl = readline.createInterface({
                input: fs.createReadStream(filePath),
                crlfDelay: Infinity
            });

            for await (const line of rl) {
                if (line.includes(id)) {
                    await fs.promises.unlink(filePath);
                    console.log('Archivo eliminado:', file);
                    break;
                }
            }
        }));

        res.send('Archivos eliminados correctamente.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al eliminar los archivos.');
    }
});
//eliminar hijos fin


server.use(express.static(path.join(__dirname, 'public')));

//manda todo a /view.html a toda url que sea view.html/ o +
server.get('/view.html/:id?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

server.get('/obtener-archivo', (req, res) => {
    // obtiene la id del archivo con get
    const id = req.query.id;

    if (!id) {
        res.status(400).send('El parámetro "id" no fue proporcionado.');
        return;
    }

    // hace el nombre del archivo
    const fileName = id + ".txt";

    // ruta del archivo
    const filePath = path.join(__dirname, 'archivos', fileName);

    // lee el contenido del archivo
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Error al leer el archivo');
        } else {
            // envia la respuesta, el texto del archivo
            res.send(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
