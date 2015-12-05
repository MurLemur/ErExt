var script_inventory = "(" +
	(function() {
		function mur_union_items() {
			var mur_items = {};
			var length = 0;
			$.each(inventory.items, function(index, value) {
				if (value.w_category == 40)
					if (mur_items[value.w_id] != undefined) mur_items[value.w_id].push(value.uid);
					else {
						mur_items[value.w_id] = [value.uid];
						length++;
					}

			})
			var mur_items_all = [];
			$.each(inventory.items, function(index, value) {
				if (value.w_category == 40) mur_items_all.push(value.uid);
			});

			if (mur_items_all.length == length) {
				json.jsonRecv = json.old_jsonRecv;
				return;
			}
			$.each(mur_items, function(mindex, mitem) {
				if (mitem.length > 1) {
					var mur_item_json = {
						"controller": "inventory",
						"action": "groupItem",
						"params": {
							"uid": mitem
						},
						"client":1
					};
					json.jsonSend(mur_item_json);
					return;
				}

			})
		}

		function mur_union_items_click() {
			json.old_jsonRecv = json.jsonRecv;
			json.jsonRecv = function(data) {
				json.old_jsonRecv.apply(json, [data]);
				setTimeout(function() {
					mur_union_items();
				}, 400);
				return;
			}
			mur_union_items();
		}


		var old_updateHeroInv = heroPanel.updateHeroInv;
		heroPanel.updateHeroInv = function(data) {
			var imgsrc="inv_union.png";
			old_updateHeroInv.apply(heroPanel, [data]);
			$(".InvSearch").after($("<div style='float: left;height: 32px;margin: 6px 10px 0 5px;cursor:pointer' title='Объединить ресурсы'>").append($("<img src='"+imgsrc+"'></div>").on("click", mur_union_items_click).mouseover(
					function() {
						$(this).attr("src", imgsrc.replace(".png","_hov.png"));
					})
				.mouseout(function() {
					$(this).attr("src", imgsrc);
				})));
			return;
		}

	}).toString() + ")();";