#!/bin/bash
OLDPW='ppp'
NEWPW='ppp1'
TOKEN='BAhJIiVkMGZlMGE3ZjdkYmNlZTI3NmVhZWQ2NThlNDIwZTgyMgY6BkVG--34bb53c5df239a1da6a8b47a8730d8343519e9ab'
ID=2
API="${API_ORIGIN:-http://localhost:7165}"
URL_PATH="/change-password"
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo
