// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        good:{},
        user:{},
        defaultPic:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options.goodId);
        this.getGood(options.goodId);
    },

    // 切换图片
    changePic(event){
        // console.log(event.currentTarget.dataset.item);
        this.setData({
            defaultPic:event.currentTarget.dataset.item
        })
    },

    // 获取旧物详情
    getGood(goodId){
        wx.request({
          url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/good/getGood',
          method:'POST',
          data:{
              id:goodId
            // id:"645896c00c801ca878a6d4d5"
          },
          success:res=>{
              console.log(res);
              this.setData({
                  good:res.data.good.data[0],
                  user:res.data.user.data[0]
              })
            //   console.log(this.data.good,this.data.user);
              this.setData({
                defaultPic:this.data.good.piclist[0]
            });
          },
          fail:err=>{
              console.log(err);
          }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})