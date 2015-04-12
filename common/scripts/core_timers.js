var script_timers= "(" +
	(function(){
core.mur_timer = {};
core.mur_timer.taverna = false;
core.mur_timer.estate = false;
core.mur_timer.pet = false;
core.mur_timer.egg = false;
core.mur_timer.taverna_update = true;
core.mur_timer.estate_update = true;
core.mur_timer.pet_update = true;
core.mur_timer.taverna_timer = new Date();
core.mur_timer.pet_timer = new Date();
core.mur_timer.pet_timer_egg = new Date();
core.mur_timer.estate_timer = new Date();
core.mur_timer.estate_time = new Date();
core.mur_timer.pet_cards = 0;
core.mur_timer.pet_eggs = 0;
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
	core.mur_timer.pet_getinfo();
	var html = "" +
		"<div class=\"ext_countdown\">" +
		"	<img id=\"mur_closepic\" src=\"icon_close.gif\">" +
		"	<table>" +
		"	<tr id=\"tav\">" +
		"		<td>Таверна : </td>" +
		"		<td><span id=\"tav_timer\"></span></td>" +
		"	</tr>" +
		"	<tr id=\"est\">" +
		"		<td>Поместье(<span id=\"countm\"></span>): </td>" +
		"		<td><span id=\"est_timer\"></span></td>" +
		"	</tr>" +
		"	<tr id=\"pet\">" +
		"		<td><span id=\"mur_eggs\" style=\"position:absolute\"></span> Лицензии(<span id=\"pcountm\"></span>): </td>" +
		"		<td><span id=\"pet_timer\"></span></td>" +
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
		$("#div_chat_msg").parent().append($("<img id=\"mur_clock_pic\" src=\"alarm-clock.png\">").css({
			position: "absolute",
			top: "10px",
			right: "300px"
		}).hide());
		$("#div_chat_msg").parent().append($(html).css(htmlcss).hide());
		core.mur_timer.setstyle();
		$("#tav_timer").text(core.mur_timer.getMyTime(core.mur_timer.taverna_timer));
		$("#countm").text(core.mur_timer.estate_cards);
		$("#est_timer").text(core.mur_timer.getMyTime(core.mur_timer.estate_timer));
		$("#pcountm").text(core.mur_timer.pet_cards);
		$("#pet_timer").text(core.mur_timer.getMyTime(core.mur_timer.pet_timer));
		$("#pet").on("click", function() {
					if (localStorage["pet_id"] != undefined) {
						function m_jsonResponse(jsondata) {
							core.mur_timer.pet_cards = jsondata.response.cards;
							timer = jsondata.response.nextCard;
							core.mur_timer.pet_eggs = 0;
							$.each(jsondata.response.pets, function() { if (this.type==0) core.mur_timer.pet_eggs++});
							var time = new Date();
							core.mur_timer.pet_timer.setTime(time.getTime() + timer * 1000);
							core.mur_timer.main();
						}
						$.ajax({
							type: "POST",
							url: "/ajax/json.php",
							data: JSON.stringify({
								"controller": "farm",
								"action": "sendToFight",
								"params": {
									id: localStorage["pet_id"]
								}
							}),
							success: m_jsonResponse,
							dataType: "json"
						});
					}
		});
		(!core.mur_timer.taverna) && $("#tav").remove();
		(!core.mur_timer.estate) && $("#est").remove();
		(!core.mur_timer.pet) && $("#pet").remove();
		if (core.mur_timer.pet) {
			var old_jsonSend = json.send;
			json.send = function() {
				if (arguments[0] == "farm" && arguments[1] == "sendToFight") localStorage["pet_id"] = arguments[2].id;
				old_jsonSend.apply(json, arguments);
				return;
			}
		};
		$("#mur_closepic").css({
			position: "absolute",
			top: "3px",
			right: "3px",
			opacity: 0
		});
		$("#mur_closepic").hover(function() {
			$(this).css("opacity", 0.5)
		}, function() {
			$(this).css("opacity", 0)
		});
		$("#mur_closepic").on("click",function() {
			$(".ext_countdown").hide();
			$("#mur_clock_pic").show();
		});
		$("#mur_clock_pic").on("click",function() {
			$("#mur_clock_pic").hide();
			$(".ext_countdown").show();
		});


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

core.mur_timer.pet_getinfo = function() {
		function m_jsonResponse(jsondata) {
			core.mur_timer.pet_cards = jsondata.response.cards;
			timer = jsondata.response.nextCard;
			timer_egg = jsondata.response.eggTime;
			core.mur_timer.pet_eggs = 0;
			$.each(jsondata.response.pets, function() { if (this.type==0) core.mur_timer.pet_eggs++});
			var time = new Date();
			core.mur_timer.pet_timer.setTime(time.getTime() + timer * 1000);
			core.mur_timer.pet_timer_egg.setTime(time.getTime() + timer_egg * 1000);

		}

		$.ajax({
			type: "POST",
			url: "/ajax/json.php",
			data: JSON.stringify({
				"controller": "farm",
				"action": "init",
				"params": {}
			}),
			success: m_jsonResponse,
			dataType: "json"
		});
		core.mur_timer.pet_update = false;
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
	if (user.nowplace=="22:73" || user.nowplace=="11:69" || user.nowplace=="13:48") $.post("/ajax/estates/", "<request action=\"get_estate\"></request>", xmlResponse);
	else xmlResponse("");
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
			if (core.mur_timer.estate_timer < (new Date()) || (core.mur_timer.estate_cards >= 5)) {
				core.mur_timer.estate_getinfo();
			} else $("#est").show();
		}
		if (core.mur_timer.pet) {
			(core.mur_timer.pet_update) && core.mur_timer.pet_getinfo();

			$("#pcountm").text(core.mur_timer.pet_cards);
			if (core.mur_timer.egg) {
				if (core.mur_timer.pet_timer_egg < (new Date())) core.mur_timer.pet_getinfo();
				if ($("#mur_eggs").children().length != core.mur_timer.pet_eggs) {
					$("#mur_eggs").empty();
					$("#mur_eggs").css({
						left: -25 * core.mur_timer.pet_eggs
					});
					for (var i = 0; i < core.mur_timer.pet_eggs; i++) {
						$("#mur_eggs").append($("<img width=\"25px\" src=\"http://img.ereality.ru/-x-/w/egg.png\">"));
					}
				}
			}
			if (core.mur_timer.pet_cards > 0) {
				$("#pcountm").parent().css({
					cursor: "pointer"
				});
			} else $("#pcountm").parent().css({
				cursor: ""
			});
			$("#pet_timer").text(core.mur_timer.getMyTime(core.mur_timer.pet_timer));
			if (core.mur_timer.pet_timer < (new Date()) || ((core.mur_timer.pet_cards == 0) && $("#pet_timer").text() == "0:00")) {
				$("#pet").hide();
				core.mur_timer.pet_getinfo();
			} else $("#pet").show();
	}

	if (((core.mur_timer.estate_timer < (new Date())) || (!core.mur_timer.estate)) 
		&& ((core.mur_timer.taverna_timer < (new Date())) || (!core.mur_timer.taverna))  
		&& ((core.mur_timer.pet_timer < (new Date())) || (!core.mur_timer.pet))) $(".ext_countdown").hide();
	else ($("#mur_clock_pic").css("display")=="none") && $(".ext_countdown").show();
		
		// Нужно ли показать кнопку голосовалки
		if ($("#m_golosovalka").length>0) {
			var now_dt = new Date();
			if (now_dt.getDate() != core.mur_golosovalka_date) $("#m_golosovalka").show();
		}
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