import service from '@/utils/request'
/* 
  登录
 */
export function login(data){
  return service.request({
    url:'/Home/User/reg',
    method:'post',
    data
  })
}
/* 
  注册
*/
export function register(data){
  return service.request({
    url:'/Home/User/reg',
    method:'post',
    data
  })
}
/* 
  修改用户信息
*/
export function changeUserInfo(data) {
  return service.request({
    url:'/Home/User/setuser',
    method:'post',
    data
  })
}
/* 
  修改用户密码
*/
export function changeUserPassword(data){
  return service.request({
    url:'/Home/User/setpass',
    method:'post',
    data
  })
}
