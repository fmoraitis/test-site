#!/bin/bash
# Run this from the test-site directory

find content -type f -name "index.md" | while read -r file; do
  # Only add if not already present
  if ! grep -q '^weight *= *[0-9]' "$file"; then
    awk 'NR==1{print; print "weight = 1"} NR!=1' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    echo "Added weight = 1 to $file"
  else
    echo "weight already present in $file"
  fi
done