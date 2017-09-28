/*
 * TMS 113 npc/2050018.js
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
 * quest: 隕石樣本採集
 * npc id: 2050018
 * npc name: 隕石5
 */

var status = -1;

function action(mode, type, selection) {
  if (cm.isQuestActive(3421)) {
    if (! cm.canHold(4031117)) {
      cm.playerMessage("請確認道具欄內是否有足夠的空間。");
    } else {
      var info = cm.getQuestInfo(3421);
      var index = cm.getNpc() - 2050014;

      if (info.charAt(index) === '0') {
        info = info.substring(0, index) + '1' + info.substring(index + 1);

        cm.setQuestInfo(3421, info);
        cm.gainItem(4031117, 1);
      }
    }
  }

  cm.dispose();
}
