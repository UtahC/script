function enter(pi) {
    if (pi.getPlayerStat("GENDER") == 0) {
	pi.warp(670010200, "male01");
    } else {
	pi.warp(670010200, "female01");
    }
}
