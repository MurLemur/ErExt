// ==UserScript==
// @name     ErExt_ModifyCoreFunc
// @include     http://www.ereality.ru/core/*
// @require     tools.js
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
			if ((_text.search("опыта")==-1)&&(_text.search("Вы подобрали")==-1)) {
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
		script= script+ "(" +
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
			if ((event.keyCode == 113)&&(battle.bstatus==0)) {    // F11 
						$.each(battle.items, function(num, val) {
							if ((val.img == "draftroll.png") || (val.img == "summonscroll.jpg") || (val.img == "ejectroll.png")) battle.selectItem(battle.items[num].uid)
						})
			}
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
			script = script + "(" +
				(function() {
					var chest = {};
					chest.sectorOK = []; // двумерный массив прошедших секторов OK
					chest.sectoraliens = [];
					chest.sectorOVL = [];
					chest.sectorOPP = [];
					chest.sectorODL = [];
					chest.sectorTO  = [];
					$("#span_mode5").children().on("click", function() {
						if (chest.sectoraliens.length > 0) chest.sectoraliens = [];
						if (chest.sectorODL.length > 0) chest.sectorODL = [];
					})

					// поиск в массиве
					chest.search = function(s, mas) {
						if (mas.indexOf) { // если метод существует
							return mas.indexOf(s);
						}


						for (var i = 0; i < mas.length; i++) {
							if (mas[i] === s) return i;
						}

						return -1;
					}
					//  координаты 
					chest.getSectorPosition = function(x, y, newmap) {
					if (newmap) {
						Point = main.Map.globalCoordsToRelative(main.Map.getCellGlobalCoords(x, y))
						PointX = Point.x;
						PointY = Point.y;
					} else {
						var dx, dy;
						if (x && y) {
							dx = (main.px - x) * 64 - (Math.abs(main.py - y) % 2) * 32 + (Math.abs(main.py - y) % 2) * (main.py % 2) * 64;
							dy = (main.py - y) * 16;
							PointX = main.CenterX - dx;
							PointY = main.CenterY - dy;
						}
					}
						return 'top:' + PointY + 'px; left:' + PointX + 'px;';
					}
					chest.init = function(map_mas,cur_mas,newmap) {
						if (newmap) {
							var map_div = $('#main').contents().find('div#container #mapContent'); 
						}	
						else {
							var map_div = $('#main').contents().find('div#container #map_div');
						}

						if (map_div && map_mas) {
							var overlay = $('<div id="overlay"></div>');
							map_div.append(overlay);
							overlay.attr('style', map_div.find('div:first').attr('style')).css({
								zIndex: '3'
							});

					
							for (i = 0; i < map_mas.length; i++) {
								if (chest.search(map_mas[i][0] + ':' + map_mas[i][1], cur_mas) != -1)
									overlay.append('<div class="point activ" style="position:absolute; ' + chest.getSectorPosition(map_mas[i][0], map_mas[i][1],newmap) + '"><span>' + map_mas[i][0] + ':' + map_mas[i][1] + '</span></div>');
							}

							overlay.find('.point.activ').css({
								height: '32px',
								width: '64px',
								lineHeight: '32px',
								textAlign: 'center',
								zIndex: '10',
								fontSize: '10px',
								fontWeight: 'bold',
								opacity: '0.6',
								color: '#222',
								textShadow: '0 0 5px #eee'
							}).css('background-image', 'url(sec_red.png)');
							return true;
						} else {
							return false;
						}
					}

					chest.map_trace_handler = function() {
						// если сектора нет в массиве и map определена (main.map работает на ОК, альенах и КТ вроде бы, так что может еще какую то проверку не знаю)

					if (user.coldX!="0,0") {
						var current_mas = chest.sectorODL;
						var map_mas = main.map;
						var newmap = false;}
					else if (user.place2 == 8) {
						var current_mas = chest.sectorOK;
						var map_mas = main.map;
						var newmap = false;
					} else if (user.place2 == 1) {
						var current_mas = chest.sectorOVL;
						var map_mas = main.Map.sectors;
						var newmap = true;
					} else if (user.place2 == 3) {
						var current_mas = chest.sectorOPP;
						var map_mas = main.Map.sectors;
						var newmap = true;
					} else if (user.place2 == 14) {
						var current_mas = chest.sectorTO;
						var map_mas = main.Map.sectors;
						var newmap = true;	
					} else if ((user.place2 > 19) && (user.place2 < 100)) {
						var current_mas = chest.sectoraliens;
						var map_mas = main.map;
						var newmap = false;
						
						//Следы для тиммейтов
						var teammate_trace = false;
						if (teammate_trace) 
						$.each(main.placeHeroes, function(key, places) {
							msector = places.x + ':' + places.y;
							if (chest.search(msector, current_mas) == -1 && map_mas)
								current_mas.push(msector);
						});

					} else return;
					msector = main.px + ':' + main.py;
						if (chest.search(msector, current_mas) == -1 && map_mas)
							current_mas.push(msector);
						chest.init(map_mas,current_mas,newmap);
					}

					$("img[src*=footprint]").on('click', function() {
							setTimeout(
								function() {
									if ($("img[src*=footprint_on]").length == 1) {
										// привязываем событие
										$('#main').on('load.chest', chest.map_trace_handler);
									} else {
										$('#main').off('load.chest', chest.map_trace_handler);
									}
								}, 100);

					})
			}).toString().replace("sec_red.png",trace_img_src)  + ")();";
		}

if (myoptions.teammate_trace) {
	script=script.replace("teammate_trace = false","teammate_trace = true");
}

 inject_global(script); 
}

 //=========================end.

 });


