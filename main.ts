input.onGesture(Gesture.EightG, function () {
    punchDetected = 1
})
bluetooth.onBluetoothConnected(function () {
    bluetooth.startUartService()
    bluetooth.setTransmitPower(7)
    images.createImage(`
        # . # # .
        . # # . #
        . . # # .
        . # # . #
        # . # # .
        `).showImage(0)
})
bluetooth.onBluetoothDisconnected(function () {
    images.iconImage(IconNames.Skull).showImage(0)
})
input.onButtonPressed(Button.A, function () {
    punchCount = 0
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Fullstop), function () {
    images.createImage(`
        # # # . .
        . # . . .
        . # # . #
        . . . # .
        . . # . #
        `).showImage(0)
    punchCount = 0
    punchDetected = 0
    bluetooth.uartWriteLine("" + control.eventTimestamp() + "," + punchCount + ",")
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    images.createImage(`
        # # # . .
        . # . . .
        . # # . #
        . . . # .
        . . # . #
        `).showImage(0)
    bluetooth.uartWriteLine("" + control.eventTimestamp() + "," + punchCount + ",")
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
let punchCount = 0
let punchDetected = 0
punchDetected = 0
basic.forever(function () {
    if (punchDetected) {
        punchCount += 1
        punchDetected = 0
        music.playTone(262, music.beat(BeatFraction.Quarter))
        images.iconImage(IconNames.No).showImage(0)
        basic.pause(100)
    } else {
        images.createImage(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `).showImage(0)
    }
})
