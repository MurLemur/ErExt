function MyExtension() {
  var self = this;
  kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function() {
    self._onCommand();
  });
}

MyExtension.prototype = {

  _onCommand: function() {
    kango.ui.optionsPage.open();
  }
};

var extension = new MyExtension();
try {
  opt = kango.storage.getItem('options');
  if (opt.unpaused != false) {
    opt.unpaused = true;
  }
  if (opt.unpaused) {
    kango.ui.browserButton.setIcon('icons/button.png')
  } else {
    kango.ui.browserButton.setIcon('icons/buttong.png');
  }
} catch (e) {
  var opt = {
    "startup_update_notification": "true"
  }
}

// Проверка наличия новой версии
var details = {
  method: 'GET',
  url: 'http://news.ereality.ru/client/ver.txt',
  async: true,
  contentType: 'text'
};
kango.xhr.send(details, function(data) {
  if (data.status == 200 && data.response != null) {
    var text = data.response;
    if (+text > 11) {
      kango.ui.browserButton.setIcon('icons/grumpy.png');
      if (opt.startup_update_notification != false) {
        try {
          Notification.permission = "granted";
          var n = new Notification("Ereality Extension", {
            "body": "На форуме выложена новая версия плагина!",
            "icon": kango.io.getResourceUrl("icons/icon48.png")
          });
        } catch (e) {}
      }
    }
  } // типо проверки на новую версию
  else { // something went wrong
    kango.console.log('something went wrong');
  }
});

kango.addMessageListener(messagingEnum.lotteryToBackground, function(event) {
  kango.browser.tabs.getAll(function(tabs) {
    $.each(tabs, function() {
       if (this.getUrl().search("http://www.ereality.ru/core") != -1) this.dispatchMessage(messagingEnum.lotteryToContent, event.data);
       });
  });
});