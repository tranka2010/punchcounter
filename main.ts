input.onGesture(Gesture.EightG, function () {
    punchDetected = 1
})
bluetooth.onBluetoothConnected(function () {
    music.playTone(554, music.beat(BeatFraction.Quarter))
    BTconnected = 1
    images.createImage(`
        # . # # .
        . # # . #
        . . # # .
        . # # . #
        # . # # .
        `).showImage(0)
})
bluetooth.onBluetoothDisconnected(function () {
    music.playTone(139, music.beat(BeatFraction.Quarter))
    BTconnected = 0
    images.iconImage(IconNames.Skull).showImage(0)
})
input.onButtonPressed(Button.A, function () {
    basic.showString("" + punchCount)
    bluetooth.uartWriteLine("" + convertToText(control.eventTimestamp()) + "," + convertToText(punchCount) + ",")
    punchCount = 0
})
input.onButtonPressed(Button.B, function () {
    basic.showString("" + punchCount)
})
let BTconnected = 0
let punchCount = 0
let punchDetected = 0
punchDetected = 0
punchCount = 0
music.playTone(392, music.beat(BeatFraction.Quarter))
bluetooth.startUartService()
bluetooth.setTransmitPower(7)
led.setBrightness(64)
basic.forever(function () {
    if (punchDetected > 0) {
        punchCount += 1
        punchDetected = 0
        if (BTconnected == 1) {
            bluetooth.uartWriteLine("" + convertToText(control.eventTimestamp()) + "," + convertToText(punchCount) + ",")
        }
        images.createImage(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `).showImage(0)
    }
    images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `).showImage(0)
})
