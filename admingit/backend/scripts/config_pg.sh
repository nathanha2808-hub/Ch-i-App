#!/bin/bash
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/16/main/postgresql.conf
sudo sed -i "s/127.0.0.1\/32/0.0.0.0\/0/g" /etc/postgresql/16/main/pg_hba.conf
sudo service postgresql restart
