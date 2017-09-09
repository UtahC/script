// quest: 趕走惡魔的方法

var status = -1;

function action(mode, type, selection) {
  if (! cm.isQuestActive(2236) || ! cm.haveItem(4032263)) {
    return cm.dispose();
  }

  var data = cm.getQuestCustomData(2236) || '000000';
  var index;
  var mapId = cm.getMap().getId();
  var maps = {
    105050200: 0,
    105060000: 1,
    105070000: 2,
    105090000: {top: 3, bottom: 4},
    105090100: 5
  };

  if (105090000 !== mapId) {
    index = maps[mapId];
  } else if (cm.getChar().getPosition().getY() < 1000) {
    index = maps[mapId].top;
  } else {
    index = maps[mapId].bottom;
  }

  if ('0' === data.charAt(index)) {
    cm.gainItem(4032263, -1);
    cm.setQuestCustomData(2236, data.substr(0, index) + '1' + data.substr(index + 1));
  }

  cm.dispose();
}
