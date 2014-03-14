// ==UserScript==
// @name        ErExt_info
// @include     http://www.ereality.ru/~*
// @include     http://www.ereality.ru/info*
// @require     tools.js
// @all-frames  true
// ==/UserScript==

//================================================================Begin

kango.invokeAsync('kango.storage.getItem',"options",function(value) {
if (value!=null) {
		for (nameprop in myoptions) {
	 	if (value[nameprop]!=false) {value[nameprop]=true;}	
		myoptions[nameprop]=value[nameprop];
    	}
}

//=====================================================================

GM_xmlhttpRequest = function(params) {
  
  var details = {
        method: params.method,
        url: params.url,
        async: true,
        params: params.data,
        headers: params.headers,
        contentType: 'text',
		mimeType: params.overrideMimeType
};
  kango.xhr.send(details, function(data) {
        if (data.status == 200 && data.response != null) {
                var text = data.response;
				params.onload(text);
        }
        else { 
                 kango.console.log('something went wrong');
        }
});
}


function PostMsg() {
sheerpic.removeEventListener("click", PostMsg, false);
GM_xmlhttpRequest({
  method: "POST",
  url: "http://sp.erclans.ru/evgeska_prof.php?calc=heroesinfo",
  data: {'prof':CP1251urlencode(name),'submit':'просмотреть'},
   headers: {
	"Accept":	"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Encoding":	"gzip, deflate",
	"Accept-Language":	"ru-ru,ru;q=0.8,en-us;q=0.5,en;q=0.3",
     "Content-Type": "application/x-www-form-urlencoded;",
	 "Referer": "http://sp.erclans.ru/evgeska_prof.php?calc=heroesinfo"
	  },
   overrideMimeType:    "text/html;charset=windows-1251",
 onload: function(response)
 {  
		var mystr = response.substring(response.indexOf('<table width="95%" border="1" bgcolor="D7D7D7">'),response.lastIndexOf('<br><br><div align="center">'));	
		var mestovstavki = xpath('//*[@id="content"]');
		var oFont = document.createElement("font");
		oFont.size = "-3";
		mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
		oFont.insertAdjacentHTML("afterBegin", mystr.replace(new RegExp("evgeska/images/",'g'),"http://sp.erclans.ru/evgeska/images/"));
		sheerpic.parentNode.removeChild(sheerpic);
 }
  });
return;
}

function PostMsg1() {
gospic.removeEventListener("click", PostMsg1, false);
GM_xmlhttpRequest({
  method: "POST",
  url: "http://gosov.net/ajax/pers_info.ajax.php",
   data: {'sort_item':'','sort_type':'','page':'','pers':CP1251urlencode(name)},
   headers: {
	"Accept":	"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Encoding":	"gzip, deflate",
	"Accept-Language":	"ru-ru,ru;q=0.8,en-us;q=0.5,en;q=0.3",
     "Content-Type": "application/x-www-form-urlencoded;",
	 "Referer": "http://gosov.net/pers_info.html"
	  },
 onload: function(response)
 {  
		 var mystr = response.substring(response.lastIndexOf('<table'),response.lastIndexOf('</span></td>'));	
		 var mestovstavki = xpath('//*[@id="content"]');
		 var oFont = document.createElement("font");
		 oFont.size = "-3";
		 mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
		 oFont.insertAdjacentHTML("afterBegin", mystr.replace(new RegExp("/templates/GoldenClub/images",'g'),"http://gosov.net/templates/GoldenClub/images"));
		 gospic.parentNode.removeChild(gospic);
 }
  });

return;
}


function PostMsgGlamurStupki() {
glamurpic.removeEventListener("click", PostMsgGlamurStupki, false);
GM_xmlhttpRequest({
  method: "GET",
  url: "http://xn--80abg0adccjst1af.xn--p1ai/~"+(name)+'&no-base=true',
   headers: {
	"Accept":	"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Encoding":	"gzip, deflate",
	"Accept-Language":	"ru-ru,ru;q=0.8,en-us;q=0.5,en;q=0.3",
     "Content-Type": "application/x-www-form-urlencoded;",
	 "Referer": "ER-plugin" // ВАЖНО
	  },
   overrideMimeType:    "text/html;charset=utf-8",
 onload: function(response)
 {  
		 var mystr = response.substring(response.indexOf('<div class="d_right">')+21,response.indexOf('<br class="eoi">')-6);	
		  var mestovstavki = xpath('//*[@id="content"]');
		  var oFont = document.createElement("font");
		  oFont.size = "-3";
		  mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
		//  oFont.insertAdjacentHTML("afterBegin", '<center>'+mystr.replace(new RegExp('class="curr_step"','g'),"")+'<center>');
		  oFont.insertAdjacentHTML("afterBegin", '<center>'+mystr+'<center>');
		  glamurpic.parentNode.removeChild(glamurpic);
		
 }
  });

return;
}

function PostMsg4() {
document.getElementsByClassName("DragonBloodImg")[0].removeEventListener("click", PostMsg4, false);
GM_xmlhttpRequest({
  method: "GET",
  url: "http://api.ereality.ru/dragons_schedule.txt",
   headers: {
	"Accept":	"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Encoding":	"gzip, deflate",
	"Accept-Language":	"ru-ru,ru;q=0.8,en-us;q=0.5,en;q=0.3",
     "Content-Type": "application/x-www-form-urlencoded;",
	 "Referer": "http://ereality.ru"
	  },
 onload: function(response)
 {        var mystr = response.replace(new RegExp("time",'g'),"<b>Врата на Остров Драконов на этой неделе открываются :</b>  ");	
		  mystr = mystr.replace("dayName|","").replace("Saturday|","Суббота:").replace("Sunday|","Воскресенье:").replace("Monday|","Понедельник:").replace("Tuesday|","Вторник:");
	      mystr = mystr.replace("Wednesday|","Среда:").replace("Thursday|","Четверг:").replace("Friday|","Пятница:").replace("Saturday|","Суббота:").replace("Sunday|","Воскресенье:");	
		  var mestovstavki = xpath('//*[@id="content"]');
		  var oFont = document.createElement("font");
		  oFont.size = "-3";
		  mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
		  oFont.insertAdjacentHTML("afterBegin", mystr);
 }
  });
return;
}   

function efim(){
    document.getElementById("getsetid").setAttribute('value',document.referrer.replace("http://www.ereality.ru/~","").replace("http://www.ereality.ru/",""));
	var xpathRes1 = xpath("/html/body/table/tbody/tr/td[4]/div/div[4]/table/tbody/tr[6]/td/form/input[2]");
	xpathRes1.snapshotItem(0).click(); 
}

function mydragons(){
	document.getElementsByClassName("DragonBloodImg")[0].addEventListener("click", PostMsg4, false);
}



if ((myoptions.unpaused)&&((location.href.search("http://www.ereality.ru/info") != -1) || (location.href.search("http://www.ereality.ru/~") != -1)))
{

var name=document.title.replace("Информация о ","");	



var xpathRes = xpath("/html/body/div[3]/div[7]/div/div");

	var buttonsStyle = "border: 1px solid #AAAAAA; cursor: pointer; height: 13px; margin-left: 3px; padding: 5px;";
	var sheerpic = document.createElement('img');	
	sheerpic.setAttribute("style",buttonsStyle);
	sheerpic.src = 'http://img.ereality.ru/clan/40.gif';
	var efimerka = document.createElement('a');	
	var efimerkapic = document.createElement('img');	
	efimerka.href = 'http://охэ.com/efimerka/';
	efimerka.target = '_blank';
	efimerkapic.setAttribute("style",buttonsStyle);
	efimerkapic.src = 'data:image/gif;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAD///8AAP//AP8A/wAAAP8A//8AAAD/AAD/AAAAAAAAAINLBwCETAgApWQVAKJoIgCtcy0AtHkwALh+NgDQkEIA1JRGAMaRUADKlVMA0p1bAMWTVgDgqGUAwZNaAMycYQDQp3UA5MObAOTMrwDn2cgAik4AAH1GAAB1QQAAjlABAIZLAQCzZgIAo10CAIlPAwCSVAYAiVAIAKdjCwCZWgsAiVEKAI1UDACUWA0Aj1YPAJtfEwC5dBkAlFwUAJthFwDmkSUAomcdANCGJwCbZB8A6ZgwAK92LgDMjDoA1ZM+AKZyMQCpdTQAwog9ALuFPgC2gDwAuoVCAOmrWQC+ikkAs4VKANijXgC7jlIAwJdhAMSaZQC5lWgA4rmEANGtfgDZtYUA2reJAM+vhQDoxZYA48CTANK2kgDbv5sA1ryaAOfh2QDXqmwA1cWvAOnk2wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHB1EMLCsxFgcHBwcHBwcHBw4gJSU5RUA6BwcHBwcHBw8gKSoXU09DNzQHBwcHBxktJSknTE0nJSohRgcHBwcSPyArIz07ICspCTYHBwcHOEsvHRxKTicdKCszBwcHBy5JUkITFRhRRAooMwcHBwcNLE5QQSQlOlMUHQ4HBwcHTyAkCyspKysbFB5IBwcHBwcRICUoKwg1GiI8BwcHBwcHBxEfKCgmPgw8BwcHBwcHBwcHTxAyMDZHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHB///AAD//wAA+B8AAPAPAADgBwAAwAMAAMADAADAAwAAwAMAAMADAADAAwAA4AcAAPAPAAD4HwAA//8AAP//AAA=';
	efimerka.appendChild(efimerkapic);
	var bod = document.createElement('a');	
	var bodpic = document.createElement('img');	
	bod.href = 'http://yo-bod.com/faceshop/';
	bod.target = '_blank';
	bodpic.setAttribute("style",buttonsStyle);
	bodpic.src = 'data:image/gif;base64,R0lGODlhDwAMAOYAAAAAAP///40AAGwAAFcAAE0AAEUAAD8AAD0AACsAACQAACIAACAAABYAAA8AAAoAAAkAAAUAAAIAAKEBAV4EBJMHB9IMDGwGBk0GBrQSEmcNDeUeHscgIGEQEIwZGcEjI14REVURERgFBXsfH8c0NC4NDWIeHstDQzMREetPT4YuLudRUVMdHZk2No4yMmUkJKY9PdhRUU0dHYw2NqpCQr5LS1MhIZE7O5tAQO1nZ4A7O/d2dr5fXyYTE/d+fs9ra/6GhsxsbLZhYclsbNBxcfeIiOmDg7xqaoBISNZ6eveOjteCgueMjNuGhvOYmPadnYpbW/+rq/+vr76CgtSWlmNHR/u2tuuqqqt8fPm3t/i7u/3AwNCenv/ExPzDw//Ly/3Kyr2Xl/fJyf/R0dKurt26uuXCwv/b2//d3fvZ2d7AwPXZ2f/j4//l5f/n5/Pd3f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHAALAAAAAAPAAwAQAeLgHCCg3BZQGeEghsLDyRocF5BHTJJiWIWNFhGOSAAFyljiXBaGQwNCRAHMWyEVkgiCj0oM0dHXIlXFS4FGCMDJ2BCE2+iaVMCNWRLPl+JTDAaLC0hABQrbYlKRFBVJRImBGGETh4RL1RlZl1SUYlFNw4LOEM2CDoqBj+EWztwajwfmjxxA4fDGjiBAAA7';
	bod.appendChild(bodpic);
	var sidzokuestate = document.createElement('a');	
	var sidzokuestatepic = document.createElement('img');	
	sidzokuestate.href = 'http://sidzoku.ru/landlord/#'+name;
	sidzokuestate.target = '_blank';
	sidzokuestatepic.src = 'http://img.ereality.ru/clan/73.gif';
	sidzokuestate.appendChild(sidzokuestatepic);
	var bodestate = document.createElement('a');	
	var bodestatepic = document.createElement('img');	
	bodestate.href = 'http://yo-bod.com/library/modules/estate/?name='+CP1251urlencode(name);
	bodestate.target = '_blank';
	bodestatepic.src = 'http://yo-bod.com/library/modules/estate/search.png';
	bodestate.appendChild(bodestatepic);
	var gospic = document.createElement('img');	
	gospic.setAttribute("style",buttonsStyle);
	gospic.src = 'data:image/gif;base64,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';
	var glamurpic = document.createElement('img');	
	glamurpic.setAttribute("style",buttonsStyle);
	glamurpic.src = 'data:image/gif;base64,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';
	try {
	xpathRes.snapshotItem(0).insertAdjacentHTML("beforeEnd", "<p></p>");
	if (myoptions.info) {xpathRes.snapshotItem(0).appendChild(sheerpic);
		sheerpic.addEventListener("click", PostMsg, false);}
	if (myoptions.faceshop) {xpathRes.snapshotItem(0).appendChild(bod);}
	if (myoptions.efimerka) {xpathRes.snapshotItem(0).appendChild(efimerka);}
	if (myoptions.zk) {xpathRes.snapshotItem(0).appendChild(gospic);
	gospic.addEventListener("click", PostMsg1, false);}
	if (myoptions.glamurstupki) {xpathRes.snapshotItem(0).appendChild(glamurpic);
	glamurpic.addEventListener("click", PostMsgGlamurStupki, false);}
	elem = document.getElementsByClassName("slotsInfoNew")[0];
	elem.parentNode.insertBefore(document.createElement('br'),elem.nextSibling);
	xpathRes = xpath('//img[contains(@src,"http://img.ereality.ru//estates/info_icon")]');
	if ((xpathRes.snapshotLength>0) && (xpathRes.snapshotItem(0).parentNode.href.search("/estate_info.php") != -1) )
		{
		xpathRes.snapshotItem(0).parentNode.innerHTML="<nobr>"+xpathRes.snapshotItem(0).parentNode.innerHTML+"</nobr>";
		xpathRes = xpath('//img[contains(@src,"http://img.ereality.ru//estates/info_icon")]');	
		if (myoptions.bodestate) {xpathRes.snapshotItem(0).parentNode.appendChild(bodestate);}
		if (myoptions.sidzoku) {xpathRes.snapshotItem(0).parentNode.appendChild(sidzokuestate);}
	}
	if (myoptions.dragon_time) {
 		window.setTimeout( mydragons , 550);
		
	}} catch(e) {
	}
}



//=========================end.
 });