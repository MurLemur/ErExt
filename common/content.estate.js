// ==UserScript==
// @name     ErExt_Estate
// @include  http://www.ereality.ru/estates.php
// @require     tools.js
// @all-frames  true
// ==/UserScript==

//================================================================Begin

kango.invokeAsync('kango.storage.getItem', "options", function(value) {
		myoptions = mergeOptions(value, myoptions);

		if (!myoptions.unpaused) {
			return;
		}
//=====================================================================  

		var scr = document.createElement("script");
		scr.text = "(" +
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
				//if (mdialog.type=="fightfind") {
				mdialog.title = mdialog.title + '<a href="javascript: Estates.hideDialog();">[X]<a>';
				if ((mdialog.type == "selection") && ($("#estateSelectionCard1")[0].previousElementSibling.innerHTML.search("[X]") < 0)) {
					$("#estateSelectionCard1")[0].previousElementSibling.innerHTML += '<a href="javascript: Estates.hideDialog();">[X]<a>';
				}
				//}
				return mdialog;
			}

		}).toString() + ")();";

		scr.text = scr.text + "(" +
			(function() {

			var zzz = Estates.showAttackHistory;

			Estates.showAttackHistory = function() {
				zzz.apply(Estates);
				res = document.getElementById("estateHistoryData").getElementsByTagName("b");
				for (i = 0; i < res.length; ++i) {
					var mname = res[i].innerHTML;
					mlink = "<a href='http://www.ereality.ru/~" + mname + "' target='_blank'><b>" + mname + "</b></a>"
					res[i].parentNode.innerHTML = res[i].parentNode.innerHTML.split("<b>" + mname + "</b>").join(mlink);
				}
				return;
			}
			
		}).toString() + ")();";

		document.body.appendChild(scr);


	//=========================end.
	}
});