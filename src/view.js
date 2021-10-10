/*
Copyright (c) 2021 - Mark Timothy Ludwinski - All rights reserved

Any usage outside of snugglethemonster.com is strictly prohibited.  
*/
class View extends EventEmitter {
	constructor(model) {
		super();
		
		this.model = model;
		
		this.window = document.getElementById("main_view");
		
		// NOTE: player is constructed and attached in the HTML.  It never gets deleted.  
		this.playerElem = document.getElementById("player");
		
		this.monsterElems = {};
		this.monsterImages = {};
		this.monsterSnuggledElem = {};
		this.monsterRarrElem = {};
		this.changedMonsters = new Set();
		
		this.monstersSetup = false;
	}
	
	/*
	monsterChanged(monster) {
		this.changedMonsters.add(monster);
	}
	*/
	
	updateDOM() { // This is basically the "draw" function...
		if (!this.monstersSetup)
			return;
		
		for (const monster of this.model.monsters) {
			if (monster.snuggled) {
				this.monsterSnuggledElem[monster.monsterId].style.display = "block";
			} else {
				this.monsterSnuggledElem[monster.monsterId].style.display = "none";
			}
			
			const monsterInfo = MONSTER_TYPES[monster.monsterType];
			
			let hue = null;
			const snuggleRatio = Math.max(monsterInfo.snuggleTankSize - monster.snuggleTankLevel, 0) / monsterInfo.snuggleTankSize;
			if (monsterInfo.angryHue - monsterInfo.snuggledHue > 0) {
				// hue ascending
				hue = monsterInfo.snuggledHue + (monsterInfo.angryHue - monsterInfo.snuggledHue) * snuggleRatio;
				if (hue > monsterInfo.angryHue)
					hue = monsterInfo.angryHue;
			} else {
				// hue descending
				hue = monsterInfo.snuggledHue + (monsterInfo.angryHue - monsterInfo.snuggledHue) * snuggleRatio;
				if (hue < monsterInfo.angryHue)
					hue = monsterInfo.angryHue;
			}
			//console.log(hue);
			
			let angle = 0;
			if (monster.behaviors.hasOwnProperty("criticalSnuggleTankBehavior")) {
				angle = monster.behaviors.criticalSnuggleTankBehavior.angle;
				this.monsterRarrElem[monster.monsterId].style = 'display: block; position: relative;';
				//console.log(angle);
			} else {
				this.monsterRarrElem[monster.monsterId].style = 'display: none; position: relative;';
			}
			
			// Set all styles at once (for speed)
			this.monsterElems[monster.monsterId].style = `left: ${monster.left}px; top: ${monster.top}px; z-index: ${monster.top}; filter: hue-rotate(${hue}deg); transform: rotate(${angle}deg)`;
		}
		
		if (this.model.player.facingRight)
			this.playerElem.style = `left: ${this.model.player.left}px; top: ${this.model.player.top}px; transform: scaleX(1);`;
		else
			this.playerElem.style = `left: ${this.model.player.left}px; top: ${this.model.player.top}px; transform: scaleX(-1);`;
		
		this.changedMonsters.clear();
	}
	
	updateMonsterList(newMonsterList) {
		//console.log(newMonsterList);
		
		// First, all of the current monsters go to monstropolis...
		for (const monsterId of Object.keys(this.monsterElems)) {
			this.monsterElems[monsterId].remove();
		}
		
		// Then we get the new monsters...
		this.monsterElems = {};
		this.monsterImages = {}; // Note: these were also detached when `this.monsterElems` was removed...
		this.monsterSnuggledElem = {};
		this.monsterRarrElem = {};
		for (const monster of newMonsterList) {
			const monsterContainer = document.createElement("div");
			monsterContainer.className = "monster";
			
			const monsterImgElem = document.createElement("img");
			monsterImgElem.className = "monster_image";
			const monsterImgPath = MONSTER_TYPES[monster.monsterType].monsterImg;
			monsterImgElem.src = monsterImgPath;
			
			const monsterSnuggledContainer = document.createElement("div");
			monsterSnuggledContainer.style = 'display: none; position: relative;';
			monsterSnuggledContainer.innerHTML = '<img src="images/heart.png" class="heart">'
			
			const monsterRarrContainer = document.createElement("div");
			monsterRarrContainer.style = 'display: none; position: relative;';
			monsterRarrContainer.innerHTML = 'RARR!!'
			
			monsterContainer.appendChild(monsterSnuggledContainer);
			monsterContainer.appendChild(monsterRarrContainer);
			monsterContainer.appendChild(monsterImgElem);
			
			this.window.appendChild(monsterContainer);
			
			// this.changedMonsters.add(monster);
			this.monsterElems[monster.monsterId] = monsterContainer;
			this.monsterImages[monster.monsterId] = monsterImgElem;
			this.monsterSnuggledElem[monster.monsterId] = monsterSnuggledContainer;
			this.monsterRarrElem[monster.monsterId] = monsterRarrContainer;
		}
		
		this.monstersSetup = true;
	}
}