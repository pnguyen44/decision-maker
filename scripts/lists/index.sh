#!/bin/bash

TOKEN='BAhJIiU0ZjgzNTZmMzE2OTE3OTIyZDkxZDVjMmFhYmQ2ZDZjOAY6BkVG--e100ac33ad5cc6337708f881286db1a806581067'
USER_ID=1
# API="${API_ORIGIN:-http://localhost:4741}"
API="${API_ORIGIN:-https://the-decision-maker.herokuapp.com}"
URL_PATH="/lists"
curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "list": {
      "user_id": "'"${USER_ID}"'"
    }
  }'
echo
