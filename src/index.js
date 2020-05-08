import $ from "jquery";

import "./style.scss";

import getRandomColor from "./lib/getRandomColor"; //随机16进制颜色值

import throttle from "./lib/throttle"; //函数节流优化

import initScrollBar from "./fe.scrollbar"; //模拟滚动条


//初始化
initScrollBar("feScrollbar");


let lock = false, //用于节流优化
    timer = null;

//请求数据渲染dom
function fetchRender(el) {
    if (lock) return;
    lock = true;
    let str = `<div class="cell" style="background:linear-gradient(30deg,${ getRandomColor()}, ${getRandomColor()})"></div>`;
    clearTimeout(timer)
    timer = setTimeout(() => {
        console.log("滚动到底部时，正在加载新数据..");
        el.append(str); //渲染
        initScrollBar("feScrollbar"); //渲染后，重置滚动条
        lock = false;
        document.onmouseup = () => {
            //释放鼠标时，清除文档鼠标按下起来后的事件执行
            document.onmousemove = null
        }
    }, 300)
}

//向下滚动时，业务处理
function scrollDownHandle(){
    console.log("向下滚动时调用~")
}

let $el = $("#feScrollbar"); //滚动内容容器

//记上一次滚动值
let lastScroll = $el.scrollTop();


//滚动时
$el.scroll(function () {

    let $this = $(this);
    let st = this.scrollTop; //当前滚动位置
    let delta = st - lastScroll; //滚动范围
    lastScroll = st; //同步最新位置
    let threshold = 60; //距离底部阈值

    // 向下滚动时， 反方向同理~
    if (delta > 0) {
        throttle(scrollDownHandle) //防频繁调用
    }
    
    //滚动到底部时，加载新数据
    if (st + $this.height() > $this[0].scrollHeight - threshold) {
        fetchRender($this) //加载 & 渲染
    }

})
