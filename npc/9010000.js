/*
 * TMS 113 npc/9010000.js
 *
 * Copyright (C) 2017 ~ Present
 *
 * freedom <freedom@csie.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * npc id: 9010000
 * npc name: 楓之谷GM
 */

var status = -1;
var quantity = 0;

// 楓幣兌換楓葉點數匯率
var mesoToMaplePointRate = 200000;
// 楓葉兌換楓葉點數匯率
var mapleLeafToMaplePointRate = 15;
// 楓葉兌換祝福卷軸匯率
var mapleLeafToWhiteScroll = 500;

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

function endSession(msg) {
  cm.sendOk(msg);
  cm.safeDispose();
}

function action(mode, type, selection) {
  if (1 === mode) {
    status++;
  } else {
    if (0 === status) {
      return endSession('有空隨時來看看呦！');
    }

    status--;
  }

  if (0 === status) {
    var options = [
      '#L0##b楓葉點數兌換（楓幣）#k',
      '#L1##b楓葉點數兌換（楓葉）#k',
      '#L2##b#t2340000#兌換（楓葉）#k'
    ];

    cm.sendSimple('請問需要什麼服務呢？\r\n' + options.join('\r\n'));
  } else if (1 === status) {
    var maxQuantity;

    switch (selection) {
      case 0:
        maxQuantity = Math.floor((Math.pow(2, 31) - 1) / mesoToMaplePointRate);

        cm.sendGetNumber('請輸入欲兌換的#b楓葉點數#k數量，目前匯率是 #r' + formatNumber(mesoToMaplePointRate) + '#k #b楓幣#k兌換 #r1#k 點#b楓葉點數#k：', 10, 1, maxQuantity);

        break;
      case 1:
        maxQuantity = Math.floor((4 * 6 * 4 * 1000 /* 楓葉數量上線 */) / mapleLeafToMaplePointRate);

        cm.sendGetNumber('請輸入欲兌換的#b楓葉點數#k數量，目前匯率是 #r' + formatNumber(mapleLeafToMaplePointRate) + '#k 個#b#t4001126##k兌換 #r1#k 點#b楓葉點數#k：', 10, 1, maxQuantity);

        break;
      case 2:
        cm.sendGetNumber('請輸入欲兌換的 #v2340000# #b#t2340000##k 數量，目前匯率是 #r' + formatNumber(mapleLeafToWhiteScroll) + '#k 個#b#t4001126##k兌換 #r1#k 張#b#t2340000##k：', 1, 1, 100);

        break;
      default:
        return endSession('發生了一點問題，請稍候再試。');
    }

    status = 10 + selection * 4;
  } else if (11 === status) {
    quantity = mesoToMaplePointRate * selection;

    if (cm.getMeso() < quantity) {
      cm.sendOk('兌換失敗，#b楓幣#k數量不足。');
    } else {
      cm.gainMeso(-quantity);
      cm.gainMaplePoint(selection);
      cm.sendOk('兌換成功！');
    }

    cm.safeDispose();
  } else if (15 === status) {
    quantity = mapleLeafToMaplePointRate * selection;

    if (!cm.haveItem(4001126, quantity)) {
      cm.sendOk('兌換失敗，#b#t4001126##k數量不足。');
    } else {
      cm.gainItem(4001126, -quantity);
      cm.gainMaplePoint(selection);
      cm.sendOk('兌換成功！');
    }

    cm.safeDispose();
  } else if (19 === status) {
    quantity = mapleLeafToWhiteScroll * selection;

    if (!cm.haveItem(4001126, quantity)) {
      cm.sendOk('兌換失敗，#b#t4001126##k數量不足。');
    } else {
      cm.gainItem(4001126, -quantity);
      cm.gainItem(2340000, selection);
      cm.sendOk('兌換成功！');
    }

    cm.safeDispose();
  } else if ([9, 13, 17].indexOf(status) !== -1) {
    return endSession('有空隨時來看看呦！')
  } else {
    cm.safeDispose();
  }
}
