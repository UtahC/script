// ����s�󪺤U��
var status = -1;
var id = 0;
var ���ȹD�� = Array(2040704, 2040705, 2040707);

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var map = cm.getPlayer().getMapId();
        var mapid = 922000000;
        if (cm.getQuestStatus(3239) == 1 && map == mapid) {
            var selStr = "�ӧ�ڰ�����?#b";
            selStr += "\r\n#L0#�ڻ`����10�Ӿ���s��F#l\r\n#L1#�ڷQ�n���}.#l";
            cm.sendSimple(selStr);
            status++;
        } else if (cm.getQuestStatus(3239) == 1) {
            cm.sendNext("�١A��ڨӯ}���ȤF��??");
        } else {
            cm.sendNext("�S�ƧO�ӧ�ê�ڡC");
            cm.dispose();
        }
    } else if (status == 1) {
        if (cm.getQuestStatus(3239) == 1) {
            var em = cm.getEventManager("Mechanical");
            if (em == null) {
                cm.sendOk("��e�ƥ������D�A���p���޲z��....");
            } else {
                var prop = em.getProperty("started");

                if (prop.equals("0") || prop == null) {
                    em.startInstance(cm.getPlayer());
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk("�̭��w�g���H�b�D��...");
                }
            }
            cm.dispose();
        }
    } else if (status == 2) {
      if(selection == 0){
        if (cm.haveItem(4031092, 10)) {
            cm.sendNext("�ګ�~��²���,�b�W�w�ɶ�����10��#b����s��#k�a�ӤF�A�n���I�J�M�A���F�ڭ̪���u�t�I�X�o��j���ߤO�A�ڱN�e���A�@�Ӥ�����§��.");
        } else {
            cm.sendNext("�ڪ�#b#t4031092##kx10�өO?");
            cm.dispose();
        }
      }else if(selection == 1){
         cm.removeAll(4031092);
         cm.warp(220020000);
      }

    } else if (status == 3) {
        if(cm.canHold(2040704)){
          if (cm.getQuestStatus(3239) == 1) {
              id = Math.floor(Math.random() * ���ȹD��.length);
              cm.gainItem(���ȹD�� [id], 1);
              cm.removeAll(4031092);
              cm.gainExp(2700);
              cm.forceCompleteQuest(3239);
              cm.sendNext("���ˡH#b#t" + ���ȹD�� [id] + "##k���n�F�ܡH�Ʊ�ڪ�§����A�|�������U�C");
          }
        }else{
          cm.sendOk("�Х��T�{�@�U�����椺�O�_���@�ӥH�W���Ŷ��a�I");
          cm.dispose();
        }      	
    } else if (status == 4) {
        cm.sendNext("�h���F�A�A�ڭ̪�����u�t�w�g��_�B��F�A�u�O���B�ڡA�{�b�ڭ̤w�g�S�O�`�N�A���|�A�˥�s��F�A�A��ߧa�C�n���A���Ѥ]�n�V�O�F���o�I");
    } else if (status == 5) {
				cm.warp(220020000);
        //cm.warp(922000009); ���K�a�϶��I����
        cm.dispose();
    }
}
