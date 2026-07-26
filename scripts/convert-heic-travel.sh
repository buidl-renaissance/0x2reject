#!/usr/bin/env bash
# Convert HEIC/HEIF images in public/travel to sRGB JPEGs (web-safe).
# Keeps originals. Skips files that already have a newer .jpg sibling.
#
# Usage:
#   yarn heic:travel
#   ./scripts/convert-heic-travel.sh
#   ./scripts/convert-heic-travel.sh --delete-heic   # remove HEIC after success

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/travel"
DELETE_HEIC=0

for arg in "$@"; do
  case "$arg" in
    --delete-heic) DELETE_HEIC=1 ;;
    *)
      if [[ -d "$arg" ]]; then
        DIR="$arg"
      fi
      ;;
  esac
done

SRGB="/System/Library/ColorSync/Profiles/sRGB Profile.icc"
if [[ ! -f "$SRGB" ]]; then
  echo "error: sRGB profile not found at $SRGB" >&2
  exit 1
fi

if [[ ! -d "$DIR" ]]; then
  echo "error: folder not found: $DIR" >&2
  exit 1
fi

shopt -s nullglob nocaseglob
files=("$DIR"/*.heic "$DIR"/*.heif)
shopt -u nocaseglob

if [[ ${#files[@]} -eq 0 ]]; then
  echo "No HEIC/HEIF files in $DIR"
  exit 0
fi

ok=0
skip=0
fail=0

echo "Converting ${#files[@]} HEIC/HEIF → sRGB JPEG in $DIR"
echo

for src in "${files[@]}"; do
  base="$(basename "$src")"
  name="${base%.*}"
  dest="$DIR/${name}.jpg"

  if [[ -f "$dest" && "$dest" -nt "$src" ]]; then
    echo "skip  $base (jpg exists and is newer)"
    skip=$((skip + 1))
    continue
  fi

  if sips -m "$SRGB" -s format jpeg -s formatOptions 85 "$src" --out "$dest" >/dev/null 2>&1; then
    profile="$(sips -g profile "$dest" 2>/dev/null | awk -F': ' '/profile/{print $2}')"
    echo "ok    $base → ${name}.jpg  [$profile]"
    ok=$((ok + 1))
    if [[ "$DELETE_HEIC" -eq 1 ]]; then
      rm -f "$src"
      echo "      deleted $base"
    fi
  else
    echo "FAIL  $base" >&2
    fail=$((fail + 1))
  fi
done

echo
echo "done: $ok converted, $skip skipped, $fail failed"
exit "$fail"
