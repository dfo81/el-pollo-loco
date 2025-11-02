class Background extends MovableObject {
    x = 0;
    y = 0;
    height = 480;

    constructor(imapgePath, width) {
        super().loadImage(imapgePath);
        this.width = width;
    }
}