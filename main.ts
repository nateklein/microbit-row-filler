function top_scroll() {
    while (scrolling) {
        if (top_pose > 3) {
            direction = -1
        } else if (top_pose < 1) {
            direction = 1
        }
        top_pose = top_pose + direction
        led.toggle(top_pose, 0)
        basic.pause(300 - score * 10)
        led.toggle(top_pose, 0)
        if (input.buttonIsPressed(Button.A)) {
            scrolling = false
            let low = get_lowest_lit(top_pose)
            if (low == 1) {
                game_over(top_pose)
            } else {
                fall(low)
            }
        }
    }
}

function fall(lowest: number) {
    for (let i = 0; i <= lowest - 2; i++) {
        led.toggle(top_pose, i)
        basic.pause(300)
        led.toggle(top_pose, i)
    }
    led.toggle(top_pose, lowest - 1)
    basic.pause(500)
    full_row = true
    for (let f = 0; f <= 5 - 1; f++) {
        if (!(led.point(f, lowest - 1))) {
            full_row = false
        }
    }
    if (full_row) {
        clear_row(lowest - 1)
    }
    scrolling = true
    top_pose = 1
    direction = 1
    top_scroll()
}

function get_lowest_lit(col: number) {
    let lowest_lit = 5
    for (let j = 4; j > 0; j--) {
        if (led.point(top_pose, j)) {
            lowest_lit = j
        }
    }
    return lowest_lit
}

function clear_row(row: number) {
    for (let k = 0; k <= 5 - 1; k++) {
        led.toggle(k, row)
    }
    basic.pause(300)
    for (let l = row; l > 0; l--) {
        for (let m = 0; m < 5; m++) {
            if (led.point(m, l)) {
                led.toggle(m, l)
                led.toggle(m, l + 1)
            }
        }
    }
    score += 1
}

function game_over(col: number) {
    led.toggle(col, 0)
    basic.pause(2000)
    basic.showString("Game over!")
    basic.showIcon(IconNames.Sad)
    basic.pause(500)
    basic.showString("Score:")
    basic.showNumber(score)
    basic.pause(2000)
    basic.showString("Hold B to play again!")
    while (!(again)) {
        if (input.buttonIsPressed(Button.B)) {
            again = true
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            top_pose = 1
            direction = 1
            scrolling = true
            top_scroll()
        }
    }
}

let full_row = false
let again = false
let score = 0
let scrolling = false
let top_pose = 0
let direction = 0
direction = 1
top_pose = 1
scrolling = true
top_scroll()
