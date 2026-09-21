var foco = '';
var edad = 0;
var contadorClicks = 0;
var intentosCierre = 0;


window.onload = function() {
    var textoInfinito = "";
    for(var i = 0; i < 4000; i++) {
        textoInfinito += "Término " + i + ": Al aceptar esto cedes tus derechos. ";
    }
    document.getElementById('texto_largo').innerHTML = textoInfinito;

    var camposInteractivos = ['n1', 'clv', 'clv_conf', 'prefijo', 'telefono_resto', 'acepto', 'captcha', 'captcha_facil'];
    
    camposInteractivos.forEach(function(id) {
        var elemento = document.getElementById(id);
        if (elemento) {
            elemento.addEventListener('click', registrarClick);
        }
    });
};

function registrarClick() {
    contadorClicks++;
    if (contadorClicks % 3 === 0) {
        mostrarAnuncioPublicitario();
    }
}

function mostrarAnuncioPublicitario() {
    intentosCierre = 0;
    var anuncio = document.getElementById('anuncio_maldito');
    anuncio.style.transform = 'translate(-50%, -50%)';
    anuncio.style.top = '50%';
    anuncio.style.left = '50%';
    document.getElementById('btn_cerrar_anuncio').innerText = "CERRAR ANUNCIO";
    var mensaje = "¡Has ganado un premio de 1.000.000 de dólares! Haz clic aquí para reclamarlo <br><br><b>(Anuncio # " + (contadorClicks / 3) + ")</b>";
    document.getElementById('texto_anuncio').innerHTML = mensaje;
    anuncio.style.display = 'block';
}

function cerrarAnuncio() {
    intentosCierre++;
    var anuncio = document.getElementById('anuncio_maldito');

    if (intentosCierre === 1) {
        anuncio.style.transform = 'none'; 
        var maxX = window.innerWidth - anuncio.offsetWidth - 20;
        var maxY = window.innerHeight - anuncio.offsetHeight - 20;
        var randomX = Math.max(10, Math.floor(Math.random() * maxX));
        var randomY = Math.max(10, Math.floor(Math.random() * maxY));
        anuncio.style.left = randomX + 'px';
        anuncio.style.top = randomY + 'px';
        document.getElementById('btn_cerrar_anuncio').innerText = "¡FALLASTE, INTÉNTALO DE NUEVO!";
    } else {
        anuncio.style.display = 'none';
    }
}

function mostrarTeclado(campo) {
    foco = campo;
    document.getElementById('teclado_maldito').style.display = 'block';
}

function cerrarTeclado() {
    document.getElementById('teclado_maldito').style.display = 'none';
}

function tecla(caracter) {
    var caja = document.getElementById(foco);
    if(caja) {
        caja.value = caja.value + caracter;
        verificarPasswords();
    }
}

function borrarLetra() {
    var caja = document.getElementById(foco);
    if(caja && caja.value.length > 0) {
        caja.value = caja.value.slice(0, -1);
        verificarPasswords();
    }
}

function verificarPasswords() {
    var pass = document.getElementById('clv').value;
    var pass_conf = document.getElementById('clv_conf').value;
    var lblError = document.getElementById('mensaje_error_pass');

    if (pass_conf === "") {
        lblError.style.color = "#FF0000";
        lblError.innerHTML = "";
        return;
    }

    if (pass !== pass_conf) {
        lblError.style.color = "#FF0000";
        lblError.innerHTML = "¡No coinciden!";
    } else {
        lblError.style.color = "#00FF00"; // Se pone verde si ya coinciden
        lblError.innerHTML = " ¡Coinciden!";
    }
}

function tirarDado() {
    edad = Math.floor(Math.random() * 100) + 1;
    document.getElementById('edad_num').innerHTML = edad;
}

function actualizarTel() {
    var valor = document.getElementById('telefono_resto').value;
    while(valor.length < 7) { valor = "0" + valor; }
    document.getElementById('tel_display').innerHTML = valor;
}

function verificarScroll() {
    var caja = document.getElementById('tyc_contenedor');
    if(caja.scrollHeight - caja.scrollTop <= caja.clientHeight + 10) {
        document.getElementById('acepto').disabled = false;
    }
}

function soyBruto() {
    document.getElementById('area_integral').style.display = 'none';
    document.getElementById('area_facil').style.display = 'block';
}

function entrar() {
    if(document.getElementById('acepto').checked == false) {
        alert("¡TIENES QUE LEER Y ACEPTAR LOS TERMINOS HASTA EL FINAL!");
        return;
    }

    if(document.getElementById('area_facil').style.display == 'block') {
        if(document.getElementById('captcha_facil').value != "2") {
            alert("¿En serio no sabes cuanto es 1+1?");
            return;
        }
    } else {
        if(document.getElementById('captcha').value == "") {
            alert("¡Resuelve la integral o dale al boton!");
            return;
        }
    }

    var nom = document.getElementById('n1').value;
    var pass = document.getElementById('clv').value;
    var pass_conf = document.getElementById('clv_conf').value;
    var pre = document.getElementById('prefijo').value;
    var tel_resto = document.getElementById('tel_display').innerHTML;

    if (pass.length < 8) {
        alert("¡La clave secreta debe tener al menos 8 caracteres!");
        return;
    }

    if (pass !== pass_conf) {
        alert("¡Las contraseñas no coinciden!");
        return;
    }
    
    document.getElementById('pantalla1').style.display = 'none';
    document.getElementById('pantalla2').style.display = 'block';
    
    var info = "Nombre: " + nom + "<br>";
    info += "Edad (calculada en dias): " + (edad * 365) + "<br>";
    info += "Telefono completo: " + pre + "-" + tel_resto + "<br>";
    info += "Clave expuesta: " + pass;
    
    document.getElementById('info_robada').innerHTML = info;
}