<template>
  <div id="topicList" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore :topMethod="topMethodHandler">
        <div v-for="item in 30" >{{ item }}</div>
    </mt-loadmore>
  </div>
</template>


<script>
  import { Loadmore } from 'mint-ui';

  export default {
    name: 'TopicList',
    components: {
      'mt-loadmore': Loadmore
    },
    beforeCreate: function () {
      this.wrapperHeight = document.documentElement.clientHeight - 55 - 40;
    },
    methods: {
      topMethodHandler: function () {
        console.log('topMethodHandler');
      }
    }
  }
</script>

<style>

  #topicList {
    overflow-y: scroll;
    margin: 40px 0px 55px 0px;
  }

</style>
