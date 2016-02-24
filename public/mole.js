(function(){
	
		// Holds timeout id for default animation.
	var timeoutId;
	
		// Holds interval id for game loop.
	var intervalId;

		// Holds current score.
	var score = 0;
	
		// Holds id of active tile.
	var tile;

	

		// Generates a random tile to be animated. Calls animating function and listener function.
	function generateTile() {
		tile = Math.floor(Math.random() * 9);
		animateTile(tile);
		addListener(tile);
	};



		// Animates the active tile. Calls default return animation in case user misses.
	function animateTile(tile) {
		var tileId = $('#' + tile);

		tileId.toggleClass('active');

		moleMiss(tile);
	};


	
		// Animates the default return animation, and removes the event listener for the tile. Runs on timeout.
	function moleMiss(tile) {
		var tileId = $('#' + tile);

		timeoutId = setTimeout(function() {
			tileId.toggleClass('active');
			removeListener(tile);
		}, 2000);
	};


	
		// Function to add event listener to specified tile. Listener calls moleWhack animation.
	function addListener(tile) {
		document.getElementById(tile).addEventListener('click', moleWhack);
	};


	
		// Function to remove event listener from a specified tile.
	function removeListener(tile) {
		document.getElementById(tile).removeEventListener('click', moleWhack);

	};


	
		// Causes return animation when user clicks active tile. Clears the timeout for the default return
		// animation. Removes the listener for the tile, and records the score.
	function moleWhack() {
		$(this).toggleClass('active');
		clearTimeout(timeoutId);
		removeListener(tile);
		recordScore();
	};


	
		// Function to increment, display, and check score. If score reaches specified value, end the game.
	function recordScore() {
		score++;
		$('#currentscore').text('Current score: ' + score);
		if (score == 30) {
			endGame();
			alert('You win!');
		};
	};

	

		// Function to end the game. Clears the interval for the game loop, resets the score, clears the timeout for
		// the default return animation and immediately runs it. Removes listener from active tile.
	function endGame() {
		clearInterval(intervalId);
		score = 0;
		clearTimeout(timeoutId);
		$('#' + tile).toggleClass('active');
		if (tile != null) {
			removeListener(tile);
		};
	};


	
		// Function to start the game. Calls 'endGame' to reset all values, initializes score, and
		// sets the game loop interval.
	function startGame() {
		endGame();
		$('#currentscore').text('Current score: ' + score);
		intervalId = setInterval(generateTile, 2000);
	};


	
		// Calls 'startGame' when button is clicked.
	document.getElementById('newGame').addEventListener('click', startGame);

})();