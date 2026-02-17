#!/usr/bin/env bash
set -euo pipefail

# Simple helper to convert common repo images to WebP (run locally)
# Requirements: cwebp (from libwebp)

FILES=("Foto.jpg" "cv-qr-code.png")
for f in "${FILES[@]}"; do
  if [[ -f "$f" ]]; then
    out="${f%.*}.webp"
    echo "Converting $f -> $out"
    cwebp -q 85 "$f" -o "$out"
  else
    echo "Skipping $f (not found in repo root)"
  fi
done

echo "Done. Replace or add generated .webp files to the repo and update <picture> srcset if needed."