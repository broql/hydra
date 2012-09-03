var Doodle = (function () {

	var canvas,
		ctx,
		x = 300,
		y = 300;

	return {

		init: function(options) {
			canvas = document.getElementById( options.id ),
			ctx = canvas.getContext( '2d' );
		},

		draw: function(data) {

			var move = moveDetection( data );

			x = x + move.x;
			y = y + move.y;

			ctx.strokeStyle = move.color;
			ctx.lineTo( x , y );
			ctx.stroke();
		}
	};

	function moveDetection(data) {

		if (data.y < 0 && (Math.abs(data.y)) > Math.abs(data.x)) {  // direction: bottom
			return {
				x: 0,
				y: +1,
				color: "#f0f"
			};
		}

		if (data.y > 0 && (Math.abs(data.y)) > Math.abs(data.x)) { // direction: top
			return {
				x: 0,
				y: -1,
				color: "#00f"
			};
		}

		if (data.x > 0 && (Math.abs(data.x)) > Math.abs(data.y)) { // direction: right
			return {
				x: +1,
				y: 0,
				color: "#0f0"
			};
		}

		if (data.x < 0 && (Math.abs(data.x)) > Math.abs(data.y)) { // direction: left
			return {
				x: -1,
				y: 0,
				color: "#f00"
			};
		}

		return {
			x: 0,
			y: 0
		};

	}

})();