import * as PIXI from 'pixi.js';
import { Loader } from 'resource-loader';
import { gsap, Power1, Linear, yoyo} from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin';
import Bg from './game_bg.jpg';
import Board from './board.png'
import FruitsAndSplash from './fruitsandsplash-min.png'
import _ from 'lodash';
import './fonts/go3v2.ttf';


gsap.registerPlugin(PixiPlugin); 
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
  width: 500,
  height: 888,
  backgroundColor: 0x1099bb,
});

const fontConf = {
  fontFamily: 'Gang of Three',
  fontSize: 32,
  fill: '#FDDA0D',
  stroke: 0x000000, // outline color
  strokeThickness: 1,
  align : 'center',
}

const fontConfBig = {
  fontFamily: 'Gang of Three',
  fontSize: 35,
  fill: '#FDDA0D',
  stroke: 0x000000,
  strokeThickness: 2,
}



const appContainer = document.getElementById('app');
appContainer.appendChild(app.view);
PIXI.Assets.load('./fonts/go3v2.ttf')


const bgimg = PIXI.Texture.from(Bg);
const boardimg = PIXI.Texture.from(Board);

const spriteBG = new PIXI.Sprite(bgimg);
const spriteBoard = new PIXI.Sprite(boardimg);

spriteBoard.anchor.set(0.5);
spriteBoard.scale.set(0.9);
spriteBoard.position.set(250, 400);

app.stage.addChild(spriteBG);
app.stage.addChild(spriteBoard);


const spriteSheet = PIXI.Texture.from(FruitsAndSplash);

const loader = new Loader();
const timerText = new PIXI.Text('2:00', fontConf);
const finalScore = new PIXI.Text(0, fontConf);
finalScore.position.set(10, 10);
app.stage.addChild(finalScore);

const scoreText = new PIXI.Text('0', fontConf);
const instructionText = new PIXI.Text('CUT THE PAIN POINTS \n AND BE THE \n SMARTLY NINJA \n MASTER', fontConf);


loader.add(FruitsAndSplash)
      .use((resource, next) =>{
        next();
      })
      .load((loader, resrouces) => {
        //anti bug scoretext 
        scoreText.position.set(10, 10);
        app.stage.addChild(scoreText);

        timerText.position.set(400, 10);
        app.stage.addChild(timerText);

        instructionText.anchor.set(0.5);
        instructionText.position.set(250, 400)
        app.stage.addChild(instructionText)
        InitplayBtn();
      })

const sprites = {}

sprites.frt1 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(0, 0,120, 160));
sprites.frt1L = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(140, 0,120, 160));
sprites.frt1R = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(240, -5,120, 160));
sprites.frt2 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(420, 0,120, 160));
sprites.frt2L = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(567, 0,120, 160));
sprites.frt2R = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(707, 0,120, 160));
sprites.frt3 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(847, 0,120, 160));
sprites.frt3L = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(987, 0,120, 160));
sprites.frt3R = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(1127, 0,120, 160));
sprites.frt4 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(1273, 0,120, 160));
sprites.frt4L = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(1407, 0,120, 160));
sprites.frt4R = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(1547, 0,120, 160));
sprites.frt5 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(1700, 0, 147, 160));
sprites.frt5L = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(1843, 0,120, 160));
sprites.frt5R = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(1967, 0,120, 160));
sprites.frt6 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(2107, 0, 147, 160));
sprites.frt6L = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(2247, 0, 147, 160));
sprites.frt6R = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(2387, 0, 147, 160));
sprites.splatF1 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(2527, 0, 300, 357));
sprites.splatF2 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(2827, 0, 406, 407));
sprites.splatF3 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(3233, 0, 299, 306));
sprites.splatF4 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(2827, 0, 406, 407));
sprites.splatF5 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(3549, 0, 380, 400));
sprites.splatF6 = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(3940, 0, 376, 441));

const frt1 = new PIXI.Sprite(sprites.frt1);
const frt2 = new PIXI.Sprite(sprites.frt2);
const frt3 = new PIXI.Sprite(sprites.frt3);
const frt4 = new PIXI.Sprite(sprites.frt4);
const frt5 = new PIXI.Sprite(sprites.frt5);
const frt6 = new PIXI.Sprite(sprites.frt6);

frt1.name = 'frt1'
frt2.name = 'frt2'
frt3.name = 'frt3'
frt4.name = 'frt4'
frt5.name = 'frt5'
frt6.name = 'frt6'

// left half fruit
const frt1L = new PIXI.Sprite(sprites.frt1L);
const frt2L = new PIXI.Sprite(sprites.frt2L);
const frt3L = new PIXI.Sprite(sprites.frt3L);
const frt4L = new PIXI.Sprite(sprites.frt4L);
const frt5L = new PIXI.Sprite(sprites.frt5L);
const frt6L = new PIXI.Sprite(sprites.frt6L);

// right half fruit
const frt1R = new PIXI.Sprite(sprites.frt1R);
const frt2R = new PIXI.Sprite(sprites.frt2R);
const frt3R = new PIXI.Sprite(sprites.frt3R);
const frt4R = new PIXI.Sprite(sprites.frt4R);
const frt5R = new PIXI.Sprite(sprites.frt5R);
const frt6R = new PIXI.Sprite(sprites.frt6R);

