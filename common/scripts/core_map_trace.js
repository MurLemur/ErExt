var script_map_trace = "(" +
	(function() {
		var erExtMainFraime = $('#main');
		
		var _chest = function(mainFraime) {
			this.mainFraime = mainFraime;
			this.maps = {
				'ok': {
					overlay: null, 
					footsteps: {},
					mapNew: false 
				},
				'aliens': {
					overlay: null,
					footsteps: {},
					mapNew: false 
				},
				'ovl': {
					overlay: null,
					footsteps: {},
					mapNew: true
				},
				'opp': {
					overlay: null,
					footsteps: {},
					mapNew: true
				},
				'odl': {
					overlay: null,
					footsteps: {},
					mapNew: false
				},
				'to': {
					overlay: null,
					footsteps: {},
					mapNew: true
				}
			};
			
			var self = this;
			
			this.drawOverlay = function(x, y, mapID) {
				if (self.maps[mapID].mapNew) {
					var map_div = self.mainFraime.contents().find('div#container #mapContent');
				} else {
					var map_div = self.mainFraime.contents().find('div#container #map_div');
				}

				if (map_div.length == 0) {
					return;
				}

				var overlay = self.getOverlay(mapID);
				
				self.addFootstep(x, y, mapID, overlay);
				self.moveFootstepsToPositions(overlay, mapID);
				
				map_div.append(overlay);
			};
			
			this.getOverlay = function(mapID) {
				if (self.maps[mapID]['overlay'] == null) {
					self.maps[mapID]['overlay'] = self.initOverlay(self.maps[mapID]['mapNew']);
				}
				
				return self.maps[mapID]['overlay'];
			};
			
			this.initOverlay = function(newmap) {
				var overlay = $('<div></div>');
				
				if (!newmap) {
					overlay.css({'position': 'absolute', 'overflow':'hidden', 'left': '28px', 'top': '22px', 'width':'504px', 'height':'300px'});
				}
				
				return overlay;
			};

			this.getSectorPosition = function(x, y, newmap) {
				if (newmap) {
					Point = main.Map.globalCoordsToRelative(main.Map.getCellGlobalCoords(x, y))
					PointX = Point.x;
					PointY = Point.y;
				} else {
					var dx = (main.px - x) * 64 - (Math.abs(main.py - y) % 2) * 32 + (Math.abs(main.py - y) % 2) * (main.py % 2) * 64;
					var dy = (main.py - y) * 16;
					PointX = main.CenterX - dx;
					PointY = main.CenterY - dy;
				}

				return {
					X: PointX,
					Y: PointY
				};			
			};
			
			this.moveFootstepsToPositions = function(overlay, mapID) {
				overlay.children().each(function() {
					var footstep = $(this);
					
					var sectorPositions = self.getSectorPosition(footstep.attr('sectorX'), footstep.attr('sectorY'), self.maps[mapID].mapNew);
					footstep.css({
						left: sectorPositions.X,
						top: sectorPositions.Y,
					});
				});
			};
			
			this.addFootstep = function(x, y, mapID, overlay) {
				if (self.isFootstepExists(x, y, mapID)) {
					return;
				}
				
				overlay.append(self.getFootprint(x, y, self.maps[mapID].mapNew));				
				self.saveFootstep(x, y, mapID);
			};
			
			this.isFootstepExists = function(x, y, mapID) {
				if (typeof self.maps[mapID]['footsteps'][x] == 'undefined' || typeof self.maps[mapID]['footsteps'][x][y] == 'undefined') {
					return false;
				}
				
				return self.maps[mapID]['footsteps'][x][y];
			};
			
			this.saveFootstep = function(x, y, mapID) {
				if (typeof self.maps[mapID]['footsteps'][x] == 'undefined') {
					self.maps[mapID]['footsteps'][x] = [];
				}
				
				self.maps[mapID]['footsteps'][x][y] = true;
			};
			
			this.getFootprint = function(positionX, positionY, newMap) {
				return $('<div sectorX="' + positionX + '" sectorY="' + positionY + '"><span>' + positionX + ':' + positionY + '</span></div>').css({
					position: 'absolute',
					height: '32px',
					width: '64px',
					lineHeight: '32px',
					textAlign: 'center',
					zIndex: '10',
					fontSize: '10px',
					fontWeight: 'bold',
					opacity: '0.6',
					color: '#222',
					textShadow: '0 0 5px #eee',
					'background-image': 'url(sec_red.png)'
				});
			};
			
			this.userMadeFootstep = function() {
				var mapType = null;
				
				if (user.coldX != "0,0") {
					mapType = 'odl';
				} else if (user.place2 == 8) {
					mapType = 'ok';
				} else if (user.place2 == 1) {
					mapType = 'ovl';
				} else if (user.place2 == 3) {
					mapType = 'opp';
				} else if (user.place2 == 14) {
					mapType = 'to';
				} else if ((user.place2 > 19 && user.place2 < 100)  || (user.place2 > 199 && user.place2 < 310)) {
					mapType = 'aliens';
				}
				
				if (mapType == null) {
					return;
				}
				
				self.drawOverlay(main.px, main.py, mapType);
			};
			
			this.clearOverlay = function(mapID) {
				self.maps[mapID]['footsteps'] = {};
				self.maps[mapID]['overlay'] = null;
			}
			
			// не переписывал, пока выключенно почему-то
			this.footstepsForTeammate = function() {
				/*	
				var teammate_trace = false;
					if (teammate_trace) {
						if (user.place2 == 14) {
							$.each(main.Map.additionalObjects, function(key) {
								var msector = key;
								if (chest.search(msector, current_mas) == -1 && map_mas)
									current_mas.push(msector);
							});	
						} else {
							$.each(main.placeHeroes, function(key, places) {
								var msector = places.x + ':' + places.y;
								if (chest.search(msector, current_mas) == -1 && map_mas)
									current_mas.push(msector);
							});
						}						
					}
				*/
			};
		};
		
		var chest = new _chest(erExtMainFraime);

		// Храмы на ОК
		var startOKsectors = [[5,259],[5,260],[5,261],[6,260],[8,249],[8,250],[8,251],[9,250],[14,251],[14,252],[14,253],[15,252],[15,263],[15,264],[15,265],[16,264],[11,258],[11,259],[11,260],[10,259],[10,270],[10,271],[10,272],[9,271]]; 
		$.each(startOKsectors, function(index, value) {
				chest.addFootstep(value[0],value[1],"ok", chest.getOverlay("ok"));
				chest.moveFootstepsToPositions(chest.getOverlay("ok"),"ok");
			});
		$("span:contains('6:260')",chest.getOverlay("ok")).parent().css('background-image', 'url(sec_avto)');
		$("span:contains('8:249')",chest.getOverlay("ok")).parent().css('background-image', 'url(sec_avto)');
		$("span:contains('10:271')",chest.getOverlay("ok")).parent().css('background-image', 'url(sec_avto)');
		$("span:contains('15:252')",chest.getOverlay("ok")).parent().css('background-image', 'url(sec_avto)');
		$("span:contains('16:264')",chest.getOverlay("ok")).parent().css('background-image', 'url(sec_avto)');


		$("#span_mode5").children().on("click", function() {
			chest.clearOverlay('aliens');
			chest.clearOverlay('odl');
		});				


		$("img[src*=footprint]").on('click', function() {
			setTimeout(
				function() {
					if ($("img[src*=footprint_on]").length == 1) {
						// привязываем событие
						erExtMainFraime.on('load', chest.userMadeFootstep);
					} else {
						erExtMainFraime.off('load', chest.userMadeFootstep);
					}
				}, 100);

		})
	}).toString() + ")();";