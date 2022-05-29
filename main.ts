bluetooth.onBluetoothConnected(function () {
    bluetooth.setTransmitPower(7)
    bluetooth.startUartService()
    images.createImage(`
        # # # . .
        # . . # .
        # # # . .
        # . . # .
        # # # . .
        `).showImage(0)
})
bluetooth.onBluetoothDisconnected(function () {
    images.iconImage(IconNames.Skull).showImage(0)
})
input.onButtonPressed(Button.A, function () {
    punchCount = 0
})
input.onGesture(Gesture.SixG, function () {
    punchDetected = 1
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
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
        music.playTone(262, music.beat(BeatFraction.Half))
        images.iconImage(IconNames.No).showImage(0)
        basic.pause(150)
        punchDetected = 0
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
