#!/bin/bash
#
# Runs development server and cypress e2e since using nx automation causes server process to exit

nx serve dashboard &

# Wait 2 seconds for server to start
sleep 2

# Run cypress e2e tests
nx run dashboard-e2e:e2e "$@"