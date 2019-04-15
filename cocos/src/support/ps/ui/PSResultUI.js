var PSResultUI = PokerResultUI.extend({

	set_panels_x:function(panels,sum_width){
		switch (this.result_player_num){
			case 2:
				panels[0].setPositionX(sum_width * 0.35);
				panels[1].setPositionX(sum_width * 0.65);
				break;
			case 3:
				panels[0].setPositionX(sum_width * 0.3);
				panels[1].setPositionX(sum_width * 0.5);
				panels[2].setPositionX(sum_width * 0.7);
				break;
			case 4:
				panels[0].setPositionX(sum_width * 0.2);
				panels[1].setPositionX(sum_width * 0.4);
				panels[2].setPositionX(sum_width * 0.6);
				panels[3].setPositionX(sum_width * 0.8);
				break;
			case 5:
				panels[0].setPositionX(sum_width * 0.13);
				panels[1].setPositionX(sum_width * 0.315);
				panels[2].setPositionX(sum_width * 0.5);
				panels[3].setPositionX(sum_width * 0.685);
				panels[4].setPositionX(sum_width * 0.87);
				break;
			default:
				break;
		}
	}

});