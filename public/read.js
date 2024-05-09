document.addEventListener('DOMContentLoaded', function () {
    const generarCopiaBtn = document.getElementById('generar-copia-btn');

    generarCopiaBtn.addEventListener('click', function () {
        const contenidoTxt = document.getElementById('contenido-txt').value;

        // recupera la primera línea del localStorage
        const primeraLinea = localStorage.getItem('primeraLinea');

        fetch('/generar-archivo-copia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // agrega la primera línea al contenido antes de enviar
            body: JSON.stringify({ contenido: primeraLinea + '\n' + contenidoTxt })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al generar la copia.');
                }
                return response.text();
            })
            .then(idG => {
                //alert(message);
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
                alert(message);

                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al eliminar archivos. Por favor, inténtelo de nuevo.');
            });
    });
});