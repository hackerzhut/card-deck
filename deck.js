module.exports = function(deck){

	"use strict";

	this._tries = 0,
	this._originalDeck = JSON.parse(JSON.stringify(deck)),
	this._deckInHand  = [],
	this._deckOnTable = [];


	Array.prototype.reverse = function(){
		for(var left=0, right = this.length-1; left < right; left++, right--){
			var temp = this[right];
			this[right] = this[left];
			this[left] = temp;
		};
	};

	Array.prototype.pop = function(index){
		if(index < 0 || index > this.length-1) return;
		var elem = this[index];
		for(var _index=0, _nIndex=0; _index < this.length; _index++){
			if(this[_index]!== elem)
				this[_nIndex++] = this[_index];
		};
		this.length = _nIndex;
	};

	Array.prototype.popAndPush = function(elementToPopAndPush){
		var elementIndex = this.indexOf(elementToPopAndPush);
		if(elementIndex == -1)return;
		for(var _index=elementIndex; _index < this.length; _index++){
			var _nextElement = this[_index+1];
			this[_index] = (_nextElement === undefined) ? elementToPopAndPush : _nextElement;
		};
	};

	Array.prototype.compare = function(arr){
		var that = this,
		arrayLength = arr.length;
		if(this.length != arrayLength){
			return false;
		}
		var isEqual = arr.every(function(elem, _index){
			// Assuming array don't have arrays as elements
			if(that[_index] != arr[_index]){
				return false;
			}
			return true;
		});
		return isEqual;
	};

	this.shuffleToOriginal = function(callback){
		while(true){
			while(deck.length > 0){
				//placing top element on the table
				this._deckOnTable.push(deck[0]); 
				deck.pop(0); //Pop the top card
				if(deck.length == 0) break;
				//take the next top element and place it under the deck in hand
				deck.popAndPush(deck[0]); 
			}
			//Reverse the table to restore the order			
			this._deckOnTable.reverse();
			this._tries++;
			//Reset the values
			deck = this._deckOnTable;
			this._deckOnTable = [];
			console.log('[ End of Round '+ (this._tries)+' : deck on table: '+deck+' ]');
			//Outerloop break condition
			if(deck.compare(this._originalDeck)){
				break;
			}
		};
		callback(null, this._tries);
	};
};


