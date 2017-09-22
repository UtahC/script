/**
 * Lakelis - Victoria Road: Kerning City (103000000)
 *
 * 組隊任務 - 超級綠水靈
 */

function start() {
  var endSession = function (msg) {
    cm.sendOk(msg);
    cm.dispose();
  };

  // 確認是否在隊伍裡
  if (null === cm.getParty()) {
    return endSession("你必須在隊伍裡面");
  }

  // 確認是否為隊長
  if (! cm.isLeader()) {
    return endSession("請透過隊長來進行任務");
  }

  // 確認隊伍人數
  if (cm.getParty().getMembers().size() !== 4) {
    return endSession("隊伍人數必須是四人");
  }

  var it = cm.getParty().getMembers().iterator();
  var inMapPlayers = 0;

  do {
    var partyPlayer = it.next();

    partyPlayer.removeAll(4001007);
    partyPlayer.removeAll(4001008);

    // 確認等級
    if (partyPlayer.getLevel() < 21 || partyPlayer.getLevel() > 30) {
      return endSession("隊伍成員等級必須在 21-30 之間");
    }

    if (partyPlayer.getMapid() === cm.getMapId()) {
      ++inMapPlayers;
    }
  } while (it.hasNext());

  // 確認是否在同一張地圖
  if (4 !== inMapPlayers) {
    return endSession("所有隊員都須在此地圖");
  }

  var em = cm.getEventManager("KerningPQ");

  if (null === em) {
    return endSession("This PQ is not currently available.");
  }

  var prop = em.getProperty("state");

  if (! (null === prop || prop.equals("0"))) {
    return endSession("已有隊伍在裡面挑戰");
  }

  em.startInstance(cm.getParty(), cm.getMap());

  cm.dispose();
}

function action(mode, type, selection) {
}
