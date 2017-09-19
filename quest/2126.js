function end(mode, type, selection) {
    qm.gainExp(2000);
    qm.gainItem(4031619,-1);
    qm.gainItem(2030000,5);
    if(qm.haveItem(4031581)){
      qm.gainItem(2022155,5);
    }
    qm.forceCompleteQuest();
    qm.dispose();

}
