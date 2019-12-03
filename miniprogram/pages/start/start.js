// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    resData:'未选定',
    interval:'',
    iStart:false,
  },
  start: function (e) {
    if (this.data.dataList.length==0){
      wx.showToast({
        icon: 'none',
        title: '请先设置后重试'
      })
    }
    else{
      this.data.interval = setInterval(()=> {
        var rData = Math.floor(Math.random() * this.data.dataList.length)
        this.setData({
          iStart:true,
          resData: this.data.dataList[rData].chooseName
        })
      }, 100)
    }
  },
  stop: function (e) {
    clearInterval(this.data.interval)
    var rData = Math.floor(Math.random() * this.data.dataList.length)
    this.setData({
      iStart: false,
      resData: this.data.dataList[rData].chooseName
    })
  },
  loading: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('chooseFood').where({
      userInfo: this.data.userInfo,
      checked: true,
    }).get({
      success: res => {
        this.setData({
          dataList: res.data,
        })
        console.log('成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loading()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})