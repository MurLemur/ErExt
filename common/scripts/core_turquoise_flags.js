// function(cellX,cellY){return{x:cellX*this.cellWidth+this.cellWidth/2*(cellY%2),y:cellY*this.cellHeight/2}}
//

var script_turquoise_flags = "(" +
    (function() {
        var turquoiseFlagsClass = function(mainFrame) {
            this.mainFrame = mainFrame;
            this.overlay = null;

            this.flags = {};

            var self = this;

            this.init = function() {
                self.getOverlay();

                self.loadFlags();
                self.updateFlags();

                return self;
            }

            this.usersMoved = function() {
                var map = self.mainFrame.contents().find('#mapContent');

                if (map.length == 0) {
                    return;
                }

                var overlay = self.getOverlay();

                if (typeof localStorage['turquoise_flags_update'] == 'undefined' ||
                    localStorage['turquoise_flags_update'] == 'true') {

                    localStorage['turquoise_flags_update'] = false;

                    self.loadFlags();
                    self.updateFlags();
                }

                if (typeof localStorage['turquoise_flags_cleared'] != 'undefined' &&
                    localStorage['turquoise_flags_cleared'] == 'true' ) {
                    localStorage['turquoise_flags_cleared'] = false;

                    self.clear();
                }

                self.moveCellsToPosition();
                self.moveCellsToPosition(overlay);

                map.append(self.overlay);
            }

            this.clear = function() {
                self.flags = {};
                self.overlay = null;
            }

            this.moveCellsToPosition = function() {
                for (var x in self.flags) {
                    for (var y in self.flags[x]) {
                        var currentFlag = self.flags[x][y];

                        var sectorPositions = main.Map.globalCoordsToRelative(
                            main.Map.getCellGlobalCoords(x, y)
                        );

                        currentFlag['block'].css({
                            left: sectorPositions.x + "px",
                            top: sectorPositions.y + "px"
                        })
                    }
                }
            }

            this.loadFlags = function() {
                var turquoiseFlags = localStorage['turquoise_flags'];
                if (typeof turquoiseFlags != "undefined") {
                    turquoiseFlags = JSON.parse(turquoiseFlags);
                }
                else {
                    turquoiseFlags = {};
                }

                for (var x in turquoiseFlags) {
                    for (var y in turquoiseFlags[x]) {
                        if (typeof self.flags[x] == 'undefined') {
                            self.flags[x] = {};
                        }

                        if (typeof self.flags[x][y] == 'undefined') {
                            self.flags[x][y] = {
                                'block': null
                            };
                        }

                        self.flags[x][y]['percents'] = turquoiseFlags[x][y];
                    }
                }
            }

            this.updateFlags = function() {
                for (var x in self.flags) {
                    for (var y in self.flags[x]) {
                        var currentFlag = self.flags[x][y];

                        if (!currentFlag['block']) {
                            var flag = self.getCell();
                            currentFlag['block'] = flag;

                            self.overlay.append(flag);
                        }

                        currentFlag['block'].find('p').text(currentFlag['percents'] + '%');
                    }
                }
            }

            this.getOverlay = function() {
                if (!self.overlay) {
                    self.overlay = $('<div class="flags_overlay"></div>');
                }

                return self.overlay;
            }

            this.getCell = function() {
                return $('<div></div>').css({
                    position: 'absolute',
                    height: '32px',
                    width: '64px',
                    lineHeight: '32px',
                    textAlign: 'center',
                    zIndex: '41',
                    fontWeight: 'bold',
                    'font-size': '8px',
                    'color': '#ffffff',
                    'font-weight': '200',
                    textShadow: '0 0 5px #eee'
                }).append(
                    $('<p></p>').css({
                        'margin-top': '5px'
                    })
                );
            }
        }


        $(document).ready(function() {
            var erExtMainFraime = $('#main');
            var turquoiseFlags = new turquoiseFlagsClass(erExtMainFraime).init();
            var malachiteFlags = new turquoiseFlagsClass(erExtMainFraime).init();

            erExtMainFraime.on('load', function() {
                if (user.place2 == 25) {
                    turquoiseFlags.usersMoved();
                }

                if (user.place2 == 28) {
                    malachiteFlags.usersMoved();
                }
            });
        });
    }).toString() + ")();";