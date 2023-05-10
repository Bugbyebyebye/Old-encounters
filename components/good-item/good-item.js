// components/good-item/good-item.js
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
            wx.navigateTo({
              url: '/pages/detail/detail?goodId='+this.properties.good._id,
            })
        }
    }
})
