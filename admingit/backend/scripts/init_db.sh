#!/bin/bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE chioi;"
sudo -u postgres psql -d chioi -c "CREATE EXTENSION postgis;"
