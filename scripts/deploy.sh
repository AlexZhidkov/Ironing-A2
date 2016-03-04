#!/usr/bin/env bash
set -ev

if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
  firebase deploy --token "-JSYOK9la68ygdvyHYuj|9b0d42209f350d795d382acc4d943579"
fi
