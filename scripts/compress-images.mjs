/**
 * Converts every PNG in the folders below to WebP.
 * The original PNGs are moved to /originals (outside /public) instead of deleted.
 *
 * Usage (from the project root):
 *   node scripts/compress-images.mjs                      -> compress new PNGs only
 *   node scripts/compress-images.mjs path/to/profile.png  -> also rebuild the OG image
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

// Project root = one level above this script's folder (works on any Node version)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const webpQuality = 82
const originalsDir = 'originals'

const imageDirs = [
  'public/work/logos',
  'public/work/posters',
  'public/work/website',
  'public/competences',
  'src/assets/hero',
]

async function compressPngToWebp(filePath, relativeDir) {
  const webpPath = filePath.replace(/\.png$/i, '.webp')
  const before = (await fs.stat(filePath)).size

  await sharp(filePath).webp({ quality: webpQuality }).toFile(webpPath)
  const after = (await fs.stat(webpPath)).size

  // Keep the original PNG (in /originals) instead of deleting it
  const backupDir = path.join(root, originalsDir, relativeDir)
  await fs.mkdir(backupDir, { recursive: true })
  await fs.rename(filePath, path.join(backupDir, path.basename(filePath)))

  return { before, after, webpPath }
}

async function compressDirectory(relativeDir) {
  const dirPath = path.join(root, relativeDir)

  let entries
  try {
    entries = await fs.readdir(dirPath)
  } catch {
    console.warn(`Skipping ${relativeDir} (folder not found)`)
    return []
  }

  const results = []
  for (const entry of entries) {
    if (!entry.toLowerCase().endsWith('.png')) continue
    const filePath = path.join(dirPath, entry)
    try {
      results.push(await compressPngToWebp(filePath, relativeDir))
    } catch (err) {
      console.error(`Failed on ${path.join(relativeDir, entry)}: ${err.message}`)
    }
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

// ---- Run ----

const profilePath = process.argv[2] // optional

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

if (totalBefore > 0) {
  console.log(
    `\nTotal: ${Math.round(totalBefore / 1024)}KB → ${Math.round(totalAfter / 1024)}KB (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`,
  )
  console.log(`Original PNGs moved to /${originalsDir}`)
} else {
  console.log('No PNGs to compress.')
}

if (profilePath) {
  try {
    await fs.access(profilePath)
    const og = await createOgImage(profilePath)
    const ogJpgSize = (await fs.stat(og.outputJpg)).size
    console.log(`\nog-image.jpg: ${Math.round(ogJpgSize / 1024)}KB`)
  } catch (err) {
    console.error(`\nCould not build the OG image from "${profilePath}": ${err.message}`)
    process.exitCode = 1
  }
}
