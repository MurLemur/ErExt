var script_golosovalka = "(" +
	(function() {
		core.mur_setmirka = function(id) {
			var imgsrc = "golosovalka_pic";
			$("img",$("#mur_mirka"+localStorage['golosovalka_id'])).remove();
			$("img",$("#m_mur_golosovalka")).remove();
			$("#mur_mirka"+id).append($("<img src=\"golosovalka_pic\">"));
			$("#mur_mirka"+id,$("#m_mur_golosovalka")).append($("<img src=\"golosovalka_pic\">"));
			localStorage['golosovalka_id'] = id;
		}
		
		var htmlmenu = "" +
		"<div id=\"m_mur_golosovalka\" class=\"contextMenu\" style=\"visibility: hidden;position:absolute;\">" +
		"  <ul class=\"textM\">" +
		"    <li id=\"mur_mirka11\"><a href=\"javascript: core.mur_setmirka(11);\">Лесоруб</a></li>" +
		"    <li id=\"mur_mirka8\"> <a href=\"javascript: core.mur_setmirka(8);\">Шахтер</a></li>" +
		"    <li id=\"mur_mirka6\"> <a href=\"javascript: core.mur_setmirka(6);\">Землекоп</a></li>" +
		"    <li id=\"mur_mirka3\"> <a href=\"javascript: core.mur_setmirka(3);\">Ремесленник</a></li>" +
		"    <li id=\"mur_mirka4\"> <a href=\"javascript: core.mur_setmirka(4);\">Рыбак</a></li>" +
		"    <li id=\"mur_mirka9\"> <a href=\"javascript: core.mur_setmirka(9);\">Траппер</a></li>" +
		"    <li id=\"mur_mirka12\"><a href=\"javascript: core.mur_setmirka(12);\">Плотник</a></li>" +
		"    <li id=\"mur_mirka14\"><a href=\"javascript: core.mur_setmirka(14);\">Оружейник</a></li>" +
		"    <li id=\"mur_mirka7\"> <a href=\"javascript: core.mur_setmirka(7);\">Строитель</a></li>" +
		"  </ul>" +
		"</div>";
	$(document.body.lastChild).after($(htmlmenu));
	$("#m_golosovalka").contextMenu("m_mur_golosovalka",{});
	$("#m_golosovalka").on("click",function() {
		$.get("https://www.ereality.ru/holiday.php?click="+localStorage['golosovalka_id'], function(response) {
					if ($("b", response)[0].innerHTML == "Спасибо за голосование!") 
						top.core.alertMsg($("b", response)[0].innerHTML);
					else
						top.core.alertError($("b", response)[0].innerHTML);
		});
		var now_dt =  new Date( new Date().getTime() +(3 +((new Date()).getTimezoneOffset()/60)) * 3600 * 1000); // GMT +3
		core.mur_golosovalka_date = now_dt.getDate();
		localStorage['golosovalka_date']=core.mur_golosovalka_date;
		$("#m_golosovalka").hide();

	});
	if (localStorage['golosovalka_id']==undefined) {
		core.mur_setmirka(4); 
		$("img:first",$("#m_mur_golosovalka")).remove();
	} else $("#mur_mirka"+localStorage['golosovalka_id'],$("#m_mur_golosovalka")).append($("<img src=\"golosovalka_pic\">"));
	core.mur_golosovalka_date = localStorage['golosovalka_date'];
	var now_dt =  new Date( new Date().getTime() +(3 +((new Date()).getTimezoneOffset()/60)) * 3600 * 1000); // GMT +3
	if (now_dt.getDate()!=core.mur_golosovalka_date) $("#m_golosovalka").show();


	}).toString() + ")();"