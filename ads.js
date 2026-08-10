/* EigoNote - 広告枠の管理
 *
 * 使い方：AdSenseの審査に通ったら、管理画面で広告ユニットを2つ作り、
 * 発行された data-ad-slot の数字を下の SLOTS に貼るだけ。
 * 空のままなら広告枠は表示されません（空白も残りません）。
 */
(function () {
  var CLIENT = "ca-pub-7228040067218129";

  var SLOTS = {
    mid: "",     // 記事の中ほど（ディスプレイ広告・レスポンシブ）
    bottom: ""   // 記事の終わり（ディスプレイ広告・レスポンシブ）
  };

  var LABEL = "スポンサーリンク";

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    var boxes = document.querySelectorAll(".ad-slot");
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      var pos = box.getAttribute("data-ad-pos");
      var slot = SLOTS[pos];

      // 未設定なら、枠ごと消す（空白を残さない）
      if (!slot) { if (box.parentNode) box.parentNode.removeChild(box); continue; }

      // 読み込み前に高さを確保して、本文がガクッとずれるのを防ぐ
      box.className = "ad-slot on";

      var cap = document.createElement("div");
      cap.className = "ad-label";
      cap.textContent = LABEL;
      box.appendChild(cap);

      var ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", CLIENT);
      ins.setAttribute("data-ad-slot", slot);
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");
      box.appendChild(ins);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // 広告がブロックされている場合など。表示に影響しないよう黙って続ける
      }
    }
  });
})();
