var script_presents2016 = "(" +
	(function() {
			mAj = function(_params, fn) {

				$.ajax({
					type: "POST",
					url: "/ajax/json.php",
					data: _params,
					dataType: "json",
					processData: false,
					success: fn
				});

			}

			PV = function() {
				if ($('#myCloseButt').css("display")=="block") {
					ClearPV();
					return;
				}	
				$('#mur_present_container').show();
				$('#myCloseButt').show();
				var _params = '{"controller":"inventory","action":"controlPresents","params":{"sort":"3","direction":0},"client":1}',
					fn = function(data) {
						var getIt = 0;
						if ('response' in data) {
							if ('presents' in data.response) {
								getIt = 1;
								var ob = data.response.presents;
							}
						}

						if (getIt > 0) {
							var i = ob.length,
								tblTpl = '';
							for (p in ob) {
								i--;
								$('#good_patt').append(getTblTpl(ob[p], i, ob.length));;
							}
							$('#best_patt').html('Всего ' + ob.length + ' не вскрытых подарков');
						} else {
							$('#best_patt').html('Ничего нет или ошибка........');
						}
					};

				mAj(_params, fn);
			}

			getTblTpl = function(p, i, cnt) {

				p.buttons = '';

				if (p.desc == 'Огромный Подарок') {
					p.buttons += '<input type="button" class="invbutt" value="Клубок" onClick="Javascript:getPresent(0, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="ЗЗГ" onClick="Javascript:getPresent(2, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Мирка" onClick="Javascript:getPresent(3, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Умелка" onClick="Javascript:getPresent(4, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Звёзды" onClick="Javascript:getPresent(5, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Страница" onClick="Javascript:getPresent(7, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Ослик 20д." onClick="Javascript:getPresent(6, ' + p.id + ', this,1)">';
					p.buttons += '<input type="button" class="invbutt" value="Удочка III" onClick="Javascript:getPresent(1, ' + p.id + ', this,13240)">';
					p.buttons += '<input type="button" class="invbutt" value="Клетка III" onClick="Javascript:getPresent(1, ' + p.id + ', this,13239)">';
					p.buttons += '<input type="button" class="invbutt" value="Кирка Г. III" onClick="Javascript:getPresent(1, ' + p.id + ', this,1506)">';
					p.buttons += '<input type="button" class="invbutt" value="Нож III" onClick="Javascript:getPresent(1, ' + p.id + ', this,13252)">';
			
				} else if (p.desc == 'Большой Подарок') {
					p.buttons += '<input type="button" class="invbutt" value="-----" onClick="Javascript:getPresent(-1, -1, this)">';
					p.buttons += '<input type="button" class="invbutt" value="ЗЗГ" onClick="Javascript:getPresent(1, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Мирка" onClick="Javascript:getPresent(2, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Умелка" onClick="Javascript:getPresent(3, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Звёзды" onClick="Javascript:getPresent(4, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Страница" onClick="Javascript:getPresent(6, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Ослик 10д." onClick="Javascript:getPresent(5, ' + p.id + ', this,1)">';
					p.buttons += '<input type="button" class="invbutt" value="Удочка II" onClick="Javascript:getPresent(0, ' + p.id + ', this,13216)">';
					p.buttons += '<input type="button" class="invbutt" value="Клетка II" onClick="Javascript:getPresent(0, ' + p.id + ', this,13215)">';
					p.buttons += '<input type="button" class="invbutt" value="Кирка Г. II" onClick="Javascript:getPresent(0, ' + p.id + ', this,1505)">';
					p.buttons += '<input type="button" class="invbutt" value="Нож II" onClick="Javascript:getPresent(0, ' + p.id + ', this,13228)">';
				} else if (p.desc == 'Скромный Подарок') {
					p.buttons += '<input type="button" class="invbutt" value="-----" onClick="Javascript:getPresent(-1, -1, this)">';
					p.buttons += '<input type="button" class="invbutt" value="Мирка" onClick="Javascript:getPresent(0, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Умелка" onClick="Javascript:getPresent(1, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Звёзды" onClick="Javascript:getPresent(2, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Страница" onClick="Javascript:getPresent(4, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="-----" onClick="Javascript:getPresent(-1, -1, this)">';
					p.buttons += '<input type="button" class="invbutt" value="Ослик 1д." onClick="Javascript:getPresent(3, ' + p.id + ', this,1)">';
				} else if (p.desc == 'Средний Подарок') {
					p.buttons += '<input type="button" class="invbutt" value="-----" onClick="Javascript:getPresent(-1, -1, this)">';
					p.buttons += '<input type="button" class="invbutt" value="ЗЗГ" onClick="Javascript:getPresent(1, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Мирка" onClick="Javascript:getPresent(2, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Умелка" onClick="Javascript:getPresent(3, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Звёзды" onClick="Javascript:getPresent(4, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Страница" onClick="Javascript:getPresent(6, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Ослик 5д." onClick="Javascript:getPresent(5, ' + p.id + ', this,1)">';
					p.buttons += '<input type="button" class="invbutt" value="Удочка I" onClick="Javascript:getPresent(0, ' + p.id + ', this,13192)">';
					p.buttons += '<input type="button" class="invbutt" value="Клетка I" onClick="Javascript:getPresent(0, ' + p.id + ', this,13191)">';
					p.buttons += '<input type="button" class="invbutt" value="Кирка Г. I" onClick="Javascript:getPresent(0, ' + p.id + ', this,1504)">';
					p.buttons += '<input type="button" class="invbutt" value="Нож I" onClick="Javascript:getPresent(0, ' + p.id + ', this,13204)">';
				} else if (p.desc == 'Малый Подарок') {
					p.buttons += '<input type="button" class="invbutt" value="-----" onClick="Javascript:getPresent(-1, -1, this)">';
					p.buttons += '<input type="button" class="invbutt" value="ЗЗГ" onClick="Javascript:getPresent(0, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Мирка" onClick="Javascript:getPresent(1, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Умелка" onClick="Javascript:getPresent(2, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Звёзды" onClick="Javascript:getPresent(3, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Страница" onClick="Javascript:getPresent(5, ' + p.id + ', this)">';
					p.buttons += '<input type="button" class="invbutt" value="Ослик 3д." onClick="Javascript:getPresent(4, ' + p.id + ', this,1)">';
				} else {
					p.buttons = 'я хз, что в этом подарке [' + p.desc + '], поэтому пусто';
				}

				i = parseInt(i);

				return '<table id="presentTbl' + p.id + '" border="0" cellpadding="1" cellspacing="1" class="textM" width="770" style="margin-top:5px; background-color: #aaaaaa;"><tbody><tr><td align="center" bgcolor="#d7d7d7">&nbsp;<b>' + p.desc + '</b></td><td bgcolor="#d7d7d7">От: <b><i>' + p.name + '</i></b> <a href="/~' + p.name + '" target="_blank"><img align="top" src="http://img.ereality.ru/inf.gif" border="0" alt=""></a> | Получен: ' + p.date + ' </td></tr><tr><td bgcolor="#d7d7d7" width="155" valign="top" align="center">' + (i + 1) + ' из ' + cnt + '</td><td rowspan="2" valign="top" bgcolor="#d7d7d7" height="100%" align="left">' + p.buttons + '</td></tr><tr><td align="center" bgcolor="#d7d7d7" height="10"></td></tr></tbody></table>';

			}
			getPresent = function(packNum, PresentId, _this, itemNum='') {
				if (packNum < 0) {
					chat.msgSystem("Плагин", "Подарок #" + PresentId + " скрыт. Остался в подарках. Тупо там нет такой опции, что вы жмякнули =) Новое открытие списка - вернет его в список.");
					$(_this).parents('table').remove();
				}
				var _params = '{"controller":"inventory","action":"openPresent","params":{"presentId":' + PresentId + ',"selectedItems":[' + itemNum+ '],"packNum":"' + packNum + '"},"client":1} ',
					fn = function(data) {
						var text = "";
						if ('response' in data) {
							if ('core' in data.response) {
								if ('messages' in data.response.core) {
									for (_m in data.response.core.messages) {
										text = data.response.core.messages[_m];
										chat.msgSystem("Смотритель", text);
									}
								}
							}
						}
						if (text == '') {
							chat.msgSystem("Смотритель", "Подарок #" + PresentId + " вытащен! Наверное...  :121: ");
						}
					};
				mAj(_params, fn);
				$(_this).parents('table').remove();
				console.log(packNum, PresentId);

			}

			ClearPV = function() {
				$('#best_patt').html('');
				$('#good_patt').html('');
				$('#myCloseButt').hide();
				$('#mur_present_container').hide();
			}

			var my_style = '  style="position: absolute; top: 0px; right: 0px; z-index: 9999; background-color: rgba(221, 221, 221, 0.87); padding: 1px; border-radius: 9px; border: 1px dashed #adadad; text-align: right; max-height: 530px; overflow-y: scroll;display:none;" ',
			    my_block_style = ' style="font-size: 12px; font-family: arial;" ',
				close_style = '  style="position:fixed;top:5px;right:19px; width: 20px!important; height: 22px!important; display: none!important; background: url(closeButton_pic) 0 0 no-repeat!important;" ',
				my_close = '<a id="myCloseButt" href="JavaScript:ClearPV();" ' + close_style + '></a>';

			$("body").prepend('<div id=\"mur_present_container\"' + my_style + '>' + my_close + '<div id="best_patt"' + my_block_style + '></div><div id="good_patt"' + my_block_style + '></div></div>');
			$("#best_patt").css({
				"font-weight": "bold",
				"text-align": "center"
			});
		


	}).toString() + ")();"