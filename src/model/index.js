/*
Copyright (c) 2021 - Mark Timothy Ludwinski - All rights reserved

Any usage outside of snugglethemonster.com is strictly prohibited.  
*/
const LEVELS = [
	{monsterTypes: ["snugson"], numMonsters: 7},
	{monsterTypes: ["greenie"], numMonsters: 8},
	{monsterTypes: ["spike"], numMonsters: 9},
	{monsterTypes: ["eyes"], numMonsters: 10},
	{monsterTypes: ["snugson", "greenie", "spike", "eyes"], numMonsters: 12}
]

const defaultSnuggleTankStart = 18;
const MONSTER_TYPES = {
	"snugson": {
		monsterImg: "images/snugson.png",
		
		snuggleTankSize: 30,
		snuggledLevel: 19,
		snuggleTankStart: defaultSnuggleTankStart,
		snuggleTankWarning: 3,
		
		snuggledHue: 0,
		angryHue: 130
	},
	"greenie": {
		monsterImg: "images/greenie.png",
		
		snuggleTankSize: 30,
		snuggledLevel: 19,
		snuggleTankStart: defaultSnuggleTankStart,
		snuggleTankWarning: 3,
		
		snuggledHue: 0,
		angryHue: 220
	},
	"spike": {
		monsterImg: "images/spike.png",
		
		snuggleTankSize: 30,
		snuggledLevel: 19,
		snuggleTankStart: defaultSnuggleTankStart,
		snuggleTankWarning: 3,
		
		snuggledHue: 0,
		angryHue: -50
	},
	"eyes": {
		monsterImg: "images/eyes.png",
		
		snuggleTankSize: 30,
		snuggledLevel: 19,
		snuggleTankStart: defaultSnuggleTankStart,
		snuggleTankWarning: 3,
		
		snuggledHue: 0,
		angryHue: 155
	}
}

class Model extends EventEmitter {
	constructor() {
		super();
		
		this.board = new Board();
		this.player = new Player(this.board);
		this.monsters = [];
		this.levelTransition = false;
	}
	
	setupLevel(levelNumber) {
		// Reset the last level
		this.monsters = [];
		
		// Setup the new level...
		const level = LEVELS[levelNumber];
		for (let i = 0; i < level.numMonsters; i++) {
			const monsterType = level.monsterTypes[randomWithinRange(0, level.monsterTypes.length-1)];
			this.monsters.push(new Monster(this.board, monsterType, i));
		}
		
		this.player.randomizePosition();
		console.log('Level Set Up');
	}
	
	tick() {
		let allSnuggled = true;
		for (const monster of this.monsters) {
			monster.tick();
			allSnuggled &= monster.snuggled;
		}
		
		if (allSnuggled && !this.levelTransition) {
			this.emit('levelFinished');
			this.levelTransition = true;
		}
	}
}

class Board {
	constructor () {
		this.width = 800;
		this.height = 500;
		this.buffer = 10;
	}
}

class HTMLSprite {
	constructor(board) {
		this.board = board;
		this.left = null;
		this.top = null;
		this.width = null;
		this.height = null;
	}
	
	boundedMovementWithinBoard(dx, dy) {
		let newLeft = this.left + dx;
		let newTop = this.top + dy;
		
		if (newLeft < this.board.buffer)
			newLeft = this.board.buffer;
		if (newTop < this.board.buffer)
			newTop = this.board.buffer;
		if (newLeft > this.board.width - this.width)
			newLeft = this.board.width - this.width;
		if (newTop > this.board.height - this.height)
			newTop = this.board.height - this.height;
		
		this.left = newLeft;
		this.top = newTop;
	}
	
	addJitter(dx, dy) {
		if (dx == 0 && dy != 0) {
			if (this.jitterX)
				dx += this.jitter;
			else
				dx -= this.jitter;
			this.jitterX = !this.jitterX;
		} else if (dy == 0 && dx != 0) {
			if (this.jitterY)
				dy += this.jitter;
			else
				dy -= this.jitter;
			this.jitterY = !this.jitterY;
		} else if (dy != 0 && dy != 0) {
			// TODO: test this!!
			if (this.jitterX) {
				dx += this.jitter;
				dy += this.jitter;
			} else {
				dx -= this.jitter;
				dy -= this.jitter;
			}
			this.jitterX = !this.jitterX;
		} else {
			//console.log("NO MOVEMENT!!!");
		}
		
		return {dx, dy};
	}
	
	randomizePosition() {
		this.left = randomWithinRange(this.board.buffer, this.board.width - this.width + this.board.buffer);
		this.top = randomWithinRange(this.board.buffer, this.board.height - this.board.height + this.board.buffer);
	}
}