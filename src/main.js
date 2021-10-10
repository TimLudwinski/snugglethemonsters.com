/*
Copyright (c) 2021 - Mark Timothy Ludwinski - All rights reserved

Any usage outside of snugglethemonster.com is strictly prohibited.  
*/

class Application extends EventEmitter {
	constructor() {
		super();
		
		// Setup the game
		this.model = new Model();
		this.view = new View(this.model);
		
		this.controller = new PlayerMovementController(this.model, this.view);
		this.transitionController = new LevelTransitionController(this.model, this.view);
		this.gameFinishedController = new GameFinishedController(this.model, this.view);
		
		this.currentLevel = 0;
		this.model.on('levelFinished', (() => this.startLevelTransition()));
		this.transitionController.on('transitionFinished', (() => this.transitionFinished()));
	}
	
	run() {
		// Start level 1
		console.log("Starting Level 1");
		this.model.setupLevel(this.currentLevel);
		this.view.updateMonsterList(this.model.monsters);
		this.controller.activate();
	}
	
	startLevelTransition() {
		this.model.levelTransition = true;
		this.controller.deactivate();
		
		for (const monster of this.model.monsters) {
			monster.snuggleSound.pause();
			monster.snuggleSound.currentTime = 0;
		}
		
		if (this.currentLevel + 1 < LEVELS.length) {
			this.transitionController.activate();
			new Audio('sounds/tada-converted.mp3').play();
		} else {
			// Note: the game ends when there are no more levels... no auto repeats
			this.gameFinishedController.activate();
			new Audio('sounds/win-converted.mp3').play();
			document.getElementById("finished_text").style.display = "block";
		}
	}
	
	transitionFinished() {
		this.currentLevel += 1;
		if (this.currentLevel < LEVELS.length) {
			console.log("Changing to Level " + (this.currentLevel + 1));
			// Start the next level
			this.model.setupLevel(this.currentLevel);
			this.model.levelTransition = false;
			this.view.updateMonsterList(this.model.monsters);
			
			this.transitionController.deactivate();
			this.controller.activate();
		} else {
			console.log("GAME FINISHED");
		}
	}
}

new Application().run();