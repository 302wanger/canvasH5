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
        qrCodeUrl: {
          code: "www.jd.com",
          width: 50,
          height: 50,
          x: 10,
          y: 100
        },
        list: [
          {
            type: "image",
            imgUrl:
              "http://imgs-1253854453.image.myqcloud.com/67e3ab5de460228a1076f12e9dd908ee.jpg",
            width: 100,
            height: 100,
            x: 20,
            y: 200
          },
          {
            type: "image",
            imgUrl:
              "http://imgs-1253854453.image.myqcloud.com/67e3ab5de460228a1076f12e9dd908ee.jpg",
            width: 100,
            height: 100,
            x: 120,
            y: 400
          },
          {
            type: "text",
            text: "我正在0元领取这个宝贝",
            color: "#f00",
            font: "14",
            x: 30,
            y: 100
          },
          {
            type: "text",
            text: "已经拼2081团",
            color: "#000",
            font: "12",
            x: 1000,
            y: 400
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

    // 绘制图片
    myDrawImg: function(data) {
      let ctx = document.getElementById("myCanvas").getContext("2d");
      let img = new Image();
      img.onload = function() {
        ctx.drawImage(img, data.x, data.y, data.width, data.height);
      };
      img.src = data.imgUrl;
    },

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

      img.onload = () => {
        // 画背景图
        ctx.drawImage(img, 0, 0, width, height);
        // 画二维码
        ctx.drawImage(qrCodeimg, xw, 420, qrcodewidth, qrcodewidth);

        // 生成文案与图片
        for (var i = 0; i < this.expressData.data.list.length; i++) {
          let value = this.expressData.data.list[i];
          if (value.type == "text") {
            this.drawText(value);
          } else if (value.type == "image") {
            this.myDrawImg(value);
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
    this.getQrcodeImg(
      this.expressData.data.qrCodeUrl.code,
      this.expressData.data.qrCodeUrl.width
    );
    this.drawBgImage();
  }
});
