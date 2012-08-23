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

				try {
					var data = {
						x: event.accelerationIncludingGravity.x,
						y: event.accelerationIncludingGravity.y,
						z: event.accelerationIncludingGravity.z
					};

					socket.emit( 'event_data', data );

					callback();
				}
				catch( e ) {
					console.log( e );
				}

			}, false);

			return this;
		}
	}

	Hydra.prototype.init.prototype = Hydra.prototype;

	window.Hydra = Hydra;

})();