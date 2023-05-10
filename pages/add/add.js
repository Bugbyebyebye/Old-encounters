// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active:0,
        kinds:[],
        userId:'',
        location:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options);
        this.setData({
            active:options.active
        })
        this.getKind();
        wx.getStorage({
            key:'user',
            success:res=>{
                // console.log(res);
                this.setData({
                    userId:res.data.id
                })
                // console.log(this.data.userId);
            }
        });
        wx.getStorage({
            key:'location',
            success:res=>{
                // console.log(res);
                this.setData({
                    location:res.data
                })
                // console.log(this.data.location);
            }
        })
    },

    onTabsChange(event) {
        // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
        this.setData({
            active:event.detail.value
        })
      },
  
      onTabsClick(event) {
        // console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
      },

    //   获取分类
    getKind(){
        let kind = []
        wx.request({
          url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/nav/get',
          success:res=>{
            //   console.log(res);
              res.data.data.map(item=>{
                  kind.push({'label':item.classname,'value':item.id})
              })
            //   console.log(kind);
              this.setData({
                  kinds:kind
              })
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