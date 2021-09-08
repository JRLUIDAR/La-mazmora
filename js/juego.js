var canvas;
var ctx;
var imgMonkey;
var mono;
var tileMap;
var enemigo=[];

var anchoF=50;
var altoF=50;



var escenario=[

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0],
    [0,2,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,0,2,0,0,0,0,0,2,2,2,2,0,0,0,0,2,0,0,0,0],
    [0,2,0,2,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,2,0,0,0,0,2,2,2,0,0],
    [0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,2,0,2,2,0,2,0,2,0,0],
    [0,2,0,2,0,0,0,0,0,2,0,2,2,2,2,2,2,2,2,2,2,0,2,0,0,2,0,2,2,0],
    [0,2,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,2,0,0,0,0],
    [0,2,0,0,2,0,0,0,0,2,2,2,0,0,0,0,0,2,2,2,2,2,2,0,0,2,0,0,0,0],
    [0,2,0,0,2,0,0,0,0,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
    [0,2,0,0,2,2,2,2,2,2,0,2,0,0,0,2,0,0,2,2,2,2,2,2,0,2,2,2,2,0],
    [0,2,2,2,2,0,0,0,0,2,0,2,0,0,0,2,0,0,0,0,0,0,0,2,0,2,0,0,0,0],
    [0,2,0,0,0,0,0,0,0,2,0,2,0,0,0,2,0,0,0,0,2,2,2,2,0,2,0,0,0,0],
    [0,2,0,0,0,2,2,2,2,2,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,0,0,0],
    [0,2,0,0,0,2,0,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,0,0,0],
    [0,2,0,3,2,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0],
    [0,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,2,0,0,2,0,0,0,0],
    [0,2,2,2,2,2,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2,0,0,2,0,0,0,0],
    [0,2,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,2,2,2,2,2,0,0,2,2,2,2,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
       
]

//metodo para dibujar el escenario,usamos dos bucles for para recorer todo el array
function dibujaEscenario(){
    
    for(y=0;y<20;y++){
        for(x=0;x<30;x++){

            var tile=escenario[y][x];// en esta variable guardaremos lo que hay en cada pos de la matriz un 0 ,..2,..etc
            ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);        
        }
    }

}

//class enemigo
var malo=function(x,y){
  this.x=x;
  this.y=y;
  console.log('enemigo creado');

  this.direccion=Math.floor(Math.random()*4);

  this.fotograma=0;

  //creamos un metodo que va a comprobar si hay colision
  this.colision=function(x,y){
      var choca=false;
      if(escenario[y][x]==0){
          choca=true;
      }
      return choca;
  }

  //creamos el metodo para moverse
  this.mover=function(){

    //comprobamos si el enemigo choca con el protagonista
   mono.colisionEnemigo(this.x,this.y);
     
   if(this.fotograma<50){
       this.fotograma++;
   }
   else{
       this.fotograma=0;
       //arriba
    if(this.direccion==0){
        if(this.colision(this.x,this.y-1)==false){
            this.y--;
        }else{
            this.direccion=Math.floor(Math.random()*4);
         
        }
    }

    //abajo
    if(this.direccion==1){
        if(this.colision(this.x,this.y+1)==false){
            this.y++;
        }else{
            this.direccion=Math.floor(Math.random()*4);
        }
    }

    //isquierda
    if(this.direccion==2){
        if(this.colision(this.x-1,this.y)==false){
            this.x--;
        }else{
            this.direccion=Math.floor(Math.random()*4);
        }
    }

    //derecha
    if(this.direccion==3){
        if(this.colision(this.x+1,this.y)==false){
            this.x++;
        }else{
            this.direccion=Math.floor(Math.random()*4);
        }
    }

   }
 

  }

  //creamos el metodo para dibujar 
  this.dibuja=function(){
    ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
 }

 
}


//creamos una plantilla para el protagonista
var monkey=function(){
    this.x=1;
    this.y=1;
    this.llave=false;

    //creamos el metodo para dibujar de este obj
    this.dibuja=function(){
       ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
    }

    //detectamos los margenes
    this.margenes=function(x,y){
        var colision=false;

        if(escenario[y][x]==0){
            colision=true;
        }
        return colision;
    }

    //creamos los metodos para moverse
    this.arriba=function(){
        if(this.margenes(this.x,this.y-1)==false){
        this.y--;
        this.obtenerLlave();
        }
    }

    this.abajo=function(){
        if(this.margenes(this.x,this.y+1)==false){
        this.y++;
        this.obtenerLlave();
        }
    }
    this.isquierda=function(){
        if(this.margenes(this.x-1,this.y)==false){
        this.x--;
        this.obtenerLlave();
        }
    }
    this.derecha=function(){
        if(this.margenes(this.x+1,this.y)==false){
        this.x++;
        this.obtenerLlave();
        }
    }

    //metodo para obtener la llave
    this.obtenerLlave=function(){
        var objeto=escenario[this.y][this.x];

        if(objeto==3){
            musicaLlave();
            this.llave=true;
            escenario[this.y][this.x]=2;      
        }

        if(objeto==1){
          this.victoria();    
        }       
    }
   

    //metodo victoria y resetemaos tod desde un principio
    this.victoria=function(){
        if(this.llave==true){
         musicaWin();
         alert('Victoria !!!');
           
        this.x=1;
        this.y=0;
        this.llave=false;
        escenario[15][3]=3;         
        } else{
            alert('No tines la llave');
        }   
    }

    //metodo colision enemigo
    this.colisionEnemigo=function(x,y){
        if(this.x==x && this.y==y){
            this.muerto();
        }
    }

      //metodo para muerte y reinicio 
      this.muerto=function(){
          gameOver();
          alert('Has muerto, jajajjajaja');
       location.reload();
           
    }

}

//ponemos el teclado a la escuccha
document.addEventListener('keydown',function(e){
    if(e.key=='ArrowUp'){
        mono.arriba();
    }
    if(e.key=='ArrowDown'){
        mono.abajo();
    }
    if(e.key=='ArrowLeft'){
        mono.isquierda();
    }
    if(e.key=='ArrowRight'){
        mono.derecha();
    }


})



//este sera el bucle principal, que se ejecutara una y otra ves
function inicializar(){
    canvas=document.getElementById('canvas');
    ctx=canvas.getContext('2d');
   
   tileMap=new Image();
   tileMap.src='img/tilemap.png';

    //instanciamos el protagonista
    mono=new monkey();

    //creamos los enemigos 
    enemigo.push(new malo(9,10));
    enemigo.push(new malo(25,15));
    enemigo.push(new malo(15,6));
    enemigo.push(new malo(20,1));
    enemigo.push(new malo(1,15));
    enemigo.push(new malo(11,14));
    enemigo.push(new malo(9,3));
    enemigo.push(new malo(25,10));
  
    tiempo();
    music();

    // llamara a la function principal en un interval defibido
    setInterval(function(){
        principal();
    },1000/50)

}


// boramos el canvas, solamanente reseteandole la dimension
function borrarCanvas(){
    canvas.width=1500;
    canvas.height=1000;
}

function principal(){
    //antes de dibujar algo nuevo lo primero deve borrar
    borrarCanvas();
    dibujaEscenario();
    mono.dibuja();  

    for(c=0;c<enemigo.length;c++){
        enemigo[c].mover();
        enemigo[c].dibuja();
    }
}

//musica
function music(){
    var myAudio = new Audio('src/music.ogg'); 
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    myAudio.play();
    var mute=document.getElementById('mute');
    var sound=false;

    mute.addEventListener('click',()=>{
        if(sound==false){
        myAudio.pause();
        sound=true;
        }else{
            myAudio.play();
            sound=false;
        }
        

    })
}


//musica llave conseguida
function musicaLlave(){
    var song = new Audio();
    song.src = 'src/llave.mp3';
    song.play();
    }

 //musica winner
function musicaWin(){
    var song = new Audio();
    song.src = 'src/win.wav';
    song.play();
    }

  function reload(){
      location.reload();
  } 

   //musica game over
function gameOver(){
    var song = new Audio();
    song.src = 'src/gameOver.mp3';
    song.play();
    }
  
 

  function tiempo(){
      var secundos=0;
      var minutos=0;
      
      setInterval(()=>{
          secundos++;
          document.getElementById('secundos').innerHTML=secundos;
          
     if(secundos==60){
         secundos=0;
         minutos++;
         document.getElementById('minutos').innerHTML=minutos;
     }

      },1000)
  }

   
  
 



