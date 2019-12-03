// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [],
    addName:'',
  },
  deleteObj: function (e) {
    const db = wx.cloud.database()
    db.collection('chooseFood').doc(e.currentTarget.dataset.gid).remove({
      success: res => {
        loading: !this.data.loading
        wx.showToast({
          icon: 'none',
          title: '删除成功！'
        })
        this.onLoad()
        console.log('成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败！'
        })
        console.error('失败：', err)
      }
    })
  },
  formSubmit: function (e) {
    if (e.detail.value.addName.length == 0) {
      wx.showToast({
        title: '标题不能为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      const db = wx.cloud.database()
      db.collection('chooseFood').add({
        data: {
          userInfo: this.data.userInfo,
          chooseName: e.detail.value.addName,
          checked: true,
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          loading: !this.data.loading
          wx.showToast({
            icon: 'none',
            title: '添加成功！'
          })
          this.setData({
            addName:'',
          })
          this.onLoad()
          // wx.navigateTo({
          //   url: '../userConsole/userConsole',
          // })
          console.log('成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '添加失败！'
          })
          console.error('失败：', err)
        }
      })
    }
  },
  checkboxChange: function (e) {
    console.log(e.currentTarget.dataset.checked)
    const db = wx.cloud.database()
    var changeCheck
    if (e.currentTarget.dataset.checked==true){
      changeCheck=false
    }
    else{
      changeCheck=true
    }
    db.collection('chooseFood').doc(e.currentTarget.dataset.gid).update({
      data: {
        checked: changeCheck,
      },
      success: res => {
        this.onLoad()
      },
      fail: err => {
      }
    })
    // this.setData(changed)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('chooseFood').where({
      userInfo: this.data.userInfo,
    }).get({
      success: res => {
        this.setData({
          checkboxItems: res.data
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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