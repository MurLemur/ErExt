// ==UserScript==
// @name        ErExt_main
// @include     www.ereality.ru/core*
// @include		www.ereality.ru/map.php*
// @include		www.ereality.ru/move*
// @include     www.ereality.ru/instance*
// @require     tools.js
// @require		tools/jquery.js
// @require     tools/messaging-enum.js

// @require		common/click-detectors/key-maps.js
// @require		common/click-detectors/detectors-class.js

// @all-frames  true
// ==/UserScript==

//================================================================Begin

kango.invokeAsync('kango.storage.getItem',"options",function(value) {
	myoptions = mergeOptions(value, defaultConfig.myoptions);

	if (!myoptions.unpaused) {
		return;
	}

//=====================================================================

if (myoptions.unpaused) {
	if (location.href.search("www.ereality.ru/core") != -1) {

		if (kango.browser.getName() != "firefox") {
			document.getElementById("span_sort").previousElementSibling.href='javascript: users.load(); document.getElementById("a_users_loc").focus();';
			document.getElementById("a_users_loc").href='javascript: users.load(); document.getElementById("a_users_loc").focus();';
			document.getElementById("span_mode5").firstChild.nextSibling.href='javascript: fdemands.load(5); document.getElementById("span_mode5").firstChild.nextSibling.focus();';
		}

		document.onkeyup = function (e) { 
			e = e || window.event;

			var detectors = new detectorsClass(clickDetectorsKeyMaps, myoptions);
			
			detectors.detectAttackLocationClick(e.keyCode);
			detectors.detectCancelClick(e.keyCode);
			detectors.detectBattleClick(e.keyCode);
			detectors.detectCapchaClick(e.keyCode);
			detectors.detectUndergroundClick(e.keyCode);
			detectors.detectInstanceClick(e.keyCode);
			detectors.detectEnterClick(e.keyCode);
			
			// Отменяем или нет действие браузера
			return myoptions.no_block_browser_keys;
		}
	} 
	else if ((location.href.search("www.ereality.ru/move") != -1)&&(myoptions.chatsectors)) { 
		document.onkeyup = function (e) {
			e = e || window.event;
						
			var detectors = new detectorsClass(clickDetectorsKeyMaps, myoptions);
			detectors.detectCancelClick(e.keyCode);
			
			// Отменяем или нет действие браузера
			return myoptions.no_block_browser_keys;
		}

		window.setTimeout( function() {
			var clearlink = document.createElement('A');
			clearlink.href = 'javascript:window.parent.chat.myshowSec("","")';
			clearlink.innerHTML ="[X]";
			
			if ((document.getElementById("searchY")!=null)&&(document.getElementById("searchY").value!=""))	{
				document.getElementById("searchY").parentNode.appendChild(clearlink);
			}
			else if ((document.getElementById("sy2")!=null)&&(document.getElementById("sy2").value!="")) {
				document.getElementById("sy2").parentNode.appendChild(clearlink);
			}
		} , 0);
	}
	else if (location.href.search("www.ereality.ru/instance") != -1) {
		document.onkeyup = function (e) {
			e = e || window.event;
			
			var detectors = new detectorsClass(clickDetectorsKeyMaps, myoptions);
			detectors.detectInstanceClick(e.keyCode);	
			
			// Отменяем или нет действие браузера
			return myoptions.no_block_browser_keys;
		}
	}  
	else if ((location.href.search("www.ereality.ru/map.php") != -1) && (location.href.search("rating") == -1)  && (location.href.search("fights") == -1)) {  // Исключая рейтинги на арене,там свой обработчик ников
		if (location.href.search("action=demands") != -1) {
			xpathRes = xpath('//a[contains(@href,"/map.php?action=demands")]');
			
			if (xpathRes.snapshotLength>0) {
				xpathRes.snapshotItem(0).focus();
			} 
		}

		if (myoptions.clnick) {   
			div = document.getElementById("div_bhtml"); // Кликабельные ники
			if (div!=undefined) {   
				xpathRes = xpath('//div[@id="div_bhtml"]//img[contains(@src,"img.ereality.ru/inf.gif")]');
				
				if (xpathRes.snapshotLength>0) {
					for(i=0; i<xpathRes.snapshotLength; i++) {
						el=xpathRes.snapshotItem(i).parentNode.previousSibling.previousSibling;
						if (el!=undefined) {
							el.setAttribute("onclick", "if (this.firstChild.innerHTML==undefined) {top.chat.msg(this.innerHTML)} else {top.chat.msg(this.firstChild.innerHTML)}");
							el.setAttribute("style", "cursor:pointer");
						}
					}
				}
			}	
		}

		document.onkeyup = function (e) {
			e = e || window.event;
			
			var detectors = new detectorsClass(clickDetectorsKeyMaps, myoptions);
			detectors.detectUndergroundClick(e.keyCode);
			
			// Отменяем или нет действие браузера
			return myoptions.no_block_browser_keys;
		}
			if (myoptions.underground_map) {
				if (top.frames.main != undefined && top.frames.main.document.getElementById("underground") != null) {
					kango.dispatchMessage(messagingEnum.UndergroundToBackground, top.document.getElementById("span_location").innerHTML.replace("Сектор (", "").replace(")", ""));
				}
			} 

}			
//=========================end.

} 
 }); 