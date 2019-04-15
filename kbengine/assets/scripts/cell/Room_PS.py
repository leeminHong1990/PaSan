# -*- coding: utf-8 -*-

import json
import time
import const
import random
import switch
import utility

import const_ps
import utility_ps

from Room import Room
from KBEDebug import *
from datetime import datetime
import Functor



class Room_PS(Room):

	def __init__(self):
		Room.__init__(self)
		# 本局所有牌
		self.pokers = []
		# 当前局数
		self.current_round = 0
		# 一局 打牌记录
		self.op_record = []
		# 准备 idx
		self.confirm_next_idx = []
		# 房间开局操作的记录对应的记录id
		self.record_id = -1

		# 解散房间操作的发起者
		self.dismiss_room_from = -1
		# 解散房间操作开始的时间戳
		self.dismiss_room_ts = 0
		# 解散房间操作投票状态
		self.dismiss_room_state_list = [0] * self.player_num
		self.dismiss_timer = None
		# 玩家操作限时timer 启动时间
		self._op_timer_timestamp = 0
		# 房间创建时间
		self.roomOpenTime = time.time()

		# 玩家操作定时器
		self._op_timer = None
		# 定时器启动时间
		self._op_timer_ts = 0

		self.wait_aid_list = []
		# 当前下注圈数
		self.current_bout_num = 0
		# 当前操作玩家
		self.current_idx = 0
		# 庄家
		self.dealer_idx = 0
		# 奖池
		self.score = 0
		# 最小下注筹码
		self.min_stack = const_ps.INJECT_STACK[0] * self.mul_num
		# 筹码选项
		self.inject_stack = [x*self.mul_num for x in const_ps.INJECT_STACK]
		# 所有筹码选项
		self.stacks = [[0] * len(const_ps.STACKS) for i in range(self.player_num)]
		# 主动比牌
		self.act_cmp = []

	def _reset(self):
		self.clear_timers()
		self.timeout_timer = None
		self.dismiss_timer = None

		self._op_timer = None
		self._op_timer_ts = 0

		self.pokers = []

		self.wait_aid_list = []

		self.op_record = []
		self.confirm_next_idx = []

		self.current_bout_num = 0
		self.current_idx = 0
		self.dealer_idx = 0
		self.score = 0
		self.min_stack = 1
		self.inject_stack = []
		self.stacks = [[0] * len(const_ps.STACKS) for i in range(self.player_num)]
		self.act_cmp = []

		self.players_list = [None] * self.player_num
		self.destroySelf()

	def _get_player_idx(self, avt_mb):
		for i, p in enumerate(self.players_list):
			if p and avt_mb.userId == p.userId:
				return i
		return -1

	def _get_next_play_idx(self, current_idx):
		max_num = len(self.players_list)
		for i in range(max_num):
			idx = current_idx + i + 1
			player = self.players_list[idx % max_num]
			if player is not None \
				and player.identity == const_ps.GAME_PLAYER \
				and player.poker_state != const_ps.POKER_FAIL \
				and player.poker_state != const_ps.POKER_FOLD:
				return idx % max_num
		return current_idx

	def _get_next_sit_idx(self, current_idx):
		max_num = len(self.players_list)
		for i in range(max_num):
			idx = current_idx + i + 1
			if self.players_list[idx % max_num] is not None:
				return idx % max_num
		return current_idx

	# def _get_begin_play_idx(self):
	# 	max_num = len(self.players_list)
	# 	for i in range(max_num):
	# 		idx = (self.dealer_idx + i + 1) % max_num
	# 		player = self.players_list[idx]
	# 		if player is not None \
	# 				and player.identity == const_ps.GAME_PLAYER \
	# 				and player.poker_state != const_ps.POKER_FAIL \
	# 				and player.poker_state != const_ps.POKER_FOLD:
	# 			return idx
	# 	return -1

	def _get_end_play_idx(self):
		max_num = len(self.players_list)
		for i in range(max_num):
			idx = (max_num + self.dealer_idx - i)%max_num
			player = self.players_list[idx]
			if player is not None \
				and player.identity == const_ps.GAME_PLAYER \
				and player.poker_state != const_ps.POKER_FAIL \
				and player.poker_state != const_ps.POKER_FOLD:
				return idx
		return -1

	@property
	def sit_num(self):
		return sum([1 for k,v in enumerate(self.players_list) if v is not None])

	@property
	def play_num(self):
		return sum([1 for k,v in enumerate(self.players_list) if v is not None and v.identity == const_ps.GAME_PLAYER])

	def bet_base_score(self):
		for k,v in enumerate(self.players_list):
			if v is not None and v.identity == const_ps.GAME_PLAYER:
				v.score -= self.min_stack
				self.score += self.min_stack
				if self.min_stack in const_ps.STACKS:
					self.stacks[k][const_ps.STACKS.index(self.min_stack)] += 1

	def init_pokers(self):
		self.pokers = const_ps.HEI + const_ps.HONG + const_ps.MEI + const_ps.FANG

	def shuffle_pokers(self):
		random.shuffle(self.pokers)

	# 发牌
	def deal(self):
		for i in range(3):
			for k, v in enumerate(self.players_list):
				if v is not None:
					v.pokers.append(self.pokers[0])
					self.pokers = self.pokers[1:]

	def tidy(self):
		for k, v in enumerate(self.players_list):
			if v is not None:
				v.tidy()

	def doPSOperation(self, avt_mb, aid, value, auto_op):
		if self.state != const.ROOM_PLAYING:
			return
		idx = self._get_player_idx(avt_mb)
		DEBUG_MSG("{} doPSOperation idx:{} aid:{} value:{} poker_state:{} min_stack:{} auto_op:{}".format(self.prefixLogStr, idx, aid, value, avt_mb.poker_state, self.min_stack, auto_op))
		# 观察者 弃牌玩家 比牌失败玩家 和 非当前玩家 无法进行操作
		if self.current_bout_num >= self.bout_num \
			or avt_mb.identity == const_ps.GAME_VIEWER \
			or avt_mb.poker_state == const_ps.POKER_FAIL \
			or avt_mb.poker_state == const_ps.POKER_FOLD:
			DEBUG_MSG("{} doPSOperation error current_bout_num:{} bout_num:{} identity:{} poker_state:{}".format(self.prefixLogStr, self.current_bout_num, self.bout_num, avt_mb.identity,  avt_mb.poker_state))
			return
		if aid == const_ps.SEE_CARDS:
			# 必蒙 不能看牌
			if self.current_bout_num < self.stuffy_num or avt_mb.poker_state == const_ps.POKER_SEEN:
				DEBUG_MSG("{} doPSOperation error current_bout_num:{} poker_state:{}".format(self.prefixLogStr, self.current_bout_num, avt_mb.poker_state))
				return
			self.op_record.append([idx, aid, value])
			avt_mb.poker_state = const_ps.POKER_SEEN
			self.psBroadcastOperation3(idx, aid, avt_mb.pokers)
			return

		# 非当前玩家不能进行 除看牌外其他操作
		if self.current_idx != idx:
			DEBUG_MSG("{} dealer_idx:{}  current_idx:{} != idx:{}".format(self.prefixLogStr, self.dealer_idx, self.current_idx, idx))
			return

		# 自动跟注状态不允许 除 看牌外其他任何操作
		if not auto_op and avt_mb.auto_follow == const_ps.AUTO_FOLLOW:
			DEBUG_MSG("{} idx:{} auto op can't active op but see cards".format(self.prefixLogStr, idx))
			return

		if aid == const_ps.FOLLOW_CHIP:
			self.cancel_op_timer()
			# 看牌跟注加倍
			score = self.min_stack if avt_mb.poker_state == const_ps.POKER_BLIND else self.min_stack * 2
			self.op_record.append([idx, aid, score])
			avt_mb.score -= score
			self.score += score
			self.current_idx = self._get_next_play_idx(self.current_idx)
			DEBUG_MSG("{} idx:{} FOLLOW_CHIP value:{}".format(self.prefixLogStr, idx, score))
			if score in const_ps.STACKS:
				self.stacks[idx][const_ps.STACKS.index(score)] += 1
			if auto_op:
				self.psBroadcastOperation(idx, aid, [score])
			else:
				self.psBroadcastOperation2(idx, aid, [score])
			if idx == self._get_end_play_idx():
				self.current_bout_num += 1
			# 游戏 达到最大轮数结束
			if self.current_bout_num >= self.bout_num:
				self.finalCompare()
			elif self.players_list[self.current_idx].auto_follow == const_ps.AUTO_FOLLOW:
				# self.doPSOperation(self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, 0, 1)
				self.add_timer(1, Functor.Functor(self.doPSOperation, self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, 0, 1))
			else:
				self.add_op_timer()
		elif aid == const_ps.RAISE_CHIP:
			if (avt_mb.poker_state == const_ps.POKER_BLIND and (value not in self.inject_stack or value <= self.min_stack)) \
				or (avt_mb.poker_state == const_ps.POKER_SEEN and (value/2 not in self.inject_stack or value/2 <= self.min_stack)):
				return
			self.op_record.append([idx, aid, value])
			self.cancel_op_timer()
			avt_mb.score -= value
			self.score += value
			self.min_stack = value if avt_mb.poker_state == const_ps.POKER_BLIND else int(value/2)
			self.current_idx = self._get_next_play_idx(self.current_idx)
			DEBUG_MSG("{} idx:{} RAISE_CHIP value:{}".format(self.prefixLogStr, idx, value))
			if value in const_ps.STACKS:
				self.stacks[idx][const_ps.STACKS.index(value)] += 1
			if auto_op:
				self.psBroadcastOperation(idx, aid, [value])
			else:
				self.psBroadcastOperation2(idx, aid, [value])
			if idx == self._get_end_play_idx():
				self.current_bout_num += 1
			# 游戏 达到最大轮数结束
			if self.current_bout_num >= self.bout_num:
				self.finalCompare()
			elif self.players_list[self.current_idx].auto_follow == const_ps.AUTO_FOLLOW:
				# self.doPSOperation(self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, 0, 1)
				self.add_timer(1, Functor.Functor(self.doPSOperation, self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, 0, 1))
			else:
				self.add_op_timer()
		elif aid == const_ps.CMP_CARDS:
			if value >= len(self.players_list) \
				or idx == value \
				or self.current_bout_num <= 0 \
				or self.players_list[value] is None \
				or self.players_list[value].identity == const_ps.GAME_VIEWER \
				or self.players_list[value].poker_state == const_ps.POKER_FAIL \
				or self.players_list[value].poker_state == const_ps.POKER_FOLD:
				return
			self.op_record.append([idx, aid, value])
			self.cancel_op_timer()
			# 已看牌下注加倍
			score = self.min_stack if avt_mb.poker_state == const_ps.POKER_BLIND else self.min_stack * 2
			# 比牌下注加倍
			if self.compare_double:
				score = score * 2
			avt_mb.score -= score
			self.score += score
			if score in const_ps.STACKS:
				self.stacks[idx][const_ps.STACKS.index(score)] += 1
			# 比牌
			cmp = utility_ps.compare(avt_mb.pokers, self.players_list[value].pokers, self.serial_circle)
			DEBUG_MSG("{} CMP_CARDS {}={}={}".format(self.prefixLogStr, idx, value, cmp))
			if cmp:	# 胜利
				self.act_cmp.append([idx, value, 1])
				self.players_list[value].poker_state = const_ps.POKER_FAIL
				self.psBroadcastOperation(idx, aid, [value, 1])
			else:	# 失败
				self.act_cmp.append([idx, value, 0])
				avt_mb.poker_state = const_ps.POKER_FAIL
				self.psBroadcastOperation(idx, aid, [value, 0])
			# 牌局提前结束
			if sum([1 for _p in self.players_list \
				if _p is not None \
				and _p.identity == const_ps.GAME_PLAYER \
				and (_p.poker_state == const_ps.POKER_BLIND or _p.poker_state == const_ps.POKER_SEEN)]) == 1:
				self.winGame(idx if cmp else value)
			else:
				self.current_idx = self._get_next_play_idx(self.current_idx)
				if idx == self._get_end_play_idx():
					self.current_bout_num += 1
				# 游戏 达到最大轮数结束
				if self.current_bout_num >= self.bout_num:
					self.finalCompare()
				elif self.players_list[self.current_idx].auto_follow == const_ps.AUTO_FOLLOW:
					# self.doPSOperation(self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, 0, 1)
					self.add_timer(4, Functor.Functor(self.doPSOperation, self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, 0, 1))
				else:
					self.add_op_timer()
		elif aid == const_ps.FOLD_CARDS:
			# 必蒙 不能弃牌
			if self.current_bout_num < self.stuffy_num:
				return
			e_idx = self._get_end_play_idx()
			self.op_record.append([idx, aid, value])
			self.cancel_op_timer()
			avt_mb.fold_cards(auto_op)
			DEBUG_MSG("{} idx:{} FOLD_CARDS ".format(self.prefixLogStr, idx))
			# 牌局提前结束
			if sum([1 for _p in self.players_list \
				if _p is not None \
					and (_p.poker_state == const_ps.POKER_BLIND or _p.poker_state == const_ps.POKER_SEEN)]) == 1:
				self.winGame(self._get_next_play_idx(self.current_idx))
			else:
				self.current_idx = self._get_next_play_idx(self.current_idx)
				if idx == e_idx:
					self.current_bout_num += 1
				# 游戏 达到最大轮数结束
				if self.current_bout_num >= self.bout_num:
					self.finalCompare()
				elif self.players_list[self.current_idx].auto_follow == const_ps.AUTO_FOLLOW:
					# self.doPSOperation(self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, 0, 1)
					self.add_timer(1, Functor.Functor(self.doPSOperation, self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, 0, 1))
				else:
					self.add_op_timer()

	def finalCompare(self):
		fnl_cmp = []
		winner = self.current_idx
		while sum([1 for _p in self.players_list \
				if _p is not None \
					and _p.identity == const_ps.GAME_PLAYER \
					and (_p.poker_state == const_ps.POKER_BLIND or _p.poker_state == const_ps.POKER_SEEN)]) > 1:
				# 比牌
				next_idx = self._get_next_play_idx(self.current_idx)
				cmp = utility_ps.compare(self.players_list[self.current_idx].pokers, self.players_list[next_idx].pokers, self.serial_circle)
				DEBUG_MSG("{} finalCompare {}={}={}".format(self.prefixLogStr, self.current_idx, next_idx, cmp))
				if cmp:
					self.players_list[next_idx].poker_state = const_ps.POKER_FAIL
					fnl_cmp.append([self.current_idx, next_idx, 1])
					winner = self.current_idx
				else:
					self.players_list[self.current_idx].poker_state = const_ps.POKER_FAIL
					fnl_cmp.append([self.current_idx, next_idx, 0])
					self.current_idx = next_idx
					winner = next_idx

		self.winGame(winner, fnl_cmp)

	def winGame(self, idx, fnl_cmp = []):
		DEBUG_MSG("{} winGame idx:{} fnl_cmp:{}".format(self.prefixLogStr, idx, fnl_cmp))
		self.settlement(idx)
		info = dict()
		info['win_idx']	= idx
		info['act_cmp']	= self.act_cmp
		info['fnl_cmp']	= fnl_cmp
		self.dealer_idx = idx
		if self.current_round < self.game_round:
			self.broadcastRoundEnd(info)
		else:
			self.endAll(info)

	def settlement(self, idx):
		# 豹子同花翻倍
		if self.bomb_straight_flush_double:
			cardsType = utility_ps.cardsType(self.players_list[idx].pokers)
			if cardsType == const_ps.TYPE_BOMB or cardsType == const_ps.TYPE_STRAIGHT_FLUSH:
				DEBUG_MSG("{} settlement bomb_straight_flush_double cardsType:{}".format(self.prefixLogStr, cardsType))
				self.score *= 2
				for k, v in enumerate(self.players_list):
					if v is not None and v.identity == const_ps.GAME_PLAYER:
						v.score *= 2
		# 结算
		self.players_list[idx].score += self.score
		for k, v in enumerate(self.players_list):
			if v is not None:
				v.settlement()

	def client_prepare(self, avt_mb):
		DEBUG_MSG("{0} client_prepare userId:{1}".format(self.prefixLogStr, avt_mb.userId))
		self.prepare(avt_mb)
		self.ready_after_prepare()

	def prepare(self, avt_mb):
		""" 第一局/一局结束后 玩家准备 """
		if self.state == const.ROOM_PLAYING or self.state == const.ROOM_TRANSITION:
			return
		idx = self._get_player_idx(avt_mb)
		if idx not in self.confirm_next_idx:
			self.confirm_next_idx.append(idx)
			for p in self.players_list:
				if p and p.idx != idx:
					p and p.readyForNextRound(idx)

	def ready_after_prepare(self):
		if self.state == const.ROOM_WAITING and len(self.confirm_next_idx) == self.sit_num and self.current_round > 0:
			self.pay2StartGame()

	def give_control(self, idx):
		DEBUG_MSG("give_control=={}".format(idx))
		for k,v in enumerate(self.players_list):
			if v is not None and idx == k:
				v.is_control = 1

		for k,v in enumerate(self.players_list):
			if v is not None:
				v.give_control(idx)

	def client_start(self, avt_mb):
		if self.state == const.ROOM_PLAYING or self.state == const.ROOM_TRANSITION:
			return
		if self.current_round != 0:
			return
		if self.sit_num < const_ps.MINI_START_PLAYER_NUM or self.sit_num != len(self.confirm_next_idx):
			return
		if avt_mb.is_control:
			self.pay2StartGame()

	def pay2StartGame(self):
		if self.timeout_timer:
			self.cancel_timer(self.timeout_timer)
			self.timeout_timer = None

		# 通知base
		self.base.startGame()
		# 在第2局开始扣房卡
		if self.current_round == 1:
			accounts = [p.accountName for p in self.players_list if p is not None]
			self.base.charge(accounts)
		else:
			self.paySuccessCbk()

	# 扣房卡/钻石成功后开始游戏(不改动部分)
	def paySuccessCbk(self):
		DEBUG_MSG("{} paySuccessCbk state:{}".format(self.prefixLogStr, self.state))
		self.current_round += 1
		self.base.onRoomRoundChange(self.current_round)
		for p in self.players_list:
			if p is not None:
				p.reset()
		# 重置数据
		self.op_record = []
		self.current_bout_num = 0
		self.score = 0
		self.current_idx = self._get_next_play_idx(self.dealer_idx)
		self.min_stack = 1 * self.mul_num
		self.confirm_next_idx = []
		self.stacks = [[0] * len(const_ps.STACKS) for i in range(self.player_num)]
		self.act_cmp = []

		self.state = const.ROOM_PLAYING
		self.bet_base_score()		# 押底分
		self.init_pokers()  		# 牌堆
		self.shuffle_pokers()  		# 打乱
		self.deal()  				# 发牌
		self.tidy()  				# 整理
		self.beginGame()

	# 玩家开始游戏
	def beginGame(self):
		for i, p in enumerate(self.players_list):
			if p is not None and p.identity == const_ps.GAME_PLAYER:
				p.startGame({
					'pokers'	: [0,0,0],
					'curRound'	: self.current_round,
					'dealer_idx': self.dealer_idx,
				})
		DEBUG_MSG("{} beginGame:{}".format(self.prefixLogStr, [_p.pokers for _p in self.players_list if _p is not None]))
		self.add_op_timer(const_ps.BEGIN_ANIMATION_TIME)
		self.begin_record_game()

	def add_op_timer(self, delay = 0):
		if self.auto_op and delay + self.op_seconds > 0:
			self._op_timer = self.add_timer(delay + self.op_seconds, self.auto_operation)
		self._op_timer_ts = time.time()

	def cancel_op_timer(self):
		if self._op_timer is not None:
			self.cancel_timer(self._op_timer)
			self._op_timer = None

	def auto_operation(self):
		self._op_timer = None
		# 必蒙牌 倒计时结束会自动跟注 否则自动弃牌
		if self.current_bout_num < self.stuffy_num:
			self.doPSOperation(self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, 0, 1)
		else:
			self.doPSOperation(self.players_list[self.current_idx], const_ps.FOLD_CARDS, 0, 1)

	def setAutoFollow(self, avt_mb, autoFollow):
		if avt_mb.identity != const_ps.GAME_PLAYER \
			or autoFollow not in const_ps.FOLLOW_STATE \
			or autoFollow == avt_mb.auto_follow:
			return
		avt_mb.auto_follow = autoFollow
		idx = self._get_player_idx(avt_mb)
		if self.current_idx == idx:
			min_stack = self.min_stack if self.players_list[self.current_idx].poker_state == const_ps.POKER_BLIND else self.min_stack * 2
			self.doPSOperation(self.players_list[self.current_idx], const_ps.FOLLOW_CHIP, min_stack, 1)

	def begin_record_game(self):
		DEBUG_MSG("{} begin record game".format(self.prefixLogStr))
		self.begin_record_room()

		# KBEngine.globalData['GameWorld'].begin_record_room(self, self.roomIDC, {
		# 	'init_info': self.get_init_client_dict(),
		# 	'pokers': [{"idx":k, "pokers":list(v.pokers)} for k, v in enumerate(self.players_list) if v is not None and v.identity == const_ps.GAME_PLAYER],
		# 	'player_id_list': [v.userId if v is not None and v.identity == const_ps.GAME_PLAYER else 0 for k,v in enumerate(self.players_list)],
		# 	'start_time': int(time.time()),
		# 	'roomId': self.roomIDC,
		# 	'clubId': self.club_id,
		# })

	def begin_record_room(self):
		# 在第一局的时候记录基本信息
		if self.current_round != 1:
			return
		# user_info_list 玩家会中途加入在需要的地方实时更新
		self.game_result = {
			'game_round'	: self.game_round,
			'roomID'		: self.roomIDC,
			'game_type'		: self.gameTypeC,
			# 'user_info_list': [p.get_basic_user_info() for p in self.players_list if p is not None and p.identity == const_ps.GAME_PLAYER],
			'round_result'	: []
		}

	def end_record_game(self, result_info):
		pass
		# DEBUG_MSG("{} end record game; record_id:{}".format(self.prefixLogStr, self.record_id))
		# KBEngine.globalData['GameWorld'].end_record_room(self.roomIDC, self.club_id, self.gameTypeC, {
		# 	'op_record_list': json.dumps(self.op_record),
		# 	'round_result': result_info,
		# 	'end_time': int(time.time())
		# })
		# self.record_id = -1

	def begin_record_callback(self, record_id):
		self.record_id = record_id

	def psBroadcastOperation(self, idx, aid, pokers):
		"""
		将操作广播给所有人, 包括当前操作的玩家
		:param idx: 当前操作玩家的座位号
		:param aid: 操作id
		:param pokers: 出牌的list
		"""
		for i, p in enumerate(self.players_list):
			if p is not None:
				p.psPostOperation(idx, aid, pokers)

	def psBroadcastOperation2(self, idx, aid, pokers):
		"""
		将操作广播给除当前玩家的其他人
		:param idx: 当前操作玩家的座位号
		:param aid: 操作id
		:param pokers: 出牌的list
		"""
		for i, p in enumerate(self.players_list):
			if p is not None and i != idx:
				p.psPostOperation(idx, aid, pokers)

	def psBroadcastOperation3(self, idx, aid, pokers):
		"""
		将操作广播给所有人, 包括当前操作的玩家, 但是对其他玩家不可见
		:param idx: 当前操作玩家的座位号
		:param aid: 操作id
		:param pokers: 出牌的list
		"""
		for i, p in enumerate(self.players_list):
			if p is not None:
				if i == idx:
					p.psPostOperation(idx, aid, pokers)
				else:
					p.psPostOperation(idx, aid, [0]*len(pokers))


	def waitForOperation(self, idx, aid):
		"""
		将操作广播给所有人, 包括当前操作的玩家
		:param idx: 当前操作玩家的座位号
		:param aid: 玩家等待操作id
		"""
		for i, p in enumerate(self.players_list):
			if p is not None:
				p.ll7WaitForOperation(idx, aid)

	def endAll(self, info):
		""" 游戏局数结束, 给所有玩家显示最终分数记录 """

		# 先记录玩家当局战绩, 会累计总得分
		self.record_round_result()

		info['player_info_list'] = [p.get_round_client_dict() for p in self.players_list if p is not None]
		player_info_list = [p.get_final_client_dict() for p in self.players_list if p is not None]
		DEBUG_MSG("{} endAll player_info_list = {} info = {}".format(self.prefixLogStr, player_info_list, info))

		self.end_record_game(info)
		self.saveRoomResult()

		for p in self.players_list:
			if p:
				p.finalResult(player_info_list, info)
				# 有效圈数加一
				p.addGameCount()

		self.addAvatarGameRound()
		self._reset()

	def broadcastRoundEnd(self, info):
		# 广播胡牌或者流局导致的每轮结束信息, 包括算的扎码和当前轮的统计数据

		# 先记录玩家当局战绩, 会累计总得分
		self.record_round_result()

		self.state = const.ROOM_WAITING
		info['player_info_list'] = [p.get_round_client_dict() for p in self.players_list if p is not None]

		DEBUG_MSG("{}=={}".format(self.prefixLogStr, "&" * 30))
		DEBUG_MSG("{} RoundEnd info:{}".format(self.prefixLogStr, info))

		self.confirm_next_idx = []
		for p in self.players_list:
			if p:
				p.roundResult(info)

		self.end_record_game(info)
		self.addAvatarGameRound()

	def record_round_result(self):
		# 玩家记录当局战绩
		d = datetime.fromtimestamp(utility.get_cur_timestamp())
		round_result_d = {
			'date': '-'.join([str(d.year), str(d.month), str(d.day)]),
			'time': ':'.join([str(d.hour), str(d.minute)]),
			'round_record': [p.get_round_result_info() for p in self.players_list if p is not None and p.identity == const_ps.GAME_PLAYER],
			'recordId': self.record_id
		}
		self.game_result['round_result'].append(round_result_d)

	def addAvatarGameRound(self):
		for p in self.players_list:
			if p is not None:
				p.base.addAvatarGameRound(self.gameTypeC, 1)

	def apply_dismiss_room(self, avt_mb, agree_num, seconds):
		""" 游戏开始后玩家申请解散房间 """
		if avt_mb.identity == const_ps.GAME_VIEWER:
			return
		if self.dismiss_timer is not None:
			self.vote_dismiss_room(avt_mb, 1)
			return
		self.dismiss_room_ts = time.time()
		src = None
		for i, p in enumerate(self.players_list):
			if p is not None and p.userId == avt_mb.userId:
				src = p
				break

		# 申请解散房间的人默认同意
		self.dismiss_room_from = src.idx
		self.dismiss_room_state_list[src.idx] = 1

		def dismiss_callback():
			self.saveRoomResult()
			self.give_up_record_game()
			self.dropRoom()

		self.dismissRoomSecends = seconds
		self.dismissRoomAgreeNum = agree_num
		self.dismiss_timer = self.add_timer(self.dismissRoomSecends, dismiss_callback)

		for p in self.players_list:
			if p and p and p.userId != avt_mb.userId and p.identity == const_ps.GAME_PLAYER:
				p.req_dismiss_room(src.idx, agree_num, seconds)

	def vote_dismiss_room(self, avt_mb, vote):
		if avt_mb.identity == const_ps.GAME_VIEWER:
			return
		""" 某位玩家对申请解散房间的投票 """
		src = None
		for p in self.players_list:
			if p and p.userId == avt_mb.userId:
				src = p
				break

		self.dismiss_room_state_list[src.idx] = vote
		playerNum = sum([1 for _p in self.players_list if _p is not None and _p.identity == const_ps.GAME_PLAYER])
		dismissRoomAgreeNumR = self.dismissRoomAgreeNum if playerNum > self.dismissRoomAgreeNum else playerNum
		for p in self.players_list:
			if p and p:
				p.vote_dismiss_result(src.idx, vote, dismissRoomAgreeNumR)

		yes = self.dismiss_room_state_list.count(1)
		no = self.dismiss_room_state_list.count(2)
		# if yes == sum([1 for _p in self.players_list if _p is not None and _p.identity == const_ps.GAME_PLAYER]):
		if yes >= dismissRoomAgreeNumR:
			if self.dismiss_timer:
				self.cancel_timer(self.dismiss_timer)
				self.dismiss_timer = None
			self.dismiss_timer = None

			# 玩家牌局记录存盘
			self.saveRoomResult()
			self.give_up_record_game()
			self.dropRoom()


		if no >= playerNum - dismissRoomAgreeNumR + 1:
			if self.dismiss_timer:
				self.cancel_timer(self.dismiss_timer)
				self.dismiss_timer = None
			self.dismiss_timer = None
			self.dismiss_room_from = -1
			self.dismiss_room_ts = 0
			self.dismiss_room_state_list = [0] * self.player_num


	def dropRoom(self):
		self.dismiss_timer = None
		if 'round_result' in self.game_result and len(self.game_result['round_result']) > 0:
			self.subtotal_result()
		else:
			for p in self.players_list:
				if p:
					try:
						p.quitRoomSucceed()
					except:
						pass

			self._reset()

	def subtotal_result(self):
		self.dismiss_timer = None
		player_info_list = [p.get_final_client_dict() for p in self.players_list if p is not None]
		DEBUG_MSG("{} subtotal_result,player_info_list:{}".format(self.prefixLogStr, player_info_list))

		for p in self.players_list:
			if p:
				try:
					p.subtotalResult(player_info_list)
				except:
					pass
		self._reset()

	def timeoutDestroy(self):
		INFO_MSG("{} timeout destroyed. room_type = {}, owner_uid = {}".format(self.prefixLogStr, self.room_type, self.owner_uid))
		if self.current_round < 1:
			self.dropRoom()

	def give_up_record_game(self):
		DEBUG_MSG("{} give up record game; {}".format(self.prefixLogStr, self.record_id))
		KBEngine.globalData['GameWorld'].give_up_record_room(self.roomIDC)

	def saveRoomResult(self):
		self.game_result.update({'user_info_list': [p.get_basic_user_info() for p in self.players_list if p is not None and p.identity == const_ps.GAME_PLAYER]})
		# 保存玩家的战绩记录
		self.save_game_result()
		# 保存茶楼的战绩
		if self.room_type == const.CLUB_ROOM:
			self.save_club_result()

	def save_game_result(self):
		DEBUG_MSG('{} ----- save_game_result ----- len:{}'.format(self.prefixLogStr, len(self.game_result.get('round_result', []))))
		if 'round_result' in self.game_result and len(self.game_result.get('round_result', [])) > 0:
			result_str = json.dumps(self.game_result)
			for p in self.players_list:
				p and p.save_game_result(result_str)

	def save_club_result(self):
		DEBUG_MSG('{} ------ save club result -----'.format(self.prefixLogStr))
		d = self.get_club_complete_dict()
		self.base.saveClubResult(d)
		if 'round_result' in self.game_result and len(self.game_result['round_result']) > 0:
			self.base.updateClubDAU([p.get_dau_client_dict() for p in self.players_list if p is not None])

	def get_club_complete_dict(self):
		return {
			'gameType'		: self.gameTypeC,
			'roomID'		: self.roomIDC,
			'time'			: utility.get_cur_timestamp(),
			'game_round'	: self.game_round,
			'pay_mode'		: self.pay_mode,
			'roundResult'	: json.dumps(self.game_result.get('round_result', [])),
			'player_info_list': [p.get_club_client_dict() for p in self.players_list if p is not None],
			'cost'			: utility.calc_cost(self.gameTypeC, self.roomParamsC)[0] if self.current_round >= 2 else 0 # 第二局开始扣房卡
		}

	def reqLeaveRoom(self, entityCall):
		"""
		defined.
		客户端调用该接口请求离开房间/桌子
		"""
		DEBUG_MSG("{} reqLeaveRoom userId:{}, room_type:{}, state:{}".format(self.prefixLogStr, entityCall.userId, self.room_type, self.state))
		if 0 < self.current_round <= self.game_round:
			# 非游戏玩家退出
			if entityCall.identity == const_ps.GAME_VIEWER:
				self.onLeave(entityCall)
				if self.state == const.ROOM_WAITING:
					self.ready_after_prepare()
				return
			entityCall.quitRoomFailed(const.QUIT_FAILED_ROOM_STARTED)
			return

		if self.state != const.ROOM_WAITING:
			DEBUG_MSG("{} reqLeaveRoom: not allow ".format(self.prefixLogStr))
			return
		# 房间控制权 转移
		if entityCall.idx != 0 or self.room_type != const.NORMAL_ROOM:
			if entityCall.is_control and len(self.avatars) > 1:
				self.give_control(self._get_next_sit_idx(entityCall.idx))
		self.onLeave(entityCall)

	def get_init_client_dict(self):
		return {
			'roomID': self.roomIDC,
			'ownerId': self.owner_uid,
			'roomType': self.room_type,
			'curRound': self.current_round,
			'game_round': self.game_round,
			'player_num': self.player_num,
			'pay_mode': self.pay_mode,
			'bout_num': self.bout_num,
			'mul_num': self.mul_num,
			'bomb_straight_flush_double': self.bomb_straight_flush_double,
			'compare_double': self.compare_double,
			'serial_circle': self.serial_circle,
			'halfway_join': self.halfway_join,
			'auto_op': self.auto_op,
			'stuffy_num': self.stuffy_num,
			'hand_prepare': self.hand_prepare,
			'op_seconds': self.op_seconds,
			'room_state': const.ROOM_PLAYING if self.state == const.ROOM_PLAYING else const.ROOM_WAITING,
			'club_id': self.club_id,
			'table_idx': getattr(self, 'table_idx', -1),
			'player_base_info_list': [p.get_init_client_dict() for p in self.players_list if p is not None],
			'player_state_list': [1 if i in self.confirm_next_idx else 0 for i in range(self.player_num)],
		}

	def reqReconnect(self, entityCall):
		DEBUG_MSG("{} entityCall reqReconnect userId:{}".format(self.prefixLogStr, entityCall.userId))
		if entityCall.id not in self.avatars.keys():
			return

		DEBUG_MSG("{} entityCall reqReconnect player:{} is in room".format(self.prefixLogStr, entityCall.userId))
		# 如果进来房间后牌局已经开始, 就要传所有信息
		# 如果还没开始, 跟加入房间没有区别
		rec_room_info = self.get_reconnect_room_dict(entityCall.userId)
		entityCall.handleReconnect(rec_room_info)
		# if self.state == const.ROOM_PLAYING or 0 < self.current_round <= self.game_round:
		# 	# if self.state == const.ROOM_WAITING:
		# 	# 	# 重连回来直接准备
		# 	# 	self.client_prepare(entityCall)
		# 	rec_room_info = self.get_reconnect_room_dict(entityCall.userId)
		# 	entityCall.handleReconnect(rec_room_info)
		# else:
		# 	sit = 0
		# 	for idx, p in enumerate(self.players_list):
		# 		if p and p.userId == entityCall.userId:
		# 			sit = idx
		# 			break
		# 	entityCall.enterRoomSucceed(sit, self.get_init_client_dict())


	def get_reconnect_room_dict(self, userId):
		dismiss_left_time = self.dismissRoomSecends - (int(time.time() - self.dismiss_room_ts))
		if self.dismiss_room_ts == 0 or dismiss_left_time >= self.dismissRoomSecends:
			dismiss_left_time = 0

		if len(self.op_record) <= 0:
			wait_time_left = self.op_seconds + const_ps.BEGIN_ANIMATION_TIME - (time.time() - self._op_timer_timestamp)
		else:
			wait_time_left = self.op_seconds - (time.time() - self._op_timer_timestamp)
		wait_time_left = wait_time_left if wait_time_left > 0 else 0

		return {
			'gameType': self.gameTypeC,
			'init_info': self.get_init_client_dict(),
			'room_state': const.ROOM_PLAYING if self.state == const.ROOM_PLAYING else const.ROOM_WAITING,
			'player_state_list': [1 if i in self.confirm_next_idx else 0 for i in range(self.player_num)],
			'waitTimeLeft': int(wait_time_left),
			'applyCloseFrom': self.dismiss_room_from,
			'applyCloseLeftTime': dismiss_left_time,
			'applyCloseStateList': self.dismiss_room_state_list,
			'player_advance_info_list': [p.get_reconnect_client_dict(userId) for p in self.players_list if p is not None],
			'min_stack': self.min_stack,
			'score': self.score,
			'current_idx': self.current_idx,
			'current_bout_num': self.current_bout_num,
			'dealer_idx': self.dealer_idx,
			'stacks'	: list(self.stacks),
		}


	def broadcastEnterRoom(self, idx):
		new_p = self.players_list[idx]
		for i, p in enumerate(self.players_list):
			if p is None:
				continue
			if i == idx:
				p.enterRoomSucceed(idx, self.get_reconnect_room_dict(new_p.userId))
			else:
				p.othersEnterRoom(new_p.get_init_client_dict())
