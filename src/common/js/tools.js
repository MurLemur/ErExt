var tools = (function(){

	function xpath(query, object) {
		object = object || document;
		return object.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	var CP1251urlencode = (function(){
		var trans=[];
		var snart=[];
		for(var i=0x410;i<=0x44F;i++) {
			trans[i]=i-0x350;
			snart[i-0x350] = i;
		}
		trans[0x401] = 0xA8;
		trans[0x451] = 0xB8;
		snart[0xA8] = 0x401;
		snart[0xB8] = 0x451;

		return function(str) {
			var ret=[];
			for(var i=0;i<str.length;i++) {
				var n=str.charCodeAt(i);
				if(typeof trans[n]!='undefined') {
					n = trans[n];
				}
				if (n <= 0xFF) {
					ret.push(n);
				}
			}

			return escape(String.fromCharCode.apply(null,ret));
		};
	})();

	return {xpath: xpath, cp1251urlencode: CP1251urlencode}
})();

