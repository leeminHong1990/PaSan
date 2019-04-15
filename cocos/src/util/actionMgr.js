var actionMgr = function () {
}
actionMgr.is_playing = false;
actionMgr.wait_list = [];
actionMgr.is_ps_playing = false;
actionMgr.ps_wait_list = [];
/**
 * function load_action_resource 管理界面, 负责统一给 gameroomprepare_ui 和 gameroom_ui 加东西
 * @param parent 需要管理的UI界面的根节点
 * @param name 需要载入资源的名称
 * @param pos  位置
 * @return null;
 */
actionMgr.load_action_resource = function (parent, name, pos) {
	if (parent.getChildByName(name)) {
		return;
	}
	var pos = pos || cc.p(parent.width * 0.5, parent.height * 0.5);
	var resource = ccs.load("res/ui/" + name + ".json");   //加载CocosStudio导出的Json文件
	var resource_node = resource.node;
	var resource_action = resource.action; // 动作
	resource_action.gotoFrameAndPlay(0, resource_action.getDuration(), 0, false);
	resource_action.setLastFrameCallFunc(function () {
		resource_node.setVisible(false);
		resource_action.gotoFrameAndPause(0);
		actionMgr.is_playing = false;
		//如果等待列表不为空
		if(actionMgr.wait_list.length>0){
			actionMgr.play_action_preload(actionMgr.wait_list[0][0],const_val.EFFECT_NAME_LIST[actionMgr.wait_list[0][1]],actionMgr.wait_list[0][3]);
			emotion.playFiscalWord(actionMgr.wait_list[0][0],actionMgr.wait_list[0][1],actionMgr.wait_list[0][2]);
			actionMgr.wait_list.shift();
		}
	});
	resource_node.runAction(resource_action); // 播放动作
	parent.addChild(resource_node);
	resource_node.setPosition(pos);
	resource_node.setName(name);
	resource_node._animeTag = resource_action.getTag();
	resource_node.setVisible(false);
};

/**
 * function play_action_once 执行动画一遍
 * @param parent 动画节点的父节点
 * @param name 节点名字
 * @return null;
 */
actionMgr.play_action_once = function (parent, name) {
	var anime_node = parent.getChildByName(name);
	if (!anime_node) {
		return;
		// actionMgr.load_action_resource(parent, name,cc.p(100,0));
		// anime_node = parent.getChildByName(name);
	}
	var node_action = anime_node.getActionByTag(anime_node._animeTag);
	anime_node.setVisible(true);
	node_action.gotoFrameAndPlay(0, node_action.getDuration(), 0, false);
};

/**
 * function play_action_preload 执行动画一遍,但如果没有动画资源的话 会去预加载 , 缺点就是每次
 * @param parent 动画节点的父节点
 * @param name 节点名字
 * @return null;
 */
actionMgr.play_action_preload = function (parent, name, pos) {
	var anime_node = parent.getChildByName(name);
	if (!anime_node) {
		actionMgr.load_action_resource(parent, name, pos);
		anime_node = parent.getChildByName(name);
	}
	var node_action = anime_node.getActionByTag(anime_node._animeTag);
	anime_node.setVisible(true);
	node_action.gotoFrameAndPlay(0, node_action.getDuration(), 0, false);
	actionMgr.is_playing = true;
};

/**
 * function is_playing actionMgr检查是否正在播放动画
 * @param parent 动画节点的父节点
 * @param name 节点名字
 * @return bool;
 */
actionMgr.is_playing_by_name = function(parent, name){
	var anime_node = parent.getChildByName(name);
	if (!anime_node) {
		return false;
	}
	var node_action = anime_node.getActionByTag(anime_node._animeTag);
	return node_action.isPlaying();
};

/**
 * function reset 重置actionMgr的成员变量
 * @return null;
 */
actionMgr.reset = function(){
	actionMgr.is_playing = false;
	actionMgr.wait_list = [];
	actionMgr.is_ps_playing = false;
	actionMgr.ps_wait_list = [];
};

/**
 * function load_ps_resource 专门为爬三写的动画方法 主要是回调不同
 * @param parent 需要管理的UI界面的根节点
 * @param name 需要载入资源的名称
 * @param pos  位置
 * @return null;
 */
