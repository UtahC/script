var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (qm.getPlayerStat("HP") < 50) {
                qm.sendNext("我看你好像還沒準備好，準備好在來找我吧。");
                qm.dispose();
            } else {
                qm.sendNext("是否已經準備好前進沙漠了??");
            }

        } else if (status == 1) {
            qm.sendNextPrev("我會想你的。");
        } else if (status == 2) {
            qm.warp(260000200);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}
