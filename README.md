# Korean @ ECCV 2026

A static GitHub Pages site for the coffee-break social, its organizers and participants, and their presentation schedules.

Open `index.html` locally or serve this directory with any static HTTP server. GitHub Pages can continue serving the repository root; no build step, package installation, server, or database is required.

## Editing the page

- Event details, people, paper titles, authors, links, and presentation times are in `index.html`.
- Layout and responsive styles are in `assets/site.css`.
- `assets/site.js` filters papers when a person's paper link is selected. Event information, date navigation, external links, and paper disclosures work without JavaScript.
- Existing portraits remain in `assets/img/`. Keep portraits as CSS backgrounds to preserve the original text-only link previews.

Each paper is a native `<details class="paper-row">` element inside its date section. Keep the two-line `<summary>` concise and put full authors, locations, poster numbers, and links inside `.paper-detail`. A paper with multiple sessions on the same date stays in one row.

Use the same person ID in a profile's `data-person` attribute and the paper's space-separated `data-members` attribute. Update profile paper counts when adding papers. Times use Malmö local time, CEST (UTC+2). The workshop paper currently has `Time TBA`.

The four-slot participant layout includes two real profiles and two explicitly labeled example profiles, carried over from the design preview. Replace the examples with confirmed participants before treating the displayed count as an attendance total.

## Icons

Inline icons are from Lucide and retain their ISC license in `assets/lucide-LICENSE`.
