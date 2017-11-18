<template>
  <div>
    <mt-header title="首页" fixed></mt-header>
    <topic-list/>
    <mt-tabbar v-model="tab" fixed>
      <mt-tab-item id='all'>
        <img v-if="tab === 'all'" slot="icon" src="../assets/all_active.png">
        <img slot="icon" src="../assets/all.png" v-else>
        全部
      </mt-tab-item>
      <mt-tab-item id="good">
        <img v-if="tab === 'good'" slot="icon" src="../assets/good_active.png">
        <img slot="icon" src="../assets/good.png" v-else>
        精华
      </mt-tab-item>
      <mt-tab-item id="share">
        <img v-if="tab === 'share'" slot="icon" src="../assets/share_active.png">
        <img slot="icon" src="../assets/share.png" v-else>
        分享
      </mt-tab-item>
      <mt-tab-item id="ask">
        <img v-if="tab === 'ask'" slot="icon" src="../assets/ask_active.png">
        <img slot="icon" src="../assets/ask.png" v-else>
        问答
      </mt-tab-item>
      <mt-tab-item id="job">
        <img v-if="tab === 'job'" slot="icon" src="../assets/job_active.png">
        <img slot="icon" src="../assets/job.png" v-else>
        招聘
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {Header, Tabbar, TabItem, Button} from 'mint-ui';
  import TopicList from './TopicList.vue';

  export default {
    name: 'Home',
    components: {
      TopicList,
      'mt-header': Header,
      'mt-tabbar': Tabbar,
      'mt-tab-item': TabItem,
      'mt-button': Button,
      'topic-list': TopicList
    },
    methods: {
      ...mapMutations('topic',[
        'changeTab'
      ])
    },
    computed: {
      page: {
        get: function () {
          return this.$store.state.topic.page;
        },
        set: function () {

        }
      },
      tab: {
        get: function () {
          return this.$store.state.topic.tab;
        },
        set: function (tab) {
          this.changeTab(tab);
        }
      },
      ...mapState('topic',{
        limit: state => state.limit,
        mdrender: state => state.mdrender
      })
    }
  }
</script>
