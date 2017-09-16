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
 * npc name: ������GM
 */

var status = -1;
var quantity = 0;

// �����I�������I�ƶײv
var mesoToMaplePointRate = 200000;
// �����I�������I�ƶײv
var mapleLeafToMaplePointRate = 15;
// �����I�����֨��b�ײv
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
      return endSession('�����H�ɨӬݬ���I');
    }

    status--;
  }

  if (0 === status) {
    var options = [
      '#L0##b�����I�ƧI���]�����^#k',
      '#L1##b�����I�ƧI���]�����^#k',
      '#L2##b#t2340000#�I���]�����^#k'
    ];

    cm.sendSimple('�аݻݭn����A�ȩO�H\r\n' + options.join('\r\n'));
  } else if (1 === status) {
    var maxQuantity;

    switch (selection) {
      case 0:
        maxQuantity = Math.floor((Math.pow(2, 31) - 1) / mesoToMaplePointRate);

        cm.sendGetNumber('�п�J���I����#b�����I��#k�ƶq�A�ثe�ײv�O #r' + formatNumber(mesoToMaplePointRate) + '#k #b����#k�I�� #r1#k �I#b�����I��#k�G', 10, 1, maxQuantity);

        break;
      case 1:
        maxQuantity = Math.floor((4 * 6 * 4 * 1000 /* �����ƶq�W�u */) / mapleLeafToMaplePointRate);

        cm.sendGetNumber('�п�J���I����#b�����I��#k�ƶq�A�ثe�ײv�O #r' + formatNumber(mapleLeafToMaplePointRate) + '#k ��#b#t4001126##k�I�� #r1#k �I#b�����I��#k�G', 10, 1, maxQuantity);

        break;
      case 2:
        cm.sendGetNumber('�п�J���I���� #v2340000# #b#t2340000##k �ƶq�A�ثe�ײv�O #r' + formatNumber(mapleLeafToWhiteScroll) + '#k ��#b#t4001126##k�I�� #r1#k �i#b#t2340000##k�G', 1, 1, 100);

        break;
      default:
        return endSession('�o�ͤF�@�I���D�A�еy�ԦA�աC');
    }

    status = 10 + selection * 4;
  } else if (11 === status) {
    quantity = mesoToMaplePointRate * selection;

    if (cm.getMeso() < quantity) {
      cm.sendOk('�I�����ѡA#b����#k�ƶq�����C');
    } else {
      cm.gainMeso(-quantity);
      cm.gainMaplePoint(selection);
      cm.sendOk('�I�����\�I');
    }

    cm.safeDispose();
  } else if (15 === status) {
    quantity = mapleLeafToMaplePointRate * selection;

    if (!cm.haveItem(4001126, quantity)) {
      cm.sendOk('�I�����ѡA#b#t4001126##k�ƶq�����C');
    } else {
      cm.gainItem(4001126, -quantity);
      cm.gainMaplePoint(selection);
      cm.sendOk('�I�����\�I');
    }

    cm.safeDispose();
  } else if (19 === status) {
    quantity = mapleLeafToWhiteScroll * selection;

    if (!cm.haveItem(4001126, quantity)) {
      cm.sendOk('�I�����ѡA#b#t4001126##k�ƶq�����C');
    } else {
      cm.gainItem(4001126, -quantity);
      cm.gainItem(2340000, selection);
      cm.sendOk('�I�����\�I');
    }

    cm.safeDispose();
  } else if ([9, 13, 17].indexOf(status) !== -1) {
    return endSession('�����H�ɨӬݬ���I')
  } else {
    cm.safeDispose();
  }
}
