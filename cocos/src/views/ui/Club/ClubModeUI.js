"use strict";

var ClubModeUI = CreateRoomUI.extend({
	initUI: function () {
		this._super();
		this.createroom_panel.getChildByName("title_img").loadTexture("res/ui/CreateRoomUI/club_mode_title.png");
		this.createroom_panel.getChildByName("title_img").ignoreContentAdaptWithSize(true);
	},


	show_by_info: function (club_id, desk_idx) {
		if (!h1global.player().club_entity_dict[club_id]) {
			return
		}
		this.club = h1global.player().club_entity_dict[club_id];
		if (desk_idx != -1) {
			this.desk_idx = desk_idx;
		} else {
			this.desk_idx = undefined;
		}
		this.show();
	},

	set_create_room_func: function () {
		cc.log("这里 改变亲友圈的模式");
		if (this.desk_idx === undefined) {
			h1global.player().clubOperation(const_val.CLUB_OP_SET_DEFAULT_ROOM, this.club.club_id, [this.use_list["game_type"], this.init_list]);
			this.club.club_base_info.room_params = JSON.stringify(this.init_list);
			this.club.club_base_info.game_type = this.use_list["game_type"];
		} else {
			h1global.player().clubOperation(const_val.CLUB_OP_SET_ROOM_PARAMS, this.club.club_id, [this.desk_idx, this.use_list["game_type"], this.init_list]);
		}

	},

	initCreateInfo: function () {
		// 这里重写当前选项为 当前茶楼的 默认玩法
		if (this.club.club_base_info.game_type) {
			if (this.desk_idx !== undefined) {
				this.now_btn_name = const_val.GameType2GameName[this.club.club_base_info.table_info_list[this.desk_idx].game_type].toLowerCase();
			} else {
				this.now_btn_name = const_val.GameType2GameName[this.club.club_base_info.game_type].toLowerCase();
			}
		} else {
			this.now_btn_name = this.name_list[0];
		}
	},

	is_club: function () {
		if (this.club.club_base_info.room_params) {
			if (this.desk_idx !== undefined) {
				this.init_list = eval("(" + this.club.club_base_info.table_info_list[this.desk_idx].room_params + ")");
			} else {
				this.init_list = eval("(" + this.club.club_base_info.room_params + ")");
			}
			cc.error(this.init_list);
			this.default_pay_mode = this.init_list["pay_mode"];
			return true;
		} else {
			return false;
		}

	},

	update_init_list: function () {
		var owner_id = h1global.player().userId;

		this.init_list["is_agent"] = this.club.owner.isAgent;
		this.init_list["p_switch"] = this.club.club_base_info["p_switch"];
		if (this.club.is_owner(owner_id) && this.desk_idx == undefined) {
			this.init_list["p_switch"] = 1;//如果是房主 却 不是改单张桌子的玩法
		}
		if (this.default_pay_mode) {
			this.init_list["pay_mode"] = this.default_pay_mode;
		}
		this.init_list["room_type"] = const_val.CLUB_ROOM;
		if (this.init_list["pay_mode"] == const_val.NORMAL_PAY_MODE) {
			this.init_list["pay_mode"] = const_val.CLUB_PAY_MODE;
		}
		//将茶楼的局数初始化为8
		// this.init_list["game_round"] = 8;
		// if(this.use_list["game_type"] == const_val.LvLiang7){
		// this.init_list["game_round"] = 6;
		// }
		this.check_init_list();
	},


});
