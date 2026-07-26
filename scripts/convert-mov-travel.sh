#!/usr/bin/env bash
# Convert MOV/M4V videos in public/travel to MP4 (H.264 via macOS avconvert).
# Keeps originals. Skips when a newer .mp4 already exists.
#
# Usage:
#   yarn mov:travel
#   ./scripts/convert-mov-travel.sh
#   ./scripts/convert-mov-travel.sh --delete-mov
#   ./scripts/convert-mov-travel.sh --preset Preset1920x1080

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/travel"
DELETE_MOV=0
PRESET="Preset1280x720"

for arg in "$@"; do
  case "$arg" in
    --delete-mov) DELETE_MOV=1 ;;
    --preset)
      shift_next=1
      ;;
    Preset*)
      PRESET="$arg"
      ;;
    *)
      if [[ -d "$arg" ]]; then
        DIR="$arg"
      fi
      ;;
  esac
done

# Support: --preset Preset1920x1080 as two args
args=("$@")
for i in "${!args[@]}"; do
  if [[ "${args[$i]}" == "--preset" && -n "${args[$((i+1))]:-}" ]]; then
    PRESET="${args[$((i+1))]}"
  fi
done

if ! command -v avconvert >/dev/null 2>&1; then
  echo "error: avconvert not found (macOS only). Install ffmpeg as an alternative." >&2
  exit 1
fi

if [[ ! -d "$DIR" ]]; then
  echo "error: folder not found: $DIR" >&2
  exit 1
fi

shopt -s nullglob nocaseglob
files=("$DIR"/*.mov "$DIR"/*.m4v)
shopt -u nocaseglob

if [[ ${#files[@]} -eq 0 ]]; then
  echo "No MOV/M4V files in $DIR"
  exit 0
fi

ok=0
skip=0
fail=0

echo "Converting ${#files[@]} videos → MP4 ($PRESET) in $DIR"
echo

for src in "${files[@]}"; do
  base="$(basename "$src")"
  name="${base%.*}"
  dest="$DIR/${name}.mp4"

  if [[ -f "$dest" && "$dest" -nt "$src" ]]; then
    echo "skip  $base (mp4 exists and is newer)"
    skip=$((skip + 1))
    continue
  fi

  echo "....  $base → ${name}.mp4"
  if avconvert \
    --source "$src" \
    --output "$dest" \
    --preset "$PRESET" \
    --replace \
    --progress \
    >/tmp/avconvert-travel.log 2>&1; then
    size=$(du -h "$dest" | awk '{print $1}')
    echo "ok    $base → ${name}.mp4 ($size)"
    ok=$((ok + 1))
    if [[ "$DELETE_MOV" -eq 1 ]]; then
      rm -f "$src"
      echo "      deleted $base"
    fi
  else
    echo "FAIL  $base (see /tmp/avconvert-travel.log)" >&2
    tail -5 /tmp/avconvert-travel.log >&2 || true
    fail=$((fail + 1))
    rm -f "$dest"
  fi
done

echo
echo "done: $ok converted, $skip skipped, $fail failed"
exit "$fail"
