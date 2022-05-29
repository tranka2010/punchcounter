bluetooth.onBluetoothConnected(function () {
    bluetooth.startUartService()
    images.createImage(`
        # # # . .
        # . . # .
        # # # . .
        # . . # .
        # # # . .
        `).showImage(0)
})
input.onButtonPressed(Button.A, function () {
    punchCount = 0
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    bluetooth.uartWriteNumber(control.eventTimestamp())
    bluetooth.uartWriteString(",")
    bluetooth.uartWriteNumber(punchCount)
    bluetooth.uartWriteString(",")
    bluetooth.uartWriteLine("")
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
input.onGesture(Gesture.TiltRight, function () {
    punchDetected = 1
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
