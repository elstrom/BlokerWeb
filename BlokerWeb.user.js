// ==UserScript==
// @name         BlokerWeb
// @namespace    https://github.com/elstrom/BlokerWeb
// @version      1.4
// @description  Auto-close tab jika URL saat ini termasuk dalam daftar blokir atau mengandung kata tertentu.
// @author       Elstrom
// @include      *github.com*
// @exclude      *api.github*
// @match        *://*/*
// @grant        none
// @supportURL   https://raw.githubusercontent.com/elstrom/BlokerWeb
// @updateURL    https://raw.githubusercontent.com/elstrom/BlokerWeb/main/BlokerWeb.user.js
// @downloadURL  https://raw.githubusercontent.com/elstrom/BlokerWeb/main/BlokerWeb.user.js
// ==/UserScript==

(function () {
    'use strict';

    // Daftar website atau kata yang diblokir

    const blokweb = [

        "enrtx",

        "kelas2.guru",

        "meenetiy.com",

        "rajapg10.site",

        "mordoops",

        "s.shopee.co.id",

        "mp4k.pro",

        "temansenang.pro",

        "zabaidsoacmaimt.com",

        "berlagu.com",

        "metrolagu.com",

        "koimarindal.com",

        "exoguyub.com",

        "kotra.id",

        "cps.cotecna.com",

        "s.viisscos.com",

        "irispublishers.com",

        "dpu.brebeskab.go.id",
        
        "orantesjonnock.",

        "online.sim.pktj.ac.id",

        "meenetiy",

        "fmars.marssociety.org",

        "851849.visualmirage.co",

        "visualmirage",

        "fmars.marssociety.org",

        "bocoran",

        "kikojogja.com",

        "www.24newstech.com",

        "d3h0vqwmcilum.cloudfront.net",

        "d37nij3w7aewur.cloudfront.net",

        "cloudfront",

        "label138p.xyz",

        "tokopedia.com",

        "shopee.co.id",

        "lazada.co.id",

        "blibli.com",

        "bukalapak.com",

        "amazon.com",

        "ebay.com",

        "alibaba.com",

        "aliexpress.com",

        "jd.com",

        "olx.co.id",

        "casino",

        "judi",

        "poker",

        "bet",

        "slot",

        "roulette",

        "togel",

        "sbobet",

        "qq",

        "dingdong",

        "dominoqq",

        "bandarq",

        "aduq",

        "capsa",

        "baccarat",

        "blackjack",

        "jackpot",

        "maxwin",

        "slot88",

        "slotgacor",

        "pragmaticplay",

        "taruhan",

        "agenbola",

        "judibola",

        "judionline"

    ];

    function closeTab() {
        window.close();
    }

    function checkBlockedUrl() {
        const currentUrl = window.location.href.toLowerCase();
        const isBlocked = blokweb.some(keyword => currentUrl.includes(keyword));
        if (isBlocked) {
            closeTab();
        }
    }

    // Cek URL awal
    checkBlockedUrl();

    // Pantau perubahan URL setiap detik
    setInterval(checkBlockedUrl, 1000);

    // Pantau pembukaan tab baru
    const originalWindowOpen = window.open;
    window.open = function (url, name, specs) {
        const newTab = originalWindowOpen(url, name, specs);
        if (newTab) {
            const intervalId = setInterval(() => {
                try {
                    const newTabUrl = newTab.location.href.toLowerCase();
                    const isBlocked = blokweb.some(keyword => newTabUrl.includes(keyword));
                    if (isBlocked) {
                        newTab.close();
                        clearInterval(intervalId);
                    }
                } catch (e) {
                    console.error("Tidak dapat memeriksa tab baru:", e);
                }
            }, 1000);
        }
        return newTab;
    };

    // Cek navigasi atau perubahan hash
    window.addEventListener("popstate", checkBlockedUrl);
    window.addEventListener("hashchange", checkBlockedUrl);

    // Jika muncul prompt keamanan, gunakan interval agresif untuk menutup
    setInterval(() => {
        if (document.title.includes("Situs ini telah dilaporkan sebagai tidak aman")) {
            closeTab();
        }
    }, 500);
})();