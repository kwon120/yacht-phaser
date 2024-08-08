import Phaser, { NONE } from 'phaser';
import { GameScene } from "./GameScene";
const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1000,
	height: 600,
	scene: [GameScene],
}

export default new Phaser.Game(config)
