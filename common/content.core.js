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

 if (myoptions.chatsectors) {
 scr.text= scr.text + "(" +
    (function(){var xgdh=chat.formatSmilies;
	chat.formatSmilies=function(){
			if ((arguments[0].search("опыта")==-1)&&(arguments[0].search("Вы подобрали")==-1)) {
			if ((arguments[0].search("Ауры")!=-1)||(arguments[0].search("ептикон")!=-1)||(arguments[0].search("за убийство")!=-1)||(arguments[0].search("Людей:")!=-1)) {
				arguments[0]=arguments[0].replace(/(\d{1,3})[: \.](\d{1,3})/ig,"<a class=\"textM\" href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>"); 
				}
			else if (arguments[0].search(" сер.")!=-1) 	{
			     arguments[0]=arguments[0].replace(/(\d{1,3})[: \-\/](\d{1,3})/ig,"<a class=\"textM\" href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>");
					}
			else {		
			arguments[0]=arguments[0].replace(/(\d{1,3})[: \.\-\/](\d{1,3})/ig,"<a class=\"textM\" href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>");
			}
	}
	return xgdh.apply(chat, arguments);
	};
	
	}).toString()
	+ ")();";
	}

if (myoptions.fastex) {
scr.text= scr.text+ "(" +
	(function(){
	var zxzx5=templates.render;
	templates.render=function(){
	var myrezult=zxzx5.apply(templates,arguments);
	//if (myrezult.search(user.name)>0) {//alert();
	return myrezult.replace('<span class="NickName"><center>','<span class="NickName"><center><a href="http://www.ereality.ru/exit.php" onfocus="this.blur();">[X]</a>');
	//}else {return myrezult}
	}
	var exitlink = document.createElement('A');
	exitlink.href = 'http://www.ereality.ru/exit.php';
	exitlink.onfocus = 'this.blur();';
	exitlink.innerHTML ="[X]";
	exitlink.addEventListener("focus", function(){this.blur();}, false);
	if (document.getElementsByClassName("NickInfo")[0]!=null ) {
	document.getElementsByClassName("NickInfo")[0].parentNode.insertBefore(exitlink, document.getElementsByClassName("NickInfo")[0].parentNode.firstChild);
	}
	}).toString()
	+ ")();"; 
}
	
	var formatSmilesString = (function() {	
		var soundOptions = soundOptionsReplace;
		var erExtOptions = optionsReplace;
		
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
			return string.replace(new RegExp("http://forum.ereality.ru",'g'),"http://www.ereality.ru/goto/forum.ereality.ru");
		};
		
		//При дропе вещей из монстров приписывать сектор
		function modifyDropSector(string) {
			var sector = users.oSpanLocation.text()

			if (string.search(new RegExp('Из `.+` выпало: <b>.+</b>', 'g')) != -1) {
				string += ' ' + sector;
			}
			
			return string;
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
			{detect: "<b>(.+)</b> взял флаг на секторе <b>(.+)</b>!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"2:$1\">$1</span></b> взял флаг на секторе <b>$2</b>!"},
			{detect: "На <b>(.+)</b> напали на  <b>(.+)</b>!", replace: "<b><span class=\"nick1\" id=\"\" style=\"cursor:pointer\" name=\"2:$1\">$1</span></b> напали на  <b>$2</b>!"},
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
			//console.log(arguments);
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
			
			if (erExtOptions.dropsectors && _nick == keeperName) {
				_text = modifyDropSector(_text);
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


