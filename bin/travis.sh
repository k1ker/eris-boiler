#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]]
then
  curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
  chmod +x ./cc-test-reporter
  ./cc-test-reporter before-build
fi
npm test
if [[ $TRAVIS_BRANCH == 'master' ]]
then ./cc-test-reporter "after-build --exit-code $TRAVIS_TEST_RESULT"
fi