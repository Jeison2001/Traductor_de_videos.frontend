
$(document).ready(function () {
    $('#file-upload').on('change', function () {
        var fileDetails = $('#file-details');
        var fileInput = $(this)[0];
        var fileName = fileInput.files[0].name;
        var fileSize = fileInput.files[0].size;
        if (this.files.length > 0) {
            $('#file-name span').text(fileName);
            $('#file-size span').text(fileSize);
            fileDetails.css('display', 'block');
        } else {
            fileDetails.css('display', 'none');
        }
    });

    // Evento para cargar un video
    $('#submit-button').on('click', function () {
        var fileInput = $('#file-upload')[0].files[0];

        if (fileInput) {
            var formData = new FormData();
            formData.append('file', fileInput);

            $.ajax({
                url: 'http://127.0.0.1:80/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    // Aquí puedes manejar la respuesta si es necesario
                    var fileDetails = $('#file-details');
                    fileDetails.css('display', 'none');
                }
            });
        } else {
            alert('Selecciona un video antes de cargarlo.');
        }
    });

    // Evento para actualizar la tabla de archivos
    $('#update-button').on('click', function () {
        $.ajax({
            url: 'http://127.0.0.1:80/list',
            type: 'GET',
            success: function (data) {
                // Limpiar la tabla antes de actualizar
                $('table tr:gt(0)').remove();

                // Iterar a través de la lista de archivos en 'files'
                data.files.forEach(function (item) {
                    var row = '<tr>' +
                        '<td>' + item[1] + '</td>' +  // El segundo elemento es la descripción/nombre
                        '<td><a href="' + item[2] + '" download>Descargar</a></td>' +  // El tercer elemento es la URL
                        '<td><button class="play-button" data-url="' + item[2] + '">Reproducir</button></td>' +
                        '</tr>';
                    $('table').append(row);
                });
            }
        });
    });

    // Nuevo evento para reproducir el video
    $('table').on('click', '.play-button', function () {
        var videoUrl = $(this).data('url');
        var videoPlayer = $('<video controls><source src="' + videoUrl + '" type="video/mp4">Tu navegador no soporta el elemento de video.</video>');
        $('#video-wrapper').empty().append(videoPlayer);
        $('#video-player-container').fadeIn();
    });

    // Evento para cerrar el video
    $('#close-button').on('click', function() {
        $('#video-wrapper').empty(); // Eliminar el reproductor de video
        $('#video-player-container').fadeOut(); // Ocultar el contenedor
    });

});
