// pages/myorder/myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    userid:"",
    list:""
  },
  onLoad(){
    let user=wx.getStorageSync('user')
    this.setData({
      userInfo:user
    })
    var that=this
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
        that.setData({
          userid:res.result.openid
        })
        wx.cloud.database().collection('order')
        .where({
          _openid : that.data.userid
        }).get()
        .then(res=>{
          console.log('success',res)
          that.setData({
            list:res.data
          })
        })
        .catch(res=>{
          console.log('faild',res)
        })
      },
      fail(err){
        console.log("fail",err)
      }
    })
  },
  toqrcode(e){
    let t=e.currentTarget.dataset.time
    let dataid=e.currentTarget.dataset.id
    console.log(t)
    console.log(dataid)
    wx.redirectTo({
      url: `/pages/qrcode/qrcode?shijian=${t}&id=${dataid}`,
      success() {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return; 
        page.onLoad(); 
      }
    })
  },
})