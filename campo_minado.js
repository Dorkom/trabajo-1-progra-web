function mover(accion, mapaActual, mapaMinas){
    acciones = ["up", "down", "left", "right"]
    //-----------------------------------------------------------------------------------------------------------
    //errores
    if(acciones.indexOf(accion) == -1){//si se presiona alguna otra tecla devuelve el mensaje
        return "error: accion no definida"
    }
    CARACTER_FIN = "@"
    if(mapaActual.indexOf(CARACTER_FIN) >= 0){//si el caracter de fin no se encuentra en mapaActual devuelve el mensaje
        return "error: no se puede ejecutar más acciones"
    }
    //aca se definen las matrices en las que se trabajara
    matrixActual = mapaActual.trim().split("\n")//el mapa actual se ingresa via consola o en nuestro caso via cuadro de texto o aleatoriamente
                                                //se eliminan los bordes y luego se divide en tres partes segun /n
                                                //matrixActual = [0000#,00000,00000,00000,+0000]

    matrixMinas = mapaMinas.trim().split("\n")  //el mapa de minas tmb se ingresa via texto o se generaria un mapa aleatoriamente
                                                //matrixMinas = [0000#,0$$$0,0$000,0$000,+$000]
    if(matrixActual.length == 0){
        return "error: mapa actual no puede ser vacío"
    }
    if(matrixMinas.length == 0){
        return "error: mapa minas no puede ser vacío"
    }

    //----------------------------------------------------------------------------------------------------------mapa
    rowsActual = matrixActual.length//numero de filas
    colsActual = matrixActual[0].length//numero de columnas
    for(i = 0; i < matrixActual.length; i++){
        if(matrixActual[i].length != colsActual){//si hay alguna fila con diferente numero de columnas
            return "error: dimensiones incorrectas para mapa actual"
        }
        matrixActual[i] = matrixActual[i].split("")
    }

    //----------------------------------------------------------------------------------------------------------minas
    rowsMinas = matrixMinas.length
    colsMinas = matrixMinas[0].length
    for(i = 0; i < matrixMinas.length; i++){
        if(matrixMinas[i].length != colsMinas){
            return "error: dimensiones incorrectas para mapa minas"
        }
    }
    if(rowsActual != rowsMinas || colsActual != colsMinas){
        return "error: dimesiones distintas para mapa actual y minas"
    }

    //-----------------------------------------------------------------------------------------------------------
    //aca empieza el codigo
    CARACTER_POSICION_ACTUAL = "+"
    x = -1
    y = -1
    for(i = 0; i < matrixActual.length; i++){
        x = matrixActual[i].indexOf(CARACTER_POSICION_ACTUAL)
        if(x >= 0){
            y = i
            break//se consigue la posicion del personaje y se anota la posicion del arreglo en que se encontro
        }
    }
    x0 = x
    y0 = y
    switch(accion){
        case 'up':
            y--
            break;
        case 'down':
            y++
            break;
        case 'left':
            x--
            break;
        case 'right':
            x++
            break;
    }
    if(x < 0){
        x = 0
    }
    if(x >= colsActual){
        x = colsActual - 1
    }
    if(y < 0){
        y = 0
    }
    if(y >= rowsActual){
        y = rowsActual - 1
    }
    
    CARACTER_MINA = "$"
    CARACTER_META = "#"
    CARACTER_VACIO = "0"
    if(CARACTER_MINA == matrixMinas[y][x]){
        matrixActual[y][x] = CARACTER_MINA
    }else if(CARACTER_META == matrixMinas[y][x]){
        matrixActual[y][x] = CARACTER_FIN
        matrixActual[y0][x0] = CARACTER_VACIO
    }else{
        //avanzar        
        matrixActual[y0][x0] = CARACTER_VACIO
        matrixActual[y][x] = CARACTER_POSICION_ACTUAL
    }
    result = []
    for(i = 0 ; i < matrixActual.length ; i++){
        result.push(matrixActual[i].join(""))
    }
    return result.join("\n")
}


function obtenerResultado(mapaActual, mapaPrevio){
    if(mapaActual == mapaPrevio){
        return "sin cambios"
    }
    if((mapaActual.match(/@/g) || []).length){
        return "fin"
    }
    minasActual = (mapaActual.match(/\$/g) || []).length
    minasPrevio = (mapaPrevio.match(/\$/g) || []).length
    if(minasActual > minasPrevio ){
        return "mina"
    }
    if(minasActual == minasPrevio ){
        return "sin mina"
    }    
}


