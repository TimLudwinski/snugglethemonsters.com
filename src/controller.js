/*
Copyright (c) 2021 - Mark Timothy Ludwinski - All rights reserved

Any usage outside of snugglethemonster.com is strictly prohibited.  
*/
const MOVEMENT_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
const KEYS_TO_MOVEMENT = {
	"ArrowUp": {dx: 0, dy: -20},
	"ArrowDown": {dx: 0, dy: 20},
	"ArrowLeft": {dx: -20, dy: 0},
	"ArrowRight": {dx: 20, dy: 0}
}

class PlayerMovementController extends EventEmitter { // NOTE: not an event emitter
	constructor(model, view) {
		super();
		
		this.model = model;
		this.player = this.model.player;
		
		this.view = view;
		
		this.keysDown = new Set();
		this.keysHit = new Set();
		
		this.audioPlayed = false;
	}
	
	activate() {
		window.onkeydown = ((event) => this.keyDown(event));
		window.onkeyup = ((event) => this.keyUp(event));
		this.playerTimer = window.setInterval(() => (this.keyRepeat()), 200);
		this.monsterTimer = window.setInterval(() => (this.model.tick()), 100);
		
		this.viewTimer = window.setInterval(() => (this.view.updateDOM()), 100);
		
		console.log('Main Controler Active');
	}
	
	deactivate() {
		window.onkeydown = null;
		window.onkeyup = null;
		
		window.clearInterval(this.playerTimer);
		window.clearInterval(this.monsterTimer);
		window.clearInterval(this.viewTimer);
		this.keysDown.clear();
		this.keysHit.clear();
	}
	
	keyDown(event) {
		//console.log('Main Controler: Key Down');
		
		if (MOVEMENT_KEYS.has(event.code)) {
			this.keysHit.add(event.code);
			this.keysDown.add(event.code);
		}
		if (event.code == "KeyS")
			this.player.snuggleMonsters(this.model.monsters);
		
		if (!this.audioPlayed) {
			return;
			const audioToPlay = ['sounds/snuggle.m4a', 'sounds/rarr.m4a', 'sounds/tada.m4a', 'sounds/tada.m4a'];
			for (const audioFile of audioToPlay) {
				const audioElem = new Audio();
				audioElem.play();
				audioElem.pause();
			}
		}
	}
	keyUp(event) {
		if (MOVEMENT_KEYS.has(event.code))
			this.keysDown.delete(event.code);
	}
	
	keyRepeat() {
		// Add keys currently held to keysHit
		this.keysDown.forEach((key) => this.keysHit.add(key));
		
		let dx = 0;
		let dy = 0;
		for (const key of this.keysHit) {
			dx += KEYS_TO_MOVEMENT[key].dx;
			dy += KEYS_TO_MOVEMENT[key].dy;
		}
		
		if (dx || dy) {
			this.player.boundedMovementWithinBoard(dx, dy);
		}
		
		this.keysHit.clear();
	}
}

class LevelTransitionController extends EventEmitter {
	constructor(model, view) {
		super();
		
		this.model = model;
		this.view = view;
		this.player = this.model.player;
		
		this.ticks = 0;
	}
	
	activate() {
		for (const monster of this.model.monsters) {
			monster.behaviors = {jumpBehavior: new JumpBehavior(monster)};
		}
		this.monsterTimer = window.setInterval(() => (this.model.tick()), 20);
		this.viewTimer = window.setInterval(() => (this.view.updateDOM()), 20);
		
		window.setTimeout(() => this.emit('transitionFinished'), 6300);
	}
	
	deactivate() {
		window.clearInterval(this.monsterTimer);
		window.clearInterval(this.viewTimer);
		for (const monster of this.model.monsters) {
			monster.behaviors = {mainBehavior: monster.mainBehavior};
		}
	}
}

class GameFinishedController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.player = this.model.player;
		
		this.ticks = 0;
	}
	
	activate() {
		for (const monster of this.model.monsters) {
			monster.behaviors = {jumpBehavior: new JumpBehavior(monster)};
		}
		this.monsterTimer = window.setInterval(() => (this.model.tick()), 20);
		this.viewTimer = window.setInterval(() => (this.view.updateDOM()), 20);
		
		// window.setTimeout(() => this.emit('transitionFinished'), 6300); // The game is over, so this keeps repeating...
	}
	
	deactivate() {}
}