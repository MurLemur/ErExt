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



KangoAPI.onReady(function() {
kango.invokeAsync('kango.storage.getItem',"options",function(value) {
if (value!=null) {
    for (nameprop in myoptions) {
    if (value[nameprop]!=false) {value[nameprop]=true;} 
    myoptions[nameprop]=value[nameprop];
      }
}

  if (myoptions.unpaused) {$('#pause').show();$('#unpause').hide();kango.ui.browserButton.setIcon('icons/button.png'); }
  else {$('#unpause').show();$('#pause').hide();kango.ui.browserButton.setIcon('icons/buttong.png');}
  $("#titletext span").click(function() { kango.browser.tabs.create({url:kango.getExtensionInfo().homepage_url}); });
  $('#options').click(function (event) {kango.ui.optionsPage.open();window.close();});
  $('#pause').click(function (event) {
    $(this).hide();
    $(this).unbind("click");
    $('#unpause').show();
    myoptions["unpaused"]=false;
    kango.invokeAsync('kango.storage.setItem',"options",myoptions);
    kango.ui.browserButton.setIcon('icons/buttong.png');
    if (myoptions.tab_refresh) {
     kango.browser.tabs.getAll(function(tabs) {
             for(var i = 0; i < tabs.length; i++){
                if (tabs[i].getUrl().search("http://www.ereality.ru") != -1)
                 tabs[i].navigate(tabs[i].getUrl());
              }  
          });
     }
     KangoAPI.closeWindow();
  });
  $('#unpause').click(function (event) {
    $(this).hide();
    $(this).unbind("click");
    $('#pause').show();
    myoptions["unpaused"]=true;
    kango.invokeAsync('kango.storage.setItem',"options",myoptions);
    kango.ui.browserButton.setIcon('icons/button.png');
    if (myoptions.tab_refresh) {
          kango.browser.tabs.getAll(function(tabs) {
             for(var i = 0; i < tabs.length; i++){
              if (tabs[i].getUrl().search("http://www.ereality.ru") != -1)
                tabs[i].navigate(tabs[i].getUrl());
              }  
          });
     }
    KangoAPI.closeWindow();

  });
  });

//=========================end.
 });