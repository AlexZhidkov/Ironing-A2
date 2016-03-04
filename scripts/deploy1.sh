#!/usr/bin/env bash
set -ev
echo "inside deploy1"
if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
  echo "about to firebase deploy"
  firebase deploy --token "-JSYOK9la68ygdvyHYuj|9b0d42209f350d795d382acc4d943579"
  echo "after firebase deploy"
fi
