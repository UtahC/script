function enter(pi) {
  if (pi.getPlayer().getLevel() < 15 || pi.isQuestFinished(29004)) {
    return false;
  }

  if (!pi.isQuestActive(29004)) {
    pi.forceStartQuest(29004);
    pi.forceStartQuest(27017, 'enter=00000');
    pi.setQuestInfo(27018, '0');
    pi.forceStartQuest(27018);
  }

  //nautilus, kerning, ellinia, perion, orbis in that order
  var index = [120000000, 103000000, 101010103, 102000000, 200080100].indexOf(pi.getMapId());

  if (index !== -1) {
    var data = pi.getInfoQuest(27017);

    if (data.charAt(index + 6) === '0') {
      var number = parseInt(pi.getQuestRecord(27018).getInfo()) + 1;

      data = data.substring(0, index + 6) + '1' + data.substring(index + 7);

      pi.updateInfoQuest(27017, data);
      pi.setQuestInfo(27018, number);
      pi.getPlayer().dropMessage(-1, '已完成 ' + number + "/5");
      pi.getPlayer().dropMessage(-1, "稱號成就 - 登峰者");
      pi.showQuestMsg("當前稱號 - 登峰者 " + number + "/5 完成");
    }
  }
}
