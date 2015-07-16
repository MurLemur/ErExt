function draw_stats(el) {
	if (el.value>0) $("span[id*=_"+el.id+"]").show();
	else $("span[id*=_"+el.id+"]").hide();
	$("#s_"+el.id).text("+"+(+el.value));
	$("#c_"+el.id).text("+"+(+el.value));
}
function draw_mods(el) {
	if (el.value>0) $("span[id*=_"+el.id+"]").show();
	else $("span[id*=_"+el.id+"]").hide();
	$("#s_"+el.id).text("+"+el.value*15+"%");
	$("#c_"+el.id).text("+"+el.value*15+"%");
}
function onchange() {
if (this.value>100) this.value=100;   
switch (this.id) {
  case "sila": 		draw_stats(this); break
  case "lovka":	 	draw_stats(this); break
  case "inta":  	draw_stats(this); break
  case "mudra": 	draw_stats(this); break
  case "intell":   	draw_stats(this); break
  case "zdorovka": 	draw_stats(this); break
  case "tochka": 	draw_mods(this);  break
  case "uvert": 	draw_mods(this);  break
  case "sokra": 	draw_mods(this);  break
  case "stoika": 	draw_mods(this);  break
}   
 var vsego = 0;
 var dostupno = 1000;
 var c_lvl = 0;
$("input","#main").each(function(index,val) {vsego+=+val.value} )
switch (true) {
  case vsego==1000: c_lvl=10;break
  case vsego>=750:  c_lvl=9; break
  case vsego>=700:  c_lvl=8; break
  case vsego>=500:  c_lvl=7; break
  case vsego>=350:  c_lvl=6; break
  case vsego>=250:  c_lvl=5; break
  case vsego>=150:  c_lvl=4; break
  case vsego>=100:  c_lvl=3; break
  case vsego>=50:   c_lvl=2; break
  case vsego>=25:   c_lvl=1; break
} 
lvl = +$("#lvl").val(); 
switch (true) {
  case lvl>19:  dostupno=1000; break
  case lvl==19:  dostupno=750;  break
  case lvl==18:  dostupno=550;  break
  case lvl==17:  dostupno=400;  break
  case lvl==16:  dostupno=275;  break
  case lvl==15:  dostupno=150;  break
  case lvl==14:  dostupno=100;  break
  case lvl==13:  dostupno=80;   break
  case lvl==12:  dostupno=65;   break
  case lvl==11:  dostupno=50;   break
  case lvl==10:  dostupno=40;   break
  case lvl==9:   dostupno=35;   break
  case lvl==8:   dostupno=25;   break
  case lvl==7:   dostupno=20;   break
  case lvl==6:   dostupno=10;   break
  case lvl==5:   dostupno=5;    break
} 

if (c_lvl>0) {
	$("#p_umelka").show();
	$("#s_umelka").show();
	}
else {
	$("#p_umelka").hide();
	$("#s_umelka").hide();
}	
$("#s_umelka").text("+"+parseInt(c_lvl)*5+"%");
$("#c_umelka").text("+"+parseInt(c_lvl)*5+"%");      
$("#s_vsego").text(""+vsego+"/"+dostupno);  
$("#cl_lvl").text(c_lvl); 
if (vsego>dostupno) $("#s_vsego").css("color","red");
else $("#s_vsego").css("color","black");    

var summa = 0;
$("input","#main").each(function(index,val) {summa+=(600+300*(+val.value-1))/2*(+val.value)} )
$("#summa").text(summa); 
lvl_pic = (c_lvl>8) ? "10": "0"+(c_lvl+1);
if ($("#clo_img").attr("src")!="http://img.ereality.ru/w/cloak/"+lvl_pic+".png")    
$("#clo_img").attr("src","http://img.ereality.ru/w/cloak/"+lvl_pic+".png");	
}
$(document).ready(function() {
	 $("span[id^=p_]").hide();
	$("input","#main").val("");
	$("input").on("change",onchange);
	$("a").on("click",function() {this.previousSibling.value='';$("#"+this.previousSibling.id).trigger("change")});
	onchange();
})

