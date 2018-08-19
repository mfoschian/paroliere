
function pad2( n ) {
	if( n > 9 )
		return ''+n;
	else
		return '0'+n;
}


var GUI = {
	getBoard: function() {
		return document.getElementById('board');
	},
	newLetter: function( l ) {
		var el = document.createElement( 'td' );
		var rotation = Math.floor( Math.random() * 4 ) * 90;
		if( rotation > 0 )
			el.className = 'letter rotate' + rotation;
		else
			el.className = 'letter';
		el.innerText = l;
		return el;
	},
	newRow: function( letters, start ) {
		var r = document.createElement('tr');
		for( var i=0; i < 4; i++ ) {
			var l = letters[start + i];
			var el = GUI.newLetter( l );
			r.append( el );
		}
		return r;
	},
	clearBoard: function() {
		var b = GUI.getBoard();
		b.innerHTML = '';
	},
	buildBoard: function( letters ) {
		var b = GUI.getBoard();
		for( var i=0; i < 4; i++ ) {
			var r = GUI.newRow( letters, i * 4 );
			b.append( r );
		}
		return b;
	},
	showTime: function( seconds ) {
		var secs = seconds % 60;
		var mins = (seconds-secs) / 60;
		var s = pad2(mins) + ':' + pad2(secs);
		var el = document.getElementById('timer');
		el.innerText = s;
	},
	hideEndTime: function() {
		var el = document.getElementById( 'eotMessage' );
		el.style.display = 'none';
	},
	showEndTime: function() {
		var el = document.getElementById( 'eotMessage' );
		el.style.display = 'block';
	},
	startGame: function() {
		var el = document.getElementById( 'start_section' );
		el.style.display = 'none';
		var el = document.getElementById( 'board_container' );
		el.style.display = 'block';
	}
};



var App = {
	inizialized: false,
	timer_id: null,
	countdown_secs: 180,
	remaining_secs: 0,
	dices: [
		['B','A','O','O','Qu','M'],
		['U','T','E','S','L','P'],
		['I','G','E','N','V','T'],
		['O','U','L','I','E','R'],
		['A','C','E','S','L','R'],
		['R','A','T','I','B','L'],
		['S','M','I','R','O','A'],
		['I','S','E','E','F','H'],
		['S','O','T','E','N','D'],
		['A','I','C','O','F','R'],
		['V','N','Z','D','A','E'],
		['I','E','A','T','A','O'],
		['O','T','U','C','E','N'],
		['N','O','L','G','U','E'],
		['D','C','M','P','A','E'],
		['E','R','I','N','S','H']
	],
	letters: []
};

function randSort( a, b ) {
	var n = Math.random();
	if( n > 0.5 ) 
		return -1;
	else
		return 1;
}

App.shuffle = function() {
	var d = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort( randSort );
	//console.log( d.join(' ') );
	App.letters = d.map( function( i ) {
		var d = App.dices[i];
		var pos = Math.floor( Math.random() * 6);
		var l = d[ pos ];
		return l;
	});
	console.log( App.letters.join(' ') );
};

App.restart = function() {

	App.stopTimer();
	GUI.hideEndTime();

	App.shuffle();
	GUI.clearBoard();
	GUI.buildBoard( App.letters );
	
	App.remaining_secs = App.countdown_secs;
	GUI.showTime( App.remaining_secs );
	
	App.startTimer();
};

App.startTimer = function() {
	App.stopTimer();
	App.timer_id = setInterval( App.countdown, App.countdown_secs + 1000 );
};

App.stopTimer = function() {
	if( App.timer_id ) {
		clearInterval( App.timer_id );
		App.timer_id = null;
	}
};

App.countdown = function() {
	App.remaining_secs--;
	if( App.remaining_secs <= 0 ) {
		GUI.showTime( 0 );
		App.stopTimer();
		GUI.showEndTime();
	}
	else
		GUI.showTime( App.remaining_secs );
};

App.start = function() {
	GUI.startGame();
	App.restart();
};

App.setup = function() {
	if( App.initialized == true ) return;
	
	var b = document.getElementById( 'butRestart' );
	b.addEventListener('click', App.restart, false );

	var b = document.getElementById( 'butStart' );
	b.addEventListener('click', App.start, false );
	
	App.initialized = true;
};


document.addEventListener('deviceready', App.setup, false);

document.body.onload = function() {
	App.setup();
};
