	var estateVictimsListViewerClass = function(estateVictimsList, popup) {
		this.estateVictimsList = estateVictimsList;
		this.popup = popup;
		
		this.isVisible = false;
		
		this.mainHolder = $('<table></table>');
		this.victimsHolder = $('<table></table>');
		
		this.victimNameInput = null;
		this.addButton = null;
		this.closeButton = null;		
		
		this.victimsAmount = null;
		
		var self = this;
		
		this.init = function() {
			self.initForm();
			self.initListeners();
		}
		
		this.initForm = function() {
			self.mainHolder.append(self.buildTop())
				.append(self.buildMiddle())
				.append(self.buildBottom());		
		};
		
		this.initListeners = function() {
			self.closeButton.on('click', function() {
				self.closeButton.attr('src', kango.io.getResourceUrl("res/icon_close.gif"));
				self.hide();
			}).hover(function() {
				self.closeButton.attr('src', kango.io.getResourceUrl("res/icon_close_hover.gif"));
			}, function() {
				self.closeButton.attr('src', kango.io.getResourceUrl("res/icon_close.gif"));
			});		
		
			self.victimAddButton.on('click', function() {			
				self.processAddVictimClick(self.victimNameInput.val())
			});
		};
		
		this.buildTop = function() {
			var victimsAmountHolder = $('<span></span>').css(
				{'font-size': '12px',
					'text-decoration': 'none',
					'font-family': 'Verdana,Arial,sans-serif',
					'color': '#000000',
					'line-height': '14px',
					'margin-right': '7px'});
					
			self.victimsAmount = $('<span></span>').html(self.estateVictimsList.getCurrentVictimsAmount());
			
			victimsAmountHolder.append(self.victimsAmount).append($('<span> из ' + self.estateVictimsList.getMaxVictimsAmount() + '</span>'));
			self.closeButton = $('<img src="' + kango.io.getResourceUrl("res/icon_close.gif") + '"></img>');
			
			var topTr = $('<tr></tr>');
			var topTd = $('<td colspan=\"2\" align=\"right\"></td>')
				.append(victimsAmountHolder)
				.append(self.closeButton);			

			return topTr.append(topTd);
		};
		
		this.buildMiddle = function() {
			var bottomTd = $('<td colspan=\"2\" align="center"></td>').append(self.victimsHolder);
			
			return $('<tr></tr>').append(bottomTd);
		};
		
		this.buildBottom = function() {
			self.victimNameInput = $('<input type="text"></input>');
			self.victimAddButton = $("<img title=\"Добавить\" src=\"" + kango.io.getResourceUrl("res/estate-victim-add-victim.png") + "\">");
		
			var bottomTr = $('<tr></tr>');
			var leftTd = $('<td></td>').append(self.victimNameInput);
			var rightTd = $('<td></td>').append(self.victimAddButton);
			
			return bottomTr.append(leftTd).append(rightTd);
		};
		
		this.processAddVictimClick = function(victimName) {
			if (self.estateVictimsList.addVictim(victimName)) {		
				self.victimsHolder.append(
					self.buildVictimListItem(victimName)
				);
				
				self.victimsAmount.html(self.estateVictimsList.getCurrentVictimsAmount());
			}
		};
		
		this.buildVictimListItem = function(victimName) {
			var victimTr = $('<tr></tr>');
			
			var attackButton = $("<img title=\"Атаковать\" src=\"" + kango.io.getResourceUrl("res/estate-attack.jpg") + "\">").css({'margin-left': '5px'}).on('click', function() {
				self.attackVictim(victimName);	
				return false;
			});
			
			var deleteButton = $("<img title=\"Удалить\" src=\"" + kango.io.getResourceUrl("res/estate-delete.png") + "\">").css({'margin-left': '5px'}).on('click', function() {  
				self.estateVictimsList.removeVictim(victimName);
				$(this).parent().parent().remove();	
				
				self.victimsAmount.html(self.estateVictimsList.getCurrentVictimsAmount());
				return false;
			});			
						
			var victimNameTd = $('<td><a href="http://yo-bod.com/library/modules/estate/?name=' + victimName + '" target="_blank">' + victimName + '</a></td>');
			var attackTd = $('<td></td>').append(attackButton);
			var deleteTd = $('<td></td>').append(deleteButton);
			
			victimTr.append(victimNameTd)
				.append(attackTd)
				.append(deleteTd);
			
			return victimTr;			
		};
		
		this.show = function() {
			$.each(self.estateVictimsList.getVictimsList(),  function(key) {
				self.victimsHolder.append(self.buildVictimListItem(key));
			});
			
			self.initListeners();
			self.popup.show(self.mainHolder);
			
			self.isVisible = true;
		};
		
		this.hide = function() {
			self.victimsHolder.empty();
			self.popup.hide();			
			self.isVisible = false;
		};
		
		this.attackVictim = function(victimName) {
			var attackInput = $('#estateAttackHeroField');
			
			if (attackInput.length > 0) { 
				$('#estateAttackHeroField').val(victimName);
				$('#estateAnswer_0')[0].click();
			} else {
				console.log('нету карты');
			}
		};
		
		this.toggleShow = function() {
			if (self.isVisible) {
				self.hide();
				return;
			}		
			
			self.show(); 
		};
	}