<template>
  <div>
    <mt-header title="用户" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div v-show="!loading">
      <div class="userDetail">
        <div class="userAvatar">
          <img class="avatar" :src="avatar_url" />
          <span class="userName">{{loginname}}</span>
          <div class="detail">
            <span>积分:{{score}}</span>
            <span>注册于:{{create_time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {Header, Button, Indicator} from 'mint-ui';
  import {getUserInfo} from '../../api';
  import moment from 'moment';


  export default {
    name: 'User',
    components: {
      "mt-header": Header,
      "mt-button": Button
    },
    data: function () {
      return {
        loading: true,
        loginname: this.$route.params.loginname,
        avatar_url: '',
        githubUsername: '',
        create_at: '',
        score: 0,
        recent_topics: [],
        recent_replies: []
      }
    },
    computed: {
      create_time: function () {
        return moment(this.create_at).fromNow();
      }
    },
    beforeMount: async function () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });

      const data = await getUserInfo(this.loginname);
      console.log('data: ', data)
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
  .userDetail > .userAvatar {
    display: flex;
    height: 180px;
    flex-direction: column;
    border-bottom: 1px solid #d5dbdb;
    justify-content: flex-end;
    align-items: center;
  }

  .userAvatar > .avatar {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .userAvatar > .userName {
    font-weight: bold;
    font-size: 20px;
  }

  .userAvatar > .detail {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }

  .userAvatar > .detail > span {
    flex: 1;
    text-align: center;
    font-size: smaller;
  }

</style>
