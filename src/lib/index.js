import { Game as PhaserGame } from 'phaser'
import { Scene as PhaserScene } from 'phaser'
import { Geom as PhaserGeom } from 'phaser'

import dollColorMap from '../../public/api/dollColorMap.json'
import dollLayerMap from '../../public/api/dollLayerMap.json'
import category1 from '../../public/api/category1.json' // 大類對中類靜態資料
import category2 from '../../public/api/category2.json'
// import allLayerPhoto from '../../public/api/allLayerPhoto.json'
import dollSpriteMapbm from '../../public/api/dollSpriteMapbm.json'

export function doll() {
  const iconScale = 2
  const iconSize = 70 * iconScale
  const iconMargin = 10
  const colorSize = 50
  const colorMargin = 10

  // 主場景
  class SceneMain extends PhaserScene {
    constructor() {
      super({ key: 'SceneMain', active: true })
    }
    create() {
      if (VM) VM.resizeCanvas()
    }
  }

  // 紙娃娃預覽場景
  class Doll extends PhaserScene {
    constructor() {
      super({ key: 'Doll', active: true })

      this.dollGroup = null
      // this.resetBtn = null
      // this.randomBtn = null
    }
    preload() {
      VM.getLayerArrSort.forEach(el => {
        this.load.image('doll_' + el.src, el.src)
      })
      this.load.spritesheet('iconSprite0', '/images/iconSprite.png', {
        frameWidth: 40,
        frameHeight: 40
      })
      // allLayerPhoto.forEach(el => {
      //   el.child.forEach(child => {
      //     if (child) {
      //       let str = '/images/doll/' + el.layer + '/' + child + '.png'
      //       this.load.image(`${child}`, str)
      //     }
      //   })
      // })
    }
    create() {
      // let graphics = this.add.graphics()
      // graphics.fillStyle(0xdae5c7, 1)
      // graphics.fillRect(0, 100, 700, 700)

      this.setDoll()
      // this.setIcon()

      if (VM) VM.resizeCanvas()
    }
    setDoll() {
      if (this.dollGroup) this.dollGroup.destroy()
      let ratio = 700 / 1024
      let w = VM.isPortrait ? 700 : 1600
      let h = VM.isPortrait ? 1600 : 700
      let x = VM.isPortrait ? w / 2 - 350 * ratio : 50
      let y = VM.isPortrait ? 100 : h / 2 - 350 * ratio

      this.dollGroup = this.add.container().setPosition(x, y)
      VM.getLayerArrSort.forEach(el => {
        let dollComponent = this.add
          .image(
            dollLayerMap[el.id].position.left * ratio,
            dollLayerMap[el.id].position.top * ratio,
            'doll_' + el.src
          )
          .setScale(ratio)
          .setOrigin(0, 0)
        this.dollGroup.add(dollComponent)
      })
    }
    // setIcon() {
    //   let x = VM.isPortrait ? 650 : 600
    //   let y = 730
    //   this.resetBtn = this.add
    //     .sprite(x, y, 'iconSprite0')
    //     .setFrame(12)
    //     .setOrigin(0)
    //     .setScale(2)
    //     .setInteractive({ useHandCursor: true })
    //   this.resetBtn.on('pointerdown', () => {
    //     VM.resetSticker()
    //   })
    //   this.randomBtn = this.add
    //     .sprite(x, y, 'iconSprite0')
    //     .setFrame(13)
    //     .setOrigin(0, 1)
    //     .setScale(2)
    //     .setInteractive({ useHandCursor: true })
    //   this.randomBtn.on('pointerdown', () => {
    //     VM.setRandom()
    //   })
    // }
    drawDoll() {
      let self = this
      this.load.once('complete', loadImageComplete)
      VM.getLayerArrSort.forEach(el => {
        this.load.image('doll_' + el.src, el.src)
      })
      this.load.start()

      function loadImageComplete() {
        self.setDoll()
      }
    }
  }

  // 大類
  class CategoryFirst extends PhaserScene {
    constructor() {
      super({ key: 'CategoryFirst', active: true })
      this.width = 900
      this.height = 700
      this.px = VM.isPortrait ? 0 : 700
      this.py = VM.isPortrait ? 800 : 100
      this.iconContainer = null
      this.btnContainer = null
    }
    preload() {
      this.load.spritesheet(
        'icon1',
        '/images/iconSprite/dollIconSpritebm.png',
        {
          frameWidth: 70,
          frameHeight: 70
        }
      )
      this.load.image('tripBtn1', '/images/tripBtn.png')
    }
    create() {
      this.cameras.main.setViewport(this.px, this.py, this.width, this.height)

      // let graphics = this.add.graphics()
      // graphics.fillStyle(0xc7dae5, 1)
      // graphics.fillRect(0, 0, 900, 700)

      this.add.text(
        (this.width - iconSize * 4) / 2,
        (this.height - iconSize) / 4 - 50,
        '請選擇五官、衣服、褲子、飾品',
        {
          fontSize: '40px',
          fontFamily: 'Microsoft JhengHei, sans-serif',
          fill: '#474747'
        }
      )

      // 大類列表
      const iconListLen = category1 && category1.length
      this.iconContainer = this.add
        .container(
          (this.width - iconSize * 4) / 2,
          (this.height - iconSize) / 2
        )
        .setSize((iconSize + iconMargin) * iconListLen, iconSize)
        .setName('iconContainer')
      for (let i = 0; i < iconListLen; i++) {
        const item = this.add
          .sprite((iconSize + iconMargin) * i, 0, 'icon1')
          .setFrame(i)
          .setOrigin(0)
          .setScale(iconScale)
          .setName(`icon${category1[i].id}`)
          .setInteractive({ useHandCursor: true })
        let itemFrame = this.add.graphics({ fillStyle: { color: 0x005673 } })
        itemFrame.fillRoundedRect(
          (iconSize + iconMargin) * i,
          0,
          iconSize,
          iconSize,
          3
        )
        this.iconContainer.add([itemFrame, item])
      }

      drawBtn('CategoryFirst', 'tripBtn1', [
        // {
        //   name: 'saveBtn',
        //   text: '儲存'
        // },
        // {
        //   name: 'cancelBtn',
        //   text: '取消'
        // }
      ])

      this.input.on('gameobjectdown', (pointer, obj) => {
        if (obj.name.includes('icon')) {
          VM.categoriesId.category1 = obj.name.substr(4, 5)
          this.scene.switch('CategorySecond')
          VM.sceneStatus.current = 'CategorySecond'
        } else if (obj.name.includes('saveBtn')) {
          // VM.submit(1)
        } else if (obj.name.includes('cancelBtn')) {
          VM.close()
        }
      })

      if (VM) {
        VM.resizeCanvas()
        if (VM.sceneStatus.firstInit) {
          // 初始資料有指定特定大類，切到其對應中類列表
          VM.sceneStatus.firstInit = false
          VM.categoriesId.category1 = VM.showCategory1
          this.scene.switch('CategorySecond')
          VM.sceneStatus.current = 'CategorySecond'
        } else if (VM.sceneStatus.current) {
          // resize 重啟遊戲時，右側切至上次紀錄場景
          this.scene.switch(VM.sceneStatus.current)
        }
      }
    }
  }

  // 中類
  class CategorySecond extends PhaserScene {
    constructor() {
      super({ key: 'CategorySecond', active: false })
      this.width = 900
      this.height = 700
      this.px = VM.isPortrait ? 0 : 700
      this.py = VM.isPortrait ? 800 : 100
      this.iconContainer = null
      this.originCategory1 = null
      this.btnContainer = null
      this.instructionText = null
    }
    preload() {
      this.load.spritesheet(
        'icon2',
        '/images/iconSprite/dollIconSpritebm.png',
        {
          frameWidth: 70,
          frameHeight: 70
        }
      )
      this.load.image('tripBtn2', '/images/tripBtn.png')
    }
    create() {
      this.cameras.main.setViewport(this.px, this.py, this.width, this.height)

      // let graphics = this.add.graphics()
      // graphics.fillStyle(0xe5dac7, 1)
      // graphics.fillRect(0, 0, 900, 700)

      drawBtn('CategorySecond', 'tripBtn2', [
        {
          name: 'lastBtn',
          text: '上一步'
        }
      ])

      this.input.on('gameobjectdown', async (pointer, obj) => {
        if (obj.name.includes('icon')) {
          const mediumType = obj.name.substr(4, 6)
          VM.categoriesId.category2 = mediumType
          this.scene.switch('CategoryThird')
          VM.sceneStatus.current = 'CategoryThird'
        } else if (obj.name.includes('lastBtn')) {
          if (this.instructionText) this.instructionText.destroy()
          this.scene.switch('CategoryFirst')
          VM.sceneStatus.current = 'CategoryFirst'
          this.originCategory1 = null
        }
      })
      if (VM) VM.resizeCanvas()
    }
    update() {
      if (this.originCategory1 !== VM.categoriesId.category1) {
        this.originCategory1 = VM.categoriesId.category1
        if (this.iconContainer) this.iconContainer.destroy()

        // 根據選擇大類，配置中類圖示列表
        let categoryObj1 = {}
        if (category1) {
          categoryObj1 = category1.find(el => {
            return el.id === VM.categoriesId.category1
          })
        }
        if (categoryObj1) {
          if (this.instructionText) this.instructionText.destroy()

          this.instructionText = this.add.text(
            (this.width - iconSize * 4) / 2,
            (this.height - iconSize) / 4 - 50,
            `請選擇你要更換的${categoryObj1.name}`,
            {
              fontSize: '40px',
              fontFamily: 'Microsoft JhengHei, sans-serif',
              fill: '#474747'
            }
          )

          // categoryObj1 === null
        }

        const iconListLen =
          categoryObj1 && categoryObj1.child && categoryObj1.child.length
        const rowLen = (iconListLen > 4) + 1
        this.iconContainer = this.add
          .container(
            (this.width - iconSize * 4) / 2,
            (this.height - iconSize * rowLen) / 2
          )
          .setSize((iconSize + iconMargin) * 4, iconSize * rowLen)
          .setName('iconContainer')
        for (let i = 0; i < iconListLen; i++) {
          const itemId = categoryObj1.child[i].id
          const frameId = dollSpriteMapbm[itemId].frameId
          const item = this.add
            .sprite(
              (iconSize + iconMargin) * (i % 4),
              (iconSize + iconMargin) * (i > 3),
              'icon2'
            )
            .setFrame(frameId)
            .setOrigin(0)
            .setScale(iconScale)
            .setName(`icon${itemId}`)
            .setInteractive({ useHandCursor: true })
          let itemFrame = this.add.graphics({ fillStyle: { color: 0x009ab7 } })
          itemFrame.fillRoundedRect(
            (iconSize + iconMargin) * (i % 4),
            (iconSize + iconMargin) * (i > 3),
            iconSize,
            iconSize,
            3
          )
          this.iconContainer.add([itemFrame, item])
        }
      }
      this.instructionText === null
    }
  }

  // 小類
  class CategoryThird extends PhaserScene {
    constructor() {
      super({ key: 'CategoryThird', active: false })
      this.width = 900
      this.height = 700
      this.px = VM.isPortrait ? 0 : 700
      this.py = VM.isPortrait ? 800 : 100
      this.originCategory2 = null
      this.iconContainer = null
      this.pageSizeLimit = 8
      this.pageIndex = 0
      this.totalPage = 0
      this.changePage = false
      this.nextBtn = null
      this.prevBtn = null
      this.categoryArr2 = []
      this.iconListLen = 0
      this.originCategory3 = null
      this.categoryArr3 = []
      this.colorContainer = null
      this.colorListLen = 0
      this.btnContainer = null
      this.loadingAnims = null
      this.instructionText = null
    }
    preload() {
      for (let i = 1; i < 21; i++) {
        const id = i.toString().padStart(2, '0')
        this.load.spritesheet(
          `dollIconSprite${id}`,
          `/images/iconSprite/dollIconSprite${id}.png`,
          {
            frameWidth: 70,
            frameHeight: 70
          }
        )
      }
      this.load.spritesheet('iconSprite3', '/images/iconSprite.png', {
        frameWidth: 40,
        frameHeight: 40
      })
      this.load.image('tripBtn3', '/images/tripBtn.png')
      this.load.atlas(
        'tripLoadingSprite',
        '/images/loadingDollSprite.png',
        '/api/loadingDollSprite.json'
      )
    }
    create() {
      this.cameras.main.setViewport(this.px, this.py, this.width, this.height)

      let graphics = this.add.graphics()
      graphics.fillStyle(0xffffff, 0)
      graphics.fillRect(0, 0, 900, 700)

      // loading 動畫
      this.anims.create({
        key: 'setLoading',
        frames: this.anims.generateFrameNames('tripLoadingSprite'),
        frameRate: 8, // FPS
        repeat: -1 // set to (-1) to repeat forever
      })
      this.loadingAnims = this.add
        .sprite(this.width / 2, this.height / 2, 'loading')
        .setAlpha(0)
        .play('setLoading')

      this.nextBtn = this.add
        .sprite(800, this.height / 2 - 40, 'iconSprite3')
        .setFrame(13)
        .setOrigin(0)
        .setAlpha(0)
        .setScale(2)
        .setName('nextBtn')
        .setInteractive({ useHandCursor: true })

      this.prevBtn = this.add
        .sprite(40, this.height / 2 - 40, 'iconSprite3')
        .setFrame(6)
        .setOrigin(0)
        .setAlpha(0)
        .setScale(2)
        .setName('prevBtn')
        .setInteractive({ useHandCursor: true })

      this.input.on('gameobjectdown', (pointer, obj) => {
        if (obj.name.includes('cancelBtn')) {
          this.pageIndex = 0
          this.totalPage = 0
          this.changePage = false
          this.categoryArr2 = []
          this.iconListLen = 0
          this.prevBtn.setAlpha(0)
          this.nextBtn.setAlpha(0)
          this.originCategory2 = null
          this.originCategory3 = null
          VM.categoriesId.category3 = null
          if (this.instructionText) this.instructionText.destroy()
          if (this.colorContainer) this.colorContainer.destroy()
          this.categoryArr3 = []
          this.colorListLen = 0
          this.redrawBtn(0, 0)
          VM.$root.$emit('DOLL_STICKER_CANCEL')
          drawDoll()
          this.scene.switch('CategorySecond')
          VM.sceneStatus.current = 'CategorySecond'
        } else if (obj.name.includes('saveBtn')) {
          this.pageIndex = 0
          this.totalPage = 0
          this.changePage = false
          this.categoryArr2 = []
          this.iconListLen = 0
          this.prevBtn.setAlpha(0)
          this.nextBtn.setAlpha(0)
          this.originCategory2 = null
          this.originCategory3 = null
          VM.categoriesId.category3 = null
          if (this.instructionText) this.instructionText.destroy()
          if (this.colorContainer) this.colorContainer.destroy()
          this.categoryArr3 = []
          this.colorListLen = 0
          this.redrawBtn(0, 0)
          VM.$root.$emit('DOLL_STICKER_CHECK')
          drawDoll()

          this.scene.switch('CategoryFirst')
          VM.sceneStatus.current = 'CategoryFirst'
        } else if (
          obj.name.includes('nextBtn') &&
          this.pageIndex < this.totalPage - 1
        ) {
          this.changePage = true
          this.pageIndex += 1
        } else if (obj.name.includes('prevBtn') && this.pageIndex > 0) {
          this.changePage = true
          this.pageIndex -= 1
        } else if (obj.name.includes('icon')) {
          VM.categoriesId.category3 = obj.name.substr(4, 11)
          if (this.categoryArr2) {
            this.categoryArr3 = this.categoryArr2.find(el => {
              return el.item === VM.categoriesId.category3
            })
          }
          if (this.categoryArr3.item.substr(2, 7) === '00000') {
            VM.categoriesId.category4 = '00'
          } else {
            VM.categoriesId.category4 =
              this.categoryArr3.color &&
              this.categoryArr3.color[0] &&
              this.categoryArr3.color[0].id
          }
          VM.$root.$emit('DOLL_STICKER', VM.stickerIds)
          drawDoll()
          this.redrawBtn(1, 1)
        } else if (obj.name.includes('color')) {
          VM.categoriesId.category4 = obj.name.substr(5, 7)
          VM.$root.$emit('DOLL_STICKER', VM.stickerIds)
          drawDoll()
        }
      })

      if (VM) VM.resizeCanvas()
    }
    async update() {
      // 根據選擇中類，配置小類圖示列表
      if (this.originCategory2 !== VM.categoriesId.category2) {
        this.originCategory2 = VM.categoriesId.category2
        if (this.iconContainer) this.iconContainer.destroy()
        this.loadingAnims.setAlpha(1)
        await VM.loadCategory3Api(this.originCategory2)
        if (VM.memberItem && VM.memberItem.length > 0) {
          this.categoryArr2 = VM.memberItem
        }
        let categoryObj2 = {}
        if (category2) {
          categoryObj2 = category2.find(el => {
            return el.id === VM.categoriesId.category2
          })
        }
        if (categoryObj2 && VM.memberItem.length > 1) {
          this.instructionText = this.add.text(
            (this.width - iconSize * 4) / 2,
            30,
            `請選擇你喜歡的${categoryObj2.name}`,
            {
              fontSize: '40px',
              fontFamily: 'Microsoft JhengHei, sans-serif',
              fill: '#474747'
            }
          )
        }
        this.iconListLen = this.categoryArr2 && this.categoryArr2.length
        this.totalPage = Math.ceil(this.iconListLen / 8)
        this.iconContainer = this.add
          .container(
            (this.width - iconSize * 4) / 2,
            (this.height - iconSize * 2) / 2
          )
          .setSize((iconSize + iconMargin) * 4, iconSize * 2)
          .setName('iconContainer')
        const size = this.totalPage > 1 ? 8 : this.iconListLen
        // 繪製小類列表
        if (this.iconListLen > 1) {
          for (let i = 0; i < size; i++) {
            const itemId = this.categoryArr2[i].item
            const frameId = VM.getIconFrameId(itemId)
            const item = this.add
              .sprite(
                (iconSize + iconMargin) * (i % 4),
                (iconSize + iconMargin) * (i > 3),
                `dollIconSprite${this.originCategory2}`
              )
              .setFrame(frameId)
              .setOrigin(0)
              .setScale(iconScale)
              .setName(`icon${itemId}`)
              .setInteractive({ useHandCursor: true })
            let itemFrame = this.add.graphics({
              fillStyle: { color: 0x00defb }
            })
            itemFrame.fillRoundedRect(
              (iconSize + iconMargin) * (i % 4),
              (iconSize + iconMargin) * (i > 3),
              iconSize,
              iconSize,
              3
            )
            this.iconContainer.add([itemFrame, item])
          }
        } else if (categoryObj2) {
          this.instructionText = this.add.text(
            (this.width - iconSize * 4) / 2,
            (this.height - iconSize * 2) / 2,
            `你目前沒有${categoryObj2.name}配件`,
            {
              fontSize: '40px',
              fontFamily: 'Microsoft JhengHei, sans-serif',
              fill: '#474747'
            }
          )
        }
        if (this.totalPage > 1) {
          this.nextBtn.setAlpha(1)
        }
        this.redrawBtn(0, 1)
        this.loadingAnims.setAlpha(0)
      }
      // 小類中分頁切換
      if (this.changePage) {
        this.changePage = false
        if (this.pageIndex === this.totalPage - 1) {
          this.nextBtn.setAlpha(0)
        } else {
          this.nextBtn.setAlpha(1)
        }
        if (this.pageIndex === 0) {
          this.prevBtn.setAlpha(0)
        } else {
          this.prevBtn.setAlpha(1)
        }
        if (this.iconContainer) this.iconContainer.destroy()
        this.iconContainer = this.add
          .container(
            (this.width - iconSize * 4) / 2,
            (this.height - iconSize * 2) / 2
          )
          .setSize((iconSize + iconMargin) * 4, iconSize * 2)
          .setName('iconContainer')
        // 繪製小類列表
        let start = this.pageIndex * this.pageSizeLimit
        let end =
          this.pageIndex !== this.totalPage - 1 && this.totalPage > 1
            ? (this.pageIndex + 1) * this.pageSizeLimit
            : this.iconListLen
        for (let i = start; i < end; i++) {
          const itemId = this.categoryArr2[i].item
          const frameId = VM.getIconFrameId(itemId)
          const item = this.add
            .sprite(
              (iconSize + iconMargin) * (i % 4),
              (iconSize + iconMargin) * (i > 3 + start),
              `dollIconSprite${this.originCategory2}`
            )
            .setFrame(frameId)
            .setOrigin(0)
            .setScale(iconScale)
            .setName(`icon${itemId}`)
            .setInteractive({ useHandCursor: true })
          let itemFrame = this.add.graphics({ fillStyle: { color: 0x00defb } })
          itemFrame.fillRoundedRect(
            (iconSize + iconMargin) * (i % 4),
            (iconSize + iconMargin) * (i > 3 + start),
            iconSize,
            iconSize,
            3
          )
          this.iconContainer.add([itemFrame, item])
        }
      }
      // 切換小類，顯示對應顏色列表
      if (this.originCategory3 !== VM.categoriesId.category3) {
        this.originCategory3 = VM.categoriesId.category3
        if (this.colorContainer) this.colorContainer.destroy()
        this.colorListLen =
          this.categoryArr3 &&
          this.categoryArr3.color &&
          this.categoryArr3.color.length
        this.colorContainer = this.add
          .container(
            (this.width - iconSize * 4) / 2,
            (this.height - iconSize * 2) / 4
          )
          .setSize(
            (colorSize + colorMargin) * this.colorListLen + colorMargin,
            colorSize + colorMargin * 2
          )
          .setName('colorContainer')
        if (this.colorListLen > 0) {
          let containerFrame = this.add.graphics({
            fillStyle: { color: 0xffffff }
          })
          containerFrame
            .fillRoundedRect(
              0,
              0,
              (colorSize + colorMargin) * this.colorListLen + colorMargin,
              colorSize + colorMargin * 2,
              3
            )
            .lineStyle(2, 0xe0e0e0, 1)
            .strokeRoundedRect(
              0,
              0,
              (colorSize + colorMargin) * this.colorListLen + colorMargin,
              colorSize + colorMargin * 2,
              3
            )
          this.colorContainer.add(containerFrame)
          for (let i = 0; i < this.colorListLen; i++) {
            const itemId = this.categoryArr3.color[i].id
            let frameColor = '0x000000'
            if (
              dollColorMap &&
              dollColorMap[itemId] &&
              dollColorMap[itemId].color
            ) {
              frameColor = `0x${dollColorMap[itemId].color.substr(1, 7)}`
            }
            const itemFrameContainer = this.add
              .container(
                (colorSize + colorMargin) * i + colorMargin,
                colorMargin
              )
              .setSize(colorSize, colorSize)
              .setName(`color${itemId}`)
            const shape = new PhaserGeom.Rectangle(
              colorSize / 2,
              colorSize / 2,
              colorSize,
              colorSize
            )
            itemFrameContainer.setInteractive({
              hitArea: shape,
              hitAreaCallback: PhaserGeom.Rectangle.Contains,
              useHandCursor: true
            })
            let itemFrame = this.add.graphics({
              fillStyle: { color: frameColor }
            })
            itemFrame.fillRoundedRect(0, 0, colorSize, colorSize, 3)
            itemFrameContainer.add(itemFrame)
            this.colorContainer.add(itemFrameContainer)
          }
        }
      }
    }
    redrawBtn(showSaveBtn, showCancelBtn) {
      if (this.btnContainer) this.btnContainer.destroy()
      if (showSaveBtn && showCancelBtn) {
        drawBtn('CategoryThird', 'tripBtn3', [
          {
            name: 'saveBtn',
            text: '確認'
          },
          {
            name: 'cancelBtn',
            text: '取消'
          }
        ])
      } else if (!showSaveBtn && showCancelBtn) {
        drawBtn('CategoryThird', 'tripBtn3', [
          {
            name: 'cancelBtn',
            text: '取消'
          }
        ])
      }
    }
  }

  let config = {
    type: 1,
    parent: 'doll_canvas_content',
    width: 1600,
    height: 900,
    scene: [SceneMain, Doll, CategoryThird, CategorySecond, CategoryFirst],
    transparent: true,
    banner: false
  }
  let game
  let VM

  function runGame() {
    clearGame()
    game = new PhaserGame(config)
  }

  function clearGame() {
    if (game) {
      game.scene.scenes.forEach(scene => {
        scene.sys.game.destroy(true)
      })
      game = null
    }
  }

  function init(vm) {
    VM = vm
    if (VM.orientation === 'portrait') {
      config.width = 900
      config.height = 1600
    } else {
      config.width = 1600
      config.height = 900
    }
  }

  function changeLayout() {
    if (VM.orientation === 'portrait') {
      config.width = 900
      config.height = 1600
    } else {
      config.width = 1600
      config.height = 900
    }
    runGame()
  }

  function destroy() {
    clearGame()
    VM = null
  }

  function drawBtn(sceneName, textureKey, btnList) {
    let scene = game.scene.getScene(sceneName)
    const btnScale = 1.5
    const btnWidth = 153 * btnScale
    const btnHeight = 51 * btnScale
    const btnMargin = 20
    const btnListLen = btnList && btnList.length

    // 按鈕
    scene.btnContainer = scene.add
      .container(
        (scene.width - btnWidth * btnListLen) / 2,
        (scene.height * 3) / 4 + 50
      )
      .setSize((btnWidth + btnMargin) * btnListLen, btnHeight)

    if (btnList && btnListLen) {
      btnList.forEach((el, idx) => {
        const itemContainer = scene.add
          .container((btnWidth + btnMargin) * idx, 0)
          .setSize(btnWidth, btnHeight)
        const item = scene.add
          .sprite(0, 0, textureKey)
          .setOrigin(0)
          .setScale(btnScale)
          .setName(el.name)
          .setInteractive({ useHandCursor: true })
        const itemText = scene.add.text(0, 0, el.text, {
          fontSize: '32px',
          fontFamily: 'Microsoft JhengHei, sans-serif',
          fill: '#356daf'
        })
        itemText.setPosition(
          (btnWidth - itemText.width) / 2,
          (btnHeight - itemText.height) / 2
        )
        itemContainer.add([item, itemText])
        scene.btnContainer.add(itemContainer)
      })
    }
  }

  function drawDoll() {
    let scene = game.scene.getScene('Doll')
    if (scene) scene.drawDoll()
  }

  return {
    init,
    changeLayout,
    drawDoll,
    destroy
  }
}
