/* 1 - Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* 2 - Build our functions */
function togglePlay() {
  if(video.paused){
    video.play();
  } else {
    video.pause();
  }
};

function updateButton(){
  if(this.paused){
    toggle.textContent = '▶';
  } else {
    toggle.textContent = '❚ ❚';
  }
};

function skip(){
  let time = parseFloat(this.dataset.skip);
   video.currentTime += time;
};

function handleRangeUpdate(){
  video[this.name] = this.value;
};

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};


function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
};

/* 3- Write the event listeners */
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
})

ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
})

ranges.forEach(range => {
  range.addEventListener('mousemove', handleRangeUpdate);
})

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove',(e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);


/* Fullscreen challenge */

const fullscreen = document.querySelector('.fullscreen')

function fullScreenVideo(){
  video.requestFullscreen();
};

fullscreen.addEventListener('click', fullScreenVideo);

