// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
"use strict"
var PSGameRoomUI = UIBase.extend({
	ctor: function () {
		this._super();
		this.talk_img_num = 0;

		this.containUISnippets = {};
		var self = this;
		// Note: PlayerInfoSnippet按照服务端座位号分布
		for (var i = 0; i < const_val.GameType2CNum[const_val.PaSan]; i++) {
			let idx = i;
			this.containUISnippets["PlayerInfoSnippet" + i] = new PSPlayerInfoSnippet(function () {
				let player = h1global.entityManager.player();
				let index = idx;
				if (player) {
					index = player.server2CurSitNum(index);
				}
				return self.rootUINode.getChildByName("player_info_panel" + index);
			}, i);
		}
	},
	initUI: function () {
		this.rootUINode.getChildByName("bg_panel").addTouchEventListener(function (sender, eventType) {
			if(eventType === ccui.Widget.TOUCH_ENDED){
				if (h1global.curUIMgr.gameplayerinfo_ui && h1global.curUIMgr.gameplayerinfo_ui.is_show) {
					h1global.curUIMgr.gameplayerinfo_ui.hide();
				}
			}
		});
		this.beginAnimPlaying = false;
		this.my_clock_pos = 0;
		this.is_touch_panel_on = false;
		//更新头像信息
		this.init_player_info_panel();
		this.init_operation_panel();
		// this.init_desk_tile_panel();
		//倒计时时间
		this.init_curplayer_panel();
		//闹钟位置
		this.update_game_info_panel();
		//初始化 自己手牌的点击事件
		this.init_my_title_panel();
		//初始化 自动跟注按钮
		this.init_auto_btn();
		//初始化所有玩家的手牌
		this.update_all_tile_panel();
		//更新按钮的状态
		this.update_operation_panel();
		// start 按钮
		this.init_start_btn();
		this.update_start_btn();
		//总分
		this.update_sum_score_panel();
		//当前轮数
		this.update_current_bout_num();
		//是否出现准备按钮
		this.update_stlui_ready_btn();
		//初始化桌面上的筹码
		this.init_desk_stack();
		//更新底部按钮的数字
		this.update_add_btn_num();


		h1global.curUIMgr.gameroominfo_ui.show_by_info(GameRoomInfoUI.ResourceFile3D);

		this.update_roominfo_panel();
		this.update_round_info_panel();

		if (!cc.audioEngine.isMusicPlaying()) {
			cc.audioEngine.resumeMusic();
		}

		if (h1global.curUIMgr.gameplayerinfo_ui && h1global.curUIMgr.gameplayerinfo_ui.is_show) {
			h1global.curUIMgr.gameplayerinfo_ui.hide();
		}
		gameroomUIMgr.init_table_idx_panel(this.rootUINode);

		actionMgr.load_ps_resource(this.rootUINode.getChildByName("action_panel"), const_ps.ACTION_NAME_LIST[0]);
		actionMgr.load_ps_resource(this.rootUINode.getChildByName("action_panel"), const_ps.ACTION_NAME_LIST[1],cc.p(this.rootUINode.width*0.5,this.rootUINode.height*0.8));
	},

	init_my_title_panel: function () {
		var player_hand_panel = this.rootUINode.getChildByName("player_info_panel0").getChildByName("player_hand_panel");
		let see_btn = player_hand_panel.getChildByName("see_btn");
		see_btn.addTouchEventListener(function (sender, eventType) {
			if (eventType === ccui.Widget.TOUCH_ENDED) {
				if (eventType === ccui.Widget.TOUCH_ENDED) {
					let player = h1global.player();
					if (player) {
						player.doPSOperation(const_ps.OP_SEE_CARDS, 0);
						if (cc.sys.isObjectValid(see_btn)) {
							player.curGameRoom.poker_state_list[player.serverSitNum] = const_ps.POKER_SEEN;//这是一条可能会产生bug的状态修改。
							see_btn.setVisible(false);
						}
					}
				}
			}
		});
	},

	init_auto_btn: function () {
		let player = h1global.player();
		if (!player) {
			return;
		}
		var self = this;

		//这段代码要放到update里面
		function doAutoFollow() {
			let player = h1global.player();
			if (player) {
				player.curGameRoom.auto_follow_list[player.serverSitNum] = (player.curGameRoom.auto_follow_list[player.serverSitNum] == 0 ? 1 : 0);
				player.setAutoFollow(player.curGameRoom.auto_follow_list[player.serverSitNum]);
				if (player.curGameRoom.auto_follow_list[player.serverSitNum]) {
					gameroomUIMgr.set_ps_auto_btn_anime(self.rootUINode.getChildByName("auto_btn"));
					self.rootUINode.getChildByName("auto_btn").getChildByName("bottom_label").setString("自动跟注中");
				} else {
					var auto_img = self.rootUINode.getChildByName("auto_btn").getChildByName("auto_img");
					auto_img.setVisible(false);
					auto_img.stopAllActions();
					self.rootUINode.getChildByName("auto_btn").getChildByName("bottom_label").setString("自动跟注");
				}
				if (self.is_touch_panel_on) {
					self.hide_all_touch_panel()
				}
				cc.audioEngine.playEffect("res/sound/voice/poker_ps/btn_voice.mp3");
			}
		}

		this.rootUINode.getChildByName("auto_btn").addClickEventListener(UICommonWidget.touchEventVisibleCheckListener(doAutoFollow));

		if (player.curGameRoom.auto_follow_list[player.serverSitNum]) {
			gameroomUIMgr.set_ps_auto_btn_anime(self.rootUINode.getChildByName("auto_btn"));
			self.rootUINode.getChildByName("auto_btn").getChildByName("bottom_label").setString("自动跟注中");
		} else {
			var auto_img = self.rootUINode.getChildByName("auto_btn").getChildByName("auto_img");
			auto_img.setVisible(false);
			auto_img.stopAllActions();
			self.rootUINode.getChildByName("auto_btn").getChildByName("bottom_label").setString("自动跟注");
		}
	},

	init_curplayer_panel: function () {
		this.game_info_panel = this.rootUINode.getChildByName("game_info_panel");
		this.game_info_panel.setVisible(false);
		// this.cur_player_panel = ccui.helper.seekWidgetByName(this.game_info_panel, "cur_player_panel");
		// var lefttime_label = ccui.helper.seekWidgetByName(this.cur_player_panel, "lefttime_label");
		// lefttime_label.setVisible(false);
	},

	update_wait_time_left: function (leftTime, sumTime) {
		if (!this.is_show) {
			return;
		}
		if (h1global.player() && h1global.player().curGameRoom.room_state == const_val.ROOM_WAITING) {
			return;
		}
		this.update_game_info_panel();
		if (this.containUISnippets["PlayerInfoSnippet" + this.cur_clock_pos]) {
			this.containUISnippets["PlayerInfoSnippet" + this.cur_clock_pos].play_wait_time(leftTime, sumTime);
		}
		// leftTime = Math.floor(leftTime);
		// this.cur_player_panel = ccui.helper.seekWidgetByName(this.game_info_panel, "cur_player_panel");
		// var lefttime_label = ccui.helper.seekWidgetByName(this.cur_player_panel, "lefttime_label");
		// lefttime_label.setString(leftTime);
		// lefttime_label.ignoreContentAdaptWithSize(true);
		// lefttime_label.setVisible(true);
	},

	init_player_info_panel: function () {
		var player = h1global.player();
		if (!player || !player.curGameRoom) {
			return;
		}
		let playerInfoList = player.curGameRoom.playerInfoList;
		for (var i = 0; i < const_ps.MAX_PLAYER_NUM; i++) {
			let snippet = this.containUISnippets["PlayerInfoSnippet" + i];
			if (playerInfoList[i]) {
				snippet.update_player_info_panel(playerInfoList[i]);
				snippet.update_player_online_state(playerInfoList[i]["online"]);
				if (player.curGameRoom.room_state === const_val.ROOM_WAITING) {
					snippet.update_ready_state(player.curGameRoom.playerStateList[i]);
				}else{
					if(playerInfoList[i]["identify"] === const_ps.GAME_PLAYER && player.curGameRoom.poker_state_list[i] >= const_ps.POKER_FAIL){
						snippet.set_head_gray();
					}
				}

				snippet.setVisible(true);
			} else {
				snippet.setVisible(false);
			}
		}
		if (player.curGameRoom.room_state == const_val.ROOM_PLAYING) {
			this.update_dealer_idx(player.curGameRoom.dealerIdx, 1);
		}
	},


	update_player_info_panel: function (serverSitNum, playerInfo) {
		if (this.is_show) {
			this.containUISnippets["PlayerInfoSnippet" + serverSitNum].update_player_info_panel(playerInfo);
		}
	},

	update_all_player_score: function (playerInfoList) {
		cc.log("update_all_player_score");
		if (this.is_show) {
			for (var i = 0; i < playerInfoList.length; i++) {
				if (playerInfoList[i]) {
					this.containUISnippets["PlayerInfoSnippet" + playerInfoList[i]['idx']].update_score(playerInfoList[i]['total_score']);
					this.update_raise_score(playerInfoList[i]['idx']);
				}
			}
		}
	},

	update_sum_score_panel: function () {
		let player = h1global.player();
		var sum_score_panel = this.rootUINode.getChildByName("sum_score_panel");
		if (player && player.curGameRoom.room_state === const_val.ROOM_PLAYING) {
			sum_score_panel.setVisible(true);
			sum_score_panel.getChildByName("sum_score_label").setString("" + player.curGameRoom.sum_score);
		} else {
			sum_score_panel.setVisible(false);
		}
	},

	update_current_bout_num: function () {
		let player = h1global.player();
		var bout_label = this.rootUINode.getChildByName("round_info_panel").getChildByName("bout_label");
		var cur_bout_num = player.curGameRoom.current_bout_num + 1 > player.curGameRoom.bout_num ? player.curGameRoom.bout_num : player.curGameRoom.current_bout_num + 1;
		bout_label.setString("轮数：" + cur_bout_num + "/" + player.curGameRoom.bout_num);
	},

	show_all_touch_panel: function () {
		cc.log("show_all_touch_panel");
		var player = h1global.player();
		if (!player || !player.curGameRoom) {
			return;
		}
		let playerInfoList = player.curGameRoom.playerInfoList;
		if (this.is_show) {
			for (var i = 0; i < playerInfoList.length; i++) {
				if (playerInfoList[i] && playerInfoList[i]["identify"] == const_ps.GAME_PLAYER && player.curGameRoom.poker_state_list[playerInfoList[i]['idx']] < const_ps.POKER_FAIL && playerInfoList[i]['idx'] != player.serverSitNum) {
					this.containUISnippets["PlayerInfoSnippet" + playerInfoList[i]['idx']].show_air_panel();
				}
			}
			this.rootUINode.getChildByName("ng_btn").setVisible(true);
			this.is_touch_panel_on = true;
		}
	},

	hide_all_touch_panel: function () {
		cc.log("hide_all_touch_panel");
		var player = h1global.player();
		if (!player || !player.curGameRoom) {
			return;
		}
		let playerInfoList = player.curGameRoom.playerInfoList;
		if (this.is_show) {
			for (var i = 0; i < playerInfoList.length; i++) {
				if (playerInfoList[i]) {
					this.containUISnippets["PlayerInfoSnippet" + playerInfoList[i]['idx']].hide_air_panel();
				}
			}
			let operation_panel = this.rootUINode.getChildByName("operation_panel");
			this.set_touch_enabled_and_children(operation_panel.getChildByName("btn_op_1"), false);
			this.rootUINode.getChildByName("ng_btn").setVisible(false);
			this.is_touch_panel_on = false;
		}
	},

	init_start_btn: function () {
		var self = this;
		this.rootUINode.getChildByName("start_btn").addTouchEventListener(function (source, eventType) {
			if (eventType === ccui.Widget.TOUCH_ENDED) {
				if (h1global.player()&&h1global.player().curGameRoom) {
					h1global.player().start();
					// h1global.player().curGameRoom.curRound = 1;
					self.rootUINode.getChildByName("start_btn").setVisible(false);
				}
			}
		})
	},

	update_start_btn: function () {
		let player = h1global.player();
		cc.log("player.curGameRoom.playerStateList", player.curGameRoom.playerStateList);
		cc.log("player.curGameRoom.playerInfoList", player.curGameRoom.playerInfoList);
		if (!player || player.curGameRoom.curRound > 0 || !player.curGameRoom.playerInfoList[player.serverSitNum]["is_control"]) {
			cc.log("不满足开始按钮出现条件");
			this.rootUINode.getChildByName("start_btn").setVisible(false);
			return;
		}
		var playerInfoList = player.curGameRoom.playerInfoList;
		let max_ready_len = 0;
		for (var k in playerInfoList) {
			if (playerInfoList[k] !== null) {
				max_ready_len += 1;
			}
		}
		if (max_ready_len > 1 && collections.count(player.curGameRoom.playerStateList, 1) >= max_ready_len) {
			cc.log("你现在可以开始");
			this.rootUINode.getChildByName("start_btn").setVisible(true);
		} else {
			cc.log("你现在还不能开始");
			this.rootUINode.getChildByName("start_btn").setVisible(false);
		}
	},

	/**
	 *
	 * @param state 1 = ready
	 */
	update_player_ready_state: function (serverSitNum, state) {
		if (this.is_show) {
			// if (h1global.player() && h1global.player().curGameRoom.room_state === const_val.ROOM_WAITING) {
			// 	this.containUISnippets["PlayerInfoSnippet" + serverSitNum].update_ready_state(state);
			// }
			this.containUISnippets["PlayerInfoSnippet" + serverSitNum].update_ready_state(state);
		}
	},

	update_player_online_state: function (serverSitNum, state) {
		if (this.is_show) {
			this.containUISnippets["PlayerInfoSnippet" + serverSitNum].update_player_online_state(state);
		}
	},

	_setBeginGameShow: function (is_show, myServerSitNum, curGameRoom) {
		let serverSitNum = myServerSitNum;
		for (var i = 0; i < const_ps.MAX_PLAYER_NUM; i++) {
			let idx = this.server2CurSitNumOffline(i, myServerSitNum);
			// Note: 如果有明牌打牌 这里要改
			if (myServerSitNum === i) {
				this.rootUINode.getChildByName("player_hand_panel" + idx).setVisible(is_show);
			} else {
				this.rootUINode.getChildByName("player_hand_panel" + idx).setVisible(false);
			}
		}
		if (!is_show) {
			this.hide_operation_panel();
			this.hide_player_desk_panel();
		} else {

			this.update_player_hand_tiles(serverSitNum, curGameRoom.handTilesList[serverSitNum]);
			if (curGameRoom.dealerIdx === -1) {
				// this.hide_host_cards_panel();
			} else {
				this.hide_dealer_operation_panel();
				if (curGameRoom.curPlayerSitNum === serverSitNum) {
					this.update_operation_panel();
				} else {
					this.hide_operation_panel();
				}
			}
			this.init_desk_tile_panel();
		}
	},

	_removeStartAnimExecutor: function (self) {
		if (self.startAnimExecutor) {
			self.startAnimExecutor.removeFromParent();
			self.startAnimExecutor = null;
		}
	},

	_removeAnimNode: function () {
		if (!this.is_show) {
			return;
		}
		var i = 100;
		while (i > 0) {
			let node = this.rootUINode.getChildByName("deal_anim_node");
			if (node == undefined || node == null) {
				return;
			}
			i--;
			if (cc.sys.isObjectValid(node)) {
				node.removeFromParent();
			}
		}
	},

	startBeginAnim: function (startTilesList, serverSitNum, curGameRoom) {
		if (this.beginAnimPlaying) {
			cc.error("already Playing start anim");
			return;
		}
		cc.log("记得加上开场动画");
		this.beginAnimPlaying = true;//其实没啥必要了..不过先保留形式吧

		var player = h1global.player();
		if (!player || !player.curGameRoom) {
			return;
		}
		let playerInfoList = player.curGameRoom.playerInfoList;
		if (this.is_show) {
			for (var i = 0; i < playerInfoList.length; i++) {
				if (playerInfoList[i] && playerInfoList[i]["identify"] == const_ps.GAME_PLAYER) {
					this.play_anime_action(playerInfoList[i]['idx'], const_ps.OP_RAISE_CHIP, [1 * player.curGameRoom.mul_num]);
				}
			}
			let node = cc.Node.create();
			this.rootUINode.addChild(node);
			node.runAction(cc.sequence(
				cc.delayTime(1),
				cc.callFunc(()=>{
					cc.audioEngine.playEffect("res/sound/voice/poker_ps/start_voice.mp3");
					node.removeFromParent(true);
				})
			));
			// setTimeout(()=>{
			// 	cc.audioEngine.playEffect("res/sound/voice/poker_ps/start_voice.mp3");
			// },1000);
		}
		this.stopBeginAnim(serverSitNum, curGameRoom);

		// this.lock_player_hand_tiles();
		// this.startAnimExecutor = cc.Node.create();
		// this.rootUINode.addChild(this.startAnimExecutor);
		// this._setBeginGameShow(false, serverSitNum, curGameRoom);
		//
		// var self = this;
		// var index = 0;
		// let step1 = cc.sequence(
		//     cc.delayTime(0.1), cc.callFunc(function () {
		//         self.update_player_hand_tiles(serverSitNum, startTilesList.slice(0, ++index))
		//     })
		// ).repeat(startTilesList.length);
		// let step2 = cc.callFunc(function () {
		//     self.stopBeginAnim(serverSitNum, curGameRoom);
		// });
		// this.startAnimExecutor.runAction(cc.sequence(step1, step2));
	},

	stopBeginAnim: function (myServerSitNum, curGameRoom) {
		// this._removeStartAnimExecutor(this);
		// this._removeAnimNode();
		this.beginAnimPlaying = false;
		// this._setBeginGameShow(true, myServerSitNum, curGameRoom);
		// this.unlock_player_hand_tiles();
	},

	_createDealerTxtPanelIfNeed: function () {
		let panel = this.rootUINode.getChildByName("_dealer_txt_panel");
		if (!panel) {
			panel = cc.Node.create();
			panel.setName("_dealer_txt_panel");
			this.rootUINode.addChild(panel);
		}
		return panel;
	},

	_createMulTxtPanelIfNeed: function () {
		let panel = this.rootUINode.getChildByName("_mul_txt_panel");
		if (!panel) {
			panel = cc.Node.create();
			panel.setName("_mul_txt_panel");
			this.rootUINode.addChild(panel);
		}
		return panel;
	},

	update_dealer_idx: function (dealerIdx, no_action) {
		if (!this.is_show) {
			return;
		}
		cc.log("dealer: ", dealerIdx);
		for (var i = 0; i < const_ps.MAX_PLAYER_NUM; i++) {
			this.containUISnippets["PlayerInfoSnippet" + i].update_dealer_idx(i === dealerIdx, no_action ? false : true);
		}
	},

	lock_operation_panel: function () {
		var op_btn_list = this.rootUINode.getChildByName("operation_panel").getChildren();
		for (var k in op_btn_list) {
			this.set_touch_enabled_and_children(op_btn_list[k], false);
		}
	},

	unlock_operation_panel: function () {
		var op_btn_list = this.rootUINode.getChildByName("operation_panel").getChildren();
		for (var k in op_btn_list) {
			this.set_touch_enabled_and_children(op_btn_list[k], true);
		}
	},

	update_player_hand_tiles: function (serverSitNum, tileList) {

	},

	update_all_tile_panel: function () {
		var player = h1global.player();
		if (!player || !player.curGameRoom) {
			return;
		}
		let playerInfoList = player.curGameRoom.playerInfoList;
		for (var k in playerInfoList) {
			if (playerInfoList[k]) {
				if (playerInfoList[k]["identify"] == const_ps.GAME_PLAYER && player.curGameRoom.room_state == const_val.ROOM_PLAYING) {
					this.update_player_tiles(playerInfoList[k]["idx"]);
					this.update_raise_score(playerInfoList[k]["idx"]);
				} else {
					this.hide_player_tiles(playerInfoList[k]["idx"]);
				}
			}
		}
	},

	update_player_tiles: function (serverSitNum) {
		if (this.is_show) {
			if (h1global.player()) {
				this.containUISnippets["PlayerInfoSnippet" + serverSitNum].update_player_tiles(h1global.player().curGameRoom.handTilesList[serverSitNum], h1global.player().curGameRoom.poker_state_list[serverSitNum],h1global.player().serverSitNum === serverSitNum);
			}
		}
	},

	hide_player_tiles: function (serverSitNum) {
		if (this.is_show) {
			this.containUISnippets["PlayerInfoSnippet" + serverSitNum].hide_player_tiles();
			this.containUISnippets["PlayerInfoSnippet" + serverSitNum].hide_speak_panel();
		}
	},

	update_raise_score: function (serverSitNum) {
		if (this.is_show && h1global.player()) {
			this.containUISnippets["PlayerInfoSnippet" + serverSitNum].update_raise_score(h1global.player().curGameRoom.bout_score[serverSitNum]);
		}
	},

	player_pk_anime: function (data, anime_node) {
		if (this.is_show) {
			this.containUISnippets["PlayerInfoSnippet" + data[0]].head_move(true, data[2], anime_node);
			this.containUISnippets["PlayerInfoSnippet" + data[1]].head_move(false, !data[2], anime_node);
		}
	},

	player_fold_anime: function (serverSitNum, call_back) {
		if (this.is_show) {
			this.containUISnippets["PlayerInfoSnippet" + serverSitNum].poker_fly(call_back);
		}
	},

	init_operation_panel: function () {
		var self = this;
		let operation_panel = this.rootUINode.getChildByName("operation_panel");
		operation_panel.setVisible(true);

		function doPass() {
			let player = h1global.player();
			if (player) {
				player.doOperation(const_ps.OP_FOLD_CARDS, 0);
				if (self.is_touch_panel_on) {
					self.hide_all_touch_panel()
				}
				cc.audioEngine.playEffect("res/sound/voice/poker_ps/btn_voice.mp3");
			}
		}

		function doCompare() {
			self.show_all_touch_panel();
			if (cc.sys.isObjectValid(operation_panel)) {
				self.set_touch_enabled_and_children(operation_panel.getChildByName("btn_op_1"), false);
			}
			cc.audioEngine.playEffect("res/sound/voice/poker_ps/btn_voice.mp3");
		}

		function doRaise(source) {
			let player = h1global.player();
			if (player) {
				let s = source.data * player.curGameRoom.mul_num;
				player.doOperation(const_ps.OP_RAISE_CHIP, player.curGameRoom.poker_state_list[player.serverSitNum] === const_ps.POKER_SEEN ? s * 2 : s);
				if (self.is_touch_panel_on) {
					self.hide_all_touch_panel();
				}
			}
			cc.audioEngine.playEffect("res/sound/voice/poker_ps/btn_voice.mp3");
		}

		function doFollow() {
			let player = h1global.player();
			if (player) {
				let s = player.curGameRoom.min_stack;
				player.doOperation(const_ps.OP_FOLLOW_CHIP, player.curGameRoom.poker_state_list[player.serverSitNum] === const_ps.POKER_SEEN ? s * 2 : s);
				if (self.is_touch_panel_on) {
					self.hide_all_touch_panel()
				}
			}
			cc.audioEngine.playEffect("res/sound/voice/poker_ps/btn_voice.mp3");
		}

		//弃牌操作
		operation_panel.getChildByName("btn_op_0").addClickEventListener(UICommonWidget.touchEventVisibleCheckListener(doPass));
		operation_panel.getChildByName("btn_op_1").addClickEventListener(UICommonWidget.touchEventVisibleCheckListener(doCompare));

		operation_panel.getChildByName("btn_op_2").data = const_ps.RAISE_NUM[0];
		operation_panel.getChildByName("btn_op_3").data = const_ps.RAISE_NUM[1];
		operation_panel.getChildByName("btn_op_4").data = const_ps.RAISE_NUM[2];
		operation_panel.getChildByName("btn_op_2").addClickEventListener(UICommonWidget.touchEventVisibleCheckListener(doRaise));
		operation_panel.getChildByName("btn_op_3").addClickEventListener(UICommonWidget.touchEventVisibleCheckListener(doRaise));
		operation_panel.getChildByName("btn_op_4").addClickEventListener(UICommonWidget.touchEventVisibleCheckListener(doRaise));
		operation_panel.getChildByName("btn_op_5").addClickEventListener(UICommonWidget.touchEventVisibleCheckListener(doFollow));

		function doNG() {
			self.hide_all_touch_panel();
			if (cc.sys.isObjectValid(operation_panel)) {
				self.set_touch_enabled_and_children(operation_panel.getChildByName("btn_op_1"), true);
			}
			cc.audioEngine.playEffect("res/sound/voice/poker_ps/btn_voice.mp3");
		}

		this.rootUINode.getChildByName("ng_btn").addClickEventListener(UICommonWidget.touchEventVisibleCheckListener(doNG));
		this.rootUINode.getChildByName("ng_btn").setVisible(false);

		let player = h1global.player();
		if (!player) {
			this.hide_operation_panel();
			return;
		}
		if (player.startActions["GameRoomUI"]) {
			return;
		}
		let curGameRoom = player.curGameRoom;
		if (curGameRoom.room_state === const_val.ROOM_WAITING) {
			this.hide_operation_panel();
			return;
		}

		// if (curGameRoom.dealerIdx === -1) {
		// 	if (curGameRoom.curPlayerSitNum === player.serverSitNum) {
		// 		this.update_dealer_operation_panel();
		// 	} else {
		// 		this.hide_dealer_operation_panel();
		// 	}
		// } else {
		// 	this.hide_dealer_operation_panel();
		// 	//这里加入加倍判断
		// 	if (player.curGameRoom.mul_mode && player.curGameRoom.mul_score_list.indexOf(0) >= 0 && collections.count(player.curGameRoom.mul_score_list, 1) !== 2) {
		// 		this.update_operation_panel();
		// 	} else {
		// 		if (curGameRoom.curPlayerSitNum === player.serverSitNum) {
		// 			this.update_operation_panel();
		// 		} else {
		// 			this.hide_operation_panel();
		// 		}
		// 	}
		// }
	},

	playOperationFunc: function (curSitNum, opId) {
		var self = this;
		var cur_img = ccui.ImageView.create();
		var cur_img1 = ccui.ImageView.create();
		var cur_img2 = ccui.ImageView.create();
		if ((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) || (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)) {
			cur_img1.loadTexture("res/ui/GameRoomUI/" + opId + "_1.png");
			cur_img2.loadTexture("res/ui/GameRoomUI/" + opId + "_2.png");
			opPos(curSitNum, cur_img);
			this.rootUINode.addChild(cur_img);
			cur_img.addChild(cur_img1);
			cur_img.addChild(cur_img2);
			cur_img1.setLocalZOrder(2);
			cur_img2.setLocalZOrder(1);
			cur_img1.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1, 2), cc.DelayTime.create(0.1), cc.ScaleTo.create(0.05, 1),
				cc.Spawn.create(cc.FadeTo.create(0.2, 125), cc.ScaleTo.create(0.2, 1.3)),
				cc.FadeOut.create(0.3),
				cc.removeSelf()));
			cur_img2.runAction(cc.Sequence.create(
				cc.Spawn.create(cc.ScaleTo.create(0.1, 2), cc.MoveBy.create(0.1, cc.p(-2, -9))),
				cc.ScaleTo.create(0.1, 1),
				cc.DelayTime.create(1.2),
				cc.removeSelf()));
		} else {
			cur_img.loadTexture("res/ui/GameRoomUI/" + opId + "_2.png");
			cur_img.setScale(4.0);
			opPos(curSitNum, cur_img);
			this.rootUINode.addChild(cur_img);
			cur_img.runAction(cc.Sequence.create(cc.ScaleTo.create(0.2, 1.5), cc.DelayTime.create(0.5), cc.removeSelf()));
		}

		//动作的位置
		function opPos(curSitNum, cur_img) {
			if (curSitNum == 0) {
				cur_img.setPosition(cc.p(cc.winSize.width * 0.5, self.rootUINode.getChildByName("player_tile_panel0").getPositionY() + 160));
			} else if (curSitNum == 1) {
				cur_img.setPosition(cc.p(self.rootUINode.getChildByName("player_tile_panel1").getPositionX(), cc.winSize.height * 0.5));
			} else if (curSitNum == 2) {
				cur_img.setPosition(cc.p(cc.winSize.width * 0.5, self.rootUINode.getChildByName("player_tile_panel2").getPositionY() - 160));
			} else if (curSitNum == 3) {
				cur_img.setPosition(cc.p(self.rootUINode.getChildByName("player_tile_panel3").getPositionX(), cc.winSize.height * 0.5));
			} else {
				cur_img.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.5));
			}
		}
	},

	playOperationEffect: function (opId, serverSitNum, tile) {
		var curSitNum = -1;
		if (serverSitNum === undefined) {
			curSitNum = -1;
		} else {
			curSitNum = h1global.entityManager.player().server2CurSitNum(serverSitNum);
		}
	},

	getEmotionPos: function (playerInfoPanel, idx) {
		var pos = playerInfoPanel.getPosition();
		if (idx === 0) {
			pos = cc.p(pos.x + playerInfoPanel.width, pos.y + playerInfoPanel.height * 0.5);
		} else if (idx === 4) {
			pos = cc.p(pos.x - playerInfoPanel.width * 0.9, pos.y + playerInfoPanel.height * 0.1);
		} else if (idx === 3) {
			//pos = cc.p(pos.x - playerInfoPanel.width * 1.55, pos.y);
			pos = cc.p(pos.x + playerInfoPanel.width, pos.y);
		} else if (idx === 2) {
			pos = cc.p(pos.x - playerInfoPanel.width * 0.5, pos.y - playerInfoPanel.height * 0.3);
		} else if (idx === 1) {
			pos = cc.p(pos.x + playerInfoPanel.width * 0.5, pos.y - playerInfoPanel.height * 0.9);
		} else if (idx === 5) {
			pos = cc.p(pos.x + playerInfoPanel.width * 0.9, pos.y + playerInfoPanel.height * 0.5);
		}
		return pos;
	},

	playEmotionAnim: function (serverSitNum, eid) {
		emotion.playEmotion(this.rootUINode, eid, serverSitNum);
		return;//下面的是以前的代码
		var curSitNum = h1global.entityManager.player().server2CurSitNum(serverSitNum);
		var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + curSitNum);
		var talk_img = ccui.ImageView.create();
		// talk_img.setPosition(this.getMessagePos(player_info_panel).x - 70, this.getMessagePos(player_info_panel).y + 10);
		talk_img.setPosition(this.getEmotionPos(player_info_panel, curSitNum));
		talk_img.loadTexture("res/ui/Default/talk_frame.png");
		talk_img.setScale9Enabled(true);
		talk_img.setContentSize(cc.size(100, 120));
		this.rootUINode.addChild(talk_img);
		var talk_angle_img = ccui.ImageView.create();
		talk_angle_img.loadTexture("res/ui/Default/talk_angle.png");
		talk_img.addChild(talk_angle_img);
		// 加载表情图片
		cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA4444;
		var cache = cc.spriteFrameCache;
		var plist_path = "res/effect/biaoqing.plist";
		var png_path = "res/effect/biaoqing.png";
		cache.addSpriteFrames(plist_path, png_path);
		cc.Texture2D.defaultPixelFormat = cc.Texture2D.PIXEL_FORMAT_RGBA8888;

		var anim_frames = [];
		for (var i = 1; i <= const_val.ANIM_LIST[eid - 1]; i++) {
			var frame = cache.getSpriteFrame("Emot/biaoqing_" + eid.toString() + "_" + i.toString() + ".png");
			if (frame) {
				anim_frames.push(frame);
			}
		}
		var effect_animation = new cc.Animation(anim_frames, 1.2 / const_val.ANIM_LIST[eid - 1]);
		var effect_action = new cc.Animate(effect_animation);

		var emot_sprite = cc.Sprite.create();
		// emot_sprite.setScale(1.0);
		emot_sprite.setScale(0.4);
		emot_sprite.setPosition(cc.p(50, 60));
		// emot_sprite.setPosition(this.getMessagePos(player_info_panel));
		talk_img.addChild(emot_sprite);
		if (curSitNum > 0 && curSitNum < 2) {
			talk_img.setScaleX(-1);
			talk_img.setPositionX(talk_img.getPositionX() - 40);
			talk_img.setPositionY(talk_img.getPositionY() - 10);
		} else {
			talk_img.setPositionX(talk_img.getPositionX() + 40);
			talk_angle_img.setLocalZOrder(3);
		}
		talk_angle_img.setPosition(3, talk_angle_img.getPositionY() + 50);
		emot_sprite.runAction(cc.Sequence.create(cc.Repeat.create(effect_action, 2), cc.CallFunc.create(function () {
			talk_img.removeFromParent();
		})));
	},

	getMessagePos: function (playerInfoPanel, idx) {
		var pos = playerInfoPanel.getPosition();
		if (idx === 0) {
			pos = cc.p(pos.x + 100, pos.y + 100);
		} else if (idx === 1) {
			pos = cc.p(pos.x - 50, pos.y);
		} else if (idx === 2) {
			pos = cc.p(pos.x - 50, pos.y);
		} else if (idx === 3) {
			pos = cc.p(pos.x + 50, pos.y - 5);
		} else if (idx === 4) {
			pos = cc.p(pos.x + 50, pos.y);
		} else if (idx === 5) {
			pos = cc.p(pos.x + playerInfoPanel.width * 0.4, pos.y + playerInfoPanel.height * 0.4);
		}
		return pos;
	},

	playMessageAnim: function (serverSitNum, msg) {
		if (!msg || msg == "") {
			return;
		}
		var idx = h1global.player().server2CurSitNum(serverSitNum);
		var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + idx);
		var talk_img = ccui.ImageView.create();
		var talk_angle_img = ccui.ImageView.create();
		talk_img.setAnchorPoint(0, 0.5);
		talk_img.setPosition(this.getMessagePos(player_info_panel, idx));
		talk_img.loadTexture("res/ui/Default/talk_frame.png");
		talk_angle_img.loadTexture("res/ui/Default/talk_angle.png");
		talk_img.addChild(talk_angle_img);
		this.rootUINode.addChild(talk_img);

		var msg_label = cc.LabelTTF.create("", "Arial", 22);
		msg_label.setString(msg);
		msg_label.setDimensions(msg_label.getString().length * 26, 0);
		msg_label.setColor(cc.color(20, 85, 80));
		msg_label.setAnchorPoint(cc.p(0.5, 0.5));
		talk_img.addChild(msg_label);
		talk_img.setScale9Enabled(true);
		talk_img.setContentSize(cc.size(msg_label.getString().length * 23 + 20, talk_img.getContentSize().height));
		talk_angle_img.setPosition(3, talk_img.getContentSize().height * 0.5);

		msg_label.setPosition(cc.p(msg_label.getString().length * 26 * 0.50 + 13, 23));
		if (idx == 2 || idx == 1) {
			talk_img.setScaleX(-1);
			msg_label.setScaleX(-1);
			msg_label.setPosition(cc.p(msg_label.getString().length * 26 * 0.37 + 10, 23));
		}
		msg_label.runAction(cc.Sequence.create(cc.DelayTime.create(2.0), cc.CallFunc.create(function () {
			talk_img.removeFromParent();
		})));
	},

	getExpressionPos: function (player_info_panel, idx) {
		// 魔法表情
		var pos = player_info_panel.getPosition();
		if (idx === 0) {
			pos = cc.p(pos.x, pos.y);
		} else if (idx === 1) {
			pos = cc.p(pos.x, pos.y);
		} else if (idx === 2) {
			pos = cc.p(pos.x, pos.y);
		} else if (idx === 3) {
			pos = cc.p(pos.x, pos.y - 5);
		} else if (idx === 4) {
			pos = cc.p(pos.x, pos.y);
		} else if (idx === 5) {
			pos = cc.p(pos.x + player_info_panel.width * 0.4, pos.y + player_info_panel.height * 0.4);
		}
		return pos;
	},

	playExpressionAnim: function (fromIdx, toIdx, eid) {
		var self = this;
		// if (eid === 3) {	//因为扔钱动画不是plist，所以单独处理
		// 	self.playMoneyAnim(fromIdx, toIdx);
		// 	return;
		// }
		var rotate = 0;
		var moveTime = 0.7;
		var flag = (fromIdx % 3 == 0 && toIdx % 3 == 0) || (fromIdx % 3 != 0 && toIdx % 3 != 0);
		if (flag) {
			moveTime = 0.3;
		}
		var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + fromIdx.toString());
		var expression_img = ccui.ImageView.create();
		expression_img.setPosition(this.getExpressionPos(player_info_panel, fromIdx));
		expression_img.loadTexture("res/ui/PlayerInfoUI/expression_" + const_val.EXPRESSION_ANIM_LIST[eid] + ".png");
		this.rootUINode.addChild(expression_img);
		// if(eid > 1){
		//    rotate = 1440;
		//    rotate = rotate + (moveTime - 0.7) * 1800;
		// }
		expression_img.runAction(cc.Spawn.create(cc.RotateTo.create(0.2 + moveTime, rotate), cc.Sequence.create(
			cc.ScaleTo.create(0.1, 1.5),
			cc.ScaleTo.create(0.1, 1),
			cc.MoveTo.create(moveTime, self.getExpressionPos(self.rootUINode.getChildByName("player_info_panel" + toIdx.toString()), toIdx)),
			cc.CallFunc.create(function () {
				expression_img.removeFromParent();
				eid !== 3 ? cc.audioEngine.playEffect("res/sound/effect/" + const_val.EXPRESSION_ANIM_LIST[eid] + ".mp3") : 0;
				self.playExpressionAction(toIdx, self.getExpressionPos(self.rootUINode.getChildByName("player_info_panel" + toIdx.toString()), toIdx), eid);
			})
		)));
	},

	playMoneyAnim: function (fromIdx, toIdx) {
		var self = this;
		var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + fromIdx.toString());

		var money_img_list = [];
		var baodian_img_list = [];
		for (var j = 0; j < 10; j++) {
			//var money_img  = new cc.Sprite("res/ui/PlayerInfoUI/dzpk_dj_icon_ani.png");
			var money_img = new cc.Sprite("res/ui/PlayerInfoUI/expression_money.png");
			var baodian_img = new cc.Sprite("res/ui/PlayerInfoUI/baodian.png");
			money_img.setPosition(this.getExpressionPos(player_info_panel, fromIdx));

			baodian_img.setVisible(false);
			//baodian_img.setLocalZOrder(-1);
			money_img.setLocalZOrder(1);

			this.rootUINode.addChild(money_img);
			this.rootUINode.addChild(baodian_img);
			money_img_list.push(money_img);
			baodian_img_list.push(baodian_img);
		}
		var pos = self.getExpressionPos(self.rootUINode.getChildByName("player_info_panel" + toIdx.toString()), toIdx);
		for (var i = 0; i < 10; i++) {
			var random_pos = cc.p(Math.random() * 60 - 30, Math.random() * 60 - 30);
			(function (i) {
				money_img_list[i].runAction(cc.sequence(
					cc.delayTime(i * 0.1),
					cc.spawn(cc.rotateBy(0.2, 360), cc.moveTo(0.2, pos.x, pos.y + random_pos.y)),
					cc.callFunc(function () {
						cc.audioEngine.playEffect("res/sound/effect/com_facesound_3.mp3");
						money_img_list[i].setScale(1.2);
						baodian_img_list[i].setPosition(pos.x + i, pos.y + 30 + i);
						baodian_img_list[i].runAction(cc.rotateTo(0.1, 45));
						baodian_img_list[i].setVisible(true);
					}),
					cc.moveBy(0.1, 5, 3),
					cc.callFunc(function () {
						money_img_list[i].setScale(1);
						baodian_img_list[i].setVisible(false);
					}),
					cc.spawn(cc.rotateTo(0.2, Math.random() * 40 - Math.random() * 40), cc.moveBy(0.2, (i % 2 > 0 ? (9 - i) * 4 : -(9 - i) * 4) + Math.random() * 5 - 10, -26 + i * 2)),
					cc.delayTime((9 - i) * 0.1),
					cc.callFunc(function () {
						money_img_list[i].removeFromParent(true);
						baodian_img_list[i].removeFromParent(true);
					})
				));
			})(i)
		}
	},

	playExpressionAction: function (idx, pos, eid) {
		if (idx < 0 || idx > 4) {
			return;
		}
		var self = this;
		UICommonWidget.load_effect_plist("expression");
		var expression_sprite = cc.Sprite.create();
		// var ptime = 2;
		// if(eid == 3){
		//    expression_sprite.setScale(2);
		// }
		expression_sprite.setPosition(pos);
		self.rootUINode.addChild(expression_sprite);
		expression_sprite.runAction(cc.Sequence.create(
			UICommonWidget.create_effect_action({
				"FRAMENUM": const_val.EXPRESSION_ANIMNUM_LIST[eid],
				"TIME": const_val.EXPRESSION_ANIMNUM_LIST[eid] / 16,
				"NAME": "Expression/" + const_val.EXPRESSION_ANIM_LIST[eid] + "_"
			}),
			cc.DelayTime.create(0.5),
			cc.CallFunc.create(function () {
				expression_sprite.removeFromParent();
			})
		));
	},

	playVoiceAnim: function (serverSitNum, record_time) {
		var self = this;
		if (cc.audioEngine.isMusicPlaying()) {
			cc.audioEngine.pauseMusic();
			cc.audioEngine.pauseAllEffects();
			cc.audioEngine.setEffectsVolume(0);
		}
		var idx = h1global.entityManager.player().server2CurSitNum(serverSitNum);
		var interval_time = 0.8;
		this.talk_img_num += 1;
		// var player_info_panel = this.rootUINode.getChildByName("player_info_panel" + h1global.entityManager.player().server2CurSitNum(serverSitNum));
		var player_info_panel = undefined;
		if (serverSitNum < 0) {
			player_info_panel = this.rootUINode.getChildByName("agent_info_panel");
		} else {
			player_info_panel = this.rootUINode.getChildByName("player_info_panel" + h1global.entityManager.player().server2CurSitNum(serverSitNum));
		}
		var talk_img = ccui.ImageView.create();
		talk_img.setPosition(this.getMessagePos(player_info_panel, idx));
		talk_img.loadTexture("res/ui/Default/talk_frame.png");
		talk_img.setScale9Enabled(true);
		talk_img.setContentSize(cc.size(100, talk_img.getContentSize().height));
		this.rootUINode.addChild(talk_img);
		var talk_angle_img = ccui.ImageView.create();
		talk_angle_img.loadTexture("res/ui/Default/talk_angle.png");
		talk_img.addChild(talk_angle_img);

		var voice_img1 = ccui.ImageView.create();
		voice_img1.loadTexture("res/ui/Default/voice_img1.png");
		voice_img1.setPosition(cc.p(50, 23));
		talk_img.addChild(voice_img1);
		var voice_img2 = ccui.ImageView.create();
		voice_img2.loadTexture("res/ui/Default/voice_img2.png");
		voice_img2.setPosition(cc.p(50, 23));
		voice_img2.setVisible(false);
		talk_img.addChild(voice_img2);
		voice_img2.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.DelayTime.create(interval_time), cc.CallFunc.create(function () {
			voice_img1.setVisible(false);
			voice_img2.setVisible(true);
			voice_img3.setVisible(false);
		}), cc.DelayTime.create(interval_time * 2), cc.CallFunc.create(function () {
			voice_img2.setVisible(false)
		}))));
		var voice_img3 = ccui.ImageView.create();
		voice_img3.loadTexture("res/ui/Default/voice_img3.png");
		voice_img3.setPosition(cc.p(50, 23));
		voice_img3.setVisible(false);
		talk_img.addChild(voice_img3);
		voice_img3.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.DelayTime.create(interval_time * 2), cc.CallFunc.create(function () {
			voice_img1.setVisible(false);
			voice_img2.setVisible(false);
			voice_img3.setVisible(true);
		}), cc.DelayTime.create(interval_time), cc.CallFunc.create(function () {
			voice_img3.setVisible(false);
			voice_img1.setVisible(true);
		}))));
		talk_angle_img.setPosition(3, talk_img.getContentSize().height * 0.5);
		if (idx > 3 && idx < 6) {
			talk_img.setScale(-1);
			talk_img.setPositionX(talk_img.getPositionX() - 40);
		} else {
			talk_img.setPositionX(talk_img.getPositionX() + 40);
			talk_angle_img.setLocalZOrder(3);
		}
		talk_img.runAction(cc.Sequence.create(cc.DelayTime.create(record_time), cc.CallFunc.create(function () {
			talk_img.removeFromParent();
			self.talk_img_num -= 1;
			if (self.talk_img_num === 0) {
				if (!cc.audioEngine.isMusicPlaying()) {
					cc.audioEngine.resumeMusic();
					cc.audioEngine.resumeAllEffects();
					cc.audioEngine.setEffectsVolume(cc.sys.localStorage.getItem("EFFECT_VOLUME") * 0.01);
				}
			}
		})));
		// return talk_img;
	},

	play_result_anim: function (callback, roundRoomInfo) {
		cc.log(roundRoomInfo);
		// var act_cmp = roundRoomInfo["act_cmp"];
		// if (act_cmp.length > 0) {
		// 	for (var k in act_cmp) {
		// 		actionMgr.add_ps_action_list(this.rootUINode, const_ps.ACTION_NAME_LIST[0], act_cmp[k]);
		// 	}
		// }
		var auto_img = this.rootUINode.getChildByName("auto_btn").getChildByName("auto_img");
		auto_img.setVisible(false);
		auto_img.stopAllActions();
		this.rootUINode.getChildByName("auto_btn").getChildByName("bottom_label").setString("自动跟注");
		this.rootUINode.getChildByName("player_info_panel0").getChildByName("player_hand_panel").getChildByName("see_btn").setVisible(false);
		this.rootUINode.getChildByName("auto_btn").setVisible(false);
		this.lock_operation_panel();
		var fnl_cmp = roundRoomInfo["fnl_cmp"];
		let player = h1global.player();
		if (player && fnl_cmp.length > 0) {
			//在遍历之前 可以在add_ps_action_list加入 进行自动比牌的 动画提示
			// if (this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1) {
			// 	cutil.playEffect(this.gameType, "male/kanpai.mp3");
			// } else {
			// 	cutil.playEffect(this.gameType, "female/kanpai.mp3");
			// }

			for (var k in fnl_cmp) {
				actionMgr.add_ps_action_list(this.rootUINode, const_ps.ACTION_NAME_LIST[0], fnl_cmp[k]);
				var lose_idx = fnl_cmp[k][2] ? fnl_cmp[k][1] : fnl_cmp[k][0];
				player.curGameRoom.poker_state_list[lose_idx] = const_ps.POKER_FAIL;
			}
		}

		actionMgr.add_ps_action_list(this.rootUINode, const_ps.CALL_BACK, callback);
	},

	play_final_result_anim: function (callback, roundRoomInfo) {
		cc.log("callback,roundRoomInfo", callback, roundRoomInfo);
		this.rootUINode.runAction(cc.sequence(
			cc.delayTime(0.5),
			cc.callFunc(function () {
				callback();
			})))
	},

	update_settlement_panel: function (player_info_list, win_idx,act_cmp,fnl_cmp) {
		cc.log("update_settlement_panel", player_info_list, win_idx);
		// 做一些reset的操作
		var auto_img = this.rootUINode.getChildByName("auto_btn").getChildByName("auto_img");
		auto_img.setVisible(false);
		auto_img.stopAllActions();
		this.rootUINode.getChildByName("auto_btn").getChildByName("bottom_label").setString("自动跟注");
		this.rootUINode.getChildByName("player_info_panel0").getChildByName("player_hand_panel").getChildByName("see_btn").setVisible(false);
		this.rootUINode.getChildByName("auto_btn").setVisible(false);
		this.containUISnippets["PlayerInfoSnippet" + this.cur_clock_pos].set_clock_visible(false);
		this.stop_high_time_voice();
		this.lock_operation_panel();
		let player = h1global.player();
		if (!player) {
			return;
		}
		let playerInfoList = player.curGameRoom.playerInfoList;

		//遍历act和fnl 两个数组 将 与自己比过牌的人 加入 显示数组
		var cmp_list = [];
		if(act_cmp && act_cmp.length>0){
			for(var a in act_cmp){
				if(act_cmp[a][0] === player.serverSitNum){
					cmp_list.push(act_cmp[a][1]);
				}
				if(act_cmp[a][1] === player.serverSitNum){
					cmp_list.push(act_cmp[a][0]);
				}
			}
		}
		if(fnl_cmp && fnl_cmp.length>0){
			for(var f in fnl_cmp){
				if(fnl_cmp[f][0] === player.serverSitNum){
					cmp_list.push(fnl_cmp[f][1]);
				}
				if(fnl_cmp[f][1] === player.serverSitNum){
					cmp_list.push(fnl_cmp[f][0]);
				}
			}
		}

		for (var k in player_info_list) {
			if (playerInfoList[player_info_list[k]["idx"]] && playerInfoList[player_info_list[k]["idx"]]["identify"] == const_ps.GAME_PLAYER) {
				// let idx = playerInfoList[player_info_list[k]["idx"]];
				let idx = player_info_list[k]["idx"];
				//将比牌输的人 加上标记
				var is_cmp = cmp_list.indexOf(idx)>-1 ? true:false;
				//显示比牌输的分数
				// cc.error("idx",idx)
				this.containUISnippets["PlayerInfoSnippet" + idx].show_settlement_score(player_info_list[k]["score"]);
				//显示玩家手牌
				this.containUISnippets["PlayerInfoSnippet" + idx].update_player_tiles(player_info_list[k]["pokers"], player.curGameRoom.poker_state_list[idx],player.serverSitNum===idx, true ,is_cmp);
			}
		}
		//将场上的筹码全部都汇入win_idx中
		// var win_idx_pos = this.containUISnippets["PlayerInfoSnippet"+win_idx].get_player_pos();
		var win_idx_pos = this.get_stack_begin_position(player.server2CurSitNum(win_idx));
		var stack_list = this.rootUINode.getChildByName("stack_panel").getChildren();
		for (var k in stack_list) {
			let i = k;
			stack_list[k].runAction(cc.sequence(
				cc.moveTo(0.7, win_idx_pos.x, win_idx_pos.y),
				cc.callFunc(function () {
					stack_list[i].setVisible(false);
					// cc.error(i,stack_list[i].isVisible());
				})
			))
		}
		//结算筹码移动
		cc.audioEngine.playEffect("res/sound/voice/poker_ps/result_stack.mp3");
		if(player.serverSitNum === win_idx){
			actionMgr.add_ps_action_list(this.rootUINode, const_ps.ACTION_NAME_LIST[1]);
			cc.audioEngine.playEffect("res/sound/voice/poker_ps/win.mp3");
		}else{
			cc.audioEngine.playEffect("res/sound/voice/poker_ps/fail.mp3");
		}
	},

	update_roominfo_panel: function () {
		if (!this.is_show) {
			return;
		}
	},

	init_game_info_panel: function () {
		// var player = h1global.player();
		// this.cur_clock_pos = player.server2CurSitNum(player.curGameRoom.curPlayerSitNum);
	},

	update_game_info_panel: function () {
		var player = h1global.player();
		if (!player) {
			return;
		}
		cc.log("update_game_info_panel");
		this.cur_clock_pos = player.curGameRoom.curPlayerSitNum;
		for (var i = 0; i < const_ps.MAX_PLAYER_NUM; i++) {
			if (i === this.cur_clock_pos) {
				this.containUISnippets["PlayerInfoSnippet" + i].set_clock_visible(true);
			} else {
				this.containUISnippets["PlayerInfoSnippet" + i].set_clock_visible(false);
			}
		}
	},

	set_clock_pos: function (now_wait) {

	},

	update_operation_panel: function () {
		cc.log("update_operation_panel", this.beginAnimPlaying);
		let player = h1global.player();
		if (!player || !this.is_show) {
			return;
		}
		var is_viewer = player.curGameRoom.playerInfoList[player.serverSitNum]["identify"] === const_ps.GAME_VIEWER;
		var player_hand_panel = this.rootUINode.getChildByName("player_info_panel0").getChildByName("player_hand_panel");
		let see_btn = player_hand_panel.getChildByName("see_btn");
		let stuffy_img = player_hand_panel.getChildByName("stuffy_img");
		let auto_btn = this.rootUINode.getChildByName("auto_btn");
		if (player.curGameRoom.poker_state_list[player.serverSitNum] == const_ps.POKER_BLIND && player.curGameRoom.curRound > 0 && player.curGameRoom.room_state === const_val.ROOM_PLAYING) {
			if (player.curGameRoom.stuffy_num && player.curGameRoom.current_bout_num < player.curGameRoom.stuffy_num) {
				stuffy_img.setVisible(true);
				see_btn.setVisible(false);
			} else {
				stuffy_img.setVisible(false);
				see_btn.setVisible(true);
			}
		} else {
			see_btn.setVisible(false);
			stuffy_img.setVisible(false);
		}
		//自动跟注按钮
		if (player.curGameRoom.curRound > 0 && player.curGameRoom.room_state === const_val.ROOM_PLAYING && !is_viewer && player.curGameRoom.poker_state_list[player.serverSitNum] < const_ps.POKER_FAIL) {
			auto_btn.setVisible(true);
			//更新自动跟注按钮的值
			let s = player.curGameRoom.min_stack;
			var now_zhu = player.curGameRoom.poker_state_list[player.serverSitNum] === const_ps.POKER_SEEN ? s * 2 : s;
			auto_btn.getChildByName("label").setString("" + now_zhu);
		} else {
			auto_btn.setVisible(false);
			var auto_img = auto_btn.getChildByName("auto_img");
			auto_img.setVisible(false);
			auto_img.stopAllActions();
			auto_btn.getChildByName("bottom_label").setString("自动跟注");
		}

		//每次更新都顺便隐藏掉 比牌选择界面
		if (this.is_touch_panel_on) {
			this.hide_all_touch_panel()
		}

		let operation_panel = this.rootUINode.getChildByName("operation_panel");
		if (this.beginAnimPlaying || player.curGameRoom.curRound == 0 || player.curGameRoom.room_state === const_val.ROOM_WAITING || is_viewer) {
			cc.log("update_operation_panel play anim");
			operation_panel.setVisible(false);
		} else {
			operation_panel.setVisible(true);
			cc.log("curPlayerSitNum,serverSitNum", player.curGameRoom.curPlayerSitNum, player.serverSitNum);
			if (player.curGameRoom.curPlayerSitNum !== player.serverSitNum || player.curGameRoom.auto_follow_list[player.serverSitNum] == 1) {
				this.lock_operation_panel();
			} else {
				this.unlock_operation_panel();
				//确认自己可以做的操作
				if (player.curGameRoom.current_bout_num < 1) {
					this.set_touch_enabled_and_children(operation_panel.getChildByName("btn_op_1"), false);
				}
				//满足闷牌条件情况下
				if (player.curGameRoom.stuffy_num && player.curGameRoom.current_bout_num < player.curGameRoom.stuffy_num) {
					this.set_touch_enabled_and_children(operation_panel.getChildByName("btn_op_0"), false);
					this.set_touch_enabled_and_children(operation_panel.getChildByName("btn_op_1"), false);
				}
				//禁用掉不满足条件的筹码按钮
				var min_stack = player.curGameRoom.min_stack / player.curGameRoom.mul_num;
				for (var i = 0; i < 3; i++) {
					if (min_stack >= const_ps.RAISE_NUM[i]) {
						this.set_touch_enabled_and_children(operation_panel.getChildByName("btn_op_" + (i + 2)), false);
					}
				}
				//更新比牌按钮上的数字
				this.update_cmp_btn_num();
			}
			//更新当前闹钟的位置
			this.update_game_info_panel();
		}
	},

	update_stlui_ready_btn: function () {
		cc.log("updateReadyState");
		let player = h1global.player();
		// cc.error(player.curGameRoom.playerInfoList[player.serverSitNum]["identify"] === const_ps.GAME_PLAYER);
		// if (player && player.curGameRoom.curRound > 0 && player.curGameRoom.room_state === const_val.ROOM_WAITING && player.curGameRoom.playerInfoList[player.serverSitNum]["identify"] === const_ps.GAME_PLAYER) {
		if (player && player.curGameRoom.curRound > 0 && player.curGameRoom.room_state === const_val.ROOM_WAITING) {
			if (player.curGameRoom.playerStateList[player.serverSitNum] === 0) {
				cc.log("开启我的准备按钮！");
				if (h1global.curUIMgr.settlement_ui) {
					h1global.curUIMgr.settlement_ui.show_by_reconnect();
				}
			}
		}
	},

	update_auto_btn_num: function () {
		//更新自动跟注按钮的值
		let player = h1global.player();
		if (player) {
			let s = player.curGameRoom.min_stack;
			var now_zhu = player.curGameRoom.poker_state_list[player.serverSitNum] === const_ps.POKER_SEEN ? s * 2 : s;
			this.rootUINode.getChildByName("auto_btn").getChildByName("label").setString("" + now_zhu);
		}
	},

	update_add_btn_num: function () {
		//更新自动跟注按钮的值
		let player = h1global.player();
		if (player) {
			let operation_panel = this.rootUINode.getChildByName("operation_panel");
			for (var i = 0; i < 3; i++) {
				let s = const_ps.RAISE_NUM[i] * player.curGameRoom.mul_num;
				var now_zhu = player.curGameRoom.poker_state_list[player.serverSitNum] === const_ps.POKER_SEEN ? s * 2 : s;
				operation_panel.getChildByName("btn_op_" + (i + 2)).getChildByName("label1").setString("" + now_zhu);
				operation_panel.getChildByName("btn_op_" + (i + 2)).getChildByName("label2").setString("" + now_zhu);
			}
		}
	},

	update_cmp_btn_num: function () {
		//更新自动跟注按钮的值
		let player = h1global.player();
		if (player) {
			let operation_panel = this.rootUINode.getChildByName("operation_panel");
			let s = player.curGameRoom.min_stack;
			var now_zhu = player.curGameRoom.poker_state_list[player.serverSitNum] === const_ps.POKER_SEEN ? s * 2 : s * 1;
			now_zhu = player.curGameRoom.compare_double === const_ps.COMPARE_DOUBLE ? now_zhu * 2 : now_zhu * 1;
			operation_panel.getChildByName("btn_op_1").getChildByName("red_img").getChildByName("label").setString("" + now_zhu);
		}
	},

	hide_dealer_operation_panel: function () {
		if (!this.is_show) {
			return;
		}
		//this.rootUINode.getChildByName("dealer_operation_panel").setVisible(false);
	},

	show_operation_panel: function () {
		if (!this.is_show) {
			return;
		}
		let operation_panel = this.rootUINode.getChildByName("operation_panel");
		if (!operation_panel.editorOrigin) {
			operation_panel.editorOrigin = operation_panel.getPosition();
		}
		operation_panel.setVisible(true);
	},

	hide_operation_panel: function () {
		if (!this.is_show) {
			return;
		}
		this.rootUINode.getChildByName("operation_panel").setVisible(false);
	},

	reset: function () {
		if (!this.is_show) {
			return;
		}

		this.update_all_tile_panel();
		this.hide_operation_panel();
		this.clear_desk_stack();
		this.update_add_btn_num();
		for (var i = 0; i < const_ps.MAX_PLAYER_NUM; i++) {
			this.containUISnippets["PlayerInfoSnippet" + i].hide_settlement_score();
			this.containUISnippets["PlayerInfoSnippet" + i].set_head_white();
		}

		// let player = h1global.entityManager.player();
		// if (player && player.curGameRoom) {
		// 	this.update_all_player_score(player.curGameRoom.playerInfoList);
		// 	if (h1global.curUIMgr && h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show) {
		// 		h1global.curUIMgr.gameroominfo_ui.update_round();
		// 	}
		// }

	},

	redeal: function (curGameRoom) {
		// this.init_operation_panel();
	},

	update_round_info_panel: function () {
		if (!this.is_show) {
			return;
		}
		let player = h1global.player();
		if (player && player.curGameRoom && player.curGameRoom.curRound > 0) {
			this.rootUINode.getChildByName("round_info_panel").getChildByName("room_id_label").setVisible(true);
			this.rootUINode.getChildByName("round_info_panel").getChildByName("round_label").setVisible(true);
			this.rootUINode.getChildByName("round_info_panel").getChildByName("bout_label").setVisible(true);
			this.rootUINode.getChildByName("round_info_panel").getChildByName("room_id_label").setString("房号：" + player.curGameRoom.roomID);
			this.rootUINode.getChildByName("round_info_panel").getChildByName("round_label").setString("局数:   " + player.curGameRoom.curRound + "/" + player.curGameRoom.game_round);
		} else {
			this.rootUINode.getChildByName("round_info_panel").getChildByName("room_id_label").setVisible(false);
			this.rootUINode.getChildByName("round_info_panel").getChildByName("round_label").setVisible(false);
			this.rootUINode.getChildByName("round_info_panel").getChildByName("bout_label").setVisible(false);
		}
	},

	startGame: function () {
		if (!this.is_show) {
			return;
		}
		this.playResultAnim = false;
		cc.log("start_game");
		let player = h1global.player();

		for (var i = 0; i < const_ps.MAX_PLAYER_NUM; i++) {
			this.update_player_ready_state(i, 0);
		}

		// this.init_operation_panel();
		this.update_operation_panel();
		this.update_all_tile_panel();
		this.update_sum_score_panel();
		this.update_current_bout_num();

		if (player && player.curGameRoom) {
			this.update_round_info_panel();
		} else {
			// this.hide_dealer_operation_panel();
			// this.hide_host_cards_panel();
		}
	},

	server2CurSitNumOffline: function (serverSitNum, myServerSitNum) {
		return (serverSitNum - myServerSitNum + const_ps.MAX_PLAYER_NUM) % const_ps.MAX_PLAYER_NUM;
	},

	play_anime_action: function (serverSitNum, aid, data) {
		if (!this.is_show) {
			return;
		}
		cc.log("play_anime_action", aid, data);
		switch (aid) {
			case const_ps.OP_FOLLOW_CHIP:
			case const_ps.OP_RAISE_CHIP:
			case const_ps.OP_CMP_RAISE_CARDS:
				cc.log("跟注，加注动画。")
				cc.audioEngine.playEffect("res/sound/voice/poker_ps/f_r_stack.mp3");
				this.play_stack_action(serverSitNum, data[0]);
				break;
			case const_ps.OP_CMP_CARDS:
				// var add_num = this.rootUINode.getChildByName("operation_panel").getChildByName("btn_op_1").getChildByName("red_img").getChildByName("label").getString();
				// this.play_stack_action(serverSitNum, parseInt(add_num));
				data.unshift(serverSitNum);
				actionMgr.add_ps_action_list(this.rootUINode, const_ps.ACTION_NAME_LIST[0], data);
				break;
			case const_ps.OP_FOLD_CARDS:
				cc.log("弃牌动画怎么做！");
				actionMgr.add_ps_action_list(this.rootUINode, const_ps.FOLD_ANIME, serverSitNum);
				break;
			default:
				break;
		}
	},

	play_stack_action: function (serverSitNum, data) {
		cc.log("data", data);
		data = data || 1;
		let index = h1global.player().server2CurSitNum(serverSitNum);
		var stack_panel = this.rootUINode.getChildByName("stack_panel");

		var start_position = this.get_stack_begin_position(index);
		var end_position = this.get_stack_end_position();


		var img = this.get_stack(index, data);
		img.setRotation(this.get_stack_angle(index, start_position, end_position));
		stack_panel.addChild(img);

		img.setPosition(start_position);
		img.runAction(new cc.Speed(new cc.MoveTo(1, end_position), 5))
	},

	get_stack_angle: function (index, start_position, end_position) {
		return index < 3 ? -cutil.angle(start_position, end_position) : -cutil.angle(start_position, end_position) + 180;
	},

	get_stack: function (index, data) {
		data = data || 1;
		if (data < 10) {
			var img = new ccui.ImageView("PSGameRoomUI/raise" + parseInt(data) + "_img.png", ccui.Widget.PLIST_TEXTURE);
			img.setAnchorPoint(cc.p(0.5, 0.5));
			return img
		} else {
			var img = new ccui.ImageView("PSGameRoomUI/raise_img.png", ccui.Widget.PLIST_TEXTURE);
			var fnt = new ccui.TextBMFont(data, "res/ui/PSGameRoomUI/chouma.fnt");
			img.addChild(fnt);
			fnt.setPosition(cc.p(img.getContentSize().width / 2, img.getContentSize().height / 2 - 2));
			img.setAnchorPoint(cc.p(0.5, 0.5));
			return img
		}
	},

	get_stack_begin_position: function (idx) {
		var begin_panel = this.rootUINode.getChildByName("player_info_panel" + idx.toString()).getChildByName("player_info_panel");
		let stack_panel = this.rootUINode.getChildByName("stack_panel");
		// WorldSpace  NodeSpace 都以左下角 为坐标原点
		// 转换成 世界坐标
		let begin_p = begin_panel.convertToWorldSpaceAR();
		// 将世界坐标转换成本地坐标
		return stack_panel.convertToNodeSpace(begin_p)
	},

	get_stack_end_position: function () {
		var size = this.rootUINode.getChildByName("stack_panel").getContentSize();
		return cc.p(
			Math.floor(Math.random() * size.width),
			Math.floor(Math.random() * size.height)
		)
	},

	init_desk_stack: function () {
		var player = h1global.player();
		if (!player || !player.curGameRoom || player.curGameRoom.room_state === const_val.ROOM_WAITING) {
			return
		}
		var stack_list = player.curGameRoom.stacks;
		var stack_panel = this.rootUINode.getChildByName("stack_panel");
		for (var i = 0; i < stack_list.length; i++) {
			for (var j = 0; j < const_ps.STACKS.length; j++) {
				if (!stack_list[i][j] || stack_list[i][j] <= 0) {
					continue;
				}
				for (var k = 0; k < stack_list[i][j]; k++) {
					var start_position = this.get_stack_begin_position(i);
					var end_position = this.get_stack_end_position();
					var img = this.get_stack(i, const_ps.STACKS[j]);
					stack_panel.addChild(img);
					img.setRotation(this.get_stack_angle(i, start_position, end_position));
					img.setPosition(end_position);
				}
			}
		}
	},

	clear_desk_stack: function () {
		this.rootUINode.getChildByName("stack_panel").removeAllChildren(true);
	},

	set_touch_enabled_and_children: function (btn, enabled) {
		btn.setTouchEnabled(enabled);
		btn.setBright(enabled);
		var child_list = btn.getChildren();
		for (var k in child_list) {
			if (child_list[k].getName() == "label1" || child_list[k].getName() == "img1") {
				child_list[k].setVisible(enabled);
			} else if (child_list[k].getName() == "label2" || child_list[k].getName() == "img2") {
				child_list[k].setVisible(!enabled);
			} else {
				child_list[k].setVisible(enabled);
			}
		}
	},

	run_high_time_voice:function(){
		var voice_node = this.rootUINode.getChildByName("voice_node");
		if(voice_node){
			return;
		}
		var voice_node = cc.Node.create();
		this.rootUINode.addChild(voice_node);
		voice_node.setName("voice_node");
		voice_node.is_playing = true;
		voice_node.runAction(cc.sequence(
			cc.delayTime(0.1),
			cc.callFunc(()=>{
				if (cc.audioEngine.isMusicPlaying()) {
					cc.audioEngine.stopMusic();
				}
				if (!cc.audioEngine.isMusicPlaying()) {
					cc.audioEngine.playMusic("res/sound/voice/poker_ps/max_time.mp3", false);
				}
			}),
			cc.delayTime(20),
			cc.callFunc(()=>{
				if(voice_node.is_playing){
					voice_node.is_playing = false;
					if (cc.audioEngine.isMusicPlaying()) {
						cc.audioEngine.stopMusic();
					}
					if (!cc.audioEngine.isMusicPlaying()) {
						cc.audioEngine.playMusic("res/sound/music/game_bgm.mp3", true);
					}
					voice_node.removeFromParent(true);
				}
			})
		));
	},

	stop_high_time_voice:function(){
		var voice_node = this.rootUINode.getChildByName("voice_node");
		if(!voice_node || voice_node.is_playing === false){
			return;
		}
		voice_node.stopAllActions();
		voice_node.is_playing = false;
		if (cc.audioEngine.isMusicPlaying()) {
			cc.audioEngine.stopMusic();
		}
		if (!cc.audioEngine.isMusicPlaying()) {
			cc.audioEngine.playMusic("res/sound/music/game_bgm.mp3", true);
		}
		voice_node.removeFromParent(true);
	},
});
