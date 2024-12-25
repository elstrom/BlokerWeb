// ==UserScript==
// @name         BlokerWeb
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Auto-close tab jika URL saat ini termasuk dalam daftar blokir atau mengandung kata tertentu.
// @author       Elstrom
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/yourusername/BlokerWeb/main/BlokerWeb.user.js
// @downloadURL  https://raw.githubusercontent.com/yourusername/BlokerWeb/main/BlokerWeb.user.js
// ==/UserScript==

(function () {
    'use strict';

    const blacklist = [
        "enrtx.com", "kelas2.guru", "meenetiy.com", "rajapg10.site",
        "mordoops.com", "s.shopee.co.id", "d37nij3w7aewur.cloudfront.net",
        "tokopedia.com", "shopee.co.id", "lazada.co.id", "blibli.com",
        "bukalapak.com", "amazon.com", "ebay.com", "alibaba.com",
        "aliexpress.com", "jd.com", "olx.co.id", "casino", "judi",
        "poker", "bet", "slot", "roulette"
    ];

    const closeTab = () => {
        const url = window.location.href.toLowerCase();
        if (blacklist.some(keyword => url.includes(keyword))) {
            window.close();
        }
    };

    setInterval(closeTab, 2000);
})();
