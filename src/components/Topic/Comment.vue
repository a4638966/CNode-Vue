<template>
    <div class="comment">
      <div class="profile">
        <img class="comment-author" :src="author.avatar_url">
        <div class="message">
          <span class="name">{{author.loginname}}</span>
          <span class="time">发布于:{{create_time}}</span>
        </div>
        <div class="operator">
        </div>
      </div>
      <div class="comment-content">
        <div class="markdown-body" v-html="content">
      </div>
    </div>
  </div>
</template>

<script>

  import moment from 'moment';
  import 'github-markdown-css';

  export default {
    name: 'Comment',
    props: {
      author: Object,
      content: String,
      create_at: String,
      id: String,
      is_uped: Boolean,
      reply_id: String,
      ups: Array
    },
    computed: {
      create_time: function () {
        return moment(this.create_at).fromNow();
      }
    }
  }
</script>

<style>
  .comment{
    border-bottom: 1px solid #d5dbdb;
    margin-top: 10px;
  }

  .comment > .profile {
    display: flex;
    margin-bottom: 10px;
  }

  .profile > .comment-author {
    flex-basis: 45px;
    margin-right: 10px;
    width: 45px;
    height: 45px;
  }

  .profile > .message {
    flex-grow: 1;
  }

  .message > span{
    display: block;
  }

  .message > span :first-child{
    height: 20px;
  }

  .message > span :last-child{
    height: 25px;
  }

</style>
