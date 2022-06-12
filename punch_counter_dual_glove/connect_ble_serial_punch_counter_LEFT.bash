#!/bin/bash
while true
do
	/home/ptg/.local/bin/ble-serial -d C9:BB:3D:B1:49:8A -w e95d23c4-251d-470a-a062-fa1922dfa9a8 -r 6e400002-b5a3-f393-e0a9-e50e24dcca9e -p /tmp/ttyBleLeft

done
