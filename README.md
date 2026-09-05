# Kaumadee &amp; Gayan — Wedding Invitation

A single-page digital wedding invitation. Plain HTML, CSS and JavaScript — no
build step, no dependencies, no framework.

The page opens on a folded wedding card sealed with a monogram medallion.
Tapping the seal swings the two leaves open and reveals the invitation beneath.

## Run it locally

Any static file server will do:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

Opening `index.html` straight from the file system mostly works, but a server is
recommended so fonts and assets resolve exactly as they will in production.

## Changing the details

**Everything lives in [`js/config.js`](js/config.js).** Names, date, venue,
RSVP numbers and every line of copy are read from that one file — you should
never need to touch the markup.

A few things worth knowing:

| Field | Notes |
| --- | --- |
| `event.datetime` | Full ISO string with a timezone offset, e.g. `2027-02-14T09:30:00+05:30`. This single value drives the hero date block **and** the countdown. The weekday, month and year are derived from it, so they can never drift out of sync. |
| `event.timeLabel` | Shown as-is next to the date. Set it to match `datetime`. |
| `event.mapsUrl` | Target of the "Get Directions" button and the "View larger map" link. Set to `null` to hide the button. |
| `event.map` | The embedded map. `lat`/`lng`/`zoom` build a keyless Google embed — no API key needed. Set `embedUrl` to the `src` from Google Maps → Share → Embed a map to use a specific embed instead; it takes precedence over the coordinates. Set `event.map` to `null` to drop the map entirely. |
| `sections.rsvp.contacts` | Each entry becomes a button. A `phone` value opens WhatsApp with a pre-filled message; use `url` instead to link anywhere else. |
| `sections.rsvp.deadline` | ISO date, or `null` to hide the deadline line. |
| `music.src` | Path to an audio file. While it is `null` the music button stays hidden. |
| `effects.petals` | Set to `false` to switch off the drifting petals. |

### Photos

`assets/couple-portrait.jpg` is the illustration above the two names. To swap it,
replace that file or point `sections.couple.portrait.image` somewhere else. The
frame takes the shape of whatever you give it — nothing is cropped — so any
aspect ratio works. (`assets/couple-1.jpg` and `assets/couple-2.jpg` are spares;
nothing on the page uses them.)

If the photo is missing the frame degrades gracefully to a monogram plate, so
the page never shows a broken image.

## What is currently on the page

Taken from the printed invitation card:

| | |
| --- | --- |
| Couple | Kaumadee and Gayan |
| Parents | Kaumadee — daughter of Mr. Sarath Pathirana &amp; Mrs. Daya Liyanage · Gayan — son of Mr. Padmasiri Perera &amp; Mrs. Janitha Liyanage |
| Date | Thursday, 5 November 2026 |
| Time | 9.00 AM to 4.30 PM, Poruwa ceremony at 10.00 AM |
| Venue | Hotel Grand Palace, Hikkaduwa |
| RSVP | Gayan 071 535 2686 · Kaumadee 077 445 5086 |

Two things are **not** on the printed card and are therefore left unset:

- `sections.rsvp.deadline` is `null`, so no reply-by line is shown. Set an ISO
  date to display one.
- `event.venueHall` is `null`. Add the banquet hall name if there is one — it is
  appended to the footer line.

The countdown targets the 9.00 AM start time. Change `event.datetime` to
`...T10:00:00+05:30` if you would rather count down to the poruwa.

## Deploying

The site is fully static, so it deploys as-is:

```bash
npx vercel deploy --prod
```

Or connect the repository to Vercel / Netlify / GitHub Pages and point it at the
project root. No build command is required.

## Project layout

```
index.html            markup for the card gate and every section
css/styles.css        all styling, organised into numbered sections
js/config.js          ← every editable detail lives here
js/app.js             binding, countdown, reveal, petals, card gate
assets/               favicon, floral border, mandala, couple photos
```

## Accessibility notes

- The invitation is marked `inert` until the seal is tapped, so screen readers
  and keyboard focus stay on the opening screen.
- The seal is a real `<button>` and works with the keyboard.
- `prefers-reduced-motion` is honoured: petals are removed, reveals are
  instant, and the card opening is shortened.
