document.addEventListener('DOMContentLoaded', function () {
    const generarArchivoBtn = document.getElementById('generar-archivo-btn');

    generarArchivoBtn.addEventListener('click', function () {
        const contenidoTxt = document.getElementById('contenido-txt').value;

        fetch('/generar-archivo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contenido: contenidoTxt })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al generar el archivo.');
                }
                return response.text();
            })
            .then(idG => {
                //alert(message);
                window.location = (`http://localhost:3000/view.html/${idG}`);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al generar el archivo. Por favor, inténtelo de nuevo.');
            });



    });
});
