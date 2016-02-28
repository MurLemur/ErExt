// ==UserScript==
// @name     ErExt_ModifyCoreFunc
// @include     www.ereality.ru/core/*
// @require     tools.js
// @require     scripts/core_map_trace.js
// @require     scripts/core_monster_locations.js
// @require     scripts/core_timers.js
// @require     scripts/core_buttons.js
// @require     scripts/core_battle_counter.js
// @require     scripts/core_inventory.js
// @require     scripts/core_golosovalka.js
// @require     scripts/core_set_autowear.js
// @require     scripts/core_presents2016.js
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
		globalEventImage: kango.io.getResourceUrl("res/global.jpg"),	
		smileMonkey: kango.io.getResourceUrl("res/monkey.gif"),
		smilePenguin: kango.io.getResourceUrl("res/penguin.gif")
	};


	var formatSmilesString = (function() {	
		var soundOptions = soundOptionsReplace;
		var erExtOptions = optionsReplace;
		var erExtImages = erExtImagesReplace;
		var erExtSystemOptions = erExtSystemOptionsReplace;
		
		function modifySmiles(_text) {
			return _text.replace(/:m:/ig,'<img src="'+erExtImages.smileMonkey+'">').replace(/:p:/ig,'<img src="'+erExtImages.smilePenguin+'">');
		};

		// @TODO refactor it
		function modifySectors(_text) {

			if ((_text.search("опыта")==-1)&&(_text.search("Вы подобрали")==-1)&&(_text.search("http")==-1)&&(_text.search("www.")==-1)&&(_text.search("aliens")==-1)
			&&(_text.search(/ подарил.? Вам /)==-1)) {
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
		
		var eliteTournamentStartRegExp = new RegExp('.*Элитн.* Турнир.*' , 'g');
		function filterEliteTournamentNotification(_text) {
			if(_text.search(eliteTournamentStartRegExp) != -1) {
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

		function filterCT(_text,_tn) {
			var now_dt = new Date(new Date().getTime() + (3 + ((new Date()).getTimezoneOffset() / 60)) * 3600 * 1000); // GMT +3
				if (_text.search(":102:  КТ !!!") >= 0 && now_dt.getHours() >= erExtSystemOptions.minCTtime && now_dt.getHours() < erExtSystemOptions.maxCTtime && _tn.search(user.name) != -1) {
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
        var reminderName = 'Напоминание';

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

        var fishRegExp = {
            'Крабы': new RegExp('(?:<b>)?Вы достали из корзины (?:<b>)?(.+?)<\/b>, получено опыта: <b>(.+?)<\/b>, текущая прочность инструмента: <b>(.+?)<\/b>(?:, )?((?:<b>)?Рыбак: (?:<b>)?.+<\/b> \(.+\)(?:<\/b>)?)?'),
            'Рыба': new RegExp('(?:<b>)?Вы словили (?:<b>)?(.+?)<\/b>, получено опыта: <b>(.+?)<\/b>, текущая прочность инструмента: <b>(.+?)<\/b>(?:, )?(Рыбак: (?:<b>)?.+<\/b> \(.+\)(?:<\/b>)?)?'),
            '0': new RegExp('(Рыбка соскочила..)'),
            '1': new RegExp('(Клетка пуста)')
        };

		function erExtDetectFish(sys, _t, _id, _time, _nick, _tn, _color, _text) {
            for (var key in fishRegExp) {
                var match = _text.match(fishRegExp[key]);

                if (match) {
                    var fish = match[1];
                    var exp = 0;

                    if (match[2]) {
                        exp = parseInt(match[2]);
                    }

                    var fishes = localStorage['fishes'];
                    if (typeof fishes != "undefined") {
                        fishes = JSON.parse(fishes);
                    }
                    else {
                        fishes = {};
                    }

                    if (typeof fishes[fish] != "undefined") {
                        fishes[fish]++;
                    }
                    else {
                        fishes[fish] = 1;
                    }

                    if (typeof fishes[key + ' Опыта'] != "undefined") {
                        fishes[key + ' Опыта'] += exp;
                        fishes[key + ' Подходов']++;
                    }
                    else {
                        fishes[key + ' Опыта'] = exp;
                        fishes[key + ' Подходов'] = 1;
                    }

                    localStorage['fishes'] = JSON.stringify(fishes);


                    if (typeof localStorage['fisher_chat_notice'] == 'undefined' || localStorage['fisher_chat_notice'] != 'true') {
                        return true;
                    }

                    var msg = '';
                    if (match[3]) {
                        var exponent = match[3].length - 2;
                        var durable = parseInt(match[3]);

                        if (exponent < 1) {
                            exponent = 1;
                        }

                        if (durable < 21 || durable % (5 * Math.pow(10, exponent)) == 0) {
                            msg = 'Прочность инструмента для рыбалки: <b> ' + match[3] + '</b>';
                        }
                    }

                    if (match[4]) {
                        if (msg.length > 0) {
                            msg += '. ';
                        }

                        msg += match[4];
                    }

                    if (msg.length > 0) {
                        oldChatHTML.apply(chat, [sys, _t, _id, _time, _nick, _tn, _color, msg]);
                        chat.scrollDown();
                    }

                    return true;
                }
            }

            return false;
        }

        var turquoiseExploreRegExp = {
            '1': new RegExp('Вы внесли вклад ([0-9]+)% в разведку сектора (?:([0-9]+):([0-9]+)).*')
        }

        function erExtTurquoiseExplore(_text) {
            for (var key in turquoiseExploreRegExp) {
                var match = _text.match(turquoiseExploreRegExp[key]);

                if (match) {
                    var percent = parseInt(match[1]);
                    var positionX = match[2];
                    var positionY = match[3];

                    var turquoiseFlags = localStorage['turquoise_flags'];
                    if (typeof turquoiseFlags != "undefined") {
                        turquoiseFlags = JSON.parse(turquoiseFlags);
                    }
                    else {
                        turquoiseFlags = {};
                    }

                    if (typeof turquoiseFlags[positionX] == "undefined") {
                        turquoiseFlags[positionX] = {};
                    }

                    if (typeof turquoiseFlags[positionX][positionY] == "undefined") {
                        turquoiseFlags[positionX][positionY] = 0;
                    }

                    turquoiseFlags[positionX][positionY] += percent;

                    localStorage['turquoise_flags'] = JSON.stringify(turquoiseFlags);
                    localStorage['turquoise_flags_update'] = true;

                    return typeof localStorage['turquoise_flags_chat_notice'] == 'undefined'
                        || localStorage['turquoise_flags_chat_notice'] != 'true';
                }
            }

            return false;
        }

		chat.chatMsgColor = erExtSystemOptions.chatMsgColor.slice(1);
		
		chat.html = function(sys, _t, _id, _time, _nick, _tn, _color, _text) {
			//console.log(sys, _t, _id, _time, _nick, _tn, _color, _text);

			if (_t == CHAT_FLAG_ALIGN) {
				if (erExtOptions.okHelpMessageFilterEnabled && filterOkHelpMessage(_text)) {
					return;
				}
			}

			if (_t == CHAT_FLAG_PRIVATE) {
				if (erExtOptions.CTFilterEnabled && filterCT(_text,_tn)) {
					return;
				}
			}

			if (erExtOptions.chatOtherUsersMessageColor && _nick != keeperName && _nick != user.name && _nick != reminderName) {
				_color = chat.chatMsgColor;
			}
			
			if (_nick == keeperName) {
				if (_t == CHAT_FLAG_CLAN) {
					if (erExtOptions.sp_chat_shut_up && _text.match(/<u><b color="#AA0000">(.*?)<\/b><\/u>/g)) {
						exp = /<u><b color="#AA0000">(.*?)<\/b><\/u>/ig;
						_text = _text.replace(exp, '<a href="javascript:$(\'#div_sp_panel input[name=h_name]\').val(\'$1\');chat.showShutPanel();">[Зашить $1]</a>');
					}
				}
				
				if (_t == CHAT_FLAG_BATTLELOG) {
					if (erExtOptions.clickable_nicks_on_clan_tournament) {
						_text = modifyClanTournamentMessage(_text);
					}
				}

				if (_t == CHAT_FLAG_PRIVATE || _t == CHAT_FLAG_GROUP) {
					if (erExtOptions.damaged_items_notification_filter && filterBrokenItemNotifications(_text)) {
						return;
					}

                    if (erExtOptions.fisherEnabled && typeof localStorage['fisherRun'] != 'undefined'
                        && localStorage['fisherRun'] == 'true' && erExtDetectFish(sys, _t, _id, _time, _nick, _tn, _color, _text)) {
                        return;
                    }

                    if (erExtOptions.geologistEnabled && typeof localStorage['turquoise_flags_run'] != 'undefined'
                        && localStorage['turquoise_flags_run'] == 'true'  && erExtTurquoiseExplore(_text)) {
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

            if (erExtOptions.chatsectors) {
                _text = modifySectors(_text);
            }

            if (erExtOptions.clickablePSmiles) {
                _text = modifyPrivateSmiles(_text);
            }

            if (erExtOptions.clickablePSmiles) {
                _text = modifySmiles(_text);
            }

			oldChatHTML.apply(chat, [sys, _t, _id, _time, _nick, _tn, _color, _text]);
			if (erExtOptions.chatLightMessage && mid && mid != 0) $("#n_" + mid).css("background-color", erExtSystemOptions.chatBgColor);
		}
	

		var erExtSPToolsClass = function() {
			this.menuChatULCss = {
				"margin": "0px",
				"color": "rgb(0, 0, 0)",
				"display": "block",
				"cursor": "pointer",
				"padding": "3px",
				"border": "1px solid rgb(221, 221, 221)",
				"background-color": "transparent"
			};
			
			this.erExtSpPanel = $('#div_sp_panel');
			this.erExtSpPanelHeroInput = this.erExtSpPanel.find('input[name=h_name]');
			this.erExtSpPanelNameQreas = this.erExtSpPanel.find('select[name=qreas]'); 
			this.erExtSpPanelNameRes = this.erExtSpPanel.find('input[name=reas]');
			this.erExtSpPanelMin = this.erExtSpPanel.find('select[name=min]');
			this.erExtSpPanelMinOptions = this.erExtSpPanelMin.find('option').slice(1);
			this.erExtSpPanelWarnButton = $('<button type="button"><span class="ui-button-text">Предупредить</span></button>');
			this.erExtSpPanelRez = $('<input id="rez" type="checkbox">').css({"vertical-align": "bottom", "margin": "0px", "margin-left": "3px", "margin-right": "3px"});
			this.erExtSpPanelGiveLink = $('<button type="button"><span class="ui-button-text">Ссылка</span></button>');
			this.erExtSpPanelLinkSelect = $('<select><option value="">Выберите ссылку</option></select>');
            this.erExtSpPanelWarnReasons = $('<select><option value="">Выберите причину</option></select>');
			this.qreasTimeMap = {};
			
			var self = this;
			
			this.init = function() {
				self.initMenuChatUl();
				self.initSPMenuChat();
				
				if (erExtOptions.sp_extendable_shutup) {
					self.initSpPanel();			
				}
			};
			
			this.initMenuChatUl = function() {
				var chatUl = $('#menuChat ul');

				if (erExtOptions.sp_context_shutup) {
					chatUl.append($('<li id="shutup">Зашить рот</li>').css(self.menuChatULCss));
				}
				
				if (erExtOptions.sp_context_private_file) {
					chatUl.append($('<li id="sp_ld">Личное дело</li>').css(self.menuChatULCss));
				}
				
				if (erExtOptions.sp_context_warn) {	
					chatUl.append($('<li id="warn">Предупредить</li>').css(self.menuChatULCss));
				}
				
				if (erExtOptions.sp_context_link) {	
					chatUl.append($('<li id="link">Ссылка</li>').css(self.menuChatULCss));
				}
			};
			
			this.initSpPanel = function() { 
				chat.shut_dialog.dialog({height:190, width: 320});
				self.erExtSpPanel.find('select[name=min]').parent().append($('<label>Рец.</label>').prepend(self.erExtSpPanelRez));			
				var panelButtonsSet = self.erExtSpPanel.parent().find('.ui-dialog-buttonset').find('.ui-button-text:contains(\'Личные дела\')').parent().parent();
				
				panelButtonsSet.append('<br/>').append(self.erExtSpPanelWarnButton);
                if (erExtOptions.sp_shut_up_panel_links_giver) {
                    panelButtonsSet.append(self.erExtSpPanelGiveLink);
                }
				
				if (erExtOptions.sp_shut_up_panel_background_color) {
					self.erExtSpPanel.css({"background-color": erExtSystemOptions.shutUpBgColor});
					panelButtonsSet.parent().css({"background-color": erExtSystemOptions.shutUpBgColor});
				}
				
				self.initInitLinksRow();
				self.initQreasTimeMap();

                self.initWarningsRow();
				self.initSpPanalListeners();
			};

			this.initWarningsRow = function() {
                self.erExtSpPanelMin.parent().parent()
                    .after(
                        $('<tr><td align="right"><b>Предупреждение</b>:&nbsp;</td></tr>')
                            .append($('<td></td>').append(self.erExtSpPanelWarnReasons))
                    );

                $.each(erExtSystemOptions.sp_shut_up_warnings.split(";"), function() {
                    if (this.length > 0) {
                        var data = this.split('|');

                        if (data[1].length > 0 && data[0].length > 0) {
                            if (data[0].length > 22) {
                                data[0] = data[0].slice(0, 22) + "..." ;
                            }

                            self.erExtSpPanelWarnReasons.append($('<option></option>').attr('value', data[1]).text(data[0]));
                        }
                    }
                });
            }

			this.initInitLinksRow = function() {
				self.erExtSpPanel.find('[name=fshut] table').append($('<tr><td align="right"><b>Ссылки:&nbsp</b></td></tr>').append($('<td></td>').append(self.erExtSpPanelLinkSelect)));
			
				$.each(erExtSystemOptions.sp_shut_up_links.split(";"), function() {
					if (this.length > 0) {
						var data = this.split('|');
						
						if (data[1].length > 0 && data[0].length > 0) {
							self.erExtSpPanelLinkSelect.append($('<option></option>').attr('value', data[1]).text(data[0]));
						}
					} 
				});
			}
			this.initQreasTimeMap = function() {				
				$.each(erExtSystemOptions.sp_qreas_time_map.split(';'), function() {
					var data = this.split(':');
					var qreasId = data[0].trim();
					
					if (qreasId.length > 0 && data[1].length > 0) {
						var times = data[1].split(',');
						
						if (times.length < 1) {
							return;
						}
						
						self.qreasTimeMap[qreasId] = {};						
						for (i in times) {
							var time = times[i].trim();
							
							if (time.length > 0) {
								self.qreasTimeMap[qreasId][time] = true;
							}								
						}
					}
				});
			}
			
			this.initSpPanalListeners = function() {
				self.erExtSpPanelNameQreas.change(function() {
					self.erExtSpPanelMin.val(0);
					self.erExtSpPanelRez.removeAttr('checked');
					self.erExtSpPanelMinOptions.removeAttr('disabled');
					
					var qreasId = self.erExtSpPanelNameQreas.val();
					if (typeof self.qreasTimeMap[qreasId] != 'undefined') {
						self.erExtSpPanelMinOptions.each(function() {
							var option = $(this);
							
							if (typeof self.qreasTimeMap[qreasId][option.val()] == 'undefined') {
								option.attr('disabled', 'disabled');
							}
						});
					}
				});
				
				self.erExtSpPanelWarnButton.on("click", function() {
					var userName = self.erExtSpPanelHeroInput.val();
					var reason = self.erExtSpPanelWarnReasons.val();
					
					if (userName == "" || reason == "") {
						return;
					}
					
					chat.send("/ch/", {
						action: "post",
						p_type: CHAT_FLAG_PRIVATE,
						p_text: urlencode('[' + userName + '] Предупреждение по ст.' + reason + ' http://forum.ereality.ru/topic183171/page1.html')
					});
					
					chat.send("/ch/", {
						action: "post",
						p_type: CHAT_FLAG_CLAN,
						p_text: urlencode('[' + userName + '] Игрок был предупрежден по ст. ' + reason)
					});
					
				});

                self.erExtSpPanelRez.on("change", function () {
                    if (self.erExtSpPanelNameQreas.val() > -1) {
                        self.erExtSpPanelNameRes.val(self.erExtSpPanelNameQreas.find('option:selected').text() + ' [Рецидив]');
                        self.erExtSpPanelNameQreas.val(-1);
                    }
                });


                if (erExtOptions.sp_shut_up_panel_links_giver) {
                    self.erExtSpPanelGiveLink.on('click', function () {
                        var userName = self.erExtSpPanelHeroInput.val();
                        var link = self.erExtSpPanelLinkSelect.val();
                        var title = self.erExtSpPanelLinkSelect.find(":selected").text();

                        if (userName == "" || link == "") {
                            return;
                        }

                        chat.send("/ch/", {
                            action: "post",
                            p_type: chat.flag,
                            p_text: urlencode('[' + userName + '] ' + title + ": " + link)
                        });
                    });
                }
			};	

			this.initSPMenuChat = function() {
				core.wndChat.contextMenu("menuChat", {
					onContextMenu: function(e) {
						var targ = $(e.target);
						self.menu_target = targ;
						var id = targ.attr("id");
						return id && "n_" == id.substr(0, 2) ? !0 : !1
					},
					onShowMenu: function(e, menu) {
						return user.bless_uid < 1 && $("#bless", menu).remove(), menu
					},
					
					bindings: {
						"barter": function() {
							return barter.StartBarter(self.menu_target.text()), !0
						},
						"private": function() {
							return chat.msgPrivate(self.menu_target.text()), !0
						},
						"info": function() {
							return core.infoByName(self.menu_target.text()), !0
						},
						"bless": function() {
							return core.blessFrmShow(user.bless_uid, self.menu_target.text()), !0
						},
						"ignor": function() {
							return chat.ignorAdd(self.menu_target.text()), !0
						},
						"sp_ld": function() {
							window.open('https://www.ereality.ru/ldh/?h_name=' + self.menu_target.text(), '_blank');
							return true;
						},
						'shutup': function() {
							self.erExtSpPanelHeroInput.val(self.menu_target.text());
							
							chat.showShutPanel();
							return true;
						},
						'warn': function() {
							self.erExtSpPanelHeroInput.val(self.menu_target.text());
							chat.showShutPanel();

							return true;
						},
						'link': function() {
							self.erExtSpPanelHeroInput.val(self.menu_target.text());
							chat.showShutPanel();

							return true;
						}
					}
				});
			};
		}
		
		var chatModifierClass = function() {
			this.messageDelay = 2000; // 2 seconds
			this.erExtIntIds = {
				"-1": null,
				"1": null
			};
			this.oldChatSend = chat.send;
			this.erExtCurrIntId = 1;
			this.erExtLastMsgTime = new Date().getTime();
			
			var self = this;
						
			this.init = function() {
				chat.erExt = {
					msgQueue: []
				}
				
				chat.send = self.chatSend;
			};
			
			this.chatSend = function($path, $params) {
				if ($params.action == "post") {				
					if (chat.erExt.msgQueue.length > 0) {
						chat.erExt.msgQueue.push({
							"path": $path,
							"params": $params
						});
					}
					else {
						var time = new Date().getTime();
						if (time - self.erExtLastMsgTime > self.messageDelay + 100) {
							self.erExtLastMsgTime = time;
							self.oldChatSend.apply(chat, [$path, $params]);
						} 
						else {
							self.erExtCurrIntId *= -1;
							
							chat.erExt.msgQueue.push({
								"path": $path,
								"params": $params
							});
							
							self.erExtIntIds[self.erExtCurrIntId] = self.startChatCheker(self.erExtCurrIntId);
						}					
					}
				}
				else {
					self.oldChatSend.apply(chat, [$path, $params]);
				}
			};
			
			this.startChatCheker = function (intervalID) {				
				return setInterval(function() {
					self.erExtChecker(intervalID);
				}, self.messageDelay);
			};
			
			this.erExtChecker =	function (intervalID) {
				if (chat.erExt.msgQueue.length > 0) {
					var msg = chat.erExt.msgQueue.shift();
					
					if (chat.erExt.msgQueue.length == 0) {
						clearInterval(self.erExtIntIds[intervalID]);						
					}
					
					self.oldChatSend.apply(chat, [msg.path, msg.params]);					
					self.erExtLastMsgTime = new Date().getTime();
				}				
			};
		}
		
		var chatTradeFlooderClass = function() {
			this.phrases = [];
			this.phrasesKey = 0;
			
			var self = this;
			
			this.init = function() {
				self.preparePhrases();
				self.initPraseKey();
				self.runTimer();
			}
			this.initPraseKey = function() {
				var key = localStorage["chat_trade_flooder_key"];
				
				if (typeof key == "undefined") {
					key = 0;
				}
				
				self.key = key;
			}
			
			this.runTimer = function() {
				if (self.phrases.length == 0) {
					return;
				}

				setInterval(function() {
					chat.send("/ch/", {
						action: "post",
						p_type: CHAT_FLAG_TRADE,
						p_text: self.getPrase()
					});
				}, 1000 * 60 * 10);
			}
			
			this.getPrase = function() {
				if (typeof self.phrases[self.phrasesKey] == "undefined") {
					self.phrasesKey = 0;
				}
				
				var prase = self.phrases[self.phrasesKey];				
				self.phrasesKey++;
				
				localStorage["chat_trade_flooder_key"] = self.phrasesKey;
				
				return prase;
			}
			
			this.preparePhrases = function() {
				var phrases = erExtSystemOptions.trade_flooder_phrases.split("|");
				
				for (i in phrases) {
					var phrase = phrases[i].trim().slice(0, 249);
					
					if (phrase.length > 0) {
						self.phrases.push(phrase);
					}
				}
			}
		}
		
		$(document).ready(function() {
			setTimeout(function() {
                var isSp = parseInt(user.c_id, 10) <= 10 && parseInt(user.c_id, 10) > 0;

                if (erExtOptions.alternative_chat_send ||
                    erExtOptions.trade_flooder_active ||
                    (isSp && erExtOptions.sp_extendable_shutup)) {
                    new chatModifierClass().init();
                }

				if (isSp && erExtOptions.sp_extendable_shutup) {
					new erExtSPToolsClass().init();
				}

                if (erExtOptions.trade_flooder_active) {
                    new chatTradeFlooderClass().init();
                }

			}, 1500);
		});

		if (erExtOptions.forumgoto) {			
			messenger.PrintMessage = function (Message, PrintReply, isClanOrAlign) { 
				Message['text'] = modifyForumLink(Message['text']);
				Message['caption'] = modifyForumLink(Message['caption']);
				
				oldPrintMessage.apply(messenger, [Message, PrintReply, isClanOrAlign]);
			}
		}	
		
		if (erExtOptions.fastex) {
			var oldTemplatesRender = templates.render;
			var exitLink = $("<a title=\"Выход из игры\" href=\"https://www.ereality.ru/exit.php\" onfocus=\"this.blur();\">[X]</a>");
			
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
					$.post("https://www.ereality.ru/ajax/global_event/", '<request action="showNextGlobalEvents" />', function (response) {
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
							(val.id!="")&&val.setAttribute("name", battle.players[val.id.substr(1)].name);
						})
					}

				if (soundOptions["sound_zavod"].sound != "nosound" && users.oSpanLocation.text().search("Цех ") == 0 && battle.FirstFactorySound) {
					battle.FirstFactorySound = false;
					core.playSwfSound(soundOptions["sound_zavod"].sound);
				}
			}
		}

        if (core.mur_soundOptions['sound_battle_skip_turn']['sound'] != 'nosound') {
            var OldBattleXmlProc = battle.xmlProc;

            battle.xmlProc = function (XML) {
                OldBattleXmlProc.apply(battle, [XML]);

                try {
                    var responseLogs = $(XML.getElementsByTagName("response")).find('logs');
                    if (responseLogs.attr('uid') == battle.round) {
                        responseLogs.find('skip').each(function () {
                            var p1 = $(this).attr('p1').split(';');

                            if (p1[0] == user.name) {
                                core.playSwfSound(core.mur_soundOptions['sound_battle_skip_turn']['sound']);
                            }
                        });
                    }
                } catch (e) {
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


		// ПКМ по локации вызывает меню с картами ОВЛ и ОПП
		if (myoptions.menu_maps) {
			script += "(" +
				(function() {
				var htmlmenu = "" +
					"<div id=\"m_mur_mapsmenu\" class=\"contextMenu\" style=\"visibility: hidden;position:absolute;\">" +
					"  <ul class=\"textM\">" +
					"    <li><a href=\"http://sidzoku.ru/maps/ovl/\" target=\"_blank\"><img src=\"https://img.ereality.ru/clan/73.gif\">Карта ОВЛ </a></li>" +
					"    <li><a href=\"http://sidzoku.ru/maps/opp/\" target=\"_blank\"><img src=\"https://img.ereality.ru/clan/73.gif\">Карта ОПП </a></li>" +
					"    <li><a href=\"http://sidzoku.ru/maps/ok/\" target=\"_blank\"><img src=\"https://img.ereality.ru/clan/73.gif\">Карта ОК </a></li>" +
					"    <li><a href=\"http://er-help.ru/scripts/map_shaxt.php\" target=\"_blank\"><img src=\"https://img.ereality.ru/clan/292.gif\">Карта шахт </a></li>" +
					"    <li><a href=\"http://usercp.ereality.ru/services/boat-trips/map/turquoise-island\" target=\"_blank\"><img src=\"https://img.ereality.ru/clan/1.gif\">Карта БО</a></li>" +
					"    <li><a href=\"http://usercp.ereality.ru/services/boat-trips/map/green-island\" target=\"_blank\"><img src=\"https://img.ereality.ru/clan/1.gif\">Карта ЗО</a></li>" +
					"    <li><a href=\"http://www.ereality.ru/goto/er-help.ru/scripts/map_bzo.php\" target=\"_blank\"><img src=\"https://img.ereality.ru/clan/292.gif\">Карта БО</a></li>" +
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
		$.post("/ajax/json.php",
				'{"controller":"hero","action":"panel","params":{"argv":{"inventory":true}},"client":1}',
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
			if (event.keyCode == 13) core.isEnterPressed = false;	
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
	     		core.mEnter = false;
				var zxzx9 = core.onKeyDown;
				core.onKeyDown = function(event) {
					event = (window.event || event);
					if (event.keyCode == 13) {
						if (core.mEnter && !core.isEnterPressed) {
							setTimeout(function() {
								(battle.bstatus == 0) && battle.refresh('user_force2')
							}, 250)
						}
						core.isEnterPressed = true;
					}
					var myrezult = zxzx9.apply(core, arguments);
					return myrezult
				}
	  $(document).unbind('keydown').unbind('keyup');
	  $(document).keydown(core.onKeyDown).keyup(core.onKeyUp);
	  }).toString()
	+ ")();"; 
}

		// Эффект "залипающего" энтера в бою
		if (myoptions.pressedEnter) {
			script += "(" +
				(function() {
					core.mEnter = true;
					var buildPlayersTableOld = battle.buildPlayersTable;
					battle.buildPlayersTable = function() {
						buildPlayersTableOld.apply(battle);
						if (core.isEnterPressed && document.getElementById("chat_msg").value == "") {
							battle.make_turn();
						}

						return;
					}
				}).toString() + ")();";
		}


		// По "ё" перемещение в бою в первый ряд
		if (myoptions.battle_move) {
			script = script + "(" +
				(function() {
					var old_onKeyUp = core.onKeyUp;
					core.onKeyUp = function(event) {
						event = (window.event || event);
							if ((event.keyCode == 192 || event.key=="ё") && (battle.bstatus == 0) && (document.getElementById("chat_msg").value == "" )) {
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

	//При не пустой строке чата не завершать бой энтером и уже пробелом , поидее )
	if (myoptions.keyenter) {
		script+=  "(" +
	(function(){
	var zxzx6=core.onKeyDown;
	core.onKeyDown=function(event){
	event=(window.event||event);
	if ((event.keyCode==13 || event.keyCode==32)&&(battle.bstatus==0)&&(document.getElementById("chat_msg").value != "" )) { return}
	else
		{var myrezult=zxzx6.apply(core,arguments);
	     return myrezult}
	}
	var zxzx7=core.onKeyUp;
	core.onKeyUp=function(event){
	event=(window.event||event);
	if ((event.keyCode==13 || event.keyCode==32)&&(battle.bstatus==0)&&(document.getElementById("chat_msg").value != "" )) { return}
	else
		{var myrezult=zxzx7.apply(core,arguments);
	     return myrezult}
	}
	$(document).unbind('keydown').unbind('keyup');
	$(document).keydown(core.onKeyDown).keyup(core.onKeyUp);
	}).toString()
	+ ")();"; 
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

		// Автосмена комплектов
        if (myoptions.sets_autowear) {
            script += script_set_autowear;
        }

        // Открывашка новогодних подарков 2016
		if (myoptions.presents2016) {
			script += script_presents2016.replace("closeButton_pic", kango.io.getResourceUrl("res/icon_close.gif"));;
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
						coreAudio.attr("src", 'https://www.ereality.ru/mp3/' + sound + '.mp3');
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
						$.post("https://www.ereality.ru/ajax/fdemands/",
							'<?xml version="1.0" encoding="windows-1251"?><request mode="10" />',
							function(response) {
								$.each($("d", response), function(index, elem) {
									var mas_players = ($(elem).attr("n1") + $(elem).attr("n2")).split(":");
									$.each(mas_players, function(i) {
										if (mas_players[i] != "") {
											var link = $('<a href="https://www.ereality.ru/log/#id' + $(elem).attr("id") + '/page999" target="_blank"><img src="https://img.ereality.ru/a/swords.gif" class="i" title="В бою"/></a>')
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
				$.get("https://www.ereality.ru/clan.php?action=use_abil&i=18&h=1", function(response) {
					if ($("b", response)[0].innerHTML == "Вы успешно использовали восстановление!") {
						top.core.alertMsg($("b", response)[0].innerHTML);
						top.user.setHME(top.user.hp, top.user.hp, top.user.hp, top.user.ma, top.user.ma, top.user.ma, top.user.en, top.user.en, top.user.en);
					} else
						top.core.alertError($("b", response)[0].innerHTML);
				});
			});

		}).toString() + ")();";
	}

		// Телепорт малым свитком
		if (myoptions.teleport) {
			script += "(" +
				(function() {
					json.old_teleport_jsonRecv = json.jsonRecv;
					json.jsonRecv = function(data) {
						json.old_teleport_jsonRecv.apply(json, [data]);
						if (data.controller == "inventory" && data.action == "use" && data.response.core != undefined && data.response.core.messages[0].search("Вы успешно телепортировались на локацию") > -1) {
							core.trigger("move");
							if (core.mur_old_category != inventory.cache.inputData.inventory.category) {
								$.post("https://www.ereality.ru/ajax/json.php",
									'{"controller":"hero","action":"inventoryCategory","params":{"mode":' + core.mur_old_category + '},"client":1}',
									function(response) {
										heroPanel.updateHeroInv(response.response);
									},
									"json");
							}
						}
						return;
					}
					fast_teleport = function() {
						$.each(inventory.items, function(index, value) {
							if (value.w_id == 3033 && value.uid[0] != "g") {
								json.jsonSend({
									"controller": "inventory",
									"action": "use",
									"params": {
										"uid": value.uid
									},
									"client": 1
								});
								return false;
							}
						})
					}
					inv_teleport = function() {
						core.mur_old_category = inventory.cache.inputData.inventory.category;
						if ($.isEmptyObject(inventory.items) || !(inventory.cache.inputData.inventory.category == 0 || inventory.cache.inputData.inventory.category == 6)) {
							$.post("https://www.ereality.ru/ajax/json.php",
								'{"controller":"hero","action":"inventoryCategory","params":{"mode":0},"client":1}',
								function(response) {
									heroPanel.updateHeroInv(response.response);
									setTimeout(function() {fast_teleport();},200);
								},
								"json");
						} else fast_teleport();
					}	

					$("img[src*=m_teleport]").on('click', function() {
						if (inventory.cache.inputData.inventory==undefined) {
							$.post("https://www.ereality.ru/ajax/json.php",
								'{"controller":"hero","action":"panel","params":{"argv":{"inventory":true}},"client":1}',
								function(response) {
									heroPanel.updateHeroInv(response.response);
									setTimeout(function() {inv_teleport();},200);
								},
								"json");
						} else inv_teleport();
					});

				}).toString() + ")();";
		}



		// Таймеры таверны и поместья
		if (myoptions.timer_taverna || myoptions.timer_jeweler || myoptions.timer_estate || myoptions.timer_pet) {
			myoptions.timer_taverna && (script_timers = script_timers.replace("core.mur_timer.taverna = false", "core.mur_timer.taverna = true"));
			myoptions.timer_jeweler && (script_timers = script_timers.replace("core.mur_timer.jeweler = false", "core.mur_timer.jeweler = true"));
			myoptions.timer_estate && (script_timers = script_timers.replace("core.mur_timer.estate = false", "core.mur_timer.estate = true"));
			myoptions.timer_pet && (script_timers = script_timers.replace("core.mur_timer.pet = false", "core.mur_timer.pet = true"));
			myoptions.timer_egg && (script_timers = script_timers.replace("core.mur_timer.egg = false", "core.mur_timer.egg = true"));
			if (kango.browser.getName() != "firefox") {
				script_timers = script_timers.replace("MurTimerCss","-webkit-linear-gradient(top, #fff,#bbb)");
			} else {
				script_timers = script_timers.replace("MurTimerCss","-moz-linear-gradient(center top , #fff, #bbb) repeat scroll 0 0 rgba(0, 0, 0, 0)");
			}
			script += script_timers.replace(/sound_taverna/g,defaultConfig.soundOptions["sound_taverna"].sound).replace("alarm-clock.png", kango.io.getResourceUrl("res/alarm-clock.png")).replace("icon_close.gif", kango.io.getResourceUrl("res/icon_close.gif")).replace(/sound_jeweler/g,defaultConfig.soundOptions["sound_jeweler"].sound);
		}

		inject_global(script);
	}

 //=========================end.

 });


