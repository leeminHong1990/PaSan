var emotion = function(){}

/**
 * function playEmotion
 * @param parent 父节点
 * @param eid  表情号
 * @param serverSitNum 座位号
 * @param setPos 手动设置表情位置
 */
emotion.playEmotion = function(parent,eid,serverSitNum,setPos){
    cc.log(serverSitNum);
    setPos = setPos || cc.p(0.5,0.5);
    var curSitNum = h1global.entityManager.player().server2CurSitNum(serverSitNum);
	let player = h1global.player();
	if(!player){
		return;
	}
	// if (player.curGameRoom.curRound <= 0 && player.curGameRoom.gameType != const_val.DouDiZhu) {
	// 	curSitNum = serverSitNum;
	// }
    var player_info_panel = parent.getChildByName("player_info_panel" + curSitNum);
    if(!player_info_panel){
        cc.log("找不到player_info_panel");
        return;
    }
    //如果上一个动画还在 就移除
    if(player_info_panel.getChildByName("talk_img")){
        player_info_panel.getChildByName("talk_img").removeFromParent();
    }
    //将表情载入纹理中
	var cache = cc.spriteFrameCache;
	cache.addSpriteFrames("res/effect/biaoqing.plist", "res/effect/biaoqing.png");
    if(eid == 0){eid = 12;}

    var anim_frames = [];
    for (var i = 0; i < const_val.ANIM_LIST[eid] ; i++) {
        var frame = cache.getSpriteFrame("biaoqing/emotion_"+eid+"_"+i+".png");
        if (frame) {
            anim_frames.push(frame);
        }
    }
    // var effect_animation = new cc.Animation(anim_frames,const_val.ANIM_SPEED_LIST[eid] / const_val.ANIM_LIST[eid]);
    // var effect_action = new cc.Animate(effect_animation);
	var talk_img = new cc.Sprite("#biaoqing/bn_emotion"+eid+".png");
    // var talk_img = cc.Sprite.create();
    talk_img.setName("talk_img");
    player_info_panel.addChild(talk_img);
    talk_img.setPosition(player_info_panel.width * setPos.x , player_info_panel.height * setPos.y);
    player_info_panel.reorderChild(talk_img, 4);

    var effect_action = cc.Sequence.create(cc.moveBy(0.5,0,14),cc.moveBy(0.5,0,-14));
    talk_img.runAction(cc.Sequence.create(cc.Repeat.create(effect_action,2), cc.removeSelf()));
};
/**
 * function playFiscal 播放付费动画
 * @param parent 父节点
 * @param eid  表情号
 * @param serverSitNum 座位号
 * @param pos 手动设置表情位置
 */
emotion.playFiscal = function(parent,eid,serverSitNum,pos){
    if(actionMgr.is_playing){
		actionMgr.wait_list.push([parent,eid,serverSitNum,pos]);
    }else{
		actionMgr.play_action_preload(parent,const_val.EFFECT_NAME_LIST[eid]);
		emotion.playFiscalWord(parent,eid,serverSitNum);
    }
};

/**
 * function playFiscalWord 播放付费动画文字
 * @param parent 父节点
 * @param eid  表情号
 * @param serverSitNum 座位号
 * @param pos 手动设置文字位置
 */
emotion.playFiscalWord = function(parent,eid,serverSitNum,pos){
	pos = pos || cc.p(parent.width*0.5,parent.height*0.8);
	var player = h1global.player();
	var player_name = serverSitNum+1 +"号";
	if(player && player.curGameRoom.playerInfoList[serverSitNum]){
		player_name = player.curGameRoom.playerInfoList[serverSitNum].nickname
    }
	var tips_label = parent.getChildByName("tips_label");
	if (!tips_label) {
		tips_label = ccui.Text.create("玩家"+player_name+const_val.EFFECT_WORD_LIST[eid], "zhunyuan", 30);
		tips_label.setPosition(pos);
		tips_label.setTextColor(cc.color(255, 255, 0));
		tips_label.setName("tips_label");
		parent.addChild(tips_label);
	} else {
		tips_label.setPosition(pos);
		tips_label.setString("玩家"+player_name+const_val.EFFECT_WORD_LIST[eid]);
	}
	tips_label.setVisible(true);
	tips_label.stopAllActions();
	tips_label.runAction(cc.Sequence.create(
		cc.MoveTo.create(2, cc.p(tips_label.getPositionX(), tips_label.getPositionY() + 50)),
		cc.CallFunc.create(function () {
			tips_label.setVisible(false);
			tips_label.setPositionY(tips_label.getPositionY() - 50);
		})
	));
};
