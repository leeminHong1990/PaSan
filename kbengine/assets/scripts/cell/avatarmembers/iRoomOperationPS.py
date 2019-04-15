# -*- coding: utf-8 -*-
from KBEDebug import *
from classutils import checkEntityID

class iRoomOperationPS(object):

	def __init__(self):
		pass

	# c2s
	@checkEntityID
	def doPSOperation(self, callerEntityID, aid, value):
		if self.room:
			self.room.doPSOperation(self, aid, value, 0)

	@checkEntityID
	def setAutoFollow(self, callerEntityID, autoFollow):
		if self.room:
			self.room.setAutoFollow(self, autoFollow)

	def psPostOperation(self, idx, aid, pokers):
		if getattr(self, 'client', None):
			self.client.psPostOperation(idx, aid, pokers)


	def give_control(self, idx):
		if getattr(self, 'client', None):
			self.client.give_control(idx)

	@checkEntityID
	def client_start(self, callerEntityID):
		if self.room:
			self.room.client_start(self)
