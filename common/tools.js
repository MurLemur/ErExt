var myoptions = {
	"faceshop":true,
	"efimerka":true,
	"unpaused":true,
	"info":true,
	"zk":true,
	"glamurstupki":true,
	"bodestate":true,
	"sidzoku":true,
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
	"trade_buy_full_lot": true
}

var systemOptions = {
	"background_scripts_host": "cron.un-limits.ru/er"
 }

var soundOptions = {
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
	"sound_item_broken": {
		sound: "nosound",
		detect: "Вещи сломались"
	}
	
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
