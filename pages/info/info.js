// pages/info/info.js

// 图片地址
// const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        autoplay: false,
        duration: 500,
        interval: 5000,
        // swiperList:[
        //     `${imageCdn}/swiper1.png`,
        //     `${imageCdn}/swiper2.png`,
        //     `${imageCdn}/swiper1.png`,
        //     `${imageCdn}/swiper2.png`,
        //     `${imageCdn}/swiper1.png`,
        // ],
        info:{},
        user:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.infoId);
        this.getInfoDetail(options.infoId);
    },

    // 获取信息详情
    getInfoDetail(id){
        wx.request({
          url: 'https://fc-mp-67d8e7db-0bf0-4534-9f58-3e1e450eff6d.next.bspapp.com/info/getInfo',
          method:'POST',
          data:{
              id
          },
          success:res=>{
              console.log(res.data);
              let info = res.data.res.data.map(item=>{
                  let date = new Date(item.createTime);
                // 格式化日期
                let formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                
                // 生成新的对象
                return {
                    ...item,
                    createTime: formattedDate
                };
              });
              let user = res.data.arr.data[0];
              this.setData({
                  info:info[0],
                  user:user
              })
            //   console.log(this.data.info);
            //   console.log(this.data.user);
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