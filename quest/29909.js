/*
 * TMS 113 quest/29909.js
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
 * quest: 騎士團長
 * npc id: 1101000
 * npc name: 西格諾斯
 */

var status = -1;

function start(mode, type, selection) {
  if (qm.getJob() > 1000 && qm.getJob() % 10 > 1 && qm.getJob() < 2000) {
    qm.forceStartQuest();
  }

  qm.dispose();
}

function end(mode, type, selection) {
  if (! qm.haveItem(1142069) && qm.canHold(1142069) && qm.getJob() > 1000 && qm.getJob() % 10 > 1 && qm.getJob() < 2000) {
    qm.gainItem(1142069, 1);
    qm.forceCompleteQuest();
  }

  qm.dispose();
}
