// ==UserScript==
// @name     ErExt_Common
// @include www.ereality.ru/core/*
// @require tools/jquery.js
// @require tools.js
// @require css/popup-css.js
// @require tools/popup.js
// @require tools/messaging-enum.js
//
// @require css/common-css.js
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
// @require common/fisher/fisher-builder.js
// @require common/fisher/fisher-counter.js
//
// @require common/context-blocker/context-blocker.js
//
// @require common/OK-hide-corpses.js
//
// @require common/freeze_chat.js
//
// @require common/golosovalka.js
//
// @require common/turquoise_info.js
//
// @require common/abilki-heal.js
//
// @require common/teleport.js
//
// @require common/sounds-on-off.js
//
// @require common/trace-map/trace-map.js
//
// @require common/location-info/location-info.js
//
// @require common/presents2016.js
// ==/UserScript==

kango.invokeAsync('kango.storage.getItem', "options", function(options) {
	var mergedOptions = mergeOptions(options, defaultConfig.myoptions);

	// check if plug-in on pause
	if (!mergedOptions.unpaused) {
		return;
	}
	
	//var holder = $("#div_users a#span_sort");

	// Индекс кучки параметром перекидываю в доступные настройки
	if (mergedOptions.sledopit) {
		var systemOptions = mergeOptions(kango.storage.getItem('systemOptions'), defaultConfig.systemOptions);
		mergedOptions.sledopit_index = systemOptions.sledopit_index;
	};


	if (mergedOptions.buttons_holder) button_holder_init();
	else $("#div_users").children().first().after("<div class=\"wrap\" style=\"z-index: 95;\"><span id=\"mur_holder\"></span></div>");

	var holder = $('#mur_holder');

	// Открывашка подарков 2016
	if (mergedOptions.presents2016) {
		var presents2016 = new presents2016Class(presents2016Css, holder);
		presents2016.init();
	}

	// Восстановлениие здоровья персонажа за счет абилок
	if (mergedOptions.abil_heal) {
		var abilHeal = new abilHealClass(abilHealCss, holder);
		abilHeal.init();
	}

	// Телепорт малым свитком
	if (mergedOptions.teleport) {
		var teleport = new teleportClass(teleportCss, holder);
		teleport.init();
	}

	// Отключение/включение звуков в игре
	if (mergedOptions.sounds_on_off) {
		var sounds = new soundsClass(soundsCss, holder, popup);
		sounds.init();
	}

	// Показывать только живых на локе Острова Крови
	if (mergedOptions.ok_hide_corpses) {
		var hideCorpses = new hideCorpsesClass(hideCorpsesCss, holder);
		hideCorpses.init();
	}

	// Заморозка чата
	if (mergedOptions.freeze_chat) {
		var freezeChat = new freezeChatClass(freezeChatCss, holder);
		freezeChat.init();
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

    // init silent fisher
    if (mergedOptions.fisherEnabled) {
        new fisherBuilderClass(fisherCss, fishCounterCss, holder).init();
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
		var traceMap = new traceMapClass(traceCss, holder, popup);
		traceMap.init();
	}
	
	//init corpses service  Сайт корпсов походу непашет уже
	//var corpsesService = new corpsesServiceClass($("#chat_msg"));
	//corpsesService.init();

	// init monster locations
	if (mergedOptions.monster_locations) {
		var monsterLocationBuilder = new monsterLocationBuilderClass(monsterLocationBuilderCss, factionCounterCss, holder);
		monsterLocationBuilder.init();
	}

	// Информация о товарах на островах
	if (mergedOptions.turquoise_info) {
		var turquoiseInfoBuilder = new turquoiseInfoClass(turquoiseCss, holder);
		turquoiseInfoBuilder.init();
	}
	
	// Голосовалка за профессии
	if (mergedOptions.golosovalka) {
		var golosovalka = new golosovalkaClass(golosovalkaCss, holder);
		golosovalka.init();
	}

	// init location info
	if (myoptions.location_info) {
		new locationInfoClass('chat_msg', 'span_location', 'span_location_count').init();
	}
	
	// Увеличенные кнопки дополнения
	if (mergedOptions.biggest_buttons) {
		$("img", $(".wrap")).css({
			"background-color": "#d7d7d7",
			"border": "1px solid #AAAAAA",
			"cursor": "pointer",
			"height": "13px",
			"margin-left": "3px",
			"padding": "5px"
		});
		$(".wrap").css({
			"background-color": "",
			"border": "",
			"padding": ""
		});
		if (!mergedOptions.buttons_holder) $(".wrap").css({
			"position": "absolute",
			"margin-left": "15px",
			"right": "30px",
			"top": "-30px"
		});
	}
});




