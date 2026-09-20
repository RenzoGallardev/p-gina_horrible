var foco = '';
var edad = 0;

window.onload = function() {
    var textoInfinito = "";
    for(var i = 0; i < 4000; i++) {
        textoInfinito += "Término " + i + ": Al aceptar esto cedes tus derechos. ";
    }
    document.getElementById('texto_largo').innerHTML = textoInfinito;
};

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
    }
}

function borrarLetra() {
    var caja = document.getElementById(foco);
    if(caja && caja.value.length > 0) {
        caja.value = caja.value.slice(0, -1);
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
    var pre = document.getElementById('prefijo').value;
    var tel_resto = document.getElementById('tel_display').innerHTML;
    
    document.getElementById('pantalla1').style.display = 'none';
    document.getElementById('pantalla2').style.display = 'block';
    
    var info = "Nombre: " + nom + "<br>";
    info += "Edad (calculada en dias): " + (edad * 365) + "<br>";
    info += "Telefono completo: " + pre + "-" + tel_resto + "<br>";
    info += "Clave expuesta: " + pass;
    
    document.getElementById('info_robada').innerHTML = info;
}