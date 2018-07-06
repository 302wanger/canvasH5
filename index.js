const API_ROOT = "https://www.easy-mock.com/mock/5b19307a3f6ddd76d8ff7cd6/";

const axiosInstance = axios.create({
  baseURL: ""
  // withCredentials: true
});

var h5Intance = new Vue({
  el: "#app",
  data: {
    expressData: {
      data: {
        bgUrl: "https://mdn.mozillademos.org/files/206/Canvas_backdrop.png",
        imgPath:
          "http://imgs-1253854453.image.myqcloud.com/29de096e5e9291b6baa9b40640cf96cf.jpeg",
        qrCodeUrl: "www.jd.com",
        posterUrl: "",
        bannerTitle: "我正在0元领取这个宝贝",
        descTitle: "迪士尼儿童背带吸管",
        pinTuanInfo: "已经拼2081团",
        pinTuanSlogin: "0元白拿",
        xwsShare: "长摁识别小程序码，马上0元拿",
        wxsProduct: "现在扫码立即免费领取10923件宝贝",
        list: [
          {
            type: "qrcode",
            code: "xxxxx",
            width: 100,
            height: 100,
            x: 0,
            y: 0
          },
          {
            type: "image",
            url: "",
            width: 100,
            height: 100,
            x: 0,
            y: 0
          },
          {
            type: "text",
            text: "",
            color: "",
            x: 0,
            y: 0
          }
        ]
      }
    }
  },
  methods: {
    getImgUrl: function() {
      var that = this;
      const params = {};
      axiosInstance
        .post(API_ROOT + "imgUrl", params)
        .then(function(response) {
          if (response && response.data) {
            if (!response.data.success) {
              console.log(response.data.err.em);
            } else {
              that.expressData = response.data.data;
              // 执行canvas绘图
              // that.getQrcodeImg();
              // that.drawBgImage();
            }
          }
        })
        .catch(function(error) {
          console.log("error --->>>---", error);
        });
    },

    // 查询页面参数
    getQueryParams: function() {
      var params = {};
      var parts = location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
        m,
        key,
        value
      ) {
        params[key] = value;
      });

      return params;
    },

    // 获取二维码链接，并生成图片
    getQrcodeImg: function() {
      var qrcode = new QRCode("qrcode", {
        text: this.expressData.data.qrCodeUrl,
        width: 56,
        height: 56,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },

    convertCanvasToImage: function(canvas) {
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    },
    // 绘制圆形头像
    circleImg: function(ctx, img, x, y, r) {
      ctx.save();
      var d = 2 * r;
      var cx = x + r;
      var cy = y + r;
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(img, x, y, d, d);
      ctx.restore();
    },

    drawBgImage: function() {
      //画海报
      var width = document.getElementById("canbox").offsetWidth; //宽度
      var height = document.getElementById("canbox").offsetHeight; // 高度
      var c = document.getElementById("myCanvas");
      c.width = width;
      c.height = height;
      var ctx = c.getContext("2d");
      //背景图设置
      var img = new Image();
      img.src = this.expressData.data.imgPath;
      img.setAttribute("crossOrigin", "Anonymous");

      // 二维码图片设置
      var mycans = document.getElementsByTagName("canvas")[1]; //二维码所在的canvas
      var qrCodeimg = this.convertCanvasToImage(mycans);
      var xw = width - 72 - 39;
      var xh = height - 6 - 120;
      let qrcodewidth = 100;

      img.onload = () => {
        // 画背景图
        ctx.drawImage(img, 0, 0, width, height);
        // 画二维码
        ctx.drawImage(qrCodeimg, xw, 420, qrcodewidth, qrcodewidth);

        // 画头像与文字
        ctx.font = "18px serif";
        ctx.fillText(this.expressData.data.bannerTitle, 150, 50);
        this.circleImg(ctx, img, 100, 20, 20);
        // 画商品
        ctx.drawImage(img, 100, 100, 200, 200);

        // 画商品描述
        ctx.fillText(this.expressData.data.descTitle, 50, 350);

        // 拼团情况
        ctx.fillText(this.expressData.data.pinTuanInfo, 50, 450);
        ctx.fillText(this.expressData.data.pinTuanSlogin, 50, 500);

        // 分享
        ctx.fillText(this.expressData.data.xwsShare, 20, 600);
        ctx.fillText(this.expressData.data.wxsProduct, 20, 630);
      };
    },

    previewImage: function(e) {
      console.log("previewImage click --->>>");
      wx.previewImage({
        current: e.currentTarget.dataset.url,
        urls: [e.currentTarget.dataset.url]
      });
    }
  },
  mounted: function() {
    // this.getImgUrl();
    this.getQrcodeImg();
    this.drawBgImage();
  }
});
