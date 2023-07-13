class Caminante{

    constructor(){
        capacaminante = createGraphics(width, height);

        this.x = random( width );
        this.y = random( height );
        this.vel = 2;
        this.dir = random( TWO_PI );
        this.t = 10;
        push();
        colorMode(HSB,255,255,255,255);
        this.elColor = color( random(150,190),255,255,100);
        pop();
    }
     dibujarcapacam(){
        image(capacaminante, width / 2, height / 2);
     }
    


     dibujar( grafico ){
            grafico.push();
            grafico.noStroke();
            grafico.fill( this.elColor );
            grafico.ellipse( this.x , this.y , this.t , this.t );
            grafico.pop();
     }
    

    mover(){
        this.dir += radians( random(-4,3 ));
        this.x += this.vel * cos( this.dir );
        this.y += this.vel * sin( this.dir );

        this.x = (this.x > width ? this.x-width : this.x );
        this.x = (this.x < 0 ? this.x+width : this.x );
        this.y = (this.y > height ? this.y-height : this.y );
        this.y = (this.y < 0 ? this.y+height : this.y );
        
    }

}