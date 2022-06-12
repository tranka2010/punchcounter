#!/bin/bash
while true
do
	/home/ptg/.local/bin/ble-serial -d E5:85:F7:63:8F:3E -w e95d23c4-251d-470a-a062-fa1922dfa9a8 -r 6e400002-b5a3-f393-e0a9-e50e24dcca9e -p /tmp/ttyBleRight

done
