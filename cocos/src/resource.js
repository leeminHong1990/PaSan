var res = {
    LoginUI_json : "res/ui/LoginUI.json",
    BroadcastUI_json : "res/ui/BroadcastUI.json",
    effect_lockui_png : "res/effect/effect_lockui.png",
    effect_lockui_plist : "res/effect/effect_lockui.plist",
    LockUI_json : "res/ui/LockUI.json",
    playbackui_plist : "res/ui/PlaybackUI.plist",
    playbackui_png : "res/ui/PlaybackUI.png",
    biaoqing_png : "res/effect/biaoqing.png",
    biaoqing_plist : "res/effect/biaoqing.plist",
    common_talk_bg_png : "res/ui/Default/common_talk_bg.png",
    talk_frame_png : "res/ui/Default/talk_frame.png",
    talk_angle_png : "res/ui/Default/talk_angle.png",
    male_png : "res/ui/Default/male.png",
    famale_png : "res/ui/Default/famale.png",
    gameroom_tile_pointer_png : "res/ui/GameRoomUI/gameroom_tile_pointer.png",
    // eye_png : "res/effect/eye.png",
    // eye_plist : "res/effect/eye.plist",
    expression_png : "res/effect/expression.png",
    expression_plist : "res/effect/expression.plist",
    clubui_png : "res/ui/ClubUI.png",
    clubui_plist : "res/ui/ClubUI.plist",
	ps_pk_fail_png : "res/effect/ps_pk_fail.png",
	ps_pk_fail_plist : "res/effect/ps_pk_fail.plist",

    /* ddz */
	jiafen_png: "res/ui/GameRoomUI/jiafen.png",
	jiafen_fnt: "res/ui/GameRoomUI/jiafen.fnt",
	shufenshuzi_png: "res/ui/GameRoomUI/shufenshuzi.png",
	shufenshuzi_fnt: "res/ui/GameRoomUI/shufenshuzi.fnt",
	yingfenshuzi_png: "res/ui/GameRoomUI/yingfenshuzi.png",
	yingfenshuzi_fnt: "res/ui/GameRoomUI/yingfenshuzi.fnt",
	fanghaoshuzi_fnt: "res/ui/GameRoomInfo2DUI/fanghaoshuzi.fnt",
	fanghaoshuzi_png: "res/ui/GameRoomInfo2DUI/fanghaoshuzi.png",
	// SZ_fnt: "res/ui/ShopUI/SZ.fnt",
	// SZ_0_png: "res/ui/ShopUI/SZ_0.png",
	//出牌动画特效资源
	// spr_action_spring_png : "res/effect/spr_action_spring.png",
	// spr_action_spring_plist : "res/effect/spr_action_spring.plist",
    /* ddz */

    //玩法加载
    // ddz_btn_normal : "res/ui/Default/ddz_btn_normal.png",
    // ddz_btn_select : "res/ui/Default/ddz_btn_select.png",
	//
    // ll7_btn_normal : "res/ui/Default/ll7_btn_normal.png",
    // ll7_btn_select : "res/ui/Default/ll7_btn_select.png",

    // activity_btn_normal : "res/ui/ActivityUI/activity_btn_normal.png",
    // activity_btn_select : "res/ui/ActivityUI/activity_btn_select.png",

    //茶楼动态头像图加载
    club_frame : "res/ui/GameHallUI/frame.png",
    club_fram_printed : "res/ui/GameHallUI/fram_printed.png",
    club_mask2 : "res/ui/GameHallUI/mask2.png",

    //npc
    // game_hall_npc:"res/ui/GameHallNPC.json",
    // GameHallActivityBtn:"res/ui/GameHallActivityBtn.json",
    // GameHallLotteryBtn:"res/ui/GameHallLotteryBtn.json",
    // GameHallNoviceBtn:"res/ui/GameHallNoviceBtn.json",
    // GameHallShopBtn:"res/ui/GameHallShopBtn.json",
    // LotteryAction:"res/ui/LotteryAction.json",
	//
	// //打7特效资源
	// da7diaozhu_json:"res/ui/da7TeXiao/da7diaozhu.json",
	// da7jiafen_json:"res/ui/da7TeXiao/da7jiafen.json",
	// da7jianfen_json:"res/ui/da7TeXiao/da7jianfen.json",
	// da7jiaozhu_json:"res/ui/da7TeXiao/da7jiaozhu.json",
	// da7popai_json:"res/ui/da7TeXiao/da7popai.json",
	// da7tlj_json:"res/ui/da7TeXiao/da7tlj.json",
	// da7TeXiao_png:"res/ui/da7TeXiao/da7TeXiao.png",
	// da7TeXiao_plist:"res/ui/da7TeXiao/da7TeXiao.plist",
	//
	// //DDZ特效资源
	// ddz_airplane:"res/ui/DDZAirplaneAction.json",
	// ddz_bomb:"res/ui/DDZBombAction.json",
	// ddz_rocket:"res/ui/DDZRocketAction.json",

	//财神动画资源
	effect_fiscal:"res/ui/EffectWashAction.json",
	effect_wash:"res/ui/EffectFiscalAction.json",

	//PS特效资源
	ps_pk:"res/ui/PSPKAction.json",
	ps_win:"res/ui/PSWinAction.json",

    chouma_fnt:"res/ui/PSGameRoomUI/chouma.fnt",
    chouma_png:"res/ui/PSGameRoomUI/chouma.png",
};

var g_resources = [
    {
        type:"font",
        name:"zhunyuan",
        srcs:["res/ui/font/zhunyuan.ttf"]
    }
];
for (var i in res) {
    g_resources.push(res[i]);
}
