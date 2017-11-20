<template>
  <div>
    <mt-header title="首页" fixed></mt-header>
    <topic-list
      :key="tab"
      :topicList="topicList"
      @topLoading="topLoadingHandler"
      @bottomLoading="bottomLoadingHandler"
      @click="topicItemClickHandler"
    />
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
  import {Header, Tabbar, TabItem, Button, Indicator} from 'mint-ui';
  import TopicList from './TopicList.vue';
  import {getTopicsList} from '../api'
  import {TAB} from '../constant';

  export default {
    name: 'Home',
    components: {
      'mt-header': Header,
      'mt-tabbar': Tabbar,
      'mt-tab-item': TabItem,
      'mt-button': Button,
      'topic-list': TopicList
    },
    data: function () {
      return {
        tab: TAB.ALL,
        topicList: []
      }
    },
    methods: {
      ...mapMutations('topic', [
        'changeTab'
      ]),
      topLoadingHandler: async function (cb) {
        const data = await getTopicsList(0, this.tab, this.limit, this.mdrender);
        this.topicList = [...data.data];
        cb();
      },
      bottomLoadingHandler: async function (cb) {
        const data = await getTopicsList(this.page, this.tab, this.limit, this.mdrender);
        this.topicList.push(...data.data);
        cb();
      },
      topicItemClickHandler: function ({id}) {
        this.$router.push({ name: 'topic', params: { id }})
      }
    },
    computed: {
      page: function () {
        return this.topicList.length;
      },
      ...mapState('topic', {
        limit: state => state.limit,
        mdrender: state => state.mdrender
      })
    },
    watch: {
      tab: async function () {
        const data = await getTopicsList(0, this.tab, this.limit, this.mdrender);
        if (data.success) {
          this.topicList = data.data;
        } else {
          console.log('出错了');
        }
      }
    },
    beforeMount: async function () {
      const data = await getTopicsList(this.page, this.tab, this.limit, this.mdrender);
      if (data.success) {
        this.topicList = data.data;
      } else {
        console.log('出错了');
      }
    }
  }
</script>
