var forumAuthorNameIgnoreClass = function(tools, preset) {
    this.preset = preset;
    this.tools = tools;
    this.subForm = $('.SubForum');
    this.replace;

    var self = this;

    this.init = function() {
        this.initReplace();
        this.hideIgnored();
    }

    this.hideIgnored = function() {
        self.subForm.find('.tdLastMessage b').each(function() {
            var b = $(this);

            if (self.tools.isIgnored(b.text())) {
                var bParent = b.parent();
                var timeSpan = bParent.find('span');

                bParent.html("От: <b>" + self.replace.name + "</b><br/>").append(timeSpan);
            }
        });

        self.subForm.find('.tdTopStarter b').each(function() {
            var b = $(this);
            if (self.tools.isIgnored(b.text())) {
                b.parent().html($("<b>" + self.replace.name + "</b>"));
            }
        });
    }

    this.initReplace = function() {
        self.replace = self.tools.getPreset(self.preset);
    }
}