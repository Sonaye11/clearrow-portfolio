import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const webpQuality = 82

const imageDirs = [
  'public/work/logos',
  'public/work/posters',
  'public/work/website',
  'public/competences',
  'src/assets/hero',
]

async function compressPngToWebp(filePath) {
  const webpPath = filePath.replace(/\.png$/i, '.webp')
  const before = (await fs.stat(filePath)).size

  await sharp(filePath).webp({ quality: webpQuality }).toFile(webpPath)

  const after = (await fs.stat(webpPath)).size
  await fs.unlink(filePath)

  return { before, after, webpPath }
}

async function compressDirectory(relativeDir) {
  const dirPath = path.join(root, relativeDir)
  const entries = await fs.readdir(dirPath)
  const results = []

  for (const entry of entries) {
    if (!entry.toLowerCase().endsWith('.png')) continue
    const filePath = path.join(dirPath, entry)
    results.push(await compressPngToWebp(filePath))
  }

  return results
}

async function createOgImage(profilePath) {
  const outputJpg = path.join(root, 'public/og-image.jpg')
  const outputPng = path.join(root, 'public/og-image.png')
  const helmet = await sharp(profilePath).resize(900, 630, { fit: 'inside' }).toBuffer()

  const canvas = sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
    },
  })
    .composite([{ input: helmet, gravity: 'center' }])
    .jpeg({ quality: 88 })

  await canvas.toFile(outputJpg)
  await sharp(outputJpg).png({ compressionLevel: 9 }).toFile(outputPng)

  return { outputJpg, outputPng }
}

const profilePath =
  process.argv[2] ??
  '/Users/monmon/.cursor/projects/Users-monmon-Documents-Website-Portfolio/assets/Profile-042aee7e-0c46-4b37-b003-df4e06b487fd.png'

let totalBefore = 0
let totalAfter = 0

for (const dir of imageDirs) {
  const results = await compressDirectory(dir)
  for (const { before, after, webpPath } of results) {
    totalBefore += before
    totalAfter += after
    console.log(
      `${path.relative(root, webpPath)}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`,
    )
  }
}

const og = await createOgImage(profilePath)
const ogJpgSize = (await fs.stat(og.outputJpg)).size
console.log(`\nog-image.jpg: ${Math.round(ogJpgSize / 1024)}KB`)
console.log(
  `\nTotal: ${Math.round(totalBefore / 1024)}KB → ${Math.round(totalAfter / 1024)}KB (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`,
)
