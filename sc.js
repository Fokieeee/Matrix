const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class  Symbol {
    constructor(x, y, fontSize, canvasHeight){
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♔♕♖♗♘♙❅❄';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() < 0.01){
            this.y = 0;
        }else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 15;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#init();
    }
    #init(){
        for ( let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#init();
    }
}

const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 200,canvas.width/2, canvas.height/2, 1000 );
gradient.addColorStop(0.1, 'blue');
gradient.addColorStop(0.02, 'burlyWood');
gradient.addColorStop(0.3, 'red');
gradient.addColorStop(0.35, 'white');
gradient.addColorStop(0.75, 'red');
gradient.addColorStop(0.8, 'green');

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 20;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        ctx.fillStyle = 'rgba(0,0,0,0.02)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height,);
        ctx.fillStyle = gradient;
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    }else{
        timer += deltaTime;
    }
    
    requestAnimationFrame(animate);
}
 animate(0);
 window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width,canvas.height);
 });
