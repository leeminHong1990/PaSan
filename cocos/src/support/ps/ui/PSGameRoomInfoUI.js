var PSGameRoomInfoUI = GameRoomInfoUI.extend({
	ctor: function () {
		this._super();
		this.resourceFilename = GameRoomInfoUI.ResourceFile2D;
	},

	initUI: function () {
		this._super();
		cc.log("在这里初始化爬三的按钮资源。");
		this.init_function_panel();
		this.init_communicate_panel();

	},

	show_by_info: function (resourceFilename) {
		this.resourceFilename = "res/ui/GameRoomInfo2DUI.json";
		this.show()
	},

	init_function_panel:function(){
		var panel = this.rootUINode.getChildByName("function_panel");
		panel.getChildByName("config_btn").loadTextureNormal("PSGameRoomUI/setting_btn.png", ccui.Widget.PLIST_TEXTURE);
		panel.getChildByName("config_btn").ignoreContentAdaptWithSize(true);
		panel.getChildByName("help_btn").loadTextureNormal("PSGameRoomUI/ruler_btn.png", ccui.Widget.PLIST_TEXTURE);
		panel.getChildByName("help_btn").ignoreContentAdaptWithSize(true);
		panel.getChildByName("GPScene_btn").loadTextureNormal("PSGameRoomUI/GPS_btn.png", ccui.Widget.PLIST_TEXTURE);
		panel.getChildByName("GPScene_btn").ignoreContentAdaptWithSize(true);

		//稍微移动下位置
		panel.getChildByName("help_btn").setPositionX(panel.getChildByName("help_btn").getPositionX()-10);
		// panel.getChildByName("GPScene_btn").setPositionX(panel.getChildByName("GPScene_btn").getPositionX()-20);
		panel.getChildByName("GPScene_btn").setPositionX(panel.getChildByName("config_btn").getPositionX());
		panel.getChildByName("GPScene_btn").setPositionY(panel.getChildByName("config_btn").getPositionY()-88);
	},

	init_communicate_panel:function(){

		this.communicate_btn.loadTextureNormal("PSGameRoomUI/communicate_btn.png", ccui.Widget.PLIST_TEXTURE);
		this.communicate_btn.ignoreContentAdaptWithSize(true);

		this.record_btn.loadTextureNormal("PSGameRoomUI/record_btn.png", ccui.Widget.PLIST_TEXTURE);
		this.record_btn.ignoreContentAdaptWithSize(true);

		this.clubinvite_btn.loadTextureNormal("PSGameRoomUI/club_invite_btn.png", ccui.Widget.PLIST_TEXTURE);
		this.clubinvite_btn.ignoreContentAdaptWithSize(true);

		this.clubinvite_btn.setPosition(-100, 150);
		this.communicate_btn.setPosition(-20, 150);
		this.record_btn.setPosition(60, 150);
	},

	updateLayout: function () {
		this._super();
		var self = this;
		this.config_btn.addTouchEventListener(function (sender, eventType) {
			if (eventType === ccui.Widget.TOUCH_ENDED) {
				if (sender === self.config_btn) {
					h1global.curUIMgr.config_ui.show(function () {
						h1global.curUIMgr.config_ui.update_state();
					});
				} else {
					cc.log("TOUCH_ENDED: layout change");
				}
			}
		});

		this.roominfo_panel.getChildByName("roomid_label").setString("房号: " + h1global.player().curGameRoom.roomID.toString());
	},

	setLayout: function () {
		cc.warn("setLayout::not support")
	},

	init_battery_panel: function () {
		this.battery_panel.getChildByName("battery_frame_img").loadTexture("res/ui/GameRoomInfo2DUI/battery_frame2.png");
		this.battery_panel.getChildByName("battery_grid_img_0").loadTexture("res/ui/GameRoomInfo2DUI/battery_grid2.png");
		this.battery_panel.getChildByName("battery_grid_img_1").loadTexture("res/ui/GameRoomInfo2DUI/battery_grid2.png");
		this.battery_panel.getChildByName("battery_grid_img_2").loadTexture("res/ui/GameRoomInfo2DUI/battery_grid2.png");
		this.time_label.setTextColor(cc.color(255, 255, 255));
		this.battery_panel.setPositionX(100);
		this.time_label.setPositionX(40);
	},

	init_roominfo_panel: function () {
		this.roominfo_panel.setPositionY(cc.director.getWinSize().height * 0.92 + 142);//这个141是roominfo_panel本身的高度 （很坑
		this.roominfo_panel.removeAllChildren();

		var roomid_label = new cc.LabelTTF("局数: 99999", "zhunyuan", 23);
		roomid_label.setPositionX(50);
		roomid_label.setColor(cc.color(255, 255, 255));
		roomid_label.setName("roomid_label");

		var round_label = new cc.LabelTTF("局数: 99999", "zhunyuan", 23);
		round_label.setPositionX(200);
		round_label.setColor(cc.color(255, 255, 255));
		round_label.setName("round_label");

		this.roominfo_panel.addChild(round_label);
		this.roominfo_panel.addChild(roomid_label);
		this.round_label = this.roominfo_panel.getChildByName("round_label");
	},

	update_round: function () {
		if (!this.is_show) {
			return;
		}
		this.round_label.setString("局数: " + h1global.player().curGameRoom.curRound.toString() + "/" + h1global.player().curGameRoom.game_round.toString());
	},

	update_chat_panel: function () {
		if (!h1global.player()) {
			return
		}
		if (h1global.player().curGameRoom.room_state || h1global.player().curGameRoom.curRound > 0) {
			this.clubinvite_btn.setVisible(false);
			// this.record_btn.setVisible(false);
			// this.communicate_btn.setVisible(false);
			this.roominfo_panel.setVisible(false);
			return
		}
		if (h1global.player().curGameRoom.roomType == const_val.CLUB_ROOM && h1global.curUIMgr.clubinvite_ui) {
			this.check_guide();
			this.clubinvite_btn.setVisible(true);
		} else {
			this.clubinvite_btn.setVisible(false);
		}
	},
});