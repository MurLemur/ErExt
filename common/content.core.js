// ==UserScript==
// @name     ErExt_ModifyCoreFunc
// @include     http://www.ereality.ru/core/*
// @require     tools.js
// @all-frames  true
// ==/UserScript==

kango.invokeAsync('kango.storage.getItem',"soptions", function(value) {
	soundOptions = mergeOptions(value, soundOptions);
});
//================================================================Begin

kango.invokeAsync('kango.storage.getItem',"options",function(value) {
	myoptions = mergeOptions(value, myoptions);

	if (!myoptions.unpaused) {
		return;
	}
//=====================================================================  

function pfunction(){

var scr= document.createElement("script");
 scr.text="";

 if ((myoptions.questsectors)||(myoptions.chatsectors)) {
	scr.text +=  "(" +
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

	var formatSmilesString = (function() {	
		var soundOptions = soundOptionsReplace;
		var erExtOptions = optionsReplace;
		
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
			{detect: "<b>(.+)</b> взял флаг на секторе <b>(.+)</b>!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"2:$1\">$1</span></b> взял флаг на секторе <b>$2</b>! "},
			{detect: "На <b>(.+)</b> напали на  <b>(.+)</b>!", replace: "На <b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"2:$1\">$1</span></b> напали на  <b>$2</b>!"},
			{detect: "<b>(.+)</b> доставил флаг!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"2:$1\">$1</span></b> доставил флаг!"},
			{detect: "<b>(.+)</b> попал в яму на секторе <b>(.+)</b>!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"2:$1\">$1</span></b> попал в яму на секторе <b>$2</b>!"},
			{detect: "<b>(.+)</b> покинул яму!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"2:$1\">$1</span></b> покинул яму!"},
			{detect: "<b>(.+)</b> покинул остров!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"2:$1\">$1</span></b> покинул остров!"},
			
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
	}).toString();
	
	formatSmilesString = formatSmilesString.replace("soundOptionsReplace", '(' + JSON.stringify(soundOptions) + ')')
		.replace("optionsReplace", '(' + JSON.stringify(myoptions) + ')');	
	
	scr.text += "(" + formatSmilesString + ")();"; 
    
    //Оповещение при начале боя на Заводе
	if (soundOptions["sound_zavod"].sound!="nosound") {
	scr.text= scr.text+ "(" +
	(function(){
	var zxzx1=battle.buildPlayersTable;
	battle.buildPlayersTable=function(){
	zxzx1.apply(battle);
	if ((users.oSpanLocation[0].text.search("Цех ")==0)&&(battle.round =="1")) {core.playSwfSound("_sound_zavod");}
	return; }
	}).toString().replace("_sound_zavod",soundOptions["sound_zavod"].sound) 
	+ ")();"; 
    }

		scr.text= scr.text+ "(" +
	(function(){

	 function EnvTab(){// Инфа о глобальных событиях
 	  if  (document.getElementById("chat_msg").value == "" ) {
 	  	$.post("http://www.ereality.ru/ajax/global_event/",'<request action="showNextGlobalEvents" />',function (response) {
 	   	  	 var gEvent = response.getElementsByTagName("msg")[0].textContent;
 	  		 window.chat.msgSystem('Смотритель',gEvent)	
 	  	});
	 }
	  else { 
		var env = document.createElement('a');	
		env.href = 'http://cc.erclans.ru/viewpage.php?page_id=45'+'#'+document.getElementById("chat_msg").value;
		env.target = '_blank';
		env.id = "Open";
		env.style.display='none';
		document.body.insertBefore(env, document.body.firstChild);
		document.getElementById('Open').click();
		document.getElementById("chat_msg").value = "";
	 }
	}	
	envpic = document.getElementById("td_dyn").nextElementSibling.nextElementSibling.firstChild;
	envpic.addEventListener("click", EnvTab, false);

	}).toString()
	+ ")();";


	//Добавляем кликабельность секторов в Дневнике Квестов
		if (myoptions.questsectors) {
	scr.text= scr.text+ "(" +
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
		scr.text= scr.text+ "(" +
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
		scr.text= scr.text+ "(" +
	(function(){
		var zxzx8=core.onKeyUp;
	core.onKeyUp=function(event){
	event=(window.event||event);
	 if (event.altKey) {
		 	var HSets =[]; 
			 for(prop in heroPanel.heroSets) if (heroPanel.heroSets.hasOwnProperty(prop)) {
  				HSets.push(prop);
			 }	
			//alert(HSets[0]); 
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
			scr.text = scr.text + "(" +
				(function() {
					var chest = {};
					chest.sector = []; // двумерный массив прошедших секторов
					chest.sectoraliens = [];
					$("#span_mode5").children().on("click", function() {
						if (chest.sectoraliens.length > 0) chest.sectoraliens = [];
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
					chest.getSectorPosition = function(x, y) {
						var dx, dy;
						if (x && y) {
							dx = (main.px - x) * 64 - (Math.abs(main.py - y) % 2) * 32 + (Math.abs(main.py - y) % 2) * (main.py % 2) * 64;
							dy = (main.py - y) * 16;
							PointX = main.CenterX - dx;
							PointY = main.CenterY - dy;
						}
						return 'top:' + PointY + 'px; left:' + PointX + 'px;';
					}
					chest.init = function() {
						var map_div = $('#main').contents().find('div#container #map_div');

						if (map_div && main.map) {
							var overlay = $('<div id="overlay"></div>');
							map_div.append(overlay);
							overlay.attr('style', map_div.find('div:first').attr('style')).css({
								zIndex: '3'
							});

							if (user.place2 == 8)
								var cur_mas = chest.sector;
							else if ((user.place2 > 19) && (user.place2 < 100))
								var cur_mas = chest.sectoraliens;
							for (i = 0; i < main.map.length; i++) {
								if (chest.search(main.map[i][0] + ':' + main.map[i][1], cur_mas) != -1)
									overlay.append('<div class="point activ" style="position:absolute; ' + chest.getSectorPosition(main.map[i][0], main.map[i][1]) + '"><span>' + main.map[i][0] + ':' + main.map[i][1] + '</span></div>');
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

						if (user.place2 == 8)
							var current_mas = chest.sector;
						else if ((user.place2 > 19) && (user.place2 < 100))
							var current_mas = chest.sectoraliens;
						else return;

						if (chest.search(main.sector, current_mas) == -1 && main.map)
							current_mas.push(main.sector);
						chest.init();
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
			}).toString().replace("sec_red.png",kango.io.getResourceUrl("res/sec_red.png"))  + ")();";
		}




 if (scr!="") { 	
 document.body.appendChild(scr);
 }
}


 if (location.href.search("http://www.ereality.ru/core") != -1 )
 {
 	 window.setTimeout( pfunction , 100);
 }	

 //=========================end.

 });


