# Sash(a Cutie) kitty archive

Originals in `originals/` (often iPhone Display P3 / HEIC).
Web assets in `/public/profiles/sash-*.jpg` are **sRGB** JPEGs — Cursor and browsers
wash out Display P3 if left as-is; Finder/Preview look fine because they color-manage P3.

Re-export tip:
```bash
sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc" \
  -s format jpeg -s formatOptions 85 -Z 1600 INPUT --out profiles/sash-NAME.jpg
```

| File | Caption |
|------|---------|
| sash-cool | All grown up. Zero apologies. |
| sash-first-meet | The moment we met. She chose me. |
| sash-found | Found her on the street. Tail up, no fear. |
| sash-chin-scratches | First chin scratches. Instant trust. |
| sash-tiny-cap | For scale: one baseball cap. |
| sash-cozy | Making herself at home. |
| sash-croquet | Learning the yard. Croquet assistant. |
| sash-queen | Queen energy from day one. |
| sash-relaxed | Fully settled. Zero worries. |
| sash-suitcase | Ready for adventure. DFW approved. |
| sash-cutout | Partners in crime. |
| sash-nuzzle | Nose kisses. She's home. |
| sash-chest-nap | Chest nap. Heart stolen. |
| sash-loft | Loft life. Watching everything. |
