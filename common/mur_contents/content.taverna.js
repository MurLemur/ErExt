// ==UserScript==
// @name        taverna
// @include     www.ereality.ru/map*mode=craft
// @require     tools.js
// @all-frames  true
// ==/UserScript==

//================================================================Begin

kango.invokeAsync('kango.storage.getItem', "options", function(value) {
		myoptions = mergeOptions(value, defaultConfig.myoptions);

		if (!myoptions.unpaused) {
			return;
		}
		//===================================================================== 
		if (myoptions.taverna_fast_click) {
		script = "(" +
			(function() {

			taverna.my_craft = function(idRecipe, count1, count2, count3, cid1, cid2, cid3) {
				var xmlText = '<request action="fillQueue"><idRecipe>' + idRecipe +
				 '</idRecipe><component id="'+cid1+'">'   + count1 +
				  '</component><component id="'+cid2+'">' + count2 + 
				  '</component><component id="'+cid3+'">' + count3 + 
				  '</component></request>';
				top.core.xmlSend(taverna.xmlPath, xmlText, taverna.processResponse);
				return;
			}
			taverna.my_init = function() {	
				if (taverna.page=="FishSoup") {
				$("img[src*=fish_01]")[0].onclick = function() {taverna.my_craft(0, 5, 0, 0, 21, 22, 23)};
				$("img[src*=fish_02]")[0].onclick = function() {taverna.my_craft(0, 0, 5, 0, 21, 22, 23)};
				$("img[src*=fish_03]")[0].onclick = function() {taverna.my_craft(0, 0, 0, 5, 21, 22, 23)};
				$("img[src*=fish_01]")[1].onclick = function() {taverna.my_craft(1, 9, 0, 0, 21, 22, 23)};
				$("img[src*=fish_02]")[1].onclick = function() {taverna.my_craft(1, 0, 9, 0, 21, 22, 23)};
				$("img[src*=fish_03]")[1].onclick = function() {taverna.my_craft(1, 0, 0, 9, 21, 22, 23)};
				$("img[src*=fish_01]")[2].onclick = function() {taverna.my_craft(2, 15, 0, 0, 21, 22, 23)};
				$("img[src*=fish_02]")[2].onclick = function() {taverna.my_craft(2, 0, 15, 0, 21, 22, 23)};
				$("img[src*=fish_03]")[2].onclick = function() {taverna.my_craft(2, 0, 0, 15, 21, 22, 23)};
			} else {
				$("img[src*=crab_01]")[0].onclick = function() {taverna.my_craft(3, 9, 0, 0, 27, 28, 29)};
				$("img[src*=crab_01]")[1].onclick = function() {taverna.my_craft(3, 0, 9, 0, 27, 28, 29)};
				$("img[src*=crab_01]")[2].onclick = function() {taverna.my_craft(3, 0, 0, 9, 27, 28, 29)};
				$("img[src*=crab_02]")[0].onclick = function() {taverna.my_craft(4, 9, 0, 0, 30, 31, 32)};
				$("img[src*=crab_02]")[1].onclick = function() {taverna.my_craft(4, 0, 9, 0, 30, 31, 32)};
				$("img[src*=crab_03]")[0].onclick = function() {taverna.my_craft(5, 9, 0, 0, 33, 34, 35)};
				$("img[src*=crab_03]")[1].onclick = function() {taverna.my_craft(5, 0, 9, 0, 33, 34, 35)};
				$("img[src*=crab_03]")[2].onclick = function() {taverna.my_craft(5, 0, 0, 9, 33, 34, 35)};
			}
				return;
			}

		var old_getCrabSticksHTML = taverna.getCrabSticksHTML;
		taverna.getCrabSticksHTML = function() {
			old_getCrabSticksHTML();
			taverna.my_init();
		}
		var old_getFishSoupHTML = taverna.getFishSoupHTML;
		taverna.getFishSoupHTML = function() {
			old_getFishSoupHTML();
			taverna.my_init();
		}
		window.setTimeout(function() { taverna.my_init()} , 50);

		}).toString() + ")();";
}
	//Обновка инфы для таймера таверны
	if (myoptions.timer_taverna) {
		script= script+ "(" +
	(function(){
	var OldprocessResponse=taverna.processResponse;
	taverna.processResponse=function(xml){
		var myrezult=OldprocessResponse.apply(taverna,arguments);
		top.core.mur_timer.taverna_update = true;
	    return myrezult
	}
	
	}).toString()
	+ ")();"; 
}
	inject_global(script);
	

	//=========================end.
});