"use strict"
var GameHallUI = UIBase.extend({
    ctor:function() {
        this._super();
        this.resourceFilename = "res/ui/GameHallUI.json";
    },
    initUI:function(){
        var bg_img = ccui.helper.seekWidgetByName(this.rootUINode, "bg_img");
        var bg_img_content_size = bg_img.getContentSize();
        var scale = cc.winSize.width/bg_img_content_size.width;
        if (cc.winSize.height/bg_img_content_size.height > scale){
            scale = cc.winSize.height/bg_img_content_size.height;
        }
        bg_img.setScale(scale);
        // this.init_character_anim();
        this.init_card_panel();
        this.init_character_panel();
        this.init_left_bottom_panel();
        this.init_left_panel();
        this.init_right_panel();
        this.init_character_anim();
    },

    init_card_panel:function () {
        var character_panel = this.rootUINode.getChildByName("top_panel").getChildByName("character_panel");
        var roomcard_label = character_panel.getChildByName("card_label");
        roomcard_label.setString("— —");
    },

    init_character_anim:function () {
        var anime_panel = this.rootUINode.getChildByName("anime_panel");
		anime_panel.setVisible(false);
    },

    init_character_panel:function(){
        var character_panel = ccui.helper.seekWidgetByName(this.rootUINode, "character_panel");
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        var name_label = character_panel.getChildByName("name_label");
        name_label.setString(info_dict["nickname"]);
        var id_label = character_panel.getChildByName("id_label");
        id_label.setString("ID:" + info_dict["user_id"]);
        var roomcard_label = character_panel.getChildByName("card_label");
        roomcard_label.setString("— —");
        var frame_img = ccui.helper.seekWidgetByName(character_panel, "frame_img");
        character_panel.reorderChild(frame_img, 1);
        // frame_img.addTouchEventListener(function(sender, eventType){
        //     h1global.curUIMgr.playerinfo_ui.show();
        // });
        frame_img.setTouchEnabled(true);
        var self = this;
        cutil.loadPortraitTexture(info_dict["headimgurl"], info_dict["sex"], function(img){
            if(h1global.curUIMgr.gamehall_ui && h1global.curUIMgr.gamehall_ui.is_show){
                if(h1global.curUIMgr.gamehall_ui.rootUINode.getChildByName("top_panel").getChildByName("character_panel").getChildByName("portrait_sprite")){
                    h1global.curUIMgr.gamehall_ui.rootUINode.getChildByName("top_panel").getChildByName("character_panel").getChildByName("portrait_sprite").removeFromParent();
                }
                var portrait_sprite  = new cc.Sprite(img);
                portrait_sprite.setScale(62/portrait_sprite.getContentSize().width);
                // var stencil = new cc.Sprite("res/ui/GameHallUI/mask3.png"); // 遮罩模板 -- 就是你想把图片变成的形状
                // var clipnode = new cc.ClippingNode();
                // clipnode.x = 50;
                // clipnode.y = 70;
                // clipnode.setInverted(false);
                // clipnode.setAlphaThreshold(0.5);
                // clipnode.setStencil(stencil);
                // clipnode.addChild(portrait_sprite);
				var frame_img = self.rootUINode.getChildByName("top_panel").getChildByName("character_panel").getChildByName("frame_img")
                portrait_sprite.setPosition(frame_img.getPosition());
				portrait_sprite.setLocalZOrder(frame_img.getLocalZOrder()+1);
                h1global.curUIMgr.gamehall_ui.rootUINode.getChildByName("top_panel").getChildByName("character_panel").addChild(portrait_sprite);
            }
        });

        function update_card_diamond(){
            cutil.get_user_info("wx_" + info_dict["unionid"], function(content){
                if(content[0] != '{'){
                    return
                }
                if (cc.sys.isObjectValid(roomcard_label)) {
	                var info = eval('(' + content + ')');
	                roomcard_label.setString(info["card"].toString());
	                if(h1global.player()){
						h1global.player().card_num = info["card"];
                    }
                }
            });
        }

        update_card_diamond();

        //商城
        character_panel.getChildByName("buy_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                // if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
                h1global.curUIMgr.shop_ui.show();
                // } else {
                //     h1global.curUIMgr.publicnum_ui.show_by_info("请访问微信公众号搜索\r\n【" + switchesnin1.gzh_name + "】进行充值\r\n或扫以下二维码直接进入公众号进行充值");
                // }
            }
        });
	    character_panel.getChildByName("buy_btn").setVisible(false);
    },

    update_authenticate_btn:function(){
        var character_panel = this.rootUINode.getChildByName("bottom_panel");
        //认证
        if(!h1global.player()){
            cc.error("player is null");
            return;
        }
        character_panel.getChildByName("authenticate_btn").setVisible(true);
        var mark_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        if(mark_dict["remark"]){
            var str = Base64.decode(mark_dict["remark"]);
            var remark_dict = JSON.parse(str);
            if(remark_dict["identity"] && mark_dict["phone"] && mark_dict["phone"].toString().length==11){
                // if(h1global.curUIMgr.authentucate_ui && h1global.curUIMgr.authentucate_ui.is_show){
                //     h1global.curUIMgr.authentucate_ui.hide();
                // }
                // this.init_panel.getChildByName("identification_btn").getChildByName("get_check_img").setVisible(true);
                // this.init_panel.getChildByName("identification_btn").setTouchEnabled(false);
                character_panel.getChildByName("authenticate_btn").setVisible(false);
            }
        }
        // if(mark_dict["remark"]!==null && mark_dict["phone"] && mark_dict["phone"].toString().length==11){
        //     character_panel.getChildByName("authenticate_btn").setVisible(false);
        // }else{
        //     character_panel.getChildByName("authenticate_btn").setVisible(true);
        // }
    },



    remove_gift_btn:function(){
        //移除gift 按钮
        var character_panel = this.rootUINode.getChildByName("left_panel");
        if(character_panel.getChildByName("novice_node")){
            character_panel.getChildByName("novice_node").removeFromParent();
        }
    },

    updateCharacterCard: function () {
        if(!this.is_show){return;}
        var character_panel = ccui.helper.seekWidgetByName(this.rootUINode, "character_panel");
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        var name_label = character_panel.getChildByName("name_label");
        name_label.setString(info_dict["nickname"]);
        var id_label = character_panel.getChildByName("id_label");
        id_label.setString("ID:" + info_dict["user_id"]);
        var roomcard_label = character_panel.getChildByName("card_label");
        var frame_img = ccui.helper.seekWidgetByName(character_panel, "frame_img");
        character_panel.reorderChild(frame_img, 1);

        function update_card_diamond(){
            cutil.get_user_info("wx_" + info_dict["unionid"],

                function(content){
                    if(content[0] !== '{'){
                        return
                    }
	                if (cc.sys.isObjectValid(roomcard_label)) {
		                var info = eval('(' + content + ')');
		                roomcard_label.setString(info["card"].toString());
	                }
					if(h1global.player()){
						h1global.player().card_num = info["card"];
					}
                });
        }

        update_card_diamond();
    },

    update_roomcard:function(cards){
        var character_panel = ccui.helper.seekWidgetByName(this.rootUINode, "character_panel");
        var roomcard_label = character_panel.getChildByName("card_label");
        roomcard_label.setString(cards);
    },

    init_left_bottom_panel:function(){
        var left_panel = this.rootUINode.getChildByName("left_panel");
        //战绩
		left_panel.getChildByName("record_btn").addTouchEventListener(function (sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                h1global.curUIMgr.record_ui.show();
            }
        });
		//分享
		left_panel.getChildByName("share_btn").addTouchEventListener(function(sender, eventType){
			if(eventType == ccui.Widget.TOUCH_ENDED){
				// h1global.curUIMgr.task_ui.show();
				//发送给朋友圈
				if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
					jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "shareFreeCard", "()V");
				} else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
					jsb.reflection.callStaticMethod("WechatOcBridge", "shareFreeCard");
				} else {
					cc.log("share not support web");
				}
				// if(eventType == ccui.Widget.TOUCH_ENDED) {
				// 	var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
				// 	if((cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative)){
				// 		jsb.reflection.callStaticMethod(switches.package_name + "/AppActivity", "shareZQM", "(ZLjava/lang/String;)V", false, switches.PHP_SERVER_URL + "/invite/" + info_dict["user_id"]);
				// 	} else if((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative)){
				// 		jsb.reflection.callStaticMethod("WechatOcBridge", "shareZQM:withURL:", false, switches.PHP_SERVER_URL + "/invite/" + info_dict["user_id"]);
				// 	} else {
				// 		cc.log("share not support web")
				// 	}
				// }
			}
		});
    },

    init_left_panel:function () {
        var left_panel = this.rootUINode.getChildByName("bottom_panel");
        //邀请有礼
        left_panel.getChildByName("code_btn").addTouchEventListener(function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.gamehallshare_ui.show_by_info(1);
            }
        });
        //绑邀请码
        left_panel.getChildByName("bind_btn").addTouchEventListener(function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.gamehallshare_ui.show_by_info(2);
            }
        });

        if ((cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) && switches.appstore_check == true) {
            left_panel.setVisible(false);
        }
        //认证
        // this.update_authenticate_btn();

        left_panel.getChildByName("authenticate_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.authentucate_ui.show();
            }
        });
    },

    init_right_panel:function(){
        var right_panel = this.rootUINode.getChildByName("right_panel");
        // 创建房间
        right_panel.getChildByName("create_btn").addTouchEventListener(function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.createroom_ui.show();
                let player = h1global.player();
                if (player) {
                    player.upLocationInfo();
                } else {
                    cc.log('player undefined');
                }
            }
        });

        // 加入房间
        right_panel.getChildByName("join_btn").addTouchEventListener(function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
				// h1global.player().enterRoom(99999);
				// return;
                h1global.curUIMgr.joinroom_ui.show();
                let player = h1global.player();
                if (player) {
                    player.upLocationInfo();
                } else {
                    cc.log('player undefined');
                }
            }
        });

        // 亲友圈
        right_panel.getChildByName("group_btn").addTouchEventListener(function(sender, eventType){
            if(eventType === ccui.Widget.TOUCH_ENDED){
                cc.log('pls show group ui here.');
	            let player = h1global.player();
                if(player){
                    player.getClubListInfo();
                }

	            if (player) {
		            player.upLocationInfo();
	            } else {
		            cc.log('player undefined');
	            }
	            cutil.lock_ui();
            }
        });

        /*******************************************分割线***************************************************/
		var btn_panel = this.rootUINode.getChildByName("btn_panel");
        //公告
		btn_panel.getChildByName("notice_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.notice_ui.show();
            }
        });


        //客服
		btn_panel.getChildByName("service_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                // h1global.curUIMgr.customerservice_ui.show();
                h1global.curUIMgr.cs_ui.show();
            }
        });

        //玩法
		btn_panel.getChildByName("play_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.ruler_ui.show();
            }
        });

        //设置
		btn_panel.getChildByName("setting_btn").addTouchEventListener(function(sender, eventType){
            if(eventType == ccui.Widget.TOUCH_ENDED){
                h1global.curUIMgr.config_ui.show();
            }
        });
    },
});