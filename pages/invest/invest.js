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
  /**
   * 页面的初始数据
   */
  data: {
    selected: [{
      date: '2018-5-21'
    }, {
      date: '2018-5-22'
    }, {
      date: '2018-5-24'
    }, {
      date: '2018-5-25'
    }]
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
    console.log(time)

  }
})