function play() {
    if (musicP == 0) {
        stop();
        music.play();
        musicP = 1;
    } else if (musicP == 1) {
        $(".play2").css("transform", "translate(30px, 8px) rotate(-57deg)")
        $(".play3").css("transform", "translate(30px, 22px) rotate(57deg)")
        $(".play1").css("height", "30px")
        music.pause();
        musicP = 0;
    }
}

function stop() {
    $(".play").css("transition", ".3s")
    $(".play2").css("transform", "translate(34px, 15px) rotate(0deg)")
    $(".play3").css("transform", "translate(19.5px, 15px) rotate(0deg)")
    $(".play1").css("height", "0px")
}
