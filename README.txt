Dual Punch Counter Tool: A use-case for punchcounter
First rev: 2022-06-12

The micro:bit code committed in thre repo can be flashed into 2 micro:bits and used track pucnhes thrown by each hand individually.  The scripts under punch_counter_dual_glove achieve this:

Pre-requisites:

Two micro-bits flashed with punchcounter
Linux computer with a Bluetooth adapter
Installation of Jakeler's ble-serial (https://github.com/Jakeler/ble-serial)
Installation of toilet and figlet

Operaration:

Turn on the micro:bits and place them on the gloves (suggestions to be provided later)

Open a terminal window and execute the following script (make sure you have execute permission): connect_ble_serial_punch_counter_LEFT.bash.  This script will run on infinite loop.  Upon connection, the micro:bit will beep.  Same for disconnection.  If the disconnection is because of a reset on the micro:bit, the script will try to connect again.  You will need to modify this script to use the correct UUIDs for your devices.  See ble-serial docuemntation for details.

Open a new terminal window and execute the following script: connect_ble_serial_punch_counter_LEFT.bash.  The same conditions apply to script as above.

Open a third terminal window and execute the following script: punch_counter.bash.  This will kick off the counters.  After each punch the screen will show number of punches on the left and the right as well as the total count.  Behind the scenes, two .csv files are created logging each punch as it is received.

To quit, Ctrl-C the scripts.

ToDo for tool:

Run everything from one script.
Handle micro:bit resets gracefully.
Apply statistics to the .csv files.
Add a GUI.

ToDo on this Readme.txt 

Expand and illustrate operation
Provide more detaisl on what is going on under the hood.