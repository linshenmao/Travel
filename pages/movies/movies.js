// pages/movies/movies.js
const movieUrl = 'http://t.yushu.im/v2/movie/in_theaters?city=北京&start=0&count=30';
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: movieUrl,
      success: (res) => {
        this.setData({
          movieArr: res.data.subjects
        })
        appDatas.data.movieArr = res.data.subjects
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