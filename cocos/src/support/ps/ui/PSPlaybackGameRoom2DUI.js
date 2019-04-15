"use strict"
var PSPlaybackGameRoom2DUI = PSGameRoom2DUI.extend({
	ctor: function () {
		this._super();
		this.playbackGame = new PSPlaybackGameRoom(this);
		this.addChild(this.playbackGame)
	},
	initUI: function () {
		this._super();
		this.playbackGame.init();
	},

	update_playback_operation_panel: function (serverSitNum, op_dict, doOP) {

	}

});