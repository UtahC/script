importPackage(Packages.tools);

var task;
var counter = 0;

function init() {
  scheduleNew();
}

function scheduleNew() {
  var cal = java.util.Calendar.getInstance();

  cal.set(java.util.Calendar.HOUR, 1);
  cal.set(java.util.Calendar.MINUTE, 0);
  cal.set(java.util.Calendar.SECOND, 0);

  var nextTime = cal.getTimeInMillis();

  while (nextTime <= java.lang.System.currentTimeMillis()) {
    nextTime += 300 * 1000;
  }

  task = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
  task.cancel(true);
}

function start() {
  scheduleNew();

  var messages = [
    "�p�G������d��B�L�k�ʼu�A�Шϥ� @ea",
    "�D�]�B�ն����Ȭү���o�ӫ��I��"
  ];

  em.getChannelServer().broadcastPacket(MaplePacketCreator.yellowChat("[���������U]" + messages[counter % messages.length]));

  counter++;
}
