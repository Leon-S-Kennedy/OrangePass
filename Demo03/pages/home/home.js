
Page({
  data:{
    userInfo:""
  },
  onLoad(){
    let user=wx.getStorageSync('user')
    if(user!=null&&user!=undefined){
      this.setData({
        userInfo:user
      })
      console.log('获取缓存',user)

    }
  },
  tap1(){
    let user=wx.getStorageSync('user')
    if(user!=null&&user!=''){
      wx.navigateTo({
        url: '/pages/order/order',
      })     
    }else{
      wx.showModal({
        title:'提示',
        content: '请先授权登录',
        success:function(res){
          if(res.confirm){
            console.log('确定')
            wx.switchTab({
              url: '/pages/me/me'
            })
          }else{
            console.log('取消')
          }
        }
      })
    }
  },
})