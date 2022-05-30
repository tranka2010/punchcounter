def on_bluetooth_connected():
    bluetooth.start_uart_service()
    bluetooth.set_transmit_power(7)
    images.create_image("""
        . . # # .
                # . # . #
                . # # # .
                # . # . #
                . . # # .
    """).show_image(0)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    images.icon_image(IconNames.SKULL).show_image(0)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_button_pressed_a():
    global punchCount
    punchCount = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_uart_data_received():
    global punchCount
    if "R" == bluetooth.uart_read_until(serial.delimiters(Delimiters.CARRIAGE_RETURN)):
        images.create_image("""
            # # . . .
                        # . # . .
                        # # . . .
                        # . # . .
                        # . # . .
        """).show_image(0)
        bluetooth.uart_write_line("" + str(control.event_timestamp()) + "," + str(punchCount) + ",")
    elif "C" == bluetooth.uart_read_until(serial.delimiters(Delimiters.CARRIAGE_RETURN)):
        images.create_image("""
            . # # . .
                        # . . . .
                        # . . . .
                        # . . . .
                        . # # . .
        """).show_image(0)
        punchCount = 0
    else:
        images.create_image("""
            . . # . .
                        . . # . .
                        . . # . .
                        . . . . .
                        . . # . .
        """).show_image(0)
bluetooth.on_uart_data_received(bluetooth.uart_read_until(serial.delimiters(Delimiters.CARRIAGE_RETURN)),
    on_uart_data_received)

def on_sound_loud():
    global loudSound
    loudSound += 1
input.on_sound(DetectedSound.LOUD, on_sound_loud)

def on_button_pressed_b():
    basic.show_string("" + str((punchCount)))
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_tilt_right():
    global punchDetected
    punchDetected = 1
input.on_gesture(Gesture.TILT_RIGHT, on_gesture_tilt_right)

punchCount = 0
punchDetected = 0
punchDetected = 0
punchCount = 0
loudSound = 0
input.set_accelerometer_range(AcceleratorRange.EIGHT_G)

def on_forever():
    global punchCount, punchDetected, loudSound
    if punchDetected > 0 or loudSound > 0:
        punchCount += 1
        punchDetected = 0
        loudSound = 0
        music.play_tone(277, music.beat(BeatFraction.QUARTER))
        images.icon_image(IconNames.NO).show_image(0)
        basic.pause(50)
        images.icon_image(IconNames.SQUARE).show_image(0)
    else:
        loudSound = 0
        images.icon_image(IconNames.SQUARE).show_image(0)
basic.forever(on_forever)
