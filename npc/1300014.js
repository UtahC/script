/**
 * ==========================================================
 * Resonance
 * NPC Name:     SELF
 * Map(s):       Mushroom Castle: Deep inside Mushroom Forest(106020300)
 * Description:  Upon reaching the magic barrier.
 * =============================================================
 * 1.1 - Fix Bug (freedom)
 * 1.0 - Script Done.(18/7/2010)
 * =============================================================
 */

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (mode == 1) {
      status++;
    } else {
      status--;
    }
  }

  if (status == 0) {
    if (cm.isQuestActive(2314)) {
      cm.sendPlayerToNpc("已調查強烈的結界。似乎被魔法中強烈的結界不容易前進。聽說菇菇國王的魔法大臣知道方法…");
    } else if(cm.isQuestActive(2322)) {
      cm.sendPlayerToNpc("已調查城壁。似乎沒有特別的入侵方法。");
    } else if (cm.isQuestFinished(2318) && cm.haveItem(2430014)) {
      cm.sendPlayerToNpc("I think I may be able to break the barrier using #t2430014#.");
    } else {
      cm.dispose();
    }
  }

  if (status == 1) {
    if (cm.isQuestFinished(2318) && cm.haveItem(2430014)) {
      cm.ShowWZEffect("Effect/OnUserEff.img/normalEffect/mushroomcastle/chatBalloon1");

      cm.gainItem(2430014, -1);
    }

    cm.dispose();
  }
}
