// ==UserScript==
// @name         BlokerWeb
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Auto-close tab jika URL saat ini termasuk dalam daftar blokir atau mengandung kata tertentu.
// @author       Elstrom
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/elstrom/BlokerWeb/blob/main/BlokerWeb.user.js
// @downloadURL  https://raw.githubusercontent.com/elstrom/BlokerWeb/blob/main/BlokerWeb.user.js
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

    // Fungsi untuk memeriksa URL saat ini
    function checkBlockedUrl() {
        const currentUrl = window.location.href.toLowerCase();
        const isBlocked = blokweb.some(keyword => currentUrl.includes(keyword));
        if (isBlocked) {
            window.close();
        }
    }

    // Jalankan pengecekan saat skrip pertama kali dijalankan
    checkBlockedUrl();

    // Interval untuk memantau perubahan URL pada tab saat ini
    setInterval(checkBlockedUrl, 2000);

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
                    // Jika akses URL tab gagal karena alasan keamanan
                    console.error("Tidak dapat memeriksa tab baru:", e);
                }
            }, 2000);
        }
        return newTab;
    };

    // Pantau perubahan URL jika tab lama mengarahkan ke halaman dari daftar blokir
    window.addEventListener("popstate", checkBlockedUrl);
    window.addEventListener("hashchange", checkBlockedUrl);
})();