import Message from 'tdesign-miniprogram/message/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText:'',
    text1: 'Copyright © 2021-2031 TD.All Rights Reserved.',
    text2: '旧遇小程序',
    noticePicArr:[],
    navPicArr:[],
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotice();
    this.getNav();
    this.getGoodList();
  },

//   获取公告图片
  getNotice(){
    wx.request({
      url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/notice/get',
      success:res=>{
        //   console.log({'message':'查询成功',res});
          this.setData({
              noticePicArr:res.data.data
          })
        //   console.log(this.data.noticePicArr);
      },
      fail:err=>{
          console.log({'message':'查询失败',err});
      }
    })
  },
//   获得分类
  getNav(){
    wx.request({
      url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/nav/get',
      success:res=>{
        //   console.log(res);
          this.setData({
              navPicArr:res.data.data
          })
        //   console.log(this.data.navPicArr);
      },
      fail:err=>{
          console.log(err);
      }
    })
  },
//   获取旧物信息(最新的)
  getGoodList(){
    wx.request({
      url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/good/getAll',
      method:"POST",
      success:res=>{
        //   console.log(res);
          this.setData({
              goods:res.data.data.data
          })
        //   console.log(this.data.goods);
        wx.stopPullDownRefresh();
        Message.success({
            context: this,
            offset: [20, 32],
            duration: 2000,
            content: '加载成功',
          });
      },
      fail:err=>{
          console.log(err);
      }
    })
  },
//   搜索
    changeHandle(e) {
        // console.log(e.detail.value);
        this.setData({
            searchText:e.detail.value
        });
    },

  submitSearch(){
    this.goSearchByKey()
  },

//   点击分类跳转
  goSearch:function(event){
    //   console.log(event);
    const id = event.currentTarget.dataset.searchid;
    // console.log(id); 
    wx.navigateTo({
      url: '/pages/search/search?navIndex='+id,
    })
  },
// 搜索关键词跳转
  goSearchByKey:function(){
    wx.navigateTo({
        url: '/pages/search/search?text='+this.data.searchText,
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
    this.getGoodList();
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