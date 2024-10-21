$(document).ready(function () {
    let timer;
    let running = false;
    let startTime;
    let elapsedTime = 0;

    // Formatear el tiempo para mostrarlo
    function formatTime(ms) {
        let milliseconds = ms % 1000;
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);
        let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

        let formattedTime = (
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        );

        let formattedMilliseconds = (milliseconds < 100 ? "0" + (milliseconds < 10 ? "0" + milliseconds : milliseconds) : milliseconds);

        return {
            time: formattedTime,
            milliseconds: formattedMilliseconds
        };
    }

    // Iniciar el temporizador
    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            let formatted = formatTime(elapsedTime);
            $('#time').text(formatted.time);
            $('#milliseconds').text(formatted.milliseconds);
        }, 10);
    }

    // Detener el temporizador
    function stopTimer() {
        clearInterval(timer);
    }

    // Botón para iniciar/detener el cronómetro
    $('#startStopBtn').click(function () {
        if (!running) {
            startTimer();
            $(this).text('Stop').removeClass('start').addClass('stop');
        } else {
            stopTimer();
            $(this).text('Start').removeClass('stop').addClass('start');
        }
        running = !running;
    });

    // Botón para limpiar el cronómetro
    $('#clearBtn').click(function () {
        stopTimer();
        elapsedTime = 0;
        $('#time').text('00:00:00');
        $('#milliseconds').text('000');
        $('#startStopBtn').text('Start').removeClass('stop').addClass('start');
        running = false;
    });

    // Mostrar la pantalla del cronómetro
    $('#startAppBtn').click(function () {
        $('#welcomeScreen').addClass('hidden');
        $('#timerScreen').removeClass('hidden');
    });

    // Botón para volver a la pantalla de bienvenida
    $('#backBtn').click(function () {
        $('#timerScreen').addClass('hidden');
        $('#welcomeScreen').removeClass('hidden');
        stopTimer();
        elapsedTime = 0;
        $('#time').text('00:00:00');
        $('#milliseconds').text('000');
        $('#startStopBtn').text('Start').removeClass('stop').addClass('start');
        running = false;
    });
});
