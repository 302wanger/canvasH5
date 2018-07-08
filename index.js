const API_ROOT = "https://www.easy-mock.com/mock/5b19307a3f6ddd76d8ff7cd6/";

const axiosInstance = axios.create({
  baseURL: ""
  // withCredentials: true
});

var h5Intance = new Vue({
  el: "#app",
  data: {
    ctx: null,
    canvas: null,
    weChatWidth: 375,
    expressData: {
      data: {
        imgPath:
          "http://imgs-1253854453.cossh.myqcloud.com/fdbd20b19b6ab2ea2f12b4910ac91d45.png",
        qrCodeUrl: {
          code: "www.jd.comfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
          width: 110,
          height: 110,
          x: 224,
          y: 370
        },
        list: [
          {
            type: "image",
            imgUrl:
              "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoFN9WMUV2y7un0hvsBbIc5W9Q94nuQlIhBso2Kib6vRXibgUia8pE60W1LTGmGOk4bC7BfsWBia3Xufw/132",
            width: 50,
            height: 50,
            x: 40,
            y: 53,
            isCircle: true
          },
          {
            type: "image",
            imgUrl:
              "http://imgs-1253854453.cossh.myqcloud.com/0aa8a0e8f25a0f608deefb36c34be39f.jpg",
            width: 242,
            height: 242,
            x: 70,
            y: 120
          },
          {
            type: "text",
            text: "迪士尼儿童背带",
            color: "#f00",
            font: "24px Airal",
            x: 30,
            y: 400
          },
          {
            type: "text",
            text: "2081",
            color: "#000",
            font: "16px Airal",
            x: 90,
            y: 427
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
      let img = new Image();
      img.onload = () => {
        if (data.isCircle) {
          this.circleImg(this.ctx, img, data.x, data.y, 25);
        } else {
          this.ctx.drawImage(img, data.x, data.y, data.width, data.height);
        }
      };
      img.src = data.imgUrl;
    },

    // 绘制文字
    drawText: function(data) {
      this.ctx.font = data.font;
      this.ctx.fillText(data.text, data.x, data.y);
    },

    drawBgImage: function() {
      //背景图设置
      var img = new Image();
      img.src = this.expressData.data.imgPath;
      img.setAttribute("crossOrigin", "Anonymous");

      // 二维码图片设置
      var mycans = document.getElementsByTagName("canvas")[1]; //二维码所在的canvas
      var qrCodeimg = this.convertCanvasToImage(mycans);

      img.onload = () => {
        const width = img.width,
          height = img.height;

        const canvasWidth = this.weChatWidth;
        const canvasHeight = parseInt((this.weChatWidth / width) * height);

        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        img.width = canvasWidth;
        img.height = canvasHeight;
        const domObj = document.getElementById("canbox");
        domObj.style.width = canvasWidth + "px";
        domObj.style.height = canvasHeight + "px";
        // 画背景图
        this.ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        // 画二维码
        this.ctx.drawImage(
          qrCodeimg,
          this.expressData.data.qrCodeUrl.x,
          this.expressData.data.qrCodeUrl.y,
          this.expressData.data.qrCodeUrl.width,
          this.expressData.data.qrCodeUrl.height
        );

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
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.getQrcodeImg(
      this.expressData.data.qrCodeUrl.code,
      this.expressData.data.qrCodeUrl.width
    );
    this.drawBgImage();
  }
});
