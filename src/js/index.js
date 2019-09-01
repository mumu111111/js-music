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
}