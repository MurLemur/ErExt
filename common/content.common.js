// ==UserScript==
// @name     ErExt_Common
// @include http://www.ereality.ru/core/*
// @require tools/jquery.js
// @require tools.js
// @require css/popup-css.js
// @require tools/popup.js
// @require tools/messaging-enum.js
//
// @require css/faction-counter-css.js
// @require css/faction-count-builder-css.js
// @require css/battle-count-builder-css.js
// @require css/monster-locations-builder-css.js
// @require common/buttons_holder.js
// @require common/monster-locations/monster-locations.js
// @require common/monster-locations/monster-locations-builder.js
// @require common/faction-counter/faction-counter.js
// @require common/faction-counter/faction-count-builder.js
//
// @require common/battle-counter/battle-counter.js
// @require common/battle-counter/battle-count-builder.js
//
// @require css/items-builder-css.js
// @require user/active-items/items-builder.js
// @require user/active-items/user-list-active-items.js
//
// @require css/context-blocker-css.js
// @require common/context-blocker/context-blocker.js
//
// @require css/trace-map-css.js
// @require common/trace-map/trace-map.js
//
// @require common/services/corpses.js
// ==/UserScript==

kango.invokeAsync('kango.storage.getItem', "options", function(options) {
	var mergedOptions = mergeOptions(options, defaultConfig.myoptions);

	// check if plug-in on pause
	if (!mergedOptions.unpaused) {
		return;
	}
	
	var holder = $("#div_users a#span_sort");

	if (mergedOptions.buttons_holder) {
		button_holder_init();
		var holder = $('#mur_holder');
	}
	
	// init faction count
	if (mergedOptions.okcount) {
		var factionContBuilder = new factionContBuilderClass(factionContBuilderCss, factionCounterCss, holder);
		factionContBuilder.init();
	}

	// init battle count
	if (mergedOptions.battleCounter) {
		var battleCountBuilder = new battleCountBuilderClass(factionContBuilderCss, factionCounterCss, holder);
		battleCountBuilder.init();
	}	
	
	// init user list active items
	if (mergedOptions.userlistactiveitems) {
		kango.invokeAsync('kango.storage.getItem', "systemOptions", function(options) {
			var mergedSystemOptions = mergeOptions(options, defaultConfig.systemOptions);
			kango.dispatchMessage(messagingEnum.userActiveItemsStart, {
				host: mergedSystemOptions.background_scripts_host
			});
			var usersListActiveItems = new usersListActiveItemsClass("#div_users", "a[class=b]", messagingEnum, popup);
			usersListActiveItems.init();
			var activeItemsInBattle = new usersListActiveItemsClass("#div_battle", "span[class*=bp]", messagingEnum, popup);
			activeItemsInBattle.init();

		});
	}	
	
	// init block context menu
	if (mergedOptions.block_cmenu) {
		var contextBlocker = new contextBlockerClass(contextBlockerCss, holder);
		contextBlocker.init();
	}

	// init trace map
	if (mergedOptions.map_trace) {
		var traceMap = new traceMapClass(traceCss, holder);
		traceMap.init();
	}
	
	//init corpses service
	var corpsesService = new corpsesServiceClass($("#chat_msg"));
	corpsesService.init();

	// init monster locations
	if (mergedOptions.monster_locations) {
		var monsterLocationBuilder = new monsterLocationBuilderClass(monsterLocationBuilderCss, factionCounterCss, holder);
		monsterLocationBuilder.init();
	}	

});




