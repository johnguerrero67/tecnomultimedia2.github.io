class Trazos{

constructor(){
    graphics = createGraphics(900, 500);
  
}
dibujarcapa1(){
    image(graphics, width / 2, height / 2);
    imageMode(CENTER);
    //background(fondos[A], width / 2, height / 2, width, height);
}
movdiagonal(){
    if (haySonido) {
        // ACA SE HACE LO DE LAS FIGURAS EN DIAGONAL
        
       
      }
}


  

dibtrazos(){
   // let frec = map(frecuencia, FREC_MIN, FREC_MAX, 0,haySonido,true); //true
let frec = map(gestorPitch.filtrada, 0, 1, FREC_MIN, FREC_MAX); //Mapeo para la frecuencia
    // IMAGENES CON FRECUENCIA CON AGUDAS SE MUEVEN A LA DER Y CON GRAVES A IZQ
image(trazos[43],frec+width/2,height/2, 600,500);
image(trazos[1], 500, 120+frec, 400, 200); //00 // fig rulo naranja  
image(trazos[2], 60+frec, 100, 50, 50); // 01 // DE IZQ A DER
image(trazos[12], 550-frec, 500, 200, 100); // rulo rojo
image(trazos[11], 150+frec, 400, 300, 300); // ziz zag azul oscuro
image(trazos[35], 700 , 400-frec, 100, 100);
image(trazos[40], 150, 300-frec, 100, 100);
image(trazos[32], width/2, height/2+frec,90,90);
image(trazos[13], frec+800, 200, 100, 100);
image(trazos[37], 800, frec-550, 80, 80);


}

rotacionFig(){
// IMAGENES QUE ROTAN A LAS ESQUINAS, SOLO APARECEN CUANDO NO HAY SONIDO
push()
translate(100,100); // ESQUINA SUPERIOR IZQUIERDA
rotate(radians(frameCount * 3))
image(trazos[8], 0,0, 100, 100); //02 //DE ARRIBA A ABAJO x: 200, y:100
pop()

push()
translate(100, 550); //ESQUINA INFERIOR IZQUIERDA
rotate(radians(frameCount))
image(trazos[5], 0,0, 50, 100); //09 //DE DER A IZQ
pop()

push()
translate(800, 100); //ESQUINA SUPERIOR DERECHA
rotate(radians(frameCount))
image(trazos[9], 0,0, 50, 100); //09 //DE DER A IZQ
pop()

push()
translate(800, 550); //ESQUINA INFERIOR DERECHA
rotate(radians(frameCount * 3))
image(trazos[14], 0,0, 50, 100); //09 //DE DER A IZQ
pop();
//console.log("el caminante camina");


}

}