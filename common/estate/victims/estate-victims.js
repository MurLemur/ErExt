var estateVictimsClass = function() {	
	this.victimsList = {};

	this.maxVictimsAmount = 20;	
	this.currentVictimsAmount = 0;
	
	this.victimNameMaxLenth = 18;
	var self = this;	
	
	this.init = function(victimsList) {
		self.victimsList = victimsList;
		
		self.currentVictimsAmount = Object.keys(victimsList).length;
	};
	
	this.addVictim = function(victimName) {
		if (!self._isNameValid(victimName) || typeof self.victimsList[victimName] !== 'undefined' || self.currentVictimsAmount >= self.maxVictimsAmount) {
			return false;
		}
		
		self.currentVictimsAmount++;
		self.victimsList[victimName] = 0;		
	
		kango.invokeAsync('kango.storage.setItem', 'estateVictims', self.victimsList);
		
		return true;
	};
	
	this._isNameValid = function(victimName) {
		return victimName.length > 0 && victimName.length <= self.victimNameMaxLenth;
	};
	
	this.removeVictim = function(victimName) {
		delete self.victimsList[victimName];
		self.currentVictimsAmount--;
		
		kango.invokeAsync('kango.storage.setItem', 'estateVictims', self.victimsList);
	};
	
	this.getVictimsList = function() {
		return self.victimsList;
	};
	
	this.getMaxVictimsAmount = function() {
		return self.maxVictimsAmount;
	};
	
	this.getCurrentVictimsAmount = function() {
		return self.currentVictimsAmount;
	}
}