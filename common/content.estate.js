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

/*
kango.invokeAsync('kango.storage.getItem', "options", function(value) {
	myoptions = mergeOptions(value, defaultConfig.myoptions);

	if (!myoptions.unpaused) {
		return;
	}
	//=====================================================================  

	var scr = document.createElement("script");
	scr.text = "";

	
	var veto_administracii = true; // В надежде что когда то администрация разрешит сворачивать диалоги поместья

	if (veto_administracii) {


		scr.text = scr.text + "(" +
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
					document.getElementById("estateNameButton").parentNode.innerHTML = '' + document.getElementById("estateNameButton").parentNode.innerHTML + '<a id="mydialoglink" href="javascript: Estates.UnhideDialog();">[+]<a>';
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

				if (mdialog.type == "fightattackclose") {
					var nn = mdialog.text.indexOf('</b><br /><br />Базовый шанс:');
					var mname = mdialog.text.substring(39, nn);
					mlink = "<a href='http://www.ereality.ru/~" + mname + "' target='_blank'><b>" + mname + "</b></a>"
					mdialog.text = mdialog.text.split("<b>" + mname + "</b>").join(mlink);					
				}
				mdialog.title += '<a href="javascript: Estates.hideDialog();">[X]<a>';
				if ((mdialog.type == "selection") && ($("#estateSelectionCard1")[0].previousElementSibling.innerHTML.search("[X]") < 0)) {
					$("#estateSelectionCard1")[0].previousElementSibling.innerHTML += '<a href="javascript: Estates.hideDialog();">[X]<a>';
				}

				return mdialog;
			}

		}).toString() + ")();";
	}
	

	document.body.appendChild(scr);
	//=========================end.
});
*/

function controller(extOptions) {	
	var scr = document.createElement("script");
	var imagesOptions = {
		estateVictimListSmall: estateUiBuilderCss.listImgSmall
	}

	var scriptString = "(" + (function() {
		var erExtOptions = optionsReplace;
		var erExtImages = imagesReplace;
		
		var parseDialogOld = Estates.parseDialog;
		var victimListImg = $('<img src="' + erExtImages.estateVictimListSmall + '" class="estateTooltip" title="Список жертв">').css({'vertical-align': 'middle', 'display': 'inline'});
		
		Estates.parseDialog = function() { 
			var mdialog = parseDialogOld(arguments[0]); 			
			
			if (erExtOptions.options.estateVictims) {
				if (mdialog.type == "fightfind" || mdialog.type == "fightattackclose") {
					mdialog.title += victimListImg[0];
				}
			}
			
			return mdialog;
		}
		
		var oldShowAttackHistory = Estates.showAttackHistory;
		var estateHistoryHolder = $('#estateHistoryData');
		Estates.showAttackHistory = function() {
			oldShowAttackHistory.apply(Estates);
			
			estateHistoryHolder.find('b').each(function() {
				var element = $(this);
				var userName = element.text();
				element.html("<a href='http://www.ereality.ru/~" + userName + "' target='_blank'><b>" + userName + "</b></a>");
			});
		}
			
	}).toString()
		.replace("optionsReplace", '(' + JSON.stringify(extOptions) + ')')
		.replace("imagesReplace", '(' + JSON.stringify(imagesOptions) + ')') + ")();";

	inject_global(scriptString);
	
	// init estateVictims
	if (extOptions.options.estateVictims) {
		var estateVictims = new estateVictimsClass();
		estateVictims.init(mergeOptions(extOptions.estateVictims, defaultConfig.estateVictims));		
	
		var estateVictimsListViewer = new estateVictimsListViewerClass(estateVictims, popup, estateVictimsListViewerCss);
		estateVictimsListViewer.init();
	
		var estateUiBuilder = new estateUiBuilderClass(estateVictimsListViewer, estateUiBuilderCss, 'erExtEsteteVictimList', 'refreshEstate');
		estateUiBuilder.init();
	}
}

var loadOptions = [
	{systemName: 'options', defaultName: "myoptions"},
	{systemName: 'estateVictims', defaultName: "estateVictims"},
];

$(document).ready(function() {
	tools.loadOptions(loadOptions, controller);
});