/**
 * npc id:
 * npc name: ��J��
 *
 * author: freedom
 *
 * ���~�N�X��Ӫ�
 * 1�G�`���v�M���� 1000
 * 2�G�����~���Ű}�C
 */

var status = -1;

var items = {
  // �аȥ��T�{���v�[�`�O�_�� 1000

  lottery: {
    // ���v�A�d���� x
    chance: 400,

    // �ƶq�A�d��O 1 ~ x
    quantity: 1,

    // �s���W�١Anull �����s��
    broad: null,

    // ���~
    collection: [
      4031365 // �����m��
    ]
  },

  consolation: {
    // ���v�A�d���� x
    chance: 600,

    // �ƶq�A�d��O 1 ~ x
    quantity: 20,

    // �s���W�١Anull �����s��
    broad: null,

    // ���~
    collection: [
      2000004, // �S���Ĥ�
      2000005  // �W���Ĥ�
    ]
  }
};

function endSession(msg) {
  cm.sendOk(msg);
  cm.safeDispose();
}

function action(mode, type, selection) {
  if (1 === mode) {
    status++;
  } else {
    if (0 === status) {
      return endSession('�H�ɳ��w��A�Ӹոդ��I');
    }

    status--;
  }

  if (0 === status) {
    if (cm.getPlayerStat('LVL') < 30) {
      return endSession('�A�����Ť���p�� 30 ���C');
    } else if (! cm.haveItem(5220000)) { //�ּ֦��_��
      return endSession('�A�S����J��A�i�H��ӫ��ʶR��J��@�C');
    } else if (! cm.canHold()) {
      return endSession('�нT�{�I�]�Ҧ����O�_�����@��H�W���Ŷ��C');
    }

    var flag = 0;

    var totalChance = Object.keys(items).reduce(function (acc, val) {
      if (0 === items[val].collection.length) {
        flag = 1;
      }

      return acc + items[val].chance;
    }, 0);

    if (1000 !== totalChance) {
      return endSession('���G�o�ͤF�I���D�A�Ц^���޲z�����~�N�X�u1�v�C');
    } else if (1 === flag) {
      return endSession('���G�o�ͤF�I���D�A�Ц^���޲z�����~�N�X�u2�v�C');
    }

    cm.sendYesNo('�A����#b��J��#k�A�n�ոդ��ܡH');
  } else if (1 === status) {
    var prop;
    var chance = Math.floor(Math.random() * 1000);
    var bounds = {
      lower: 0,
      upper: 1000
    };

    for (prop in items) {
      if (! items.hasOwnProperty(prop)) {
        continue;
      }

      bounds.upper = bounds.lower + items[prop].chance;

      if (chance >= bounds.lower && chance < bounds.upper) {
        break;
      }

      bounds.lower = bounds.upper;
    }

    var itemId = items[prop].collection[Math.floor(Math.random() * items[prop].collection.length)];

    var item = cm.gainGachaponItem(
      itemId,
      Math.floor(Math.random() * Math.max(items[prop].quantity, 1)) + 1,
      items[prop].broad || '��J��',
      null !== items[prop].broad
    );

    if (-1 === item) {
      cm.sendOk('���G�o�ͤF�I���D�A�еy�ԦA���աA�ñN�u' + itemId + '�v���N���^�����޲z���C');
    } else {
      cm.gainItem(5220000, -1);
      cm.sendOk("�A�o��F#b#t" + item + "##k�C");
    }

    cm.safeDispose();
  }
}
