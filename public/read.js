document.addEventListener('DOMContentLoaded', function () {
    const eliminarBtn = document.getElementById('eliminar-btn');

    eliminarBtn.addEventListener('click', function () {
        fetch(`/eliminar-archivos?id=${id}`)
            .then(response => {
                return response.text();
            })
            .then(message => {
                window.location = "http://localhost:3000/index.html";
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.reload();
            });
    });
});