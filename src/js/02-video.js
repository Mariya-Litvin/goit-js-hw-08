import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function (data) {
  duration: 61.857;
  percent: 0.049;
  seconds: 3.034;

  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
