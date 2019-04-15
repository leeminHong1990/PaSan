

#黑红梅方 2,  3,  4,  5,  6,  7,  8,  9, 10,  J,  Q,  K,  A
HEI  = [11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59]
HONG = [10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58]
MEI  = [9,  13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57]
FANG = [8,  12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56]


SEE_CARDS 		= 1	# 看牌
FOLLOW_CHIP 	= 2	# 跟注
RAISE_CHIP 		= 3 # 加注
CMP_CARDS 		= 4 # 比牌
FOLD_CARDS 		= 5 # 弃牌

# 牌桌玩家身份
GAME_VIEWER = 1		# 观战者
GAME_PLAYER = 2		# 游戏玩家

# 玩家自动跟牌状态
FREE_FOLLOW = 0
AUTO_FOLLOW = 1
FOLLOW_STATE = (FREE_FOLLOW, AUTO_FOLLOW)

# 游戏最小开始人数
MINI_START_PLAYER_NUM = 2

POKER_BLIND 	= 0 # 暗牌
POKER_SEEN 		= 1 # 看牌
POKER_FAIL 		= 2 # 比牌失败
POKER_FOLD 		= 3 # 弃牌

BEGIN_ANIMATION_TIME = 1

# 筹码池
INJECT_STACK = [1, 2, 4, 6]

# 所有可能筹码选项
STACKS = [1, 2, 3, 4, 6, 8, 12, 16, 18, 24, 32, 36, 48]

#########################################  牌型 ###########################################
TYPE_SPECIAL			= 0	# 花色不同的2 3 5
TYPE_HIGH				= 1	# 高牌
TYPE_PAIR 				= 2 # 对子
TYPE_STRAIGHT 			= 3 # 顺子
TYPE_FLUSH 				= 4 # 同花
TYPE_STRAIGHT_FLUSH 	= 5 # 同花顺
TYPE_BOMB 				= 6 # 炸弹
###########################################################################################

####################################  房间开房的一些模式 ####################################
# 局数
GAME_ROUND = (10, 20, 30)
# 人数
PLAYER_NUM = (5,)
# 下注最大轮数
BOUT_NUM = (5, 10, 20)
# 倍数
MUL_NUM = (1, 2, 3)
# 豹子同花翻倍
BOMB_STRAIGHT_FLUSH_DOUBLE = (0, 1)
# 比牌翻倍
COMPARE_DOUBLE = (0, 1)
# 天龙地龙
SERIAL_CIRCLE = (0, 1)
# 动态加入
HALFWAY_JOIN = (0, 1)
# 托管
AUTO_OP = (0, 1)
# 蒙牌
STUFFY_NUM = (0, 1 ,2)
# 出牌时限
DISCARD_SECONDS = (10, 15, 30)
###########################################################################################