function obtenerMatrixDeMapa(mapa){
    matrixMapa = mapa.trim().split("\n")
    for(i = 0; i < matrixMapa.length; i++){
        matrixMapa[i] = matrixMapa[i].split("")
    }
    return matrixMapa
}


var refrescar = function(){
//function refrescar(accion, mapaPrevio, mapaActual, mapaMinas){
    /*mapaActual = mover("up", mapaActual, mapaMinas)
    console.log(mapaActual)
    console.log(obtenerResultado(mapaActual, mapaPrevio))
    mapaPrevio = mapaActual*/

    var la_accion = this.innerHTML;

    mapaActual = mover(la_accion, mapaActual, mapaMinas);

    mapa_temp2 = mapaActual
    cuadro_temp2 = mapa_temp2.trim().split("\n");
    document.getElementById("uno").innerHTML = cuadro_temp2[0];
    document.getElementById("dos").innerHTML = cuadro_temp2[1];
    document.getElementById("tres").innerHTML = cuadro_temp2[2];
    document.getElementById("cuatro").innerHTML = cuadro_temp2[3];
    document.getElementById("cinco").innerHTML = cuadro_temp2[4];

    document.getElementById("cuadro_ayuda").innerHTML = obtenerResultado(mapaActual, mapaPrevio);
    mapaPrevio = mapaActual;
}
    //-----------------------------------------------------------------------------------------------------------

var main = function(){

mapaInicial = `
0000#
00000
00000
00000
+0000
`
mapaMinas = `
0000#
0$$$0
0$000
0$000
+$000
`
    mapaActual = mapaInicial;
    console.log(obtenerMatrixDeMapa(mapaActual))
    mapa_temp = mapaActual
    cuadro_temp = mapa_temp.trim().split("\n");
    document.getElementById("uno").innerHTML = cuadro_temp[0];
    document.getElementById("dos").innerHTML = cuadro_temp[1];
    document.getElementById("tres").innerHTML = cuadro_temp[2];
    document.getElementById("cuatro").innerHTML = cuadro_temp[3];
    document.getElementById("cinco").innerHTML = cuadro_temp[4];
    mapaPrevio = mapaActual;

    console.log(obtenerMatrixDeMapa(mapaActual));
    

    /*document.getElementById("boton_arriba").addEventListener("click",refrescar("up", mapaPrevio, mapaActual, mapaMinas));
    document.getElementById("boton_abajo").addEventListener("click",refrescar("down", mapaPrevio, mapaActual, mapaMinas));
    document.getElementById("boton_izquierda").addEventListener("click",refrescar("left", mapaPrevio, mapaActual, mapaMinas));
    document.getElementById("boton_derecha").addEventListener("click",refrescar("right", mapaPrevio, mapaActual, mapaMinas));
    */

}
var main2 = function(){
    /*
    console.log(obtenerMatrixDeMapa(mapaActual));
    document.getElementById("boton_arriba").addEventListener("click",refrescar("up", mapaPrevio, mapaActual, mapaMinas));
    document.getElementById("boton_abajo").addEventListener("click",refrescar("down", mapaPrevio, mapaActual, mapaMinas));
    document.getElementById("boton_izquierda").addEventListener("click",refrescar("left", mapaPrevio, mapaActual, mapaMinas));
    document.getElementById("boton_derecha").addEventListener("click",refrescar("right", mapaPrevio, mapaActual, mapaMinas));
    console.log(obtenerMatrixDeMapa(mapaActual));*/
    document.getElementById("boton_arriba").addEventListener("click",refrescar);
    document.getElementById("boton_abajo").addEventListener("click",refrescar);
    document.getElementById("boton_izquierda").addEventListener("click",refrescar);
    document.getElementById("boton_derecha").addEventListener("click",refrescar);
}
window.addEventListener("load",main)
document.getElementById("boton_iniciar").addEventListener("click",main2)

    //-----------------------------------------------------------------------------------------------------------
//ejemplo
/*mapaInicial = `
0000#
00000
00000
00000
+0000
`
mapaMinas = `
0000#
0$$$0
0$000
0$000
+$000
`
mapaActual = mapaInicial
console.log(mapaActual)
mapaPrevio = mapaActual

mapaActual = mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual

mapaActual = mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual

mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual

mapaActual = mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual

mapaActual = mover("up", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual

mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual

mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual

mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
mapaPrevio = mapaActual

mapaActual = mover("right", mapaActual, mapaMinas)
console.log(mapaActual)
console.log(obtenerResultado(mapaActual, mapaPrevio))
// 
console.log(obtenerMatrixDeMapa(mapaActual))*/
