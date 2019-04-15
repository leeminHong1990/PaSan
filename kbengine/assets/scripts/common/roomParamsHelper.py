# -*- coding: utf-8 -*-
import const
import const_ps

# ---------------------------- 开房参数检查 ----------------------------
"""
def XXX_CreateChecker(create_dict):
	return True of False
"""

def DummyChecker(*args):
	print("You need to implement a checker !!!")
	return False

def PS_CreateChecker(create_dict):
	player_num = create_dict['player_num']
	game_round = create_dict['game_round']
	bout_num = create_dict['bout_num']
	mul_num =  create_dict['mul_num']
	bomb_straight_flush_double = create_dict['bomb_straight_flush_double']
	compare_double =  create_dict['compare_double']
	serial_circle = create_dict['serial_circle']
	halfway_join = create_dict['halfway_join']
	auto_op = create_dict['auto_op']
	stuffy_num = create_dict['stuffy_num']
	hand_prepare = create_dict['hand_prepare']
	pay_mode = create_dict['pay_mode']
	room_type = create_dict['room_type']
	op_seconds = create_dict['op_seconds']

	if player_num not in const_ps.PLAYER_NUM \
			or game_round not in const_ps.GAME_ROUND \
			or bout_num not in const_ps.BOUT_NUM \
			or mul_num not in const_ps.MUL_NUM \
			or bomb_straight_flush_double not in const_ps.BOMB_STRAIGHT_FLUSH_DOUBLE \
			or compare_double not in const_ps.COMPARE_DOUBLE \
			or serial_circle not in const_ps.SERIAL_CIRCLE \
			or halfway_join not in const_ps.HALFWAY_JOIN \
			or auto_op not in const_ps.AUTO_OP \
			or stuffy_num not in const_ps.STUFFY_NUM \
			or op_seconds not in const_ps.DISCARD_SECONDS \
			or hand_prepare not in const.PREPARE_MODE:
		return False

	if pay_mode == const.AA_PAY_MODE and halfway_join == 1:
		return False
	if room_type == const.NORMAL_ROOM and pay_mode not in (const.NORMAL_PAY_MODE, const.AA_PAY_MODE):
		return False
	elif room_type == const.CLUB_ROOM and pay_mode not in (const.CLUB_PAY_MODE, const.AA_PAY_MODE):
		return False
	return True

def roomParamsChecker(game_type, create_dict):
	name = const.GameType2GameName.get(game_type, None)
	if name is None:
		return False
	else:
		return globals().get("{}_CreateChecker".format(name), DummyChecker)(create_dict)

# ------------------------------------------------------------------------


# ----------------------------- 开房参数获取 ------------------------------
"""
def XXX_roomParams(create_dict):
	return a dict
"""

def PS_roomParams(create_dict):
	return {
		'player_num'		: 5,
		'game_round'		: create_dict['game_round'],
		'bout_num'			: create_dict['bout_num'],
		'mul_num'			: create_dict['mul_num'],
		'bomb_straight_flush_double'	: create_dict['bomb_straight_flush_double'],
		'compare_double'	: create_dict['compare_double'],
		'serial_circle'		: create_dict['serial_circle'],
		'halfway_join'		: create_dict['halfway_join'],
		'auto_op'			: create_dict['auto_op'],
		'stuffy_num'		: create_dict['stuffy_num'],
		'hand_prepare'		: create_dict['hand_prepare'],
		'pay_mode'			: create_dict['pay_mode'],
		'room_type'			: create_dict['room_type'],
		'op_seconds'		: create_dict['op_seconds'],
	}


def roomParamsGetter(game_type, create_dict):
	name = const.GameType2GameName.get(game_type, None)
	if name is None:
		return None
	else:
		return globals()["{}_roomParams".format(name)](create_dict)

# ------------------------------------------------------------------------


def clubDefault_roomParams():
	ps_dict = {
		'player_num'		: 5,
		'game_round'		: 20,
		'bout_num'			: 5,
		'mul_num'			: 1,
		'bomb_straight_flush_double'	: 1,
		'compare_double'	: 1,
		'serial_circle'		: 0,
		'halfway_join'		: 1,
		'auto_op'			: 1,
		'stuffy_num'		: 0,
		'hand_prepare'		: 0,
		'pay_mode'			: const.CLUB_PAY_MODE,
		'room_type'			: const.CLUB_ROOM,
		'op_seconds'		: 15,
	}
	return const.PS, ps_dict


def updateRoomParamsGetter(game_type, roomParams):
	name = const.GameType2GameName.get(game_type, None)
	if name is None:
		return game_type , roomParams
	else:
		funcName = "{}_updateRoomParams".format(name)
		if  funcName in globals():
			func = globals()[funcName]
			if callable(func):
				return func(game_type , roomParams)

	return game_type , roomParams

#
# def LL7_updateRoomParams(game_type, params):
# 	if "bottom_level" in params:
# 		return game_type, params
# 	else:
# 		params.update({
# 			"bottom_level"	: 0,
# 		})
# 		return game_type, params