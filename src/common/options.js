var myoptions = {
	"faceshop":true,
	"efimerka":true,
	"info":true,
	"zk":true,
	"naemniki":true,
	"bodestate":true,
	"sidzoku":true,
	"okcount":true,
	"cemetry":true,
	"numfight":true,
	"numcapcha":true,
	"kbdinst":true,
	"chatsectors":true,
	"clan_info":true,
	"dragon_time":true,
	"location_info":true,
	"block_cmenu":true,
	"lotereya":true
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
}

function setprop(){kango.invokeAsync('kango.storage.setItem',"options",myoptions);}

KangoAPI.onReady(function() {
	getprop();
	for (nprop in myoptions){
		$('#'+nprop).click(function (event) {myoptions[this.id]=$('#'+this.id).prop("checked");setprop();});
	}
});