// ==UserScript==
// @name     ErExt_ModifyCoreFunc
// @include     http://www.ereality.ru/core/*
// @require     tools.js
// @all-frames  true
// ==/UserScript==

var soundoptions = {
	"sound_elitka":"nosound",
	"sound_event":"nosound",
	"sound_kt":"nosound",
	"sound_fishing":"nosound"
}
kango.invokeAsync('kango.storage.getItem',"soptions",function(value) {
if (value!=null) {
		for (nameprop in soundoptions) {
		soundoptions[nameprop]=value[nameprop];
    	}

 }
});
//================================================================Begin

kango.invokeAsync('kango.storage.getItem',"options",function(value) {
if (value!=null) {
		for (nameprop in myoptions) {
	 	if (value[nameprop]!=false) {value[nameprop]=true;}	
		myoptions[nameprop]=value[nameprop];
    	}
}
if (myoptions.unpaused) {
//=====================================================================  

function pfunction(){

var scr= document.createElement("script");
 scr.text="";
 if (myoptions.chatsectors) {
 scr.text= scr.text + "(" +
    (function(){var xgdh=chat.formatSmilies;
	chat.formatSmilies=function(){
			if ((arguments[0].search("опыта")==-1)&&(arguments[0].search("Вы подобрали")==-1)) {
			if ((arguments[0].search("Ауры")!=-1)||(arguments[0].search("ептикон")!=-1)||(arguments[0].search("за убийство")!=-1)||(arguments[0].search("Людей:")!=-1)) {
				arguments[0]=arguments[0].replace(/(\d{1,3})[: \.](\d{1,3})/ig,"<a href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>"); 
				}
			else if (arguments[0].search(" сер.")!=-1) 	{
			     arguments[0]=arguments[0].replace(/(\d{1,3})[: \-\/](\d{1,3})/ig,"<a href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>");
					}
			else {		
			arguments[0]=arguments[0].replace(/(\d{1,3})[: \.\-\/](\d{1,3})/ig,"<a href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>");
			}
	}
	return xgdh.apply(chat, arguments);
	};
	
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

	if (soundoptions.sound_elitka!="nosound") {
	 scr.text= scr.text + "(" +
   	 (function(){
   	 	var xgdh=chat.formatSmilies;
   	 	chat.formatSmilies=function(){
   	 		if (arguments[0].search("Вас вызвали на арену Элитных Турниров! Есть")!=-1) core.playSwfSound("sound_elitka");
    		return xgdh.apply(chat, arguments);
    	}
	}).toString()
	+ ")();";
	scr.text=scr.text.replace("sound_elitka",soundoptions.sound_elitka);
	}
	

	if (soundoptions.sound_fishing!="nosound") {
	 scr.text= scr.text + "(" +
   	 (function(){
   	 	var xgdh=chat.formatSmilies;
   	 	chat.formatSmilies=function(){
   	 		if (arguments[0].search("У вас закончилась приманка!")!=-1) core.playSwfSound("sound_fishing");
    		return xgdh.apply(chat, arguments);
    	}
	}).toString()
	+ ")();";
	scr.text=scr.text.replace("sound_fishing",soundoptions.sound_fishing);
	}

	if (soundoptions.sound_event!="nosound") {
	 scr.text= scr.text + "(" +
   	 (function(){
   	 	var xgdh=chat.formatSmilies;
   	 	chat.formatSmilies=function(){
   	 		if (arguments[0].search("Началось случайное событие <b>")!=-1) core.playSwfSound("sound_event");
    		return xgdh.apply(chat, arguments);
    	}
	}).toString()
	+ ")();";
	scr.text=scr.text.replace("sound_event",soundoptions.sound_event);
	}

	if (soundoptions.sound_kt!="nosound") {
	 scr.text= scr.text + "(" +
   	 (function(){
   	 	var xgdh=chat.formatSmilies;
   	 	chat.formatSmilies=function(){
   	 		if (arguments[0].search("Сражаются: <img width=")!=-1) core.playSwfSound("sound_kt");
    		return xgdh.apply(chat, arguments);
    	}
	}).toString()
	+ ")();";
	scr.text=scr.text.replace("sound_kt",soundoptions.sound_kt);
	}

//Подправляем ссыллки на форум, что-бы было с автологином, при чтении Личных Сообщений
	if (myoptions.forumgoto) {
	 scr.text= scr.text + "(" +
   	 (function(){
   	 	var xgdh=chat.formatSmilies;
   	 	chat.formatSmilies=function(){
   	 		arguments[0]=arguments[0].replace(new RegExp("http://forum.ereality.ru",'g'),"http://www.ereality.ru/goto/forum.ereality.ru");
    		return xgdh.apply(chat, arguments);
    	}
	}).toString()
	+ ")();";

			
 	scr.text= scr.text+ "(" +
	(function(){
	var zxzx2=messenger.PrintMessage;
	messenger.PrintMessage=function(){
	arguments[0]['text']=arguments[0]['text'].replace(new RegExp("http://forum.ereality.ru",'g'),"http://www.ereality.ru/goto/forum.ereality.ru");
	arguments[0]['caption']=arguments[0]['caption'].replace(new RegExp("http://forum.ereality.ru",'g'),"http://www.ereality.ru/goto/forum.ereality.ru");
	return zxzx2.apply(messenger, arguments);
	}
	}).toString()
	+ ")();"; 

	}

		scr.text= scr.text+ "(" +
	(function(){

	 function EnvTab(){
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
}
 });


