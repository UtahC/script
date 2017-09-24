function enter(pi) {
 try {
    var em = pi.getEventManager("OrbisPQ");
	var str = pi.getPortal().getName();
    if (em != null && em.getProperty("stage6_" + (pi.getPortal().getName().substring(2, 5)) + "").equals("1")) {
		if(str.startsWith("rp04")){
			pi.warp(pi.getMapId(),1);
		}else if (str.startsWith("rp08")){
			pi.warp(pi.getMapId(),2);
		}else if(str.startsWith("rp12") ){
			pi.warp(pi.getMapId(),3);
		}else if(str.startsWith("rp16") ){
			pi.warp(pi.getMapId(),4);
		}else{
			pi.warp(pi.getMapId(),pi.getPortal().getId() + 4);
		}
		pi.playerMessage(-1, "Correct combination!");
    } else {
		if(str.startsWith("rp01")){
			pi.warp(pi.getMapId(),0);
		}else if (str.startsWith("rp05")){
			pi.warp(pi.getMapId(),1);
		}else if(str.startsWith("rp09") ){
			pi.warp(pi.getMapId(),2);
		}else if(str.startsWith("rp13") ){
			pi.warp(pi.getMapId(),3);
		}else{
			pi.warp(pi.getMapId(),pi.getPortal().getId() - 4);
		}
		pi.playerMessage(-1, "Incorrect combination.");
    }
 } catch (e) {
    pi.getPlayer().dropMessage(5, "Error: " + e);
 }
 return false;
}
