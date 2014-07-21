	var estateVictimsListViewerClass = function(estateVictimsList, popup, css) {
		this.estateVictimsList = estateVictimsList;
		this.popup = popup;
		this.css = css;
		
		this.isVisible = false;
		
		this.mainHolder = $('<table></table>');
		this.victimsHolder = $('<table></table>').css(this.css.victimsHolder);
		
		this.victimNameInput = null;
		this.victimCommentInput = null;
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
				self.closeButton.attr('src', self.css.closeButtonImg);
				self.hide();
			}).hover(function() {
				self.closeButton.attr('src', self.css.closeButtonHoverImg);
			}, function() {
				self.closeButton.attr('src', self.css.closeButtonImg);
			});		
		
			self.victimAddButton.on('click', function() {			
				self.processAddVictimClick(self.victimNameInput, self.victimCommentInput);
			});
		};
		
		this.buildTop = function() {
			var victimsAmountHolder = $('<span></span>').css(self.css.amountHolder);
					
			self.victimsAmount = $('<span></span>').html(self.estateVictimsList.getCurrentVictimsAmount());
			
			victimsAmountHolder.append(self.victimsAmount).append($('<span> из ' + self.estateVictimsList.getMaxVictimsAmount() + '</span>'));
			self.closeButton = $('<img src="' + self.css.closeButtonImg + '"></img>').css(self.css.closeButton);
			
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
			self.victimNameInput = $('<input type="text" title="Имя жертвы"></input>').css(self.css.victimNameInput);
			self.victimCommentInput = $('<input type="text" title="Комментарий"></input>').css(self.css.victimCommentInput);
			
			self.victimAddButton = $("<img title=\"Добавить\" src=\"" + self.css.addVictimButtonImg + "\">");
					
			var bottomTr = $('<tr></tr>');
			var leftTd = $('<td align="right"></td>').append(self.victimNameInput).append($('<br>')).append(self.victimCommentInput);
			var rightTd = $('<td></td>').append(self.victimAddButton);
			
			return bottomTr.append(leftTd).append(rightTd);
		};
		
		this.processAddVictimClick = function(victimNameInput, commentInput) {
			var victimName = victimNameInput.val();
			var comment = commentInput.val();
			if (self.estateVictimsList.addVictim(victimName, comment)) {		
				self.victimsHolder.append(
					self.buildVictimListItem(victimName, comment)
				);
				
				self.victimsAmount.html(self.estateVictimsList.getCurrentVictimsAmount());
				victimNameInput.val('');
				commentInput.val('');
			}
		};
		
		this.processDeleteVictimClick = function (victimName, button) {
			self.estateVictimsList.removeVictim(victimName);
			$(button).parent().parent().remove();	
			
			self.victimsAmount.html(self.estateVictimsList.getCurrentVictimsAmount());
		};
		
		this.buildVictimListItem = function(victimName, comment) {
			var victimTr = $('<tr></tr>');
			
			var attackButton = $("<img title=\"Атаковать\" src=\"" + self.css.attackButtonImg + "\">").css(self.css.attackButton).on('click', function() {
				self.processAttackVictimClick(victimName);	
			});
			
			var deleteButton = $("<img title=\"Удалить\" src=\"" + self.css.deleteButtonImg + "\">").css(self.css.deleteButton).on('click', function() {
				self.processDeleteVictimClick(victimName, this);
			});			
			
			var victimNameLink = $('<a href="http://order.ereality.ru/viewpage.php?page_id=43&name=' + victimName + '" target="_blank">' + victimName + '</a>').css(self.css.victimNameLink);
			var victimCommentDiv = $('<div>' + comment + '</div>').css(self.css.victimCommentDiv);
			
			var victimNameTd = $('<td></td>').append(victimNameLink).append(victimCommentDiv);
			var attackTd = $('<td></td>').append(attackButton);
			var deleteTd = $('<td></td>').append(deleteButton);
			
			victimTr.append(victimNameTd)
				.append(attackTd)
				.append(deleteTd);
			
			return victimTr;			
		};
		
		this.show = function(positionX, positionY) {
			$.each(self.estateVictimsList.getVictimsList(),  function(key) {
				self.victimsHolder.append(self.buildVictimListItem(key, this.comment));
			});
			
			self.initListeners();
			self.popup.show(self.mainHolder).move(positionX, positionY, 0, 0);;
			
			self.isVisible = true;
		};
		
		this.hide = function() {
			self.victimsHolder.empty();
			self.popup.hide();			
			self.isVisible = false;
		};
		
		this.processAttackVictimClick = function(victimName) {
			var attackInput = $('#estateAttackHeroField');
			
			if (attackInput.length > 0) { 
				$('#estateAttackHeroField').val(victimName);
				$('#estateAnswer_0')[0].click();
			} 
		};
		
		this.toggleShow = function(positionX, positionY) {
			if (self.isVisible) {
				self.hide();
				return;
			}		
			
			self.show(positionX, positionY); 
		};
	}