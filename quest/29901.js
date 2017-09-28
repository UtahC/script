/*
 * TMS 113 quest/29901.js
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
 * quest: 學徒冒險家
 * npc id: 9000040
 * npc name: 達利額
 */

var status = -1;

function start(mode, type, selection) {
  if (qm.getJob() % 100 > 0 && qm.getJob() < 1000) {
    qm.forceStartQuest();
  }

  qm.dispose();
}

function end(mode, type, selection) {
  if (! qm.haveItem(1142108) && qm.canHold(1142108) && qm.getJob() % 100 > 0 && qm.getJob() < 1000) {
    qm.gainItem(1142108, 1);
    qm.forceCompleteQuest();
  }

  qm.dispose();
}
