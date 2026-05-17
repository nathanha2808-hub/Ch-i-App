#!/bin/bash
cat ~/.pm2/dump.pm2 | grep -a -o "postgresql://[^\"]*"
