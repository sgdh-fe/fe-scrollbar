
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
    }

    function clickTrackHandle(e) {
        //获取 点击位置 与 滚动框顶部 之间的距离
        let offset = Math.abs(e.target.getBoundingClientRect().top - e.clientY)
        //设置点击位置 处于滚动条的中间
        let thumbHalf = thumb.offsetHeight / 2;
        //计算得到滚动条在滚动框内的的百分比位置
        let thumbPositionPercentage = (offset - thumbHalf) * 100 / wrap.offsetHeight;
        //通过改变scrollTop 来改变滚动条
        wrap.scrollTop = (thumbPositionPercentage * wrap.scrollHeight / 100);
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
}

export default initScrollBar