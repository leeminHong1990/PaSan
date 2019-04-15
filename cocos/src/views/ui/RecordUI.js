"use strict";
var RecordUI = UIBase.extend({
	ctor:function () {
		this._super();
		this.resourceFilename = "res/ui/RecordUI.json";
	},

	show_by_info:function (club_id) {
		if(!h1global.player() || !h1global.player().club_entity_dict[club_id]){return}
		this.club = h1global.player().club_entity_dict[club_id];
		this.show();
	},

	initUI:function () {
		var self = this;

		this.page_show_num = 10;
		this.cur_page_num = 1;//当前页数
		this.max_page_num = 1;//最大页数

		var record_panel = this.rootUINode.getChildByName("record_panel");
		this.main_panel = this.rootUINode.getChildByName("main_panel");
		this.detail_panel = record_panel.getChildByName("detail_panel");
		this.back_btn = record_panel.getChildByName("back_btn");
		this.return_btn = record_panel.getChildByName("return_btn");
		this.main_scroll = this.rootUINode.getChildByName("main_panel").getChildByName("main_scroll");

		function return_btn_event(sender, eventType) {
			if (eventType === ccui.Widget.TOUCH_ENDED) {
				self.hide();
			}
		}
		function back_btn_event(sender, eventType) {
			if (eventType === ccui.Widget.TOUCH_ENDED) {
				self.main_scroll.setVisible(true);
				self.detail_panel.setVisible(false);
				self.back_btn.setVisible(false);
				self.return_btn.setVisible(true);
			}
		}
		this.back_btn.addTouchEventListener(back_btn_event);
		this.return_btn.addTouchEventListener(return_btn_event);

		this.update_main_scroll();
	},

	update_main_scroll:function(){
		let player= h1global.player();
		var need_data = cutil.deepCopy(player.gameRecordList);
		need_data.reverse();
		for(var k in need_data){
			var round_result = need_data[k].round_result;
			var user_info_list = need_data[k].user_info_list;
			for(var i in user_info_list){
				var total_score = 0;
				for (var j = 0; j < round_result.length; j++) {
					if(round_result[j]["round_record"][i]){
						total_score += round_result[j]["round_record"][i]["score"];
					}
				}
				user_info_list[i]["score"] =total_score;
			}
			let time_text = round_result[round_result.length-1]["time"].split(":", 2);
			for (var l = 0; l < time_text.length; l++) {
				if (time_text[l] < 10) {
					time_text[l] = "0" + time_text[l];
				}
			}
			need_data[k]["time"] =round_result[round_result.length-1]["date"] + " " + time_text[0] + ":" + time_text[1];
		}
		if(player){
			this.update_scroll(this.main_scroll,need_data);
		}
	},

	update_scroll:function (scroll, info_list) {
		var self = this;
		function init_panel_item(itemPanel, itemData, idx) {
			// cc.log(itemData);
			var room_id_label = itemPanel.getChildByName("room_id_label");
			var time_label = itemPanel.getChildByName("time_label");

			room_id_label.setString("房号:" + itemData["roomID"]);
			time_label.setString(itemData["time"]);

			for(var i=0; i<itemData["user_info_list"].length; i++){
				var name_label = itemPanel.getChildByName("name_label_" + String(i));
				var score_label = itemPanel.getChildByName("score_label_" + String(i));

				var info = itemData["user_info_list"][i];
				name_label.setString(cutil.info_sub_ver2(info["nickname"], 4));
				score_label.setTextColor(cc.color(255, 255, 255));
				// name_label.setTextColor(cc.color(255, 255, 255));
				if(info["score"] > 0){
					score_label.setString("+" + info["score"]);
					score_label.setTextColor(cc.color(210, 41, 8));
				}else{
					score_label.setString(info["score"]);
					score_label.setTextColor(cc.color(65, 140, 35));
				}
				// if(info["score"] >= itemData["player_info_list"][0]["score"]){
				// 得分最多的人 名字特殊显示
				// if(info["score"] > 0){
				// 	name_label.setTextColor(cc.color(210, 41, 8));
				// }else{
				// 	name_label.setTextColor(cc.color(151, 70, 40));
				// }
			}
			//从第几个人开始 隐藏
			var len = itemData["user_info_list"].length;
			for(var i = 0;i<5;i++){
				if(i<len){
					itemPanel.getChildByName("name_label_"+i).setVisible(true);
					itemPanel.getChildByName("score_label_"+i).setVisible(true);
				}else{
					itemPanel.getChildByName("name_label_"+i).setVisible(false);
					itemPanel.getChildByName("score_label_"+i).setVisible(false);
				}
			}
			//新增的详情按钮
			var detail_btn = itemPanel.getChildByName("detail_btn");
			if(itemData["round_result"] && itemData["round_result"].length>0){
				//cc.log(itemData["roundResult"]);
				detail_btn.setVisible(true);
				detail_btn.addTouchEventListener(function (sender, eventType) {
					if (eventType === ccui.Widget.TOUCH_ENDED) {
						// self.title_img.loadTexture("res/ui/CirclePopUI/record_details_title.png");
						self.back_btn.setVisible(true);
						self.return_btn.setVisible(false);
						// self.left_panel.setVisible(false);
						self.main_scroll.setVisible(false);
						self.detail_panel.setVisible(true);
						cc.log(itemData);

						self.detail_panel.getChildByName("name_panel").getChildByName("roomid_label").setString("("+const_val.GameType2CName[itemData["game_type"]]+")" + "No."+itemData["roomID"]);
						var time_label = self.detail_panel.getChildByName("name_panel").getChildByName("time_label");
						// time_label.setString(cutil.convert_timestamp_to_datetime_exsec(itemData["time"]));
						time_label.setString(itemData["time"]);
						var title_panel = self.detail_panel.getChildByName("title_panel");
						for(var k in itemData["user_info_list"]){
							title_panel.getChildByName("name_label_"+k).setString(""+itemData["user_info_list"][k].nickname);
						}
						var len = itemData["user_info_list"].length;
						for(var i = 0;i<5;i++){
							if(i<len){
								title_panel.getChildByName("name_label_"+i).setVisible(true);
							}else{
								title_panel.getChildByName("name_label_"+i).setVisible(false);
							}
						}
						// var item_list = eval("(" + itemData["roundResult"] + ")");
						var item_list = itemData["round_result"];
						// for (var i = 0;i<item_list.length;i++){
						// 	item_list[i]["roomID"] = itemData["roomID"];
						// 	item_list[i]["owner_name"] = self.club.owner["nickname"];
						// 	item_list[i]["player_info_list"] = itemData["player_info_list"];
						// }
						cc.log(item_list);

						UICommonWidget.update_scroll_items(self.detail_panel.getChildByName("record_all_scroll"), item_list, function (itemPanel, itemData, idx) {
							var time = parseInt(itemData["time"].slice(itemData["time"].indexOf(":")+1));
							if(time<10){
								time = '0' + time;
							}
							itemPanel.getChildByName("time_label").setString(itemData["time"].slice(0,itemData["time"].indexOf(":")+1)+time);
							itemPanel.getChildByName("round_label").setString((idx+1).toString());
							itemPanel.getChildByName("light_img").setVisible(idx%2 !== 1);

							for(var i=0; i<itemData["round_record"].length; i++){
								// var name_label = itemPanel.getChildByName("player_name_label_" + String(i));
								var score_label = itemPanel.getChildByName("score_label_" + String(i));

								var info = itemData["round_record"][i];
								// var list = itemData["round_record"];
								// for(var j =0; j<list.length;j++){
								// 	if(list[j]["userID"]==info["userId"]){
								// 		info["score"]=list[j]["score"];
								// 	}
								// }
								// name_label.setString(cutil.info_sub_ver2(info["nickname"], 4) + "(" + info["userId"].toString() + ")");
								score_label.setTextColor(cc.color(255, 255, 255));
								if(info["score"] > 0){
									score_label.setString("+" + info["score"]);
									score_label.setTextColor(cc.color(220, 56, 12));
								}else{
									score_label.setString(info["score"]);
									score_label.setTextColor(cc.color(26, 146, 95));
								}

							}
							var len = itemData["round_record"].length;
							for(var i = 0;i<5;i++){
								if(i<len){
									itemPanel.getChildByName("score_label_"+i).setVisible(true);
								}else{
									itemPanel.getChildByName("score_label_"+i).setVisible(false);
								}
							}

							// var replay_btn = itemPanel.getChildByName("replay_btn");
							// replay_btn.addTouchEventListener(function (sender, eventType) {
							// 	if (eventType === ccui.Widget.TOUCH_ENDED) {
							// 		self.reqPlayback(itemData["recordId"]);
							// 	}
							// });

						});
						// let recordData = recordList[i];

						// UICommonWidget.update_scroll_items(self.recorddetails_scroll, recordData['round_result'], function (view, itemData, index) {
						//     self.update_record_details_small(view, itemData, index);
						// });
					}
				});
			}else{
				detail_btn.setVisible(false);
			}

		}
		UICommonWidget.update_scroll_items(scroll, info_list, init_panel_item);
	},

	reqPlayback: function (text) {
		if (cutil.isPositiveNumber(text)) {
			let player = h1global.player();
			if (!player) {
				cc.log('player undefined');
				return false;
			}
			player.reqPlayback(cc.isNumber(text) ? text : parseInt(text));
			return true;
		} else {
			h1global.globalUIMgr.info_ui.show_by_info("回放码错误！")
		}
		return false;
	},

});