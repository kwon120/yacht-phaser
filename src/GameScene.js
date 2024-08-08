import Phaser, { NONE } from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.imgSeries = ['one', 'two', 'three', 'four', 'five', 'six'];
    this.rollDiceImages = [];
    this.holdDiceImages = [];
    this.ramdomIndexArray = [];
    this.diceCount = 0;
    this.holdDiceCount = 0;
    this.scoreCalculator = [0,0,0,0,0];
  }

  preload() {
    this.load.image('one', './D1.png');
    this.load.image('two', './D2.png');
    this.load.image('three', './D3.png');
    this.load.image('four', './D4.png');
    this.load.image('five', './D5.png');
    this.load.image('six', './D6.png');
    this.load.image('X', './X.png');
  }

  create() {
    const centerBoard = this.add.graphics();
    const diceButton = this.add.graphics();
    const dice = [this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics()];
    const scoreBoard = this.add.graphics();
    const score = this.add.graphics();
    const textArray = ['Aces', 'Deuces', 'Threes', 'Fours', 'Fives', 'Sixes', '+35Bonus', 'sum', '4 of a Kind', 'Full House', 'S. Straight', 'L.Straight', 'Yacht', 'Total'];
    const textScore = [this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics(),this.add.graphics()];
    // 중앙 보드
    centerBoard.fillStyle(0xf5dcb7, 1);
    centerBoard.fillRect(40, 130, 520, 300);
    centerBoard.lineStyle(2,0xffffff, 1);
    centerBoard.strokeRect(40, 130, 520, 300);

    // 홀드 주사위
    for(let i=0; i<5; i++){
        const diceImage = this.add.image(100+i*100, 50, this.holdDiceImages[i]).setScale(0.2);
        this.holdDiceImages.push(diceImage);
        dice[i].fillStyle(0x0019F4, 0.9);
        dice[i].fillRect(57.5+i*100, 7.5, 85, 85);
    }

    // 굴릴 주사위
    for(let i=0; i<5; i++){
        const diceImage = this.add.image(100+i*100, 250, this.rollDiceImages[i]).setScale(0.2);
        this.rollDiceImages.push(diceImage);
        dice[i].fillStyle(0xd1180b, 1);
        dice[i].fillRect(57.5+i*100, 207.5, 85, 85);
        dice[i].setInteractive(new Phaser.Geom.Rectangle(57.5+i*100, 207.5, 85, 85), Phaser.Geom.Rectangle.Contains);
        dice[i].on('pointerdown', ()=>this.clickDice(i));
    }

    // 굴리기 버튼
    diceButton.fillStyle(0xd1180b, 1);
    diceButton.fillRect(225, 330, 150, 150);
    diceButton.lineStyle(2, 0xffffff, 1);
    diceButton.strokeRect(225, 330, 150, 150);
    const diceButton2 = this.add.triangle(200, 250, 100, 155, 100, 275, 200, 215, 0xffffff, 1);

    diceButton.setInteractive(new Phaser.Geom.Rectangle(225, 330, 150, 150), Phaser.Geom.Rectangle.Contains);
    diceButton.on('pointerdown', ()=>this.clickRollDiceButton());    
    
    // 남은 횟수
    for(let i=0; i<3; i++){
      let circle = this.add.circle(250+i*50, 500, 10, 0x80ff00);
      circle.setStrokeStyle(2, 0xffffff);
    }
    // nothing
    //점수 기록
    scoreBoard.fillStyle(0xf5dcb7, 1);
    scoreBoard.fillRect(650, 50, 300, 500)

    //점수 기록 위 텍스트
    this.add.text(743, 30, 'Welcome Yacht');

    //점수판
    for(let i=0; i<8; i++){
        let j = i;
        j == 6 ? i+=0.3:i;
        j == 7.3 ? j-=0.3:j;

        score.fillStyle(0xffffff, 1);
        score.fillRect(670, 70+i*30, 120, 30);
        score.lineStyle(1,0x000000);
        score.strokeRect(670, 70+i*30, 120, 30);
        
        this.add.text(680, 77+i*30, textArray[j]).setColor('0x000000');
        
        textScore[j].setInteractive(new Phaser.Geom.Rectangle(670, 70+i*30, 120, 30), Phaser.Geom.Rectangle.Contains);
        textScore[j].on('pointerdown', ()=>this.clickScore(j));

        score.fillStyle(0xffffff, 1);
        score.fillRect(790, 70+i*30, 70, 30);
        score.lineStyle(1,0x000000);
        score.strokeRect(790, 70+i*30, 70, 30);

        score.fillStyle(0xffffff, 1);
        score.fillRect(860, 70+i*30, 70, 30);
        score.lineStyle(1,0x000000);
        score.strokeRect(860, 70+i*30, 70, 30);        
    }
    for(let i=0; i<6; i++){
        let j = i;
        j == 5 ? i+=0.3:i;

        score.fillStyle(0xffffff, 1);
        score.fillRect(670, 340+i*30, 120, 30);
        score.lineStyle(1,0x000000);
        score.strokeRect(670, 340+i*30, 120, 30);

        this.add.text(680, 77+(i+9)*30, textArray[j+8]).setColor('0x000000');

        textScore[j+8].setInteractive(new Phaser.Geom.Rectangle(670, 340+i*30, 120, 30), Phaser.Geom.Rectangle.Contains);
        textScore[j+8].on('pointerdown', ()=>this.clickScore(j+8));

        score.fillStyle(0xffffff, 1);
        score.fillRect(790, 340+i*30, 70, 30);
        score.lineStyle(1,0x000000);
        score.strokeRect(790, 340+i*30, 70, 30);

        score.fillStyle(0xffffff, 1);
        score.fillRect(860, 340+i*30, 70, 30);
        score.lineStyle(1,0x000000);
        score.strokeRect(860, 340+i*30, 70, 30);
    }
  }

    update() {}

    clickRollDiceButton() {
      const imgSeries = this.imgSeries;
      if(this.diceCount === 3){
        alert('Stop!!');
        return 0;
      }
      this.diceCount++;
      // 굴림 버튼 변화
      if(this.diceCount === 3) {
        this.add.triangle(200, 250, 100, 155, 100, 275, 200, 215, 0xd1180b, 1);
      }
      // 남은 횟수 감소
      for(let i=0; i<this.diceCount; i++){
        let circle = this.add.circle(250+i*50, 500, 10, 0x000000);
        circle.setStrokeStyle(2, 0x000000);
      }
      for (let i = 0; i < this.rollDiceImages.length; i++) {
        const randomIndex = Math.floor(Math.random()*6);
        this.rollDiceImages[i].setTexture(imgSeries[randomIndex]);
        this.ramdomIndexArray[i] = imgSeries[randomIndex];
      }
    }

    clickDice(i) {
      this.holdDiceImages[this.holdDiceCount++].setTexture(this.ramdomIndexArray[i]);
    }

    clickScore(j){
      let scoreSum = 0;
      if(this.holdDiceCount === 5){
        for(let i=0; i<5; i++){
          console.log(this.holdDiceCount[i]);
          switch(this.ramdomIndexArray[i]){
            case 'one':
              this.scoreCalculator[i] = 1;
              break;
            case 'two':
              this.scoreCalculator[i] = 2;
              break;
            case 'three':
              this.scoreCalculator[i] = 3;
              break;
            case 'four':
              this.scoreCalculator[i] = 4;
              break;
            case 'five':
              this.scoreCalculator[i] = 5;
              break;
            case 'six':
              this.scoreCalculator[i] = 6;
              break;
          }
        }
        switch(j) {
          case 0: //aces
            const calculator = this.scoreCalculator.filter(val => val === 1);
            scoreSum = calculator.length;
            console.log(calculator, scoreSum);
            break;
          case 1: //deuces
            break;
          case 2: //threes
            break;
          case 3: //fours
            break;
          case 4: //fives
            break;
          case 5: //sixes
            break;
          case 6: //+35bonus
            break;
          case 7: //sum
            break;
          case 8: //4 of a Kind
            break;
          case 9: //full house
            break;
          case 10: //s. straight
            break;
          case 11: //l. straight
            break;
          case 12: //yacht
            break;
          case 13: //total
            break;
        }
      }
      else {
        alert('not now');
      }
      console.log(scoreSum);
    }
}