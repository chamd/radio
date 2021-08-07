const music = new Audio();
var musicP = 0;
var listN = 0;
var muted = 0;
var npL = 0;
var np = 0;
var repeat = 0;
var close = 1;

music.src = "./music/0/Airplane.mp3";

music.volume = 0.1;

lists(0, 0);

function change(mod) {

    stop();

    music.pause();

    $.getJSON('songs.json', function (data) {
        var num = mod;
        var Mlist = listN;

        if (mod == -1) {
            Mlist = parseInt(Math.random() * 4);
            num = parseInt(Math.random() * data[Mlist][Mlist].length);

        } else if (mod == -2) {
            Mlist = npL;
            num = np;
        }

        npL = Mlist;
        np = num;

        $("#art").attr("src", `./img/${Mlist}.jpg`);
        music.src = `./music/${Mlist}/${data[Mlist][Mlist][num]}`;
        $("#songTitle").text(data[Mlist][Mlist][num].split(".mp3")[0]);

        music.play();
        musicP = 1;
    })
}

function lists(list, c) {

    listN = list;

    while (document.getElementById("songs")) {
        document.getElementById("songs").remove();
    }
    $.getJSON('songs.json', function (data) {
        for (var i = 0; i < data[list][list].length; i++) {
            document.getElementById("songList").innerHTML += `<button class=\"color${list}\" id=\"songs\" onclick=\"change(${i})\">${data[list][list][i].split(".mp3")[0]}</button><br id=\"songs\">`;
        }

        if (close == 1 && c == 1) {
            openL();
        } else if (close == 1 && c == 0) {
            closeLl();
        }

    })
}

music.addEventListener("ended", function () {
    music.currentTime = 0;
    if (repeat == 0) {
        change(-1);
    } else {
        change(-2);
    }
});

function mute() {
    switch (muted) {
        case 0:
            document.getElementById("volume").classList.remove("bx-volume");
            document.getElementById("volume").classList.add("bx-volume-low");
            muted++;
            music.volume = 0.3;
            break;
        case 1:
            document.getElementById("volume").classList.remove("bx-volume-low");
            document.getElementById("volume").classList.add("bx-volume-full");
            muted++;
            music.volume = 0.5;
            break;
        case 2:
            document.getElementById("volume").classList.remove("bx-volume-full");
            document.getElementById("volume").classList.add("bx-volume-mute");
            muted++;
            music.volume = 0;
            break;
        case 3:
            document.getElementById("volume").classList.remove("bx-volume-mute");
            document.getElementById("volume").classList.add("bx-volume");
            muted = 0;
            music.volume = 0.1;
            break;
    }
}

music.addEventListener("timeupdate", () => {
    var time = {
        "time": parseInt(music.currentTime),
        "duration": parseInt(music.duration)
    }

    time = {
        "time": parseInt(music.currentTime),
        "duration": parseInt(music.duration),
        "timeM": parseInt(time.time / 60),
        "timeS": time.time % 60,
        "durationM": parseInt(time.duration / 60),
        "durationS": time.duration % 60
    }

    $("#progressTime").css("width", `${music.currentTime * 400 / music.duration}px`);

    if (0 <= time.timeS && time.timeS <= 9) {
        $("#time-time").text(`${time.timeM}:0${time.timeS}`);
    } else {
        $("#time-time").text(`${time.timeM}:${time.timeS}`);
    } if (0 <= time.durationM && time.durationS <= 9) {
        $("#time-duration").text(`${time.durationM}:0${time.durationS}`);
    } else {
        $("#time-duration").text(`${time.durationM}:${time.durationS}`);
    }

})

function raore() {
    if (repeat == 0) {
        repeat = 1;
    } else {
        repeat = 0;
    }
}

function closeL() {
    $("#eom").css("border-top-right-radius", "30px");
    $("#otr").css("border-bottom-right-radius", "30px");

    var e = document.querySelectorAll(".sbtn");
    for (var i = 0; i < e.length; i++) {
        e[i].style.transition = ".5s";
        e[i].style.width = "500px";
        e[i].style.height = "70px";
        e[i].style.borderRight = "2px solid black";
        e[i].style.transform = `translate(0, 0)`;
        setTimeout(() => {
            $("#eom").text("Eyes On Me");
            $("#ont").text("Oneiric Theater");
            $("#ots").text("One The Story");
            $("#otr").text("Others");
        }, 100);
    }

    closeLl();

    $("#art").css("margin-bottom", "30px");
    $("#art").css("height", "200px");

    close = 1;

}

function openL() {
    $("#eom").css("border-top-right-radius", "0px");
    $("#otr").css("border-bottom-right-radius", "0px");

    var e = document.querySelectorAll(".sbtn");
    for (var i = 0; i < e.length; i++) {
        e[i].style.transition = ".5s";
        e[i].style.width = "60px";
        e[i].style.height = "100px";
        e[i].style.borderRight = "none";
        e[i].style.transform = `translate(-280px, ${i * 30}px)`;
        setTimeout(() => {
            $("#eom").text("EOM");
            $("#ont").text("ONT");
            $("#ots").text("OTS");
            $("#otr").text("OTR");
        }, 50);
    }

    var e = document.querySelectorAll("button#songs");
    for (var i = 0; i < e.length; i++) {
        e[i].style.transition = ".4s";
        e[i].style.width = "400px";
        e[i].style.transform = `translateY(-${i * 50}px)`;
        setTimeout(timeL, 100, e, i);
    }

    $("#art").css("margin-bottom", "0px");
    $("#art").css("height", "0px");
    $("#art").css("transition", ".5s");

    close = 0;
}

function timeL(e, i) {
    e[i].style.width = "500px";
    e[i].style.transform = `translateY(0)`;
    $("#close").css("transform", "translateX(0)");
    $("#close").css("transition", ".4s");

}

function closeLl() {

    $("#close").css("transform", "translateX(-50px)");

    var e = document.querySelectorAll("button#songs");
    for (var i = 0; i < e.length; i++) {
        e[i].style.transition = ".4s";
        e[i].style.width = "400px";
        e[i].style.transform = `translateY(-${i * 50}px)`;
        setTimeout(() => {
            document.querySelector("button#songs").textContent = "";
        }, 400);
    }
}