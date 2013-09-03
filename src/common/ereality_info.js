// ==UserScript==
// @name        ErExt_info
// @include     http://www.ereality.ru/~*
// @include     http://www.ereality.ru/info*
// ==/UserScript==

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

var plugins = (function (){
	var plugins = [];

	function init () {
		plugins = [
			{name: 'info', func: richInfo},
			{name: 'clan_info', func: clanInfo}
		];

		return this;
	}

	function richInfo () {
		var infoButton = document.createElement("input");
		infoButton.type = "button";
		infoButton.value = "info";
		var xpathRes = xpath("/html/body/div[3]/div[7]/div/div");
		xpathRes.snapshotItem(0).insertAdjacentHTML("beforeEnd", "<p></p>");
		xpathRes.snapshotItem(0).appendChild(infoButton);
		var name = xpath("/html/body/div[3]/div[6]/div/strong").snapshotItem(0).innerHTML;

		infoButton.addEventListener("click", function () {
			kango.xhr.send({
				method: 'post',
				url: 'http://sp.erclans.ru/evgeska_prof.php?calc=heroesinfo',
				async: true,
				params: {'prof': CP1251urlencode(name), 'submit': 'просмотреть'},
				contentType: 'text',
				mimeType: "text/html;charset=windows-1251",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded;"
				}
			}, function(data) {
				if (data.status == 200) {
					var response = data.response;
					var mystr = response.substring(
							response.indexOf('<table width="95%" border="1" bgcolor="D7D7D7">'),
							response.lastIndexOf('<br><br><div align="center">')
						),
						mestovstavki = xpath('//*[@id="content"]'),
						oFont = document.createElement("font");
					oFont.size = "-3";
					mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
					oFont.insertAdjacentHTML(
						"afterBegin",
						mystr.replace(
							new RegExp("evgeska/images/",'g'),
							"http://sp.erclans.ru/evgeska/images/"
						)
					);
					infoButton.remove();
				}
			});
		}, false);
	}

	function clanInfo () {
		for(var i = 0; i < document.images.length; ++i) {
			if (document.images[i].src.indexOf('http://img.ereality.ru/clan/') == 0) {
				var id = document.images[i].src.replace("http://img.ereality.ru/clan/","").replace(".gif","");
				var clanlink = document.createElement('A');
				clanlink.href = 'http://www.news.ereality.ru/index.php?do=static&page=sostav&id='+id;
				clanlink.target = '_blank';
				clanlink.innerHTML = '<img src="http://img.ereality.ru/inf.gif"</img>';
				document.images[i].parentNode.insertBefore(clanlink,document.images[i]);
				i++;
			}
		}
	}

	function load (pluginsList) {
		for (var i = 0, c = plugins.length; i < c; i++) {
			if (pluginsList[plugins[i].name]) {
				plugins[i].func();
			}
		}

		plugins['clan_info'].func(); //perm enabled
	}

	return {init: init, load: load};
})().init();


kango.invokeAsync('kango.storage.getItem', 'options', function (value) {
	plugins.load(value);
});

