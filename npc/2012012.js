var status = -1;

function action(mode, type, selection) {
  if (cm.getQuestStatus(3004) == 1) {
    cm.sendOk("�A�b��W�j�]�Ѷ�?��ĳ�A�h��ޮa�㺿,�o�b�����.");
    cm.forceCompleteQuest(3004);
    cm.dispose();
  } else {
    cm.sendNext("�аݦ�����Ʊ���??");
    cm.dispose();
  }
}
