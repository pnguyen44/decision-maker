#!/bin/bash

TOKEN='BAhJIiU0ZjgzNTZmMzE2OTE3OTIyZDkxZDVjMmFhYmQ2ZDZjOAY6BkVG--e100ac33ad5cc6337708f881286db1a806581067'
NAME='curl 4'

# API="${API_ORIGIN:-http://localhost:4741}"
API="${API_ORIGIN:-https://the-decision-maker.herokuapp.com}"
URL_PATH="/lists"
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "list": {
      "name": "'"${NAME}"'"
    }
  }'

echo
