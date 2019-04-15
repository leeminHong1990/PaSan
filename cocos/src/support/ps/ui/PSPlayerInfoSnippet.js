"use strict";
var PSPlayerInfoSnippet = UISnippet.extend({
	ctor: function (rootUINodeRet, serverSitNum) {
		this._super(rootUINodeRet);
		this.serverSitNum = serverSitNum;
		if (serverSitNum < 0 || serverSitNum > 4) {
			cc.error("PlayerInfoSnippet: serverSitNum out of range", serverSitNum);
		}
	},

	initUI: function () {
		this.idx_p_list = [cc.p(0.5, 0.25), cc.p(0.69, 0.55), cc.p(0.58, 0.77), cc.p(0.42, 0.77), cc.p(0.31, 0.55)];
		this.info_panel = this.rootUINode.getChildByName("player_info_panel");
		this.tile_panel = this.rootUINode.getChildByName("player_hand_panel").getChildByName("player_tile_panel");
		var air_btn = this.rootUINode.getChildByName("player_info_panel").getChildByName("air_panel").getChildByName("air_btn");
		// var break_img = this.tile_panel.getChildByName("break_img");
		var self = this;
		air_btn.addTouchEventListener(function (sender, eventType) {
			if (eventType == ccui.Widget.TOUCH_ENDED) {
				let player = h1global.player();
				if (player) {
					player.doOperation(const_ps.OP_CMP_CARDS, self.serverSitNum);
					if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
						h1global.curUIMgr.roomLayoutMgr.notifyObserver("hide_all_touch_panel");
					}
				}
			}
		});
		var expression = this.info_panel.getChildByName("player_info_panel").getChildByName("light_img");
		UICommonWidget.add_btn_cd(expression, "res/ui/PSGameRoomUI/head_light_img.png", true, 40, cc.color(255, 255, 255));
		// UICommonWidget.set_btn_cd(expression,5,5,false);

		let player = h1global.player();
		if (player) {
			let index = player.server2CurSitNum(this.serverSitNum);
			let flip = index === 2 || index === 1;
			air_btn.setScaleX(flip ? -1 : 1);
			if (flip) {
				this.tile_panel.getChildByName("type_img").setPositionX(-20);
				// break_img.setScaleX(-1);
				// break_img.setPositionX(break_img.width);
			}
		}
		this.head_pos = this.info_panel.getChildByName("player_info_panel").getPosition();
	},

	setVisible: function (is_show) {
		this.rootUINode.setVisible(is_show);
	},

	update_player_info_panel: function (playerInfo) {
		if (!cc.sys.isObjectValid(this.rootUINode)) {
			return;
		}
		var serverSitNum = this.serverSitNum;

		var cur_player_info_panel = this.rootUINode.getChildByName("player_info_panel").getChildByName("player_info_panel");
		if (!playerInfo) {
			this.setVisible(false);
			return;
		}
		this.setVisible(true);

		var name_label = ccui.helper.seekWidgetByName(cur_player_info_panel, "name_label");
		var nickname = playerInfo["nickname"];
		nickname = cutil.info_sub(nickname, 4);
		name_label.setString(nickname);
		var frame_img = ccui.helper.seekWidgetByName(cur_player_info_panel, "frame_img");
		frame_img.setTouchEnabled(true);
		var self = this;
		frame_img.addTouchEventListener(function (sender, eventType) {
			if (eventType == ccui.Widget.TOUCH_ENDED) {
				var player = h1global.player();
				if (player) {
					var idx = player.server2CurSitNum(serverSitNum);
					h1global.curUIMgr.gameplayerinfo_ui.show_by_info(playerInfo, serverSitNum, self.idx_p_list[idx]);
				}
			}
		});
		cutil.loadPortraitTexture(playerInfo["head_icon"], playerInfo["sex"], function (img) {
			if (cc.sys.isObjectValid(cur_player_info_panel)) {
				let oldPortrait = cur_player_info_panel.getChildByName("portrait_sprite");
				let oldZOrder = oldPortrait.getLocalZOrder();
				oldPortrait.removeFromParent();
				let portrait_sprite = new cc.Sprite(img);
				portrait_sprite.setName("portrait_sprite");
				portrait_sprite.setScale(74 / portrait_sprite.getContentSize().width);
				portrait_sprite.x = cur_player_info_panel.getContentSize().width * 0.5;
				portrait_sprite.y = cur_player_info_panel.getContentSize().height * 0.5;
				// portrait_sprite.setLocalZOrder(oldZOrder - 1);
				cur_player_info_panel.addChild(portrait_sprite);
				cur_player_info_panel.getChildByName("dealer_img").setLocalZOrder(1);
				cur_player_info_panel.getChildByName("state_img").setLocalZOrder(1);
				cur_player_info_panel.getChildByName("owner_img").setLocalZOrder(1);
				// cur_player_info_panel.reorderChild(portrait_sprite, cur_player_info_panel.getChildByName("frame_img").getLocalZOrder()-1)
			}
		}, playerInfo["uuid"].toString() + ".png");
		cur_player_info_panel.player_info = playerInfo;

		this.update_score(playerInfo["total_score"]);
		if (!playerInfo["score"]) {
			this.hide_player_tiles();
		} else {
			this.update_raise_score(playerInfo["score"]);
		}
		var player = h1global.entityManager.player();
		if (!player || !player.curGameRoom) {
			return;
		}

		var owner_img = ccui.helper.seekWidgetByName(cur_player_info_panel, "owner_img");
		owner_img.setVisible(playerInfo['is_creator']);

		if (player.startActions["GameRoomUI"]) {
			this.update_dealer_idx(true);
			// if (player.curGameRoom.dealerIdx === serverSitNum) {
			//     light_img.runAction(cc.sequence(cc.hide(), cc.delayTime(0.1), cc.show(), cc.delayTime(0.1)).repeat(5));
			// }
		}

	},

	update_score: function (score) {
		var cur_player_info_panel = this.rootUINode.getChildByName("player_info_panel").getChildByName("player_info_panel");
		if (cc.sys.isObjectValid(cur_player_info_panel)) {
			var score_label = ccui.helper.seekWidgetByName(cur_player_info_panel, "score_label");
			score_label.ignoreContentAdaptWithSize(true);
			score_label.setString(score == undefined ? "0" : "分：" + score);
		}
	},

	update_raise_score: function (score) {
		var player_hand_panel = this.rootUINode.getChildByName("player_hand_panel").getChildByName("player_tile_panel");
		if (cc.sys.isObjectValid(player_hand_panel)) {
			var socre_label = player_hand_panel.getChildByName("score_img").getChildByName("score_label");
			socre_label.ignoreContentAdaptWithSize(true);
			socre_label.setString(score == undefined ? "0" : "" + Math.abs(score));
		}
	},

	update_player_online_state: function (state) {
		if (!cc.sys.isObjectValid(this.rootUINode)) {
			return;
		}
		var state_img = this.rootUINode.getChildByName("player_info_panel").getChildByName("player_info_panel").getChildByName("state_img");
		// if(state == 1){
		// 	// state_label.setString("在线");
		// 	// state_label.setColor(cc.color(215, 236, 218));
		// 	state_img.loadTexture("res/ui/GameRoomUI/state_online.png");
		// 	state_img.setVisible(true);
		// } else
		if (state === 0) {
			// state_label.setString("离线");
			// state_label.setColor(cc.color(255, 0, 0));
			state_img.loadTexture("res/ui/GameRoomUI/state_offline.png");
			state_img.setVisible(true);
		} else {
			state_img.setVisible(false);
		}
	},

	update_dealer_idx: function (isDealer, runAction) {
		if (!cc.sys.isObjectValid(this.rootUINode)) {
			return;
		}
		runAction = isDealer ? runAction : false;
		var cur_player_info_panel = this.rootUINode.getChildByName("player_info_panel").getChildByName("player_info_panel");
		var dealer_img = ccui.helper.seekWidgetByName(cur_player_info_panel, "dealer_img");
		dealer_img.setVisible(isDealer);
		if (runAction) {
			dealer_img.stopAllActions();
			dealer_img.setScale(5);
			dealer_img.runAction(cc.sequence(cc.scaleTo(0.3, 1), cc.scaleTo(1, 1)));
			cc.audioEngine.playEffect("res/sound/voice/poker_ps/dealer_voice.mp3");
		}
	},

	update_ready_state: function (state) {
		let ready_panel = this.rootUINode.getChildByName("player_info_panel").getChildByName("ready_panel");
		if (h1global.player() && h1global.player().curGameRoom.room_state === const_val.ROOM_PLAYING) {
			ready_panel.setVisible(false);
		} else {
			ready_panel.setVisible(state === 1);
		}
		// ready_panel.setVisible(state === 1);
		if (state === 1) {
			let player = h1global.player();
			if (player && player.curGameRoom) {
				let img = ready_panel.getChildByName("ready_img");
				let index = player.server2CurSitNum(this.serverSitNum);
				let flip = index === 2 || index === 1;
				ready_panel.setScaleX(flip ? -1 : 1);
				img.setScaleX(flip ? 1 : -1);
			}
		}
	},

	update_head_mul: function (score) {
		let cur_player_info_panel = this.rootUINode.getChildByName("player_info_panel").getChildByName("player_info_panel");
		cur_player_info_panel.getChildByName("head_mul_img").setVisible(score == 2);
	},

	hide_player_tiles: function () {
		cc.log("hide_player_tiles");
		var player_hand_panel = this.rootUINode.getChildByName("player_hand_panel").getChildByName("player_tile_panel");
		player_hand_panel.setVisible(false);
	},

	update_player_tiles: function (tiles, poker_state, is_me, is_result, is_cmp) {
		cc.log("update_player_tiles", tiles, poker_state, is_me, is_result, is_cmp);
		this.show_poker_panel(poker_state, tiles, is_me, is_result, is_cmp);
		this.show_speak_panel(poker_state, is_result);
	},

	show_poker_panel: function (poker_state, tiles, is_me, is_result, is_cmp) {
		var player_hand_panel = this.rootUINode.getChildByName("player_hand_panel").getChildByName("player_tile_panel");
		var poker_panel = player_hand_panel.getChildByName("poker_panel");
		var break_img = player_hand_panel.getChildByName("break_img");
		let state_fold = poker_state === const_ps.POKER_FOLD;
		let state_fail = poker_state === const_ps.POKER_FAIL;
		player_hand_panel.setVisible(true);
		poker_panel.setVisible(!state_fold ? true : false);
		let num = 0;
		for (var i = 0; i < tiles.length; i++) {
			num = tiles[i];
			let tile_img = null;
			tile_img = poker_panel.getChildByName("tile_img_" + i);
			tile_img.loadTexture(cutil_ps.getCardImgPath(num), ccui.Widget.PLIST_TEXTURE);
			if (state_fold || state_fail) {
				tile_img.setColor(const_ps.COLOR_GREY);
			} else {
				tile_img.setColor(const_ps.COLOR_WHITE);
			}
		}
		let type = cutil_ps.check_pair(tiles)
		if (type) {
			player_hand_panel.getChildByName("type_img").setVisible(true);
			player_hand_panel.getChildByName("type_img").getChildByName("label").setString(type);
		} else {
			player_hand_panel.getChildByName("type_img").setVisible(false);
		}

		//
		if (is_result) {
			break_img.setVisible(false);
			if (state_fail && !is_cmp && !is_me) {
				break_img.setVisible(true);
				player_hand_panel.getChildByName("type_img").setVisible(false);
			}
			if (state_fold && !is_me) {
				break_img.setVisible(true);
				player_hand_panel.getChildByName("type_img").setVisible(false);
			}
			if (state_fold && is_me) {
				poker_panel.setVisible(true);
			}
		} else {
			//是否显示裂牌
			if (state_fail) {
				break_img.setVisible(true);
			} else {
				break_img.setVisible(false);
			}
			//根据情况把牌型也隐藏掉
			if (state_fail || state_fold) {
				player_hand_panel.getChildByName("type_img").setVisible(false);
			}
		}
	},

	show_speak_panel: function (poker_state, is_result) {
		let speak_panel = this.rootUINode.getChildByName("player_info_panel").getChildByName("speak_panel");
		let player = h1global.player();
		if (player && player.curGameRoom) {
			let img = speak_panel.getChildByName("talk_img");
			let index = player.server2CurSitNum(this.serverSitNum);
			if (index == 0 && poker_state == const_ps.POKER_SEEN) {
				speak_panel.setVisible(false);
				return;
			}
			if (poker_state == const_ps.POKER_BLIND) {
				speak_panel.setVisible(false);
				return;
			}
			// if (is_result && poker_state != const_ps.POKER_FOLD) {
			if (is_result) {
				speak_panel.setVisible(false);
				return;
			}
			speak_panel.setVisible(true);
			var talk_label = speak_panel.getChildByName("talk_img").getChildByName("talk_label");
			talk_label.setString(const_ps.POKER_WORD[poker_state]);
			let flip = index === 2 || index === 1;
			img.setScaleX(flip ? -1 : 1);
			talk_label.setScaleX(flip ? -1 : 1);
			img.setPositionX(flip ? -20 : 252);
		}
	},

	hide_speak_panel: function () {
		let speak_panel = this.rootUINode.getChildByName("player_info_panel").getChildByName("speak_panel");
		speak_panel.setVisible(false);
	},

	show_air_panel: function () {
		this.rootUINode.getChildByName("player_info_panel").getChildByName("air_panel").setVisible(true);
	},

	hide_air_panel: function () {
		this.rootUINode.getChildByName("player_info_panel").getChildByName("air_panel").setVisible(false);
	},

	play_anime_action: function (aid, data) {
		cc.log("play_anime_actio1111111n", aid, data);
		switch (aid) {
			case const_ps.OP_FOLLOW_CHIP:
			case const_ps.OP_RAISE_CHIP:
				cc.log("跟注，加注动画。11111")
				break;
			case const_ps.OP_CMP_CARDS:
				if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("play_PK_action");
				}
				actionMgr.add_ps_action_list(this.rootUINode, const_ps.ACTION_NAME_LIST[0]);
				break;
			case const_ps.OP_FOLD_CARDS:
				cc.log("弃牌动画怎么做！111111");
				break;
			default:
				break;
		}
	},

	head_move: function (is_left, is_winner, pk_node) {
		var player_node = this.info_panel.getChildByName("player_info_panel").clone();
		this.info_panel.getChildByName("player_info_panel").setVisible(false);
		var anime_node = pk_node.getChildByName("Panel_1").getChildByName(is_left ? "zuo_2" : "you_3");
		var anime_panel_pos = anime_node.getParent().getParent().getPosition();

		var c_p = this.info_panel.getChildByName("player_info_panel").convertToWorldSpaceAR();

		var move_x = is_left ? -190 : 190;
		var move_y = is_left ? 0 : -50;

		let is_light = false;
		var self = this;
		// let old_Z = self.rootUINode.getLocalZOrder();
		// let pos_node = self.rootUINode;

		var action_panel = pk_node.getParent();
		action_panel.addChild(player_node);
		player_node.setPosition(c_p)

		var d_p = player_node.convertToWorldSpaceAR();
		var old_pos = player_node.getPosition();

		//在这里给克隆的移动框 添加头像
		var playerInfo = this.info_panel.getChildByName("player_info_panel").player_info;
		let cur_player_info_panel = player_node;
		cutil.loadPortraitTexture(playerInfo["head_icon"], playerInfo["sex"], function (img) {
			if (cc.sys.isObjectValid(cur_player_info_panel)) {
				if (cur_player_info_panel.getChildByName("portrait_sprite")) {
					cur_player_info_panel.getChildByName("portrait_sprite").removeFromParent(true);
				}
				let oldPortrait = cur_player_info_panel.getChildByName("frame_bg");
				// let oldZOrder = oldPortrait.getLocalZOrder();
				// oldPortrait.removeFromParent();
				let portrait_sprite = new cc.Sprite(img);
				portrait_sprite.setName("portrait_sprite");
				portrait_sprite.setScale(74 / portrait_sprite.getContentSize().width);
				portrait_sprite.x = cur_player_info_panel.getContentSize().width * 0.5;
				portrait_sprite.y = cur_player_info_panel.getContentSize().height * 0.5;
				// portrait_sprite.setLocalZOrder(oldZOrder - 1);
				cur_player_info_panel.addChild(portrait_sprite);
				cur_player_info_panel.getChildByName("dealer_img").setLocalZOrder(1);
				cur_player_info_panel.getChildByName("state_img").setLocalZOrder(1);
				cur_player_info_panel.getChildByName("owner_img").setLocalZOrder(1);
				// cur_player_info_panel.reorderChild(portrait_sprite, cur_player_info_panel.getChildByName("frame_img").getLocalZOrder()-1)
			}
		}, playerInfo["uuid"].toString() + ".png");

		player_node.runAction(cc.sequence(
			// cc.blink(1, 5),
			cc.delayTime(0.01),
			cc.scaleTo(0.2, 1.3),
			cc.delayTime(0.1),
			cc.callFunc(function () {
				if (player_node.getChildByName("light_img").isVisible()) {
					player_node.getChildByName("light_img").setVisible(false);
					// is_light = true;
				}
				// pos_node.setLocalZOrder(1);
			}),
			cc.scaleTo(0.2, 1),
			cc.moveBy(0.2, anime_panel_pos.x - d_p.x + move_x, anime_panel_pos.y - d_p.y + move_y),
			cc.delayTime(is_winner ? 1.6 : 0.5),
			cc.callFunc(function () {
				if (is_winner) {
					player_node.runAction(cc.sequence(
						cc.moveTo(0.2, old_pos.x, old_pos.y),
						cc.callFunc(() => {
							player_node.setVisible(false);
							self.info_panel.getChildByName("player_info_panel").setVisible(true);
							player_node.removeFromParent(true);
						})
					))
				} else {
					UICommonWidget.load_effect_plist("ps_pk_fail");
					var expression_sprite = cc.Sprite.create();
					expression_sprite.setPosition(player_node.width * 0.5, player_node.height * 0.5);
					player_node.addChild(expression_sprite);
					expression_sprite.runAction(cc.Sequence.create(
						cc.callFunc(function () {
							cc.audioEngine.playEffect("res/sound/voice/poker_ps/cmp_fail.mp3");
						}),
						UICommonWidget.create_effect_action({
							"FRAMENUM": 9,
							"TIME": 0.7,
							"NAME": "ps_pk_fail_"
						}),
						cc.CallFunc.create(function () {
							expression_sprite.setVisible(false);
							player_node.getChildByName("portrait_sprite").setColor(cc.color(80, 80, 80));
							player_node.getChildByName("frame_img").setColor(cc.color(80, 80, 80));
							player_node.setOpacity(255);
						}),
						cc.DelayTime.create(0.5),
						cc.CallFunc.create(function () {
							expression_sprite.removeFromParent();
							player_node.runAction(
								cc.moveTo(0.2, old_pos.x, old_pos.y)
							);
							player_node.setVisible(false);
							self.info_panel.getChildByName("player_info_panel").setVisible(true);
							pk_node.setVisible(false);
							if (!is_winner && h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
								h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_player_tiles", self.serverSitNum);
								self.set_head_gray();
							}
							player_node.removeFromParent(true);
						})
					));
				}
			})
		));
	},

	poker_fly: function (call_back) {
		if (this.tile_panel) {
			var poker_size = this.tile_panel.getChildByName("poker_panel").getContentSize();
			// cc.error(poker_size);
			// var poker_img = new cc.Sprite("PSGameRoomUI/break_poker_img.png",ccui.Widget.PLIST_TEXTURE);
			if (poker_size.width > 300) {
				var poker_img = new cc.Sprite("res/ui/PSGameRoomUI/my_poker_img.png");
			} else {
				var poker_img = ccui.ImageView.create("PSGameRoomUI/break_poker_img.png", ccui.Widget.PLIST_TEXTURE);
				var me_size = poker_img.getContentSize();
				poker_img.setScale(poker_size.width / me_size.width, poker_size.height / me_size.height);
			}
			// let player = h1global.player();
			// if (!player) {
			// 	return;
			// }
			// let index = player.server2CurSitNum(serverSitNum);
			// if (index === 1 || index === 2) {
			// 	poker_img.setScaleX(-1);
			// }

			// var poker_img = new cc.Sprite("res/ui/PSGameRoomUI/break_poker_img.png");
			// poker_img.setScale(poker_size/poker_img.getContentSize());
			// poker_img.setScale9Enabled(true);
			// poker_img.setContentSize(poker_size);
			// poker_img.setAnchorPoint(0,0);
			// poker_img.setPosition(0,0);

			poker_img.setAnchorPoint(0.5, 0.5);
			poker_img.setPosition(poker_size.width * 0.5, poker_size.height * 0.5);
			this.tile_panel.addChild(poker_img);
			var d_p = poker_img.convertToWorldSpaceAR();
			var win_size = cc.director.getWinSize();
			this.set_head_gray();
			// cc.error("d_p", d_p);
			poker_img.runAction(cc.sequence(
				cc.delayTime(0.1),
				// cc.rotateBy(2,360),
				// cc.moveTo(2,500,500),
				cc.Spawn.create(
					// cc.scaleTo(0.66666, 2.4, 2.4).easing(cc.easeIn(0.5)),
					cc.moveBy(0.3, win_size.width * 0.5 - d_p.x, win_size.height * 1.2 - d_p.y),
					// cc.rotateBy(0.4, 360).easing(cc.easeIn(0.4))
					cc.rotateBy(0.3, 360)
				),
				cc.delayTime(0.01),
				cc.callFunc(function () {
					poker_img.removeFromParent(true);
					call_back();
				})
			))
		} else {
			call_back();
		}
	},

	play_wait_time: function (left_time, sum_time) {
		var expression = this.info_panel.getChildByName("player_info_panel").getChildByName("light_img");
		UICommonWidget.set_ps_btn_cd(expression, sum_time, left_time);
	},

	set_clock_visible: function (is_show) {
		if (!cc.sys.isObjectValid(this.rootUINode) || !this.info_panel) {
			return;
		}
		this.info_panel.getChildByName("player_info_panel").getChildByName("light_img").setVisible(is_show);
		if (!is_show) {
			this.info_panel.getChildByName("player_info_panel").getChildByName("light_img").is_time_out = false;
		}
	},

	show_settlement_score: function (score) {
		if (!cc.sys.isObjectValid(this.rootUINode) || !this.info_panel) {
			return;
		}
		var score_panel = this.info_panel.getChildByName("score_panel");
		score_panel.setVisible(true);
		var win_label = score_panel.getChildByName("win_label");
		var fail_label = score_panel.getChildByName("fail_label");
		if (score >= 0) {
			win_label.setString("+" + score);
			win_label.setVisible(true);
			fail_label.setVisible(false);
		} else {
			fail_label.setString("" + score);
			fail_label.setVisible(true);
			win_label.setVisible(false);
		}
	},

	hide_settlement_score: function () {
		if (!cc.sys.isObjectValid(this.rootUINode) || !this.info_panel) {
			return;
		}
		this.info_panel.getChildByName("score_panel").setVisible(false);
	},

	set_head_gray: function () {
		var player_node = this.rootUINode.getChildByName("player_info_panel").getChildByName("player_info_panel");
		player_node.getChildByName("portrait_sprite").setColor(cc.color(80, 80, 80));
		player_node.getChildByName("frame_img").setColor(cc.color(80, 80, 80));
		player_node.setOpacity(255);
	},

	set_head_white: function () {
		var player_node = this.info_panel.getChildByName("player_info_panel");
		player_node.getChildByName("portrait_sprite").setColor(cc.color(255, 255, 255));
		player_node.getChildByName("frame_img").setColor(cc.color(255, 255, 255));
	},
});