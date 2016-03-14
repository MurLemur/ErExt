var messageRecorderClass = function(popup, chatMsgSelector, openImg, flagsCss, builderCss, size) {
    this.popup = popup;
    this.chatMsgSelector = chatMsgSelector;
    this.size = size;

    this.css = flagsCss;
    this.builderCss = builderCss;

    this.openImg = openImg;

    this.view;
    this.hideTimer;

    this.closeButtonId = "er-ext-close-button";
    this.clearLinkId = "er-ext-clear-link";
    this.runLinkId = "er-ext-run-link";

    this.recordedMessages = {};
    this.messagesHolder;

    this.inProcess = false;

    var self = this;
    this.init = function() {
        if (typeof localStorage['message_recorder_run'] != 'undefined') {
            self.inProcess = localStorage['message_recorder_run'] == 'true';
        }

        if (self.inProcess) {
            self.openImg.attr('src', self.builderCss.openLinkActiveImg);
        }

        self.initMessageHolder();

        this.prepareView();
    };

    this.prepareView = function() {
        this.view = $("<table></table>").css(self.css.textStyle);
        this.view.append(this.getExitButton());

        this.view.append($('<tr><td align=\"center\"><hr></td></tr>'));

        var holder = $('<tr><td></td></tr>');
        holder.children().append(self.messagesHolder);

        this.view.append(holder);

        this.view.append($('<tr><td align=\"center\"><hr></td></tr>'));
        this.view.append(this.getBottomPanel());
    };

    this.initMessageHolder = function() {
        var height = parseInt(size.height);
        var width = parseInt(size.width);

        if (height < 0) {
            height = 400;
        }

        if (width < 0) {
            width = 900;
        }

        self.messagesHolder = $('<div></div>').css({
            'max-width': width + 'px',
            'width': width + 'px',
            'max-height': height + 'px',
            'overflow-y': 'auto'
        });
    }

    this.show = function(positionX, positionY) {
        this.bindListeners();

        self.loadMessages();

        self.messagesHolder.html('');
        if (self.recordedMessages.length > 0) {
            for(var i in self.recordedMessages) {
                var message = self.recordedMessages[i];

                var timeColor = !message['isReaded'] ? 'F99' : '8BB964';

                var div = $("<div></div>").append('<span class="nickToChat" style="background-color:#' + timeColor + '; cursor:pointer;" date-id="' + i + '">' + message['time'] + '</span> ' +
                    '<span style="font-weight: 700;" class="nickName">' + message['author'] + '</span> для [' + message['toNames'] + ']: ' +
                    '<span style="color: #' + message['color'] + '">' +
                message['message'] + '</span>');

                self.messagesHolder.prepend(div);
                self.recordedMessages[i]['isReaded'] = true;
            }
        } else {
            self.messagesHolder.html('<div align="center">Сообщений нет</div>');
        }

        self.saveMessages();

        this.popup.show(this.view).move(this.calculatePositionX(positionX), this.calculatePositionY(positionY), 0, 0);

        return this;
    };

    this.loadMessages = function() {
        var recordedMessages = localStorage['recordedMessages'];

        if (typeof recordedMessages != "undefined") {
            this.recordedMessages = JSON.parse(recordedMessages);
        }
        else {
            this.recordedMessages = [];
        }
    }

    this.saveMessages = function() {
        localStorage['recordedMessages'] = JSON.stringify(this.recordedMessages);
    }

    this.calculatePositionX = function(x) {
        return x -= this.view.width();
    };

    this.calculatePositionY = function(y) {
        return y -= this.view.height();
    };

    this.hide = function() {
        this.popup.hide();
        this.clearHideTimer();

        return this;
    };

    this.bindListeners = function() {
        self.view.find("#" + this.clearLinkId).on("click", function(){
            self.clear();
            self.messagesHolder.html('<div align="center">Сообщений нет</div>');
        });

        self.view.find('#' + this.runLinkId).on("click",  function() {
            self.run($(this));
        });

        this.view.find("#" + this.closeButtonId).on("click", function() {
            $(this).attr("src", self.css.iconClose);
            self.hide();
        }).hover(function() {
            $(this).attr("src", self.css.iconCloseHover);
        }, function() {
            $(this).attr("src", self.css.iconClose);
        });

        this.messagesHolder.on('click', '.nickToChat', function() {
            var message = self.recordedMessages[$(this).attr('date-id')];

            $(self.chatMsgSelector).val('[' + message['author'] + '] ');
        });
    };

    this.getRunLink = function() {
        var link = $("<img id=\"" + this.runLinkId + "\" title=\"Запустить/Остановить\">")
            .css(self.css.runLink);

        if (self.inProcess) {
            return link.attr('src', self.css.iconStop);
        }

        return link.attr('src', self.css.iconRun);
    };

    this.getExitButton = function() {
        return $("<tr><td align=\"right\"><img id=\"" + this.closeButtonId + "\" src=\"" + self.css.iconClose + "\"></td></tr>");
    };

    this.getClearLink = function() {
        return $("<img src=\"" + self.css.iconClear +  "\" id=\"" + this.clearLinkId + "\" title=\"Очистить\">")
            .css(self.css.clearLink);
    }

    this.getBottomPanel = function() {
        var panel = $('<tr><td align=\"center\"></td></tr>');
        panel.children()
            .append(this.getRunLink())
            .append(this.getClearLink());

        return panel;
    }

    this.clear = function() {
        delete localStorage['recordedMessages'];
    }

    this.run = function(runLink) {
        if (self.inProcess) {
            self.inProcess = false;
            localStorage['message_recorder_run'] = false;

            openImg.attr('src', self.builderCss.openLinkImg);
            runLink.attr('src', self.css.iconRun);
        }
        else {
            self.inProcess = true;
            localStorage['message_recorder_run'] = true;
            openImg.attr('src', self.builderCss.openLinkActiveImg);
            runLink.attr('src', self.css.iconStop);
        }
    }

    this.hideAfter = function(hideTime) {
        this.initHideTimer(hideTime);

        this.view.hover(function() {
            self.clearHideTimer();
        }, function() {
            self.initHideTimer(hideTime);
        });

        return this;
    };

    this.initHideTimer = function(hideTime) {
        this.hideTimer = setTimeout(function(){
            self.hide();
        }, hideTime);
    };

    this.clearHideTimer = function() {
        clearTimeout(this.hideTimer);
    };
}