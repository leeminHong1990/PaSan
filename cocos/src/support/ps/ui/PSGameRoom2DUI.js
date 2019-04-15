"use strict";

var PSGameRoom2DUI = PSGameRoomUI.extend({
	className: "PSGameRoom2DUI",
	uiType: const_val.GAME_ROOM_2D_UI,
	ctor: function () {
		this._super();
		this.resourceFilename = "res/ui/PSGameRoom2DUI.json";
	},

});