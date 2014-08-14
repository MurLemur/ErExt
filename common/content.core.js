// ==UserScript==
// @name     ErExt_ModifyCoreFunc
// @include     http://www.ereality.ru/core/*
// @require     tools.js
// @require     scripts/core_map_trace.js
// @require     scripts/core_monster_locations.js
// @require     scripts/core_timers.js
// @require     scripts/core_battle_counter.js
// @all-frames  false
// ==/UserScript==

kango.invokeAsync('kango.storage.getItem',"soptions", function(value) {
	defaultConfig.soundOptions = mergeOptions(value, defaultConfig.soundOptions);
});
//================================================================Begin

kango.invokeAsync('kango.storage.getItem',"options",function(value) {
	myoptions = mergeOptions(value, defaultConfig.myoptions);

	if (!myoptions.unpaused) {
		return;
	}
//=====================================================================  
  	

var trace_img_src=kango.io.getResourceUrl("res/sec_red.png");
	kango.invokeAsync('kango.storage.getItem', "systemOptions", function(options) {
		var mergedSystemOptions = mergeOptions(options, defaultConfig.systemOptions);
		if (mergedSystemOptions.trace_img_src!="") trace_img_src=mergedSystemOptions.trace_img_src;
		window.setTimeout(function() { pfunction(); }, 100);			
	});

function pfunction(){


 script="";

 if ((myoptions.questsectors)||(myoptions.chatsectors)) {
	script +=  "(" +
	(function(){
		chat.myshowSec = function (xcord,ycord){
		var sectorX = top.frames.main.document.getElementById("searchX");
		if (sectorX!=null) {
			sectorY = top.frames.main.document.getElementById("searchY");
		}
		else {
			sectorX = top.frames.main.document.getElementById("sx2");
			sectorY = top.frames.main.document.getElementById("sy2");
		}
	sectorX.value=xcord;
	sectorY.value=ycord;
	if( window.KeyEvent ) {// Для FF
		var o = document.createEvent('KeyEvents');
		o.initKeyEvent( 'keyup', true, true, window, false, false, false, false, 13, 0 );
		}
	else {// Для остальных браузеров
		var o = document.createEvent('UIEvents');
		o.initUIEvent( 'keyup', true, true, window, 1 );
		  o.keyCode = 13; // Указываем дополнительный параметр, так как initUIEvent его не принимает
		}	
	sectorY.dispatchEvent(o);
	}
	}).toString()
	+ ")();"; 
}
	var erExtImages = {
		globalEventImage: kango.io.getResourceUrl("res/global.jpg")	
	};
	
	var formatSmilesString = (function() {	
		var soundOptions = soundOptionsReplace;
		var erExtOptions = optionsReplace;
		var erExtImages = erExtImagesReplace;
		
		// @TODO refactor it
		function modifySectors(_text) {
			if ((_text.search("опыта")==-1)&&(_text.search("Вы подобрали")==-1)&&(_text.search("aliens")==-1)) {
				if ((_text.search("Ауры")!=-1)||(_text.search("ептикон")!=-1)||(_text.search("за убийство")!=-1)||(_text.search("Людей:")!=-1)) {
					_text=_text.replace(/(\d{1,3})[: \.](\d{1,3})/ig,"<a class=\"textM\" href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>"); 
					}
				else if (_text.search(" сер.")!=-1) 	{
					 _text=_text.replace(/(\d{1,3})[: \-\/](\d{1,3})/ig,"<a class=\"textM\" href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>");
						}
				else {		
					_text=_text.replace(/(\d{1,3})[: \.\-\/](\d{1,3})/ig,"<a class=\"textM\" href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>");
				}			
			}
			
			return _text;
		};
	
		function detectForSound(string, detect, sound) {
			if ((sound == "nosound")||(detect == "")) {
				return false;
			}

			if (string.toLowerCase().search(new RegExp(detect.toLowerCase()), 'g') != -1) {
				core.playSwfSound(sound);
				
				return true;
			}
			
			return false;
		}; 
		
		//Подправляем ссыллки на форум, что-бы было с автологином,
		function modifyForumLink(string) {
			return string.replace(new RegExp("http://forum.ereality.ru", 'g'),"http://www.ereality.ru/goto/forum.ereality.ru");
		};
		
		
		function filterBrokenItemNotifications(_text) {
			if (_text.search('Вещи в критическом состоянии:') == -1) {
				return false;
			}

			if (_text == brokenItems.text && new Date().getTime() - brokenItems.time < brokenItems.messageDelay) {
				return true;
			}
			
			brokenItems.time = new Date().getTime();
			brokenItems.text = _text;
			
			return false;
		}
		
		function modifyClanTournamentMessage(_text) {			
			$.each(clanTournament, function() {
				var regEx = new RegExp(this.detect, 'g')
				if (_text.search(regEx) > -1) {				
					_text = _text.replace(regEx, this.replace);
				}
			});
			
			return _text;
		}
		
		function modifyPrivateSmiles(_text) {
			var pSmiles = {};
			var matches = _text.match(new RegExp('"%PS%([0-9]+)', 'g'));
			
			if (matches == null) { 
				return _text;
			}
			
			$.each(matches, function() {
				var smileID = this.substr(5);

				if ($.inArray(parseInt(smileID), chat.psmile) > -1 && pSmiles[smileID] == null) {
					pSmiles[smileID] = true;
					
					_text = _text.replace(new RegExp('<img src="%PS%' +  smileID + '.gif">', 'g') , '<img class="smile" src="%PS%' +  smileID + '.gif" name="sp' + smileID + '">');
				}
			});				

			return _text;
		}
		
		var oldChatHTML = chat.html;
		var oldPrintMessage = messenger.PrintMessage;
		var keeperName = 'Смотритель';
		var brokenItems = {
			time: 0,
			text: '',
			messageDelay: 5 * 60 * 1000 // 5 minutes
		};
		
		
		var clanTournament = [
			{detect: "<b>(.+)</b> взял флаг на секторе <b>(.+)</b>!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"6:$1\">$1</span></b> взял флаг на секторе <b>$2</b>! "},
			{detect: "На <b>(.+)</b> напали на  <b>(.+)</b>!", replace: "На <b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"6:$1\">$1</span></b> напали на  <b>$2</b>!"},
			{detect: "<b>(.+)</b> доставил флаг!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"6:$1\">$1</span></b> доставил флаг!"},
			{detect: "<b>(.+)</b> попал в яму на секторе <b>(.+)</b>!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"6:$1\">$1</span></b> попал в яму на секторе <b>$2</b>!"},
			{detect: "<b>(.+)</b> покинул яму!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"6:$1\">$1</span></b> покинул яму!"},
			{detect: "<b>(.+)</b> покинул остров!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"6:$1\">$1</span></b> покинул остров!"},
			
		]
		
		if (soundOptions["sound_random_event"].sound != "nosound") {
			var oldStartReaction = quests.StartReaction;
			
			var randomEventsDetectImages = [
				'spring.png',
				'snake.png',
				'purse.png',
				'goblins.png',
				'scarecrow.png',
				'trap.png',
				'woodcutter.png',
				'double_the_fall.png',
				'meditation.png',
				'cache.png',
				'driada_npc.png',
				'derevo.png',
				'ax.png',
				'evil_fish.png',
				'krokod_npc.png',
				'worms.png',
				'goldfish.png',
				'big_fish.png',
				'shoe.png'					
			];		
			
			quests.StartReaction = function(xmldoc) {
				oldStartReaction.apply(quests, [xmldoc]);

				if ($("actions", xmldoc).text() != '') {
					return;
				}
				
				var image = $("npc_image", xmldoc).text();
				
				$.each(randomEventsDetectImages, function() {
					if (this == image) {
						core.playSwfSound(soundOptions["sound_random_event"].sound);
						return;
					}
				});
			}
		}
		
		
		chat.html = function(sys, _t, _id, _time, _nick, _tn, _color, _text) {			
			if (erExtOptions.clickablePSmiles) {
				_text = modifyPrivateSmiles(_text);
			}
			
			if (erExtOptions.chatsectors) {
				_text = modifySectors(_text);
			}
			
			if (_nick == keeperName) {				
				if (_t == CHAT_FLAG_BATTLELOG) {
					if (erExtOptions.clickable_nicks_on_clan_tournament) {
						_text = modifyClanTournamentMessage(_text);
					}
				}
			
				if (_t == CHAT_FLAG_PRIVATE) {
					if (erExtOptions.damaged_items_notification_filter && filterBrokenItemNotifications(_text)) {
						return;
					}
				
					$.each(soundOptions, function(key) {
						if (detectForSound(_text, soundOptions[key].detect, soundOptions[key].sound)) {
							return;
						}
					});
				}
			}
			
			if (erExtOptions.forumgoto) {
				_text = modifyForumLink(_text);
			}	
			
			oldChatHTML.apply(chat, [sys, _t, _id, _time, _nick, _tn, _color, _text]);
		}
		
		if (erExtOptions.forumgoto) {			
			messenger.PrintMessage = function (Message, PrintReply, isClanOrAlign) { 
				Message['text'] = modifyForumLink(Message['text']);
				Message['caption'] = modifyForumLink(Message['caption']);
				
				oldPrintMessage.apply(messenger, [Message, PrintReply, isClanOrAlign]);
			}
		}	
		
		if (erExtOptions.fastex) {
			var oldTemplatesRender = templates.render;
			var exitLink = $("<a title=\"Выход из игры\" href=\"http://www.ereality.ru/exit.php\" onfocus=\"this.blur();\">[X]</a>");
			
			$(".NickName center").prepend(exitLink);
			
			templates.render = function(templateId, data, onRender) { 
				var renderedTamplate = oldTemplatesRender.apply(templates, [templateId, data, onRender]);

				if (templateId != "main/header.template-HealthBlock") {
					return renderedTamplate;
				}

				return renderedTamplate.replace('<span class="NickName"><center>', '<span class="NickName"><center>' + exitLink[0].outerHTML);
			}
		}
		
		// Инфа о глобальных событиях
		if (erExtOptions.global_info) {			
			var globalTd = $("<td></td>").css({width: "20px"})
				.on("click", function() {
					$.post("http://www.ereality.ru/ajax/global_event/", '<request action="showNextGlobalEvents" />', function (response) {
						window.chat.msgSystem(keeperName, $("msg", response).text())	
					});
				});

			var globalImg = $("<img>").attr("src", erExtImages.globalEventImage).css({cursor: "pointer", width: "20px", height: "30px"});
			var globalLink = $("<a href=\"#\" title=\"Глобальные события\"></a>");
			
			globalTd.append(globalLink.append(globalImg));
			
			$("#td_dyn").after(globalTd);
		}
		
		if (erExtOptions.userlistactiveitems || soundOptions["sound_zavod"].sound != "nosound") {
			var oldBuildPlayersTable = battle.buildPlayersTable;
			var oldBattleLoad = battle.load;
			
			battle.load = function() {
				oldBattleLoad.apply(battle,arguments);
				
				battle.FirstFactorySound = true;
			}
			
			battle.buildPlayersTable = function() {
				oldBuildPlayersTable.apply(battle);
				
					if (erExtOptions.userlistactiveitems) {
						$.each($("#div_battle span[class*=bp]"), function(num, val) {
							val.setAttribute("name", battle.players[val.id.substr(1)].name);
						})
					}

				if (soundOptions["sound_zavod"].sound != "nosound" && users.oSpanLocation.text().search("Цех ") == 0 && battle.FirstFactorySound) {
					battle.FirstFactorySound = false;
					core.playSwfSound(soundOptions["sound_zavod"].sound);
				}
			}
		}
		
	}).toString();
	
	formatSmilesString = formatSmilesString.replace("soundOptionsReplace", '(' + JSON.stringify(defaultConfig.soundOptions) + ')')
		.replace("optionsReplace", '(' + JSON.stringify(myoptions) + ')').replace("erExtImagesReplace", '(' + JSON.stringify(erExtImages) + ')');	
	
	script += "(" + formatSmilesString + ")();"; 

	//Добавляем кликабельность секторов в Дневнике Квестов
		if (myoptions.questsectors) {
	script= script+ "(" +
	(function(){
	var zxzx4=questDiary.onRecvXML;
	questDiary.onRecvXML=function(){
	var res = arguments[0].getElementsByTagName("quest");
	for(i=0; i<res.length; ++i) 
	{
		res[i].textContent =res[i].textContent.replace(/(\d{1,3})[:\-](\d{1,3})/ig,"<a href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>");
	}
	zxzx4.apply(questDiary,arguments);
	return ;
	}
	}).toString()
	+ ")();"; 
}


//При не пустой строке чата не завершать бой энтером , поидее )
	if (myoptions.keyenter) {
		script+=  "(" +
	(function(){
	var zxzx6=core.onKeyDown;
	core.onKeyDown=function(event){
	event=(window.event||event);
	if ((event.keyCode==13)&&(battle.bstatus==0)&&((document.getElementById("chat_msg").value != "" ))) { return}
	else
		{var myrezult=zxzx6.apply(core,arguments);
	     return myrezult}
	}
	var zxzx7=core.onKeyUp;
	core.onKeyUp=function(event){
	event=(window.event||event);
	if ((event.keyCode==13)&&(battle.bstatus==0)&&((document.getElementById("chat_msg").value != "" ))) { return}
	else
		{var myrezult=zxzx7.apply(core,arguments);
	     return myrezult}
	}
	$(document).unbind('keydown').unbind('keyup');
	$(document).keydown(core.onKeyDown).keyup(core.onKeyUp);
	}).toString()
	+ ")();"; 
}

		// ПКМ по локации вызывает меню с картами ОВЛ и ОПП
		if (myoptions.menu_maps) {
			script += "(" +
				(function() {
				var htmlmenu = "" +
					"<div id=\"m_mur_mapsmenu\" class=\"contextMenu\" style=\"visibility: hidden;position:absolute;\">" +
					"  <ul class=\"textM\">" +
					"    <li><a href=\"http://sidzoku.ru/maps/ovl/\" target=\"_blank\"><img src=\"http://img.ereality.ru/clan/73.gif\">Карта ОВЛ </a></li>" +
					"    <li><a href=\"http://sidzoku.ru/maps/opp/\" target=\"_blank\"><img src=\"http://img.ereality.ru/clan/73.gif\">Карта ОПП </a></li>" +
					"    <li><a href=\"http://sidzoku.ru/maps/ok/\" target=\"_blank\"><img src=\"http://img.ereality.ru/clan/73.gif\">Карта ОК </a></li>" +
					"  </ul>" +
					"</div>";
				$(document.body.lastChild).after($(htmlmenu));
				$("#a_users_loc").contextMenu("m_mur_mapsmenu", {});
			}).toString() + ")();";
		}

// Информация о бое (Ауры,Урон,Убийства)
		if (myoptions.battleInfo) {
			script += "(" +
				(function() {
				var Old_buildPlayersTable = battle.buildPlayersTable;

				battle.buildPlayersTable = function() {
					Old_buildPlayersTable.apply(battle);
					if ($("#mur_battle_info").length == 0) {
						var html = "" +
							"<div  class=\"textS\" id=\"mur_battle_info\" style=\"color: #646464\"  align=\"center\">" +
							" <strong><span id=\"mur_auras\"></span><span id=\"mur_dmg\"></span><span id=\"mur_kill\"></span></strong>" +
							"</div>";
						$(".fight_contr").append($(html));
					}
					if (battle.team > 1) {
						var aura1 = battle.current_pvp_auras[1];
						var aura2 = battle.current_pvp_auras[0];
					} else {
						var aura1 = battle.current_pvp_auras[0];
						var aura2 = battle.current_pvp_auras[1];
					}
					if (battle.type == 4) {
						$("#mur_auras").text("    Ауры: " + aura1 + "%  " + aura2 + "%  ");
					} else {
						$("#mur_auras").text("");
					}
					$("#mur_dmg").text("   Урон: " + $("#span_stat_dc").text() + "   ");
					$("#mur_kill").text("   Убито: " + $("#span_stat_kc").text() + "   ");
					return;
				}
			}).toString() + ")();";
		}

// Хоткеи ALT+12345QWE
if (myoptions.keyalt) {
		script= script+ "(" +
	(function(){
		var zxzx8=core.onKeyUp;
		var HSets = []; // Список сохраненных комплектов
		$.post("http://www.ereality.ru/ajax/json.php",
				'{"controller":"hero","action":"panel","params":{"argv":{"inventory":true}}}',
				function(response) {
						for(prop in response.response.sets) if (response.response.sets.hasOwnProperty(prop)) {
							HSets.push(prop);
						 }	
				},
				"json");
	core.onKeyUp=function(event){
			event = (window.event || event);
			if ((event.keyCode == 112)&&(battle.bstatus==0)) {    // F11 
						$.each(battle.items, function(num, val) {
							if ((val.img == "draftroll.png") || (val.img == "summonscroll.jpg") || (val.img == "ejectroll.png")) battle.selectItem(battle.items[num].uid)
						})
			}
			if ((event.keyCode == 113)&&(battle.bstatus==0)) {    // F12 
						$.each(battle.items, function(num, val) {
							if ((val.img == "draftroll.png") || (val.img == "summonscroll.jpg") || (val.img == "ejectroll.png")) battle.selectItem(battle.items[num].uid)
						})
			}
			if (event.keyCode == 27) core.trigger('move')
			if (event.altKey) {
		 	if ((event.keyCode==49)&&(HSets[0]!=undefined)) {inventory.actionUpSet({"setId":HSets[0]})} //1
		 	if ((event.keyCode==50)&&(HSets[1]!=undefined)) {inventory.actionUpSet({"setId":HSets[1]})} //2
		 	if ((event.keyCode==51)&&(HSets[2]!=undefined)) {inventory.actionUpSet({"setId":HSets[2]})} //3
		 	if ((event.keyCode==52)&&(HSets[3]!=undefined)) {inventory.actionUpSet({"setId":HSets[3]})} //4
		 	if ((event.keyCode==53)&&(HSets[4]!=undefined)) {inventory.actionUpSet({"setId":HSets[4]})}	//5
		 	if (event.keyCode==81)  {if (questDiary.closed) questDiary.show(); else questDiary.close()  }    //q	
		 	if (event.keyCode==87) {if (($("#messengerForm").length==0)||($("#messengerForm")[0].style.display=="none")) messenger.ShowForm(); else $("#messengerCloseButton").click() }	//w	
		 	if (event.keyCode==82) {if (main.$("b:contains(Книга призыва монстров)").length==0) {core.modeSwitch('map');frames['main'].location='/summon_book.php';} else core.trigger('move')}	//r	
		 	if (event.keyCode==69) {if (($("span:contains(Контакты)").length==0)||($("span:contains(Контакты)")[0].parentNode.parentNode.style.display!="block")) core.mod('contacts','open'); else  $("span:contains(Контакты)")[0].nextElementSibling.click()} //e

		 }	
		 var myrezult=zxzx8.apply(core,arguments);
	     return myrezult}
	     $(document).unbind('keyup');
		 $(document).keyup(core.onKeyUp);
	 }).toString()
	+ ")();"; 
}

		// След
		if (myoptions.map_trace) {
			script += script_map_trace.replace("sec_red.png", trace_img_src);
		}

		if (myoptions.teammate_trace) {
			script = script.replace("teammate_trace = false", "teammate_trace = true");
		}

		// Ареалы монстров
		if (myoptions.monster_locations) {
			script += script_monster_locations.replace("monster_fon.png", kango.io.getResourceUrl("res/monster_fon.png"));
		}


		if (myoptions.battleCounter) {
			script += script_battle_counter;
		}

		// Таймеры таверны и поместья
		if (myoptions.timer_taverna || myoptions.timer_estate) {
			myoptions.timer_taverna && (script_timers = script_timers.replace("core.mur_timer.taverna = false", "core.mur_timer.taverna = true"));
			myoptions.timer_estate && (script_timers = script_timers.replace("core.mur_timer.estate = false", "core.mur_timer.estate = true"));
			if (kango.browser.getName() != "firefox") {
				script_timers = script_timers.replace("MurTimerCss","-webkit-linear-gradient(top, #fff,#bbb)");
			} else {
				script_timers = script_timers.replace("MurTimerCss","-moz-linear-gradient(center top , #fff, #bbb) repeat scroll 0 0 rgba(0, 0, 0, 0)");
			}
			script += script_timers.replace(/sound_taverna/g,defaultConfig.soundOptions["sound_taverna"].sound);
		}

		inject_global(script);
	}

 //=========================end.

 });


