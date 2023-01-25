//initial Date=====

//Essa variavel vai armazenar a cor atual
let currentColor = 'black';

//essa variavel vai determinar se eu posso ou nao desenha
let canDraw = false

//a posicao do mouses
let mouseX = 0;
let mouseY = 0

let screen = document.querySelector('#tela');
//Estou pegando a canvas e criando um abiente e 2d
let ctx = screen.getContext('2d')

//Events======

/*Aquii Estamos seleconado todas as divs qye tem a class (.color) e adicionando um evento de clique neles*/
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
})

/**Estou adicionando um evento quando o mouse é clicado, e quando for clicado, vai entra na função */
screen.addEventListener('mousedown', mouseDownEvent)
/**Estou adicionando um evento quando o mouse é movido, e quando for movido, vai entra na função */
screen.addEventListener('mousemove', mouseMoveEvent)
/**Estou adicionando um evento quando o mouse é solto, e quando for solto, vai entra na função */
screen.addEventListener('mouseup', mouseUpEvent)

document.querySelector('.clear').addEventListener('click', clearScreen)
//Function=====

function colorClickEvent(e) {
    /**Estou pegando o atributo da div que eu estou clicando ex: data-color='blue'  */
    let color = e.target.getAttribute('data-color');

    currentColor = color;

    /**Estou removendo a class (active) da cor atiga e passando a class (active) para a cor atual */
    document.querySelector('.color.active').classList.remove('active')
    e.target.classList.add('active')
}

function mouseDownEvent(e) {
    /**Qaundo eu clicar, vou poder desenhar */
    canDraw = true;

     /**Aqui to pegando a posição do mouse referente a tela e subtraindo pelo (screen) a tela do canvas e colocando na variavis mouseX/mouseY*/
     mouseX = e.pageX - screen.offsetLeft;
     mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if(canDraw){
       draw(e.pageX, e.pageY)
    }
}

function mouseUpEvent() {
    /**Qaundo solta o click, nao vou poder desenhar */
    canDraw =  false
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    ctx.beginPath();
    //O tamanho da linha
    ctx.lineWidth = 5;
    //formato da linha
    ctx.lineJoin = "round";
    //posição inicia do mouse
    ctx.moveTo(mouseX, mouseY);
    //vai fazer a linha até
    ctx.lineTo(pointX, pointY)
    //acaba com o poseçao de desenha
    ctx.closePath();
    //a cor que eu quero que seja a linha
    ctx.strokeStyle = currentColor;
    //vai finalizar todo o processo
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    // vai zero o curso e o processo de desenho
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    //vai limpa 
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}