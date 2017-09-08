// ����s�󪺤U��
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
      cm.sendSimple('�ӧ�ڰ�����H#b\r\n#L0#�ڻ`���� 10 �Ӿ���s��F#l\r\n#L1#�ڷQ�n���}#l');
      status++;
    } else if (cm.getQuestStatus(3239) === 1) {
      cm.sendYesNo('�١A��ڨӯ}���ȤF���H');
    } else {
      cm.sendOk('�S�ƧO�ӧ�ê�ڡI');
      cm.dispose();
    }
  } else if (1 === status) {
    var em = cm.getEventManager('Mechanical');

    if (null === em) {
      cm.sendOk('��e�ƥ������D�A�Ц� GitHub ���� Issue');
    } else {
      var prop = em.getProperty('started');

      if (prop.equals('0') || null === prop) {
        em.startInstance(cm.getPlayer());
      } else {
        cm.sendOk('�̭��w�g���H�b�D�ԤF�C');
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
        cm.sendNext('�ګ��A��²��ڡA�b�W�w�ɶ����� 10 ��#b����s��#k�a�ӤF�A�n���I�J�M�A���F�ڭ̪���u�t�I�X�o��j���ߤO�A�ڱN�e���A�@�Ӥ�����§���C');
      } else {
        cm.sendNext('�ڪ� 10 ��#b#t4031092##k�O?');
        cm.dispose();
      }
    }
  } else if (3 === status) {
    if (! cm.canHold(2040704)) {
      cm.sendOk('�Х��T�{�@�U�����椺�O�_���@��H�W���Ŷ��a�I');
      cm.dispose();
    } else {
      var id = Math.floor(Math.random() * rewards.length);

      cm.removeAll(4031092);
      cm.gainExp(2700);
      cm.forceCompleteQuest(3239);
      cm.gainItem(rewards [id], 1);
      cm.sendNext('���ˡH#b#t' + rewards[id] + '##k ���n�F�ܡH�Ʊ�ڪ�§����A�|�������U�C');
    }
  } else if (4 === status) {
    cm.sendNext('�h���F�A�A�ڭ̪�����u�t�w�g��_�B��F�A�u�O���B�ڡA�{�b�ڭ̤w�g�S�O�`�N�A���|�A�˥�s��F�A�A��ߧa�C�n���A���Ѥ]�n�V�O�F���o�I');
  } else if (5 === status) {
    cm.warp(922000009, 'sp');
    cm.dispose();
  }
}
