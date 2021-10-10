/*
Copyright (c) 2021 - Mark Timothy Ludwinski - All rights reserved

Any usage outside of snugglethemonster.com is strictly prohibited.  
*/

class Monster extends HTMLSprite {
	constructor(board, monsterType, monsterId) {
		super(board);
		this.monsterId = monsterId;
		this.monsterType = monsterType.toString();
		
		this.width = 75;
		this.height = 75;
		this.left = randomWithinRange(this.board.buffer, this.board.width - this.width + this.board.buffer);
		this.top = randomWithinRange(this.board.buffer, this.board.height - this.height + this.board.buffer);
		
		this.snuggled = false;
		this.snuggleTankLevel = MONSTER_TYPES[monsterType].snuggleTankStart;
		
		this.mainBehavior = new RandomMovementBehavior(this);
		this.behaviors = {mainBehavior: this.mainBehavior};
		
		this.snuggleSound = new Audio('sounds/snuggle-converted.mp3');
	}
	
	receiveSnuggle() {
		this.snuggleTankLevel = MONSTER_TYPES[this.monsterType].snuggleTankSize; // Refill the snuggle tank...
		
		if (this.behaviors.hasOwnProperty("criticalSnuggleTankBehavior")) {
			delete this.behaviors.criticalSnuggleTankBehavior
		}
		if (!this.behaviors.hasOwnProperty("mainBehavior")) {
			this.behaviors.mainBehavior = this.mainBehavior;
		}
		
		this.snuggled = true;
		this.snuggleSound.play();
	}
	
	tick() {
		for (const behaviorName of Object.keys(this.behaviors)) {
			this.behaviors[behaviorName].tick();
		}
	}
}

class Behavior {
	tick() {}
}
class RandomMovementBehavior extends Behavior {
	constructor(parent) {
		super();
		this.parent = parent;
		this.tickCount = 0;
	}
	
	MONSTER_MOVEMENT_RANGE = 50;
	
	tick() {
		this.tickCount += 1;
		if (this.tickCount % 10 !== 0) {
			return; // Only do this every second..
		}
		
		this.tickCount = 0;
		
		const dx = randomWithinRange(-this.MONSTER_MOVEMENT_RANGE, this.MONSTER_MOVEMENT_RANGE);
		const dy = randomWithinRange(-this.MONSTER_MOVEMENT_RANGE, this.MONSTER_MOVEMENT_RANGE);
		
		this.parent.boundedMovementWithinBoard(dx, dy);
		
		this.parent.snuggleTankLevel -= 1;
		if (this.parent.snuggleTankLevel <= 0) {
			// delete this.parent.behaviors.mainBehavior;
			this.parent.behaviors.criticalSnuggleTankBehavior = new CriticalSnuggleTankBehavior(this.parent);
		}
		
		if (this.parent.snuggleTankLevel <= MONSTER_TYPES[this.parent.monsterType].snuggledLevel) {
			this.parent.snuggled = false;
		}
	}
}

class CriticalSnuggleTankBehavior extends Behavior {
	constructor(parent) {
		super();
		this.tickCount = 0;
		this.angle = 0;
	}
	tick() {
		if (this.tickCount % 5000 == 0) {
			// new Audio('sounds/rarr-converted.mp3').play();
			// There is one global rarr sound (otherwise things get too annoying--if that were possible)...
			// document.getElementById("rarrSound").currentTime = 0;
			document.getElementById("rarrSound").play();
		}
		this.tickCount += 1;
		
		this.angle = (Math.floor(this.tickCount) % 2 == 0) ? 4 : -4;
	}
}

class JumpBehavior extends Behavior {
	constructor(parent) {
		super();
		this.parent = parent;
		this.tickCount = this.parent.snuggleTankLevel % 20;
	}
	
	tick() {
		this.tickCount += 1;
		
		if (this.tickCount < 10) {
			// Upward motion
			this.parent.boundedMovementWithinBoard(0, this.tickCount);
		} else if (this.tickCount < 20) {
			// Downward motion
			this.parent.boundedMovementWithinBoard(0, (10 - this.tickCount));
		} else {
			// Restart
			this.tickCount = 0;
		}
	}
}