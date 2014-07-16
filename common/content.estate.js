// ==UserScript==
// @name     ErExt_Estate
// @include  http://www.ereality.ru/estates.php
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

	script = "";

	var veto_administracii = false; // В надежде что когда то администрация разрешит сворачивать диалоги поместья

	if (veto_administracii != true) {


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
				if (mdialog.type == "fightattackclose") {
					var nn = mdialog.text.indexOf('</b><br /><br />Базовый шанс:');
					var mname = mdialog.text.substring(39, nn);
					mlink = "<a href='http://www.ereality.ru/~" + mname + "' target='_blank'><b>" + mname + "</b></a>"
					mdialog.text = mdialog.text.split("<b>" + mname + "</b>").join(mlink);
				}
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
				$(val).append($("<a href='http://www.ereality.ru/~" + val.innerHTML + "' target='_blank'><img class=\"inf\"  src=\"http://img.ereality.ru/inf.gif\"></a>"));
			})
			return;
		}

	}).toString() + ")();";
	
	//Обновка инфы для таймера поместья
	if (myoptions.timer_estate) {
		script= script+ "(" +
	(function(){
	var OldprocessResponse=Estates.processResponse;
	Estates.processResponse=function(xml){
		var myrezult=OldprocessResponse.apply(Estates,arguments);
		top.core.mur_timer.estate_getinfo();
	    return myrezult
	}
	
	}).toString()
	+ ")();"; 
}

	inject_global(script);


	//=========================end.

});