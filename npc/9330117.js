/**
 * npc id: 9330117
 * npc name: 經驗值轉蛋機
 *
 * author: freedom
 *
 * 錯誤代碼對照表
 * 1：總機率和不為 1000
 * 2：有物品為空陣列
 */

var status = -1;

var items = {
  // 請務必確認機率加總是否為 1000

  exp_100k: {
    // 機率，千分之 x
    chance: 20,

    // 數量，範圍是 1 ~ x
    quantity: 1,

    // 廣播名稱，null 為不廣播
    broad: '經驗值轉蛋機',

    // 物品
    collection: [
      2370000 // 兵法書(孫子)
    ]
  },

  exp_50k: {
    // 機率，千分之 x
    chance: 40,

    // 數量，範圍是 1 ~ x
    quantity: 1,

    // 廣播名稱，null 為不廣播
    broad: null,

    // 物品
    collection: [
      2370001 // 兵法書(吳子)
    ]
  },

  exp_30k: {
    // 機率，千分之 x
    chance: 60,

    // 數量，範圍是 1 ~ x
    quantity: 1,

    // 廣播名稱，null 為不廣播
    broad: null,

    // 物品
    collection: [
      2370002 // 兵法書(尉繚子)
    ]
  },

  exp_20k: {
    // 機率，千分之 x
    chance: 80,

    // 數量，範圍是 1 ~ x
    quantity: 1,

    // 廣播名稱，null 為不廣播
    broad: null,

    // 物品
    collection: [
      2370003 // 兵法書(六韜)
    ]
  },

  exp_10k: {
    // 機率，千分之 x
    chance: 100,

    // 數量，範圍是 1 ~ x
    quantity: 1,

    // 廣播名稱，null 為不廣播
    broad: null,

    // 物品
    collection: [
      2370004 // 兵法書(三略)
    ]
  },

  exp: {
    // 機率，千分之 x
    chance: 700,

    // 數量，範圍是 1 ~ x
    quantity: 1,

    // 廣播名稱，null 為不廣播
    broad: null,

    // 物品
    collection: [
      2370005, // 兵法書(司馬法）
      2370006, // 兵法書(李衛公問對)
      2370007, // 兵法書(孫兵兵法)
      2370008, // 兵法書(兵法三十六計)
      2370009, // 兵法書(兵法二十四章)
      2370010, // 兵法書(戰國策)
      2370011, // 兵法書(百戰奇略)
      2370012  // 兵法書(心書)
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
      return endSession('隨時都歡迎你來試試手氣！');
    }

    status--;
  }

  if (0 === status) {
    if (cm.getPlayerStat('LVL') < 30) {
      return endSession('你的等級不能小於 30 等。');
    } else if (! cm.haveItem(5220000)) { //快樂百寶券
      return endSession('你沒有轉蛋券，可以到商城購買轉蛋券哦。');
    } else if (! cm.canHold()) {
      return endSession('請確認背包所有欄位是否都有一格以上的空間。');
    }

    var flag = 0;

    var totalChance = Object.keys(items).reduce(function (acc, val) {
      if (0 === items[val].collection.length) {
        flag = 1;
      }

      return acc + items[val].chance;
    }, 0);

    if (1000 !== totalChance) {
      return endSession('似乎發生了點問題，請回報管理員錯誤代碼「1」。');
    } else if (1 === flag) {
      return endSession('似乎發生了點問題，請回報管理員錯誤代碼「2」。');
    }

    cm.sendYesNo('你持有#b轉蛋券#k，要試試手氣嗎？');
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
      items[prop].broad || '轉蛋機',
      null !== items[prop].broad
    );

    if (-1 === item) {
      cm.sendOk('似乎發生了點問題，請稍候再嘗試，並將「' + itemId + '」此代號回報給管理員。');
    } else {
      cm.gainItem(5220000, -1);
      cm.sendOk("你得到了#b#t" + item + "##k。");
    }

    cm.safeDispose();
  }
}
