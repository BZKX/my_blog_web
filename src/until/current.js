import {
    message
} from "ant-design-vue";

export function copy(value) {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.setAttribute('value', value)
    input.setAttribute('readonly', 'readonly')
    input.select()
    try {
        var successful = document.execCommand('copy')
            // var msg = successful ? 'successful' : 'unsuccessful'
            // console.log('Copy email command was ' + msg);
        if (!successful) {
            throw new Error('copy failed')
        }
        message.success('复制成功')
    } catch (err) {
        message.error(err)
    }
    document.body.removeChild(input)
    document.designMode = 'off'
}

export function throttle(fn, ms) {
    let timer = null;
    return function() {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
                timer = null
            }, ms)
        }
    }
}