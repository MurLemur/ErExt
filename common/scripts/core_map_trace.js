var script_map_trace = "(" +
	(function() {
		var chest = {};
		chest.sectorOK = []; // двумерный массив прошедших секторов OK
		chest.sectoraliens = [];
		chest.sectorOVL = [];
		chest.sectorOPP = [];
		chest.sectorODL = [];
		chest.sectorTO = [];
		$("#span_mode5").children().on("click", function() {
			if (chest.sectoraliens.length > 0) chest.sectoraliens = [];
			if (chest.sectorODL.length > 0) chest.sectorODL = [];
		})

		// поиск в массиве
		chest.search = function(s, mas) {
			if (mas.indexOf) { // если метод существует
				return mas.indexOf(s);
			}


			for (var i = 0; i < mas.length; i++) {
				if (mas[i] === s) return i;
			}

			return -1;
		}
		//  координаты 
		chest.getSectorPosition = function(x, y, newmap) {
			if (newmap) {
				Point = main.Map.globalCoordsToRelative(main.Map.getCellGlobalCoords(x, y))
				PointX = Point.x;
				PointY = Point.y;
			} else {
				var dx, dy;
				if (x && y) {
					dx = (main.px - x) * 64 - (Math.abs(main.py - y) % 2) * 32 + (Math.abs(main.py - y) % 2) * (main.py % 2) * 64;
					dy = (main.py - y) * 16;
					PointX = main.CenterX - dx;
					PointY = main.CenterY - dy;
				}
			}
			return 'top:' + PointY + 'px; left:' + PointX + 'px;';
		}
		chest.init = function(map_mas, cur_mas, newmap) {
			if (newmap) {
				var map_div = $('#main').contents().find('div#container #mapContent');
			} else {
				var map_div = $('#main').contents().find('div#container #map_div');
			}

			if (map_div && map_mas) {
				var overlay = $('<div id="overlay"></div>');
				map_div.append(overlay);
				overlay.attr('style', map_div.find('div:first').attr('style')).css({
					zIndex: '3'
				});


				for (i = 0; i < map_mas.length; i++) {
					if (chest.search(map_mas[i][0] + ':' + map_mas[i][1], cur_mas) != -1)
						overlay.append('<div class="point activ" style="position:absolute; ' + chest.getSectorPosition(map_mas[i][0], map_mas[i][1], newmap) + '"><span>' + map_mas[i][0] + ':' + map_mas[i][1] + '</span></div>');
				}

				overlay.find('.point.activ').css({
					height: '32px',
					width: '64px',
					lineHeight: '32px',
					textAlign: 'center',
					zIndex: '10',
					fontSize: '10px',
					fontWeight: 'bold',
					opacity: '0.6',
					color: '#222',
					textShadow: '0 0 5px #eee'
				}).css('background-image', 'url(sec_red.png)');
				return true;
			} else {
				return false;
			}
		}

		chest.map_trace_handler = function() {
			// если сектора нет в массиве и map определена (main.map работает на ОК, альенах и КТ вроде бы, так что может еще какую то проверку не знаю)

			if (user.coldX != "0,0") {
				var current_mas = chest.sectorODL;
				var map_mas = main.map;
				var newmap = false;
			} else if (user.place2 == 8) {
				var current_mas = chest.sectorOK;
				var map_mas = main.map;
				var newmap = false;
			} else if (user.place2 == 1) {
				var current_mas = chest.sectorOVL;
				var map_mas = main.Map.sectors;
				var newmap = true;
			} else if (user.place2 == 3) {
				var current_mas = chest.sectorOPP;
				var map_mas = main.Map.sectors;
				var newmap = true;
			} else if (user.place2 == 14) {
				var current_mas = chest.sectorTO;
				var map_mas = main.Map.sectors;
				var newmap = true;
			} else if ((user.place2 > 19) && (user.place2 < 100)) {
				var current_mas = chest.sectoraliens;
				var map_mas = main.map;
				var newmap = false;

				//Следы для тиммейтов
				var teammate_trace = false;
				if (teammate_trace)
					$.each(main.placeHeroes, function(key, places) {
						msector = places.x + ':' + places.y;
						if (chest.search(msector, current_mas) == -1 && map_mas)
							current_mas.push(msector);
					});

			} else return;
			msector = main.px + ':' + main.py;
			if (chest.search(msector, current_mas) == -1 && map_mas)
				current_mas.push(msector);
			chest.init(map_mas, current_mas, newmap);
		}

		$("img[src*=footprint]").on('click', function() {
			setTimeout(
				function() {
					if ($("img[src*=footprint_on]").length == 1) {
						// привязываем событие
						$('#main').on('load.chest', chest.map_trace_handler);
					} else {
						$('#main').off('load.chest', chest.map_trace_handler);
					}
				}, 100);

		})
	}).toString() + ")();";