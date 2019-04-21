// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    collected: false,
    text:'收藏',
    musicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    this.setData({
      detailObj: datas.list_data[index],
      index
    })

    // 根据本地缓存的数据判断用户是否收藏过当前的文章
    let detailStorage = wx.getStorageSync('collected');
    if(!detailStorage){
      // 在缓存中初始化空对象
      wx.setStorageSync('collected', {});
    }
    // 判断用户是否收藏
    if(detailStorage[index]){ // 收藏过
      this.setData({
        collected:true
      })
    }

    // 判断音乐是否在播放
    if(appDatas.data.isPlay && appDatas.data.pageIndex === index){
      // 修改musicPlay状态值
      this.setData({
        musicPlay: true
      })
    }
    // 监听音乐是否播放
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        musicPlay: true
      })
      // 修改appDatas中的数据
      appDatas.data.isPlay = true
      appDatas.data.pageIndex = index
    })
    // 监听音乐是否暂停
    wx.onBackgroundAudioPause(() => {
      this.setData({
        musicPlay: false
      })
      // 修改appDatas中的数据
      appDatas.data.isPlay = false
      // appDatas.data.pageIndex = index
    })
  },
  handleCollection (event) {
    let collected = !this.data.collected;
    this.setData({
      collected
    })
    let title = collected ? '收藏成功':'取消收藏';
    wx.showToast({
      title,
      icon: 'success'
    })

    // 缓存数据到本地
    let {index} = this.data;
    wx.getStorage({
      key: 'collected',
      success: (res) => {
        let obj = res.data;
        obj[index] = collected;
        wx.setStorage({
          key: 'collected',
          data: obj,
          success: () => {
            console.log('缓存成功');
          }
        })
      }
    })
    
  },

  handleMusicPlay () {
    let musicPlay = !this.data.musicPlay;
    this.setData({
      musicPlay
    })
    if (musicPlay){
      let { dataUrl, title, coverImgUrl} = this.data.detailObj.music
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      })
    }else{
      wx.pauseBackgroundAudio()
    }
  },

  handleShare () {
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈',
        '分享到qq空间',
        '分享到微博'
      ],
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