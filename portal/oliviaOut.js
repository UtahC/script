function enter(pi) {
  if (pi.getPlayer().getEventInstance() != null ) {
    var s = parseInt(pi.getPlayer().getEventInstance().getProperty("mode"));
    pi.gainExp((s == 0 ? 1500 : (s == 1 ? 5500 : 16000)));
    // pi.gainMaplePoint((s == 0 ? 15 : (s == 1 ? 30 : 60)));
  }
  pi.warp(682000000,0);
}
