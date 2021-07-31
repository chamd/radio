const music = new Audio();
var musicP = 0;
var listN = 0;

music.src = "./music/단콘/Airplane.mp3";

music.volume = 0.5;

lists(0);

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
    var num = mod
    var Mlist = listN

    if (mod == -1) {
      var Mlist = parseInt(Math.random() * 4);

      if (Mlist == 0) {var num = parseInt(Math.random() * data[0].eom.length);}
      else if (Mlist == 1) {var num = parseInt(Math.random() * data[1].ont.length);}
      else if (Mlist == 2) {var num = parseInt(Math.random() * data[2].ots.length);}
      else if (Mlist == 3) {var num = parseInt(Math.random() * data[3].otr.length);}

    }
    
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

function sound() {
  var sound = document.getElementById("sound").value;
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
        document.getElementById("songList").innerHTML += `<button id=\"songs\" onclick=\"change(${i})\">${data[list].eom[i].split(".mp3")[0]}</button><br id=\"songs\">`;
      }
    } else if (list == 1) {
      for (var i = 0; i < data[list].ont.length; i++) {
        document.getElementById("songList").innerHTML += `<button id=\"songs\" onclick=\"change(${i})\">${data[list].ont[i].split(".mp3")[0]}</button><br id=\"songs\">`;
      }
    } else if (list == 2) {
      for (var i = 0; i < data[list].ots.length; i++) {
        document.getElementById("songList").innerHTML += `<button id=\"songs\" onclick=\"change(${i})\">${data[list].ots[i].split(".mp3")[0]}</button><br id=\"songs\">`;
      }
    } else if (list == 3) {
      for (var i = 0; i < data[list].otr.length; i++) {
        document.getElementById("songList").innerHTML += `<button id=\"songs\" onclick=\"change(${i})\">${data[list].otr[i].split(".mp3")[0]}</button><br id=\"songs\">`;
      }
    }
  })  
}

music.addEventListener("ended", function(){
  music.currentTime = 0;
  change(-1);
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