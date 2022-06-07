console.log("welcome");
//variables
let songIndex = 1;
let audioElement = new Audio("./songs/1.mp3");
let timeAudioElement;
let masterPlay = document.getElementById("masterButton");
// let masterPlay = $("masterButton");
let masterSongName = document.getElementById("masterSongName");
// let masterSongName = $("masterSongName");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItems"));
let songs = [
  {
    songNmae: "Baari - Bilal Saeed", 
    filePath: "./songs/1.mp3",
    coverPath: "./covers/1.jpg",
  },
  {
    songNmae: "Uchiyan Dewaran - Bilal Saeed",
    filePath: "./songs/2.mp3",
    coverPath: "./covers/2.jpg",
  },
  {
    songNmae: "Suroor - Neha Kakkar,Bilal Saeed",
    filePath: "./songs/3.mp3",
    coverPath: "./covers/3.jpg",
  },
  {
    songNmae: "Come On, Eileen, Dexy's Midnight Runners.",
    filePath: "./songs/4.mp3",
    coverPath: "./covers/4.jpg",
  },
  {
    songNmae: "Johnny B. Goode, Chuck Berry.",
    filePath: "./songs/5.mp3",
    coverPath: "./covers/5.jpg",
  },
  {
    songNmae: "Darling Nikki, Prince.",
    filePath: "./songs/5.mp3",
    coverPath: "./covers/6.jpg",
  },
  {
    songNmae: "Me and Bobby McGee, Janis Joplin.",
    filePath: "./songs/7.mp3",
    coverPath: "./covers/7.jpg",
  },
  {
    songNmae: "Sweet Caroline, Neil Diamond.",
    filePath: "./songs/8.mp3",
    coverPath: "./covers/8.jpg",
  },
  {
    songNmae: "Billie Jean, Michael Jackson",
    filePath: "./songs/9.mp3",
    coverPath: "./covers/9.jpg",
  },
];
const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
  Array.from(document.getElementsByClassName("opacity")).forEach((element) => {
    // element.style.opacity="0";
    // console.log(element);
    element.style.opacity = "0";
  });
};

function playpause() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songNmae;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    document.getElementById(`${songIndex}`).classList.remove("fa-play-circle");

    document.getElementById(`${songIndex}`).classList.add("fa-pause-circle");
    document.getElementById("gif").style.opacity = "1";
    document.getElementById(`gif${songIndex}`).style.opacity = "1";
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    makeAllPlay();
    document.getElementById("gif").style.opacity = "0";
    document.getElementById(`gif${songIndex}`).style.opacity = "0";
  }
}

function forwardPlay() {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  makeAllPlay();
  document.getElementById(songIndex).classList.remove("fa-play-circle");
  document.getElementById(songIndex).classList.add("fa-pause-circle");
  audioElement.src = `./songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  document.getElementById(`gif${songIndex}`).style.opacity = "1";

  masterSongName.innerText = songs[songIndex - 1].songNmae;
  document.getElementById("gif").style.opacity = "1";
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
}

function backwardPlay() {
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  makeAllPlay();
  document.getElementById(songIndex).classList.remove("fa-play-circle");
  document.getElementById(songIndex).classList.add("fa-pause-circle");
  audioElement.src = `./songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  document.getElementById(`gif${songIndex}`).style.opacity = "1";

  masterSongName.innerText = songs[songIndex - 1].songNmae;
  document.getElementById("gif").style.opacity = "1";
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
}

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songNmae;
});
masterPlay.addEventListener("click", playpause);

audioElement.addEventListener("timeupdate", () => {
  progress = parseFloat(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, i) => {
    element.addEventListener("click", (e) => {
      // console.log(e.target);
      makeAllPlay();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `./songs/${songIndex}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      document.getElementById(`gif${songIndex}`).style.opacity = "1";
      masterSongName.innerText = songs[songIndex - 1].songNmae;
      document.getElementById("gif").style.opacity = "1";
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);
document.getElementById("forward").addEventListener("click", forwardPlay);
document.getElementById("backward").addEventListener("click", backwardPlay);
document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    playpause();
  }
});
document.addEventListener("keyup", (event) => {
  if (event.keyCode === 37) {
    backwardPlay();
  }
});
document.addEventListener("keyup", (event) => {
  if (event.keyCode === 39) {
    forwardPlay(); 
  }
});
document.addEventListener("keyup", (event) => {
  if (event.keyCode === 38) {
    if(audioElement.volume<1.0)
    {
      audioElement.volume+=0.1;
    }
  }
});
document.addEventListener("keyup", (event) => {
  if (event.keyCode === 40) {
    if(audioElement.volume>0.0)
    {
      audioElement.volume-=0.1;
    }
  }
});


