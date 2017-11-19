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

export {
  getTopicsList,
  getTopicDetail
}
