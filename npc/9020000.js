/**
 * Lakelis - Victoria Road: Kerning City (103000000)
 *
 * �ն����� - �W�ź���F
 */

function start() {
  var endSession = function (msg) {
    cm.sendOk(msg);
    cm.dispose();
  };

  // �T�{�O�_�b�����
  if (null === cm.getParty()) {
    return endSession("�A�����b����̭�");
  }

  // �T�{�O�_������
  if (! cm.isLeader()) {
    return endSession("�гz�L�����Ӷi�����");
  }

  // �T�{����H��
  if (cm.getParty().getMembers().size() !== 4) {
    return endSession("����H�ƥ����O�|�H");
  }

  var it = cm.getParty().getMembers().iterator();
  var inMapPlayers = 0;

  do {
    var partyPlayer = it.next();

    partyPlayer.removeAll(4001007);
    partyPlayer.removeAll(4001008);

    // �T�{����
    if (partyPlayer.getLevel() < 21 || partyPlayer.getLevel() > 30) {
      return endSession("��������ť����b 21-30 ����");
    }

    if (partyPlayer.getMapid() === cm.getMapId()) {
      ++inMapPlayers;
    }
  } while (it.hasNext());

  // �T�{�O�_�b�P�@�i�a��
  if (4 !== inMapPlayers) {
    return endSession("�Ҧ����������b���a��");
  }

  var em = cm.getEventManager("KerningPQ");

  if (null === em) {
    return endSession("This PQ is not currently available.");
  }

  var prop = em.getProperty("state");

  if (! (null === prop || prop.equals("0"))) {
    return endSession("�w������b�̭��D��");
  }

  em.startInstance(cm.getParty(), cm.getMap());

  cm.dispose();
}

function action(mode, type, selection) {
}
