import './icons.js'
import swiper from './swiper.js'
class Player {
    constructor(node) {
        //判断node
        if (!node) { }
        if (typeof node == 'string') { }

        //初始化数据属性
        this.node
        this.lyrics = [] //设定数据结构

        //执行方法
        this.init() //初始执行
        this.bind() //绑定事件
    }
    init() {
        //请求获取数据 歌曲信息 
        //渲染到页面
    }
    bind() {
        //点击 播放 暂停
        //上一曲 下一曲
        //用户滑动
        //歌词显示、进度条都根据audio时间变化 

    }
}