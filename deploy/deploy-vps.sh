#!/usr/bin/env bash
set -euo pipefail

HOST="${1:-${DEPLOY_HOST:-root@162.35.175.150}}"
REMOTE_DIR="/opt/apps/razorbee"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> Deploying Razorbee → ${HOST}:${REMOTE_DIR}"

ssh "$HOST" "mkdir -p ${REMOTE_DIR}"

rsync -az --delete \
  --exclude '.git' \
  --exclude '.netlify' \
  --exclude '.DS_Store' \
  --exclude 'node_modules' \
  "$ROOT/" "$HOST:${REMOTE_DIR}/"

ssh "$HOST" bash -s <<'REMOTE'
set -euo pipefail
cd /opt/apps

# Ensure razorbee service exists in compose
if ! grep -q 'razorbee:' docker-compose.yml 2>/dev/null; then
  python3 - <<'PY'
from pathlib import Path
p = Path("/opt/apps/docker-compose.yml")
text = p.read_text()
snippet = """
  razorbee:
    build:
      context: ./razorbee
    ports:
      - "4103:80"
    restart: unless-stopped
"""
if "services:" not in text:
    raise SystemExit("docker-compose.yml missing services:")
# Insert before volumes: if present, else append under services
if "\nvolumes:" in text:
    text = text.replace("\nvolumes:", snippet + "\nvolumes:", 1)
else:
    text = text.rstrip() + "\n" + snippet + "\n"
p.write_text(text)
print("Added razorbee service to docker-compose.yml")
PY
fi

docker compose up -d --build razorbee
docker compose ps razorbee
curl -sI http://127.0.0.1:4103/ | head -5 || true
echo "Live: http://162.35.175.150:4103/"
REMOTE
