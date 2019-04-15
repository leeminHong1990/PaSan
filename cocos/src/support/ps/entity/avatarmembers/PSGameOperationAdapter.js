"use strict";
/*-----------------------------------------------------------------------------------------
												interface
-----------------------------------------------------------------------------------------*/
var PSGameOperationAdapter = PSPlaybackOperationAdapter.extend({

	startGame: function (startInfo) {
		cc.log("startInfo",startInfo);

		var self = this;
		for(var k in this.curGameRoom.playerInfoList){
			if(this.curGameRoom.playerInfoList[k]){
				this.curGameRoom.playerInfoList[k]["identify"] = 2;
			}
		}
		this.curGameRoom.startGame();
		// this.curGameRoom.curPlayerSitNum = (currentIdx + 1) % this.curGameRoom.player_num;
		var currentIdx = startInfo["dealer_idx"];
		this.curGameRoom.dealerIdx = currentIdx;
		this.curGameRoom.curPlayerSitNum = this.curGameRoom.get_next_server_sit_num(currentIdx);
		this.curGameRoom.first_op = this.curGameRoom.curPlayerSitNum;


		// let startTilesList = cutil.deepCopy(this.curGameRoom.handTilesList);
		// startTilesList[this.serverSitNum] = tileList.concat([]);
		// startTilesList[this.serverSitNum].sort(ps_rules.poker_compare2);
		// cc.log("startGame", startTilesList[this.serverSitNum]);

		// this.curGameRoom.handTilesList[this.serverSitNum] = tileList;
		// this.curGameRoom.handTilesList[this.serverSitNum].sort(ps_rules.poker_compare2);

		if (h1global.curUIMgr && h1global.curUIMgr.gameroomprepare_ui) {
			h1global.curUIMgr.gameroomprepare_ui.hide();
		}

		this.sourcePlayer.startActions["GameRoomUI"] = function () {
			if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_game_info_panel");
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_operation_panel");
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("startBeginAnim");
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_start_btn");
			}
			// h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_all_tile_panel");
			h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_dealer_idx", self.curGameRoom.dealerIdx);
			if (onhookMgr && self.curGameRoom.op_seconds > 0) {
				onhookMgr.setPSWaitLeftTime(self.curGameRoom.op_seconds + const_ps.BEGIN_ANIMATION_TIME,self.curGameRoom.op_seconds + const_ps.BEGIN_ANIMATION_TIME)
			} else if (onhookMgr && const_val.FAKE_COUNTDOWN > 0) {
				onhookMgr.setPSWaitLeftTime(const_val.FAKE_COUNTDOWN + const_val.FAKE_BEGIN_ANIMATION_TIME,const_val.FAKE_COUNTDOWN + const_val.FAKE_BEGIN_ANIMATION_TIME);
			}
		};

		if (this.curGameRoom.curRound <= 1) {
			this.sourcePlayer.startActions["GameRoomScene"] = function () {
				if (h1global.curUIMgr && h1global.curUIMgr.gameroominfo_ui) {
					if (h1global.curUIMgr.gameroominfo_ui.is_show) {
						h1global.curUIMgr.gameroominfo_ui.hide();
					}
					h1global.curUIMgr.gameroominfo_ui.show_by_info(GameRoomInfoUI.ResourceFile3D);
				}
				h1global.curUIMgr.roomLayoutMgr.startGame(function (complete) {
					if (complete && self.sourcePlayer.startActions["GameRoomUI"]) {
						self.sourcePlayer.startActions["GameRoomUI"]();
						self.sourcePlayer.startActions["GameRoomUI"] = undefined;
					}
				});
			}
		}
		if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
			// 如果GameRoomScene已经加载完成
			if (this.sourcePlayer.startActions["GameRoomScene"]) {
				this.sourcePlayer.startActions["GameRoomScene"]();
				this.sourcePlayer.startActions["GameRoomScene"] = undefined;
			} else {
				h1global.curUIMgr.roomLayoutMgr.startGame(function (complete) {
					if (complete) {
						if (self.sourcePlayer.startActions["GameRoomUI"]) {
							self.sourcePlayer.startActions["GameRoomUI"]();
							self.sourcePlayer.startActions["GameRoomUI"] = undefined;
						}
					}
				});
			}
		}

		if (h1global.curUIMgr && h1global.curUIMgr.gameroominfo_ui && h1global.curUIMgr.gameroominfo_ui.is_show) {
			h1global.curUIMgr.gameroominfo_ui.update_round();
		}

		if (h1global.curUIMgr && h1global.curUIMgr.config_ui && h1global.curUIMgr.config_ui.is_show) {
			h1global.curUIMgr.config_ui.update_state();
		}
		// 关闭结算界面
		if (h1global.curUIMgr && h1global.curUIMgr.settlement_ui) {
			h1global.curUIMgr.settlement_ui.hide();
		}
		if (h1global.curUIMgr && h1global.curUIMgr.result_ui) {
			h1global.curUIMgr.result_ui.hide();
		}
	},

	redeal: function (currentIdx, tileList, hostCards) {
		cc.log("redeal", tileList, hostCards);
		this.curGameRoom.curPlayerSitNum = currentIdx;
		this.curGameRoom.hostCards = hostCards;
		this.curGameRoom.startGame();
		this.curGameRoom.handTilesList[this.serverSitNum] = tileList;
		this.curGameRoom.handTilesList[this.serverSitNum].sort(ps_rules.poker_compare2);

		let curGameRoom = this.curGameRoom;
		if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
			h1global.curUIMgr.roomLayoutMgr.notifyObserver("hide_dealer_txt_panel");
			h1global.curUIMgr.roomLayoutMgr.notifyObserver("redeal", curGameRoom);
			h1global.curUIMgr.roomLayoutMgr.notifyObserver("startBeginAnim", tileList, this.serverSitNum, curGameRoom);
			// h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_game_info_panel", currentIdx);
		}
		if (onhookMgr && this.curGameRoom.op_seconds > 0) {
			onhookMgr.setPSWaitLeftTime(this.curGameRoom.op_seconds + const_ps.BEGIN_ANIMATION_TIME,this.curGameRoom.op_seconds + const_ps.BEGIN_ANIMATION_TIME)
		} else if (onhookMgr && const_val.FAKE_COUNTDOWN > 0) {
			onhookMgr.setPSWaitLeftTime(const_val.FAKE_COUNTDOWN + const_val.FAKE_BEGIN_ANIMATION_TIME,const_val.FAKE_COUNTDOWN + const_val.FAKE_BEGIN_ANIMATION_TIME);
		}
	},

	readyForNextRound: function (serverSitNum) {
		this._super(serverSitNum);
		// cc.error("玩家准备辣", h1global.player().curGameRoom.playerStateList);
		if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
			let index = this.server2CurSitNum(serverSitNum);
			h1global.curUIMgr.roomLayoutMgr.iterUI(function (ui) {
				if (!ui.playResultAnim) {
					ui.update_player_ready_state(serverSitNum, 1);
					let player = h1global.player();
					if(player&&player.curGameRoom&&player.curGameRoom.hand_prepare===0){
						ui.update_start_btn();
					}
					if(index === 0){
						ui.update_operation_panel();
						ui.update_all_tile_panel();
					}
				}
			});
		}

		if (h1global.curUIMgr && h1global.curUIMgr.config_ui && h1global.curUIMgr.config_ui.is_show) {
			if (serverSitNum === this.serverSitNum) {
				h1global.curUIMgr.config_ui.update_state();
			}
		}
	},

	postOperation: function (serverSitNum, aid, data, nextServerSitNum) {
		cc.log("postOperation: ", serverSitNum, aid, data, nextServerSitNum);
		var self = this;
		if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
			h1global.curUIMgr.roomLayoutMgr.iterUI(function (ui) {
				if (ui.beginAnimPlaying) {
					ui.stopBeginAnim(self.serverSitNum, self.curGameRoom);
					self.sourcePlayer.startActions["GameRoomUI"] = undefined;
				}
			});
		}
		// //每次操作 改变时钟的位置
		// if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
		// 	h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_game_info_panel", nextServerSitNum);
		// }
		if (aid === const_ps.OP_FOLD_CARDS) {
			nextServerSitNum = this.curGameRoom.get_next_server_sit_num(serverSitNum);
			this.curGameRoom.curPlayerSitNum = nextServerSitNum;
			this.showWaitOperationTime();
			cc.log("玩家", serverSitNum, "选择了弃牌");
			this.curGameRoom.poker_state_list[serverSitNum] = const_ps.POKER_FOLD;
			if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
				if(this.curGameRoom.check_last_op(serverSitNum,nextServerSitNum)){
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_current_bout_num");
				}
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_player_tiles",serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("play_anime_action",serverSitNum,aid);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_operation_panel");
			}else{
				this.curGameRoom.check_last_op(serverSitNum,nextServerSitNum);
			}
			 // 最后再添加弃牌的音效
			if (this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1) {
				cutil.playEffect(this.gameType, "male/qipai.mp3");
			} else {
				cutil.playEffect(this.gameType, "female/qipai.mp3");
			}
		} else if (aid === const_ps.OP_SEE_CARDS) {
			if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
				this.curGameRoom.poker_state_list[serverSitNum] = const_ps.POKER_SEEN;
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_auto_btn_num");
				if(this.serverSitNum == serverSitNum){
					cc.log("自己看牌");
					this.curGameRoom.handTilesList[serverSitNum] = data;
					if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
						h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_player_tiles",serverSitNum);
						h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_add_btn_num");
						h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_cmp_btn_num");
					}
					cutil.playEffect(this.gameType, "kanpai.mp3");
				}else{
					cc.log(serverSitNum,"号玩家看牌了");
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_player_tiles",serverSitNum);
				}
			}else{
				this.curGameRoom.poker_state_list[serverSitNum] = const_ps.POKER_SEEN;
			}
			if (this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1) {
				cutil.playEffect(this.gameType, "male/kanpai.mp3");
			} else {
				cutil.playEffect(this.gameType, "female/kanpai.mp3");
			}
		} else if (aid === const_ps.OP_FOLLOW_CHIP || aid === const_ps.OP_RAISE_CHIP) {
			nextServerSitNum = this.curGameRoom.get_next_server_sit_num(serverSitNum);
			this.curGameRoom.curPlayerSitNum = nextServerSitNum;
			this.showWaitOperationTime();
			cc.log("玩家", serverSitNum, "选择了跟注或加注");
			if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("play_anime_action",serverSitNum,aid,data);
				this.curGameRoom.min_stack = (data[0])/(this.curGameRoom.poker_state_list[serverSitNum] === const_ps.POKER_SEEN ? 2:1);
				this.curGameRoom.bout_score[serverSitNum] -= data[0];
				this.curGameRoom.sum_score += Math.abs(data[0]);
				if(this.curGameRoom.check_last_op(serverSitNum,nextServerSitNum)){
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_current_bout_num");
				}
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_auto_btn_num");
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_raise_score", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_sum_score_panel");
				cc.log("这里要写跟||加注动画")
				if (this.serverSitNum === nextServerSitNum) {//用来判断是不是下一个出牌的人
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_operation_panel");
				} else {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_operation_panel");
				}
				if(aid === const_ps.OP_RAISE_CHIP && this.curGameRoom.min_stack/this.curGameRoom.mul_num === const_ps.RAISE_NUM[const_ps.RAISE_NUM.length-1]){
					cc.log("这里改变背景音乐20s",this.curGameRoom.min_stack/this.curGameRoom.mul_num);
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("run_high_time_voice");
				}
			}else{
				cc.log("没进来的补救操作")
				this.curGameRoom.min_stack = (data[0])/(this.curGameRoom.poker_state_list[serverSitNum] === const_ps.POKER_SEEN ? 2:1);
				this.curGameRoom.bout_score[serverSitNum] -= data[0];
				this.curGameRoom.sum_score += Math.abs(data[0]);
				this.curGameRoom.check_last_op(serverSitNum,nextServerSitNum);
			}
			if (this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1) {
				if(aid === const_ps.OP_FOLLOW_CHIP){
					cutil.playEffect(this.gameType, "male/genzhu.mp3");
				}else{
					cutil.playEffect(this.gameType, "male/jiazhu.mp3");
				}
			} else {
				if(aid === const_ps.OP_FOLLOW_CHIP){
					cutil.playEffect(this.gameType, "female/genzhu.mp3");
				}else{
					cutil.playEffect(this.gameType, "female/jiazhu.mp3");
				}
			}
		} else if (aid === const_ps.OP_CMP_CARDS) {
			this.showWaitOperationTime();
			cc.log("玩家",serverSitNum,"跟玩家",data[0],"进行了比牌",data[1],"了");
			//比牌后顺便也做了 比牌扔牌操作
			let s = this.curGameRoom.min_stack;
			var now_zhu = this.curGameRoom.poker_state_list[serverSitNum] === const_ps.POKER_SEEN ? s * 2 : s * 1;
			now_zhu = this.curGameRoom.compare_double === const_ps.COMPARE_DOUBLE ? now_zhu * 2 : now_zhu * 1;
			this.curGameRoom.bout_score[serverSitNum] -= now_zhu;
			this.curGameRoom.sum_score += Math.abs(now_zhu);
			var lose_idx = data[1] ? data[0] : serverSitNum;
			this.curGameRoom.poker_state_list[lose_idx] = const_ps.POKER_FAIL;

			nextServerSitNum = this.curGameRoom.get_next_server_sit_num(serverSitNum);
			this.curGameRoom.curPlayerSitNum = nextServerSitNum;
			if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
				if(this.curGameRoom.check_last_op(serverSitNum,nextServerSitNum)){
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_current_bout_num");
				}
				// h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_player_tiles",lose_idx);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("play_anime_action",serverSitNum,aid,data);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("play_anime_action",serverSitNum,const_ps.OP_CMP_RAISE_CARDS,[now_zhu]);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_raise_score", serverSitNum);
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_sum_score_panel");
				if (this.serverSitNum === nextServerSitNum) {//用来判断是不是下一个出牌的人
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_operation_panel");
				} else {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_operation_panel");
				}
			}else{
				this.curGameRoom.check_last_op(serverSitNum,nextServerSitNum);
			}
			if (this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1) {
				cutil.playEffect(this.gameType, "male/bipai.mp3");
			} else {
				cutil.playEffect(this.gameType, "female/bipai.mp3");
			}
		}
	},

	playDiscardSound: function (serverSitNum, data, lastDiscardIdx) {
		var info = ps_rules.test_with_rule(data, false, false, true, this.curGameRoom.flower_mode === const_ps.MODE_HAS_FLOWER);
		if (!info[0]) {
			return
		}
		var lastType = null;
		if (lastDiscardIdx !== -1 && serverSitNum !== lastDiscardIdx) {
			var last = this.curGameRoom.getLastDiscard(lastDiscardIdx);
			var lastInfo = ps_rules.test_with_rule(last, false, false, true, this.curGameRoom.flower_mode === const_ps.MODE_HAS_FLOWER);
			if (lastInfo[0]) {
				lastType = lastInfo[1];
			}
		}
		var playDiscardVoice = false;
		if (lastType && (lastType !== ps_rules.TYPE_SINGLE && lastType !== ps_rules.TYPE_PAIR2)) {
			playDiscardVoice = lastDiscardIdx !== -1 && serverSitNum !== lastDiscardIdx;
		}
		var passIndex = parseInt(Math.random() * 3 + 1);
		var type = info[1];
		var soundName = null;
		if (type === ps_rules.TYPE_SINGLE) {
			soundName = info[2];
		} else if (type === ps_rules.TYPE_FLOWER) {
			// if (playDiscardVoice) {
			// 	soundName = "discard" + passIndex;
			// } else {
			// 	soundName = "zhadan";
			// }
			soundName = "zhadan";
		} else if (type === ps_rules.TYPE_PAIR2) {
			soundName = "dui" + info[2];
		} else if (type === ps_rules.TYPE_SEQ_PAIR2) {
			soundName = "liandui";
		} else if (type === ps_rules.TYPE_SEQ_PAIR3_1 || type === ps_rules.TYPE_SEQ_PAIR3_2 || type === ps_rules.TYPE_SEQ_PAIR3) {
			if (playDiscardVoice) {
				soundName = "discard" + passIndex;
			} else {
				soundName = "plane1";
			}
		} else if (type === ps_rules.TYPE_PAIR4) {
			// if (playDiscardVoice) {
			// 	soundName = "discard" + passIndex;
			// } else {
			// 	soundName = "zhadan";
			// }
			soundName = "zhadan";
		} else if (type === ps_rules.TYPE_PAIR_JOKER) {
			soundName = "wangzha";
		} else if (type === ps_rules.TYPE_PAIR3) {
			if (playDiscardVoice) {
				soundName = "discard" + passIndex;
			} else {
				soundName = "sanbudai";
			}
		} else if (type === ps_rules.TYPE_SEQ) {
			if (playDiscardVoice) {
				soundName = "discard" + passIndex;
			} else {
				soundName = "shunzi";
			}
		} else if (type === ps_rules.TYPE_PAIR3_1) {
			if (playDiscardVoice) {
				soundName = "discard" + passIndex;
			} else {
				soundName = "sandai1";
			}
		} else if (type === ps_rules.TYPE_PAIR3_2) {
			if (playDiscardVoice) {
				soundName = "discard" + passIndex;
			} else {
				soundName = "sandai2";
			}
		} else if (type === ps_rules.TYPE_PAIR4_2_1 || type === ps_rules.TYPE_PAIR4_2_2) {
			if (playDiscardVoice) {
				soundName = "discard" + passIndex;
			} else {
				soundName = "sidai2";
			}
		} else {
			return;
		}
		if (this.curGameRoom.playerInfoList[serverSitNum]["sex"] == 1) {
			cutil.playEffect(this.gameType, "male/" + soundName + ".mp3")
		} else {
			cutil.playEffect(this.gameType, "female/" + soundName + ".mp3")
		}
	},

	showWaitOperationTime: function () {
		if (onhookMgr && this.curGameRoom.discard_seconds > 0) {
			cc.log('showWaitOperationTime setWaitLeftTime=== > ', this.curGameRoom.discard_seconds);
			onhookMgr.setPSWaitLeftTime(this.curGameRoom.discard_seconds ,this.curGameRoom.discard_seconds)
		} else if (onhookMgr && const_val.FAKE_COUNTDOWN > 0) {
			onhookMgr.setPSWaitLeftTime(const_val.FAKE_COUNTDOWN,const_val.FAKE_COUNTDOWN);
		}
	},

	selfPostOperation: function (aid, data) {
		cc.log("selfPostOperation", aid, data);
		// 由于自己打的牌自己不需要经服务器广播给自己，因而只要在doOperation时，自己postOperation给自己
		// 而doOperation和postOperation的参数不同，这里讲doOperation的参数改为postOperation的参数
		var nextServerSitNum = null;
		if (aid === const_ps.OP_FOLD_CARDS) {
			nextServerSitNum = (this.serverSitNum + 1) % this.curGameRoom.player_num;
		} else if (aid === const_ps.OP_SEE_CARDS) {
			nextServerSitNum = this.curPlayerSitNum;
		} else if (aid === const_ps.OP_FOLLOW_CHIP) {
			nextServerSitNum = (this.serverSitNum + 1) % this.curGameRoom.player_num;
		} else if (aid === const_ps.OP_RAISE_CHIP) {
			nextServerSitNum = (this.serverSitNum + 1) % this.curGameRoom.player_num;
		} else {
			cc.warn("unknown aid : " + aid);
		}
		// 用于转换doOperation到postOperation的参数
		this.postOperation(this.serverSitNum, aid, [data], nextServerSitNum);
	},

	doOperation: function (aid, data) {
		cc.log("doPSOperation: ", aid, data);
		// if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
		// 	h1global.curUIMgr.roomLayoutMgr.notifyObserver("lock_operation_panel");
		// }
		// 跟注 加注 弃牌 可以直接本地操作
		// if (aid === const_ps.OP_RAISE_CHIP || aid === const_ps.OP_FOLLOW_CHIP || aid === const_ps.OP_FOLD_CARDS) {
		if (aid === const_ps.OP_RAISE_CHIP || aid === const_ps.OP_FOLLOW_CHIP) {
			this.selfPostOperation(aid, data);
		}
		this.sourcePlayer.cellCall("doPSOperation", aid, data);
	},

	// waitForOperation: function (aid_list, data_list) {
	// 	cc.log("waitForOperation", aid_list, data_list);
	// 	if (!this.curGameRoom) {
	// 		return;
	// 	}
	// 	this.curGameRoom.waitAidList = aid_list;
	// 	this.curGameRoom.waitDataList = data_list;
	// 	if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && h1global.curUIMgr.roomLayoutMgr.isShow()) {
	// 		h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_operation_panel", this.getWaitOpDict(aid_list, data_list), const_ps.SHOW_CONFIRM_OP);
	// 	}
	// },

	roundResult: function (roundRoomInfo) {
		var playerInfoList = roundRoomInfo["player_info_list"];
		for (var i = 0; i < playerInfoList.length; i++) {
			let idx = playerInfoList[i]['idx'];
			this.curGameRoom.playerInfoList[idx]["score"] = playerInfoList[i]["score"];
			this.curGameRoom.playerInfoList[idx]["total_score"] = playerInfoList[i]["total_score"];
		}
		var self = this;

		// Note: 此处只在回放上
		var replay_func = undefined;
		if (self.runMode === const_val.GAME_ROOM_PLAYBACK_MODE) {
			replay_func = arguments[1];
		}

		var curGameRoom = this.curGameRoom;
		var serverSitNum = this.serverSitNum;

		function callbackfunc() {
			if (h1global.curUIMgr.settlement_ui) {
				if (self.runMode === const_val.GAME_ROOM_PLAYBACK_MODE) {
					h1global.curUIMgr.settlement_ui.show_by_info(roundRoomInfo, serverSitNum, curGameRoom, undefined, replay_func);
				} else {
					h1global.curUIMgr.settlement_ui.show_by_info(roundRoomInfo, serverSitNum, curGameRoom);
				}
			}
		}

		if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
			if (h1global.curUIMgr.roomLayoutMgr.isShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_all_player_score", playerInfoList);
				h1global.curUIMgr.roomLayoutMgr.notifyObserverWithCallback("play_result_anim", callbackfunc, roundRoomInfo);
			} else {
				h1global.curUIMgr.roomLayoutMgr.registerShowObserver(function () {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_all_player_score", playerInfoList);
					h1global.curUIMgr.roomLayoutMgr.notifyObserverWithCallback("play_result_anim", callbackfunc, roundRoomInfo);
				})
			}
		} else {
			callbackfunc();
		}

		if (roundRoomInfo['spring'] === 1) {
			if (roundRoomInfo['win_idx'] === this.serverSitNum || (curGameRoom.dealerIdx !== roundRoomInfo['win_idx'] && this.serverSitNum !== curGameRoom.dealerIdx)) {
				if (curGameRoom.playerInfoList[serverSitNum]["sex"] == 1) {
					cutil.playEffect(this.gameType, "male/spring_win_voice1.mp3")
				} else {
					cutil.playEffect(this.gameType, "female/spring_win_voice1.mp3")
				}
			} else {
				if (curGameRoom.playerInfoList[serverSitNum]["sex"] == 1) {
					cutil.playEffect(this.gameType, "male/spring_fail_voice1.mp3")
				} else {
					cutil.playEffect(this.gameType, "female/spring_fail_voice1.mp3")
				}
			}
		}

	},

	resetRoom: function (roomInfo) {
		this.runMode = const_val.GAME_ROOM_GAME_MODE;
		this.curGameRoom = new GameRoomEntity(roomInfo['player_num']);
		this.curGameRoom.updateRoomData(roomInfo);
		// Note: 续房的时候房主退出房间的标记， 为了在房主退出时给其他玩家提示
		this.curGameRoom.canContinue = true;
		this.curGameRoom.playerStateList = roomInfo["player_state_list"];
		cutil.clearEnterRoom();
	},

	finalResult: function (finalPlayerInfoList, roundRoomInfo) {
		cc.log("finalPlayerInfoList", finalPlayerInfoList);
		cc.log("roundRoomInfo", roundRoomInfo);
		if (onhookMgr) {
			onhookMgr.setPSWaitLeftTime(null);
		}
		// Note: 为了断线重连后继续停留在总结算上，此处设置一个标志位作为判断
		if (h1global.curUIMgr && h1global.curUIMgr.result_ui) {
			h1global.curUIMgr.result_ui.finalResultFlag = true;
		}

		let curGameRoom = this.curGameRoom;
		let serverSitNum = this.serverSitNum;

		var self = this;

		function callbackfunc(complete) {
			if (complete && h1global.curUIMgr.result_ui) {
				if (h1global.curUIMgr && h1global.curUIMgr.applyclose_ui && h1global.curUIMgr.applyclose_ui.is_show) {
					h1global.curUIMgr.applyclose_ui.hide();
				}
				h1global.curUIMgr.settlement_ui.show_by_info(roundRoomInfo, serverSitNum, curGameRoom, function () {
					if (h1global.curUIMgr.result_ui) {
						h1global.curUIMgr.result_ui.show_by_info(finalPlayerInfoList, curGameRoom, serverSitNum);
					}
				});
			}
		}

		if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
			if (h1global.curUIMgr.roomLayoutMgr.isShow()) {
				h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_all_player_score", roundRoomInfo["player_info_list"]);
				h1global.curUIMgr.roomLayoutMgr.notifyObserverWithCallback("play_result_anim", callbackfunc,roundRoomInfo);
			} else {
				h1global.curUIMgr.roomLayoutMgr.registerShowObserver(function () {
					h1global.curUIMgr.roomLayoutMgr.notifyObserver("update_all_player_score", roundRoomInfo["player_info_list"]);
					h1global.curUIMgr.roomLayoutMgr.notifyObserverWithCallback("play_result_anim", callbackfunc,roundRoomInfo);
				})
			}
		} else {
			callbackfunc();
		}
	},

	subtotalResult: function (finalPlayerInfoList) {
		if (onhookMgr) {
			onhookMgr.setApplyCloseLeftTime(null);
		}

		if (h1global.curUIMgr && h1global.curUIMgr.applyclose_ui && h1global.curUIMgr.applyclose_ui.is_show) {
			h1global.curUIMgr.applyclose_ui.hide();
			onhookMgr.applyCloseLeftTime = 0;
		}
		if (h1global.curUIMgr && h1global.curUIMgr.settlement_ui && h1global.curUIMgr.settlement_ui.is_show) {
			h1global.curUIMgr.settlement_ui.hide()
		}
		// Note: 为了断线重连后继续停留在总结算上，此处设置一个标志位作为判断
		if (h1global.curUIMgr && h1global.curUIMgr.result_ui) {
			h1global.curUIMgr.result_ui.finalResultFlag = true;
		}
		var curGameRoom = this.curGameRoom;
		let serverSitNum = this.serverSitNum;
		if (h1global.curUIMgr && h1global.curUIMgr.result_ui) {
			h1global.curUIMgr.result_ui.show_by_info(finalPlayerInfoList, curGameRoom, serverSitNum, false);
		}
	},

});
