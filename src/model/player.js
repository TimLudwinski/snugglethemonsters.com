/*
Copyright (c) 2021 - Mark Timothy Ludwinski - All rights reserved

Any usage outside of snugglethemonster.com is strictly prohibited.  
*/

class Player extends HTMLSprite {
	constructor(board) {
		super(board);
		
		this.container = document.getElementById("player");
		
		this.snuggling = false;
		this.jitterX = false;
		this.jitterY = true;
		
		this.width = 75;
		this.height = 75;
		this.left = randomWithinRange(this.board.buffer, this.board.width - this.width + this.board.buffer);
		this.top = randomWithinRange(this.board.buffer, this.board.height - this.board.height + this.board.buffer);
		this.facingRight = true;
		
		this.jitter = 7;
	}
	
	snuggleMonsters(monsters) {
		// Brute forcing it here...
		for (const monster of monsters) {
			if (monster.left <= this.left + this.width && monster.left + monster.width >= this.left)
				if (this.top <= monster.top + monster.height && this.top + this.height >= monster.top) {
					monster.receiveSnuggle();
				}
		}
	}
	
	boundedMovementWithinBoard(dx, dy) {
		if (dx > 0)
			this.facingRight = true;
		else if (dx < 0)
			this.facingRight = false;
		// else don't change the direction
		
		({dx, dy} = this.addJitter(dx, dy));
		
		super.boundedMovementWithinBoard(dx, dy);
	}
}
