var myoptions = {
	"faceshop":true,
	"efimerka":true,
	"unpaused":true,
	"info":true,
	"zk":true,
	"naemniki":true,
	"glamurstupki":true,
	"bodestate":true,
	"sidzoku":true,
	"okcount":true,
	"cemetry":true,
	"numfight":true,
	"numcapcha":true,
	"kbdinst":true,
	"chatsectors":true,
	"dragon_time":true,
	"location_info":true,
	"block_cmenu":true,
	"tab_refresh":true,
	"esc_move":true,
	"fastex":true,
	"kbdunderground":true,
	"lotereya":true,
	"estatenamelink":true,
	"forumgoto":true,
	"aliensmy":true,
	"clnick":true,
	"keyenter":true,
	"questsectors":true,
	"userlistactiveitems": true
}

var soundoptions = {
	"sound_elitka":"nosound",
	"sound_event":"nosound",
	"sound_kt":"nosound",
	"sound_fishing":"nosound"
}

function getprop(){
	kango.invokeAsync('kango.storage.getItem',"options",function(value) {
		if (value==null) {
			for (nameprop in myoptions) $('#'+nameprop).prop("checked",myoptions[nameprop]);
		}
		else {
			for (nameprop in myoptions) {
			 	if (value[nameprop]!=false) {value[nameprop]=true;}	
				myoptions[nameprop]=value[nameprop];
				$('#'+nameprop).prop("checked",myoptions[nameprop]);	
	    	}
		}
	});
	kango.invokeAsync('kango.storage.getItem',"soptions",function(value) {
		if (value==null) {
			for (nameprop in soundoptions) $('#'+nameprop).prop("value",soundoptions[nameprop]);
		}
		else {
			for (nameprop in soundoptions) {
				soundoptions[nameprop]=value[nameprop];
				$('#'+nameprop).prop("value",soundoptions[nameprop]);	
	    	}
		}
	});
}

function setprop(){kango.invokeAsync('kango.storage.setItem',"options",myoptions);}
function setprop1(){kango.invokeAsync('kango.storage.setItem',"soptions",soundoptions);}

KangoAPI.onReady(function() {
	var htmlopt= '<option value="nosound">Отключено</option>'+
      '<option value="sound1">Звук  1</option>'+
      '<option value="sound2">Звук  2</option>'+
      '<option value="sound3">Звук  3</option>'+
      '<option value="sound4">Звук  4</option>'+
      '<option value="sound5">Звук  5</option>'+
      '<option value="alarm">Звук  6</option>'+
      '<option value="chat">Звук 7</option>'+
      '<option value="fight">Звук  8</option>'+
      '<option value="fish">Звук  9</option>'+
      '<option value="mine">Звук 10</option>'+
      '<option value="msg">Звук 11</option>'+
      '<option value="trade">Звук 12</option>'+
      '<option value="wood">Звук 13</option>'+
      '<option value="work">Звук 14</option>';
	getprop();
	for (nprop in myoptions){
	$('#'+nprop).click(function (event) {myoptions[this.id]=$('#'+this.id).prop("checked");setprop();});	
	}
	for (mprop in soundoptions){
	$('#'+mprop).html(htmlopt);	
	$('#'+mprop).change(function (event) {soundoptions[this.id]=$('#'+this.id).prop("value");setprop1();});	
	}

});

