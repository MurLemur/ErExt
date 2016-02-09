// ==UserScript==
// @name        trade-sell
// @include     www.ereality.ru/map*n=useritems*
// @include     www.ereality.ru/map*e=useritems*
// @include 	www.ereality.ru/map*action=sell
// @include 	www.ereality.ru/map*mode=sell
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

	var script="";

	// Ссылка на ресурсы в госе
	if (myoptions.resources_prices) {
		$("#span_lotmassa").parent().parent().append($("<br><a target=\"_blank\" href=\"https://www.ereality.ru/goto/er-help.ru/s/14.php\">Ресурсы в госе</a>"));
	}

	if (myoptions.taverna_filters && (location.href.search("mode=sell") != -1) && top.document.getElementById("span_location").text == "Таверна") {
		var m_filters = ["Жизни", "Энергия", "Мана", "Точность", "Уворот", "Сокрушение", "Стойкость", "ОД"];


		top.main.$("#div_bhtml").before($("<center><b>Фильтры:</b></center>"))
		container = ($("<center></center>"))
		$.each(m_filters, function(index, val) {
			var htmlelements = $("<input class=\"butt1\" type=\"button\" value=\"" + val + "\">").on("click", function() {
				top.main.$("table").filter(".textM").hide();
				top.main.$("td:contains(" + val + ")").parent().parent().parent().show();
			});
			container.append(htmlelements);
		});
		var htmlelements = $("<input class=\"butt1\" type=\"button\" value=\"    X    \">").on("click", function() {
			top.main.$("table").show();
		});
		container.append(htmlelements);
		top.main.$("#div_bhtml").before(container);
	}

	//Механизм быстрого выставления однотипных лотов для биржи
	if (myoptions.stockmy && location.href.search("n=useritems") != -1 ) {


		script += "(" +
			(function() {

			//Выставление лота на биржу
			top.core.addlot = function(id, price, ltime) {
				$.post("https://www.ereality.ru/ajax/stock/", '<root type="5" uid="' + id + '" price="' + price + '" stype="0" stime="' + ltime + '" bprice="0" whole="0"></root>', stock_processXML);
			}



			top.core.addbuttons = function() {
				myprice = $("#myprice");
				mybuttons = $("input[id^=mbtn]");
				if (mybuttons.length == 0) {
					$.each($("div[id^=ibtn]"), function(index, elem) {
						key = elem.id.replace("ibtn", "");

						if ((myprice.length > 0) && (myprice.val() > 0)) {
							mystime = $("#mystime");
							$(elem).after($("<input class=\"butt2\" id=\"mbtn" + key + "\" type=\"button\" onclick=\"top.core.addlot(" + key + "," + myprice.val() + "," + mystime.val() + ")\" value=\"Выставить по " + myprice.val() + "\">"));
						}
					});
				} else {
					$.each(mybuttons, function(index, elem) {
						key = elem.id.replace("mbtn", "");

						if ((myprice.length > 0) && (myprice.val() > 0)) {
							mystime = $("#mystime");
							elem.attributes["onclick"].value = "top.core.addlot(" + key + "," + myprice.val() + "," + mystime.val() + ");";
							elem.value = "Выставить по " + myprice.val();
						}
					});

				}
				return;
			};


			var htmlelements = '<table class="textM" align="center">' +
				'<tbody>' +
				'<td>' +
				'<table class="textM" align="center">' +
				'<tbody>' +
				'<td align="left">Цена продажи : </td>' +
				'<td align="left">' +
				'<input id="myprice" class="field" type="text" value="" name="myprice"  maxlength="7" size="7">' +
				'</td>' +
				'<tr>' +
				'<td align="left">Продолжительность: </td>' +
				'<td align="left">' +
				'<select id="mystime" class="butt1" name="mystime">' +
				'<option value="0">1 час</option>' +
				'<option value="1"> 3 часа </option>' +
				'<option value="2"> 6 часов </option>' +
				'<option value="3"> 12 часов </option>' +
				'<option value="4"> 1 день </option>' +
				'<option value="5"> 2 дня </option>' +
				'<option selected="" value="6"> 3 дня </option>' +
				'</select>' +
				'</td>' +
				'</tr>' +
				'</tbody>' +
				'</table>' +
				'</td>' +
				'<td>' +
				'<a title="Добавить/обновить кнопки" class="refresh" href="javascript: top.core.addbuttons();"> </a>' +
				'</td>' +
				'</td>' +
				'</tbody>' +
				'</table>';

			$($("#cat")[0]).after($(htmlelements));

		}).toString() + ")();";

	}
	if (myoptions.stock_sell_offline_find && !(location.href.search("mode=sell") != -1 && document.getElementById("npc366") != undefined)) {
		script += " (" +
			(function() {
				$.each($("table[id^=tbl] td[colspan=4] b"), function(index, elem) {
					var item_name = $(this).text();

					if (item_name != "Сломано") {
                        var link = $('<a  title="Искать на бирже" target="_blank"><img style="display:inline"  src="search.png"></a>')
                            .attr('href', 'http://usercp.ereality.ru/services/stock/search?search=' + encodeURIComponent(item_name.replace("(", "").replace(")", "")));

						$(elem).after(link);
					}
				});
			}).toString() + ")();";

	}
		(script != "") && inject_global(script.replace("search.png",kango.io.getResourceUrl("res/yo-bods-search.png")));


//=========================end.
});