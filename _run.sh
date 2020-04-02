#!/bin/bash

PGUSER=postgres \
PGHOST=localhost \
PGPASSWORD=password \
PGDATABASE=postgres \
PGPORT=5432 \
    node localRunner.js $1
