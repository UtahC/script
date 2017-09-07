var itemId = [4031036, 4031037, 4031038, 4031711];
var mapId = [103000900, 103000903, 103000906, 600010004];
var menu;
var section;
var status;
var sw;

function start() {
  status = 0;
  sw = cm.getEventManager("Subway");
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == 0 && status ==1) {
    cm.dispose();
  } else if (mode == 0) {
    cm.sendNext("You must have some business to take care of here, right?");
    cm.dispose();
  } else {
    if (mode == 1) {
      status++;
    }

    if (status == 1) {
      menu = "Here's the ticket reader. You will be brought in immediately. Which ticket would like to use?\r\n";

      for (var i = 0; i < itemId.length; i++) {
        if (cm.haveItem(itemId[i])) {
          menu += "#L"+i+"##b#m"+mapId[i]+"##k#l\r\n";
        }
      }

      menu += "#L" + (itemId.length) + "##b#m103000101##k#l\r\n";

      cm.sendSimple(menu);
    }

    if (status == 2) {
      section = selection;

      if(section < (itemId.length - 1)) {
        cm.gainItem(itemId[selection], -1);
        cm.warp(mapId[selection], 'sp');
        cm.dispose();
      } else if (section == (itemId.length - 1)) {
        if (sw == null) {
          cm.sendNext("Event error, please restart your server for solution");
          cm.dispose();
        } else if (sw.getProperty("entry").equals("true")) {
          cm.sendYesNo("It looks like there's plenty of room for this ride. Please have your ticket ready so I can let you in, The ride will be long, but you'll get to your destination just fine. What do you think? Do you want to get on this ride?");
        } else if (sw.getProperty("entry").equals("false") && sw.getProperty("docked").equals("true")) {
          cm.sendNext("The subway is getting ready for takeoff. I'm sorry, but you'll have to get on the next ride. The ride schedule is available through the usher at the ticketing booth.");
          cm.dispose();
        } else {
          cm.sendNext("We will begin boarding 1 minutes before the takeoff. Please be patient and wait for a few minutes. Be aware that the subway will take off right on time, and we stop receiving tickets 1 minute before that, so please make sure to be here on time.");
          cm.dispose();
        }
      } else {
        if (section == itemId.length) { //subway line 1
          cm.warp(103000101, 0);
        }

        cm.dispose();
      }
    }

    if (status == 3) {
      cm.gainItem(itemId[section], -1);
      cm.warp(mapId[section], 'sp');
      cm.dispose();
    }
  }
}
