# Canvas 实现 H5 海报 - Vue 版

由于后端画图严重影响服务器性能，所以改为由前端来做。利用 canvas 与 vue 生成 H5 海报。

### Installing

```
git clone 项目名
```

## 使用方法

1.  安装 http-server：打开终端，进入目标文件夹，安装 http-server：npm install http-server -g

2.  启动服务：在终端敲入 http-server 启动

    ![终端](http://ww1.sinaimg.cn/large/41e13d0bgy1ft3oj7jgjsj20fu0ck74z.jpg)

3.  查看结果：在谷歌游览器打开 http://127.0.0.1:8080

    ![结果](http://ww1.sinaimg.cn/large/41e13d0bgy1ft3ollwmp8j20dx0ncjx4.jpg)

## Built With

- [Vue](https://vuejs.org/) - 前端框架
- [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) - html5 特性
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

### 实现原理

1.  利用 Canvas 画板功能实现海报：[Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
2.  项目中图片数据临时使用，所以 expressData 中数据直接写死
3.  利用 Vue 与 axios 向后端发送数据请求（暂未启用）

### 请求数据说明

```
expressData: {
      data: {
        // 这个是背景图
        imgPath:
          "http://imgs-1253854453.cossh.myqcloud.com/fdbd20b19b6ab2ea2f12b4910ac91d45.png",
        // 这个是需要生成的二维码的信息
        // code:需要转为二维码的数据
        // width: 二维码宽度
        // height：二维码高度
        // x：x轴的坐标
        // y：y轴的坐标
        qrCodeUrl: {
          code: "www.jd.comfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
          width: 110,
          height: 110,
          x: 224,
          y: 370
        },
        // 页面其他元素
        // type: 后端返回数据有两种，image（图片）和text（文本）
        // imgUrl: 图片元素的链接
        // text：文本内容
        // width：宽度
        // height：高度
        // x: x轴的坐标
        // y: y轴的坐标
        // isCircle: 判断是否是用户头像
        // color： 文本的颜色
        // font：字体大小与类型
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
```

### 注意事项

1.  图片跨域问题，Chrome 需要下载 CORS 插件解决

## Authors 关于作者

- **程明应**
- **付东鑫**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
