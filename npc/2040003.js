// 機械零件的下落
var status = -1;
var rewards = [2040704, 2040705, 2040707];

function action(mode, type, selection) {
  if (1 === mode) {
    status++;
  } else {
    status--;
  }

  if (0 === status) {
    if (cm.getQuestStatus(3239) === 1 && cm.getPlayer().getMapId() === 922000000) {
      cm.sendSimple('來找我做什麼？#b\r\n#L0#我蒐集完 10 個機械零件了#l\r\n#L1#我想要離開#l');
      status++;
    } else if (cm.getQuestStatus(3239) === 1) {
      cm.sendYesNo('嗨，找我來破任務了阿？');
    } else {
      cm.sendOk('沒事別來妨礙我！');
      cm.dispose();
    }
  } else if (1 === status) {
    var em = cm.getEventManager('Mechanical');

    if (null === em) {
      cm.sendOk('當前副本有問題，請至 GitHub 提交 Issue');
    } else {
      var prop = em.getProperty('started');

      if (prop.equals('0') || null === prop) {
        em.startInstance(cm.getPlayer());
      } else {
        cm.sendOk('裡面已經有人在挑戰了。');
      }
    }

    cm.dispose();
  } else if (2 === status) {
    if (0 !== selection) {
      cm.removeAll(4031092);
      cm.warp(922000009, 'sp');
      cm.dispose();
    } else {
      if (cm.haveItem(4031092, 10)) {
        cm.sendNext('啊哈，不簡單啊，在規定時間內把 10 個#b機械零件#k帶來了，好的！既然你為了我們玩具工廠付出這麼大的心力，我將送給你一個不錯的禮物。');
      } else {
        cm.sendNext('我的 10 個#b#t4031092##k呢?');
        cm.dispose();
      }
    }
  } else if (3 === status) {
    if (! cm.canHold(2040704)) {
      cm.sendOk('請先確認一下消耗欄內是否有一格以上的空間吧！');
      cm.dispose();
    } else {
      var id = Math.floor(Math.random() * rewards.length);

      cm.removeAll(4031092);
      cm.gainExp(2700);
      cm.forceCompleteQuest(3239);
      cm.gainItem(rewards [id], 1);
      cm.sendNext('怎麼樣？#b#t' + rewards[id] + '##k 收好了嗎？希望我的禮物對你會有所幫助。');
    }
  } else if (4 === status) {
    cm.sendNext('多虧了你，我們的玩具工廠已經恢復運轉了，真是幸運啊，現在我們已經特別注意，不會再弄丟零件了，你放心吧。好的，今天也要努力幹活囉！');
  } else if (5 === status) {
    cm.warp(922000009, 'sp');
    cm.dispose();
  }
}
