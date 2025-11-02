class World {
    character = new Character();
    enemies = [ new Chicken(), new Chicken(), new Chicken];
    clouds = [ new Cloud(), new Cloud(), new Cloud(), new Cloud() ]
    backgrounds = [
        new Background('assets/img/5_background/layers/air.png', 720),
        new Background('assets/img/5_background/layers/3_third_layer/1.png', 720),
        new Background('assets/img/5_background/layers/2_second_layer/1.png', 720),
        new Background('assets/img/5_background/layers/1_first_layer/1.png', 720)];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgrounds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        self = this; // draw wird immer wieder aufgerufen
        requestAnimationFrame(function(){
            self.draw(); // this funktioniert hier nicht daher self
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });   
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}