# -*- coding: utf-8 -*-
import const_ps

def cardsType(cards):
	points = [_c>>2 for _c in cards]
	colors = [_c&3 for _c in cards]
	stead_points = insteadA(cards)
	if len(set(points)) == 1:
		return const_ps.TYPE_BOMB
	elif len(set(colors)) == 1:
		if stead_points[0] + 1 == stead_points[1] and stead_points[1] + 1 == stead_points[2]:
			return const_ps.TYPE_STRAIGHT_FLUSH
		return const_ps.TYPE_FLUSH
	elif stead_points[0] + 1 == stead_points[1] and stead_points[1] + 1 == stead_points[2]:
		return const_ps.TYPE_STRAIGHT
	elif len(points) == len(set(points)) + 1:
		return const_ps.TYPE_PAIR
	elif len(colors) == len(set(colors)) and points == [2,3,5]:
		return const_ps.TYPE_SPECIAL
	return const_ps.TYPE_HIGH

# 判断 A 是 当1还是当14
def insteadA(cards):
	points = [_c >> 2 for _c in cards]
	if any(_p == 2 for _p in points):
		return sorted([_p if _p != 14 else 1 for _p in points])
	else:
		return sorted(points)

def producePair(cards):
	points = [_c >> 2 for _c in cards]
	if points[0] == points[1]:
		return points[0], points[2]
	elif points[0] == points[2]:
		return points[0], points[1]
	else:
		return points[1], points[0]

def compare(a, b, serial_circle):
	a_type = cardsType(a)
	b_type = cardsType(b)
	if a_type == b_type:
		a_points = [_c >> 2 for _c in a]
		b_points = [_c >> 2 for _c in b]
		if a_type == const_ps.TYPE_BOMB:
			return max(a_points) > max(b_points)
		elif a_type == const_ps.TYPE_STRAIGHT_FLUSH or a_type == const_ps.TYPE_STRAIGHT:
			a_stead_points = insteadA(a)
			b_stead_points = insteadA(b)
			print(a_stead_points, b_stead_points)
			if serial_circle:
				a_max = 13.5 if a_stead_points == [1, 2, 3] else max(a_stead_points)
				b_max = 13.5 if b_stead_points == [1, 2, 3] else max(b_stead_points)
				return a_max > b_max
			return max(a_stead_points) > max(b_stead_points)
		elif a_type == const_ps.TYPE_FLUSH or a_type == const_ps.TYPE_HIGH or a_type == const_ps.TYPE_SPECIAL:
			a_reverse_points = list(reversed(a_points))
			b_reverse_points = list(reversed(b_points))
			for i in range(len(a_reverse_points)):
				if a_reverse_points[i] > b_reverse_points[i]:
					return True
				elif a_reverse_points[i] < b_reverse_points[i]:
					return False
			return False
		elif a_type == const_ps.TYPE_PAIR:
			a_pair, a_single = producePair(a)
			b_pair, b_single = producePair(b)
			if a_pair > b_pair or (a_pair == b_pair and a_single > b_single):
				return True
			return False

	if a_type == const_ps.TYPE_SPECIAL and b_type == const_ps.TYPE_BOMB:
		return True
	elif a_type == const_ps.TYPE_BOMB and b_type == const_ps.TYPE_SPECIAL:
		return False
	return a_type > b_type

if __name__ == "__main__":
	print(cardsType([17, 34, 57]))