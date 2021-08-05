function play() {
    if (musicP == 0) {
        stop();
        music.play();
        musicP = 1;
    } else if (musicP == 1) {
        document.querySelector(".play1").style.clipPath = "polygon(0 0, 50% 25%, 50% 75%, 0% 100%)";
        document.querySelector(".play2").style.clipPath = "polygon(50% 25%, 100% 50%, 100% 50%, 50% 75%)";    
        music.pause();
        musicP = 0;
    }
}

function stop() {
    document.querySelector(".play1").style.clipPath = "polygon(0 0, 30% 0, 30% 100%, 0% 100%)";
    document.querySelector(".play2").style.clipPath = "polygon(70% 0, 100% 0, 100% 100%, 70% 100%)";
}
