Page({
  data:{
    userInfo:""
  },
  onLoad(){
    let user=wx.getStorageSync('user')
    this.setData({
      userInfo:user
    })
    console.log('获取缓存',user)
  },
  login(){
    wx.getUserProfile({
      desc: '用于完善用户信息',
      success:res=>{
        let user=res.userInfo
        wx.setStorageSync('user', user)
        console.log('用户信息',user)
        this.setData({
          userInfo:user
        })
        wx.redirectTo({
          url: '/pages/home/home',
        })    
      },
      fail:err=>{
        console.log("授权失败",err)
      }
    })
  },
  logout(){
    this.setData({
      userInfo:""
    })
    wx.setStorageSync('user', null)
  },
  myorder(){
    wx.navigateTo({
      url: '/pages/myorder/myorder',
    })
  },
  shuoming(){
    wx.navigateTo({
      url: '/pages/shuoming/shuoming',
    })
  }
})