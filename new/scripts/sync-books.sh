#!/bin/bash
# Single source of truth: app/(subpages)/books/data/[slug]/
# This script syncs static assets from data folders to public/books/
#
# Each book folder can contain:
#   data.json  - metadata (title, author, date, rating, spineColor, textColor)
#   text.md    - review content
#   cover.png  - cover image (optional)
#   film.mp4   - video (optional)
#   images/    - additional images (optional)
#
# Usage: ./scripts/sync-books.sh
#   --migrate: also pull any assets from public/books/ into data folders first

DATA_DIR="app/(subpages)/books/data"
PUBLIC_DIR="public/books"

# Migration: if --migrate flag, copy assets from public into data (one-time)
if [ "$1" = "--migrate" ]; then
  echo "Migrating assets from $PUBLIC_DIR into $DATA_DIR..."
  if [ -d "$PUBLIC_DIR" ]; then
    for public_book_dir in "$PUBLIC_DIR"/*/; do
      [ -d "$public_book_dir" ] || continue
      slug=$(basename "$public_book_dir")
      data_book_dir="$DATA_DIR/$slug"
      mkdir -p "$data_book_dir"

      # Copy any files not already in data
      for file in "$public_book_dir"*; do
        [ -e "$file" ] || continue
        basename_file=$(basename "$file")
        if [ ! -e "$data_book_dir/$basename_file" ]; then
          cp -r "$file" "$data_book_dir/$basename_file"
          echo "  Migrated: $slug/$basename_file"
        fi
      done
    done
  fi
fi

# Sync: clean public/books and rebuild from data
rm -rf "$PUBLIC_DIR"
mkdir -p "$PUBLIC_DIR"

for book_dir in "$DATA_DIR"/*/; do
  [ -d "$book_dir" ] || continue
  slug=$(basename "$book_dir")
  mkdir -p "$PUBLIC_DIR/$slug"

  # Copy all static assets (skip data.json and text.md)
  for file in "$book_dir"*; do
    basename_file=$(basename "$file")
    case "$basename_file" in
      data.json|text.md) continue ;;
      *) cp -r "$file" "$PUBLIC_DIR/$slug/$basename_file" ;;
    esac
  done
done

echo "Synced book assets to $PUBLIC_DIR"
