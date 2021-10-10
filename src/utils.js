/*
Copyright (c) 2021 - Mark Timothy Ludwinski - All rights reserved

Any usage outside of snugglethemonster.com is strictly prohibited.  
*/
class EventEmitter {
	constructor() {
		this.events = {};
	}
	
	on(event, listener) {
		if (!(this.events.hasOwnProperty(event))) {
			this.events[event] = [];
		}
		
		this.events[event].push(listener);
		
		return this;
	}
	
	emit(event, arg) {
		for (const listener of (this.events[event] || [])) {
			listener(arg);
		}
	}
}

function randomWithinRange(start, stop) {
	return Math.floor(Math.random() * (stop - start + 1)) + start;
}
