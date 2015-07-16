// ==UserScript==
// @name     ErExt_forum
// @include http://forum.ereality.ru*page*.html
// @require tools/jquery.js
// @require tools.js
// @all-frames  true
// ==/UserScript==

function controller(extOptions) {
	if (!extOptions.options.unpaused) {
		return;
	}
	
	function isIgnored(ignoreNicks, nick) {
		for (i in ignoreNicks) {
			if (nick.toUpperCase() === ignoreNicks[i].toUpperCase()) {
				return true;
			}
		}
		
		return false;
	}
	
	var ignoreNicks = [
		"Снежная Королева"
	]
	
	var tablePost = $('.TablePost');
	tablePost.find('.tdPostAuthor').each(function() {
		var td = $(this);
		var nickNameLink = td.find('a[class=txt]');
		
		if (isIgnored(ignoreNicks, nickNameLink.text())) {
			var nickNameHolder = nickNameLink.parent();
			var checkBox = nickNameHolder.find('input[type=checkbox]');
			
			nickNameHolder.html('').append(checkBox).append($('<a class="txt" href="javascript:addtxt(\'[b]Гусид[/b], \')"><b>Гусид</b></a>'));

			var tdParent = td.parent();
			
			tdParent.find('.AdditInfo').remove();
			tdParent.find('#Avatar').css({"background": "url(" + kango.io.getResourceUrl('res/gusid.png') + ") no-repeat", "background-position": "0px 0;"});
			tdParent.next().find(".PostText").text('Я злой гусид');
			
			tdParent.next().next().find(".tdPostFooter").find("td:eq(0)").html("");
		}
	});

	tablePost.find('.QuoteAuthor').each(function() {
		var quoteAuthor = $(this);
		if (isIgnored(ignoreNicks, quoteAuthor.find('strong').text())) {
			quoteAuthor.html("Цитируя <strong>Гусид</strong>:");
			
			quoteAuthor.next().text('Я злой гусид');
		}
	});
	tablePost.find('.PostText').each(function() {
        var nameHolder = $(this).find('div:eq(0)').find('b');
		
		if (isIgnored(ignoreNicks, nameHolder.text())) {
			nameHolder.text('Гусид');
		}
	});
	
	if (extOptions.options.forum_pages) {
		var fp = +location.href.match(/page(\d{1,}).html/)[1];

		function mur_nextpage() {
			if (fp < +$("a[href*=page]:last",$("#Content").children().first()).text()) location.href = location.href.replace(/page(\d{1,}).html/, "page" + (fp + 1) + ".html")
		}
		function mur_prevpage() {
			if (fp > 1) location.href = location.href.replace(/page(\d{1,}).html/, "page" + (fp - 1) + ".html")
		}
		if ($(".SelectPage").length > 1) {
			$(".SelectPage").parent().append($("<span> • </span>")).append($("<img src=\""+ kango.io.getResourceUrl('res/next_page.png') +"\" style=\"cursor:pointer\">").on("click", mur_nextpage));
			$(".SelectPage").parent().children().first().after($("<span> • </span>")).after($("<img src=\""+ kango.io.getResourceUrl('res/prev_page.png') +"\" style=\"cursor:pointer\">").on("click", mur_prevpage));
			$(".SelectPage").last().parent().children().first().after($("<span> • </span>")).after($("<img src=\""+ kango.io.getResourceUrl('res/prev_page.png') +"\" style=\"cursor:pointer\">").on("click", mur_prevpage));
		}
	}

}

var loadOptions = [{
	systemName: 'options',
	defaultName: "myoptions"
}];

$(document).ready(function() {
	tools.loadOptions(loadOptions, controller);
});