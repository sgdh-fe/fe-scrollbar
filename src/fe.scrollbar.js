function getScrollWidth() {
    const div = $('<div></div>');
    div.css({
        width: '100px',
        height: '100px',
        position: 'absolute',
        overflow: 'scroll',
        backgroundColor: '#FFF'
    })

    const innerDiv = $('<div></div>');
    innerDiv.css({
        width: '100px',
        height: '100px',
        backgroundColor: '#FFF'
    });

    div.append(innerDiv);
    $('body').append(div);

    const outW = div[0].offsetWidth;
    const inW = div[0].clientWidth;

    div.remove();

    return outW - inW
}


let scrollWidth = getScrollWidth();

let trail = $('.fe-scrollbar-trail')[0];
let thumb = $('.fe-scrollbar-bar')[0];

function initScrollBar(wrapId, offsetVal) {
    let offset = offsetVal || 0;
    let wrap = $('#' + wrapId)[0]; //滚动条id

    // 更新滚动条bar
    function updateThumb() {
        let thumbHeight = (wrap.clientHeight * 100 / wrap.scrollHeight);
        let thumbTop = ((wrap.scrollTop) / wrap.scrollHeight) * wrap.clientHeight;
        $(thumb).css({
            height: thumbHeight + '%',
            top: thumbTop + 'px'
        })
        releaseCapture()
    }

    function clickTrackHandle(e) {
        // 当前目标元素类名
        let cn = e && e.target && e.target.className;
        // 点击滚动条不做处理，防止点击跳动
        if (cn === "fe-scrollbar-bar") return;
        //获取 点击位置 与 滚动框顶部 之间的距离
        let offset = Math.abs(e.target.getBoundingClientRect().top - e.clientY)
        //设置点击位置 处于滚动条的中间
        let thumbHalf = thumb.offsetHeight / 2;
        //计算得到滚动条在滚动框内的的百分比位置
        let thumbPositionPercentage = (offset - thumbHalf) * 100 / wrap.offsetHeight;
        //通过改变scrollTop 来改变滚动条
        wrap.scrollTop = (thumbPositionPercentage * wrap.scrollHeight / 100);

    }

    //设置捕获
    const setCapture = () => {
        thumb && thumb.setCapture && thumb.setCapture();
    }

    //释放捕获
    const releaseCapture = () => {
        thumb && thumb.releaseCapture && thumb.releaseCapture();
    }

    const dragScrollbarHandle = () => {

        thumb.onmousedown = (event) => {

            let e = event || window.event;
            let t = e.clientY - thumb.offsetTop; //点击滚动条位置 距离顶部的距离

            document.onmousemove = function (subevent) {
                let se = subevent || window.event;
                let barTop = se.clientY - t; // 滚动条移动距离

                /**
                 * 内容区域随着拖动滚动条的移动
                 * （内容区域高度 -  外层容器高度） /  (外层容器高度 - 滚动条高度)   * 滚动条移动距离
                 */

                let contentTop = (wrap.scrollHeight - wrap.offsetHeight) / (wrap.offsetHeight - thumb.offsetHeight) * barTop;

                if (barTop < 0) {
                    barTop = 0
                }
                // 内容区域移动距离
                $(wrap).scrollTop(contentTop);
                // 防止拖动bar时选中文字
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            }
        }

        document.onmouseup = () => {
            //释放鼠标时，清除文档鼠标按下起来后的事件执行
            document.onmousemove = null

        }
    }

    // 如存在滚动条宽度，则向右移动模拟条
    if (scrollWidth) {
        wrap.style.marginRight = '-' + (scrollWidth + offset) + 'px'
    }

    $(wrap).css({
        overflowY: 'auto'
    });

    updateThumb();
    $(wrap).scroll(updateThumb);
    $(trail).click(clickTrackHandle);
    dragScrollbarHandle();

}

export default initScrollBar