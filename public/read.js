document.addEventListener('DOMContentLoaded', function () {
    const generarCopiaBtn = document.getElementById('generar-copia-btn');

    generarCopiaBtn.addEventListener('click', function () {
        const contenidoTxt = document.getElementById('contenido-txt').value;

        const primeraLinea = localStorage.getItem('primeraLinea');

        const contenidoConID = id + '-' + primeraLinea;

        fetch('/generar-archivo-copia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Agrega la primera línea al contenido antes de enviar
            body: JSON.stringify({ contenido: contenidoConID + '\n' + contenidoTxt })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al generar la copia.');
                }
                return response.text();
            })
            .then(idG => {
                window.location.replace(`http://localhost:3000/view.html/${idG}`);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al generar la copia. Por favor, inténtelo de nuevo.');
            });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const eliminarBtn = document.getElementById('eliminar-btn');

    eliminarBtn.addEventListener('click', function () {
        fetch(`/eliminar-archivos?id=${id}`)
            .then(response => {
                return response.text();
            })
            .then(message => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.reload();
            });
    });
});