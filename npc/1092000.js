// quest: 尋找新鮮的牛奶

function start() {
  if (! cm.isQuestActive(2180) || cm.haveItem(4031850)) {
    cm.sendOk('你不能進去這裡。');
  } else {
    if (! cm.haveItem(4031847)) {
      if (! (cm.haveItem(4031848) || cm.haveItem(4031849) || cm.haveItem(4031850))) {
        cm.gainItem(4031847, 1);
      }
    }

    cm.warp('912000100', 'sp');
  }

  cm.dispose();
}