//splatters
const splatF1 = new PIXI.Sprite(sprites.splatF1);
const splatF2 = new PIXI.Sprite(sprites.splatF2);
const splatF3 = new PIXI.Sprite(sprites.splatF3);
const splatF4 = new PIXI.Sprite(sprites.splatF4);
const splatF5 = new PIXI.Sprite(sprites.splatF5);
const splatF6 = new PIXI.Sprite(sprites.splatF6);


function startTimer() {
  let duration = 120;
  const timer = setInterval(() => {
    // decrement the duration by 1 second
    if (duration % 4 === 0) run();
    duration--;
      
    // calculate the minutes and seconds
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
  
    
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
    
    timerText.text = timeString;
  
    // check if the timer has reached 0
    if (duration === 0) {
      
      clearInterval(timer);
      app.stage.addChild(spriteBoard);
      app.stage.addChild(instructionText)
      app.stage.addChild(ovalBtn);
      finalScore.text = 0
    }
  }, 1000);
}


const fruits = [frt1, frt2, frt3, frt4, frt5, frt6]
const splats = {
  'frt1': {
    'splat': splatF1,
    'L': frt1L,
    'R': frt1R,
    'points': 5
  },
  'frt2': {
    'splat': splatF2,
    'L': frt2L,
    'R': frt2R,
    'points': 10
  },
  'frt3': {
    'splat': splatF3,
    'L': frt3L,
    'R': frt3R,
    'points': 15
  },
  'frt4': {
    'splat': splatF4,
    'L': frt4L,
    'R': frt4R,
    'points': 20
  },
  'frt5': {
    'splat': splatF5,
    'L': frt5L,
    'R': frt5R,
    'points': 25
  },
  'frt6': {
    'splat': splatF6,
    'L': frt6L,
    'R': frt6R,
    'points': 30
  }
}


function randomFruit() {
  return _.sample(fruits)
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function goingToCenter() {
  // set the fruit to go to this area
  return app.view.width / 2
}




//init button // play game button

//generate ovalbtn 
const ovalBtnGrph = new PIXI.Graphics();
ovalBtnGrph.beginFill('#B8C838', 1)
ovalBtnGrph.drawRoundedRect(0, 0, 200, 50, 10);
ovalBtnGrph.endFill();
const ovalBtnTexture = app.renderer.generateTexture(ovalBtnGrph);

const ovalBtn = new PIXI.Sprite(ovalBtnTexture);


function InitplayBtn() {
const ovalBtnTxt = new PIXI.Text('PLAY GAME', fontConfBig);
ovalBtnTxt.anchor.set(0.5);
ovalBtnTxt.position.set(ovalBtn.x, ovalBtn.y);

ovalBtn.interactive = true;

ovalBtn.anchor.set(0.5);
ovalBtn.position.set(250, 600);
ovalBtn.addChild(ovalBtnTxt);

app.stage.addChild(ovalBtn);


ovalBtn.on('click', () => {
  startTimer();
  app.stage.removeChild(instructionText)
  app.stage.removeChild(spriteBoard);
  app.stage.removeChild(ovalBtn);
  totalPoints = []
});
}


var totalPoints = []

function run() {

  let fruit = randomFruit()
  let initialX = randomRange(1, app.view.width);
  let initialY = randomRange(1, 500);
  let randomRotate = randomRange(3, 5)
    
  
  
  //set the fruit's position and anchor point
  fruit.x = initialX
  fruit.y = 800;
  fruit.anchor.set(0.5);

  // add the fruit to the stage
  app.stage.addChild(fruit);

   
  //animation of fruit
  gsap.to(fruit, { 
    duration: 2, 
    x: goingToCenter(), 
    y: initialY,
    rotation: randomRotate
  });
  gsap.to(fruit,{
    delay: 1.5,
    duration: 2,
    x: (initialX > goingToCenter() ?  goingToCenter() - initialX : goingToCenter() + initialX),
    y: 1000,
    rotation: randomRotate*2,
    onComplete: () => {
      app.stage.removeChild(fruit);
    }
  })

    
  fruit.removeAllListeners()
  fruit.interactive = true;
    fruit.on('pointerdown', () => {
    let fruitPoint = 0
    let splatter = splats[fruit.name].splat
    let fruitL = splats[fruit.name].L
    let fruitR = splats[fruit.name].R
    fruitPoint = splats[fruit.name].points
    


    splatter.x = fruit.x;
    splatter.y = fruit.y;
    fruitL.x = fruit.x;
    fruitL.y = fruit.y;
    fruitR.x = fruit.x;
    fruitR.y = fruit.y;



    splatter.anchor.set(0.5);
    fruitL.anchor.set(0.5);
    fruitR.anchor.set(0.5);

    // splatter.scale.set(0.5 + Math.random());

    splatter.rotation = Math.random()

    app.stage.addChild(splatter);
    app.stage.addChild(fruitL);
    app.stage.addChild(fruitR);

    
    
    gsap.fromTo([fruitL, fruitR], {alpha: 1,},{
      duration: 1,
      alpha: 0,
      x: i => i % 2 ? '+=100' : '-=100',
      y: '+=100',
      stagger: 0.05,
      ease: 'power4.out'
    });
    
    
    gsap.fromTo(splatter, {alpha: 1}, { duration: 0.5, alpha: 0, ease: 'power2.out', onComplete: () => {
      app.stage.removeChild(splatter);
      app.stage.removeChild(fruitL);
      app.stage.removeChild(fruitR);
      
    }});

    totalPoints.push(splats[fruit.name].points)
    
    finalScore.text = parseInt(_.sum(totalPoints))
    app.stage.removeChild(fruit);
    app.stage.removeChild(scoreText);
  });
}