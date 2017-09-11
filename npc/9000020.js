/*
 * NPC Name: Spinel
 * Description: World Tour Guide
 */

/**
 * 新葉城  600000000  10w
 * 101大道 742000000  10w
 * 新加坡(中央商務區) 540000000  10w
 * 新加坡(駁船碼頭城) 541000000  10w
 * 日本神社 800000000  10w
 * 黃金海岸 110000000  10w
 * 瑞恩村   140000000  10w
 * 納希沙漠 260000000  10w
 * 泰國(水上市場) 500000000  20w
 * 天空之城 200000000  20w
 * 冰原雪域 211000000  30w
 * 水世界   230000000  30w
 * 時間神殿 270000000  30w
 * 玩具城   220000000  35w
 * 童話村   222000000  35w
 * 武陵桃園 250000000  35w
 * 神木村   240000000  35w
 * 地球防衛總部 221000000 40w
 */

var status = 0;

var maps = [
  600000000, 742000000, 540000000,
  541000000, 800000000, 110000000,
  140000000, 260000000, 500000000,
  200000000, 211000000, 230000000,
  270000000, 220000000, 222000000,
  250000000, 240000000, 221000000
];

var mapsname = [
  '#b新葉城#k', '#b101大道#k', '#b新加坡(中央商務區)#k',
  '#b新加坡(駁船碼頭城)#k', '#b日本神社#k', '#b黃金海岸#k',
  '#b瑞恩村#k', '#b納希沙漠#k', '#b泰國(水上市場)#k',
  '#b天空之城#k', '#b冰原雪域#k', '#b水世界#k',
  '#b時間神殿#k', '#b玩具城#k', '#b童話村#k',
  '#b武陵桃園#k', '#b神木村#k', '#b地球防衛總部#k'
];

var costs = [
  '100,000', '100,000', '100,000',
  '100,000', '100,000', '100,000',
  '100,000', '200,000', '200,000',
  '300,000', '300,000', '300,000',
  '350,000', '350,000', '350,000',
  '350,000', '400,000', '400,000'
];

var selectedMap = -1;

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (-1 == mode) {
    cm.dispose();
  } else {
    if ((status >= 3 && 0 == mode) || mode != 1) {
      cm.sendOk('如果你決定好要去哪裡，我會很樂意傳送你的。');
      cm.dispose();

      return;
    }

    status++;

    if (status == 0) {
      cm.sendYesNo('累了想去散散心嗎？我可以幫你傳送到很多地方。');
    } else if (status == 1) {
      var selStr = '選擇你的目的地：#b';

      for (var i = 0; i < maps.length; i++) {
        selStr += "\r\n#L" + i + '#' + mapsname[i];
      }

      cm.sendSimple(selStr);
    } else if (status == 2) {
      cm.sendYesNo('到 #b' + mapsname[selection] + ' 需要 #b' + costs[selection] + ' 楓幣#k，你確定要前往嗎？');

      selectedMap = selection;
    } else if (status == 3) {
      var costMeso = parseInt(costs[selectedMap].replace(',', ''));

      if (cm.getMeso() < costMeso) {
        cm.sendOk('不好意思，你的楓幣不足喔。');
      } else {
        cm.gainMeso(-costMeso);

        cm.warp(maps[selectedMap], 0);
      }

      cm.dispose();
    }
  }
}
