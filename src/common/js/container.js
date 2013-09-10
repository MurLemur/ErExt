var container = (function(){
	var features;

	function init (featuresList) {
		features = featuresList;
	}

	function load (options) {
		for (featureName in features) {
			if (features.hasOwnProperty(featureName)) {
				if (options[featureName]) {
					features[featureName].func();
				}
			}
		}
	}

	return {init: init, load: load};
})();