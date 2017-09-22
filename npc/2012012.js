var status = -1;

function action(mode, type, selection) {
  if (cm.getQuestStatus(3004) == 1) {
    cm.sendOk("你在找上古魔書嗎?建議你去找管家艾瑪,她在公園裡.");
    cm.forceCompleteQuest(3004);
    cm.dispose();
  } else {
    cm.sendNext("請問有什麼事情嗎??");
    cm.dispose();
  }
}
