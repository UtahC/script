var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
	    cm.sendSimple("須要甚麼幫助嗎?\r\n#b#L0#我想離婚#l\r\n#L1#我想刪除我的結婚戒指.#l#k");
    } else if (status == 1) {
		if (selection == 0) {
			if(cm.getPlayer().getMarriageId() > 0){
				cm.sendYesNo("你確定嗎!?一旦決定了就無法挽回了");
			}else{
				cm.sendOk("你沒有結婚");
				cm.dispose();
			}
		} else {
			var selStr = "你想要移除哪個戒指...";
			var found = false;
			for (var i = 1112300; i < 1112312; i++) {
				if (cm.haveItem(i)) {
					found = true;
					selStr += "\r\n#L" + i + "##v" + i + "##t" + i + "##l";
				}
			}
			for (var i = 4210000; i < 4210012; i++) {
				if (cm.haveItem(i)) {
					found = true;
					selStr += "\r\n#L" + i + "##v" + i + "##t" + i + "##l";
				}
			}
			for (var i = 2240004; i <= 2240015; i++) {
				if (cm.haveItem(i)) {
					found = true;
					selStr += "\r\n#L" + i + "##v" + i + "##t" + i + "##l";
				}
			}
			if (!found) {
				cm.sendOk("你沒有任何戒指.");
				cm.dispose();
			} else {
				cm.sendSimple(selStr);
			}
	    }
    } else if (status == 2) {
		if (selection == -1) {
			var cPlayer = cm.getClient().getChannelServer().getPlayerStorage().getCharacterById(cm.getPlayer().getMarriageId());
			if (cPlayer == null) {
				cm.sendNext("請確認你的伴侶在線上.");
			} else {
				cPlayer.dropMessage(1, "你與伴侶已經離婚.");
				cPlayer.setMarriageId(0);
				cm.setQuestRecord(cPlayer, 160001, "0");
				cm.setQuestRecord(cm.getPlayer(), 160001, "0");
				cm.setQuestRecord(cPlayer, 160002, "0");
				cm.setQuestRecord(cm.getPlayer(), 160002, "0");
				cm.getPlayer().setMarriageId(0);
				cm.sendNext("你們成功離婚了...");
			}
		} else {
			if (selection >= 1112300 && selection < 1112312) {
				cm.gainItem(selection, -1);
				cm.sendOk("已經移除你的戒指.");
			} else if (selection >= 4210000 && selection < 4210012) {
				cm.gainItem(selection, -1);
				cm.sendOk("你的訂婚戒指已經移除.");
			}
		}		
		cm.dispose();
    }
}