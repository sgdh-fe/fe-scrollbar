import $ from "jquery";

import "./style.scss";

import getRandomColor from "./lib/getRandomColor"; //随机颜色

import initScrollBar from "./fe.scrollbar"; //模拟滚动条


//初始化
initScrollBar("feScrollbar");


//渲染dom
let lock = false,
    timer = null;
function fetchRender(el) {
    if (lock) return;
    lock = true;
    let str = `<div class="cell" style="background: linear-gradient(30deg,${ getRandomColor()}, ${getRandomColor()})"></div>`;
    clearTimeout(timer)
    timer = setTimeout(() => {
        el.append(str);
        initScrollBar("feScrollbar"); //渲染后，重置滚动条
        lock = false;
    }, 200)
}

let $el = $("#feScrollbar");

//上一次滚动值
let lastScroll = $el.scrollTop();

//滚动时
$el.scroll(function () {

    let $this = $(this);
    let st = this.scrollTop; //当前滚动位置
    let delta = st - lastScroll; //滚动范围
    lastScroll = st; //同步最新位置
    let threshold = 30; //距离底部阈值


    // 向下滚动时
    if (delta > 0) {
        console.log("向下滚动时")
    }

    //滚动到底部时，加载新数据
    if (st + $this.height() > $this[0].scrollHeight - threshold) {
        console.log("滚动到底部时，加载新数据..");
        fetchRender($this); //加载 & 渲染
    }

})