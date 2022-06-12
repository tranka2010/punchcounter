#!/bin/bash

# Get current time as epoch, this will be the timestamp for this session
epoch=$(date +%s)

# Get rid of any "cat" commands in the background
killall cat

# Create the Left and Right hand punch stat file
# csv-format: {micro:bit integer timestamp},{total punches},[CR]

#cat /tmp/ttyBleLeft  > training_log/punches_L_$epoch.csv
#cat /tmp/ttyBleRight > training_log/punches_R_$epoch.csv

touch training_log/punches_L_$epoch.csv
touch training_log/punches_R_$epoch.csv

# Define running counters
oldL=""
newL=""
oldR=""
newR=""


# Clear screen
clear

# Write initial count on screen (mostly to mkae sure we are ok thus far)
toilet -f mono9  "L:0 R:0 T:0"

# Infinite loop until user Ctrl-C
while true
do
	# Read buffered data from serial port (very likely just one line)
	# and populate csv stats files
	# If BLE connection is broken to the micro:bit (power off or reset), 
	# the cat yields nothing and thus nothing
	# happens to the counters.  In the background the BLE connection scripts
	# sit also in an infinite loop and will try to connect again.  If successful, the
	# script will continue counting (although most likely the side that was
	# disconnected will start at zero. No problem really, since the raw data is
	# stored in the csv and can be recontructed offline.
	
	#cat /tmp/ttyBleLeft >> training_log/punches_L_$epoch.csv &
	#cat /tmp/ttyBleRight >> training_log/punches_R_$epoch.csv &
	
	if [ -L /tmp/ttyBleLeft ];then
		read -t .1 -d $'\r' LEFT  </tmp/ttyBleLeft
		if [ ! -z "$LEFT" ];then
			# Write epoch and payload from micro:bit
			echo $(date +%s%3N),$LEFT >> training_log/punches_L_$epoch.csv
		fi
	fi
	
	if [ -L /tmp/ttyBleRight ];then
		read -t .1 -d $'\r' RIGHT </tmp/ttyBleRight
		if [ ! -z "$RIGHT" ];then
			# Write epoch and payload from micro:bit
			echo ,$RIGHT >> training_log/punches_R_$epoch.csv
		fi
	fi

	# Extract last total punch counts in files (need to remove CR as well)
	newL=$(tail -1 training_log/punches_L_$epoch.csv | cut -d, -f3 | rev | cut -c1- | rev)   
	newR=$(tail -1 training_log/punches_R_$epoch.csv | cut -d, -f3 | rev | cut -c1- | rev)   
   
	# Check whether the punch counters changed
	if [ "$oldL" != "$newL" ] || [ "$oldR" != "$newR" ]; then  
		# Clear screen and update counters
		clear
		toilet --filter border -f mono9 "L:$(printf "%03d" $newL) R:$(printf "%03d" $newR)   T:$(printf "%03d" $((newL+newR)))"
	fi
	# Update running counters
	oldL=$newL
	oldR=$newR
done
