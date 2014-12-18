// ==UserScript==
// @name     ErExt_clan
// @include http://www.ereality.ru/clan.php
// @require tools/jquery.js
// @require tools.js
// @all-frames  true
// ==/UserScript==

function controller(extOptions) {
	if (!extOptions.options.unpaused) {
		return;
	}


	if (extOptions.options.clan_ct_buttons) {
		var kt_players = [];
		$.each($("a:contains(»)"), function(key, val) {
			if ($(val).parent().parent().next().next().html() == "")
				kt_players.push(val);
		})

		for (i = 0; i < Math.round(kt_players.length / 10); i++) {
			$("td:contains(Местоположение)").parent().next().children().append($("<button id='kt'" + i + " style=\"width:35px;cursor:pointer\" >" + i + "</button>"))
		}

		$("#kt*").on("click", function() {
			$("#chat_msg",top.document).val(" :102:  КТ !!!");
			var num = +$(this).text();
			for (k = num * 10; k < Math.min(num * 10 + 10, kt_players.length); k++) {
				kt_players[k].click();
			}
			$("#img_ch_f1",top.document).click();

		})
	}
}

var loadOptions = [{
	systemName: 'options',
	defaultName: "myoptions"
}];

$(document).ready(function() {
	tools.loadOptions(loadOptions, controller);
});