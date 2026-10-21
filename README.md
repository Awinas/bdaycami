# A Birthday for Ishami

A cute, responsive, multi-page birthday website celebrating tulips 🌷, cats 🐈 and books 📚.

## Birthday lock
Every page is locked behind a countdown until **23 October 2026, 00:00 (Malaysia time, UTC+8)**.
To change the date, edit `BDAY_ISO` at the top of `lock.js`.

## Testing the countdown (local only)
Run the site on your own computer (open the files directly, or use `python3 -m http.server`
and visit `http://localhost:8000`). Then add `?test=` to any page URL:

| URL                          | What it does                                         |
| ---------------------------- | ---------------------------------------------------- |
| `index.html?test=15`         | Pretend the birthday arrives in 15 seconds           |
| `index.html?test=60`         | Pretend it arrives in 1 minute                       |
| `index.html?test=0`          | Pretend it is already the birthday (site unlocked)   |
| `index.html?test=reset`      | Go back to the real date                             |

A dark "TEST MODE" badge shows while testing; click it to reset.
Test mode is ignored on the live website, so visitors can't use it to skip the lock.

## Icons
`favicon.svg`, `favicon.ico` and `apple-touch-icon.png` (a pink tulip).
