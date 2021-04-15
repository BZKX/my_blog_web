<template>
  <div class="home">
    <div class="left-box">
      <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          sub-title="可视化表单编辑"
          @back="goHome"
      />
      <div class="content">
      </div>
    </div>
    <div class="main-box" id="mainBox" :style="'padding: 34px '+offset+'px 10px'">
      <a-divider class="width-tip"
                 :style="{fontSize: '14px',color:'#3e3e3e',width:myFormWidth+'px'}">
        表单宽度{{
          myFormWidth
        }}px
      </a-divider>
      <my-form id="myForm" :form-obj="formObj"></my-form>
      <slider-box @setOffset="setOffset"></slider-box>
    </div>
    <div class="setting-box">
      <a-divider style="font-size: 14px;color:#8c8c8c;">表单全局设置</a-divider>
      <a-form-model layout="horizontal"
                    style="margin-top: 20px"
                    :model="formObj.formLayout"
                    v-bind="{labelCol: {span: 8},wrapperCol: {span: 16},}"
      >
        <a-form-model-item label="布局模式:">
          <a-radio-group v-model="formObj.formLayout.formLayoutMode">
            <a-radio-button value="grid">
              栅格布局
            </a-radio-button>
            <a-popover placement="top">
              <template slot="content">
                <span>功能开发中</span>
              </template>
              <a-radio-button disabled value="flex">
                流体布局
              </a-radio-button>
            </a-popover>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="表单布局:">
          <a-radio-group v-model="formObj.formLayout.layout">
            <a-radio-button value="horizontal_left">
              左侧
            </a-radio-button>
            <a-radio-button value="horizontal_right">
              右侧
            </a-radio-button>
            <a-radio-button value="vertical">
              上侧
            </a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item v-show="formObj.formLayout.layout !== 'vertical'" label="labelCol:">
          <a-input-number placeholder="labelCol"
                          id="labelCol"
                          v-model="formObj.formLayout.labelCol"
                          :min="1"
                          :max="24"/>
        </a-form-model-item>
        <a-form-model-item v-show="formObj.formLayout.layout !== 'vertical'" label="wrapperCol:">
          <a-input-number placeholder="labelCol"
                          id="wrapperCol"
                          v-model="formObj.formLayout.wrapperCol"
                          :min="1"
                          :max="24"/>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import MyForm from "./components/myForm.vue";
import sliderBox from "./components/sliderBox.vue";

export default {
  name: "formBuilder",
  components: {MyForm, sliderBox},
  data() {
    return {
      formObj: {
        refName: 'formRef',
        rulse: {},
        form: {
          name: '',
          input_one: '',
        },
        formItemList: [
          {
            rowId: 'row_215485',
            gutter: 16,
            item: [
              {
                type: 'input',
                span: 12,
                id: 'input_15451548',
                label: '输入框1',
                placeholder: '请输入1',
                modelName: 'input_one'
              },
              {
                type: 'input',
                span: 12,
                id: 'input_15452548',
                placeholder: '请输入姓名',
                label: '姓名',
                modelName: 'name'
              },
            ]
          },
          {
            rowId: 'row_2115485',
            gutter: 16,
            item: [
              {
                type: 'input',
                span: 12,
                id: 'input_15451148',
                label: '输入框1',
                placeholder: '请输入输入框',
                modelName: 'input_one'
              }
            ]
          },
        ],
        formLayout: {
          formLayoutMode: 'grid',
          layout: 'horizontal_right',
          labelCol: 6,
          wrapperCol: 18,
        }
      },
      offset: 10,
      myFormWidth: 0,
    }
  },
  mounted() {
    this.myFormWidth = document.querySelector('#myForm').offsetWidth
  },
  methods: {
    goPage(path) {
      this.$router.push(path)
    },
    goHome() {
      this.$router.push('/')
    },
    setOffset(value) {
      this.myFormWidth = document.querySelector('#myForm').offsetWidth
      this.offset = value
    },
  },
}
</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  .left-box {
    height: 100%;
    min-width: 300px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .content {
      border-right: 1px solid rgb(235, 237, 240);
      width: 100%;
      box-sizing: border-box;
      padding: 20px 10px;
      flex: 1;
      overflow-y: auto;
    }
  }

  .main-box {
    flex: 1;
    min-width: 800px;
    box-sizing: border-box;
    padding: 10px 0 10px 10px;
    background-color: #e9ebec;
    display: flex;
    justify-content: center;
    position: relative;

    .width-tip {
      position: absolute;
      text-align: center;
      top: 0;
      left: calc(50% - 4px);
      transform: translateX(-50%);
      //width: 100%;
      min-width: auto;
      margin-top: 8px;
      margin-bottom: 0;
      border-left: 1px dashed #2c3e50;
      border-right: 1px dashed #2c3e50;

      &:before {
        border-top: 1px dashed #2c3e50;
      }

      &:after {
        border-top: 1px dashed #2c3e50;
      }
    }
  }

  .setting-box {
    transition: all .4s ease-in-out;
    height: 100%;
    min-width: 320px;
    border-left: 1px solid rgb(235, 237, 240);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
}
</style>
