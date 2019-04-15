var GameHallSceneUIManager = UIManagerBase.extend({
    onCreate: function () {
        var initUIClassNameList = ["GameHallUI", "CreateRoomUI", "JoinRoomUI", "HelpUI",
            "PlayerInfoUI", "RecordUI", "ConfigUI",
            "WebViewUI","BroadcastUI",
            "ClubUI", "ClubViewUI", "ClubRecordUI", "ClubMemberUI", "ClubMgrUI", "ConfirmUI",
            "CreateClubUI", "EditorUI", "JoinClubUI", "CSUI", "ShareCircleUI", "PublicNumUI","ClubConfigUI",
            "ShowClubUI","ClubRankUI", "ClubModeUI","RulerUI","NoticeUI","BindCodeUI",
            "InviteUI", "ClubStatisticsUI"];

        for (var uiClassName of initUIClassNameList) {
            this.add_ui(uiClassName.slice(0, uiClassName.length - 2).toLowerCase() + "_ui", [], uiClassName);
        }
    }
});