// ==UserScript==
// @name	ErExt_core
// @include	http://www.ereality.ru/core*
// @require	js/container.js
// @require	js/options.js
// @require	js/tools.js
// ==/UserScript==

container.init({
	'chatsectors': { func: chatMapSearch },
	'okcount': { func: usersCount },
	'exitlink': { func: exitLink },
	'location_info': { func: locationInfo },
	'enter_update': { func: enterUsersListUpdate },
	'magic': { func: someMagic_01 }
});

options.load(function(options){
	container.load(options);
});

/**
 * Делает координаты (и не только) кликабельными в чате.
 */
function chatMapSearch () {
	setTimeout(function() {
		tools.pushJs(function() {
			if (typeof core.__showSector == 'function') {
				return
			}

			core.__showSector = function (x, y) {
				if (typeof main.Map == 'object') {
					main.$('#searchX').val(x);
					main.$('#searchY').val(y);
					main.Map.searchSector();
				} else {
					main._showSec(x, y);
				}
			};

			var xgdh = chat.formatSmilies;
			chat.formatSmilies = function(){
				arguments[0] = arguments[0].replace(
					/(\d{1,3})[: \-](\d{1,3})/ig,
					"<a href=\"javascript:core.__showSector($1,$2);\">$&</a>"
				);
				return xgdh.apply(chat, arguments);
			};
		});
	}, 1000);
}

/**
 * Отображает количество персонажей разных фракций на секторе.
 * Результат выводит в поле ввода чата.
 */
function usersCount () {
	var loc_user = document.getElementById("div_users");
	var calcpic = document.createElement('img');
	calcpic.src = 'data:image/gif;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIxAAAgICAQQCAwAAAAAAAAAAAQMCBAURABITIUEUURUiMf/EABQBAQAAAAAAAAAAAAAAAAAAAAT/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIhMf/aAAwDAQACEQMRAD8A1uYbaxWOoW6uOxjaRQo2Jzp9xiyYjcj+w6hxEwyWMlcEcXNRbVlWs0a/akNvgJb8n0deD975PzKvyteiid59dCFLDKrMXZPVOMQCJERGxsfziPkNNSdaVgvE21gpKca9MV9LoSkdyj9D2fXjjqedCytP/9k=';
	loc_user.insertBefore(calcpic, loc_user.firstChild);
	loc_user.firstChild.addEventListener("click", function() {
		document.getElementById("chat_msg").value = "";
		var fraki = "Игнесс:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/2.gif"]').snapshotLength+
			" Раанор:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/3.gif"]').snapshotLength+
			" Тарбис:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/4.gif"]').snapshotLength+
			" Витарра:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/5.gif"]').snapshotLength+
			" Дримнир:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/6.gif"]').snapshotLength;
		document.getElementById("chat_msg").value = fraki;
	}, false);
}

/**
 * Выводит ссылку для выхода из игры левее ника персонажа.
 */
function exitLink () {
	var exitlink = document.createElement('A');
	exitlink.href = 'http://www.ereality.ru/exit.php';
	exitlink.innerHTML ="[X]";
	if (document.getElementById("td_nick2") != null) {
		document.getElementById("td_nick2").insertBefore(exitlink, document.getElementById("td_nick2").firstChild);
	}
}

/**
 * Копирует информацию о количестве людей на секторе в поле ввода чата.
 */
function locationInfo () {
	document.getElementById("span_location").onclick= function(){
		document.getElementById('chat_msg').value=document.getElementById('span_location').innerHTML+' Людей: '+document.getElementById('span_location_count').innerHTML;
	};
}

/**
 * Проверяет онлайн ли пользователи которые указаны в поле ввода чата.
 * Использует сервис http://cc.erclans.ru/viewpage.php?page_id=45
 */
function checkOnline () {
	envpic = document.getElementById("td_dyn").nextElementSibling.nextElementSibling.firstChild;
	envpic.addEventListener("click", function (){
		var env = document.createElement('a');
		env.href = 'http://cc.erclans.ru/viewpage.php?page_id=45'+'#'+document.getElementById("chat_msg").value;
		env.target = '_blank';
		env.id = "Open";
		env.style.display='none';
		document.body.insertBefore(env, document.body.firstChild);
		document.getElementById('Open').click();
		document.getElementById("chat_msg").value = "";
	}, false);
}