actionMgr.load_ps_resource = function (parent, name, pos) {
	if (parent.getChildByName(name)) {
		return;
	}
	var pos = pos || cc.p(parent.width * 0.5, parent.height * 0.6);
	var resource = ccs.load("res/ui/" + name + ".json");   //加载CocosStudio导出的Json文件
	var resource_node = resource.node;
	var resource_action = resource.action; // 动作
	resource_action.gotoFrameAndPlay(0, resource_action.getDuration(), 0, false);
	resource_action.setLastFrameCallFunc(function () {
		resource_node.setVisible(false);
		resource_action.gotoFrameAndPause(0);
		actionMgr.ps_action_list_call_back();
		// actionMgr.is_ps_playing = false;
		// //如果等待列表不为空
		// if(actionMgr.ps_wait_list.length>0){
		// 	if(actionMgr.ps_wait_list[0][1] === const_ps.CALL_BACK){
		// 		actionMgr.ps_wait_list[0][0].runAction(cc.sequence(
		// 			cc.delayTime(1),
		// 			cc.callFunc(actionMgr.ps_wait_list[0][2])));
		// 	}else{
		// 		actionMgr.play_ps_action(actionMgr.ps_wait_list[0][0],actionMgr.ps_wait_list[0][1],actionMgr.ps_wait_list[0][2]);
		// 	}
		// 	actionMgr.ps_wait_list.shift();
		// }
	});
	resource_node.runAction(resource_action); // 播放动作
	parent.addChild(resource_node);
	resource_node.setPosition(pos);
	resource_node.setName(name);
	resource_node._animeTag = resource_action.getTag();
	resource_node.setVisible(false);
};

/**
 * function play_ps_action 专门为爬三写
 * @param parent 动画节点的父节点
 * @param name 节点名字
 * @param data 数据
 * @return null;
 */
actionMgr.play_ps_action = function (parent, name, data) {
	var anime_node = parent.getChildByName(name);
	if (!anime_node) {
		actionMgr.load_ps_resource(parent, name);
		anime_node = parent.getChildByName(name);
	}
	var node_action = anime_node.getActionByTag(anime_node._animeTag);
	anime_node.setVisible(true);
	node_action.gotoFrameAndPlay(0, node_action.getDuration(), 0, false);
	//在这里写 pos 的 内容
	if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr && name != const_ps.ACTION_NAME_LIST[1]) {
		h1global.curUIMgr.roomLayoutMgr.notifyObserver("player_pk_anime", data,anime_node);
	}
	actionMgr.is_ps_playing = true;
};

/**
 * function play_ps_action_add_list 基本都调用这个借口
 * @param parent 父节点
 * @param eid  表情号
 * @param serverSitNum 座位号
 * @param pos 手动设置表情位置
 */
actionMgr.add_ps_action_list = function(parent,action,serverSitNum,pos){
	var panel = parent.getChildByName("action_panel");
	if(!panel){
		cc.error("this.rootUINode not have action_panel!");
		return;
	}
	if(actionMgr.is_ps_playing){
		actionMgr.ps_wait_list.push([panel,action,serverSitNum,pos]);
	}else{
		if(action === const_ps.CALL_BACK){
			serverSitNum();
		}else if(action === const_ps.FOLD_ANIME){
			actionMgr.play_ps_fold_anime(panel,action,serverSitNum);
		}else{
			actionMgr.play_ps_action(panel,action,serverSitNum);
		}
	}
};

actionMgr.ps_action_list_call_back = function(){
	actionMgr.is_ps_playing = false;
	//如果等待列表不为空
	if(actionMgr.ps_wait_list.length>0){
		if(actionMgr.ps_wait_list[0][1] === const_ps.CALL_BACK){
			if (cc.sys.isObjectValid(actionMgr.ps_wait_list[0][0])) {
				actionMgr.ps_wait_list[0][0].runAction(cc.sequence(
					cc.delayTime(0.1),
					cc.callFunc(actionMgr.ps_wait_list[0][2])));
			}
		}else if(actionMgr.ps_wait_list[0][1] === const_ps.FOLD_ANIME){
			actionMgr.play_ps_fold_anime(actionMgr.ps_wait_list[0][0],actionMgr.ps_wait_list[0][1],actionMgr.ps_wait_list[0][2]);
		}else{
			actionMgr.play_ps_action(actionMgr.ps_wait_list[0][0],actionMgr.ps_wait_list[0][1],actionMgr.ps_wait_list[0][2]);
		}
		actionMgr.ps_wait_list.shift();
	}
};

actionMgr.play_ps_fold_anime = function(panel,action,serverSitNum){
	cc.log("弃牌动画放这里，并记得加入队列回调。")
	actionMgr.is_ps_playing = true;
	if (h1global.curUIMgr && h1global.curUIMgr.roomLayoutMgr) {
		h1global.curUIMgr.roomLayoutMgr.notifyObserver("player_fold_anime",serverSitNum,actionMgr.ps_action_list_call_back);
	}
};