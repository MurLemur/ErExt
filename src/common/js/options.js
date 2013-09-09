var options = (function() {
	var optionNames = [
			'faceshop',
			'efimerka',
			'info',
			'zk',
			'naemniki',
			'bodestate',
			'sidzoku',
			'okcount',
			'cemetry',
			'numfight',
			'numcapcha',
			'kbdinst',
			'chatsectors',
			'clan_info',
			'dragon_time'
		],
		options = {};

	function load (callback) {
		kango.invokeAsync('kango.storage.getItem', 'options', function (data) {
			for (var i = 0, c = optionNames.length; i < c; i++) {
				options[optionNames[i]] = typeof data[optionNames[i]] != "undefined" ? data[optionNames[i]] : false;
			}

			callback(options);
		});
	}

	return {load: load};
})();