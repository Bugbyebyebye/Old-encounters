// components/recommend-item/recommend-item.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        good:{
            type:Object,
            value:{}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goDetail(){
            // console.log(this.properties.good);
            wx.navigateTo({
              url: '/pages/detail/detail?goodId='+this.properties.good._id,
            })
        }
    }
})
