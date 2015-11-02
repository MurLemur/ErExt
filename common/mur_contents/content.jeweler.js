// ==UserScript==
// @name        jeweler
// @include     www.ereality.ru/move/jeweler*
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

	//Обновка инфы для таймера Ювелирки
	if (myoptions.timer_jeweler) {
		script= "(" +
	(function(){
	var OldjsonCallback=jeweler.jsonCallback;
	jeweler.jsonCallback=function(data){
		top.core.mur_timer.jeweler_parseinfo(data);
		var myrezult=OldjsonCallback.apply(jeweler,arguments);
	    return myrezult
	}
	jeweler.initController();
	
	}).toString()
	+ ")();"; 
}
	inject_global(script);
	

	//=========================end.
});