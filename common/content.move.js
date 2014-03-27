// ==UserScript==
// @name     ErExt_ModifyMove
// @include	http://www.ereality.ru/move*
// @require     tools.js
// @all-frames  true
// ==/UserScript==

//================================================================Begin

kango.invokeAsync('kango.storage.getItem', "options", function(value) {
		myoptions = mergeOptions(value, myoptions);

		if (!myoptions.unpaused) {
			return;
		}
//=====================================================================  

		//Модернизация механизма изгонялок на альенах
		if (myoptions.aliensmy) {
			var scr = document.createElement("script");
			scr.text = "(" +
				(function() {

				div = document.getElementById("aliens_stats");

				if (div != undefined) {

					res = div.getElementsByTagName("b");

					function getout1(name) {
						
						var xmlPath = '/ajax/aliens/';

						for (var $g_id in aliens_stats) {
							var users = aliens_stats[$g_id]['users'];
							for (var j = 0; j < users.length; j++) {
								if (users[j][1] == name) {
									var h_id = users[j][0]
								}
							}
						}

						xmlText = '<request action="getOut">' + '<h_id>' + h_id + '</h_id>' + '</request>';

						top.core.xmlSend(xmlPath, xmlText, function(xmldoc) {
							top.core.alertMsg($('msg', xmldoc).text());
						});
					}



					for (i = 0; i < res.length; i++) {
						if (res[i].innerHTML != top.user.name) {
							glink = "<a href='#' >[X]</a><b style='color: #666;'>" + res[i].innerHTML + "</b>";
							div.innerHTML = div.innerHTML.replace('<b style="color: #666;">' + res[i].innerHTML + "</b>", glink);
							g1link = "<a href='#' >[X]</a><b style='cursor: pointer'>" + res[i].innerHTML + "</b>";
							div.innerHTML = div.innerHTML.replace('<b style="cursor: pointer">' + res[i].innerHTML + "</b>", g1link);
						}
					}

					links = div.getElementsByTagName("a");

					for (i = 0; i < links.length; i++) {
						links[i].addEventListener("click", function() {
							getout1(this.nextSibling.innerHTML);
						});
					}
				}
			}).toString() + ")();";

			document.body.appendChild(scr);
		}

//=========================end.
	}
});