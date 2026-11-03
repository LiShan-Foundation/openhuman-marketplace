# OpenHuman Marketplace

An open-source starting point for an affordable, community-minded marketplace where artisans can showcase handmade work and connect with customers. The project is inspired by OpenHuman’s support for people and OpenNature’s 4R values.

> **Status:** Early MVP prototype. Product listings and cart are demo data stored in the browser; this version does not take payments, create accounts, or place real orders.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To make a production build, run `npm run build`; to preview it locally, run `npm run preview`.

## What’s in the prototype

- Responsive artisan-marketplace storefront with product search and category filters.
- Product cards with artisan attribution, craft details, pricing, and 4R-inspired material notes.
- Interactive shopping bag with quantity controls and a locally persisted demo cart.
- Accessible labels, keyboard-operable controls, reduced-motion support, and responsive layouts.
- No analytics, external image dependencies, payment processing, or collection of customer data.

## Product principles

- **Affordable access:** keep platform costs transparent and avoid making artisans pay just to be discovered.
- **Artisan agency:** artisans should control their listings, prices, stories, and participation.
- **Trust and clarity:** clearly distinguish handmade goods, materials, shipping terms, and platform fees.
- **People and planet:** make room for repair, reuse, responsible sourcing, and other 4R-aligned practices. Confirm the foundation’s exact 4R definition before presenting it as official policy.
- **Open source:** build in public, document decisions, and welcome community contributions.

## Before real-world launch

This UI is not a production commerce system. A real marketplace will need, at minimum:

1. A secure backend, database, migrations, backups, and access controls.
2. Artisan and customer accounts, listing moderation, and privacy-conscious data handling.
3. A payment provider and a clear plan for payouts, refunds, disputes, taxes, and fees. Never store card details in this application.
4. Shipping, order lifecycle, notifications, and customer-support workflows.
5. Abuse prevention, accessibility testing, security review, privacy policy, and terms appropriate to the operating regions.
6. Consultation with artisans and the foundation on governance, affordability, and the precise meaning of the 4R principles.

Do not use the demo cart for actual sales or enter real customer information.

## Contributing

Issues and pull requests are welcome. Please describe the problem or proposal, include steps to reproduce UI bugs, and avoid submitting personal or sensitive data. See the repository’s MIT license for reuse terms.

## License

MIT. See [LICENSE](LICENSE).
