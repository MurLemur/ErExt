var turquoiseInfoClass = function(css, holder) {
	this.css = css;
	this.Status = false;
	this.timers = false;
	this.timer_island = new Date();
	this.timer_id ="";
	var self = this;


	this.buildLink = function() {
		var img = $("<img src=\"" + this.css.turquoiseImg + "\">").on('click', function() {
			self.turquoiseInfo();
		});

		return $("<a title=\"Информация по товарам на БО\"></a>").append(img).css(this.css.link);
	};

	this.turquoiseInfo = function() {
		if (self.Status) {
			self.Status = false;
			$(".ext_trade_info").hide();
			clearInterval(self.timer_id);
		} else {
			this.ShowInfo();
		}
		localStorage['turquoiseInfoStatus'] = self.Status;
	};

	this.ShowInfo = function() {
		this.getinfo_shop();
		this.getinfo_pirat();
		this.refresh_timers();
		if (self.timers) {
			$("#mur_arrow").attr("src", kango.io.getResourceUrl("res/arrow_left.gif"));
			$("#mur_arrow").attr("title", "Скрыть таймеры");
			$(m_timers_info).show();
		} else	{
			$("#mur_arrow").attr("src", kango.io.getResourceUrl("res/arrow_right.gif"));
			$("#mur_arrow").attr("title", "Показать таймеры");
			$(m_timers_info).hide();
		}
		$(".ext_trade_info").show();
		self.Status = true;
		this.timer_id = setInterval(function() { 
			self.refresh_timers();
		},40000);	
	};

	this.init = function() {
		holder.parent().prepend(this.buildLink());
		this.initInfo();
		if (localStorage['turquoise_timers'] == 'true') self.timers = true;
		if (localStorage['turquoiseInfoStatus'] == 'true') this.ShowInfo();
	}

	this.initInfo = function() {
		icon_turqouise = kango.io.getResourceUrl("res/island_turquoise.png");
		icon_up_island = kango.io.getResourceUrl("res/island_up.png");
		icon_trade_island = kango.io.getResourceUrl("res/island-trade.png");

		var html = "" +
			"<div class=\"ext_trade_info\"> " +
			"     <img id=\"mur_closeinf\" src=\"" + kango.io.getResourceUrl("res/icon_close.gif") + "\">" +
			"     <img title=\"Обновить\" id=\"mur_update\" src=\"" + kango.io.getResourceUrl("res/updating.gif") + "\">" +
			" 	  <table>   " + 
        	"			<tr><td width=\"210\"> " +
			"     <img title=\"Магазины продают\" src=\"" + kango.io.getResourceUrl("res/sell.gif") + "\">" +
			"     <img id=\"m_sell_island\" src=\"\">  " +
			"     <img id=\"m_sell_item\" class=\"m_res\" src=\"\">" +
			"        <span id=\"m_sell_text\"></span><br> " +
			"     <img title=\"Магазины покупают\" src=\"" + kango.io.getResourceUrl("res/buy.gif") + "\">" +
			"     <img id=\"m_buy_island\" src=\"\">    " +
			"     <img id=\"m_buy_item\" class=\"m_res\" src=\"\">" +
			"        <span id=\"m_buy_text\"></span><br>" +
			"    <div id=\"m_cb_content\"> " +
			"        <img title=\"Контрабандист\" src=\"" + kango.io.getResourceUrl("res/Pirate.png") + "\"><img title=\"Торговый Остров\" src=\"" + icon_trade_island + "\">    " +
			"        <span id=\"m_pirat_text\"></span>" +
			"        <img  id=\"m_pirat_item\" class=\"m_res\" src=\"\">" +
			"      	</td>" +
      		"		<td id=\"m_timers_info\" width=\"65\">" +
          	"			 <img src=\""+icon_turqouise+"\"><span title=\"До обновления месторождений\" id=\"timer_island\"></span><br>" +
           	"			 <img src=\""+icon_trade_island+"\"><span title=\"До обновления магазинов\" id=\"timer_trade\"> </span><br>  " +  
            " 			 <img src=\""+kango.io.getResourceUrl("res/Pirate.png")+"\"><span title=\"До обновления контрабандиста\" id=\"timer_pirat\"></span><br>  " +
			"       	</td>" +
      		"		</tr>   " +
    		"		<img id=\"mur_arrow\" src=\"\">  " +         
  			"		</table> " +
			"    </div>" +
			"</div>";

		if (kango.browser.getName() != "firefox") {
			MurTimerCss = "-webkit-linear-gradient(top, #fff,#bbb)";
		} else {
			MurTimerCss = "-moz-linear-gradient(center top , #fff, #bbb) repeat scroll 0 0 rgba(0, 0, 0, 0)";
		}

		var htmlcss = {
			"background": MurTimerCss,
			"border-radius": "6px",
			"box-shadow": "0 3px 6px rgba(0, 0, 0, 0.45)",
			"color": "#1e1e1e",
			"float": "left",
			"font": "12px/16px Verdana,Arial,Geneva,Helvetica,sans-serif",
			"height": "auto",
			"padding": "4px",
			"position": "absolute",
			"left": "3px",
			"top": "-84px",
			"z-index": "2"
		};


		$("#div_chat_msg").parent().append($(html).css(htmlcss).hide());

		$(".m_res").css("width", "10%");

		$("#mur_closeinf").css({
			position: "absolute",
			top: "3px",
			right: "3px",
			cursor: "pointer",
			opacity: 0
		});
		$("#mur_update").css({
			position: "absolute",
			cursor: "pointer",
			bottom: "1px",
			right: "1px",
			width:"14px",
			opacity: 0.5
		});
		$("#m_timers_info span").css({
			"font-weight": "bold",
			"color": "royalblue"
		});
		$("#mur_arrow").css({
			position: "absolute",
			cursor: "pointer",
			top: "33px",
			right: "-2px",
			opacity: 0.5
		});
		$("#mur_closeinf").hover(function() {
			$(this).css("opacity", 0.5)
		}, function() {
			$(this).css("opacity", 0)
		});
		$("#mur_update").hover(function() {
			$(this).css("opacity", 1)
		}, function() {
			$(this).css("opacity", 0.5)
		});
		$("#mur_arrow").hover(function() {
			$(this).css("opacity", 1)
		}, function() {
			$(this).css("opacity", 0.5)
		});
		$("#mur_closeinf").on("click", function() {
			self.Status = false;
			$(".ext_trade_info").hide();
			clearInterval(self.timer_id);
			localStorage['turquoiseInfoStatus'] = self.Status;
		});
		$("#mur_update").on("click", function() {
			self.ShowInfo();
		});
		$("#mur_arrow").on("click", function() {
			$("#m_timers_info").toggle();
			if (self.timers) {
				$("#mur_arrow").attr("src", kango.io.getResourceUrl("res/arrow_right.gif"));
				$("#mur_arrow").attr("title", "Показать таймеры");
				self.timers=false;
			} else {
				$("#mur_arrow").attr("src", kango.io.getResourceUrl("res/arrow_left.gif"));
				$("#mur_arrow").attr("title", "Скрыть таймеры");
				self.timers=true;
			}
			localStorage['turquoise_timers'] = self.timers;
		});

	}

	this.getinfo_shop = function() {
		function get_island_pic(id) {
			switch (id) {
				case "25":
					return icon_turqouise;
				case "26":
					return icon_up_island;
				case "27":
					return icon_trade_island;
			}
		}

		function get_island_title(id) {
			switch (id) {
				case "25":
					return "Бирюзовый Остров";
				case "26":
					return "Верхний Остров";
				case "27":
					return "Торговый Остров";
			}
		}

		function m_jsonResponse(jsondata) {
			for (var key in jsondata.response.data.shopItems) {
				for (var key1 in jsondata.response.data.shopItems[key]) {
					if (jsondata.response.data.shopItems[key][key1].buy == 0) {
						$("#m_buy_island").attr("src", get_island_pic(key));
						$("#m_buy_island").attr("title", get_island_title(key));
						$("#m_buy_item").attr("src", "http://img.ereality.ru/w/" + jsondata.response.items[key1][6]);
						$("#m_buy_item").attr("title", jsondata.response.items[key1][5]);
						percent = (+jsondata.response.data.shopItems[key][key1].sale) / (+jsondata.response.items[key1][17]) * 100;
						$("#m_buy_text").text(" по " + jsondata.response.data.shopItems[key][key1].sale + " (" + ~~percent + "%)")

					} else {
						$("#m_sell_island").attr("src", get_island_pic(key));
						$("#m_sell_island").attr("title", get_island_title(key));
						$("#m_sell_item").attr("src", "http://img.ereality.ru/w/" + jsondata.response.items[key1][6]);
						$("#m_sell_item").attr("title", jsondata.response.items[key1][5]);
						percent = (+jsondata.response.data.shopItems[key][key1].buy) / (+jsondata.response.items[key1][17]) * 100;
						$("#m_sell_text").text("" + jsondata.response.data.shopItems[key][key1].count + " ед. по " + jsondata.response.data.shopItems[key][key1].buy + " (" + ~~percent + "%)");
					};

				}
			}
		}

		$.ajax({
			type: "POST",
			url: "/ajax/json.php",
			data: JSON.stringify({
				"controller": "colonialShop",
				"action": "init",
				"params": {},
				"client": 1,
			}),
			success: m_jsonResponse,
			dataType: "json"
		});
	}

	this.getinfo_pirat = function() {

		function get_res_pic(id) {
			switch (id) {
				case "1459":
					return "res/sugar.png";
				case "1460":
					return "res/cotton.png";
				case "1461":
					return "res/cacao.png";
				case "1462":
					return "res/sails.png";
				case "1463":
					return "res/tobac.png";	
			}
		}

		function get_res_title(id) {
			switch (id) {
				case "1459":
					return "Сахар";
				case "1460":
					return "Хлопок";
				case "1461":
					return "Какао";
				case "1462":
					return "Парусина";
				case "1463":
					return "Табак";	
			}
		}

		var details = {
			url: 'http://api.ereality.ru/contrabandist.txt',
			method: 'GET',
			contentType: 'json'
		};
		kango.xhr.send(details, function(data) {
			if (data.response != null) {
				$("#m_pirat_item").attr("src", "http://img.ereality.ru/w/" + get_res_pic(data.response.w_id));
				$("#m_pirat_item").attr("title", get_res_title(data.response.w_id));
				$("#m_pirat_text").text(" куплю " + ((+data.response.count_max) - (+data.response.count_sold)) + " ед.");
			} else {
				$("#m_pirat_item").attr("src", "http://img.ereality.ru/smile/p/825.gif");
				$("#m_pirat_text").text(" непашет API");
			}
		});
	}

	function format(ttime) {
		if (+ttime < 10) return "0" + ttime;
		return ttime;
	}

	getMyTime = function(time) {
		function format(ttime) {
			if (+ttime < 10) return "0" + ttime;
			return ttime;
		}
		var ntime = new Date();
		hour = parseInt((time - ntime) / 3600000);
		minutes = parseInt(((time - ntime) - hour * 3600000) / 60000);
		return hour + ":" + format(minutes);
	}

	get_time_trade = function() {
		var minutes = (new Date()).getMinutes();
		if (minutes > 0) return ("0:" + format(60 - minutes))
		else {
			self.getinfo_shop();
			return ("1:00")
		}
	}
	get_time_contr = function() {
		var minutes = (new Date()).getMinutes();
		if (minutes > 0) return ("" + (2 - (new Date()).getHours() % 3) + ":" + format(60 - minutes))
		else {
			self.getinfo_pirat();
			return ("3:00")
		}
	}
	
	this.refresh_timers = function() {
		if (self.timer_island < new Date()) {
			if (new Date().setTime(Date.parse(localStorage["island_time"])) > new Date()) {
				self.timer_island.setTime(Date.parse(localStorage["island_time"]));
				$("#timer_island").text(getMyTime(self.timer_island));
			} else {
				var details = {
					url: 'http://api.ereality.ru/geologist_map_update.txt',
					method: 'GET',
					contentType: 'json'
				};
				kango.xhr.send(details, function(data) {
					if (data.response != null) {
						timer = data.response.generation["25"];
					} else timer = 0;
					if (timer != 0) {
						self.timer_island = new Date(timer * 1000);
						localStorage["island_time"] = self.timer_island;
						$("#timer_island").text(getMyTime(self.timer_island));
					} else $("#timer_island").text("0:00");
				});

			}
		} else {
			$("#timer_island").text(getMyTime(self.timer_island));
		}
		$("#timer_trade").text(get_time_trade());
		$("#timer_pirat").text(get_time_contr());

	}	

}