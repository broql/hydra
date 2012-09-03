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
							z: Math.round((event.accelerationIncludingGravity.z * 1)),
							alpha: Math.round(event.rotationRate.alpha),
							beta: Math.round(event.rotationRate.beta),
							gamma: Math.round(event.rotationRate.gamma)
						};

						socket.emit( 'event_data', data );

						callback();

					} catch( e ) {
						
						console.log( e );

					}

				}

			}, false);

			return this;
		}
	};

	Hydra.prototype.init.prototype = Hydra.prototype;

	window.Hydra = Hydra;

})();