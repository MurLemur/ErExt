// ==UserScript==
// @name        trade-buy
// @include     http://www.ereality.ru/map*n=alltypes
// @require     tools.js
// @all-frames  true
// ==/UserScript==

kango.invokeAsync('kango.storage.getItem', "options", function(value) {
	myoptions = mergeOptions(value, defaultConfig.myoptions);
	
	if (!myoptions.unpaused) {
		return;
	}

	// Ссылка на ресурсы в госе
	if (myoptions.resources_prices) {
		$("#span_lotmassa").parent().parent().append($("<br><a target=\"_blank\" href=\"http://www.ereality.ru/goto/er-help.ru/s/14.php\">Ресурсы в госе</a>"));
	}
	if (myoptions.trade_buy_full_lot) {
		var tradeString = (function() { 
			var buttons = $("table[id^=\"tbl\"] .item_buttons button[onclick*=\"BuyLot\"]", top.frames.main.document);

			$.each(buttons, function() {
				var holder = $(this).parent();
				var countSpan = holder.find("span[id^=\"span_count\"]");
				var lotID = countSpan.attr("id").replace("span_count", "");
				var itemsInLot = countSpan.text();
		
				var buyButton = $("<button type=\"button\" style=\"width:100px;margin-bottom: 2px;\">Купить целиком</button>").on("click", function() { 
					top.frames.main._BuyLot({LotID: lotID, Count: itemsInLot});
				});
				
				holder.append(buyButton);
			});
		}).toString();
	
		script = "(" + tradeString + ")();";
		inject_global(script);

	}
});
