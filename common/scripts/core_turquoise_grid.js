// function(cellX,cellY){return{x:cellX*this.cellWidth+this.cellWidth/2*(cellY%2),y:cellY*this.cellHeight/2}}
//

var script_turquoise_grid = "(" +
    (function() {
        var turquoiseGridConfig = {
            'sectors': [
                {x: 12, y: 321},
                {x: 13, y: 321},
                {x: 14, y: 321},
                {x: 15, y: 321},
                {x: 16, y: 321},
                {x: 17, y: 321},
                {x: 18, y: 321},
                {x: 19, y: 321},
                {x: 13, y: 322},
                {x: 14, y: 322},
                {x: 15, y: 322},
                {x: 16, y: 322},
                {x: 17, y: 322},
                {x: 18, y: 322},
                {x: 19, y: 322},
                {x: 20, y: 322},
                {x: 12, y: 323},
                {x: 13, y: 323},
                {x: 14, y: 323},
                {x: 15, y: 323},
                {x: 16, y: 323},
                {x: 17, y: 323},
                {x: 18, y: 323},
                {x: 19, y: 323},
                {x: 13, y: 324},
                {x: 14, y: 324},
                {x: 15, y: 324},
                {x: 16, y: 324},
                {x: 17, y: 324},
                {x: 18, y: 324},
                {x: 19, y: 324},
                {x: 20, y: 324},
                {x: 12, y: 325},
                {x: 13, y: 325},
                {x: 14, y: 325},
                {x: 15, y: 325},
                {x: 16, y: 325},
                {x: 17, y: 325},
                {x: 18, y: 325},
                {x: 19, y: 325},
                {x: 13, y: 326},
                {x: 14, y: 326},
                {x: 15, y: 326},
                {x: 16, y: 326},
                {x: 17, y: 326},
                {x: 18, y: 326},
                {x: 19, y: 326},
                {x: 20, y: 326},
                {x: 12, y: 327},
                {x: 13, y: 327},
                {x: 14, y: 327},
                {x: 15, y: 327},
                {x: 16, y: 327},
                {x: 17, y: 327},
                {x: 18, y: 327},
                {x: 19, y: 327},
                {x: 13, y: 328},
                {x: 14, y: 328},
                {x: 15, y: 328},
                {x: 16, y: 328},
                {x: 17, y: 328},
                {x: 18, y: 328},
                {x: 19, y: 328},
                {x: 20, y: 328},
                {x: 12, y: 329},
                {x: 13, y: 329},
                {x: 14, y: 329},
                {x: 15, y: 329},
                {x: 16, y: 329},
                {x: 17, y: 329},
                {x: 18, y: 329},
                {x: 19, y: 329},
                {x: 13, y: 330},
                {x: 14, y: 330},
                {x: 15, y: 330},
                {x: 16, y: 330},
                {x: 17, y: 330},
                {x: 18, y: 330},
                {x: 19, y: 330},
                {x: 20, y: 330},
                {x: 12, y: 331},
                {x: 13, y: 331},
                {x: 14, y: 331},
                {x: 15, y: 331},
                {x: 16, y: 331},
                {x: 17, y: 331},
                {x: 18, y: 331},
                {x: 19, y: 331},
                {x: 13, y: 332},
                {x: 14, y: 332},
                {x: 15, y: 332},
                {x: 16, y: 332},
                {x: 17, y: 332},
                {x: 18, y: 332},
                {x: 19, y: 332},
                {x: 20, y: 332},
            ]
        }

        var turquoiseGridClass = function(mainFrame, config) {
            this.mainFrame = mainFrame;
            this.config = config;
            this.overlay = null;

            var self = this;

            this.usersMoved = function() {
                var map = self.mainFrame.contents().find('div#container #mapContent');

                if (map.length == 0) {
                    return;
                }

                var overlay = self.getOverlay(map);
                self.moveCellsToPosition(overlay);

                map.append(self.overlay);
            }

            this.moveCellsToPosition = function(overlay) {
                overlay.children().each(function() {
                    var footstep = $(this);

                    var sectorPositions = main.Map.globalCoordsToRelative(
                        main.Map.getCellGlobalCoords(footstep.attr('sectorX'), footstep.attr('sectorY'))
                    );

                    footstep.css({
                        left: sectorPositions.x + "px",
                        top: sectorPositions.y + "px"
                    });
                });
            }

            this.getOverlay = function(map) {
                if (!self.overlay) {
                    self.overlay = $('<div class="overlay"></div>');

                    for (var i in self.config['sectors']) {
                        self.overlay.append(self.getCell(
                            self.config['sectors'][i]['x'],
                            self.config['sectors'][i]['y']
                        ))
                    }
                }

                return self.overlay;
            }

            this.getCell = function(positionX, positionY) {
                return $('<div sectorX="' + positionX + '" sectorY="' + positionY + '"></div>').css({
                    position: 'absolute',
                    height: '32px',
                    width: '64px',
                    lineHeight: '32px',
                    textAlign: 'center',
                    zIndex: '30',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    opacity: '0.6',
                    color: '#222',
                    textShadow: '0 0 5px #eee',
                    'background-image': 'url(turquoise_grid.png)'
                });
            }
        }

        $(document).ready(function() {
            var erExtMainFraime = $('#main');

            var turquoiseGrid = new turquoiseGridClass(erExtMainFraime, turquoiseGridConfig);

            erExtMainFraime.on('load', function() {
                if (user.place2 == 25) {
                    turquoiseGrid.usersMoved();
                }
            });
        });
    }).toString() + ")();";