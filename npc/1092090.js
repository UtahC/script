// npc:   乳牛
// quest: 尋找新鮮的牛奶

function start() {
  if (cm.haveItem(4031847)) {
    cm.gainItem(4031847, -1);
    cm.gainItem(4031848, 1);
  } else if (cm.haveItem(4031848)) {
    cm.gainItem(4031848, -1);
    cm.gainItem(4031849, 1);
  } else if (cm.haveItem(4031849)) {
    cm.gainItem(4031849, -1);
    cm.gainItem(4031850, 1);
  }

  cm.sendOk('  哞~~~');
  cm.dispose();
}
