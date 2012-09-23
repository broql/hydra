( function(){

	Hydra = function( selector ) {

		return new Hydra.prototype.init( selector );

	};

	Hydra.prototype = {

		constructor: Hydra,

		init: function( selector ){

			this['collection'] = ( selector === 'window' ) ? window : document.querySelectorAll( selector );

			return this;
		},

		listenTo: function( eventType, callback ) {

			this['collection'].addEventListener(eventType, function(){


				if( eventType === 'devicemotion' || eventType === 'deviceOnMove' ) {

					try {

						var data = {
							x: Math.round((event.accelerationIncludingGravity.x * 1)),
							y: Math.round((event.accelerationIncludingGravity.y * 1)),
							z: Math.round((event.accelerationIncludingGravity.z * 1))
						};

						socket.emit( 'event_data', data );

						callback();

					} catch( e ) {

						console.log( e );

					}

				}

			}, false);

			return this;
		},

		moveDetection: function( data ) {

			if (data.y < 0 && (Math.abs(data.y)) > Math.abs(data.x)) {  // direction: bottom
				return {
					x: 0,
					y: +1,
					softness: data.y,
					color: "#f0f"
				};
			}

			if (data.y > 0 && (Math.abs(data.y)) > Math.abs(data.x)) { // direction: top
				return {
					x: 0,
					y: -1,
					softness: data.y,
					color: "#00f"
				};
			}

			if (data.x > 0 && (Math.abs(data.x)) > Math.abs(data.y)) { // direction: right
				return {
					x: +1,
					y: 0,
					softness: data.x,
					color: "#0f0"
				};
			}

			if (data.x < 0 && (Math.abs(data.x)) > Math.abs(data.y)) { // direction: left
				return {
					x: -1,
					y: 0,
					softness: data.x,
					color: "#f00"
				};
			}

			return {
				x: 0,
				y: 0
			};
		}

	};

	Hydra.prototype.init.prototype = Hydra.prototype;

	window.Hydra = Hydra;

})();