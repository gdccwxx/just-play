window.onload = function() {
    var input = document.getElementById('input')
    var base = document.getElementById('base')
    var nowscale = document.getElementById('nowscale')
    var output = document.getElementById('output')
    var button = document.getElementsByTagName('button')[0]

    base.onblur = play
    button.onclick = play

    function play() {
        if (+base.value > 32 || +nowscale.value > 32) {
            output.value = "error"
        } else {
            var number = mulBase(+input.value, +base.value, +nowscale.value)
            output.value = number
        }
    }
    //定义栈
    function Stack() {
        this.dataStore = []
        this.top = 0
        this.push = push
        this.pop = pop
        this.peek = peek
        this.length = length
        this.clear = clear
    }

    function push(element) {
        this.dataStore[this.top++] = element
    }

    function pop() {
        return this.dataStore[--this.top]
    }

    function peek() {
        return this.dataStore[this.top - 1]
    }

    function length() {
        return this.top
    }

    function clear() {
        this.top = 0
    }
    //思路：由于十进制赚多进制以及多进制转十进制方法相同，故将所有多进制县转化为十进制，再将十进制转化为其他进制
    function mulBase(num, base, nowScale) {
        var s = new Stack()
        var number
        var nums
        nums = ScaleToTen(num, nowScale) //将多进制转化为十进制，若是十进制，则返回当前num
        do {
            number = checkHeight(nums, base) //判断是否是多进制，若是多进制，则高位计算后返回
            s.push(number)
            nums = Math.floor(nums /= base)
        } while (nums > 0)
        var converted = ''
        while (s.length() > 0) {
            converted += s.pop()
        }
        return converted
    }

    function checkHeight(num, base) {
        var number = num % base
        if (number <= 9) {
            return number
        } else { //A的Ascii码为65，number + 65 - 10 是此时字母的Ascii码
            number += 55
            number = String.fromCharCode(number)
        }
        return number
    }

    function ScaleToTen(num, nowScale) {
        var number
        var converted = 0

        if (nowScale == 10) {
            return num
        } else {
            for (var i = 0; num > 0; i++) {
                var time = 1
                number = num % 10
                num = Math.floor(num /= 10)
                for (var k = 0; i > k; k++) { //计算位数的N次方
                    time = time * nowScale
                }
                converted += number * time
            }
            return converted
        }
    }
}