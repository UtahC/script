function enter(pi) {
  if (!pi.canHold(4001261,1)) {
    pi.playerMessage(5, "Please make 1 ETC room.");
    return false;
  }

  pi.gainExp(pi.getPlayer().getMapId() == 105100301 ? 260000 : 520000);
  // pi.gainMaplePoint(pi.getPlayer().getMapId() == 105100301 ? 20 : 30);
  pi.gainItem(4001261,1);
  pi.warp(105100100,0);
  pi.playPortalSE();
}
