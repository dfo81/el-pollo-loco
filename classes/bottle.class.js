class Bottle extends MovableObject {
    height = 72;
    width = 72;
    y = 350 + Math.random() * 20;
     offset = {
        top: 0,
        bottom: 40,
        left: 30,
        right: 30
    };

    IMAGE_BOTTLES = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x) {
        super();
        let randomIndex = Math.floor(Math.random() * this.IMAGE_BOTTLES.length);
        this.loadImage(this.IMAGE_BOTTLES[randomIndex]);
        this.x = x;
        this.otherDirection = Math.random() > 0.5;
    }
}

function createBottleLevel(count) {
    let bottles = [];
    let distance = 2000 / count; 

    for (let i = 0; i < count; i++) {
        let sectionStart = 400 + (i * distance); 
        let x = sectionStart + Math.random() * (distance - 50); 
        
        bottles.push(new Bottle(x));
    }
    return bottles;
}