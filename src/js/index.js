import './icons.js'
import swiper from './swiper.js'
class Player {
    constructor(node) {
        //判断node
        if (!node) { }
        if (typeof node == 'string') { }

        //初始化数据属性 类似于data
        //检测node类型
        this.root = typeof node === 'string' ? document.querySelector(node) : node
        this.songList = []
        this.lyricsArr = []
        this.lyricIndex = -1
        this.currentIndex = 0

        this.$ = selector => this.root.querySelector(selector)
        this.$$ = selector => this.root.querySelectorAll(selector)

        //执行方法
        this.audio = new Audio()
        this.init() //初始执行
        this.bind() //绑定事件

    }
    init() { //初始化方法 类似于created()
        //请求获取数据 songlist lyrics 
        fetch('https://jirengu.github.io/data-mock/huawei-music/music-list.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.songList = data
                //渲染到页面
                this.loadSong()
            })




    }

    //渲染到页面
    loadSong() {
        let songObj = this.songList[this.currentIndex] //获取当前第一个song
        this.$('.header h1').innerText = songObj.title
        this.$('.header p').innerText = songObj.author + '-' + songObj.albumn

        this.audio.src = songObj.url
        this.audio.onloadedmetadata = () => this.$('.time-end').innerText = this.formateTime(this.audio.duration)
        //onloadedmetadata事件在指定视频/音频(audio/video)的元数据加载后触发
        //加载歌词
        this.loadLyric()

    }
    //加载歌词  在首次加载首个歌曲  上、下一首会用到
    loadLyric() {
        fetach(this.songList[this.currentIndex].lyric)
            .then(res => res.json())
            .then(data => {
                console.log(data.lrc.lyric)
                //加载完歌词后 应该放在该放的DOM
                this.setLyrics(data.lrc.lyric)
                window.lyrics = data.lrx.lyric //?????
            })


    }
    //设置歌词
    setLyrics(lyrics) {
        this.lyricIndex = 0 //歌词下标
        let fragment = document.createDocumentFragement() //虚拟dom
        let lyricsArr = []
        this.lyricsArr = lyricsArr

        //对歌词里的时间 获取 去掉【】 
        lyrics.split(/\n/) // ["[00:00.343] fdf", "时间 歌词"]
            .filter(str => str.match(/\[.+?\]/))  //过滤出来所有的【】 创建一个数组
            .forEach(line => {
                let str = line.replace(/\[.+?\]/g, '')// 去掉【】
                line.match(/\[.+?\]/g).forEach(t => {
                    t = t.replace(/\[.+?\]/g, '')
                    let milliseconds = parseInt(t.slice(0, 2)) * 60 * 1000 + parseInt(t.slice(3, 5)) * 1000 + parseInt(t.slice(6))
                    lyricsArr.push([milliseconds, str])
                })
            })

        lyricsSrr.filter(line => {
            line[1].trim() !== ''
        }).sort((v1, v2) => {
            if (v1[0] > v2[0]) {
                return 1
            } else {
                return -1
            }
        }).forEach(line => {
            let node = document.createElement('P')
            node.setAttribute('data-time', line[0])
            node.innerText = line[1]
            fragment.appendChild(node)  //添加到虚拟dom
        })
        this.$('.panel-lyrics .container').innerHTML = ''
        //虚拟dom 添加到页面
        this.$('.panel-lyrics .container').appendChild(fragment)

    }
    formateTime(secondsTotal) {
        let minutes = parseInt(secondsTotal / 60)
        minutes = minutes >= 10 ? '' + minutes : '0' + minutes
        let seconds = parseInt(secondsTotal % 60)
        seconds = seconds >= 10 ? '' + seconds : '0' + seconds
        return minutes + ':' + seconds
    }






    bind() {// 绑定事件 类似于 mounted
        //点击 播放 暂停
        //上一曲 下一曲
        //用户滑动
        //歌词显示、进度条都根据audio时间变化 

        let self = this  //为了确保是一个this
        this.$('btn-play-pause').onclick = function () { //点击暂停按钮 改变状态和类名样式为pause
            if (this.classList.contains('playing')) {
                self.audio.pause()
                this.classList.remove('playing')
                this.classList.add('pause')
                this.querySelector('use').setAttribute('xlink:href', '#icon-play')
            } else if (this.classList.contains('pause')) {
                self.audio.play()
                this.classList.remove('pause')
                this.classList.add('playing')
                this.querySelector('use').setAttribute('xlink:href', '#icon-pause')

            }
        }

    }
}







