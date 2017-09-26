#!/bin/bash
TOKEN='BAhJIiU0ZjgzNTZmMzE2OTE3OTIyZDkxZDVjMmFhYmQ2ZDZjOAY6BkVG--e100ac33ad5cc6337708f881286db1a806581067'
NAME='Heathy things to eat update'
ID=4
MARK='false'
LIST_ID=2


# API="${API_ORIGIN:-http://localhost:4741}"
API="${API_ORIGIN:-https://the-decision-maker.herokuapp.com}"
URL_PATH="/items/${ID}"
curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "item": {
      "name": "'"${NAME}"'",
      "mark": "'"${MARK}"'",
      "list_id": "'"${LIST_ID}"'"
    }
  }'

echo
