const music = new Audio();
var musicP = 0;
var listN = 0;
var muted = 0;
var npL = 0;
var np = 0;
var repeat = 0;

music.src = "./music/단콘/Airplane.mp3";

music.volume = 0.5;

lists(0);
timeStart();

function play() {
  if (musicP == 0) {
    stop();
    music.play();
    musicP = 1;
  } else if (musicP == 1) {
    document.getElementById("play").style.width = "0";
    document.getElementById("play").style.height = "0";
    document.getElementById("play").style.border = "none";
    document.getElementById("play").style.borderTop = "24px solid transparent";
    document.getElementById("play").style.borderLeft = "45px solid #686868";
    document.getElementById("play").style.borderBottom = "24px solid transparent";
    document.getElementById("play").style.backgroundColor = "white";
    document.getElementById("play").style.marginLeft = "15px";
    music.pause();
    musicP = 0;
  }
}

function change(mod) {

  stop();

  music.pause();

  $.getJSON('songs.json', function (data) {
    var num = mod;
    var Mlist = listN;

    if (mod == -1) {
      Mlist = parseInt(Math.random() * 4);

      if (Mlist == 0) { num = parseInt(Math.random() * data[0].eom.length); }
      else if (Mlist == 1) { num = parseInt(Math.random() * data[1].ont.length); }
      else if (Mlist == 2) { num = parseInt(Math.random() * data[2].ots.length); }
      else if (Mlist == 3) { num = parseInt(Math.random() * data[3].otr.length); }

    } else if (mod == -2) {
      Mlist = npL;
      num = np;
    }

    npL = Mlist;
    np = num;

    if (Mlist == 0) {
      music.src = `./music/단콘/${data[0].eom[num]}`;
      document.getElementById("songTitle").textContent = data[0].eom[num].split(".mp3")[0];
    } else if (Mlist == 1) {
      music.src = `./music/오나이릭/${data[1].ont[num]}`;
      document.getElementById("songTitle").textContent = data[1].ont[num].split(".mp3")[0];
    } else if (Mlist == 2) {
      music.src = `./music/원더스토리/${data[2].ots[num]}`;
      document.getElementById("songTitle").textContent = data[2].ots[num].split(".mp3")[0];
    } else if (Mlist == 3) {
      music.src = `./music/기타/${data[3].otr[num]}`;
      document.getElementById("songTitle").textContent = data[3].otr[num].split(".mp3")[0];
    }

    music.play();
    musicP = 1;
  })
}

function sound(sound) {
  var volume = parseInt(sound) / 100
  music.volume = volume;
}

function lists(list) {

  listN = list;

  while (document.getElementById("songs")) {
    document.getElementById("songs").remove();
  }
  $.getJSON('songs.json', function (data) {
    if (list == 0) {
      for (var i = 0; i < data[list].eom.length; i++) {
        document.getElementById("songList").innerHTML += `<button class=\"color0\" id=\"songs\" onclick=\"change(${i})\">${data[list].eom[i].split(".mp3")[0]}</button><br id=\"songs\">`;
      }
    } else if (list == 1) {
      for (var i = 0; i < data[list].ont.length; i++) {
        document.getElementById("songList").innerHTML += `<button class=\"color1\" id=\"songs\" onclick=\"change(${i})\">${data[list].ont[i].split(".mp3")[0]}</button><br id=\"songs\">`;
      }
    } else if (list == 2) {
      for (var i = 0; i < data[list].ots.length; i++) {
        document.getElementById("songList").innerHTML += `<button class=\"color2\" id=\"songs\" onclick=\"change(${i})\">${data[list].ots[i].split(".mp3")[0]}</button><br id=\"songs\">`;
      }
    } else if (list == 3) {
      for (var i = 0; i < data[list].otr.length; i++) {
        document.getElementById("songList").innerHTML += `<button class=\"color3\" id=\"songs\" onclick=\"change(${i})\">${data[list].otr[i].split(".mp3")[0]}</button><br id=\"songs\">`;
      }
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

function stop() {
  document.getElementById("play").style.width = "20px";
  document.getElementById("play").style.height = "50px";
  document.getElementById("play").style.border = "none";
  document.getElementById("play").style.borderLeft = "15px solid #686868";
  document.getElementById("play").style.borderRight = "15px solid #686868";
  document.getElementById("play").style.backgroundColor = "white";
  document.getElementById("play").style.marginLeft = "0";
}

function mute() {
  if (muted == 0) {
    document.getElementById("volume").src = "./img/mute.png";
    music.muted = true;
    muted = 1;
  } else {
    document.getElementById("volume").src = "./img/volume.png";
    music.muted = false;
    muted = 0;
  }
}

function time() {

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

  document.getElementById("time").textContent = `${time.timeM}:${time.timeS}/${time.durationM}:${time.durationS}`;
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
