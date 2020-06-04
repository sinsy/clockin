const app = getApp()
Page({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  onLoad: function() {

    var that = this;

    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo({

      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    investNum: 0,
    investMoney: 0,
    selected: [{
      date: '2020-5-21'
    }, {
      date: '2020-5-22'
    }, {
      date: '2020-5-24'
    }, {
      date: '2020-5-25'
    }],
    modal: {},
    investType: app.globalData.investType,
    investTypeJSON: [
      [{
        name: 'shuanghui',
        code: 'xxxx'
      }]
    ],
    addForm: {
      name: ''
    }
  },

  /**
   * 弹框按钮操作事件
   * @res 取消/确定按钮的相关信息
   */
  modalOperate: function(res) {
    if (res.detail.res == 'confirm') {
      console.log('confirm')
    } else if (res.detail.res == 'cancel') {
      console.log('cancel')
    }
  },
  /**
   * 日历是否被打开
   */
  bindselect(e) {

    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let time = e.detail;
    let objModal = {
      show: true,
      title: time.year + '年' + time.month + '月' + time.date + '日',
      showCancel: true,
      height: '90%',
      confirmText: '保存'
    }
    this.setData({
      modal: objModal
    })
    console.log(time)

  },
  //  tab切换逻辑
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  investNameChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      investName: e.detail.value
    })
  },
  bindChange: function(e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
})