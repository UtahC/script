/*
 * TMS 113 npc/9330110.js
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
 * npc id: 9330110
 * npc name: 魚餌商人
 */

var status = -1;
var sel;

function action(mode, type, selection) {
  if (mode === 1) {
    status++;
  } else {
    if (status === 0) {
      cm.safeDispose();
      return;
    }

    status--;
  }

  if (status === 0) {
    cm.sendSimple("What do you want to do?\r\n #L4#Guide on fishing#l");
  } else if (status === 1) {
    sel = selection;

    if (sel === 4) {
      cm.sendOk("You need to be above level 10, with a fishing rod and fishing baits in order to enter the Fishing Lagoon. You will reel in a catch every 1 minute.");
      cm.safeDispose();
    }
  }
}
