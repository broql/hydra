var Doodle = (function() {

	var canvas,
		ctx,
		x = 300,
		y = 300;

	return {

		init: function( options ) {

			canvas = document.getElementById( options.id ),
			ctx = canvas.getContext( '2d' );
		},

		draw: function( axisX, axisY ) {

			x = x + axisX;
			y = y + axisY;

			ctx.lineTo( x + axisX, y + axisY );
			ctx.stroke();
		}
	};

})();