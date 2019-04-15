var table_create_params = {
    1:{
        'game_type' : 1009,
        'is_show': 0,
        'name': 'ddz',
        'create_sort': 0,
        'init':{
            'flower_mode'   :0,
            'game_mode'     :0,
            'game_round'    :8,
            'hand_prepare'  :0,
            'max_boom_times':3,
            'op_seconds'    :0,
            'pay_mode'      :1,
            'player_num'    :3,
			'room_type'     :1,
			'mul_mode'      :0,
			'dealer_joker'  :0,
			'dealer_42'     :0,
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:[1,9,10,5,11,23,22,24,30], // 房主支付
                        2:[2,9,10,5,11,23,22,24,30], // AA支付
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:[1,9,10,6,11,23,22,24,30], // 房主支付
                        2:[2,9,10,6,11,23,22,24,30], // AA支付
                    }
                }
            }
        }
    },
    2:{
        'game_type' : 1012,
        'is_show': 0,
        'name': 'tdhmj',
        'create_sort': 3,
        'init':{
            'add_dealer'    :0,
            'add_winds'     :1,
            'bao_hu'        :1,
            'game_mode'     :1,
            'game_round'    :8,
            'hand_prepare'  :0,
            'king_mode'     :0,
            'kong_follow_win':0,
            'multiplayer_win':0,
            'need_ting'     :1,
            'lack_door'     :0,
            'pay_mode'      :1,
            'room_type'     :1,
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:[3,12,13,7,23,22,24,30], // 房主支付
                        2:[4,12,13,7,23,22,24,30], // AA支付
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:[3,12,13,8,23,22,24,30], // 房主支付
                        2:[4,12,13,8,23,22,24,30], // AA支付
                    }
                }
            }
        }
    },
    3:{
        'game_type' : 1004,
        'is_show': 0,
        'name': 'tykddmj',
        'create_sort': 1,
        'init':{
            'add_dealer'    :0,
            'game_mode'     :1,
            'game_round'    :8,
            'hand_prepare'  :0,
            'king_mode'     :0,
            'pay_mode'      :1,
            'reward'        :0,
            'room_type'     :1
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:{  // 房主支付
                            'game_mode':{
                                0:[3,15,18,7,23,22,24,30],
                                1:[3,15,18,7,23,22,24,30],
                                2:[3,15,16,17,7,23,22,24,30]
                            }
                        },
                        2:{  // AA支付
                            'game_mode':{
                                0:[4,15,18,7,23,22,24,30],
                                1:[4,15,18,7,23,22,24,30],
                                2:[4,15,16,17,7,23,22,24,30]
                            }
                        }
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:{  // 房主支付
                            'game_mode':{
                                0:[3,15,18,8,23,22,24,30],
                                1:[3,15,18,8,23,22,24,30],
                                2:[3,15,16,17,8,23,22,24,30]
                            }
                        },
                        2:{  // AA支付
                            'game_mode':{
                                0:[4,15,18,8,23,22,24,30],
                                1:[4,15,18,8,23,22,24,30],
                                2:[4,15,16,17,8,23,22,24,30]
                            }
                        }
                    }
                }
            }
        }
    },
    4:{
        'game_type' : 1005,
        'is_show': 0,
        'name': 'tylsmj',
        'create_sort': 5,
        'init':{
            'game_round'    : 8,
            'hand_prepare'  : 0,
            'play_list'     : [1,0],
	        "same_suit_mode": 1,
	        "same_suit_loong": 0,
            'pay_mode'      : 1,
            'room_type'     : 1
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:[3,19,7,23,22,24,30],
                        2:[4,19,7,23,22,24,30]
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:[3,19,8,23,22,24,30],
                        2:[4,19,8,23,22,24,30]
                    }
                }
            }
        }
    },
    5:{
        'game_type' : 1011,
        'is_show': 0,
        'name' : 'gsjmj',
        'create_sort': 8,
        'init':{
            'base_score'    : 1,
            'game_max_lose' : 9999,
            'game_mode'     : 0,
            'game_round'    : 8,
            'hand_prepare'  : 0,
            'job_mode'      : 0,
            'king_num'      : 0,
            'pay_mode'      : 1,
            'room_type'     : 1,
            'suit_mode'     : 2,
            'win_mode'      : 1,
            'add_dealer'      : 1,
            'base_score'      : 0,
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:[3,20,21,27,7,23,22,24,30],
                        2:[4,20,21,27,7,23,22,24,30]
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:[3,20,21,27,8,23,22,24,30],
                        2:[4,20,21,27,8,23,22,24,30]
                    }
                }
            }
        }
    },
    6:{
        'game_type' : 1013,
        'is_show': 0,
        'name': 'jzmj',
        'create_sort': 6,
        'init':{
            'game_round'    : 8,
            'hand_prepare'  : 0,
            'base_score'     :1,
            'stand_four'     :0,
            'pay_mode'      : 1,
            'room_type'     : 1
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:[3,32,31,7,23,22,24,30],
                        2:[4,32,31,7,23,22,24,30]
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:[3,32,31,8,23,22,24,30],
                        2:[4,32,31,8,23,22,24,30]
                    }
                }
            }
        }
    },
    7:{
        'game_type' : 1014,
        'is_show': 0,
        'name': 'jzgsjmj',
        'create_sort': 7,
        'init':{
            'game_round'    : 8,
            'hand_prepare'  : 0,
            'base_score'     :1,
            'pay_mode'      : 1,
            'room_type'     : 1
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:[3,32,7,23,22,24,30],
                        2:[4,32,7,23,22,24,30]
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:[3,32,8,23,22,24,30],
                        2:[4,32,8,23,22,24,30]
                    }
                }
            }
        }
    },
    8:{
        'game_type' : 1015,
        'is_show': 0,
        'name': 'dtlgfmj',
        'create_sort': 9,
        'init':{
            'game_mode': 0,
            'game_round': 8,
            'score_mode': 1,
            'seven_pair': 1,
            'base_score': 1,
            'kong_mode': 1,
            'hand_prepare': 0,
            'pay_mode':1,
            'room_type': 1
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:[3,33,34,35,7,23,22,24,30],
                        2:[4,33,34,35,7,23,22,24,30]
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:[3,33,34,35,8,23,22,24,30],
                        2:[4,33,34,35,8,23,22,24,30]
                    }
                }
            }
        }
    },
	9:{
		'game_type' : 1016,
		'is_show': 0,
		'name': 'llkddmj',
        'create_sort': 2,
		'init':{
			'add_dealer'    :0,
			'base_score'    :1,
			'game_mode'     :1,
			'game_round'    :8,
			'hand_prepare'  :0,
			'king_mode'     :0,
			'pay_mode'      :1,
			'reward'        :0,
			'room_type'     :1
		},
		'create':{
			'room_type':{
				1:{ // 普通开房
					'pay_mode':{
						1:{  // 房主支付
							'game_mode':{
								0:[3,42,36,39,7,23,22,24,30],
								1:[3,42,36,39,7,23,22,24,30],
								2:[3,42,36,37,39,7,23,22,24,30]
							}
						},
						2:{  // AA支付
							'game_mode':{
								0:[4,42,36,39,7,23,22,24,30],
								1:[4,42,36,39,7,23,22,24,30],
								2:[4,42,36,37,39,7,23,22,24,30]
							}
						}
					}
				},
				2:{ // 亲友圈开房
					'pay_mode':{
						3:{  // 房主支付
							'game_mode':{
								0:[3,42,36,39,8,23,22,24,30],
								1:[3,42,36,39,8,23,22,24,30],
								2:[3,42,36,37,39,8,23,22,24,30]
							}
						},
						2:{  // AA支付
							'game_mode':{
								0:[4,42,36,39,8,23,22,24,30],
								1:[4,42,36,39,8,23,22,24,30],
								2:[4,42,36,37,39,8,23,22,24,30]
							}
						}
					}
				}
			}
		}
	},
    10:{
        'game_type' : 1017,
        'is_show': 0,
        'name': 'll7',
        'create_sort': 4,
        'init':{
            'player_num'    : 5,
            'op_seconds'    : 0,
            'game_round'    : 6,
            'play_mode'     : 1,
            'sig_double'    : 1,
            'max_level'     : 3,
            'mul_level'     : 1,
            'bottom_level'  : 0,
            'hand_prepare'  : 0,
            'pay_mode'      : 1,
            'room_type'     : 1
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:[46,45,43,44,7,23,22,24,30],
                        2:[46,45,43,44,7,23,22,24,30]
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:[46,45,43,44,8,23,22,24,30],
                        2:[46,45,43,44,8,23,22,24,30]
                    }
                }
            }
        }
    },
    11:{
        'game_type' : 1018,
        'is_show': 0,
        'name': 'lsbmzmj',
        'create_sort': 11,
        'init':{
            'game_round'    : 8,
            'hand_prepare'  : 0,
            'base_score'     :1,
            'pay_mode'      : 1,
            'room_type'     : 1
        },
        'create':{
            'room_type':{
                1:{ // 普通开房
                    'pay_mode':{
                        1:[3,40,7,23,22,24,30],
                        2:[4,40,7,23,22,24,30]
                    }
                },
                2:{ // 亲友圈开房
                    'pay_mode':{
                        3:[3,40,8,23,22,24,30],
                        2:[4,40,8,23,22,24,30]
                    }
                }
            }
        }
    },
	12:{
		'game_type' : 1019,
		'is_show': 0,
		'name': 'lsblmj',
		'create_sort': 10,
		'init':{
			'game_round'    : 8,
			'hand_prepare'  : 0,
			'base_score'    : 1,
			'stand_four'    : 0,
			'pay_mode'      : 1,
			'room_type'     : 1
		},
		'create':{
			'room_type':{
				1:{ // 普通开房
					'pay_mode':{
						1:[3,41,7,23,22,24,30],
						2:[4,41,7,23,22,24,30]
					}
				},
				2:{ // 亲友圈开房
					'pay_mode':{
						3:[3,41,8,23,22,24,30],
						2:[4,41,8,23,22,24,30]
					}
				}
			}
		}
	},
	13:{
		'game_type' : 1020,
		'is_show': 1,
		'name': 'ps',
		'create_sort': 1,
		'init':{
			'player_num'    : 5,
			'game_round'    : 20,
			'bout_num'    	: 5,
			'mul_num'     	: 1,
			'bomb_straight_flush_double': 1,
			'compare_double': 1,
			'serial_circle' : 0,
			'halfway_join'  : 1,
			'auto_op'		: 0,
			'stuffy_num'  	: 0,
			'hand_prepare'  : 0,
			'pay_mode'      : 1,
			'room_type'     : 1,
			'op_seconds'    : 15
		},
		'create':{
			'room_type':{
				1:{ // 普通开房
					'pay_mode':{
						1:[47,48,49,50,51,7,23,22,24,30],
						2:[47,48,49,52,51,7,23,22,24,30]
					}
				},
				2:{ // 亲友圈开房
					'pay_mode':{
						3:[47,48,49,50,51,8,23,22,24,30],
						2:[47,48,49,52,51,8,23,22,24,30]
					}
				}
			}
		}
	},
};
