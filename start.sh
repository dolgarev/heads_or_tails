#!/usr/bin/env bash

# export TESTAPP_SUPPRESS_WINSTON_LOGGER=1
export TESTAPP_ALLOW_WINSTON_MONGODB_TRANSPORT=0

meteor npm run start
