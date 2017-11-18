<template>
  <div className="postItem">
    <h3>{title}</h3>
    <div className="content">
      <img src=""/>
      <div className="info">
        <div className="detail">
          <span>{author.loginname}</span>
          <span><b>{reply_count}</b>/{visit_count}</span>
        </div>
        <div className="time">
          <span>{getRelativeTime(create_at)}</span>
          <span>{getRelativeTime(last_reply_at)}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import _ from 'lodash'

  export default {
    name: 'TopicListItem',
    props: {
      id: String,
      title: String,
      reply_count: Number,
      visit_count: Number,
      create_at: String,
      last_reply_at: String,
      author: {
        validator: function (value) {
          return value.hasOwnProperty('loginname')
            && value.hasOwnProperty('avatar_url')
        }
      }
    }
  }

</script>

<style>

</style>
