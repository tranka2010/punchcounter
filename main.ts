bluetooth.onBluetoothConnected(function () {
    bluetooth.startUartService()
    bluetooth.setTransmitPower(7)
    images.createImage(`
        . . # # .
        # . # . #
        . # # # .
        # . # . #
        . . # # .
        `).showImage(0)
})
bluetooth.onBluetoothDisconnected(function () {
    images.iconImage(IconNames.Skull).showImage(0)
})
input.onButtonPressed(Button.A, function () {
    punchCount = 0
})
bluetooth.onUartDataReceived(bluetooth.uartReadUntil(serial.delimiters(Delimiters.CarriageReturn)), function () {
    if ("R" == bluetooth.uartReadUntil(serial.delimiters(Delimiters.CarriageReturn))) {
        images.createImage(`
            # # . . .
            # . # . .
            # # . . .
            # . # . .
            # . # . .
            `).showImage(0)
        bluetooth.uartWriteLine("" + control.eventTimestamp() + "," + punchCount + ",")
    } else if ("C" == bluetooth.uartReadUntil(serial.delimiters(Delimiters.CarriageReturn))) {
        images.createImage(`
            . # # . .
            # . . . .
            # . . . .
            # . . . .
            . # # . .
            `).showImage(0)
        punchCount = 0
    } else {
        images.createImage(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `).showImage(0)
    }
})
input.onGesture(Gesture.SixG, function () {
    punchDetected = 1
})
input.onSound(DetectedSound.Loud, function () {
    loudSound += 1
})
input.onButtonPressed(Button.B, function () {
    images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `).showImage(0)
    basic.showString("" + (punchCount))
})
let loudSound = 0
let punchCount = 0
let punchDetected = 0
punchDetected = 0
input.setAccelerometerRange(AcceleratorRange.EightG)
basic.forever(function () {
    if (punchDetected > 0 && loudSound > 0) {
        punchCount += 1
        punchDetected = 0
        loudSound = 0
        music.playTone(277, music.beat(BeatFraction.Quarter))
        images.iconImage(IconNames.No).showImage(0)
        basic.pause(50)
    } else {
        loudSound = 0
        images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `).showImage(0)
    }
})
