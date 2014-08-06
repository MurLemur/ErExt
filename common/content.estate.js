// ==UserScript==
// @name     ErExt_Estate
// @include  http://www.ereality.ru/estates.php
// @require tools/jquery.js
// @require tools.js
// @require css/popup-css.js
// @require tools/popup.js
//
// @require estate/victims/estate-victims.js
// @require estate/victims/estate-victims-list-viewer.js
// @require estate/victims/estate-ui-builder.js
// @require css/estate/estate-victims-list-viewer-css.js
// @require css/estate/estate-ui-builder-css.js
//
// @all-frames  true
// ==/UserScript==

//================================================================Begin

kango.invokeAsync('kango.storage.getItem', "options", function(value) {
	myoptions = mergeOptions(value, defaultConfig.myoptions);

	if (!myoptions.unpaused) {
		return;
	}
	//=====================================================================

	script = "";

	var veto_administracii = false; // В надежде что когда то администрация разрешит сворачивать диалоги поместья

	if (!veto_administracii) {


		script = script + "(" +
			(function() {

			var zzz = Estates.parseDialog;

			Estates.hideDialog = function() {
				if (Estates.dialog.type == "selection") {
					$("#estateDialogSelection").hide();
					$("#estateDialogBackgroundLight").hide();
				} else {
					$("#estateDialog").hide();
				}
				$("#estateDialogBackground").hide();
				if ($("#mydialoglink").length) {
					$("#mydialoglink").show();
				} else {
					$("#estateNameButton").parent().append($("<a id=\"mydialoglink\" href=\"javascript: Estates.UnhideDialog();\">[+]</a>"));
				}
			};

			Estates.UnhideDialog = function() {
				if (Estates.dialog.type == "selection") {
					$("#estateDialogBackgroundLight").show();
					$("#estateDialogSelection").show();
				} else {
					$("#estateDialogBackground").show();
					$("#estateDialog").show();
				}

				$("#mydialoglink").hide();
			};

			Estates.parseDialog = function() {
				var mdialog = zzz(arguments[0]);
		
				mdialog.title = mdialog.title + '<a href="javascript: Estates.hideDialog();">[X]<a>';
				if ((mdialog.type == "selection") && ($("#estateSelectionCard1")[0].previousElementSibling.innerHTML.search("[X]") < 0)) {
					$("#estateSelectionCard1").prev().append($("<a href=\"javascript: Estates.hideDialog();\">[X]</a>"));
				}
				return mdialog;
			}

		}).toString() + ")();";
	}

	script = script + "(" +
		(function() {

		var zzz = Estates.showAttackHistory;

		Estates.showAttackHistory = function() {
			zzz.apply(Estates);
			$.each($("#estateHistoryData b"), function(num, val) {
				$(val).append($("<a href='http://www.ereality.ru/~" + val.innerHTML + "' target='_blank'><img class=\"inf\" src=\"http://img.ereality.ru/inf.gif\"></a>"));
			})
			return;
		}

	}).toString() + ")();";

	//Обновка инфы для таймера поместья
	if (myoptions.timer_estate) {
		script = script + "(" +
			(function() {
			var OldprocessResponse = Estates.processResponse;
			Estates.processResponse = function(xml) {
				var myrezult = OldprocessResponse.apply(Estates, arguments);
				top.core.mur_timer.estate_getinfo();
				return myrezult
			}

		}).toString() + ")();";
	}

	inject_global(script);


	

});

function controller(extOptions) {	
	var imagesOptions = {
		estateVictimListSmall: estateUiBuilderCss.listImgSmall,
		estateVictimAddToListSmall: estateUiBuilderCss.addToListImgSmall
	}

	var scriptString = "(" + (function() {
		var erExtOptions = optionsReplace;
		var erExtImages = imagesReplace;
		
		var parseDialogOld = Estates.parseDialog;
		var victimListImg = $('<img src="' + erExtImages.estateVictimListSmall + '" class="estateTooltip" title="Список жертв" id="erExtEsteteVictimList">')
			.css({'vertical-align': 'middle', 'display': 'inline'})
			.wrap('<p>');
		
		var addToVictimListImg = $('<img src="' + erExtImages.estateVictimAddToListSmall + '" id="erExtEsteteAddToVictimList"  title="Добавить в список жертв">')
			.css({'vertical-align': 'middle', 'display': 'inline'})
			.wrap('<p>');
			
		Estates.parseDialog = function() { 
			var mdialog = parseDialogOld(arguments[0]); 			
			
			if (erExtOptions.options.estateVictims) {
				if (mdialog.type == "fightfind" || mdialog.type == "fightattackclose") { 
					mdialog.title += victimListImg.parent().html();
					
					if (mdialog.type == "fightattackclose") {	
						mdialog.text = mdialog.text.replace(new RegExp("Ваши генералы предлагают напасть на <b>(.+)</b> (<img.+>)"), "Ваши генералы предлагают напасть на <b id=\"erExtVictimName\">$1</b> " + addToVictimListImg.parent().html() + " $2");
					}
				}
				

				
			}
			
			return mdialog;
		}
		
		/*var oldShowAttackHistory = Estates.showAttackHistory;
		var estateHistoryHolder = $('#estateHistoryData');
		Estates.showAttackHistory = function() {
			oldShowAttackHistory.apply(Estates);
			
			estateHistoryHolder.find('b').each(function() {
				var element = $(this);
				var userName = element.text();
				element.html("<a href='http://www.ereality.ru/~" + userName + "' target='_blank'><b>" + userName + "</b></a>");
			});
		}
		*/
			
	}).toString()
		.replace("optionsReplace", '(' + JSON.stringify(extOptions) + ')')
		.replace("imagesReplace", '(' + JSON.stringify(imagesOptions) + ')') + ")();";

	inject_global(scriptString);
	
	// init estateVictims
	if (extOptions.options.estateVictims) {
		var estateVictims = new estateVictimsClass();
		estateVictims.init(extOptions.estateVictims);		
	
		var estateVictimsListViewer = new estateVictimsListViewerClass(estateVictims, popup, estateVictimsListViewerCss, 'refreshEstate', extOptions.systemOptions);
		estateVictimsListViewer.init();
	
		var estateUiBuilder = new estateUiBuilderClass(estateVictimsListViewer, estateUiBuilderCss, 'erExtEsteteVictimList', 'erExtEsteteAddToVictimList', 'erExtVictimName');
		estateUiBuilder.init();
	}
}

var loadOptions = [
	{systemName: 'options', defaultName: "myoptions"},
	{systemName: 'estateVictims', defaultName: "estateVictims"},
	{systemName: 'systemOptions', defaultName: "systemOptions"}
];

$(document).ready(function() {
	tools.loadOptions(loadOptions, controller);
});