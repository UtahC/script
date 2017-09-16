/*
 * NPC Name: Spinel
 * Description: World Tour Guide
 */

/**
 * �s����  600000000  10w
 * 101�j�D 742000000  10w
 * �s�[�Y(�����ӰȰ�) 540000000  10w
 * �s�[�Y(���X�Y��) 541000000  10w
 * �饻���� 800000000  10w
 * �������� 110000000  10w
 * �箦��   140000000  10w
 * �ǧƨF�z 260000000  10w
 * ����(���W����) 500000000  20w
 * �ѪŤ��� 200000000  20w
 * �B�쳷�� 211000000  30w
 * ���@��   230000000  30w
 * �ɶ����� 270000000  30w
 * ���㫰   220000000  35w
 * ���ܧ�   222000000  35w
 * �Z����� 250000000  35w
 * �����   240000000  35w
 * �a�y�����`�� 221000000 40w
 */

var status = 0;

var maps = [
  600000000, 742000000, 540000000,
  541000000, 800000000, 110000000,
  140000000, 260000000, 500000000,
  200000000, 211000000, 230000000,
  270000000, 220000000, 222000000,
  250000000, 240000000, 221000000
];

var mapsname = [
  '#b�s����#k', '#b101�j�D#k', '#b�s�[�Y(�����ӰȰ�)#k',
  '#b�s�[�Y(���X�Y��)#k', '#b�饻����#k', '#b��������#k',
  '#b�箦��#k', '#b�ǧƨF�z#k', '#b����(���W����)#k',
  '#b�ѪŤ���#k', '#b�B�쳷��#k', '#b���@��#k',
  '#b�ɶ�����#k', '#b���㫰#k', '#b���ܧ�#k',
  '#b�Z�����#k', '#b�����#k', '#b�a�y�����`��#k'
];

var costs = [
  '100,000', '100,000', '100,000',
  '100,000', '100,000', '100,000',
  '100,000', '200,000', '200,000',
  '300,000', '300,000', '300,000',
  '350,000', '350,000', '350,000',
  '350,000', '400,000', '400,000'
];

var selectedMap = -1;

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (-1 == mode) {
    cm.dispose();
  } else {
    if ((status >= 3 && 0 == mode) || mode != 1) {
      cm.sendOk('�p�G�A�M�w�n�n�h���̡A�ڷ|�ַܼN�ǰe�A���C');
      cm.dispose();

      return;
    }

    status++;

    if (status == 0) {
      cm.sendYesNo('�֤F�Q�h�����߶ܡH�ڥi�H���A�ǰe��ܦh�a��C');
    } else if (status == 1) {
      var selStr = '��ܧA���ت��a�G#b';

      for (var i = 0; i < maps.length; i++) {
        selStr += "\r\n#L" + i + '#' + mapsname[i];
      }

      cm.sendSimple(selStr);
    } else if (status == 2) {
      cm.sendYesNo('�� #b' + mapsname[selection] + ' �ݭn #b' + costs[selection] + ' ����#k�A�A�T�w�n�e���ܡH');

      selectedMap = selection;
    } else if (status == 3) {
      var costMeso = parseInt(costs[selectedMap].replace(',', ''));

      if (cm.getMeso() < costMeso) {
        cm.sendOk('���n�N��A�A������������C');
      } else {
        cm.gainMeso(-costMeso);

        cm.warp(maps[selectedMap], 0);
      }

      cm.dispose();
    }
  }
}
