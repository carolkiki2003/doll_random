<script>
  import Logo from '@/components/Logo'
  export default {
    name: 'Footer',
    components: { Logo },
    data() {
      return {
        links: [
          {
            title: '產品列表',
            content: [
              { name: '探索活動', href: 'https://star.104.com.tw/event' },
              { name: '虛擬展覽', href: 'https://star.104.com.tw/expo/' },
              { name: '天賦故事', href: 'https://star.104.com.tw/story/' },
              { name: '天賦時光機', href: 'https://star.104.com.tw/trip' }
            ]
          },
          {
            title: '關於我們',
            content: [
              { name: '常見問答', href: 'https://star.104.com.tw/about/us' },
              { name: '隱私權政策', href: 'https://star.104.com.tw/about/privacy' },
              { name: '會員條款', href: 'https://star.104.com.tw/about/member' },
              { name: '服務條款', href: 'https://star.104.com.tw/about/service' }
            ]
          },
          {
            title: '聯繫我們',
            content: [
              {
                name: '合作洽詢',
                href:
                  'https://docs.google.com/forms/d/e/1FAIpQLSeprdAMW21da2_AqeO1y8I-vTexp85Tr5tgx2pFP7UfZG0zLQ/viewform'
              },
              { name: '粉絲團', href: 'https://www.facebook.com/104Star/' },
              { name: '客服信箱', href: 'mailto:star@104.com.tw' },
              { name: '104 企業網站', href: 'https://corp.104.com.tw/' }
            ]
          }
        ]
      }
    }
  }
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />
