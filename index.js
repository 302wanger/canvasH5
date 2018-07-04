const API_ROOT = "https://www.easy-mock.com/mock/5b19307a3f6ddd76d8ff7cd6/";

const axiosInstance = axios.create({
  baseURL: ""
  // withCredentials: true
});

var h5Intance = new Vue({
  el: "#app",
  data: {
    expressData: {}
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
              that.getQrcodeImg();
              that.drawBgImage();
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
        text: this.expressData.qrCodeUrl,
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
      img.src = this.expressData.imgPath;
      img.setAttribute("crossOrigin", "Anonymous");

      // 二维码图片设置
      var mycans = document.getElementsByTagName("canvas")[1]; //二维码所在的canvas
      var codeimg = this.convertCanvasToImage(mycans);
      var xw = width - 72 - 29;
      var xh = height - 6 - 72;
      let qrcodewidth = 60;

      img.onload = () => {
        // 画背景图
        ctx.drawImage(img, 0, 0, width, height);
        // 画二维码
        ctx.drawImage(codeimg, xw, xh, qrcodewidth, qrcodewidth);
      };
    }
  },
  mounted: function() {
    this.getImgUrl();
  }
});