/**
 * Позволяет обновлять список пользователей нажатием Enter.
 * Не для пользователей фф (там это возможно изначально).
 */
function enterUsersListUpdate () {
	if (kango.browser.getName()!="firefox")
	{
		document.getElementById("span_sort").previousElementSibling.href='javascript: users.load(); document.getElementById("a_users_loc").focus();';
		document.getElementById("a_users_loc").href='javascript: users.load(); document.getElementById("a_users_loc").focus();';
		document.getElementById("span_mode5").firstChild.href='javascript: fdemands.load(5); document.getElementById("span_mode5").firstChild.focus();';
	}
}

/**
 * Todo: нужен вразумительный комментарий
 * todo: тут нужен рефакторинг ^2
 */
function someMagic_01 () {
	document.onkeyup = function (e) {
		e = e || window.event;
		//alert(e.keyCode);
		if (e.keyCode === 13) {
			mymain();
		}
		if (((e.keyCode > 36) && (e.keyCode < 41))||(e.keyCode === 13)) {
			instkbd(e.keyCode);
		}
		if ((e.keyCode > 95) && (e.keyCode < 106)) {
			mynum(e.keyCode);
		}
		// Отменяем действие браузера
		return false;
	};

	function mymain() {
		if (document.getElementById("npcname").innerHTML=="Ворота Кладбища")
		{
			document.getElementById("dialog").firstChild.firstChild.nextElementSibling.nextElementSibling.click();
		}
	}

	function instkbd(code) {
		if ((myoptions.kbdinst)&&(top.frames.main.document.getElementById("div_inst_top")!=null))
		{
			switch (code)
			{
				case  37: {top.frames.main.document.getElementById("inst-left").click();break;}
				case  38: {top.frames.main.document.getElementById("inst-forward").click();break;}
				case  39: {top.frames.main.document.getElementById("inst-right").click();break;}
				case  40: {top.frames.main.document.getElementById("inst-backward").click();break;}
				//case 13: {top.frames.main.document.getElementById("inst-center").click();break;}
				// case 13: {top.frames.main.document.getElementById("map_monsters").firstChild.firstChild.onclick();break;}
			}
		}
	}

	function mynum(code) {
		if ((myoptions.numfight)&&(document.getElementById("div_battle").style.display!="none"))
		{
			switch (code)
			{
				case  96: {document.getElementById("block_pl4").click();break;}
				case  97: {document.getElementById("hit_pl0").click();break;}
				case  98: {document.getElementById("hit_pl1").click();break;}
				case  99: {document.getElementById("hit_pl2").click();break;}
				case 100: {document.getElementById("hit_pl3").click();break;}
				case 101: {document.getElementById("hit_pl4").click();break;}
				case 102: {document.getElementById("block_pl0").click();break;}
				case 103: {document.getElementById("block_pl1").click();break;}
				case 104: {document.getElementById("block_pl2").click();break;}
				case 105: {document.getElementById("block_pl3").click();break;}
			}
		}
		if ((myoptions.numcapcha)&&(top.frames.main.document.getElementById("CaptchaButtons")!=null))
		{
			switch (code)
			{
				case  96: {top.frames.main.document.getElementById("cat_4").click();break;} //0
				case  97: {top.frames.main.document.getElementById("cat_0").click();break;} //1
				case  98: {top.frames.main.document.getElementById("cat_1").click();break;} //2
				case  99: {top.frames.main.document.getElementById("cat_2").click();break;} //3
				case 100: {top.frames.main.document.getElementById("cat_5").click();break;} //4
				case 101: {top.frames.main.document.getElementById("cat_8").click();break;} //5
				case 102: {top.frames.main.document.getElementById("cat_6").click();break;} //6
				case 103: {top.frames.main.document.getElementById("cat_9").click();break;} //7
				case 104: {top.frames.main.document.getElementById("cat_7").click();break;} //8
				case 105: {top.frames.main.document.getElementById("cat_3").click();break;} //9
			}
		}
	}
}

