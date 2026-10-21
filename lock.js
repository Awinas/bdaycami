/* Birthday lock — keeps every page sealed until the birthday arrives.
   Change BDAY_ISO to move the date. Time is Malaysia (UTC+8). */
(function () {
  var BDAY_ISO = '2026-10-23T00:00:00+08:00';
  var TARGET = new Date(BDAY_ISO).getTime();
  window.BDAY_TARGET = TARGET;
  if (Date.now() >= TARGET) return;                 // birthday has arrived → site is open

  var root = document.documentElement;
  root.classList.add('locked');
  var st = document.createElement('style');
  st.textContent = 'html.locked body>*:not(.lock-screen){display:none!important}';
  document.head.appendChild(st);

  function pad(n) { return String(n).padStart(2, '0'); }

  function build() {
    document.title = 'Not yet… 🎁 | For Ishami ♡';
    document.body.innerHTML =
      '<div class="lock-screen" role="main">' +
        '<span class="lk lk1">🌷</span><span class="lk lk2">🐈</span><span class="lk lk3">📚</span>' +
        '<span class="lk lk4">✦</span><span class="lk lk5">🌷</span><span class="lk lk6">♡</span>' +
        '<div class="lock-card">' +
          '<button class="gift" id="gift" aria-label="A locked birthday gift">🎁</button>' +
          '<div class="eyebrow">sealed with love · opens on her birthday</div>' +
          '<h1 class="lock-title">Not quite yet…</h1>' +
          '<p class="lead">Something soft and lovely is waiting for you, Ishami.</p>' +
          '<div class="countdown lock-count" aria-live="off">' +
            '<div class="time-box"><strong id="lkD">--</strong><span>Days</span></div>' +
            '<div class="time-box"><strong id="lkH">--</strong><span>Hours</span></div>' +
            '<div class="time-box"><strong id="lkM">--</strong><span>Minutes</span></div>' +
            '<div class="time-box"><strong id="lkS">--</strong><span>Seconds</span></div>' +
          '</div>' +
          '<div class="lock-bar"><span id="lkBar"></span></div>' +
          '<p class="tiny" id="lkMsg">Opens on <b>23 October 2026</b>, at midnight 🌙</p>' +
        '</div>' +
      '</div>';

    var start = Date.now(), done = false;
    var msgs = ['Patience, birthday girl 🌷', 'The cats are guarding it. 🐈', 'Just a little longer… 📚', 'No peeking! 🎀', 'Good things are worth the wait ✨'];
    var mi = 0;
    var gift = document.getElementById('gift');
    gift.addEventListener('click', function () {
      gift.classList.remove('shake'); void gift.offsetWidth; gift.classList.add('shake');
      document.getElementById('lkMsg').textContent = msgs[mi++ % msgs.length];
    });

    function tick() {
      var d = TARGET - Date.now();
      if (d <= 0) {
        if (done) return; done = true;
        document.getElementById('lkMsg').textContent = 'Happy birthday, Ishami! Opening your surprise… 🎂';
        ['lkD','lkH','lkM','lkS'].forEach(function (id) { document.getElementById(id).textContent = '00'; });
        setTimeout(function () { location.reload(); }, 1600);
        return;
      }
      var days = Math.floor(d / 864e5); d %= 864e5;
      var h = Math.floor(d / 36e5); d %= 36e5;
      var m = Math.floor(d / 6e4), s = Math.floor(d % 6e4 / 1000);
      document.getElementById('lkD').textContent = days;
      document.getElementById('lkH').textContent = pad(h);
      document.getElementById('lkM').textContent = pad(m);
      document.getElementById('lkS').textContent = pad(s);
      var pct = Math.min(100, Math.max(3, (Date.now() - start) / (TARGET - start) * 100));
      document.getElementById('lkBar').style.width = pct + '%';
    }
    tick(); setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
