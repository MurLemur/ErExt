
var defaultConfig = {
	myoptions: {
		"faceshop":false,
		"efimerka":false,
		"armory":true,
		"unpaused":true,
		"info":true,
		"zk":true,
		"glamurstupki":true,
		"bodestate":true,
		"sidzoku":true,
		"spdressroom":true,
		"okcount":true,
		"cemetry":true,
		"numfight":true,
		"numcapcha":true,
		"kbdinst":true,
		"chatsectors":true,
		"dragon_time":true,
		"location_info":true,
		"block_cmenu":true,
		"tab_refresh":true,
		"esc_move":true,
		"fastex":true,
		"kbdunderground":true,
		"lotereya":true,
		"estatenamelink":true,
		"forumgoto":true,
		"aliensmy":true,
		"clnick":true,
		"keyenter":true,
		"keyalt":true,
		"questsectors":true,
		"userlistactiveitems": true,
		"damaged_items_notification_filter": true,
		"clickable_nicks_on_clan_tournament": true,
		"stockmy":true,
		"map_trace":true,
		"startup_update_notification":true,
		"global_info": true,
		"trade_buy_full_lot": true,
		"contextmenus": true,
		"teammate_trace": false,
		"taverna_fast_click": true,
		"timer_taverna": true,
		"timer_estate": true,
		"timer_pet": true,
		"timer_egg": true,
		"stock_sell_offline_find": true,
		"clickablePSmiles" : true,
		'clickbaleNamesInGlobalEventReports' : true,
		'estateVictims': true,
		'battleInfo': true,
		'menu_maps': true,
		'battleCounter': true,
		'lottery_zk': true,
		'repeat_kudes': true,
		'monster_locations': true,
		'no_flash': false,
		'buttons_holder': false,
		'kt_in_battle': false,
		'ok_hide_corpses': true,
		'biggest_buttons': false,
		'freeze_chat': true,
		'abil_heal': false,
		'sounds_on_off': true,
		'battle_move': false,
		'oplot_button': true,
		'forum_pages': true,
		'clan_ct_buttons': true,
		'inventory': true,
		'snow': true,
		'no_block_browser_keys': true,
		'chatLightMessage': false,
		'filterEmptyJailNotfication': false,
		'okHelpMessageFilterEnabled': false,
		'filterOneTeamIsStrongerMessage': false,
		'filterBattleIsClosedMessage': false,
		'filterRingOfRendomMessage': false,
		'filterGoldenHorseShoeMessage' : false,
		'filterEliteTournamentMessage' : false 
	},
	
	systemOptions: {
		"background_scripts_host": "gosov.net/murlemur",
		"trace_img_src": "",
		"locatioons_ovl": "",
		"locatioons_opp": "",
		"custom_sounds": "",
		"estateVictims" : {
			"popupPositionX" : -1,
			"popupPositionY" : -1
		},
		"okHelpMessageMinLevel" : 10,
		"chatBgColor" : "#00FF7F"
	},

	soundOptions: {
		"sound_elitka": {
			sound: "nosound",
			detect: "Вас вызвали на арену Элитных Турниров! Есть"
		},
		"sound_event": {
			sound: "nosound",
			detect: "Началось случайное событие <b>"
		},
		"sound_kt": {
			sound: "nosound",
			detect: "Сражаются: <img width="
		},
		"sound_aliens": {
			sound: "nosound",
			detect: "Добро пожаловать на остров! Вы можете координировать"
		},
		"sound_fishing": {
			sound: "nosound",
			detect: "У вас закончилась приманка!"
		},
		"sound_tool_broken": {
			sound: "nosound",
			detect: "текущая прочность инструмента: <b>0</b>"
		},
		"sound_user_injury" : {
			sound: "nosound",
			detect: "Персонаж .+ травмирован"	
		},
		"sound_random_event": {
			sound: "nosound",
			detect: ""
		},
		"sound_zavod": {
			sound: "nosound",
			detect: ""
		},
		"sound_taverna": {
			sound: "nosound",
			detect: ""
		},
		"sound_item_broken": {
			sound: "nosound",
			detect: "Вещи сломались"
		},
		"sound_caving": {
			sound: "nosound",
			detect: "Сейсмопредупреждение"
		},
		"sound_vnezap": {
			sound: "nosound",
			detect: "Внезапный удар"
		}	,
		"sound_heal": {
			sound: "nosound",
			detect: "Воодушевление"
		},
		"sound_25": {
			sound: "nosound",
			detect: ""
		},
		"sound_50": {
			sound: "nosound",
			detect: ""
		},
		"sound_75": {
			sound: "nosound",
			detect: ""
		},
		"sound_100": {
			sound: "nosound",
			detect: ""
		}								
	},	
	estateVictims: {}
}

function mergeOptions(options, defaultOptions) {
	if (options === null) {
		return defaultOptions;
	}

	for (key in options) {
		defaultOptions[key] = options[key];
	}
	
	return defaultOptions;
}

function xpath(query, object) {
	if(!object) var object = document;
	return object.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var trans=[];
var snart=[];
for (var i = 0x410; i <= 0x44F; i++) {
	trans[i] = i - 0x350;
	snart[i-0x350] = i;
}
trans[0x401]= 0xA8;
trans[0x451]= 0xB8;
snart[0xA8] = 0x401;
snart[0xB8] = 0x451;

CP1251urlencode = function(str) {
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
}

function inject_global(script_src) {
	var scr = document.createElement("script");
	scr.text = script_src;
	document.body.appendChild(scr);
}

getStringifyParams = function(str) {
	var mas = str.match(/(.*)$/gm);
	var result = "";
	for (var i = 0; i < mas.length; i++) {
		if (mas[i] != "") result += mas[i] + "\"+\n\"";
	};
return result;
}


var toolsClass = function() {
	var self = this;
	
	this.loadOptions = function(options, callback) {
		self._loadOption(options, {}, callback);
	};
	
	this._loadOption = function(options, loadedOptions, callback) {
		if (options.length > 0) {			
			options = jQuery.extend(true, [], options);
			option = options.pop();
			kango.invokeAsync('kango.storage.getItem', option.systemName, function(extOptions) { 
				loadedOptions[option.systemName] = JSON.parse(JSON.stringify(mergeOptions(extOptions, defaultConfig[option.defaultName])));	
				self._loadOption(options, loadedOptions, callback);			
			});	
		} else {
			callback(loadedOptions);
		}
	};
}

var tools = new toolsClass();
