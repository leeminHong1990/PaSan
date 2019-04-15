# -*- coding: utf-8 -*-

from KBEDebug import *
import const_ps


class Adapter(object):

	def __init__(self, idx):
		# 玩家的座位号
		self.idx = idx
		# 玩家在线状态
		self.online = 1
		# 玩家的手牌
		self.pokers = []
		# 玩家的所有操作记录 (cid, [pokers,])
		self.op_r = []
		# 玩家当局的总得分
		self.score = 0
		# 玩家该房间总得分
		self.total_score = 0
		# 胜利次数
		self.win_times = 0
		# 失败次数
		self.lose_times = 0
		# 玩家身份
		self.identity = const_ps.GAME_VIEWER
		# 房间控制权
		self.is_control = 0
		# 每小局 牌状态
		self.poker_state = const_ps.POKER_FOLD
		# 自动跟注
		self.auto_follow = const_ps.FREE_FOLLOW

	# 下注
	def inject(self, score):
		score = score if score >= 0 else 0
		self.score -= score
		self.room.score += score

	def add_score(self, score):
		self.score += score

	def settlement(self):
		self.total_score += self.score

	def tidy(self):
		self.pokers = sorted(self.pokers)

	def reset(self):
		""" 每局开始前重置 """
		self.pokers = []
		self.op_r = []
		self.score = 0
		self.identity = const_ps.GAME_PLAYER
		self.poker_state = const_ps.POKER_BLIND
		self.auto_follow = const_ps.FREE_FOLLOW

	def get_init_client_dict(self):
		return {
			'nickname': self.nickname,
			'head_icon': self.head_icon,
			'sex': self.sex,
			'idx': self.idx,
			'userId': self.userId,
			'uuid': self.uuid,
			'online': self.online,
			'ip': self.ip,
			'location': self.location,
			'lat': self.lat,
			'lng': self.lng,
			'is_creator': self.is_creator,
			'is_control': self.is_control,
			'identify': self.identity
		}

	def get_simple_client_dict(self):
		return {
			'nickname': self.nickname,
			'head_icon': self.head_icon,
			'sex': self.sex,
			'idx': self.idx,
			'userId': self.userId,
			'uuid': self.uuid,
			'score': self.total_score,
			'is_creator': self.is_creator,
		}

	def get_club_client_dict(self):
		return {
			'nickname': self.nickname,
			'idx': self.idx,
			'userId': self.userId,
			'score': self.total_score,
		}

	def get_round_client_dict(self):
		DEBUG_MSG("{} get_round_client_dict,{},{},{},{}".format(self.room.prefixLogStr, self.idx, self.pokers, self.score, self.total_score))
		return {
			'idx': self.idx,
			'pokers': self.pokers,
			'score': self.score,
			'total_score': self.total_score,
		}

	def get_final_client_dict(self):
		return {
			'idx': self.idx,
			'win_times': self.win_times,
			'score': self.total_score,
			'lose_times': self.lose_times,
		}

	def get_reconnect_client_dict(self, userId):
		# 掉线重连时需要知道所有玩家打过的牌以及自己的手牌
		return {
			'idx': self.idx,
			'score': self.score,
			'total_score': self.total_score,
			'pokers': self.pokers if userId == self.userId and self.poker_state == const_ps.POKER_SEEN else [0] * len(self.pokers),
			'poker_state': self.poker_state,
			'auto_follow': self.auto_follow,
		}

	def get_dau_client_dict(self):
		return {
			'nickname': self.nickname,
			'head_icon': self.head_icon,
			'sex': self.sex,
			'userId': self.userId,
			'score': self.total_score,
		}

	def get_round_result_info(self):
		# 记录信息后累计得分
		return {
			'userID': self.userId,
			'score': self.score,
		}

	# 放弃
	def fold_cards(self, auto_op):
		self.room.psBroadcastOperation3(self.idx, const_ps.FOLD_CARDS, self.pokers)
		self.poker_state = const_ps.POKER_FOLD