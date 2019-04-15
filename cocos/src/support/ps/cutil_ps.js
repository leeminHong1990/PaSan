"use strict";
var cutil_ps = function () {
};

cutil_ps.get_suit = function (value) {
	return value & 3;
};

cutil_ps.get_rank = function (value) {
	return value >> 2;
};

cutil_ps.getCardImgPath = function (cardInt) {
	if (cardInt === 0) {
		return "Poker/pic_poker_backend.png";
	}
	let rank = cutil_ps.get_rank(cardInt);
	let suit = cutil_ps.get_suit(cardInt);
	// 大小王
	let index = const_ps.JOKERS.indexOf(cardInt);
	if (index !== -1) {
		return "Poker/pic_poker_" + const_ps.JOKERS_IMAGE_INDEX[index] + '.png';
	}
	if (rank > 13) {
		rank -= 13;
	}
	return "Poker/pic_poker_" + const_ps.POKER_COLOR_DICT[suit] + "" + rank + '.png';
};

cutil_ps.is_pair = function (pokers) {
	let rank_0 = cutil_ps.get_rank(pokers[0]);
	let rank_1 = cutil_ps.get_rank(pokers[1]);
	let rank_2 = cutil_ps.get_rank(pokers[2]);
	return rank_0 === rank_1 || rank_0 === rank_2 || rank_1 === rank_2;
};

cutil_ps.is_seq = function (pokers) {
	let rank_0 = cutil_ps.get_rank(pokers[0]);
	let rank_1 = cutil_ps.get_rank(pokers[1]);
	let rank_2 = cutil_ps.get_rank(pokers[2]);
	let arr = [rank_0,rank_1,rank_2];
	var A_pos = arr.indexOf(ps_rules.A);
	if(A_pos>-1){//手中有A
		if((arr.indexOf(12)>-1 && arr.indexOf(13)>-1)||(arr.indexOf(2)>-1 && arr.indexOf(3)>-1)){
			return true;
		}
	}
	return rank_1 - 1 == rank_0 && rank_1 + 1 == rank_2;
};

cutil_ps.is_com_color = function (pokers) {
	let suit_0 = cutil_ps.get_suit(pokers[0]);
	let suit_1 = cutil_ps.get_suit(pokers[1]);
	let suit_2 = cutil_ps.get_suit(pokers[2]);
	return suit_0 == suit_1 && suit_1 == suit_2;
};

cutil_ps.is_seq_color = function (pokers) {
	return cutil_ps.is_com_color(pokers) && cutil_ps.is_seq(pokers);
};

cutil_ps.is_baozi = function (pokers) {
	let rank_0 = cutil_ps.get_rank(pokers[0]);
	let rank_1 = cutil_ps.get_rank(pokers[1]);
	let rank_2 = cutil_ps.get_rank(pokers[2]);
	return rank_0 === rank_1 && rank_0 === rank_2;
};

cutil_ps.poker_compare = function (a, b, suit) {
	suit = suit === undefined ? true : suit;
	let color1 = cutil_ps.get_suit(a);
	let num1 = cutil_ps.get_rank(a);
	let color2 = cutil_ps.get_suit(b);
	let num2 = cutil_ps.get_rank(b);
	if (num1 === num2 && suit) {
		return color1 - color2;
	}
	return cutil_ps.compare_rank(num2, num1);
};

cutil_ps.compare_rank = function (a, b) {
	if (a === 14) {
		a = a - 13;
	}
	if (b === 14) {
		b = b - 13;
	}
	return b - a; //升序
};

cutil_ps.check_pair = function (pokers) {
	if(!pokers || pokers.length !==3 || pokers[0]===0){
		// cc.error("bad list can't check");
		return false;
	}
	pokers.sort(cutil_ps.poker_compare);
	if(cutil_ps.is_baozi(pokers)){
		return const_ps.PAIR_TYPE[0];
	}else if(cutil_ps.is_seq_color(pokers)){
		return const_ps.PAIR_TYPE[1];
	}else if(cutil_ps.is_com_color(pokers)){
		return const_ps.PAIR_TYPE[2];
	}else if(cutil_ps.is_seq(pokers)){
		return const_ps.PAIR_TYPE[3];
	}else if(cutil_ps.is_pair(pokers)){
		return const_ps.PAIR_TYPE[4];
	}else{
		return const_ps.PAIR_TYPE[5];
	}
};

