class Coins extends DrawableObject {
    height = 100;
    width = 100;

    constructor(x ,y){
        super();
        this.loadImage('assets/img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }
}

function createCoinsLevel(count) {
    let coins = [];
    for (let i = 0; i < count; i++) {
        let x = 500 + Math.random() * 2000;
        let y = 100 + Math.random() * 100; // Münzen schweben in der Luft
        coins.push(new Coins(x, y));
    }
    return coins;
}