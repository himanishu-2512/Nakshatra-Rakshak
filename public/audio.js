Howler.volume(0.5)
const audio = {
  backgroundMusic: new Howl({
    src: './audio/gamebgm.mp3',
    loop: true
  }),
  bomb: new Howl({
    src: './audio/bomb.mp3'
  }),
  bonus: new Howl({
    src: './audio/bonus.mp3',
    volume: 0.8
  }),
  enemyShoot: new Howl({
    src: './audio/enemyShoot.wav',
    volume:0.5
  }),
  explode: new Howl({
    src: './audio/explode.wav',
    volume:1
  }),
  lose:new Howl({
    src:"./audio/gameOver.mp3"
  }),
  gameOver: new Howl({
    src: './audio/game_over.wav'
  }),
  select: new Howl({
    src: './audio/select.mp3'
  }),
  shoot: new Howl({
    src: './audio/shoot.wav',
    volume:0.2
  }),
  start: new Howl({
    src: './audio/start.mp3'
  })
}