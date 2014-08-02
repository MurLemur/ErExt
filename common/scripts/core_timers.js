var script_timers= "(" +
	(function(){
core.mur_timer = {};
core.mur_timer.taverna = false;
core.mur_timer.estate = false;
core.mur_timer.taverna_update = true;
core.mur_timer.estate_update = true;
core.mur_timer.taverna_timer = new Date();
core.mur_timer.estate_timer = new Date();
core.mur_timer.estate_time = new Date();
core.mur_timer.estate_cards = 0;
core.mur_timer.estate_type = 0;

core.mur_timer.getMyTime = function(time) {
	function format(ttime) {
		if (+ttime < 10) return "0" + ttime;
		return ttime;
	}
	var ntime = new Date();
	hour = parseInt((time - ntime) / 3600000);
	minutes = parseInt(((time - ntime) - hour * 3600000) / 60000);
	return hour + ":" + format(minutes);

}

core.mur_timer.init = function() {
	core.mur_timer.taverna_getinfo();
	core.mur_timer.estate_getinfo();
	var html = "" +
		"<div class=\"ext_countdown\">" +
		"	<table>" +
		"	<tr id=\"tav\">" +
		"		<td>Таверна : </td>" +
		"		<td><span id=\"tav_timer\"></span></td>" +
		"	</tr>" +
		"	<tr id=\"est\">" +
		"		<td>Поместье(<span id=\"countm\"></span>): </td>" +
		"		<td><span id=\"est_timer\"></span></td>" +
		"	</tr>" +
		"	</table>" +
		"</div>";
	var htmlcss = {
		"background": "MurTimerCss",
		"border-radius": "6px",
		"box-shadow": "0 3px 6px rgba(0, 0, 0, 0.45)",
		"color": "#1e1e1e",
		"float": "left",
		"font": "14px/17px Verdana,Arial,Geneva,Helvetica,sans-serif",
		"height": "auto",
		"padding": "12px",
		"text-shadow": "0 0 8px #1e1e1e",
		"width": "140px",
		"position": "absolute",
		"right": "300px",
		"top": "10px"
	};
	$("#div_chat_msg").parent().append($(html).css(htmlcss).hide());
	core.mur_timer.setstyle();
	$("#tav_timer").text(core.mur_timer.getMyTime(core.mur_timer.taverna_timer));
	$("#countm").text(core.mur_timer.estate_cards);
	$("#est_timer").text(core.mur_timer.getMyTime(core.mur_timer.estate_timer));
	(!core.mur_timer.taverna) && $("#tav").remove();
	(!core.mur_timer.estate)  && $("#est").remove();


}

core.mur_timer.taverna_getinfo = function() {
	function xmlResponse(xmldoc) {
		if ($("workt", xmldoc).text().length > 0) {
			num = $("workt", xmldoc).length - 1;
			timer = parseInt($("workt", xmldoc)[num].innerHTML);
			var time = new Date();
			core.mur_timer.taverna_timer.setTime(time.getTime() + timer * 1000);
		}
	}
	$.post("/ajax/taverna/", "<request action=\"getQueue\"></request>", xmlResponse);
	core.mur_timer.taverna_update = false;
}

core.mur_timer.estate_getinfo = function() {
	function xmlResponse(xmldoc) {
		if ($("cardsTime", xmldoc).text().length > 0) {
			timer = parseInt($("cardsTime", xmldoc).text());
			core.mur_timer.estate_type = $("type:first", xmldoc).text();
			core.mur_timer.estate_cards = $("cards", xmldoc).text();
			
			var timer2 = (5 - core.mur_timer.estate_cards) * (6 - core.mur_timer.estate_type) * 3600000;
			var time = new Date();
			
			core.mur_timer.estate_timer.setTime(time.getTime() + timer * 1000);
			core.mur_timer.estate_time.setTime(core.mur_timer.estate_timer.getTime() + timer2);
			localStorage["estate_time"] = core.mur_timer.estate_time;
			localStorage["estate_type"] = core.mur_timer.estate_type;
		} else {
			if (new Date().setTime(Date.parse(localStorage["estate_time"])) > new Date()) {
				core.mur_timer.estate_type = localStorage["estate_type"];
				core.mur_timer.estate_time.setTime(Date.parse(localStorage["estate_time"]));
				var time = new Date();
				core.mur_timer.estate_cards = 5 - parseInt((core.mur_timer.estate_time - time) / (3600000 * (6 - core.mur_timer.estate_type)));
				core.mur_timer.estate_timer.setTime(core.mur_timer.estate_time.getTime() - (5 - core.mur_timer.estate_cards) * (6 - core.mur_timer.estate_type) * 3600000);
			}
		}
		if (core.mur_timer.estate_timer < (new Date()) || (core.mur_timer.estate_cards>=5)) $("#est").hide();
	}
	$.post("/ajax/estates/", "<request action=\"get_estate\"></request>", xmlResponse);
	core.mur_timer.estate_update = false;
}

core.mur_timer.main = function() {
		if (core.mur_timer.taverna) {
			(core.mur_timer.taverna_update) && core.mur_timer.taverna_getinfo();

			$("#tav_timer").text(core.mur_timer.getMyTime(core.mur_timer.taverna_timer));
			if (core.mur_timer.taverna_timer < (new Date())) $("#tav").hide();
			else {
				$("#tav").show();
				if ($("#tav_timer").text().search(/0\:0[0-5]/) > -1) {
					if ($("#tav").css("color") != "rgb(255, 0, 0)") {
						("sound_taverna" != "nosound") && core.playSwfSound("sound_taverna");
						$("#tav").css({
							"color": "rgb(255,0,0)",
							"font-weight": "bolder"
						});
					}
				} else {
					if ($("#tav").css("color") == "rgb(255, 0, 0)") $("#tav").css({
						"color": "rgb(0,0,0)",
						"font-weight": ""
					});
				}
			}
		}
	if (core.mur_timer.estate) {
		(core.mur_timer.estate_update) && core.mur_timer.estate_getinfo();

		$("#countm").text(core.mur_timer.estate_cards);
		$("#est_timer").text(core.mur_timer.getMyTime(core.mur_timer.estate_timer));
		if (core.mur_timer.estate_timer < (new Date()) || (core.mur_timer.estate_cards>=5)) {
			core.mur_timer.estate_getinfo();
		} else $("#est").show();
	}
	if (((core.mur_timer.estate_timer < (new Date())) || (!core.mur_timer.estate)) && ((core.mur_timer.taverna_timer < (new Date())) || (!core.mur_timer.taverna))) $(".ext_countdown").hide();
	else $(".ext_countdown").show();
}

	core.mur_timer.setstyle = function(style) {
		if (!style) {
			if (localStorage["timerstylesmall"] == "true") style = "small";
			else style = "big";
		}
		if (style == "big") {
			localStorage["timerstylesmall"] = "false";
			var css = {
				"border-radius": "6px",
				"font": "14px/17px Verdana,Arial,Geneva,Helvetica,sans-serif",
				"padding": "12px",
				"text-shadow": "0 0 8px #1e1e1e",
				"width": "140px",
			};
		} else {
			localStorage["timerstylesmall"] = "true";
			var css = {
				"border-radius": "3px",
				"font": "9px/11px Verdana,Arial,Geneva,Helvetica,sans-serif",
				"padding": "6px",
				"text-shadow": "0 0 4px #1e1e1e",
				"width": "100px"
			};
		}
		$(".ext_countdown").css(css);
	}


core.mur_timer.init();

	var htmlmenu = "" +
		"<div id=\"m_mur_timer\" class=\"contextMenu\" style=\"visibility: hidden;position:absolute;\">" +
		"  <ul class=\"textM\">" +
		"    <li><a href=\"javascript: core.mur_timer.setstyle('big');\">Большое  </a></li>" +
		"    <li><a href=\"javascript: core.mur_timer.setstyle('small');\">Маленькое</a></li>" +
		"  </ul>" +
		"</div>";
	$(document.body.lastChild).after($(htmlmenu));
	$(".ext_countdown").contextMenu("m_mur_timer",{});

setTimeout(function () {core.mur_timer.main();}, 100);
setInterval(function () {core.mur_timer.main();}, 10000);

}).toString()
	+ ")();"; 