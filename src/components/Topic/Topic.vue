<template>
  <div>
    <mt-header title="详情" fixed>
      <mt-button slot="left" icon="back" @click="$router.go(-1)">返回</mt-button>
    </mt-header>
    <div v-if="!loading" id="topicDetail">
      <h2 class="title">{{title}}</h2>
      <div class="profile">
        <img class="avatar" :src="author.avatar_url" @click="avatarHandler"/>
        <div class="author">
          <span>{{author.loginname}}</span>
          <span>发布于:{{create_time}}</span>
        </div>
        <div class="flow">
          <span :class="{favorite: true, fav: is_collect, noFav: !is_collect}">{{isFavorite}}</span>
          <span>{{visit_count}}次阅读</span>
        </div>
      </div>
      <div v-html="content" class="markdown-body content"></div>
      <topic-comment v-for="comment in replies"
                     :id="comment.id"
                     :key="comment.id"
                     :author="comment.author"
                     :create_at="comment.create_at"
                     :is_uped="comment.is_uped"
                     :reply_id="comment.reply_id"
                     :ups="comment.ups"
                     :content="comment.content"
      ></topic-comment>
    </div>
  </div>
</template>

<script>
  import {Header, Button, Indicator} from 'mint-ui';
  import moment from 'moment';
  import Comment from './Comment.vue'
  import {getTopicDetail} from '../../api/index';

  import 'github-markdown-css'

  export default {
    name: 'Topic',
    components: {
      'mt-header': Header,
      'mt-button': Button,
      'topic-comment': Comment
    },
    data: function () {
      return {
        id: this.$route.params.id,
        loading: true,
        author: {},
        author_id: '',
        content: '',
        create_at: '',
        good: false,
        is_collect: false,
        last_reply_at: '',
        replies: [],
        reply_count: 0,
        tab: '',
        title: '',
        top: false,
        visit_count: 0
      }
    },
    computed: {
      create_time: function () {
        return moment(this.create_at).fromNow()
      },
      isFavorite: function () {
        return this.is_collect ? '取消收藏' : '收藏'
      }

    },
    methods: {
      avatarHandler: function (event) {
        event.stopPropagation();
        this.$router.push({name: 'user', params: {loginname: this.author.loginname}})
      }
    },
    beforeMount: async function () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      const data = await getTopicDetail(this.id);
      if (data.success) {
        this.loading = false;
        Indicator.close();
        Object.keys(data.data).forEach((key) => {
          this[key] = data.data[key];
        });
      }
    }
  }
</script>

<style>

  #topicDetail {
    margin-top: 40px;
  }

  #topicDetail > .title {
    color: #2c3e50;
    background-color: #f0f0f0;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bolder;
    margin: 10px 0px 10px 0px;
    text-align: center;
  }

  #topicDetail > .profile {
    height: 44px;
    margin: 0px 0px 10px 0px;
    display: flex;
    justify-content: space-around;
    color: #34495e;
    font-size: 12px;
  }

  .profile > .avatar {
    flex-basis: 40px;
    height: 40px;
    width: 40px;
    margin-right: 10px;
    border-radius: 5px;
  }

  .profile > .author {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .post-detail > .author > span {
    flex: 1;
  }

  .profile > .flow {
    display: flex;
    flex-basis: 100px;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
  }

  .flow > .favorite {
    width: 60px;
    color: #ffffff;
    text-align: center;
    padding: 5px 6px;
    font-size: 10px;
    font-weight: 400;
    border-radius: 4px;
  }

  .flow > .favorite:hover {
    cursor: pointer;
  }

  .fav {
    background-color: #909090;
  }

  .noFav {
    background-color: #80bd01;
  }

  #topicDetail > .content {
    border-bottom: 1px solid #d5dbdb;
  }

</style>
