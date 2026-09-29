#!/bin/sh
set -e
mkdir -p /app/data/uploads
chown -R nextjs:nodejs /app/data
exec su-exec nextjs:nodejs "$@"
