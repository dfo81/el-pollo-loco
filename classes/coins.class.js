class Coins extends DrawableObject {
    height = 100;
    width = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 30,
        right: 30
    };

    constructor(x ,y){
        super();
        this.loadImage('assets/img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }
}

function createCoinsLevel(totalPatterns) {
    let allCoins = [];
    for (let i = 0; i < totalPatterns; i++) {
        let x = 200 + (i * 400); 
        let type = Math.random();

        if (type < 0.33) {
            allCoins.push(...createCoinRow(x, 300, 4));
        } else if (type < 0.66) {
            allCoins.push(...createCoinBlock(x, 150, 2, 1));
        } else {
            allCoins.push(...createCoinDiagonal(x, 350, 4, -1));
        }
    }
    return allCoins;
}

function createCoinRow(startX, startY, count) {
    let row = [];
    for (let i = 0; i < count; i++) {
        row.push(new Coins(startX + (i * 60), startY));
    } 
    return row;
}

function createCoinDiagonal(startX, startY, count, directionY = -1) {
    let diag = [];
    for (let i = 0; i < count; i++) {
        diag.push(new Coins(startX + (i * 60), startY + (i * 40 * directionY)));
    }
    return diag;
}

function createCoinBlock(startX, startY, columns, rows) {
    let block = [];
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            block.push(new Coins(startX + (c * 60), startY + (r * 60)));
        }
    }
    return block;
}