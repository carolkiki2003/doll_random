<script>
  import { mapMutations } from 'vuex'
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  export default {
    name: 'Root',
    components: {
      Header,
      Footer
    },
    data() {
      return {}
    },
    methods: {
      resizeHandler() {
        const width = document.body.clientWidth
        const height = document.body.clientHeight

        this.SET_WINDOW({
          width,
          height,
          orientation: width > height ? 'landscape' : 'portrait'
        })
      },
      scrollHandler() {
        const scrollTop = document.querySelector('body').scrollTop || document.querySelector('html').scrollTop
        const scrollLeft = document.querySelector('body').scrollLeft || document.querySelector('html').scrollLeft
        this.SET_SCROLL({
          scrollTop,
          scrollLeft
        })
      },
      deviceHandler() {
        let userAgent = navigator.userAgent
        if (/Android/i.test(userAgent) || /iPhone|iPad/i.test(userAgent)) {
          this.SET_AGENT(true)
        } else if (/Windows/i.test(userAgent) || /Mac/i.test(userAgent)) {
          this.SET_AGENT(false)
        }
      },
      ...mapMutations({
        SET_AGENT: 'userAgent/SET_AGENT',
        SET_WINDOW: 'userAgent/SET_WINDOW',
        SET_SCROLL: 'userAgent/SET_SCROLL'
      })
    },
    async mounted() {
      try {
        window.addEventListener('resize', this.resizeHandler)
        window.addEventListener('scroll', this.scrollHandler)
        this.resizeHandler()
        this.scrollHandler()
        this.deviceHandler()
      } catch (err) {
        console.log('err in root mounted', err)
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeHandler)
      window.removeEventListener('scroll', this.scrollHandler)
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />
