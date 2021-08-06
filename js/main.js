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
timeStart();

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

        document.getElementById("art").src = `./img/${Mlist}.jpg`;
        music.src = `./music/${Mlist}/${data[Mlist][Mlist][num]}`;
        document.getElementById("songTitle").textContent = data[Mlist][Mlist][num].split(".mp3")[0];

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

function time() {

    var nbsp = "\u2003\u2003\u2003\u2003"

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

    document.getElementById("duration").max = time.duration;
    document.getElementById("duration").value = time.time;

    if (0 <= time.timeS && time.timeS <= 9) {
        document.getElementById("time-time").textContent = `${time.timeM}:0${time.timeS}`
    } else {
        document.getElementById("time-time").textContent = `${time.timeM}:${time.timeS}`
    } if (0 <= time.durationM && time.durationS <= 9) {
        document.getElementById("time-duration").textContent = `${time.durationM}:0${time.durationS}`
    } else {
        document.getElementById("time-duration").textContent = `${time.durationM}:${time.durationS}`
    }
}

function timeStart() {
    setInterval(function () {
        time();
    }, 1000);
}

function raore() {
    if (repeat == 0) {
        repeat = 1;
    } else {
        repeat = 0;
    }
}

function closeL() {
    document.getElementById("eom").style.borderTopRightRadius = "30px";
    document.getElementById("otr").style.borderBottomRightRadius = "30px";

    var e = document.querySelectorAll(".sbtn");
    for (var i = 0; i < e.length; i++) {
        e[i].style.transition = ".5s";
        e[i].style.width = "500px";
        e[i].style.height = "70px";
        e[i].style.borderRight = "2px solid black";
        e[i].style.transform = `translate(0, 0)`;
        setTimeout(() => {
            document.getElementById("eom").textContent = "Eyes On Me";
            document.getElementById("ont").textContent = "Oneiric Theater";
            document.getElementById("ots").textContent = "One The Story";
            document.getElementById("otr").textContent = "Others";
        }, 100);
    }

    closeLl();

    document.getElementById("art").style.marginBottom = "30px";
    document.getElementById("art").style.height = "200px";

    close = 1;

}

function openL() {
    document.getElementById("eom").style.borderTopRightRadius = "0";
    document.getElementById("otr").style.borderBottomRightRadius = "0";

    var e = document.querySelectorAll(".sbtn");
    for (var i = 0; i < e.length; i++) {
        e[i].style.transition = ".5s";
        e[i].style.width = "60px";
        e[i].style.height = "100px";
        e[i].style.borderRight = "none";
        e[i].style.transform = `translate(-280px, ${i * 30}px)`;
        setTimeout(() => {
            document.getElementById("eom").textContent = "EOM";
            document.getElementById("ont").textContent = "ONT";
            document.getElementById("ots").textContent = "OTS";
            document.getElementById("otr").textContent = "OTR";
        }, 50);
    }

    var e = document.querySelectorAll("button#songs");
    for (var i = 0; i < e.length; i++) {
        e[i].style.transition = ".4s";
        e[i].style.width = "400px";
        e[i].style.transform = `translateY(-${i * 50}px)`;
        setTimeout(timeL, 100, e, i);
    }

    document.getElementById("art").style.marginBottom = "0px";
    document.getElementById("art").style.height = "0px";
    document.getElementById("art").style.transition = "0.5s";

    close = 0;
}

function timeL(e, i) {
    e[i].style.width = "500px";
    e[i].style.transform = `translateY(0)`;
    document.getElementById("close").style.transform = "translateX(0)";
    document.getElementById("close").style.transition = ".4s";
}

function closeLl() {

    document.getElementById("close").style.transform = "translateX(-50px)";

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