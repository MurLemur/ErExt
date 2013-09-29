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
 opt=kango.storage.getItem('options');
 if (opt.unpaused!=false) {opt.unpaused=true;} 
 if (opt.unpaused) {kango.ui.browserButton.setIcon('icons/button.png') }
 else {kango.ui.browserButton.setIcon('icons/buttong.png');}

