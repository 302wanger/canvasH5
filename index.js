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
        imgPath:
          "http://imgs-1253854453.image.myqcloud.com/86b56587859345e7792a71a1b2e07fc2.jpeg",
        circlePath:
          "http://imgs-1253854453.image.myqcloud.com/67e3ab5de460228a1076f12e9dd908ee.jpg",
        qrCodeUrl: "www.baidu.com",
        list: [
          {
            type: "qrcode",
            code: "xxxxx",
            width: 100,
            height: 100,
            x: 10,
            y: 100
          },
          {
            type: "image",
            url: "",
            width: 100,
            height: 100,
            x: 20,
            y: 200
          },
          {
            type: "text",
            text: "我正在0元领取这个宝贝",
            color: "",
            font: "",
            x: 30,
            y: 300
          },
          {
            type: "text",
            text: "已经拼2081团",
            color: "",
            font: "",
            x: 40,
            y: 400
          },
          {
            type: "text",
            text: "0元白拿",
            color: "",
            font: "",
            x: 50,
            y: 500
          },
          {
            type: "text",
            text: "长摁识别小程序码，马上0元拿",
            color: "",
            font: "",
            x: 60,
            y: 600
          },
          {
            type: "text",
            text: "现在扫码立即免费领取10923件宝贝",
            color: "",
            font: "",
            x: 70,
            y: 620
          },
          {
            type: "text",
            text: "享物说",
            color: "",
            font: "30px",
            x: 70,
            y: 640
          },
          {
            type: "text",
            text: "国内首家好物互送平台",
            color: "",
            font: "",
            x: 70,
            y: 660
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
    getQrcodeImg: function(url, widthNum) {
      var qrcode = new QRCode("qrcode", {
        text: url,
        width: widthNum,
        height: widthNum,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },

    convertCanvasToImage: function(canvas) {
      let image = new Image();
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

    // 绘制二维码

    // 绘制文字
    drawText: function(data) {
      let ctx = document.getElementById("myCanvas").getContext("2d");
      ctx.font = data.font;
      ctx.fillText(data.text, data.x, data.y);
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

      var circle = new Image();
      circle.src = this.expressData.data.circlePath;

      // circle.onload = function() {
      //   this.circleImg(ctx, circle, 100, 20, 20);
      // };

      img.onload = () => {
        // 画背景图
        ctx.drawImage(img, 0, 0, width, height);
        // 画二维码
        ctx.drawImage(qrCodeimg, xw, 420, qrcodewidth, qrcodewidth);

        // 画头像与文字
        // ctx.font = "18px serif";
        // ctx.fillText(this.expressData.data.bannerTitle, 150, 50);
        this.circleImg(ctx, img, 100, 20, 20);

        // // 画商品
        ctx.drawImage(img, 100, 100, 200, 200);

        // 生成所有文案
        for (var i = 0; i < this.expressData.data.list.length; i++) {
          let value = this.expressData.data.list[i];
          if (value.type == "text") {
            this.drawText(value);
          }
        }
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
    this.getQrcodeImg(this.expressData.data.qrCodeUrl, 56);
    this.drawBgImage();
  }
});
