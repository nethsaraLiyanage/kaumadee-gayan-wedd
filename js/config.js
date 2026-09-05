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
    // The small line under the time in the highlight block. Set to null to drop it.
    timeNote: "Onwards",
    timeRange: "9.00 AM to 4.30 PM",
    ceremony: "Poruwa ceremony at 9.50 AM",
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
   * Opening screen (the folded card)
   * `side` runs down the face of the card, `hint` sits along its foot,
   * and `label` + `quote` are the page revealed once the seal is tapped.
   * ------------------------------------------------------------ */
  gate: {
    side: "Kaumadee &amp; Gayan",
    sealLabel: "Open",
    hint: "Tap seal to open",
    label: "A Wedding Invitation",
    quote: "As two hearts are joined, so begins a new life together.",
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
    /* The couple — sits directly under the hero.
     * Each parent's name is shown above the child it belongs to. */
    couple: {
      eyebrow: "You are joyfully invited to celebrate the union of",

      /* The illustration or photograph above the two names.
       * Set to null to leave only the names. */
      portrait: {
        image: "assets/couple-portrait.jpg",
        alt: "Kaumadee and Gayan hand in hand beneath a flowered poruwa",
      },

      people: [
        {
          relation: "Beloved Daughter of",
          parents: "Mr. Sarath Pathirana &amp; Mrs. Daya Liyanage",
          name: "Kaumadee",
        },
        {
          relation: "Beloved Son of",
          parents: "Mr. Padmasiri Perera &amp; Mrs. Janitha Liyanage",
          name: "Gayan",
        },
      ],
    },

    invitation: {
      eyebrow: "The Invitation",
      title: "You Are Warmly Invited",

      /* The parents' names are introduced in the couple section above,
       * so only the invitation itself is spoken here. */
      families: {
        request: "with hearts full of joy, we request the honour of your presence",
        occasion: "as we begin our life together",
      },

      /* Labels above the date and the time in the highlight block. The values
       * themselves come from `event` so they can never drift out of sync. */
      when: {
        dateLabel: "The Date",
        timeLabel: "The Time",
      },
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
      finishedMessage: "The wait is over — today is the day!",
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
