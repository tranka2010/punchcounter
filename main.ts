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
    punchCount = 0
})
input.onGesture(Gesture.SixG, function () {
    punchDetected = 1
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
images.iconImage(IconNames.Heart).showImage(0)
bluetooth.startUartService()
bluetooth.setTransmitPower(7)
basic.forever(function () {
    if (punchDetected > 0) {
        punchCount += 1
        punchDetected = 0
        if (BTconnected == 1) {
            bluetooth.uartWriteLine("" + convertToText(control.eventTimestamp()) + "," + convertToText(punchCount) + "")
        }
        images.iconImage(IconNames.No).showImage(0)
        images.iconImage(IconNames.Square).showImage(0)
    } else {
        images.iconImage(IconNames.Square).showImage(0)
    }
})
