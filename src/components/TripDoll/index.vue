<script>
  import category3 from '../../../public/api/category3.json'
  import dollLayerMap from '../../../public/api/dollLayerMap.json'
  export default {
    name: 'TripDoll',
    props: {
      sticker: {
        type: Object,
        default: function() {
          return {
            hair: '', // 髮型
            face: '', // 臉(含耳朵)
            eyebrow: '', // 眉毛
            eye: '', // 眼睛
            nose: '', // 鼻子
            mouth: '', // 嘴巴
            face_features: '', // 臉上特徵
            beard: '', // 鬍子
            clothes: '', // 一般衣服(上半身)
            wristband: '', // 手套
            coat: '', // 外套大衣
            belt: '', // 皮帶(下半身)
            pants: '', // 褲子
            socks: '', // 襪子
            shoes: '', // 鞋子
            glasses: '', // 眼鏡
            earing: '', // 耳環
            necklace: '', // 項鍊
            body_features: '', // 其他配件
            head_features: '', // 頭飾
            bg: '' // 背景
          }
        }
      }
    },
    data() {
      return {
        drawWidth: 1024,
        drawHeight: 1024
      }
    },
    computed: {
      canvasDOM() {
        return document.getElementById('doll_canvas')
      },
      ctx() {
        return this.canvasDOM ? this.canvasDOM.getContext('2d') : null
      },
      getLayerArrSortLen() {
        return this.getLayerArrSort.length
      },
      getLayerArrSort() {
        return this.getLayerArr.slice().sort((a, b) => b.id - a.id)
      },
      getLayerArr() {
        let arr = []
        for (let prop in this.sticker) {
          let target = this.sticker[prop]
          if (target) {
            let targetIdSplit = target.split('_')

            // 00_00_00000_00 大類 中類 元件 顏色
            let found = category3.find(el => el.id === targetIdSplit[2])

            if (found && found.layer) {
              // 針對每個 layer 加入各個元件的 id 組成 src
              found.layer.forEach(ly => {
                this.$set(ly, 'src', '/images/doll/' + ly.id + '/' + this.sticker[prop] + '.png')
              })
              arr.push(...found.layer)
            }
          }
        }

        return arr
      }
    },
    methods: {
      getDollLayer(id) {
        return dollLayerMap[id] ? dollLayerMap[id].position : null
      },
      load(path, pos, complete, reject) {
        if (path) {
          let imgDOM = new Image()
          imgDOM.setAttribute('crossOrigin', 'Anonymous')
          imgDOM.src = path
          imgDOM.onload = DOM => {
            complete(DOM.srcElement, pos)
          }
          imgDOM.onerror = reject
        }
      },
      draw() {
        this.$emit('drawStart') // 告訴父層開始畫紙娃娃

        this.ctx.clearRect(0, 0, this.drawWidth, this.drawHeight)

        let count = 0

        let complete = (imgDOM, pos) => {
          this.ctx.drawImage(imgDOM, pos.left, pos.top, pos.width, pos.height)
          count += 1
          callback()
        }

        let reject = () => console.log('reject')

        let callback = () => {
          if (count < this.getLayerArrSortLen) {
            let target = this.getLayerArrSort[count]
            this.load(target.src, this.getDollLayer(target.id), complete, reject)
          } else if (this.getLayerArrSortLen) {
            this.$emit('drawComplete') // 告訴父層畫完紙娃娃
          }
        }

        callback()
      }
    },
    watch: {
      sticker: {
        handler: function() {
          this.draw()
        },
        deep: true
      }
    },
    mounted() {
      this.draw()
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />