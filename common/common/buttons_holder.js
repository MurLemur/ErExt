 function button_holder_init() {
 	var lmrButt = document.createElement('p');
 	lmrButt.id = 'lmrButt';
 	lmrButt.setAttribute("style", 'position: absolute; right: 0; padding: 0; margin: 0;');
 	lmrButt.innerHTML = '<div class="wrap" style="position: absolute; right: 3px; bottom: 40px; padding: 5px 5px 1px 5px; background-color: #d7d7d7; border: 1px solid #BBB; z-index: 999;"><span id="mur_holder"></span></div';
 	$("#div_users a#span_sort").parent().prepend(lmrButt);
 }