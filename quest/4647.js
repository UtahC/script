// quest: 證明身為訓練師的能力

var status = -1;

function isKOC(job) {
  return job >= 1000 && job < 2000;
}

function isEvan(job) {
  return job === 2001 || (job >= 2200 && job <= 2218);
}

function isAran(job) {
  return job >= 2000 && job <= 2112 && job !== 2001;
}

function isResist(job) {
  return job >= 3000 && job <= 3512;
}

function end(mode, type, selection) {
  if (! qm.haveItem(5460000)) {
    qm.sendOk("這東西在一般商人那裡是買不到，但只要到販售各種多樣商品的購物商場，應該就可以賣到寵物點心，你就仔細找找看吧！");
  } else {
    var job = qm.getJob();
    var skillId = 8;

    if (isKOC(job)) {
      skillId = 10000018;
    } else if (isAran(job)) {
      skillId = 20000024;
    } else if (isEvan(job)) {
      skillId = 20010024;
    } else if (isResist(job)) {
      skillId = 30000024;
    }

    // 學習寵物達人技能
    qm.teachSkill(skillId, 1);

    // 移除寵物點心
    qm.gainItem(5460000, -1);

    // 完成任務
    qm.forceCompleteQuest(4647);

    qm.sendOk("我已將帶領多隻寵物的技能傳授給你了。");
  }

  qm.dispose();
}
