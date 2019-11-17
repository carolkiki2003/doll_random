<script>
  /* eslint-disable */
  import { mapState } from 'vuex'
  import TripBtn from '../../components/TripBtn'
  import TripIcon from '../../components/TripIcon'
  import TripDoll from '../../components/TripDoll'
  import dollValueMap from '../../../public/api/dollValueMap.json'
  import category2 from '../../../public/api/category2.json'
  import category3 from '../../../public/api/category3.json'
  import category4 from '../../../public/api/category4.json'
  import all from '../../../public/api/all.json'
  import message from '../../../public/api/message.json'

  import categoryThird01 from '../../../public/category3Map/01.json'
  import categoryThird02 from '../../../public/category3Map/02.json'
  import categoryThird03 from '../../../public/category3Map/03.json'
  import categoryThird04 from '../../../public/category3Map/04.json'
  import categoryThird05 from '../../../public/category3Map/05.json'
  import categoryThird06 from '../../../public/category3Map/06.json'
  import categoryThird07 from '../../../public/category3Map/07.json'
  import categoryThird08 from '../../../public/category3Map/08.json'
  import categoryThird09 from '../../../public/category3Map/09.json'
  import categoryThird10 from '../../../public/category3Map/10.json'
  import categoryThird311 from '../../../public/category3Map/11.json'
  import categoryThird12 from '../../../public/category3Map/12.json'
  import categoryThird13 from '../../../public/category3Map/13.json'
  import categoryThird14 from '../../../public/category3Map/14.json'
  import categoryThird15 from '../../../public/category3Map/15.json'
  import categoryThird16 from '../../../public/category3Map/16.json'
  import categoryThird17 from '../../../public/category3Map/17.json'
  import categoryThird18 from '../../../public/category3Map/18.json'
  import categoryThird19 from '../../../public/category3Map/19.json'
  import categoryThird20 from '../../../public/category3Map/20.json'

  import dollSpriteMaps01 from '../../../public/api/dollSpriteMaps01.json'
  import dollSpriteMaps02 from '../../../public/api/dollSpriteMaps02.json'
  import dollSpriteMaps03 from '../../../public/api/dollSpriteMaps03.json'
  import dollSpriteMaps04 from '../../../public/api/dollSpriteMaps04.json'
  import dollSpriteMaps05 from '../../../public/api/dollSpriteMaps05.json'
  import dollSpriteMaps06 from '../../../public/api/dollSpriteMaps06.json'
  import dollSpriteMaps07 from '../../../public/api/dollSpriteMaps07.json'
  import dollSpriteMaps08 from '../../../public/api/dollSpriteMaps08.json'
  import dollSpriteMaps09 from '../../../public/api/dollSpriteMaps09.json'
  import dollSpriteMaps10 from '../../../public/api/dollSpriteMaps10.json'
  import dollSpriteMaps11 from '../../../public/api/dollSpriteMaps11.json'
  import dollSpriteMaps12 from '../../../public/api/dollSpriteMaps12.json'
  import dollSpriteMaps13 from '../../../public/api/dollSpriteMaps13.json'
  import dollSpriteMaps14 from '../../../public/api/dollSpriteMaps14.json'
  import dollSpriteMaps15 from '../../../public/api/dollSpriteMaps15.json'
  import dollSpriteMaps16 from '../../../public/api/dollSpriteMaps16.json'
  import dollSpriteMaps17 from '../../../public/api/dollSpriteMaps17.json'
  import dollSpriteMaps18 from '../../../public/api/dollSpriteMaps18.json'
  import dollSpriteMaps19 from '../../../public/api/dollSpriteMaps19.json'
  import dollSpriteMaps20 from '../../../public/api/dollSpriteMaps20.json'
  import { async } from 'q'
  import { parse } from 'path'

  export default {
    name: 'TripDollEditContainer',
    components: {
      TripBtn,
      TripDoll,
      TripIcon
    },
    // props: {
    //   showCategory1: {
    //     type: String,
    //     default: ''
    //   },
    //   canvasScale: {
    //     type: Number,
    //     default: 0.8
    //   },
    //   canvasMaxSize: {
    //     type: Number,
    //     default: 960
    //   }
    // },
    data() {
      return {
        doll: null,
        resizeStatus: false,
        sceneStatus: {
          current: 'CategoryFirst',
          firstInit: false
        },
        categoriesId: {
          category1: null,
          category2: null,
          category3: null,
          category4: null
        },
        dollSpriteMaps: {
          '01': dollSpriteMaps01,
          '02': dollSpriteMaps02,
          '03': dollSpriteMaps03,
          '04': dollSpriteMaps04,
          '05': dollSpriteMaps05,
          '06': dollSpriteMaps06,
          '07': dollSpriteMaps07,
          '08': dollSpriteMaps08,
          '09': dollSpriteMaps09,
          '10': dollSpriteMaps10,
          '11': dollSpriteMaps11,
          '12': dollSpriteMaps12,
          '13': dollSpriteMaps13,
          '14': dollSpriteMaps14,
          '15': dollSpriteMaps15,
          '16': dollSpriteMaps16,
          '17': dollSpriteMaps17,
          '18': dollSpriteMaps18,
          '19': dollSpriteMaps19,
          '20': dollSpriteMaps20
        },
        sticker: {
          hair: 'A_01_0100007_01', // 髮型
          face: 'A_02_0200003_11', // 臉(含耳朵)
          eyebrow: 'A_03_0300008_01', // 眉毛
          eye: 'A_04_0400004_01', // 眼睛
          nose: 'A_05_0500002_01', // 鼻子
          mouth: 'A_06_0600009_01', // 嘴巴
          face_features: '', // 臉上特徵
          beard: '', // 鬍子
          clothes: 'B_09_0900003_05', // 一般衣服(上半身)
          wristband: 'B_10_1000001_05', // 手套
          coat: '', // 外套大衣
          belt: '', // 皮帶(下半身)
          pants: 'C_13_1300003_05', // 褲子
          socks: '', // 襪子
          shoes: 'C_15_1500001_05', // 鞋子
          glasses: '', // 眼鏡
          earing: '', // 耳環
          necklace: '', // 項鍊
          body_features: '', // 其他配件
          head_features: '' // 頭飾
          // bg: '' // 背景
        },
        keepSticker: '',
        savedSticker: [],
        isDrawing: true,
        saveBtnClicked: false,
        memberItem: [],
        showCategory1: '',
        canvasScale: 0.8,
        canvasMaxSize: 960,
        messagetext: '',
        thumbnailUp: false
      }
    },
    props: {
      decodeText: {
        type: String,
        default: ''
      }
    },
    computed: {
      getLayerArrSort() {
        return this.getLayerArr.slice().sort((a, b) => b.id - a.id)
      },
      getLayerArr() {
        let arr = []
        for (let prop in this.sticker) {
          let target = this.sticker[prop]
          if (target) {
            let targetIdSplit = target.split('_')
            let found = category3.find(el => el.id === targetIdSplit[2])
            if (found) found = JSON.parse(JSON.stringify(found))

            if (found && found.layer) {
              found.layer.forEach(ly => {
                this.$set(ly, 'src', '/images/doll/' + ly.id + '/' + this.sticker[prop] + '.png')
              })
              arr.push(...found.layer)
            }
          }
        }
        return arr
      },
      stickerIds() {
        // 大類 | 中類 | 元件 | 顏色
        let { category1, category2, category3, category4 } = this.categoriesId
        if (category1 && category2 && category3 && category4) {
          return category1 + '_' + category2 + '_' + category3 + '_' + category4
        }
        return null
      },
      // submitDataProfile() {
      //   return {
      //     memberId: (this.user && this.user.memberId) || '',
      //     sticker: JSON.stringify(this.user.sticker),
      //     nickname: (this.user && this.user.nickname) || '',
      //     gender: (this.user && this.user.gender) || ''
      //   }
      // },
      isPortrait() {
        return this.wh > this.ww
      },
      canvasSize() {
        if (this.isPortrait) {
          return this.wh > this.canvasMaxSize ? this.canvasMaxSize : this.wh
        } else {
          return this.ww > this.canvasMaxSize ? this.canvasMaxSize : this.ww
        }
      },
      ...mapState({
        stickerStore: state => {
          if (typeof state.trip.user.sticker === 'string') {
            return JSON.parse(state.trip.user.sticker)
          } else return state.trip.user.sticker
        },
        user: state => state.trip.user,
        ww: state => state.userAgent.browser.width,
        wh: state => state.userAgent.browser.height,
        orientation: state => state.userAgent.browser.orientation
      })
    },
    methods: {
      // sendCodeChild() {
      //   let decode = this.decodeText.replace(/^\"|\"$/g, '')
      //   let newDecodeText = JSON.parse(atob(decode))
      //   this.sticker = Object.assign({}, this.sticker, newDecodeText)
      //   this.doll.drawDoll()
      // },
      sendCodeChild() {
        let decode = []
        let foundArr = []
        //去除字串引號
        // let text = this.decodeText.replace(/^\"|\"$/g, '')
        console.log(this.decodeText)
        if (this.decodeText.match(/^\d{80}$/)) {
          console.log('!!')
          //字串拆解4個數字一組
          for (let i = 0; i < 80; i = i + 4) {
            decode.push(this.decodeText.substr(i, 4))
          }
          //利用4個數字在all.json找出對應sticker
          for (let i = 0; i < 20; i++) {
            let found = ''
            if (decode[i] === '0000') {
              foundArr[i] = ''
            } else {
              foundArr[i] = all[i].child.find(el => el.substr(10).replace('_', '') === decode[i])
            }
          }
          //對應sticker
          let Arr = {
            hair: foundArr[0], // 髮型
            face: foundArr[1], // 臉(含耳朵)
            eyebrow: foundArr[2], // 眉毛
            eye: foundArr[3], // 眼睛
            nose: foundArr[4], // 鼻子
            mouth: foundArr[5], // 嘴巴
            face_features: foundArr[6], // 臉上特徵
            beard: foundArr[7], // 鬍子
            clothes: foundArr[8], // 一般衣服(上半身)
            wristband: foundArr[9], // 手套
            coat: foundArr[10], // 外套大衣
            belt: foundArr[11], // 皮帶(下半身)
            pants: foundArr[12], // 褲子
            socks: foundArr[13], // 襪子
            shoes: foundArr[14], // 鞋子
            glasses: foundArr[15], // 眼鏡
            earing: foundArr[16], // 耳環
            necklace: foundArr[17], // 項鍊
            body_features: foundArr[18], // 其他配件
            head_features: foundArr[19] // 頭飾
          }
          this.sticker = Object.assign({}, this.sticker, Arr)
          this.doll.drawDoll()
        } else {
          this.$emit('stickerErrMsg')
          console.log('sticker is error')
        }
      },
      pushSavedSticker() {
        let canvasDOM = document.getElementById('doll_canvas')
        let data = canvasDOM.toDataURL('image/png')
        let code = ''
        for (let i in this.sticker) {
          let val = this.sticker[i]
          if (val === '') {
            // val = parseInt('1111').toString(16)
            val = '0000'
            code = code.concat(val)
          } else {
            val = this.sticker[i].substr(10)
            // val = parseInt(val.replace('_', '')).toString(16)
            // if (val.length < 3) {
            //   val = '0' + val
            // }
            val = val.replace('_', '')
            code = code.concat(val)
          }
        }
        console.log('code', code, code.length)
        this.savedSticker.push({
          base64Img: data,
          sticker: JSON.parse(JSON.stringify(this.sticker)),
          code: code
        })
      },
      saveDollSticker() {
        if (this.savedSticker.length > 4) {
          this.savedSticker.shift()
          this.pushSavedSticker()
          this.thumbnailUp = true
        } else this.pushSavedSticker()
      },
      setThumbnailIdx(sticker) {
        this.sticker = Object.assign({}, this.sticker, sticker)
        this.doll.drawDoll()
      },
      messageRandom(messagetext) {
        let m = Math.floor(Math.random() * message.length)
        async
        this.messagetext = message[m].text
        this.$emit('message', this.messagetext)
      },
      init() {
        this.doll = require('../../lib').doll()
        this.doll.init(this)
        this.sticker = Object.assign({}, this.sticker)
      },
      resizeCanvas() {
        let gameRatio = this.isPortrait ? 9 / 16 : 16 / 9
        const size = this.canvasSize * this.canvasScale
        let canvas = document.querySelector('#doll_canvas_content > canvas')
        if (canvas) {
          if (!this.isPortrait) {
            canvas.style.width = size + 'px'
            canvas.style.height = size / gameRatio + 'px'
          } else {
            canvas.style.width = size * gameRatio + 'px'
            canvas.style.height = size + 'px'
          }
          canvas.style.position = 'absolute'
          canvas.style.top = '50%'
          canvas.style.left = '50%'
          canvas.style.transform = 'translate3d(-50%, -50%, 0)'
          // canvas.style.backgroundImage = 'linear-gradient(-180deg, #ffffff 50%, #c7dae5)'
        }
        let frameGroup = this.$refs.frameGroup
        if (frameGroup) {
          if (!this.isPortrait) {
            frameGroup.style.width = size + 10 + 'px'
            frameGroup.style.height = size / gameRatio + 'px'
          } else {
            frameGroup.style.width = size * gameRatio + 10 + 'px'
            frameGroup.style.height = size + 'px'
          }
        }
      },
      resizeHandler() {
        if (this.doll) this.doll.changeLayout()
        this.resizeCanvas()
      },
      // async loadCategory3Api(mediumType) {
      //   let body = {
      //     url: `/api/trip/doll/item/${mediumType}/${this.user.memberId}`,
      //     method: 'get'
      //   }
      //   try {
      //     this.memberItem = await this.$axios.$request(body)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // },
      async loadCategory3Api(mediumType) {
        this.memberItem = require(`../../../public/category3Map/${mediumType}.json`)
      },
      setDollSticker(str) {
        if (!str) return false

        // 保留尚未儲存的 sticker
        if (!this.keepSticker) {
          this.keepSticker = JSON.stringify(this.sticker)
        }

        let strSplitArr = str.split('_')
        let category2Id = strSplitArr ? strSplitArr[1] : null // 中類

        let found = category2.find(el => el.id === category2Id)
        // 找到對應的資料
        if (found && found.id) {
          let value = this.getDollValueMap(found.id)
          if (value) {
            // 觸發 TripDoll 重繪
            if (this.sticker[value] !== str) this.isDrawing = true

            // 清空或更新元件
            if (str.includes('00000_00')) this.sticker[value] = ''
            else this.sticker[value] = str
          }
        }
      },
      getDollValueMap(id) {
        return dollValueMap[id].value || null
      },
      getIconFrameId(id) {
        return this.dollSpriteMaps[this.categoriesId.category2][id].frameId
      },
      resetSticker() {
        this.sticker = Object.assign({}, this.sticker)
        this.clearKeepSticker()
        if (this.doll) this.doll.drawDoll()
      },
      setRandom() {
        let start = null
        let s_keep = null
        let self = this
        function step(timestamp) {
          if (!start) start = timestamp
          var progress = timestamp - start

          var ms = Math.floor(progress / 150)
          if (s_keep !== ms) {
            s_keep = ms
            self.randomSticker()
          }
          if (progress < 1000) {
            window.requestAnimationFrame(step)
          }
        }
        window.requestAnimationFrame(step)
        if (this.keepSticker) {
          this.clearKeepSticker()
        }
        window.setTimeout(() => this.messageRandom(), 1000)
        // var a = setInterval(this.randomSticker, 100)
        // setInterval(this.randomSticker, 100)
        // setTimeout(clearInterval(a), 1000)
      },
      randomSticker() {
        for (let prop in this.sticker) {
          let found = all.find(el => el.name === prop)
          let a = Math.floor(Math.random() * found.child.length)
          async
          this.sticker[prop] = found.child[a].trim()
        }
        this.doll.drawDoll()
      },
      clearKeepSticker() {
        this.keepSticker = null
      },
      cancelDollSticker() {
        if (this.keepSticker) {
          this.sticker = Object.assign({}, this.sticker, JSON.parse(this.keepSticker))
        }
        this.clearKeepSticker()
      },
      base64toFile(url, filename, mimeType) {
        return fetch(url)
          .then(res => res.arrayBuffer())
          .then(buf => {
            return new File([buf], filename, { type: mimeType })
          })
        console.log('url:', url)
      },
      // async uploadStickerFile(dataUrl) {
      //   let file = await this.base64toFile(dataUrl, 'base64toImage.png', 'image/png')
      //   return await this.$mediaUpload(file)
      // },
      setDrawComplete() {
        // TripDoll canvas 完成繪製
        this.isDrawing = false
        if (this.saveBtnClicked) this.submit(0)
      },
      // async submit(status) {
      //   if (status) {
      //     this.$emit('setLoading', true)
      //     this.saveBtnClicked = true
      //   }
      //   if (this.isDrawing) return // TripDoll canvas 繪製中，跳出等待 callback 後重呼
      //   await this.canvasDrawHandler()
      //   this.close()
      //   this.$emit('setLoading', false)
      // },
      // async canvasDrawHandler() {
      //   let canvasDOM = document.getElementById('doll_canvas')
      //   if (canvasDOM) {
      //     let data = canvasDOM.toDataURL('image/png')

      //     // set sticker
      //     this.$store.commit('trip/SET_STICKER', this.sticker)
      //     this.$store.commit('trip/SET_STICKERPIC', data)

      //     let media = await this.uploadStickerFile(data)
      //     if (media && media.fileId) {
      //       let obj = Object.assign({}, this.submitDataProfile, {
      //         stickerPic: media.fileId
      //       })
      //       await this.$store.dispatch('trip/UPDATE_USER_PROFILE', obj)
      //     }
      //   }
      // },
      close() {
        this.$emit('close')
      }
    },
    watch: {
      // ww() {
      //   this.resizeHandler()
      // }
      orientation(newVal) {
        this.resizeHandler()
      }
    },
    mounted() {
      this.init()
      this.$root.$on('DOLL_STICKER', this.setDollSticker)
      this.$root.$on('DOLL_STICKER_CHECK', this.clearKeepSticker)
      this.$root.$on('DOLL_STICKER_CANCEL', this.cancelDollSticker)
    },
    beforeDestroy() {
      if (this.doll) {
        this.doll.destroy()
        this.doll = null
      }
      this.$root.$off('DOLL_STICKER')
      this.$root.$off('DOLL_STICKER_CHECK')
      this.$root.$off('DOLL_STICKER_CANCEL')
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />