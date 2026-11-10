/**
 * Service cards — prices stay here; text from src/locales/*.json under services.cards
 *
 * USD values are rounded display equivalents; update them alongside the CFA prices.
 */
export const services = [
  {
    id: 'essential-launch',
    cardKey: 'essentialLaunch',
    price: '40 000 CFA',
    priceUsd: '$70',
    featured: false,
  },
  {
    id: 'brand-launch',
    cardKey: 'brandLaunch',
    price: '80 000 CFA',
    priceUsd: '$135',
    featured: true,
  },
  {
    id: 'full-identity',
    cardKey: 'fullIdentity',
    price: '150 000 CFA',
    priceUsd: '$250',
    featured: false,
  },
]
