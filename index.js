const API_ROOT = "https://test.39916353.xiangwushuo.com/";

const axiosInstance = axios.create({
  baseURL: ""
  // withCredentials: true
});

var vueIntance = new Vue({
  el: "#app",
  data: {
    bgUrl: "https://mdn.mozillademos.org/files/206/Canvas_backdrop.png",
    imgPath:
      "https://imgs-1253854453.cossh.myqcloud.com/34430437579ac6c9d1af3c1cd3767df2.png"
  },
  methods: {
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
      console.log("getQrcodeImg start");
      Drawing.qrc("qrcanvas", this.imgPath, 150, 150);
    },

    // updateCanvas: function() {
    //   var canvas = document.getElementById("canvas");
    //   ctx = canvas.getContext("2d");
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   ctx.fillStyle = "black";
    //   ctx.font = "20px Georgia";
    //   ctx.fillText(this.exampleContent, 10, 50);
    // },

    // 绘制背景图
    drawBgImage: function() {
      //画海报
      var width = document.getElementById("canbox").offsetWidth; //宽度
      var height = document.getElementById("canbox").offsetHeight; // 高度
      var c = document.getElementById("myCanvas");
      c.width = width;
      c.height = height;
      var ctx = c.getContext("2d");
      //首先画上背景图
      var img = new Image();
      img.src =
        "http://ww1.sinaimg.cn/large/41e13d0bgy1fswrrra7fxj20ku0kuwfo.jpg";
      img.setAttribute("crossOrigin", "Anonymous");
      //名字的属性
      var x_bot = height - 44;
      ctx.font = "19px Georgia";

      // img.src =
      //   "https://nos.netease.com/easyread/fle/a0df1d4009c7a2ec5fee/1524215500140/avatar.png?" +
      //   +new Date();

      img.onload = () => {
        // 画图片
        ctx.drawImage(img, 0, 0, width, height);
        // 画文字
        ctx.fillText("Hello world", 10, 50);

        //绘制完成,转为图片
        setTimeout(function() {
          //在ios上无法在画完之后取到整个画布内容，加了个settimeout
          var bigcan = document.getElementsByClassName("canvas")[0];
          let images = new Image();
          images.src = bigcan.toDataURL("image/png");
          images.setAttribute("crossOrigin", "Anonymous");
          document
            .getElementsByClassName("canimg")
            .attr("src", bigcan.toDataURL("image/png"));
        }, 0);
      };
    }
  },
  mounted: function() {
    this.drawBgImage();
  }
});
