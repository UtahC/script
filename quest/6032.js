/*
 * TMS 113 quest/6032.js
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
 * quest: 史丹的操作課程
 * npc id: 2110004
 * npc name: 史丹
 */

var status = -1;

function end(mode, type, selection) {
  var info = qm.getQuestInfo(6029);

  info = info.substr(0, 2) + '1';

  qm.setQuestInfo(6029, info);
  qm.forceCompleteQuest();
  qm.sendOk('史丹的操作課程。');
  qm.dispose();
}
