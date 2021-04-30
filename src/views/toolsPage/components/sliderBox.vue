<template>
  <div
    class="hold-box"
    @mousedown="mouseDown"
    id="moveBox"
    unselectable="on"
    onselectstart="return false"
  >
    <div class="icon"></div>
  </div>
</template>

<script>
import { throttle } from "../../../until/current";
export default {
  name: "sliderBox",
  data() {
    return {
      offset: 10,
      offsetOffset: 10,
      maxOffset: 0,
      firstDown: 0,
      lastX: "",
      timer: false,
      screenWidth: document.body.clientWidth,
    };
  },
  created() {
    document.addEventListener("mouseup", this.mouseUp);
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    // console.log(document.querySelector('#mainBox').offsetWidth);
    this.maxOffset = (document.querySelector("#mainBox").offsetWidth - 400) / 2;
    // console.log(this.maxOffset);
  },
  methods: {
    mouseDown(event) {
      document.addEventListener("mousemove", throttle(this.mouseMove, 20));
      if (!this.firstDown) {
        this.firstDown = event.screenX;
      } else {
        this.offsetOffset = this.offset;
      }
      this.lastX = event.screenX;
    },
    mouseMove(event) {
      let offset = this.lastX - event.screenX;
      if (offset > 0) {
        this.offset = this.offsetOffset + offset;
      } else if (offset < 0) {
        this.offset = this.offsetOffset + offset;
      }
      if (this.offset > 10 && this.offset < this.maxOffset) {
        this.$emit("setOffset", this.offset);
      } else if (this.offset <= 10) {
        this.$emit("setOffset", 10);
      } else if (this.offset >= this.maxOffset) {
        this.$emit("setOffset", this.maxOffset);
      }
    },
    mouseUp() {
      this.lastX = "";
      document.removeEventListener("mousemove", this.mouseMove);
    },
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          // 打印screenWidth变化的值
          that.firstDown = 0;
          that.maxOffset =
            (document.querySelector("#mainBox").offsetWidth - 400) / 2;
          that.$emit("setOffset", 10);
          that.timer = false;
        }, 400);
      }
    },
  },
  destroyed() {
    document.removeEventListener("mouseup", this.mouseUp);
  },
};
</script>

<style lang="less" scoped>
.hold-box {
  //top: 0;
  //right: -10px;
  //position: absolute;
  height: 100%;
  width: 8px;
  padding-left: 2px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // 禁止拖动时选中
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  &:hover {
    background-color: rgba(62, 62, 62, 0.2);
    cursor: e-resize;
  }

  .icon {
    height: 40px;
    width: 4px;
    background-color: #696969;
  }
}
</style>
