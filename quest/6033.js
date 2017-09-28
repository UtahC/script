/*
 * TMS 113 quest/6033.js
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
 * quest: 史丹的第二次傳授
 * npc id: 2110004
 * npc name: 史丹
 */

var status = -1;

function end(mode, type, selection) {
  if (mode === -1) {
    qm.dispose();
  } else {
    if (mode === 1) {
      status++;
    } else {
      status--;
    }

    if (status === 0) {
      var skillId = 1007;

      if (qm.getJob() >= 1100 && qm.getJob() <= 1512) {
        skillId = 10001007;
      } else if (qm.getJob() >= 2100 && qm.getJob() <= 2112) {
        skillId = 20001007;
      }

      qm.teachSkill(skillId, 2);
      qm.gainExp(230000);
      qm.forceCompleteQuest();
      qm.sendOk('好吧。雖然不是很滿意，就讓你通過了吧！！以後一定要注意改進啊！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#s1007# #q1007#（等級2）\r\n#fUI/UIWindow.img/QuestIcon/8/0# 230000 exp');
      qm.dispose();
    } else {
      qm.dispose();
    }
  }
}
