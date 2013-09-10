// ==UserScript==
// @name        ErExt
// @include     http://www.ereality.ru/core*
// @include     http://www.ereality.ru/~*
// @include 	http://ratings.ereality.ru/clans*
// @include     http://www.ereality.ru/info*
// @include 	http://freedom.erclans.ru/analiz*
// @include 	http://www.ereality.ru/log*
// @include 	http://*.com/efimerka/
// @include 	http://yo-bod.com/faceshop/
// @include     http://www.news.ereality.ru/*sostav&id=*
// @include     http://cc.erclans.ru/viewpage.php?page_id=45*
// @include		http://www.ereality.ru/map.php*
// @include		http://www.ereality.ru/move*
// @include     http://sidzoku.ru/landlord/
// @include     http://www.ereality.ru/instance.php
// @all-frames  true
// ==/UserScript==

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

//================================================================Begin

kango.invokeAsync('kango.storage.getItem',"options",function(value) {
if (value!=null) {
		for (nameprop in myoptions) {
	 	if (value[nameprop]!=false) {value[nameprop]=true;}	
		myoptions[nameprop]=value[nameprop];
    	}
}

//=====================================================================


function xpath(query, object) {
	if(!object) var object = document;
	return object.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var trans=[];
var snart=[];
for(var i=0x410;i<=0x44F;i++)
{
trans[i]=i-0x350;
snart[i-0x350] = i;
}
trans[0x401]= 0xA8;
trans[0x451]= 0xB8;
snart[0xA8] = 0x401;
snart[0xB8] = 0x451;
CP1251urlencode = function(str)
{
var ret=[];
for(var i=0;i<str.length;i++)
{
var n=str.charCodeAt(i);
if(typeof trans[n]!='undefined')
n = trans[n];
if (n <= 0xFF)
ret.push(n);
}

return escape(String.fromCharCode.apply(null,ret));
}
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

Array.prototype.shuffle = function( b )
{
 var i = this.length, j, t;
 while( i ) 
 {
  j = Math.floor( ( i-- ) * Math.random() );
  t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  this[i] = this[j];
  this[j] = t;
 }

 return this;
};

function PostMsg() {
oBtn.removeEventListener("click", PostMsg, false);
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
		oBtn.parentNode.removeChild(oBtn);
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

function PostMsg2() {
naempic.removeEventListener("click", PostMsg2, false);
GM_xmlhttpRequest({
  method: "GET",
  url: "http://naims.tk/services/?do=steps_of_player&p_name="+CP1251urlencode(name),
   headers: {
	"Accept":	"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Encoding":	"gzip, deflate",
	"Accept-Language":	"ru-ru,ru;q=0.8,en-us;q=0.5,en;q=0.3",
     "Content-Type": "application/x-www-form-urlencoded;",
	 "Referer": "http://naims.tk/services/?do=steps_of_player"
	  },
   overrideMimeType:    "text/html;charset=windows-1251",
 onload: function(response)
 {  
		 var mystr = response.substring(response.indexOf('<div class="d_right">')+21,response.indexOf('<div class="top_g_left">')-6);	
		  var mestovstavki = xpath('//*[@id="content"]');
		  var oFont = document.createElement("font");
		  oFont.size = "-3";
		  mestovstavki.snapshotItem(0).parentNode.insertBefore(oFont,mestovstavki.snapshotItem(0));
		  oFont.insertAdjacentHTML("afterBegin", mystr);
		  naempic.parentNode.removeChild(naempic);
 }
  });

return;
}

function PostMsg4() {
document.getElementById("blood2").removeEventListener("click", PostMsg4, false);
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
 {      var mystr = response.replace(new RegExp("time",'g'),"Врата на Остров Драконов на этой неделе открываются в ");	
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
function EnvTab(){
	 var env = document.createElement('a');	
	 env.href = 'http://cc.erclans.ru/viewpage.php?page_id=45'+'#'+document.getElementById("chat_msg").value;
	 env.target = '_blank';
	 env.id = "Open";
	 env.style.display='none';
	 document.body.insertBefore(env, document.body.firstChild);
	 document.getElementById('Open').click();
	 document.getElementById("chat_msg").value = "";
}
function userscount() {
	document.getElementById("chat_msg").value = "";
	var fraki = "Игнесс:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/2.gif"]').snapshotLength+
	" Раанор:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/3.gif"]').snapshotLength+
	" Тарбис:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/4.gif"]').snapshotLength+
	" Витарра:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/5.gif"]').snapshotLength+
	" Дримнир:"+xpath('//div/div/div/img[@src = "http://img.ereality.ru/a/6.gif"]').snapshotLength;
	document.getElementById("chat_msg").value = fraki;
}
function mymain() {
	if (document.getElementById("npcname").innerHTML=="Ворота Кладбища")	
		{
			document.getElementById("dialog").firstChild.firstChild.nextElementSibling.nextElementSibling.click();
		}
}
function lotereya() {
	if (document.getElementById("ImgField15")!=null)	
	{
		for (var i=1; i<16; i++) {
			xpathres=xpath('//img[@src = "http://img.ereality.ru/loto/'+i+'_b.png"]');
			if (xpathres.snapshotLength>0) {xpathres.snapshotItem(0).click();}
		}
		var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		arr.shuffle();
		for (var i=0; i<5; i++) {xpath('//img[@src = "http://img.ereality.ru/loto/'+arr[i]+'_a.png"]').snapshotItem(0).click();}
	}
	else if (document.getElementById("ImgField14")!=null)
	{
		for (var i=1; i<15; i++) {
			xpathres=xpath('//img[@src = "http://img.ereality.ru/loto/'+i+'_b.png"]');
			if (xpathres.snapshotLength>0) {xpathres.snapshotItem(0).click();}
		}
		var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
		arr.shuffle();
		for (var i=0; i<4; i++) {xpath('//img[@src = "http://img.ereality.ru/loto/'+arr[i]+'_a.png"]').snapshotItem(0).click();}
	}
}
function mynum(code) {
	if ((myoptions.numfight)&&(document.getElementById("div_battle").style.display!="none"))
		{
			switch (code) 
			{
				case  96: {document.getElementById("block_pl4").click();break;}
				case  97: {document.getElementById("hit_pl0").click();break;}
				case  98: {document.getElementById("hit_pl1").click();break;}
				case  99: {document.getElementById("hit_pl2").click();break;}
				case 100: {document.getElementById("hit_pl3").click();break;}
				case 101: {document.getElementById("hit_pl4").click();break;}
				case 102: {document.getElementById("block_pl0").click();break;}
				case 103: {document.getElementById("block_pl1").click();break;}
				case 104: {document.getElementById("block_pl2").click();break;}
				case 105: {document.getElementById("block_pl3").click();break;}
			}
		}
	if ((myoptions.numcapcha)&&(top.frames.main.document.getElementById("CaptchaButtons")!=null))
		{	
			switch (code) 
			{
				case  96: {top.frames.main.document.getElementById("cat_4").click();break;} //0
				case  97: {top.frames.main.document.getElementById("cat_0").click();break;} //1
				case  98: {top.frames.main.document.getElementById("cat_1").click();break;} //2
				case  99: {top.frames.main.document.getElementById("cat_2").click();break;} //3
				case 100: {top.frames.main.document.getElementById("cat_5").click();break;} //4
				case 101: {top.frames.main.document.getElementById("cat_8").click();break;} //5
				case 102: {top.frames.main.document.getElementById("cat_6").click();break;} //6
				case 103: {top.frames.main.document.getElementById("cat_9").click();break;} //7
				case 104: {top.frames.main.document.getElementById("cat_7").click();break;} //8
				case 105: {top.frames.main.document.getElementById("cat_3").click();break;} //9
			}
		}	
}
function instkbd(code) {
	if ((myoptions.kbdinst)&&(top.frames.main.document.getElementById("div_inst_top")!=null))
		{	
			switch (code) 
			{
				case  37: {top.frames.main.document.getElementById("inst-left").click();break;}
				case  38: {top.frames.main.document.getElementById("inst-forward").click();break;}
				case  39: {top.frames.main.document.getElementById("inst-right").click();break;}
				case  40: {top.frames.main.document.getElementById("inst-backward").click();break;}
				//case 13: {top.frames.main.document.getElementById("inst-center").click();break;}
				// case 13: {top.frames.main.document.getElementById("map_monsters").firstChild.firstChild.onclick();break;}
			}
		}
}
function pfunction(){

var scr= document.createElement("script");
 scr.text="";
 if (myoptions.chatsectors) {
 scr.text= scr.text + "(" +
    (function(){var xgdh=chat.formatSmilies;
	chat.formatSmilies=function(){
		if ((arguments[0].search("опыта")==-1)||(arguments[0].search("Вы подобрали")==-1)) {
			if ((arguments[0].search("Ауры")!=-1)||(arguments[0].search("ептикон")!=-1)||(arguments[0].search("за убийство")!=-1)||(arguments[0].search("Людей:")!=-1)) {
				arguments[0]=arguments[0].replace(/(\d{1,3})[: \.](\d{1,3})/ig,"<a href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>"); 
				}
			else {
			arguments[0]=arguments[0].replace(/(\d{1,3})[: \.\-\/](\d{1,3})/ig,"<a href=\"javascript:(function(){chat.myshowSec($1,$2);})();\">$&</a>");
			}
	}
	return xgdh.apply(chat, arguments);
	};
	
	chat.myshowSec = function (xcord,ycord){
		var sectorX = top.frames.main.document.getElementById("searchX");
		if (sectorX!=null) {
			sectorY = top.frames.main.document.getElementById("searchY");
		}
		else {
			sectorX = top.frames.main.document.getElementById("sx2");
			sectorY = top.frames.main.document.getElementById("sy2");
		}
	sectorX.value=xcord;
	sectorY.value=ycord;
	if( window.KeyEvent ) {// Для FF
		var o = document.createEvent('KeyEvents');
		o.initKeyEvent( 'keyup', true, true, window, false, false, false, false, 13, 0 );
		}
	else {// Для остальных браузеров
		var o = document.createEvent('UIEvents');
		o.initUIEvent( 'keyup', true, true, window, 1 );
		  o.keyCode = 13; // Указываем дополнительный параметр, так как initUIEvent его не принимает
		}	
	sectorY.dispatchEvent(o);
	}
	}).toString()
	+ ")();";
	}
	if (myoptions.block_cmenu) {
	scr.text= scr.text+ "(" +
	(function(){
	function menufunc(){
		pic = document.getElementById("picmenu");
		if (pic.src=='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAACXBIWXMAAAsTAAALEwEAmpwYAAADG2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMWgx9DJcMqhgeM0oxRjPMYnzIZMjUwXWLWYG5kvstiwzKPlZk1m/UqmxPbJnYV9pkcAhydnKyczVzMXG3c3NwTeaR4lvIa8x7iC+Z7xl8tICSwWtBN8JFQo7Ci8GGRdFFe0a1iceKc4lslUiSFJY9KVUjrSj+RmSMbKicod1a+R8FHkVfxgtIU5SgVJZXXqlvVGtX9NGQ13mru05qonapjrSuk+0rviP58gxrDKCNLY0nj3yb3TA+brTDvt6iwTLTysbawUbUVsWOx+2r/3OG24wWnY857Xba6rndb6b7UY5HnQq8F3gt9Fvsu81vlvz5ga+DeoGPB50NuhT4L+xLBFCkYpRRtHOMWGxWXF9+SMDtxc9LZ5OepTGly6TYZUZlVWbOy9+Tcy2PKVy/wKSwuml18uORtmUS5S0Vh5byqs9V/a/Xq4usnNRxr/N1s0JLeOq/teodgp3dXe/fhXoY++/66Cfsm/p/sOKV16onpvDOCZ86a9WiO1tySefsWcC0MW7R48celDssmLH+40nhV6+qba3XXNa2/udFgU8fmB1uttk3d/mGn765Vezj2pu87fkD9YOeh10f8jm4+Ln6i9uST095ntpyTPd9+4dOluMunrlpcW3ZD9Gbrra930u/evO/z4MAj08ernyo+m/lC8GXXa+Y3dW9/vi/98OlTwed3X/O+vfuR//PD7+I/3/5V/f8PAC4MHYugPAkxAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGWSURBVHjaLNG9S9RhAMDxz/P73Yt35suhUCpRYh5YIDVY0RQSJ9Ig9E+01FBQY9HSEEZLS0t/grlE0qRLiBFNCb2QUqJSinZontfdPQ31HT/rN0z736Crrcm2QWorySsvrfzjMA35eP3wVjxZMqHptSqr+SfhmUPSCoX4KN4f6qZgVN4XBce7dyd1hXmNtCLeaN47b1y7df0Orbjkouj7hbAVFhPD9Ttlo/Z9UpdI/fHZvlFl9btOJY2pYv+IYMminIxExhtLghHFvsZU0hzvUVK1rFMqKy+ry7Kqkh7NK5kwUJS3qaFo25poR0HDL52KQn9GaIlyEqm6F+iQ05JFUwxJXN9V06ukJqekJKempFdNlfUku7BlQ7sxGQei6EDGmHabfsouJOlsc/udfWUTBqRSAyaU/fZWYzudTStb+dyP8R0nDBg25LSzjtkzZ1XnwziTVnhfOLp27qtUQYe8fR/N+ab0PD5QD9MIR8Lt6s3D3i7t2FOV3+p8Gh/Hvf83gyg507xWu9zsI91om09nWh+CiL8DAM2AjYmLhPsSAAAAAElFTkSuQmCC') {
			pic.src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADExLzA1LzA33bqJ2wAAAq1JREFUeJxlk09oVFcUxn/3vskkqZoJGRMXTgQpCga0qZkUChEtFjFg6giuVDAgbaQroV2WGgUXXQiudJlVyDJpKRVKwYR0YXVqtNrUP1SSOMYRJpjJjJn3Zubc08Uzk4n94HDh8N1zzvcdjlFV6rHn75P7oqbhkqc26WET4oTAlTOBq6QDV774oufmX/V8U1+ge/bUuGdsaiHI8kYKCAKAh2UzzcS1hYqrTix8cvPEhgLfZq41TRXuPctVlxNz5cVawVZvCwDLUqjl4rKFZolmtr9t23X78zHfAvy2cmes/nOq9RAAM12jzOwZBbeeW/IKFE0p8W9TdgyA5OyZ3v2zp5V0j5Lu0ZHcT6qqyvTHugZ+3quqqiPZH2u8rVMHte3WgV7ru/KVhSBb6zwYHwhnXaqsO1UNfRrc9gWpyAEAilGfipErttk0dr15p/Fs/BgAFx7+AMBceZG51VDWhRdXQ07HAJQcQUQwFe0yyUdnNO3/A4D2pEPzfvmU/CafWCwGr8vkq0Vi29tY7p4Mnf/1I4g3sDkXISJOeB8GAx945KUIbQDRMLeGkgNA1GGrTl56WAAmC3+GY3YeXyfbMNbkTebuvts/iJOX3qavdh4VdR8GVJgrLzIYH+Dotj7y/gqPK/M02UbOt5/kWuc3oZEz3zEvWaz1UHF/mN3p48mqyt3n5hUAFzu+ZLhz6H+yAIYfX+fSkxvQ3kAkr4iTXqOq7LjTP76Kn1rywm0ctN0Mdw5xaGtvbezhJ9eZyqWhJYLFoL5MuP4HJ4yqcnj6XNPTSOZZ0ZQSyw2rYbvAwYqEL0CjhRYPG4CuSkbnS7v066f+hmNq//2zcZymilGfICKo0ZphxgdbEAQ34fofbDymesSm+/YiellFk1p1CVGHIBkxLu2Mfu+O3H9Yz/8PLFlkbIqvT3MAAAAASUVORK5CYII=';
			window.oncontextmenu = function(){return false};
		} 
   else {
    pic.src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAACXBIWXMAAAsTAAALEwEAmpwYAAADG2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMWgx9DJcMqhgeM0oxRjPMYnzIZMjUwXWLWYG5kvstiwzKPlZk1m/UqmxPbJnYV9pkcAhydnKyczVzMXG3c3NwTeaR4lvIa8x7iC+Z7xl8tICSwWtBN8JFQo7Ci8GGRdFFe0a1iceKc4lslUiSFJY9KVUjrSj+RmSMbKicod1a+R8FHkVfxgtIU5SgVJZXXqlvVGtX9NGQ13mru05qonapjrSuk+0rviP58gxrDKCNLY0nj3yb3TA+brTDvt6iwTLTysbawUbUVsWOx+2r/3OG24wWnY857Xba6rndb6b7UY5HnQq8F3gt9Fvsu81vlvz5ga+DeoGPB50NuhT4L+xLBFCkYpRRtHOMWGxWXF9+SMDtxc9LZ5OepTGly6TYZUZlVWbOy9+Tcy2PKVy/wKSwuml18uORtmUS5S0Vh5byqs9V/a/Xq4usnNRxr/N1s0JLeOq/teodgp3dXe/fhXoY++/66Cfsm/p/sOKV16onpvDOCZ86a9WiO1tySefsWcC0MW7R48celDssmLH+40nhV6+qba3XXNa2/udFgU8fmB1uttk3d/mGn765Vezj2pu87fkD9YOeh10f8jm4+Ln6i9uST095ntpyTPd9+4dOluMunrlpcW3ZD9Gbrra930u/evO/z4MAj08ernyo+m/lC8GXXa+Y3dW9/vi/98OlTwed3X/O+vfuR//PD7+I/3/5V/f8PAC4MHYugPAkxAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGWSURBVHjaLNG9S9RhAMDxz/P73Yt35suhUCpRYh5YIDVY0RQSJ9Ig9E+01FBQY9HSEEZLS0t/grlE0qRLiBFNCb2QUqJSinZontfdPQ31HT/rN0z736Crrcm2QWorySsvrfzjMA35eP3wVjxZMqHptSqr+SfhmUPSCoX4KN4f6qZgVN4XBce7dyd1hXmNtCLeaN47b1y7df0Orbjkouj7hbAVFhPD9Ttlo/Z9UpdI/fHZvlFl9btOJY2pYv+IYMminIxExhtLghHFvsZU0hzvUVK1rFMqKy+ry7Kqkh7NK5kwUJS3qaFo25poR0HDL52KQn9GaIlyEqm6F+iQ05JFUwxJXN9V06ukJqekJKempFdNlfUku7BlQ7sxGQei6EDGmHabfsouJOlsc/udfWUTBqRSAyaU/fZWYzudTStb+dyP8R0nDBg25LSzjtkzZ1XnwziTVnhfOLp27qtUQYe8fR/N+ab0PD5QD9MIR8Lt6s3D3i7t2FOV3+p8Gh/Hvf83gyg507xWu9zsI91om09nWh+CiL8DAM2AjYmLhPsSAAAAAElFTkSuQmCC';
	window.oncontextmenu = function(){return true};
   }
   
	}
	var loc_us = document.getElementById("div_users");
	loc_us.firstChild.nextSibling.insertAdjacentHTML("afterEnd",'<img id = "picmenu"  src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAACXBIWXMAAAsTAAALEwEAmpwYAAADG2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMWgx9DJcMqhgeM0oxRjPMYnzIZMjUwXWLWYG5kvstiwzKPlZk1m/UqmxPbJnYV9pkcAhydnKyczVzMXG3c3NwTeaR4lvIa8x7iC+Z7xl8tICSwWtBN8JFQo7Ci8GGRdFFe0a1iceKc4lslUiSFJY9KVUjrSj+RmSMbKicod1a+R8FHkVfxgtIU5SgVJZXXqlvVGtX9NGQ13mru05qonapjrSuk+0rviP58gxrDKCNLY0nj3yb3TA+brTDvt6iwTLTysbawUbUVsWOx+2r/3OG24wWnY857Xba6rndb6b7UY5HnQq8F3gt9Fvsu81vlvz5ga+DeoGPB50NuhT4L+xLBFCkYpRRtHOMWGxWXF9+SMDtxc9LZ5OepTGly6TYZUZlVWbOy9+Tcy2PKVy/wKSwuml18uORtmUS5S0Vh5byqs9V/a/Xq4usnNRxr/N1s0JLeOq/teodgp3dXe/fhXoY++/66Cfsm/p/sOKV16onpvDOCZ86a9WiO1tySefsWcC0MW7R48celDssmLH+40nhV6+qba3XXNa2/udFgU8fmB1uttk3d/mGn765Vezj2pu87fkD9YOeh10f8jm4+Ln6i9uST095ntpyTPd9+4dOluMunrlpcW3ZD9Gbrra930u/evO/z4MAj08ernyo+m/lC8GXXa+Y3dW9/vi/98OlTwed3X/O+vfuR//PD7+I/3/5V/f8PAC4MHYugPAkxAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGWSURBVHjaLNG9S9RhAMDxz/P73Yt35suhUCpRYh5YIDVY0RQSJ9Ig9E+01FBQY9HSEEZLS0t/grlE0qRLiBFNCb2QUqJSinZontfdPQ31HT/rN0z736Crrcm2QWorySsvrfzjMA35eP3wVjxZMqHptSqr+SfhmUPSCoX4KN4f6qZgVN4XBce7dyd1hXmNtCLeaN47b1y7df0Orbjkouj7hbAVFhPD9Ttlo/Z9UpdI/fHZvlFl9btOJY2pYv+IYMminIxExhtLghHFvsZU0hzvUVK1rFMqKy+ry7Kqkh7NK5kwUJS3qaFo25poR0HDL52KQn9GaIlyEqm6F+iQ05JFUwxJXN9V06ukJqekJKempFdNlfUku7BlQ7sxGQei6EDGmHabfsouJOlsc/udfWUTBqRSAyaU/fZWYzudTStb+dyP8R0nDBg25LSzjtkzZ1XnwziTVnhfOLp27qtUQYe8fR/N+ab0PD5QD9MIR8Lt6s3D3i7t2FOV3+p8Gh/Hvf83gyg507xWu9zsI91om09nWh+CiL8DAM2AjYmLhPsSAAAAAElFTkSuQmCC" > ');
	loc_us.firstChild.nextSibling.nextSibling.addEventListener("click", menufunc, false);
	}).toString()
	+ ")()";
	}
 if (scr!="") { 	
 document.body.appendChild(scr);
 }
}



if (location.href.search("page=sostav") != -1 )
{
var xpathRes = xpath("/html/body/table/tbody/tr[2]/td/table/tbody/tr");
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).firstChild);
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).firstChild);
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).lastChild);
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).lastChild);
var xpathRes = xpath("/html/body/table/tbody");
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).firstChild);
xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).lastChild);
}
else if (location.href.search("http://www.ereality.ru/core") != -1 )
{

 var exitlink = document.createElement('A');
	exitlink.href = 'http://www.ereality.ru/exit.php';
	exitlink.innerHTML ="[X]";
	if (document.getElementById("td_nick2")!=null ) {
	document.getElementById("td_nick2").insertBefore(exitlink, document.getElementById("td_nick2").firstChild);
	}
	if (myoptions.location_info) {
	document.getElementById("span_location").onclick= function(){
		document.getElementById('chat_msg').value=document.getElementById('span_location').innerHTML+' Людей: '+document.getElementById('span_location_count').innerHTML;
	};	
	}
 
 envpic = document.getElementById("td_dyn").nextElementSibling.nextElementSibling.firstChild;
 envpic.addEventListener("click", EnvTab, false);
 if (kango.browser.getName()!="firefox") 
 {
	document.getElementById("span_sort").previousElementSibling.href='javascript: users.load(); document.getElementById("a_users_loc").focus();';
	document.getElementById("a_users_loc").href='javascript: users.load(); document.getElementById("a_users_loc").focus();';
	document.getElementById("span_mode5").firstChild.href='javascript: fdemands.load(5); document.getElementById("span_mode5").firstChild.focus();';
 }

 if (myoptions.okcount) {
 	var loc_user = document.getElementById("div_users");
 	var calcpic = document.createElement('img');	
 	calcpic.src = 'data:image/gif;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIxAAAgICAQQCAwAAAAAAAAAAAQMCBAURABITIUEUURUiMf/EABQBAQAAAAAAAAAAAAAAAAAAAAT/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIhMf/aAAwDAQACEQMRAD8A1uYbaxWOoW6uOxjaRQo2Jzp9xiyYjcj+w6hxEwyWMlcEcXNRbVlWs0a/akNvgJb8n0deD975PzKvyteiid59dCFLDKrMXZPVOMQCJERGxsfziPkNNSdaVgvE21gpKca9MV9LoSkdyj9D2fXjjqedCytP/9k=';
 	loc_user.insertBefore(calcpic, loc_user.firstChild);
 	loc_user.firstChild.addEventListener("click", userscount, false);
 };
 window.setTimeout( pfunction , 100);
 

 document.onkeyup = function (e) {
	        e = e || window.event;
			//alert(e.keyCode);
	        if (e.keyCode === 13) {
	            mymain();
	        }
			if (((e.keyCode > 36) && (e.keyCode < 41))||(e.keyCode === 13)) {
	            instkbd(e.keyCode);
	        }
			 if ((e.keyCode > 95) && (e.keyCode < 106)) {
	            mynum(e.keyCode);
	        }
	        // Отменяем действие браузера
	        return false;
	    }
 
}
else if ((location.href.search("http://www.ereality.ru/info") != -1) || (location.href.search("http://www.ereality.ru/~") != -1))
{
if (myoptions.clan_info) {
 for(i=0; i<document.images.length; ++i) 
{if (document.images[i].src.indexOf('http://img.ereality.ru/clan/') == 0) 
	{    var id = document.images[i].src.replace("http://img.ereality.ru/clan/","").replace(".gif","");
	var clanlink = document.createElement('A');
	clanlink.href = 'http://www.news.ereality.ru/index.php?do=static&page=sostav&id='+id;
	clanlink.target = '_blank'
	clanlink.innerHTML = '<img src="http://img.ereality.ru/inf.gif"</img>';
	document.images[i].parentNode.insertBefore(clanlink,document.images[i]);
	i++;
	}
}
}

var name=xpath("/html/body/div[3]/div[6]/div/strong").snapshotItem(0).innerHTML;	



var xpathRes = xpath("/html/body/div[3]/div[7]/div/div");

	var oBtn = document.createElement("input");
	oBtn.type = "button";
	oBtn.value = "info";
	oBtn.addEventListener("click", PostMsg, false);
	var efimerka = document.createElement('a');	
	var efimerkapic = document.createElement('img');	
	efimerka.href = 'http://охэ.com/efimerka/';
	efimerka.target = '_blank';
	efimerkapic.src = 'data:image/gif;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAD///8AAP//AP8A/wAAAP8A//8AAAD/AAD/AAAAAAAAAINLBwCETAgApWQVAKJoIgCtcy0AtHkwALh+NgDQkEIA1JRGAMaRUADKlVMA0p1bAMWTVgDgqGUAwZNaAMycYQDQp3UA5MObAOTMrwDn2cgAik4AAH1GAAB1QQAAjlABAIZLAQCzZgIAo10CAIlPAwCSVAYAiVAIAKdjCwCZWgsAiVEKAI1UDACUWA0Aj1YPAJtfEwC5dBkAlFwUAJthFwDmkSUAomcdANCGJwCbZB8A6ZgwAK92LgDMjDoA1ZM+AKZyMQCpdTQAwog9ALuFPgC2gDwAuoVCAOmrWQC+ikkAs4VKANijXgC7jlIAwJdhAMSaZQC5lWgA4rmEANGtfgDZtYUA2reJAM+vhQDoxZYA48CTANK2kgDbv5sA1ryaAOfh2QDXqmwA1cWvAOnk2wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHB1EMLCsxFgcHBwcHBwcHBw4gJSU5RUA6BwcHBwcHBw8gKSoXU09DNzQHBwcHBxktJSknTE0nJSohRgcHBwcSPyArIz07ICspCTYHBwcHOEsvHRxKTicdKCszBwcHBy5JUkITFRhRRAooMwcHBwcNLE5QQSQlOlMUHQ4HBwcHTyAkCyspKysbFB5IBwcHBwcRICUoKwg1GiI8BwcHBwcHBxEfKCgmPgw8BwcHBwcHBwcHTxAyMDZHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHB///AAD//wAA+B8AAPAPAADgBwAAwAMAAMADAADAAwAAwAMAAMADAADAAwAA4AcAAPAPAAD4HwAA//8AAP//AAA=';
	efimerka.appendChild(efimerkapic);
	var bod = document.createElement('a');	
	var bodpic = document.createElement('img');	
	bod.href = 'http://yo-bod.com/faceshop/';
	bod.target = '_blank';
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
	gospic.src = 'data:image/gif;base64,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';
	var naempic = document.createElement('img');	
	naempic.src = 'data:image/gif;base64,R0lGODlhDwAMAMQVAJl5I7ycQHqJm7iYO9e+bJ18I66NMJh3H1ZedUFGVnxiGsbS5KCuwau202JLDezUisquV9zFf7CVTNa+awAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABUALAAAAAAPAAwAAAVbYJWMVVlGk1lSbFIh1fNEqFqx8DTJdKoiggZBx6uVEAkBo6HbORwTiM9QWDAUzSdAInUcDArFwFcBlLgTr2EQCDRsErQ6wFjCIZAI4FCx2lVcYSYLhG+AEjYqIQA7';
	try {
	xpathRes.snapshotItem(0).insertAdjacentHTML("beforeEnd", "<p></p>");
	if (myoptions.info) {xpathRes.snapshotItem(0).appendChild(oBtn);}
	if (myoptions.faceshop) {xpathRes.snapshotItem(0).appendChild(bod);}
	if (myoptions.efimerka) {xpathRes.snapshotItem(0).appendChild(efimerka);}
	if (myoptions.zk) {xpathRes.snapshotItem(0).appendChild(gospic);
	gospic.addEventListener("click", PostMsg1, false);}
	if (myoptions.naemniki) {xpathRes.snapshotItem(0).appendChild(naempic);
	naempic.addEventListener("click", PostMsg2, false);}
	
	xpathRes = xpath('//img[contains(@src,"http://img.ereality.ru//estates/info_icon")]');
	if ((xpathRes.snapshotLength>0) && (xpathRes.snapshotItem(0).parentNode.href.search("/estate_info.php") != -1) )
	{
		if (myoptions.bodestate) {xpathRes.snapshotItem(0).parentNode.appendChild(bodestate);}
		if (myoptions.sidzoku) {xpathRes.snapshotItem(0).parentNode.appendChild(sidzokuestate);}
	}
	if (myoptions.dragon_time) {document.getElementById("blood2").addEventListener("click", PostMsg4, false);}
	} catch(e) {
	}
}
else if (location.href.search("http://ratings.ereality.ru/clans") != -1) 
{
if (myoptions.clan_info) {
for(i=0; i<document.images.length; ++i) 
{if (document.images[i].src.indexOf('http://img.ereality.ru/clan/') == 0) 
	{    var id = document.images[i].src.replace("http://img.ereality.ru/clan/","").replace(".gif","");
	var clanlink = document.createElement('A');
	clanlink.href = 'http://www.news.ereality.ru/index.php?do=static&page=sostav&id='+id;
	clanlink.target = '_blank'
	clanlink.innerHTML = '<img src="http://img.ereality.ru/inf.gif"</img>';
	document.images[i].parentNode.insertBefore(clanlink,document.images[i]);
	i++;
	}
}
}
}
else if (location.href.search("http://yo-bod.com/faceshop/") != -1) 
{
if ((document.referrer.search("http://www.ereality.ru/info") != -1) || (document.referrer.search("http://www.ereality.ru/~") != -1))
{document.getElementById("one_getsetid").setAttribute('value',document.referrer.replace("http://www.ereality.ru/~","").replace("http://www.ereality.ru/",""));
var xpathRes = xpath("/html/body/div[7]/div[22]/table/tbody/tr[3]/td/input[2]");
xpathRes.snapshotItem(0).click();
}
}
else if (location.href.search("http://sidzoku.ru/landlord/") != -1) 
{
if ((document.referrer.search("http://www.ereality.ru/info") != -1) || (document.referrer.search("http://www.ereality.ru/~") != -1))
{
	document.getElementById("heroName").setAttribute('value',location.href.replace("http://sidzoku.ru/landlord/#",""));
	var xpathRes = xpath("/html/body/div[5]/div[5]/div/div[3]/div/img[2]");
	xpathRes.snapshotItem(0).click();
}
}
else if (location.href.search(".com/efimerka/") != -1) 
{
if ((document.referrer.search("http://www.ereality.ru/info") != -1) || (document.referrer.search("http://www.ereality.ru/~") != -1))
{
 var xpathRes = xpath('//*[@id="sdiv_img8"]');
 xpathRes.snapshotItem(0).click();
 window.onload = setTimeout( efim , 5000);
}
}
else if ((location.href.search("http://www.ereality.ru/log") != -1)&&(location.href.search("http://www.ereality.ru/login") == -1))
{
var link = document.createElement('A');
	link.href = 'http://freedom.erclans.ru/analiz/'+location.href.replace("http://www.ereality.ru/log/","");
	link.target = '_blank'
	link.innerHTML = '<img src="data:image/gif;base64,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"</img>';
document.body.insertBefore(link, document.body.firstChild);
}
else if (location.href.search("http://freedom.erclans.ru/analiz/") != -1) 
{
if (document.referrer.search("http://www.ereality.ru/log") != -1) 

{
document.getElementsByName("num_log")[0].setAttribute('value',location.href.replace("http://freedom.erclans.ru/analiz/",""));
var xpathRes = xpath("/html/body/center/form/table/tbody/tr[4]/td/input");
xpathRes.snapshotItem(0).click();
}
}
else if (location.href.search("http://cc.erclans.ru/viewpage.php") != -1) 
{
if (document.referrer.search("http://www.ereality.ru/core/") != -1) 
{
document.getElementById("0012e4f").setAttribute('value',decodeURI(location.href).replace("http://cc.erclans.ru/viewpage.php?page_id=45#","").replace(/\] \[/g,",").replace("]","").replace("[",""));
var xpathRes = xpath("/html/body/table/tbody/tr/td/table[3]/tbody/tr/td[2]/table/tbody/tr[2]/td/center/form/input[2]");
xpathRes.snapshotItem(0).click();
}
}
 else if ((location.href.search("http://www.ereality.ru/map.php") != -1) && (location.href.search("action=fill") != -1)) 
 {
 if (myoptions.lotereya) {
 var lotButton = document.createElement('img');	
	 lotButton.src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAXCAYAAAAxzdDQAAAINElEQVRoge2ae3BU1R3HP/fu3Uc2yeYNJEAQNoSHgQZUmAQxkCYQXjVWK7bCoBWMFAVF0BbtWHl0gBYRJTg8CgMVC7RQ0lJAhFCTqBCLIII8AhgkQl4EApvNvs69/SNmSYBklylMSrufmTuzZ8/5fb+/e3977j1z90iaptFI5i8PxAI5wHigI2AkwH87tcBxYDvw1kfz77M1dkiNxc2YWTwa2AiY2yLDALeFcmDS7t8N2AbfFzd9+mfjgLWA3KapBbgdOIGM/LdSiqQhUwvDgVIgrG1zCnAbuQjco6hCvESgsP9rRAGPK5oQGW2dSYA7wmRFFSKprbMIcEdIVDQhLP6ODg5S2LwwjWCTwsqtJaz7x5k7mVyA/wyLogrh9+iHkmMJNeupr69nWD8DuUt3EBw/7A7m9/+HJIEEqJrPoT5RtFsobubAWCqqa/nnnp2MHTsWa9RlLnwf/8d5acR3CEGvyNQ7Bd9esLFyy3HmPn8/ZpPSTMfu8PDzNwqYOaEvSQkR1NpcFH5RTu7Gr7E7BMk9InlxXBJd40L5rrKOZZuOUXSwAoChD8Qy6cc9iGsXzLlyG+98cJTPj1YD8OGyLMJCDc28aq+6GP6LndwTF9KiH8CO3OFEWK69s7l0xcmIKR8CkL9yJKqqkZGzA4Ddy0cgyxLpk7YDkNjFwqtP/4CEzhbOV9lZueUE+cXn/YrNXzkSITQyn9tBhMXAhgXpBBl1DH7670iS3Kq2L2RVCPw5LGYd998bQ2HRZ3xcuB+AUcMH47pyFlUIuseHYTTo6NU7iZ898Ri9uoXz64m9SH1kAdbuvbyGVquVgQ/0Y+nMvnSNM7P43VXsK9rNoxldeWaYHuGq48kRVl6e82fGjsuhWycLs55KxFF9mOgwA88/0Zt/HTrJhg1/oVOMgdeeSsBRcwxVCG9hrVYrVqsVgLBQA/Yjc8mdldqin0GBCIsRu93ujYuwGKkufh1VCMwmhRCznur9v0IVghCzHrNJoWrfq5j0EkteSeHy5Ss8mP4whXvymD05mRil1GdsY39ocEP/Mw8nEhZiwKDXUb3vFZ/avg5ZEwJ/jh8OiEUnS+Tv+hv7j9bgdnsYOXIkzqoDNJ39HreDqKTnATh9qgTb6Q1E9p/T7Bf1o4mriI6O5t13lrBqRS6zFn1EReVFMtOSqft2O9MXfsLpg3lEdBsDQHn5BWxnNlFRZWNMzp94beZzLFyWx96iL+nQoR3ifB7X34Ei71/g/ZyelkpUmKlFvxCj/L1POch6b5zmqWumqwlHcx/VRWrfGCIsRt5fvZirdSp7vo5EURT6x9fgqatoNbZpO75Te0YP6YIQamOAT21fNVNUVb1xPt+EYamdcXsERUVFaO2yOXisigF94+jTVcdJ57UkT58+DYDT5WH16tXIphiu92gfFQTA2dISTB3SMbZLpfySRlJCFK6arwjqNIYv9+VhNOgQQmXNmjXIegsSGtMmPEhm6k+JjjBh0OsA0Gl2hNvRzKOpZ1xcXKt+ocHjACgtLUXWh7Wo03huTekQ3fC29r3ct5t9r2kqrtoTrcY2aquqyvTp09lVWMLooYl+axsNkTdoNsWvmRsTbiC5ZzR6Rcfhw4f5avdsBvSNBWDMyHQ8V66tmq1WK9nZ2RgNCvPmzcMYnXrDrLp0uR6A2NhYJH0EqILYGDPlFVVoHhuqx0PKE5vIzn4UnU5m7ty5GKJTGPVQPBOye7LugzyS+w9i85Yt105YuJpfgCaeFy9ebNWvXUTDs/bQoUPIxqgWdZre7hupuWwHICcnx9tvtVpZv349WpNV0c1iG7U1TSMjI4O331qELMt+a/ueuX4sqDJTOiNJElOmTGHnzp0ABAcHU1xcTFZWFr999wXvWFmWCevxXENyNTXYy7YSGtqzmV7RgTIczn5MmzaN0I2f0KdPMu0izSxesgZJb2HhjEHMX/E5lvaTgIbbZX1ZHibD4wBUl31Bl3uzGJia6dW8/jyatgsKCnA4XS36JfeMRlVVtm3bhmyytqgDEJr0ZrP2pwe+w17vZPz48XxVHo+dLi1ex+tjG7V1Oh1r167j7ImCW9L2VTu/VsuD+sdyqdbG3r17MXV8DMXSG4D8fWWMSLPSs7PEiTM1JHQJo6SkBJvdRcG+U8yfPRVJZ0YTAnu9G1U4AaissvHCG9uZOi6BaROzqKt3s3T5Bt7LXYI+YjAFxed4f0Ea4eHhHDpaxpuvv4ikWNi66yQDe5uYM2cOVTV1HDxyjg7RiQghkISK3eFG9TR4NHqiuamsrGzV7ydZ3Vm0dBNnz57FbB3jjfPqONyg3rxdUWVj6m+2M/XJBPZseJmgIBMAj0zeyplzta3GakJQ7/BQZ7vMsmW56CPuo97h8Xr70vaFlJT1Bwd+/G/rKFuP6qggqNsLSE0WHc4Lf0Vc/Rpj5wm4KnegOasADWQDclBnDNFDkY3tAbCXLAQkzN1nAiDqvsFdnY/qqgbZiBLWD33UYCRJxlP7Je6LH6OJemRje/QxmeiCOqKpTpwXtqLaS5GUEGRTJ8TVowQlzECSDTd4NLTB3P2VVv3spxahj0xFH5lyQ5w/bWH/BnfVXlRXFWgeAExdnkU2xvihtQBkA0H35CDpzA1twNz9VZ/arXBCujdzxXGgh6/iBrjr2KyoQqwGFvgcGuBuY5fUM21pOPANEN7W2QS4bRwH+kiaptFj8DvpNOzBCeyZuvu5Aow+UTi10LuHKjF18ShgOQ0b4wLcnZwHhp/89KUj0GSDHEDCwN8HAc8CKcAQoH0bJBjg1qgFjgBLgS2n9s/wvs35N5tmw1QcEHL9AAAAAElFTkSuQmCC';
	xpath("/html/body/div/div[4]/div/div/table/tbody/tr/td/table").snapshotItem(0).appendChild(lotButton);
	lotButton.addEventListener("click", lotereya, false); 
    }
 }
  else if ((location.href.search("http://www.ereality.ru/move") != -1)&&(myoptions.chatsectors)) 
 {  window.setTimeout( function(){
     var clearlink = document.createElement('A');
	clearlink.href = 'javascript:window.parent.chat.myshowSec("","")';
	clearlink.innerHTML ="[X]";
	if ((document.getElementById("searchY")!=null)&&(document.getElementById("searchY").value!=""))
	{document.getElementById("searchY").parentNode.appendChild(clearlink);}
	else if ((document.getElementById("sy2")!=null)&&(document.getElementById("sy2").value!=""))
	{document.getElementById("sy2").parentNode.appendChild(clearlink);}
 } , 0);
 }

//=========================end.
 });