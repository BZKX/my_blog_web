<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
  <!--<router-view v-slot="{ Component }">-->
  <!--    <transition :name="transitionName" mode="out-in">-->
  <!--      <keep-alive>-->
  <!--        <component :is="Component"/>-->
  <!--      </keep-alive>-->
  <!--    </transition>-->
  <!--  </router-view>-->
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > 0) {
        if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right';
        } else {
          this.transitionName = 'slide-left';
        }
      } else if (to.meta.index == 0 && from.meta.index > 0) {
        this.transitionName = 'slide-right';
      }

      console.log(this.transitionName);

      //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
      /*if( to.meta.index < from.meta.index){
            this.transitionName = 'slide-right';
      }else{
            this.transitionName = 'slide-left';
      }*/
    }
  }
}
</script>
