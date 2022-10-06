

let N = 10;
let K = 10;
var player = 1;
let nimTable=[];

//Generacion del tablero NIM

function generateNimTable(N,K){

    tablero=[];
    for (let i=0; i<N ; i++){
        tablero.push(rellenar(K));
    }
    return tablero;
}

function rellenar(k){
    lista=[];
    random= Math.floor(Math.random() * k )+1;
    nimTable.push(random);
    return new Array(random);
}

var buttons = generateNimTable(N,K);


// Se crean y dibujan los botones


function setup() {
  createCanvas(1000, 1000);
  let color=255/N;
  // Ciclo para formatear la tabla
  for (let i = 0; i < buttons.length; i++) {

    for (let j = 0; j < buttons[i].length; j++) {
        
        buttons[i][j] = new Button(height/6 + 50*i,width/(1.33)-50*j, 10, 10,color);
    }
    color= color + 255/N;
  }
  
  terminarTurno = createButton('Terminar Turno');
  terminarTurno.position(width/(1.33),width/(1.33));
  terminarTurno.mousePressed(incrementarTurno);

  terminarTurno = createButton('Mejor Movimiento');
  terminarTurno.position(width/(1.33)+100,width/(1.33));
  terminarTurno.mousePressed(AImove);
}

function draw() {
  background(175);
  textSize(20);
  fill(50);

  text( "Jugador: "+player ,50,50);
  
  // Se muestran los botones
  for (let i = 0; i < buttons.length; i++) {
    for (let j = 0; j < buttons[i].length; j++) {
        buttons[i][j].display();
    }
  }

  //setTimeout(ayuda(),2);
  //encontrarMejorMovimiento();
}

function ayuda(){
  console.log('que esta pasando xD');
}

function mousePressed() {

  for (let i = 0; i < buttons.length; i++) {
    for (let j = 0; j < buttons[i].length; j++) {

        if(buttons[i][j].click(mouseX, mouseY)){
            buttons[i].pop();
            nimTable[i]--;
        }
    }
  }
}



function incrementarTurno(){
  player= (player==1)?2:1;
  console.log(nimTable);
  
  if (gameOver(nimTable)){
    
    let ganador = player;
    if(!alert('El player '+ ganador+' gano el juego\n'))
    {
      //window.location.reload();
      console.log('que weno jaja');
    }
  
    
  }

}

// funcion para saber si quedan piedras en la pila
function gameOver(tabla){
  let total=0;
  for (let i=0; i<tabla.length; i++){
    total += tabla[i];

  }
  
  return (total===0);
}

function AImove(){
  encontrarMejorMovimiento(nimTable, buttons, player);
  player= (player==1)?2:1;
}

//maximizado para el player 1
// implementacion minimax 

