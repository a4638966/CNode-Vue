import _ from 'lodash'
import {get, post} from '../utils'


/**
 * 获得topicList
 * @param page
 * @param tab
 * @param limit
 * @param mdrender
 * @returns {Promise.<void>}
 */
function getTopicsList(page, tab, limit = 20, mdrender = false) {
  const url = `https://cnodejs.org/api/v1/topics?page=${page}&tab=${tab}&limit=${limit}&mdrender=${mdrender}`
  return get(url);
}


function getTopicDetail(id, accesstoken) {
  let url = `https://cnodejs.org/api/v1/topic/${id}?mdrender=true`;
  if(!_.isNil(accesstoken)){
    url += `&accesstoken=${accesstoken}`
  }
  return get(url);
}

function getUserInfo(loginname) {
  let url = `https://cnodejs.org/api/v1/user/${loginname}`;
  return get(url);
}

function getUserCollect(loginname) {
  let url = `https://cnodejs.org/api/v1/topic_collect/${loginname}`;
  return get(url).then((data)=>{
    if(data.success){
      return data.data.map((item)=>({
        id: item.id,
        author: item.author,
        title: item.title,
        last_reply_at: item.last_reply_at
      }));
    }
  });
}

function verifyUserToken(accessToken){
  let url = `https://cnodejs.org/api/v1/accessToken`;

  return post(url, {
    accesstoken: accessToken
  })

}

export {
  getUserInfo,
  getUserCollect,
  getTopicsList,
  getTopicDetail,
  verifyUserToken
}
