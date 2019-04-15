"use strict";

var PSGameRoomEntity = GameRoomEntity.extend({
	ctor: function (player_num, gameType) {
		this._super(player_num, gameType);
		this.dealerIdx = -1;

		this.handTilesList = [new Array(3).fill(0), new Array(3).fill(0), new Array(3).fill(0), new Array(3).fill(0), new Array(3).fill(0)];
		this.curPlayerSitNum = -1;
		this.bout_num = 0;
		this.mul_num = 0;
		this.bomb_straight_flush_double = 0;
		this.compare_double = 0;
		this.serial_circle = 0;
		this.halfway_join = 0;
		this.auto_op = 0;
		this.stuffy_num = 0;
		this.auto_follow_list = [0, 0, 0, 0, 0];
		this.poker_state_list = [0, 0, 0, 0, 0];
		this.min_stack = 1;
		this.sum_score = 0; //场上的下注总分
		this.bout_score = [-1, -1, -1, -1, -1]; //各位玩家的下注分数
		this.current_bout_num = 0;
		this.first_op = 0;
		this.stacks = [new Array(const_ps.STACKS.length).fill(0), new Array(const_ps.STACKS.length).fill(0), new Array(const_ps.STACKS.length).fill(0), new Array(const_ps.STACKS.length).fill(0), new Array(const_ps.STACKS.length).fill(0)];


		this.waitAidList = []; // 玩家操作列表，[]表示没有玩家操作
		this.waitDataList = [];// 表示等待操作的需要数据
		KBEngine.DEBUG_MSG("Create GameRoomEntity")
	},

	reconnectRoomData: function (recRoomInfo) {
		this._super(recRoomInfo);

		for (var i = 0; i < recRoomInfo["player_advance_info_list"].length; i++) {
			var curPlayerInfo = recRoomInfo["player_advance_info_list"][i];
			let idx = curPlayerInfo['idx'];
			this.handTilesList[idx] = curPlayerInfo["tiles"];
		}

		this.curPlayerSitNum = recRoomInfo["current_idx"];
		this.dealerIdx = recRoomInfo["dealer_idx"];
		this.min_stack = recRoomInfo["min_stack"];
		this.sum_score = recRoomInfo["score"];
		this.current_bout_num = recRoomInfo["current_bout_num"];

		this.player_advance_info_list = recRoomInfo["player_advance_info_list"];
		this.stacks = recRoomInfo["stacks"];

		this.updateRoomData(recRoomInfo["init_info"]);
		for (var i = 0; i < recRoomInfo["player_advance_info_list"].length; i++) {
			var curPlayerInfo = recRoomInfo["player_advance_info_list"][i];
			let idx = curPlayerInfo['idx'];
			this.playerInfoList[idx]["score"] = curPlayerInfo["score"];
			this.playerInfoList[idx]["total_score"] = curPlayerInfo["total_score"];

			this.poker_state_list[idx] = curPlayerInfo["poker_state"];
			this.handTilesList[idx] = curPlayerInfo["pokers"];
			this.auto_follow_list[idx] = curPlayerInfo["auto_follow"];
			this.bout_score[idx] = curPlayerInfo["score"];
		}
		// if (this.mul_score_list.indexOf(0) >= 0 && this.dealerIdx != -1 && onhookMgr) {
		// 	onhookMgr.setPSWaitLeftTime(recRoomInfo["waitTimeLeft"])
		// } else if (onhookMgr && this.op_seconds > 0) {
		// 	onhookMgr.setPSWaitLeftTime(recRoomInfo["waitTimeLeft"])
		// } else if (onhookMgr && const_val.FAKE_COUNTDOWN > 0) {
		// 	onhookMgr.setPSWaitLeftTime(const_val.FAKE_COUNTDOWN);
		// }
		if (onhookMgr && this.op_seconds > 0) {
			onhookMgr.setPSWaitLeftTime(recRoomInfo["waitTimeLeft"], const_val.FAKE_COUNTDOWN)
		} else if (onhookMgr && const_val.FAKE_COUNTDOWN > 0) {
			onhookMgr.setPSWaitLeftTime(const_val.FAKE_COUNTDOWN, const_val.FAKE_COUNTDOWN);
		}
		this.updateReadyState();
	},

	updateRoomData: function (roomInfo) {
		this._super(roomInfo);
		// this.dealerIdx = roomInfo["dealer_idx"];
		this.game_round = roomInfo["game_round"];
		this.op_seconds = roomInfo["op_seconds"];
		this.bout_num = roomInfo["bout_num"];
		this.mul_num = roomInfo["mul_num"];
		this.bomb_straight_flush_double = roomInfo["bomb_straight_flush_double"];
		this.compare_double = roomInfo["compare_double"];
		this.serial_circle = roomInfo["serial_circle"];
		this.halfway_join = roomInfo["halfway_join"];
		this.auto_op = roomInfo["auto_op"];
		this.stuffy_num = roomInfo["stuffy_num"];
		this.room_state = roomInfo["room_state"];

		for (var i = 0; i < roomInfo["player_base_info_list"].length; i++) {
			this.updatePlayerInfo(roomInfo["player_base_info_list"][i]["idx"], roomInfo["player_base_info_list"][i]);
		}
		this.updateDistanceList();
	},

	getLastDiscard: function (serverSitNum) {
		if (!(this.last_discard_idx === serverSitNum || this.last_discard_idx === -1)) {
			for (var i = this.discard_record.length - 1; i >= 0; i--) {
				let cards = this.discard_record[i];
				if (cards && cards.length > 0) {
					return cards;
				}
			}
		}
		return null;
	},

	getRoomCreateDict: function () {
		return {
			"game_name": "ps",
			"bout_num": this.bout_num,
			"mul_num": this.mul_num,
			"bomb_straight_flush_double": this.bomb_straight_flush_double,
			"compare_double": this.compare_double,
			"serial_circle": this.serial_circle,
			"halfway_join": this.halfway_join,
			"auto_op": this.auto_op,
			"stuffy_num": this.stuffy_num,
			"room_type": this.roomType,
			"game_mode": this.game_mode,
			"game_round": this.game_round,
			"op_seconds": this.op_seconds,
			"pay_mode": this.pay_mode,
			"hand_prepare": this.hand_prepare
		};
	},

	startGame: function () {
		this.room_state = const_val.ROOM_PLAYING;
		this.handTilesList = [new Array(3).fill(0), new Array(3).fill(0), new Array(3).fill(0), new Array(3).fill(0), new Array(3).fill(0)];
		this.auto_follow_list = [0, 0, 0, 0, 0];
		this.poker_state_list = [0, 0, 0, 0, 0];
		this.min_stack = this.mul_num;
		this.sum_score = this.get_playing_player_num() * this.mul_num; //场上的下注总分
		this.bout_score = [-this.mul_num, -this.mul_num, -this.mul_num, -this.mul_num, -this.mul_num]; //各位玩家的下注分数
		this.last_discard_idx = -1;
		this.current_bout_num = 0;
	},

	swap_seat: function (swap_list) {
		if (true) {
			return;
		}
		if (!swap_list) {
			return;
		}
		var tempPlayerInfoList = [];
		var tempPlayerDistanceList = [];
		for (var i = 0; i < swap_list.length; i++) {
			tempPlayerInfoList[i] = this.playerInfoList[swap_list[i]];
			tempPlayerInfoList[i].idx = i;
			tempPlayerDistanceList[i] = this.playerDistanceList[swap_list[i]];
		}
		cc.log(tempPlayerInfoList);
		// this.playerInfoList = tempPlayerInfoList;
		this.playerDistanceList = tempPlayerDistanceList;
	},

	endGame: function () {
		// 重新开始准备
		this.room_state = const_val.ROOM_WAITING;
		// this.playerStateList = [0, 0, 0, 0, 0]
	},

	get_now_player_num: function () {
		var playerInfoList = this.playerInfoList;
		let num = 0;
		for (var k in playerInfoList) {
			if (playerInfoList[k] !== null) {
				num += 1;
			}
		}
		return num;
	},

	get_playing_player_num: function () {
		var playerInfoList = this.playerInfoList;
		let num = 0;
		for (var k in playerInfoList) {
			if (playerInfoList[k] !== null && playerInfoList[k]["identify"] == const_ps.GAME_PLAYER) {
				num += 1;
			}
		}
		return num;
	},

	get_next_server_sit_num: function (curSitNum) {
		var playerInfoList = this.playerInfoList;
		let playing_list = [];
		for (var k in playerInfoList) {
			if (playerInfoList[k] !== null && playerInfoList[k]["identify"] == const_ps.GAME_PLAYER) {
				playing_list.push(1);
			} else {
				playing_list.push(0);
			}
		}
		var playing_player_num = collections.count(playing_list, 1);

		var x = [];
		playing_list.map((i, index) => {
			if (i === 1) {
				x.push(index);
			}
		});
		var nextServerSitNum = 0;
		for (var i = 1; i < playing_player_num; i++) {
			nextServerSitNum = (curSitNum + i) % playing_player_num;
			if (this.poker_state_list[x[nextServerSitNum]] !== const_ps.POKER_FAIL && this.poker_state_list[x[nextServerSitNum]] !== const_ps.POKER_FOLD) {
				break;
			}
		}
		return x[nextServerSitNum];
	},

	check_last_op: function (curSitNum, nextServerSitNum) {
		var first_op = this.get_first_op(this.dealerIdx);
		if (this.poker_state_list[first_op] < const_ps.POKER_FAIL) {
			if (nextServerSitNum == first_op) {
				this.current_bout_num += 1;
				return true;
			}
		} else {
			//夹在中间
			if (first_op > curSitNum && first_op < nextServerSitNum) {
				this.current_bout_num += 1;
				return true;
			}
			if (first_op < curSitNum && nextServerSitNum < curSitNum && nextServerSitNum > first_op) {
				this.current_bout_num += 1;
				return true;
			}
			// [0,1,2]这种情况
			if (first_op > curSitNum && first_op > nextServerSitNum && nextServerSitNum < curSitNum) {
				this.current_bout_num += 1;
				return true;
			}
		}
		return false;
	},

	get_first_op: function () {
		if (this.first_op) {
			return this.first_op;
		} else {
			var playerInfoList = this.playerInfoList;
			let playing_list = [];
			for (var k in playerInfoList) {
				if (playerInfoList[k] !== null && playerInfoList[k]["identify"] == const_ps.GAME_PLAYER) {
					playing_list.push(1);
				} else {
					playing_list.push(0);
				}
			}
			var playing_player_num = collections.count(playing_list, 1);
			var nextServerSitNum = (this.dealerIdx + 1) % playing_player_num;
			var x = [];
			playing_list.map((i, index) => {
				if (i === 1) {
					x.push(index);
				}
			});
			this.first_op = x[nextServerSitNum];
			return this.first_op;
		}
	},

	updateReadyState: function () {

	},

});
