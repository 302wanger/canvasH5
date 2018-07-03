// Todo:
// 1. 获取id
// 2. 使用canvas生成图片
//   2.1:获取背景图片

// 3.

const API_ROOT = "https://test.39916353.xiangwushuo.com/";

const axiosInstance = axios.create({
  baseURL: "",
  withCredentials: true
});

// const appInstance = new Vue({
//   el: "#app",
//   data: {
//     isFirst: false,
//     companyCode: "",
//     expressNumber: "",
//     expressData: {},
//     dayTime: []
//   },

//   methods: {
//     getQueryParams: function() {
//       var params = {};
//       var parts = location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
//         m,
//         key,
//         value
//       ) {
//         params[key] = value;
//       });

//       return params;
//     },
//     // // canvas绘制海报
//     // drawPhoto: function() {
//     //   //获取Canvas对象(画布)
//     //   var canvas = document.getElementById("myCanvas");
//     //   //简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
//     //   if (canvas.getContext) {
//     //     //获取对应的CanvasRenderingContext2D对象(画笔)
//     //     var ctx = canvas.getContext("2d");

//     //     //创建新的图片对象
//     //     var img = new Image();
//     //     //指定图片的URL
//     //     img.src = "http://www.365mini.com/image/google_logo.png";
//     //     //浏览器加载图片完毕后再绘制图片
//     //     img.onload = function() {
//     //       //以Canvas画布上的坐标(10,10)为起始点，绘制图像
//     //       //图像的宽度和高度分别缩放到350px和100px
//     //       ctx.drawImage(img, 10, 10, 350, 100);
//     //     };
//     //   }
//     // }

//   },
//   mounted: function() {
//     // this.drawPhoto();
//     this.draw();
//   }
// });

var vueIntance = new Vue({
  el: "#app",
  data: {
    exampleContent: "This is TEXT",
    bgUrl: "https://mdn.mozillademos.org/files/206/Canvas_backdrop.png",
    imgPath:
      "https://imgs-1253854453.cossh.myqcloud.com/34430437579ac6c9d1af3c1cd3767df2.png"
  },
  methods: {
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
    drawPhoto: function() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      // 画背景图
      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect(0, 0, 675, 667);

      // 画二维码图
      var img = new Image();
      img.onload = () => {
        // 画图片
        // ctx.drawImage(img, 160, 500, 100, 100);
        ctx.drawImage(img, 0, 0, 375, 812);
        // toImage
        // var dataImg = new Image();
        // dataImg.src = canvas.toDataURL("image/png");
        // document.body.appendChild(dataImg); // 长按图片保存
      };
      img.crossOrigin = "anonymous";
      img.src =
        "https://nos.netease.com/easyread/fle/a0df1d4009c7a2ec5fee/1524215500140/avatar.png?" +
        +new Date();

      // 写字
      ctx.font = "20px Georgia";
      ctx.fillText(this.exampleContent, 10, 50);
    },

    //拿到数据后开始画背景大图 想法很简单就是把图片画到canvas中然后在画布上再画头像文字让后转成img
    drawCanvasBgImg: function() {
      var vm = this;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var clientWidth = this.getWindowInfo().width; //获取屏幕宽度用于canvas宽度自适应移动端屏幕
      var dpr = this.getWindowInfo().dpr;
      ctx.globalCompositeOperation = "source-atop"; //** 坑锯齿感觉没什么用不知道是不是用错地方了 **
      canvas.width = dpr * clientWidth; //由于手机屏幕时retina屏，都会多倍渲染，用dpr来动态设置画布宽高，避免图片模糊
      canvas.height = (dpr * clientWidth * 609) / 375; //去掉微信头部的状态栏应该是603 没搞懂603还是不能让图片满屏直接多加到了609
      var img = new Image();
      img.crossOrigin = ""; //死坑的图片跨域 （img.crossOrigin = "Anonymous"这种写法还是不能显示base64格式图片）
      img.src = this.bgUrl;
      img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  },
  mounted: function() {
    // this.updateCanvas();
    this.drawPhoto();
    this.getQrcodeImg();
    // this.drawCanvasBgImg();
  }
});
