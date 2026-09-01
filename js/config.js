/**
 * Every detail of the invitation lives here.
 * Change these values and the whole page updates — no markup edits needed.
 */
window.INVITATION_CONFIG = {
  /* ---------------------------------------------------------------
   * The couple
   * ------------------------------------------------------------ */
  couple: {
    nameOne: "Kaumadee",
    joiner: "and",
    nameTwo: "Gayan",
    monogramOne: "K",
    monogramTwo: "G",
  },

  /* ---------------------------------------------------------------
   * The event
   * `datetime` drives the hero date block AND the countdown.
   * Use a full ISO string with the timezone offset (+05:30 = Sri Lanka).
   * ------------------------------------------------------------ */
  event: {
    datetime: "2026-11-05T09:00:00+05:30",
    timeLabel: "9.00 AM",
    timeRange: "9.00 AM to 4.30 PM",
    ceremony: "Poruwa ceremony at 10.00 AM",
    venueName: "Hotel Grand Palace",
    venueCity: "Hikkaduwa",
    venueHall: null,

    // Target of the "Get Directions" button.
    mapsUrl: "https://maps.app.goo.gl/aXL3QrTBpcMpf6uY8",

    /* The embedded map.
     * By default the iframe is built from the coordinates below, which needs
     * no Google API key. To use a specific embed instead, open the place in
     * Google Maps → Share → Embed a map, and paste the `src` of the iframe it
     * gives you into `embedUrl` — that value then wins over the coordinates.
     * Set `map` to null to remove the map altogether. */
    map: {
      lat: 6.1395006,
      lng: 80.122915,
      zoom: 16,
      embedUrl: null,
      title: "Map showing Hotel Grand Palace, Hikkaduwa",
      linkLabel: "View larger map",
    },
  },

  /* ---------------------------------------------------------------
   * Opening screen (the oil lamp)
   * ------------------------------------------------------------ */
  gate: {
    label: "A Wedding Invitation",
    hint: "Tap to light the lamp",
    quote: "As the flame is lit, so begins a new life together.",
  },

  /* ---------------------------------------------------------------
   * Hero
   * ------------------------------------------------------------ */
  hero: {
    eyebrow: "Together with our families",
    blessing: "with a sheaf of betel and hearts full of joy",
    scrollCue: "Scroll",
  },

  /* ---------------------------------------------------------------
   * Page sections
   * ------------------------------------------------------------ */
  sections: {
    invitation: {
      eyebrow: "The Invitation",
      title: "You Are Warmly Invited",

      /* The two families, exactly as they appear on the printed card. */
      families: {
        one: "Mr. Sarath Pathirana &amp; Mrs. Daya Liyanage",
        joiner: "together with",
        two: "Mr. Padmasiri Perera &amp; Mrs. Janitha Liyanage",
        request: "request the honour of your presence",
        occasion: "on the occasion of the marriage of their children",
      },

      body:
        "Two families, one blessing, and a morning we have been waiting for. " +
        "Join us as we light the lamp, step onto the poruwa, and begin this " +
        "new chapter together. Your presence is the blessing we wish for most.",
    },

    couple: {
      eyebrow: "The Couple",
      title: "Two Hearts, One Flame",
      cards: [
        { image: "assets/couple-1.jpg", caption: "Beneath the poruwa" },
        { image: "assets/couple-2.jpg", caption: "Rooted in tradition" },
      ],
    },

    venue: {
      eyebrow: "The Venue",
      body:
        "A morning of blessings, a table laid with plenty, and a day filled " +
        "with laughter — we cannot wait to share all of it with you.",
      directionsLabel: "Get Directions",
    },

    countdown: {
      eyebrow: "Until the Auspicious Hour",
      title: "Counting the Days",
      finishedMessage: "The lamp is lit — today is the day!",
      labels: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
    },

    rsvp: {
      eyebrow: "Kindly Reply",
      title: "Will You Join Us?",
      // The printed card gives no reply-by date. Set an ISO date here to show one.
      deadline: null,
      deadlineTemplate: "Please send your reply before {date}.",
      note: 'A simple "We will be there!" makes our day.',
      contacts: [
        { label: "RSVP — Gayan", phone: "+94715352686", display: "071 535 2686" },
        { label: "RSVP — Kaumadee", phone: "+94774455086", display: "077 445 5086" },
      ],
      // Pre-filled WhatsApp message. {names} is replaced with the couple's names.
      messageTemplate: "Hello! Replying to the wedding invitation of {names} — ",
    },
  },

  /* ---------------------------------------------------------------
   * Background music
   * Drop an audio file in assets/ and put its path here.
   * Set to null to hide the music button entirely.
   * ------------------------------------------------------------ */
  music: {
    src: null, // e.g. "assets/music.mp3"
    startMuted: false,
  },

  /* ---------------------------------------------------------------
   * Decorative flourishes
   * ------------------------------------------------------------ */
  effects: {
    petals: true,
    petalCount: 14,
  },
};
