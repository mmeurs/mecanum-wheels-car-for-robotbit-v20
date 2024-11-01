function rotCar (rs: number) {
    robotbit.MotorRun(robotbit.Motors.M2B, Math.map(rs, -512, 512, 255, -255))
    robotbit.MotorRun(robotbit.Motors.M2A, Math.map(rs, -512, 512, 255, -255))
    robotbit.MotorRun(robotbit.Motors.M1A, Math.map(rs, -512, 512, 255, -255))
    robotbit.MotorRun(robotbit.Motors.M1B, Math.map(rs, -512, 512, 255, -255))
}
function swinging (XX: number, YY: number) {
    if (YY <= 0) {
        robotbit.MotorRun(robotbit.Motors.M2B, Math.map(XX, -512, 512, 255, -255))
        robotbit.MotorRun(robotbit.Motors.M1A, Math.map(XX, -512, 512, 255, -255))
    } else {
        robotbit.MotorRun(robotbit.Motors.M2A, Math.map(XX, -512, 512, -255, 255))
        robotbit.MotorRun(robotbit.Motors.M1B, Math.map(XX, -512, 512, -255, 255))
    }
}
function mcCar (XX: number, YY: number) {
    M1 = YY * -1
    M3 = YY * 1
    if (M1 > 0 || Math.abs(XX) > Math.abs(YY)) {
        M1 = M1 - XX
    }
    if (M3 > 0 || Math.abs(XX) > Math.abs(YY)) {
        M3 = M3 - XX
    }
    M2 = YY * -1
    M4 = YY * 1
    if (M2 < 0 || Math.abs(XX) > Math.abs(YY)) {
        M2 = M2 + XX
    }
    if (M4 < 0 || Math.abs(XX) > Math.abs(YY)) {
        M4 = M4 + XX
    }
    robotbit.MotorRun(robotbit.Motors.M2B, Math.map(M1, -512, 512, -255, 255))
    robotbit.MotorRun(robotbit.Motors.M2A, Math.map(M2, -512, 512, -255, 255))
    robotbit.MotorRun(robotbit.Motors.M1A, Math.map(M3, -512, 512, -255, 255))
    robotbit.MotorRun(robotbit.Motors.M1B, Math.map(M4, -512, 512, -255, 255))
}
function swingwingY (XX: number, YY: number) {
    if (XX <= 0) {
        robotbit.MotorRun(robotbit.Motors.M1A, Math.map(YY, -512, 512, -255, 255))
        robotbit.MotorRun(robotbit.Motors.M1B, Math.map(YY, -512, 512, -255, 255))
    } else {
        robotbit.MotorRun(robotbit.Motors.M2A, Math.map(YY, -512, 512, 255, -255))
        robotbit.MotorRun(robotbit.Motors.M2B, Math.map(YY, -512, 512, 255, -255))
    }
}
function fbCar (spd: number) {
    robotbit.MotorRun(robotbit.Motors.M2B, Math.map(spd, -512, 512, 255, -255))
    robotbit.MotorRun(robotbit.Motors.M2A, Math.map(spd, -512, 512, 255, -255))
    robotbit.MotorRun(robotbit.Motors.M1A, Math.map(spd, -512, 512, -255, 255))
    robotbit.MotorRun(robotbit.Motors.M1B, Math.map(spd, -512, 512, -255, 255))
}
radio.onReceivedString(function (receivedString) {
    basic.clearScreen()
    if (receivedString.substr(0, 1) == "N") {
        X = parseFloat(receivedString.substr(1, 4))
        Y = parseFloat(receivedString.substr(5, 4))
        mcCar(X - 1512, Y - 1512)
    } else if (receivedString.substr(0, 1) == "R") {
        X = parseFloat(receivedString.substr(1, 4))
        Y = 1512
        rotCar(X - 1512)
    } else if (receivedString.substr(0, 1) == "W") {
        X = 1512
        Y = parseFloat(receivedString.substr(5, 4))
        fbCar(Y - 1512)
    } else if (receivedString.substr(0, 1) == "Y") {
        X = parseFloat(receivedString.substr(1, 4))
        Y = parseFloat(receivedString.substr(5, 4))
        swinging(X - 1512, Y - 1512)
    } else if (receivedString.substr(0, 1) == "G") {
        X = parseFloat(receivedString.substr(1, 4))
        Y = parseFloat(receivedString.substr(5, 4))
        swingwingY(X - 1512, Y - 1512)
    } else {
        X = 1512
        Y = 1512
    }
    led.plot(Math.map(X, 1001, 2022, 4, 0), Math.map(Y, 1001, 2022, 0, 4))
})
let Y = 0
let X = 0
let M4 = 0
let M2 = 0
let M3 = 0
let M1 = 0
radio.setGroup(88)
basic.showIcon(IconNames.Happy)
