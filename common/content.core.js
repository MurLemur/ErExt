// ==UserScript==
// @name     ErExt_ModifyCoreFunc
// @include     http://www.ereality.ru/core/*
// @require     tools.js
// @require     scripts/core_map_trace.js
// @require     scripts/core_monster_locations.js
// @require     scripts/core_timers.js
// @require     scripts/core_buttons.js
// @require     scripts/core_battle_counter.js
// @require     scripts/core_inventory.js
// @require     scripts/core_golosovalka.js
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
var custom_sounds="";
var mergedSystemOptions = {};

	kango.invokeAsync('kango.storage.getItem', "systemOptions", function(options) {
		mergedSystemOptions = mergeOptions(options, defaultConfig.systemOptions);
		
		if (mergedSystemOptions.trace_img_src!="") trace_img_src=mergedSystemOptions.trace_img_src;
		if (mergedSystemOptions.custom_sounds!="") custom_sounds=mergedSystemOptions.custom_sounds;
		window.setTimeout(function() { pfunction(); }, 100);			
	});

function pfunction(){

 script="";

 script += "(" +
			(function() {
				 core.mur_soundOptions = soundOptionsReplace;
		}).toString() + ")();";

script = script.replace("soundOptionsReplace", '(' + JSON.stringify(defaultConfig.soundOptions) + ')');

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
		var erExtSystemOptions = erExtSystemOptionsReplace;
		
		// @TODO refactor it
		function modifySectors(_text) {
			if ((_text.search("опыта")==-1)&&(_text.search("Вы подобрали")==-1)&&(_text.search("http")==-1)&&(_text.search("www.")==-1)&&(_text.search("aliens")==-1)) {
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
		var forumRegExp = new RegExp("http://forum.ereality.ru", 'g');
		function modifyForumLink(string) {
			return string.replace(forumRegExp, "http://www.ereality.ru/goto/forum.ereality.ru");
		};
		
		var ringOfRendomRegExp = new RegExp('.+ собра.+ Кольцо Рандома! Е.+ удача обернулась для .+ потерей' , 'g');
		function filterRingOfRendomNotification(_text) {
			if(_text.search(ringOfRendomRegExp) != -1) {
				return true;
			}
			
			return  false;
		}
		
		var goldenHorseShoeRegExp = new RegExp('Поздравляем победителя Золотой Подковы! .+ бесплатно получи.+ купон на .+ золота, купив .+ золота.' , 'g');
		function filterGoldenHorseShoeNotification(_text) {
			if(_text.search(goldenHorseShoeRegExp) != -1) {
				return true;
			}
			
			return  false;
		}
		
		var eliteTournamentStartRegExp = new RegExp('Глашатаи известили о начале Элитного турнира! Деньги, опыт, девочки, картинка в инфу и бессмертная слава ждут тебя!' , 'g');
		var eliteTournamentContinueRegExp = new RegExp('Идет подача заявок на участие в Элитном Турнире. Без тебя не начинаем.' , 'g');
		function filterEliteTournamentNotification(_text) {
			if(_text.search(eliteTournamentStartRegExp) != -1 || _text.search(eliteTournamentContinueRegExp) != -1) {
				return true;
			}
			
			return  false;
		}
		
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
		
		function filterJailEmptyNotification(_text) {
			if (_text.search('Тюрьма пуста!') == -1) {
				return false;
			}

			if (new Date().getTime() - OKMessages.emptyJail.time > OKMessages.emptyJail.messageDelay) {
				OKMessages.emptyJail.time = new Date().getTime();
			
				return false;
			}
			
			return true;
		}
		
		function filterOneTeamIsStrongerMessage(_text) { 
			if (_text.search('Нельзя вмешаться за более сильную команду, если она сильнее второй в ') == -1) {
				return false;
			}

			if (new Date().getTime() - OKMessages.oneTeamStronger.time > OKMessages.oneTeamStronger.messageDelay) {
				OKMessages.oneTeamStronger.time = new Date().getTime();
			
				return false;
			}
			
			return true;		
		} 
		
		function filterBattleIsClosedMessage(_text) {
			if (_text.search('Вы не можете вмешаться в закрытый бой') == -1) {
				return false;
			}

			if (new Date().getTime() - OKMessages.battleIsClosed.time > OKMessages.battleIsClosed.messageDelay) {
				OKMessages.battleIsClosed.time = new Date().getTime();
			
				return false;
			}
			
			return true;			
		}
		
		var filterOkMessageRegExp = /\[([0-9]+)\/[0-9]+\] :102: Сектор \(.+:.+\)\. Бой [0-9]+ \([0-9]+-[0-9]+\) против [0-9]+ \([0-9]+-[0-9]+\)\. Ауры -{0,}[0-9]+% и -{0,}[0-9]+%\..{0,}/;
		function filterOkHelpMessage(_text) { 
			var match = filterOkMessageRegExp.exec(_text);				
			if (match != null) {
				if (Number.parseInt(match[1], 10)  >= Number.parseInt(erExtSystemOptions.okHelpMessageMinLevel, 10)) {
					return false;
				}
				
				return true;
			}
			
			return false;
		}
		
		function modifyClanTournamentMessage(_text) {			
			$.each(clanTournament, function() {
				var regEx = new RegExp(this.detect, 'g');
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
		
		var OKMessages = {
			emptyJail: {
				time: 0,
				messageDelay: 60 * 1000 // 1 minute
			},
			oneTeamStronger: {
				time: 0,
				messageDelay: 60 * 1000 // 1 minute
			},
			battleIsClosed: {
				time: 0,
				messageDelay: 60 * 1000 // 1 minute
			}
		}
		
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
				//console.log(sys, _t, _id, _time, _nick, _tn, _color, _text);
				if (erExtOptions.clickablePSmiles) {
					_text = modifyPrivateSmiles(_text);
				}

				if (_t == CHAT_FLAG_ALIGN) {
					if (erExtOptions.okHelpMessageFilterEnabled && filterOkHelpMessage(_text)) {
						return;
					}
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

						if (erExtOptions.filterEmptyJailNotfication && filterJailEmptyNotification(_text)) {
							return;
						}

						if (erExtOptions.filterOneTeamIsStrongerMessage && filterOneTeamIsStrongerMessage(_text)) {
							return;
						}

						if (erExtOptions.filterBattleIsClosedMessage && filterBattleIsClosedMessage(_text)) {
							return;
						}

						if (erExtOptions.filterRingOfRendomMessage && filterRingOfRendomNotification(_text)) {
							return;
						}

						if (erExtOptions.filterGoldenHorseShoeMessage && filterGoldenHorseShoeNotification(_text)) {
							return;
						}

						if (erExtOptions.filterEliteTournamentMessage && filterEliteTournamentNotification(_text)) {
							return;
						}

						$.each(soundOptions, function(key) {
							if (detectForSound(_text, soundOptions[key].detect, soundOptions[key].sound)) {
								return;
							}
						});
					}
				} else if (erExtOptions.chatLightMessage && _nick == user.name) var mid = _id
					else if (erExtOptions.chatLightMessage && _tn.search(user.name) != -1) {
						_text = "<span style=\"background-color: " + erExtSystemOptions.chatBgColor + "\">" + _text + "</span>";
						var mid = 0;
					}
				
				if (erExtOptions.forumgoto) {
					_text = modifyForumLink(_text);
				}

				oldChatHTML.apply(chat, [sys, _t, _id, _time, _nick, _tn, _color, _text]);
				if (erExtOptions.chatLightMessage && mid && mid != 0) $("#n_" + mid).css("background-color", erExtSystemOptions.chatBgColor);
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
			$("img[src*='ch1_13.jpg']").attr("onclick","window.open(\"/event/global/\")");
				
			
			
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
		.replace("optionsReplace", '(' + JSON.stringify(myoptions) + ')')
		.replace("erExtImagesReplace", '(' + JSON.stringify(erExtImages) + ')')
		.replace("erExtSystemOptionsReplace", '(' + JSON.stringify(mergedSystemOptions) + ')');		
	
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
			if ((event.keyCode == 112)&&(battle.bstatus==0)) {    // F1 
						$.each(battle.items, function(num, val) {
							if ((val.img == "draftroll.png") || (val.img == "summonscroll.jpg") || (val.img == "ejectroll.png")) battle.selectItem(battle.items[num].uid)
						})
			}
			if ((event.keyCode == 113)&&(battle.bstatus==0)) {    // F2 
						$.each(battle.items, function(num, val) {
							if ((val.img == "draftroll.png") || (val.img == "summonscroll.jpg") || (val.img == "ejectroll.png")) battle.selectItem(battle.items[num].uid)
						})
			}
			if ((event.keyCode == 115)&&(battle.bstatus==0)) {    // F4
				 $("#autobattle")[0].click();
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

		// По "ё" перемещение в бою в первый ряд
		if (myoptions.battle_move) {
			script = script + "(" +
				(function() {
					var old_onKeyUp = core.onKeyUp;
					core.onKeyUp = function(event) {
						event = (window.event || event);
							if ((event.keyCode == 192 || event.key=="ё") && (battle.bstatus == 0)) {
							$.each(battle.players, function(index, val) {
								if (val.id == user.id) {
									if (val.y == 1) battle.make_move({
										'x': val.x,
										'y': 0
									});
								}
							})
						}
					var myrezult = old_onKeyUp.apply(core, arguments);
					return myrezult
				}
				$(document).unbind('keyup'); $(document).keyup(core.onKeyUp);
			}).toString() + ")();";
	}

		// След
		if (myoptions.map_trace) {
			script += script_map_trace.replace("sec_red.png", trace_img_src)
						.replace(/sec_avto/g, kango.io.getResourceUrl("res/sec_avto.png"))
						.replace('teamStepsOnReplace', myoptions.teammate_trace);
			
			
		}

		// Ареалы монстров
		if (myoptions.monster_locations) {
			script += script_monster_locations.replace("monster_fon.png", kango.io.getResourceUrl("res/monster_fon.png"));
		}

		// Подсчет заработка в групповых и хаотических боях
		if (myoptions.battleCounter) {
			script += script_battle_counter;
		}

		// Голосовалка за проф праздники
		if (myoptions.golosovalka) {
			script += script_golosovalka.replace(/golosovalka_pic/g, kango.io.getResourceUrl("res/yes.png"));
		}

		// Корректировка высоты дива когда мелкие горизонтальные кнопки.
		if (!myoptions.buttons_holder && !myoptions.biggest_buttons) {
			script += script_correct_buttons;
		}

		// Кнопка для объединения всех ресурсов в инвентаре
		if (myoptions.inventory) {
			script += script_inventory.replace("inv_union.png", kango.io.getResourceUrl("res/inv_union.png")).replace("inv_union_bg.png", kango.io.getResourceUrl("res/inv_union_bg.png"));
		}

		// Работа со звуковыми оповещениями
		if (myoptions.no_flash) {
			script += "(" +
				(function() {
				var custom_sounds = "mur_custom_sounds";
				var parse_custom_sounds = custom_sounds.split(";");
				var mur_sounds = {};
				for (var i = 0; i < parse_custom_sounds.length; i++) {
					if (parse_custom_sounds[i].length > 5) {
						snd = parse_custom_sounds[i].split(")");
						soundName = snd[0].replace("(", "");
						soundLink = snd[1];
						mur_sounds[soundName] = soundLink;
					}
				}
				var coreAudio = $('<audio id="coreAudio"><source src="" type="audio/mp3"></audio>').css("display", "none");
				coreAudio.appendTo('body');
				core.playSwfSound = function(sound) {
					if (!sound || sound == '-' || sound == 'nosound') {
						return;
					}
					if (mur_sounds && mur_sounds[sound] != undefined)
						coreAudio.attr("src", mur_sounds[sound]);
					else
						coreAudio.attr("src", 'http://www.ereality.ru/mp3/' + sound + '.mp3');
					coreAudio[0].play();
					return
				};
				$("embed").remove();
			}).toString().replace("mur_custom_sounds", getStringifyParams(custom_sounds)) + ")();";
		}

		// На КТ показывать кто в бою
		if (myoptions.kt_in_battle) {
			script += "(" +
				(function() {
				var old_dataBuild = users.dataBuild;
				users.dataBuild = function() {
					old_dataBuild.apply(users);
					users.isClanTournament(user.place2) &&
						users.data.length > 4 &&
						users.data_pos < 39 &&
						$.post("http://www.ereality.ru/ajax/fdemands/",
							'<?xml version="1.0" encoding="windows-1251"?><request mode="10" />',
							function(response) {
								$.each($("d", response), function(index, elem) {
									var mas_players = ($(elem).attr("n1") + $(elem).attr("n2")).split(":");
									$.each(mas_players, function(i) {
										if (mas_players[i] != "") {
											var link = $('<a href="http://www.ereality.ru/log/#id' + $(elem).attr("id") + '/page999" target="_blank"><img src="http://img.ereality.ru/a/swords.gif" class="i" title="В бою"/></a>')
											$("#div_users1 a:contains(" + mas_players[i] + ")").next().next().after(link);
										};
									});
								});
							});
				}
			}).toString() + ")();";
		}

		// На ОК показывать только тех кто жив
		if (myoptions.ok_hide_corpses) {
			script += "(" +
				(function() {
				if ($("img[src*=sun-glasses-on]").length == 1) core.hideCorpses = true;
				else core.hideCorpses = false;
				$("img[src*=sun-glasses]").on('click', function() {
					setTimeout(
						function() {
							if ($("img[src*=sun-glasses-on]").length == 1) core.hideCorpses = true;
							else core.hideCorpses = false;
						}, 100);
				});
				var old_dataRecv = users.dataRecv;
				users.dataRecv = function(data) {
					if (user.place2 == 8 && core.hideCorpses) {
						var new_data = [];
						var temp_data = data.split("\n");
						new_data.push(temp_data[0]);
						new_data.push(temp_data[1]);
						for (var i = 2; i < temp_data.length; i++) {
							(temp_data[i].split("#")[16] == 0 || temp_data[i].split("#")[16] == undefined) && new_data.push(temp_data[i]);
						}
						old_dataRecv.apply(users, [new_data.join("\n")]);
					} else old_dataRecv.apply(users, [data]);
				}
			}).toString() + ")();";
		}

		// Заморозка чата
		if (myoptions.freeze_chat) {
			script += "(" +
				(function() {
				if ($("img[src*=stop-chat-on]").length == 1) core.freezeChat = true;
				else core.freezeChat = false;
				$("img[src*=stop-chat]").on('click', function() {
					setTimeout(
						function() {
							if ($("img[src*=stop-chat-on]").length == 1) core.freezeChat = true;
							else core.freezeChat = false;
						}, 100);
				});
				var old_scrollDown = chat.scrollDown;
				chat.scrollDown = function(data) {
					if (!core.freezeChat) old_scrollDown.apply(chat);
				}
			}).toString() + ")();";
		}

		// Выключение/включение звуков игры
		if (myoptions.sounds_on_off) {
			script += "(" +
				(function() {
				if ($("img[src*=sound-on]").length == 1) core.sounds_on_off = true;
				else core.sounds_on_off = false;
				$("img[src*=sound-o]").on('click', function() {
					setTimeout(
						function() {
							if ($("img[src*=sound-on]").length == 1) core.sounds_on_off = true;
							else core.sounds_on_off = false;
						}, 100);
				});
				var old_playSwfSound = core.playSwfSound;
				core.playSwfSound = function() {
					if (core.sounds_on_off) old_playSwfSound.apply(core,arguments);
				}
			}).toString() + ")();";
		}


	// Восстановление жизней персонажа за абилки
	if (myoptions.abil_heal) {
		script += "(" +
			(function() {
			$("img[src*=medkit]").on('click', function() {
				$.get("http://www.ereality.ru/clan.php?action=use_abil&i=18&h=1", function(response) {
					if ($("b", response)[0].innerHTML == "Вы успешно использовали восстановление!") {
						top.core.alertMsg($("b", response)[0].innerHTML);
						top.user.setHME(top.user.hp, top.user.hp, top.user.hp, top.user.ma, top.user.ma, top.user.ma, top.user.en, top.user.en, top.user.en);
					} else
						top.core.alertError($("b", response)[0].innerHTML);
				});
			});

		}).toString() + ")();";
	}

		// Таймеры таверны и поместья
		if (myoptions.timer_taverna || myoptions.timer_estate || myoptions.timer_pet) {
			myoptions.timer_taverna && (script_timers = script_timers.replace("core.mur_timer.taverna = false", "core.mur_timer.taverna = true"));
			myoptions.timer_estate && (script_timers = script_timers.replace("core.mur_timer.estate = false", "core.mur_timer.estate = true"));
			myoptions.timer_pet && (script_timers = script_timers.replace("core.mur_timer.pet = false", "core.mur_timer.pet = true"));
			myoptions.timer_egg && (script_timers = script_timers.replace("core.mur_timer.egg = false", "core.mur_timer.egg = true"));
			if (kango.browser.getName() != "firefox") {
				script_timers = script_timers.replace("MurTimerCss","-webkit-linear-gradient(top, #fff,#bbb)");
			} else {
				script_timers = script_timers.replace("MurTimerCss","-moz-linear-gradient(center top , #fff, #bbb) repeat scroll 0 0 rgba(0, 0, 0, 0)");
			}
			script += script_timers.replace(/sound_taverna/g,defaultConfig.soundOptions["sound_taverna"].sound).replace("alarm-clock.png", kango.io.getResourceUrl("res/alarm-clock.png")).replace("icon_close.gif", kango.io.getResourceUrl("res/icon_close.gif"));
		}

		// Ограничиваем длину поля чата, ато можно было писать сообщение длинное , а отправляется только 250 символов
		if (myoptions.chat_maxlength) {
			script += "(" +
				(function() {
					$("#chat_msg").attr("maxlength", 250);
				}).toString() + ")();";
		}

		inject_global(script);
	}

 //=========================end.

 });


