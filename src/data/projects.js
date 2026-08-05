/**
 * Work carousels — add/remove images by editing each category's `items` array.
 * Text comes from src/locales/*.json under work.categories and work.items.
 */
export const workCategories = [
  {
    id: 'logos',
    scrollRight: true,
    items: [
      { src: '/work/logos/griolang.webp', itemId: 'griolang' },
      { src: '/work/logos/auren.webp', itemId: 'auren' },
      { src: '/work/logos/flex.webp', itemId: 'flex' },
    ],
  },
  {
    id: 'posters',
    scrollRight: false,
    items: [
      { src: '/work/posters/ananas.webp', itemId: 'ananas' },
      { src: '/work/posters/pepsi.webp', itemId: 'pepsi' },
      { src: '/work/posters/atieke.webp', itemId: 'atieke' },
    ],
  },
  {
    id: 'website',
    scrollRight: true,
    items: [
      { src: '/work/website/laptop.webp', itemId: 'laptop' },
      { src: '/work/website/pages.webp', itemId: 'pages' },
      { src: '/work/website/canva.webp', itemId: 'canva' },
    ],
  },
]
