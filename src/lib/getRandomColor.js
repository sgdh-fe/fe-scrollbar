// 256色，16进制
export default function () {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16);
        color = color.length === 1 ? '0' + color : color;
        rgb.push(color);
    }
    return '#' + rgb.join('');
}
