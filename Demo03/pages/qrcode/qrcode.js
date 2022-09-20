// pages/qrcode/qrcode.js
Page({
  data:{
    userInfo:"",
    shijian:'',
    id:"",
    image:'/image/swriper3.jpg'
  },
  onLoad(option){
    let user=wx.getStorageSync('user')
    this.setData({
      userInfo:user
    })
    this.setData({
      shijian:option.shijian
    })
    this.setData({
      id:option.id
    })
    this.setData({
      image:'https://api.qrserver.com/v1/create-qr-code/?size=170x170&data='+this.data.shijian
    })
    console.log('获取缓存',user)
    console.log('获取时间',this.data.shijian)
  },
  back(){
    wx.switchTab({
      url: '/pages/me/me'
    })
  },
  delete(){
    let that=this
    wx.showModal({
      title:'提示',
      content: '您确定删除么？',
      success:function(res){
        if(res.confirm){
          wx.cloud.database().collection('order')
          .where({
            _id:that.data.id
          })
          .remove()
          .then(res=>{
            console.log('success',res)
          })
          .catch(res=>{
            console.log('faild',res)
          })
          wx.switchTab({
            url: '/pages/me/me',
            success(){
              var page=getCurrentPages().pop();
              if(page==undefined||page==null) return;
              page.onLoad();
            }
          })
        }else{
          console.log('取消')
        }
      }
    })
  }
})