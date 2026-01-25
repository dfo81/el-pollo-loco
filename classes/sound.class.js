class Sound {
    constructor(src, volume = 1, loop = false){
        this.audio = new Audio(src);
        this.audio.volume = volume;
        this.audio.loop = loop;
    }

    play() {
        if (this.audio.paused) {
            this.audio.play().catch(e => {});
        }
    }

    playFromStart() {
        this.audio.currentTime = 0;
        this.audio.play().catch(e => {});
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    pause() {
        this.audio.pause();
    }
}