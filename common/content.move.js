// ==UserScript==
// @name     ErExt_ModifyMove
// @include	http://www.ereality.ru/move*
// @include	http://www.ereality.ru/map.php*modeSwitch*
// @require     tools.js
// @all-frames  true
// ==/UserScript==

//================================================================Begin

kango.invokeAsync('kango.storage.getItem', "options", function(value) {
		myoptions = mergeOptions(value, defaultConfig.myoptions);

		if (!myoptions.unpaused) {
			return;
		}
//=====================================================================  
// Добавление своих локаций на ОВЛ и ОПП 
	kango.invokeAsync('kango.storage.getItem', "systemOptions", function(options) {
		var mergedSystemOptions = mergeOptions(options, defaultConfig.systemOptions);

		var script = "(" +
		(function() {

				var Old_drawCaution = Map.drawCaution;
				Map.drawCaution = function() {
					Old_drawCaution.apply(Map);
					if (top.core.caution) {
						if (top.core.caution < 25 && top.main.Map.caution.percent >= 25 && top.core.mur_soundOptions["sound_25"].sound != "nosound") {
							top.core.playSwfSound(top.core.mur_soundOptions["sound_25"].sound);
						}
						if (top.core.caution < 50 && top.main.Map.caution.percent >= 50 && top.core.mur_soundOptions["sound_50"].sound != "nosound") {
							top.core.playSwfSound(top.core.mur_soundOptions["sound_50"].sound);
						}
						if (top.core.caution < 75 && top.main.Map.caution.percent >= 75 && top.core.mur_soundOptions["sound_75"].sound != "nosound") {
							top.core.playSwfSound(top.core.mur_soundOptions["sound_75"].sound);
						}
						if (top.core.caution < 100 && top.main.Map.caution.percent >= 100 && top.core.mur_soundOptions["sound_100"].sound != "nosound") {
							top.core.playSwfSound(top.core.mur_soundOptions["sound_100"].sound);
						}
					}
					top.core.caution = top.main.Map.caution.percent;
					return;
				}

				begin_mark
				if (document.getElementsByClassName("SearchPlace").length > 0) {	
							options_loc = {
								"1":  "option_ovl",
								"3":  "option_opp",
								"14": "option_to"
							}
							var str = options_loc[Map.heroMap];
							var location_mas = str.split(";");
							for (var i = 0; i < location_mas.length; i++) {
								if (location_mas[i].length > 5) {
									loc = location_mas[i].split(")");
									sectorId = loc[0].replace("(", "");
									Map.locations[Map.heroMap][sectorId] = loc[1];
									$('<option></option>').attr('value', sectorId).text(Map.locations[Map.heroMap][sectorId]).insertAfter($('option[value="0"]')[1]);
								}
							}
				}
				end_mark
			}).toString().replace("option_ovl", getStringifyParams(mergedSystemOptions.locatioons_ovl)).replace("option_opp", getStringifyParams(mergedSystemOptions.locatioons_opp)) + ")();";

		if (location.href.search("modeSwitch")!=-1) {
			script=script.replace("begin_mark","var old_MapDraw = Map.draw;Map.draw = function() {old_MapDraw.apply(Map);top.$('#main').trigger('load');");
			script=script.replace("end_mark","return;}");
		} else {
			script=script.replace("end_mark","").replace("begin_mark","");
		}

		//копирование инфы о ботах на секторе в чат по пкм
		if (myoptions.location_bot_info) {
			script += "(" +
				(function() {
					$("li", "div.MonstersOnTheMapContainer").on("contextmenu", function() {
						$("#chat_msg", top.document).val("");
						Map.reportBots()
					})
					$("li", "div.MonstersOnTheMapContainer").each(function() {
						this.oncontextmenu = function() {
							return false
						};
					})

				}).toString() + ")();";
		}
			inject_global(script);
		
	});


		//Модернизация механизма изгонялок на альенах
		if (myoptions.aliensmy) {
		var script1 = "(" +
			(function() {
					$(document).ready(function() {
							div = document.getElementById("aliens_stats");

							if (div != undefined) {

								res = div.getElementsByTagName("b");

								function getout1(name) {

									var xmlPath = '/ajax/aliens/';

									for (var $g_id in aliens_stats) {
										var users = aliens_stats[$g_id]['users'];
										for (var j = 0; j < users.length; j++) {
											if (users[j][1] == name) {
												var h_id = users[j][0]
											}
										}
									}

									xmlText = '<request action="getOut">' + '<h_id>' + h_id + '</h_id>' + '</request>';

									top.core.xmlSend(xmlPath, xmlText, function(xmldoc) {
										top.core.alertMsg($('msg', xmldoc).text());
									});
								}


								for (i = 0; i < res.length; i++) {
									if (res[i].innerHTML != top.user.name) {
										$("b:contains(" + res[i].innerHTML + ")").before($("<a href=\"#\" >[X]</a>"));
									}
								}

								links = div.getElementsByTagName("a");

								for (i = 0; i < links.length; i++) {
									links[i].addEventListener("click", function() {
										getout1(this.nextSibling.innerHTML);
									});
								}
							}
						});
			}).toString() + ")();";

			inject_global(script1);
		}

//=========================end.
});