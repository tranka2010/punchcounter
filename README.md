
> Open this page at [https://tranka2010.github.io/punchcounter/](https://tranka2010.github.io/punchcounter/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/tranka2010/punchcounter** and import

## Edit this project ![Build status badge](https://github.com/tranka2010/punchcounter/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/tranka2010/punchcounter** and click import

## Features

* This counter will keep a running tally of punches that cross a certain number of gs in the accelerometer (set to 6g on 1.0.1, but this is a tunable parameter.)  
* Button A clears the counter
* Button B displays the current punch count. 
* Registered punches are shown briefly as an X, otherwise screen shows a square [].

* If the micro:bit is connected to a bluetooth device over BLE using the UART Service, the micro:bit will send one line of ASCII characters over the UART in csv format for every punch tallied.  This is done automatically and the micro:bit does not need to be queried to retrieve this data:
    * Example of line received after a punch:
      * Definition: [timestamp in usec],[running punch count],[carriage return/line feed]
      * Hex: 0x37,0x35,0x38,0x31,0x31,0x36,0x32,0x39,0x2C,0x38,0x2C,0x0D,0x0A
      * Numerical: 75811629,8,CR/LF
      
Note: The expectation for this project is that people can expand it by building their own external application for processing the data received from the micro:bit.  For example, a user could build a tool that counts punches, plots them over time, and archives the data as part of boxing training sessions.  The author is currently working on building such a tool.
    
## Blocks preview

This image shows the blocks code from the last commit in master.
This image may take a few minutes to refresh.

![A rendered view of the blocks](https://github.com/tranka2010/punchcounter/raw/master/.github/makecode/blocks.png)

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
