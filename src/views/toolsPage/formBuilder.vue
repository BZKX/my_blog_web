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
      <my-form id="myForm" ref="myForm"
               @updateFormList="updateFormList"
               @selectRow="selectedRowId"
               @selectedId="selectedDetail"
               :form-obj="formObj"></my-form>
      <slider-box @setOffset="setOffset"></slider-box>
    </div>
    <div class="setting-box">
      <div class="item-box">
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
                <!-- TODO 流体布局 -->
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
        </a-form-model>
      </div>
      <div class="item-box"
           v-show="selectedRow.selected">
        <a-divider style="font-size: 14px;color:#8c8c8c;">栅格编辑</a-divider>
        <a-form-model layout="horizontal"
                      style="margin-top: 20px"
                      :model="selectedRow"
                      v-bind="{labelCol: {span: 8},wrapperCol: {span: 16},}"
        >
          <a-form-model-item label="Key:">
            {{ selectedRow.rowId }}
          </a-form-model-item>
          <a-form-model-item v-for="item in selectedRow.item" :key="item.id" :label="`${item.label}权重:`">
            <a-input-number placeholder="labelCol"
                            v-model="item.span"
                            :precision="0"
                            :min="1"
                            :max="24"/>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="item-box"
           v-show="selectedItem.selected">
        <a-divider style="font-size: 14px;color:#8c8c8c;">详情配置</a-divider>
        <a-form-model layout="horizontal"
                      style="margin-top: 20px"
                      :model="selectedItem"
                      v-bind="{labelCol: {span: 8},wrapperCol: {span: 16},}"
        >
          <a-form-model-item v-if="formObj.formLayout.layout !== 'vertical'&&selectedItem.bind" label="labelCol:">
            <a-input-number placeholder="labelCol"
                            id="labelCol"
                            v-model="selectedItem.bind.labelCol"
                            :precision="0"
                            :min="1"
                            :max="24"/>
          </a-form-model-item>
          <a-form-model-item v-if="formObj.formLayout.layout !== 'vertical'&&selectedItem.bind" label="wrapperCol:">
            <a-input-number placeholder="labelCol"
                            id="wrapperCol"
                            v-model="selectedItem.bind.wrapperCol"
                            :precision="0"
                            :min="1"
                            :max="24"/>
          </a-form-model-item>
          <a-form-model-item label="标签:">
            <a-input placeholder="请输入标签名"
                     v-model="selectedItem.label"/>
          </a-form-model-item>
          <a-form-model-item label="绑定字段:">
            <a-input placeholder="请输入标签绑定字段名"
                     v-model="selectedItem.modelName"/>
          </a-form-model-item>
          <a-form-model-item label="占位符:">
            <a-input placeholder="请输入占位内容"
                     v-model="selectedItem.placeholder"/>
          </a-form-model-item>
          <a-form-model-item label="快捷删除按钮:">
            <a-switch v-model="selectedItem.allowClear"/>
          </a-form-model-item>
          <a-form-model-item label="是否必填:">
            <a-switch @change="requiredChange($event,selectedItem)" v-model="selectedItem.isRequired"/>
          </a-form-model-item>
          <template v-if="selectedItem.type=='input'">
            <a-form-model-item label="类型限制:">
              <a-select v-model="selectedItem.customRules.normalType"
                        allow-clear
                        @change="TypeChange($event,selectedItem)"
                        placeholder="输入类型限制">
                <a-select-option v-for="item in rulesTypeList" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="过滤首尾空格:">
              <a-switch v-model="formObj.formTrim"/>
            </a-form-model-item>
            <a-form-model-item label="图标前缀:">
              <a-tooltip title="使用方法: 将图标名复制到前缀输入框">
                <a-switch v-model="selectedItem.hasPrefix"/>
              </a-tooltip>
              <a-button @click="showIconWeb" type="link">
                官方图标
              </a-button>
              <a-popover placement="top">
                <template slot="content">
                  <span>功能开发中</span>
                </template>
                <!-- TODO 自定义图标功能 -->
                <a-button disabled type="link">
                  自定义图标
                </a-button>
              </a-popover>
            </a-form-model-item>
            <a-form-model-item v-if="selectedItem.hasPrefix" label="前缀图标名:">
              <a-input placeholder="请输入图标名"
                       v-model="selectedItem.prefix"/>
            </a-form-model-item>
            <a-form-model-item label="图标后缀:">
              <a-tooltip title="使用方法: 将图标名复制到前缀输入框">
                <a-switch v-model="selectedItem.hasSuffix"/>
              </a-tooltip>
              <a-button @click="showIconWeb" type="link">
                官方图标
              </a-button>
              <a-popover placement="top">
                <template slot="content">
                  <span>功能开发中</span>
                </template>
                <!-- TODO 自定义图标功能 -->
                <a-button disabled type="link">
                  自定义图标
                </a-button>
              </a-popover>
            </a-form-model-item>
            <a-form-model-item v-if="selectedItem.hasSuffix" label="前缀图标名:">
              <a-input placeholder="请输入图标名"
                       v-model="selectedItem.suffix"/>
            </a-form-model-item>
          </template>
        </a-form-model>
      </div>
      <div class="bottom-btn-box">
        <a-button @click="saveAsLocal" style="height: 100%;width: 100%;border-radius:0;" type="primary">
          保存到缓存
        </a-button>
      </div>
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
        rules: {},
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
                valueType: '',
                span: 12,
                id: 'col_15451548',
                label: '输入框1',
                placeholder: '请输入1',
                modelName: 'input_one',
                allowClear: false,  // 快捷删除
                isRequired: false,  // 是否必填
                customRules: {
                  normalType: undefined,
                },  //自定义规则
                hasPrefix: false,
                prefix: '',
                hasSuffix: false,
                suffix: '',
                bind: {
                  labelCol: 6,
                  wrapperCol: 18,
                }
              },
              {
                type: 'input',
                span: 12,
                id: 'col_15452548',
                placeholder: '请输入姓名',
                label: '姓名',
                modelName: 'name',
                allowClear: false,
                customRules: {
                  normalType: undefined,
                },  //自定义规则
                hasPrefix: false,
                hasSuffix: false,
                bind: {
                  labelCol: 6,
                  wrapperCol: 18,
                }
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
                id: 'col_15451148',
                label: '输入框1',
                placeholder: '请输入输入框',
                modelName: 'input',
                allowClear: false,
                customRules: {
                  normalType: undefined,
                },  //自定义规则
                hasPrefix: false,
                hasSuffix: false,
                bind: {
                  labelCol: 6,
                  wrapperCol: 18,
                }
              },
              // {
              //   span: 12,
              //   id: 'col_15451118',
              // }
            ]
          },
        ],
        formLayout: {
          formLayoutMode: 'grid',
          layout: 'horizontal_right',
          labelCol: 6,
          wrapperCol: 18,
        },
        formTrim: true,
      },
      offset: 10,
      myFormWidth: 0,
      selectedItem: {},
      selectedRow: {},
      rulesTypeList: [
        {
          label: 'Email',
          value: 'email',
          message: '',
        },
        {
          label: 'URL',
          value: 'url',
          message: '',
        },
        {
          label: '自定义',
          value: 1,
          message: '',
        },
        {
          label: '数字',
          value: 'number',
          message: '',
        },
        {
          label: '整数',
          value: 'integer',
          message: '',
        },
        {
          label: '浮点数',
          value: 'float',
          message: '',
        }
      ]
    }
  },
  created() {
    if (window.localStorage.getItem('myFormJson')) {
      console.log(JSON.parse(window.localStorage.getItem('myFormJson')));
      this.formObj = JSON.parse(window.localStorage.getItem('myFormJson'))
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
    // 跳转到ant_vue页面
    showIconWeb() {
      window.open('https://1x.antdv.com/components/icon-cn/')
    },
    // 单位选中
    selectedDetail(id) {
      this.formObj.formItemList.forEach(formItem => {
        formItem.selected = false
        formItem.item.forEach(item => {
          if (item.id == id) {
            this.selectedItem = item
          }
        })
      })
    },
    // 栅格行选中
    selectedRowId(id) {
      this.formObj.formItemList.forEach(formItem => {
        if (formItem.rowId == id) {
          this.selectedRow = formItem
        }
      })
    },
    // 必填选中
    requiredChange(e, item) {
      if (e) { // 必填
        this.formObj.rules[item.modelName] = [{
          required: true,
          message: `请输入${item.label}`,
          trigger: item.type == 'input' ? 'blur' : 'change'
        }]
      } else if (this.formObj.rules[item.modelName] !== undefined) { // 非必填
        delete this.formObj.rules[item.modelName]
      }
      this.$refs.myForm.repaint()
    },
    saveAsLocal() {
      this.$refs.myForm.save()
    },
    updateFormList(formList) {
      this.formObj.formItemList = formList
      this.formObj.formItemList.forEach(formItem => {
        formItem.selected = false
        formItem.item.forEach(item => {
          item.selected = false
        })
      })
      window.localStorage.setItem('myFormJson', JSON.stringify(this.formObj))
      this.$message.success('保存成功')
    },
    TypeChange(e, item) {
      let newRulesList = []
      if (this.formObj.rules[item.modelName]) {
        this.formObj.rules[item.modelName].forEach(val => {
          if (val.required || val.validator) {
            newRulesList.push(val)
          }
        })
      }
      if (e !== 1) {
        newRulesList.push({
          type: e,
          trigger: item.type == 'input' ? 'blur' : 'change'
        })
      }
      if (e == 'number' || e == 'integer' || e == 'float') {
        item.valueType = 'number'
      }
      this.formObj.rules[item.modelName] = newRulesList
      this.$refs.myForm.repaint()

    }
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
    box-shadow: 0 0 30px -5px rgba(0, 0, 0, .5);

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
    position: relative;
    height: 100%;
    width: 410px;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20px 20px 80px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 14px -5px rgba(0, 0, 0, .5);

    .item-box {
      display: flex;
      flex-direction: column;
    }

    .bottom-btn-box {
      position: fixed;
      height: 40px;
      width: 410px;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
