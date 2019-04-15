"use strict";

var const_ps = function () {
};

// 房间操作id
// @formatter:off
const_ps.OP_NONE                 = 0; // 不允许执行操作
const_ps.OP_SEE_CARDS            = 1; // 看牌
const_ps.OP_FOLLOW_CHIP	       	 = 2; // 跟注
const_ps.OP_RAISE_CHIP           = 3; // 加注
const_ps.OP_CMP_CARDS            = 4; // 比牌
const_ps.OP_FOLD_CARDS 			 = 5; // 弃牌
const_ps.OP_CMP_RAISE_CARDS 	 = 6; // 比牌扔注
//玩家状态
const_ps.POKER_BLIND       = 0; // 暗牌
const_ps.POKER_SEEN        = 1; // 已看牌
const_ps.POKER_FAIL        = 2; // 比牌失败
const_ps.POKER_FOLD        = 3; // 已弃牌

const_ps.FREE_FOLLOW = 0; //手动跟注
const_ps.AUTO_FOLLOW = 1; //自动跟注

const_ps.POKER_WORD=["","已看牌","比牌输","弃牌"];	//文字
const_ps.RAISE_NUM = [2,4,6];			//按钮的加分数量

//比牌翻倍
const_ps.COMPARE_DOUBLE = 1;
const_ps.COMPARE_ONE = 0;

//牌桌玩家身份
const_ps.GAME_VIEWER = 1;       // 观战者
const_ps.GAME_PLAYER = 2;       // 游戏玩家

// const_ps.PAIR_TYPE=["baozi","shunjin","gold_flower","shunzi","pair","sanpai"];	//牌型
const_ps.PAIR_TYPE=["豹\n子","顺\n金","金\n花","顺\n子","对\n子","单\n张"];	//牌型
// @formatter:on

const_ps.SHOW_DO_OP = 0; 	//	doOperation
const_ps.SHOW_CONFIRM_OP = 1; 	// 	confirmOperation

const_ps.BEGIN_ANIMATION_TIME = 0;

const_ps.GAME_ROOM_BG_CLASSIC = 0;
const_ps.GAME_ROOM_BG_BULE = 1;
const_ps.GAME_ROOM_BG_GREEN = 2;

const_ps.PLAYER_TOUCH_SELF_STATE = 0;
const_ps.PLAYER_TOUCH_FORCE_STATE = 1;
const_ps.PLAYER_TOUCH_OTHER_STATE = 2;

const_ps.PUTONG = "PuTong";	//普通话
const_ps.LOCAL = "Local";		//地方话
const_ps.LANGUAGE = [const_ps.LOCAL, const_ps.PUTONG];

// 所有可能筹码选项
const_ps.STACKS = [1, 2, 3, 4, 6, 8, 12, 16, 18, 24, 32, 36, 48];

//####################################  牌 ####################################
const_ps.JOKERS = [75, 79];
const_ps.JOKERS_IMAGE_INDEX = [21, 22];
const_ps.POKER_COLOR_DICT = {
	3: "a",
	2: "c",
	1: "b",
	0: "d",
};

//####################################  房间开房的一些模式 ####################################




//# 局数
const_ps.GAME_ROUND = [10, 20 ,30];
//# 注
const_ps.BOUT_NUM = [5, 10, 20];

/****************************************************************************************************/

const_ps.MAX_PLAYER_NUM = 5;
const_ps.HAND_CARD_NUM = 17 + 4;
const_ps.DESK_CARD_NUM = 17 + 4;

const_ps.MODULE_SEEN = true; // 明牌

const_ps.COLOR_WHITE = cc.color(255, 255, 255);
const_ps.COLOR_GREY = cc.color(114, 114, 114);
const_ps.BTN_WHITE = cc.color(255, 255, 255);
const_ps.BTN_GREY = cc.color(191, 191, 191);
const_ps.SELECT_OFFSET = 20;

const_ps.ACTION_NAME_LIST = ["PSPKAction","PSWinAction"];

const_ps.CALL_BACK = 1;
const_ps.FOLD_ANIME = 2;