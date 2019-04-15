"use strict"
var PSSettlementUI = UIBase.extend({
	ctor: function () {
		this._super();
		this.resourceFilename = "res/ui/PSSettlementUI.json";
		this.setLocalZOrder(const_val.SettlementZOrder)
	},
	initUI: function () {
		var self = this;
		var confirm_btn = this.rootUINode.getChildByName("confirm_btn");

		function confirm_btn_event(sender, eventType) {
			if (eventType == ccui.Widget.TOUCH_ENDED) {
				// TEST:
				// self.hide();
				// h1global.curUIMgr.gameroomprepare_ui.show_prepare();
				// h1global.curUIMgr.notifyObserver("hide");
				// return;
				self.hide();

				//重新开局
				var player = h1global.player();
				if (player) {
					player.curGameRoom.updatePlayerState(player.serverSitNum, 1);
					h1global.curUIMgr.gameroomprepare_ui.show_prepare();
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("reset");
					player.prepare();
				} else {
					cc.warn('player undefined');
				}
			}
		}

		confirm_btn.addTouchEventListener(confirm_btn_event);

		//单局结算分享
		this.rootUINode.getChildByName("share_btn").addTouchEventListener(function (sender, eventType) {
			if (eventType == ccui.Widget.TOUCH_ENDED) {
				if ((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)) {
					jsb.fileUtils.captureScreen("", "screenShot.png");
				} else if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)) {
					jsb.reflection.callStaticMethod("WechatOcBridge", "takeScreenShot");
				} else {
					h1global.curUIMgr.share_ui.show();
				}
			}
		});

		if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
			this.rootUINode.getChildByName("share_btn").setVisible(false);
		}
	},

	setPlaybackLayout: function (replay_btn_func) {
		let replay_btn = ccui.helper.seekWidgetByName(this.rootUINode, "replay_btn");
		let self = this;
		replay_btn.addTouchEventListener(function (sender, eventType) {
			if (eventType === ccui.Widget.TOUCH_ENDED) {
				if (replay_btn_func) replay_btn_func();
				if (self.is_show) {
					self.hide();
				}
			}
		});
		replay_btn.setVisible(true);
		let back_hall_btn = ccui.helper.seekWidgetByName(this.rootUINode, "back_hall_btn");
		back_hall_btn.addTouchEventListener(function (sender, eventType) {
			if (eventType === ccui.Widget.TOUCH_ENDED) {
				h1global.runScene(new GameHallScene());
			}
		});
		back_hall_btn.setVisible(true);

		ccui.helper.seekWidgetByName(this.rootUINode, "share_btn").setVisible(false);
		ccui.helper.seekWidgetByName(this.rootUINode, "confirm_btn").setVisible(false);
	},

	show_by_info: function (roundRoomInfo, serverSitNum, curGameRoom, confirm_btn_func, replay_btn_func) {
		cc.log("结算==========>:");
		cc.log("roundRoomInfo :  ", roundRoomInfo);
		var self = this;
		this.show(function () {
			if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_settlement_panel",roundRoomInfo["player_info_list"],roundRoomInfo["win_idx"],roundRoomInfo["act_cmp"],roundRoomInfo["fnl_cmp"]);
			}
			var confirm_btn = self.rootUINode.getChildByName("confirm_btn");
			var result_btn = self.rootUINode.getChildByName("result_btn");
			var share_btn = self.rootUINode.getChildByName("share_btn");
			if (confirm_btn_func) {
				self.rootUINode.getChildByName("result_btn").addTouchEventListener(function (sender, eventType) {
					if (eventType == ccui.Widget.TOUCH_ENDED) {
						self.hide();
						confirm_btn_func();
					}
				});
				// cc.error("设置点击区域")
				self.rootUINode.getChildByName("bg_panel").setContentSize(cc.director.getWinSize());
				confirm_btn.setVisible(false);
				result_btn.setVisible(true);
				share_btn.setVisible(true);
			} else if (replay_btn_func) {
				self.setPlaybackLayout(replay_btn_func)
			} else {
				confirm_btn.setVisible(true);
				result_btn.setVisible(false);
			}
		});
	},

	show_by_reconnect:function(){
		var self = this;
		this.show(function () {
			var confirm_btn = self.rootUINode.getChildByName("confirm_btn");
			var result_btn = self.rootUINode.getChildByName("result_btn");
			var share_btn = self.rootUINode.getChildByName("share_btn");

			confirm_btn.setVisible(true);
			result_btn.setVisible(false);
			share_btn.setVisible(false);
		});
	},

	show_rules : function (curGameRoom) {
		var share_list = [];

		let mode = curGameRoom.game_mode;
		share_list.push(const_ps.GAME_MODE_STRING[mode]);
		if (curGameRoom.max_boom_times !== 9999) {
			share_list.push("炸弹上限："+curGameRoom.max_boom_times)
		}
		if (curGameRoom.flower_mode === 1) {
			share_list.push("花牌")
		}
		if (curGameRoom.mul_mode === 1) {
			share_list.push("加倍")
		}
		if (curGameRoom.dealer_joker === 1) {
			share_list.push("双王必叫")
		}
		if (curGameRoom.dealer_42 === 1) {
			share_list.push("四个二必叫")
		}

		var shareStr = share_list.join(',');

		var rule_label =  this.rootUINode.getChildByName("settlement_panel").getChildByName("rule_label");
		rule_label.setString(shareStr);
	},

	show_title: function (score) {
		var bg_img = this.rootUINode.getChildByName("settlement_panel").getChildByName("bg_img");
		// var win_title = this.rootUINode.getChildByName("settlement_panel").getChildByName("win_title");
		// win_title.ignoreContentAdaptWithSize(true);
		cc.log(parseInt(score));
		// var rule_label =  this.rootUINode.getChildByName("settlement_panel").getChildByName("rule_label");
		if (parseInt(score) > 0) {
			//胜利
			bg_img.loadTexture("res/ui/PSGameRoomUI/win_bg.png");
			// win_title.loadTexture("res/ui/SettlementUI/win_title.png");
			// rule_label.setTextColor(cc.color(203,78,29));
		} else {
			bg_img.loadTexture("res/ui/PSGameRoomUI/fail_bg.png");
			// win_title.loadTexture("res/ui/SettlementUI/fail_title.png");
			// rule_label.setTextColor(cc.color(41,185,194));
		}
	},

	update_score: function (panel_idx, score) {
		var score_label = this.player_tiles_panels[panel_idx].getChildByName("score_label");
		if (score >= 0) {
			score_label.setTextColor(cc.color(255, 253, 40));
			score_label.setString("+" + score.toString());
		} else {
			score_label.setTextColor(cc.color(0, 198, 255));
			score_label.setString(score.toString());
		}
	},

	update_player_info: function (panel_idx, serverSitNum, curGameRoom,mul_score) {
		if (!this.is_show) {
			return;
		}
		var cur_player_info_panel = this.player_tiles_panels[panel_idx];
		if (!cur_player_info_panel) {
			return;
		}
		var playerInfo = curGameRoom.playerInfoList[serverSitNum];
		//cur_player_info_panel.getChildByName("owner_img").setVisible(playerInfo["is_creator"])
		cur_player_info_panel.getChildByName("name_label").setString(playerInfo["nickname"]);
		cur_player_info_panel.getChildByName("id_label").setString("ID:" + playerInfo["userId"].toString());
		cur_player_info_panel.getChildByName("mul_img").setVisible(mul_score == 2 ? true : false);
		cur_player_info_panel.getChildByName("dealer_img").setVisible(serverSitNum == this.dealer_idx ? true : false);
		cutil.loadPortraitTexture(playerInfo["head_icon"], playerInfo["sex"], function (img) {
			var portrait_sprite = new cc.Sprite(img);
			portrait_sprite.setName("portrait_sprite");
			portrait_sprite.setScale(78 / portrait_sprite.getContentSize().width);
			portrait_sprite.x = cur_player_info_panel.width * 0.09;
			portrait_sprite.y = cur_player_info_panel.height * 0.5;
			cur_player_info_panel.addChild(portrait_sprite);
			portrait_sprite.setLocalZOrder(-1);
		});
	},

});