
var map = L.map('map').setView([-37.8168, 144.9643], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}', {
	minZoom: 2,
	maxBounds: [[37.924, 144.757], [-37.704, 145.169]], 
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'paravangular.0e19bb9d',
	token: 'pk.eyJ1IjoicGFyYXZhbmd1bGFyIiwiYSI6ImNpaDRiOGthYjB5YWN2cW0za3V2YzgzdGwifQ.FrPUWKbz5JSu3u666wlPLA'
}).addTo(map);

// Load tram stop and activity data
var tram_activity;

d3.json("sourcefiles/stops.json", function(error, json) {
    if (error) return console.warn(error);
    tram_activity = json;

    for (var id in tram_activity) {
        var stop = tram_activity[id];
        L.circle([stop.latitude, stop.longitude], setStopSize(id, 1), {
        	fillColor: setStopColour(id),
    		fillOpacity: 0.5,
    		color: 'red',
			opacity: 0,
			weight: 0.5,
			className: id + " stop-marker"    	
		}).addTo(map);

		setStopColour(id)
    };

    function setStopSize(id, sizemultiplier) {
	    if (tram_activity[id.toString()]) {
	        var size = Math.sqrt(tram_activity[id]['total'] / (Math.PI));
	        return size * sizemultiplier;
	    } else {
	        return 0.1;
	    };
	};

	function setStopColour(id) {
		var colours = ["#67001f","#b2182b","#d6604d", "#4393c3","#2166ac","#313695"];

		var diff = tram_activity[id]['board'] - tram_activity[id]['alight'];

		var baseline = 7702;
		var bin = 3000;

		return colours[Math.ceil((diff + baseline) / bin) % colours.length];
	};

	// Create click event listener
	d3.selectAll(".stop-marker").on("click", function() {
		var stop_class = this.className.baseVal;
		var stop_id = stop_class.split(' ')[0]; // *** stop_id must be first class
		

	});
});


