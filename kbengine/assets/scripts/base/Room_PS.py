# -*- coding: utf-8 -*-
from Room import Room
import const

class Room_PS(Room):

	def __init__(self):
		Room.__init__(self)

	def enterRoom(self, entityCall, first=False):
		if self.gameType == const.PS and not first:
			if not self.halfway_join and (self.current_round > 0 or self.state != const.ROOM_WAITING):
				entityCall.enterRoomFailed(const.ENTER_FAILED_ROOM_HALFWAY_JOIN)
				return
		Room.enterRoom(self, entityCall, first)