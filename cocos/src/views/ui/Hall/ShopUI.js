// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
var ShopUI = BasicDialogUI.extend({
	ctor:function() {
		this._super();
		this.resourceFilename = "res/ui/ShopUI.json";
	},

	initUI:function(){
		this.use_native_pay = false;
		this.shop_panel = this.rootUINode.getChildByName("shop_panel");
		var self = this;
		var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');

		if(cc.sys.localStorage.getItem('HAS_NATIVE_PAY') == 1){
            this.use_native_pay = true;
		}

		this.shop_panel.getChildByName("return_btn").addTouchEventListener(function (sender, eventType) {
			if(eventType == ccui.Widget.TOUCH_ENDED) {
				self.hide();
				cutil.get_user_info("wx_" + info_dict["unionid"], function(content){
					if(content[0] != '{'){
						return;
					}
					var info = eval('(' + content + ')');
					h1global.curUIMgr.gamehall_ui.update_roomcard(info["card"].toString());
					if(h1global.player()){
						h1global.player().card_num = info["card"];
					}
				});

			}
		});

		var card_panel = this.shop_panel.getChildByName("card_panel");
		var card_scroll = card_panel;
		for (var i = 0 ; i < 6 ; i++) {
			let idx = i;
			var item_panel = card_scroll.getChildByName("item_panel_" + idx.toString());
			var shop_buy_btn = item_panel.getChildByName("shop_buy_btn");
			shop_buy_btn.addTouchEventListener(function (sender, eventType) {
				if (eventType == ccui.Widget.TOUCH_ENDED) {
					// h1global.globalUIMgr.info_ui.show_by_info("暂未开放！");
					cutil.lock_ui();
					if(self.use_native_pay){
						self.get_prepay_url(idx+1);
					}else{
                        if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
                            if (switches.appstore_check == true) {
                                var funcId = cutil.addFunc(function (result) {
                                    cutil.unlock_ui();
                                    cc.log(result);
                                    if (result == 'YES') {
                                        h1global.curUIMgr.gamehall_ui.updateCharacterCard();
                                    }
                                });
                                cutil.lock_ui();
                                jsb.reflection.callStaticMethod("IAPOcBridge", "startPurchWithID:completeHandle:", const_val.CARD_NUM_LIST[idx].toString() + "_cards", funcId);
                            } else {
                                cutil.get_pay_url(idx + 1);
                            }
                        } else if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
                            cutil.get_pay_url(idx + 1);
                        } else {
                            cutil.get_pay_url(idx + 1);
                        }
					}
				}
			});
		}

		this.update_card_price();
	},

	update_card_price:function(){
		var bottom_panel = this.shop_panel.getChildByName("bottom_panel");
		//判断如果没有绑定上级
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        if(1){
        	bottom_panel.getChildByName("bottom_tips_label").setVisible(false);//隐藏绑定邀请码更优惠的文字
            var card_panel = this.shop_panel.getChildByName("card_panel");
            var card_scroll = card_panel;
            for (var i = 0 ; i < 6 ; i++) {
                let idx = i;
                var item_panel = card_scroll.getChildByName("item_panel_" + idx.toString());
                var shop_buy_btn = item_panel.getChildByName("shop_buy_btn");
                shop_buy_btn.loadTextureNormal("res/ui/ShopUI/shop_buy_btn_"+i+".png");
                if(idx!=0){
                    item_panel.getChildByName("handsel_img").setVisible(true);
				}else{
                    item_panel.getChildByName("handsel_img").setVisible(false);
				}
                item_panel.getChildByName("handsel_img").setVisible(true);
            }
		}else{
            bottom_panel.getChildByName("bottom_tips_label").setVisible(true);
            var card_panel = this.shop_panel.getChildByName("card_panel");
            var card_scroll = card_panel;
            for (var i = 0 ; i < 6 ; i++) {
                let idx = i;
                var item_panel = card_scroll.getChildByName("item_panel_" + idx.toString());
                var shop_buy_btn = item_panel.getChildByName("shop_buy_btn");
                shop_buy_btn.loadTextureNormal("res/ui/ShopUI/nobind_shop_btn_"+i+".png");
                item_panel.getChildByName("handsel_img").setVisible(false);
            }
		}


	},

    get_prepay_url : function(goods_id) {
        var info_dict = eval('(' + cc.sys.localStorage.getItem("INFO_JSON") + ')');
        var bind_xhr = cc.loader.getXMLHttpRequest();
		if(!info_dict.hasOwnProperty("openid")){
			cc.log("not have openid");
			return;
		}
        cc.log(cutil.appendUrlParam(switches.PHP_SERVER_URL + "/api/prepay_info", ['goods_id', goods_id,'openid',info_dict['openid']]));
        bind_xhr.open("GET", cutil.appendUrlParam(switches.PHP_SERVER_URL + "/api/prepay_info", ['goods_id', goods_id,'openid',info_dict['openid']]), true);

        bind_xhr.onreadystatechange = function () {
            // cutil.unlock_ui();
            if (bind_xhr.readyState === 4 && bind_xhr.status === 200) {
                cc.log(bind_xhr.responseText);
                if(bind_xhr.responseText[0] == "{") {
                    var pay_url_dict = JSON.parse(bind_xhr.responseText);
                    if (pay_url_dict["errcode"] == 0) {
                        cc.log("error code is 0 ");
                        if(pay_url_dict.hasOwnProperty("data")){
                            var data = pay_url_dict["data"];
                            if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
                                jsb.reflection.callStaticMethod("WechatOcBridge", "callWechatPayWithPrepayID:andNonceStr:andTimeStamp:andSign:", data.prepayid, data.noncestr, data.timestamp, data.sign);
                            } else if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.isNative) {
                                jsb.reflection.callStaticMethod(switchesnin1.package_name + "/AppActivity", "callWechatPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", data.prepayid, data.noncestr, data.timestamp, data.sign);
                            } else {
                                cc.log('pass');
                            }
                        }else{
                            cc.log("not find data");
                        }
                    }else{
                        cc.log("Get Pay Url Error! The Error Code is " + pay_url_dict["errcode"].toString() + "!");
                        h1global.globalUIMgr.info_ui.show_by_info("无效的支付链接！", cc.size(300, 200));
                    }
                } else {
                    cc.log("The Pay Url is Illegall!");
                    h1global.globalUIMgr.info_ui.show_by_info("无效的支付链接！", cc.size(300, 200));
                }
            }else{
                cc.log("readyState error",bind_xhr.readyState);
                cc.log("bind_xhr.status",bind_xhr.status);
            }
        };
        bind_xhr.setRequestHeader("Authorization", "Bearer " + info_dict["token"]);
        bind_xhr.send();
    },
});