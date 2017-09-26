#!/bin/bash
TOKEN='BAhJIiU4ZWY5OWZmOTk0YWZhZThkNjNkZmRjYWQ5NzdiYzVkMAY6BkVG--32e3082f35858a4fca7ed527b3a6f70f91a1a966'
ID=2
API="${API_ORIGIN:-http://localhost:7165}"
URL_PATH="/sign-out"
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"

echo
