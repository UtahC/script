/*
  This file is part of the OdinMS Maple Story Server
  Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
  Matthias Butz <matze@odinms.de>
  Jan Christian Meyer <vimes@odinms.de>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation version 3 as published by
  the Free Software Foundation. You may not use, modify or distribute
  this program under any other version of the GNU Affero General Public
  License.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * -- Odin JavaScript -------------------------------------------------------
 * Ludibrium Elevator
 * -- By --------------------------------------------------------------------
 * Information
 * -- Version Info ----------------------------------------------------------
 * 1.3 - Fix door open and close [freedom]
 * 1.2 - Some fixes ^__^ [Sadiq]
 * 1.1 - Remove unused statement [Information]
 * 1.0 - First Version by Information
 * --------------------------------------------------------------------------
 **/

importPackage(Packages.scripting.reactor);

var task;

var elevatorWaitingMap;
var elevatorShippingMap;

var arrive;
var returnMap;

function init() {
  em.setProperty("isUp", "false");
  em.setProperty("isDown", "false");

  em.getChannelServer().getMapFactory().getMap(222020200).setReactorState();

  elevatorShippingMap = em.getChannelServer().getMapFactory().getMap(222020211);

  elevatorArrivedKorean();
}

// 電梯抵達童話村
function elevatorArrivedKorean() {
  em.getChannelServer().getMapFactory().getMap(222020100).resetReactors();

  arrive = em.getChannelServer().getMapFactory().getMap(222020100);
  returnMap = em.getChannelServer().getMapFactory().getMap(222020100);

  warpToDestination();

  elevatorWaitingMap = em.getChannelServer().getMapFactory().getMap(222020110);
  elevatorShippingMap = em.getChannelServer().getMapFactory().getMap(222020111);

  em.setProperty("isDown", "true");

  task = em.schedule("goingUp", 60000);
}

// 電梯前往玩具城中
function goingUp() {
  warpToShippingMap();

  em.setProperty("isDown", "false");

  task = em.schedule("elevatorArrivedLudibrium", 50000);

  em.getChannelServer().getMapFactory().getMap(222020100).setReactorState();
}

// 電梯抵達玩具城
function elevatorArrivedLudibrium() {
  em.getChannelServer().getMapFactory().getMap(222020200).resetReactors();

  arrive = em.getChannelServer().getMapFactory().getMap(222020200);
  returnMap = em.getChannelServer().getMapFactory().getMap(222020200);

  warpToDestination();

  elevatorWaitingMap = em.getChannelServer().getMapFactory().getMap(222020210);
  elevatorShippingMap = em.getChannelServer().getMapFactory().getMap(222020211);

  em.setProperty("isUp", "true");

  task = em.schedule("goingDown", 60000);
}

// 電梯前往童話村中
function goingDown() {
  warpToShippingMap();

  em.setProperty("isUp", "false");

  task = em.schedule("elevatorArrivedKorean", 50000);

  em.getChannelServer().getMapFactory().getMap(222020200).setReactorState();
}

function warpToDestination() {
  var characters = elevatorShippingMap.getCharacters().iterator();

  while(characters.hasNext()) {
    characters.next().changeMap(arrive, arrive.getPortal(0));
  }
}

function warpToShippingMap() {
  var characters = elevatorWaitingMap.getCharacters().iterator();

  while(characters.hasNext()) {
    characters.next().changeMap(elevatorShippingMap, elevatorShippingMap.getPortal(0));
  }
}

function cancelSchedule() {
  task.cancel();
}
