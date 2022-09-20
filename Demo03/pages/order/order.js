// pages/order/order.js
Page({
  data:{
    userInfo:"",
    userid:"",
    shijian:'',
    list:"",
    shijianList:[
      {order_id:6,order_time:'06:00~08:00'},
      {order_id:8,order_time:'08:00~10:00'},
      {order_id:10,order_time:'10:00~12:00'},
      {order_id:12,order_time:'12:00~14:00'},
      {order_id:14,order_time:'14:00~16:00'},
      {order_id:16,order_time:'16:00~18:00'},
      {order_id:18,order_time:'18:00~20:00'},
      {order_id:20,order_time:'20:00~22:00'}
    ]
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
  selectApply:function(e){
    let time=e.target.dataset.time
     this.setData({
       shijian: time
     })
  },
  submit(){
    if(this.data.shijian!=''){
      let that=this
      if(that.data.list.length>=3){
        wx.showModal({
          title:'提示',
          content: '您的预约数已达上限',
        })
      }else{
        wx.showModal({
          title:'提示',
          content: '您确定预约么？',
          success:function(res){
            if(res.confirm){
              wx.cloud.database().collection('order')
              .add({
                data:{
                  //userid:that.data.userid,
                  nickName:that.data.userInfo.nickName,
                  time:that.data.shijian,
                  qrurl:`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${that.data.shijian}`,
                  order_time:new Date().toLocaleString('chinese',{hour12:false})
                }
              })
              .then(res=>{
                console.log('success',res)
                wx.redirectTo({
                  url: `/pages/qrcode/qrcode?shijian=${that.data.shijian}`
                })  
              })
              .catch(res=>{
                console.log('faild',res)
              })
            }else{
              console.log('取消')
            }
          }
        })  
      }
    }else{
      wx.showModal({
        title:'提示',
        content: '请先进行选择',
      })
    }
  }
})