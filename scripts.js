const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
    constructor(x, y, fontSize, canvasheight){
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasheight = canvasheight;
        this.text = '';
        this.char = 'xuijkl';
    }
    draw(ctx){
        this.text = this.char.charAt(Math.floor(Math.random() * this.char.length));
        ctx.fillStyle = '#0aff0a';
        ctx.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasheight){
            this.y = 0;
        }else {
            this.y += 1;
        }
    }
}


class Effect {
    constructor(canvaswidth, canvasheight){
        this.canvaswidth = canvaswidth;
        this.canvasheight = canvasheight;
        this.fontSize = 25;
        this.columns = this.canvaswidth / this.fontSize;
        this.symbols = [];
        this.#init();
    }
    #init(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasheight);
        }
    }
}

const effect = new Effect(canvas.width, canvas.height);

function animate(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    effect.symbols.forEach( a => a.draw(ctx));
    ctx.font = effect.fontSize + ('px monospace')
    requestAnimationFrame(animate);
}
animate();
