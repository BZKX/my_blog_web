<template>
  <a-dropdown :visible="dropShow" :trigger="['contextmenu']">
    <div @click="closeMenu" @contextmenu.prevent="mouseclick" class="content">
      <a-form
          style="width: 100%;height: 100%;"
          :layout="getLayout"
          :labelAlign="getLayoutAlign"
          :ref="refName"
          :model="form"
          :rules="rules"
          v-bind="formItemLayout"
      >
        <a-row v-for="formItem in formObj.formItemList" :gutter="formItem.gutter" :key="formItem.rowId">
          <a-col v-for="item in formItem.item"
                 @click="rowClick(item.id)"
                 :class="[item.selected?'col-selected':'','col-box']"
                 :span="item.span"
                 :key="item.id">
            <a-form-item :ref="item.modelName"
                         :label="item.label"
                         :name="item.modelName">
              <a-input :placeholder="item.placeholder" v-model="form[item.modelName]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-menu id="menu" ref="menu" slot="overlay">
      <a-menu-item @click="copyJSON" key="copyJSON">
        复制JSON体(需要配合该组件渲染)
      </a-menu-item>
      <a-menu-item disabled @click="downCode" key="downCode">
        下载组件(ant-vue 1x)(Vue2)
      </a-menu-item>
      <a-menu-item @click="goGitHub" key="goGitHub">
        访问代码(GitHub)
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import {copy} from "../../../until/current";

export default {
  name: "myForm",
  props: {
    formObj: {
      type: Object,
      default: () => {
        return {
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
                  modelName: 'input_one'
                },
                {
                  type: 'input',
                  span: 12,
                  id: 'input_15452548',
                  label: '姓名',
                  modelName: 'name'
                },
              ]
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      form: this.formObj.form,
      refName: this.formObj.refName,
      rules: this.formObj.rules,
      dropShow: false,
    }
  },
  computed: {
    formItemLayout() {
      const {layout, labelCol, wrapperCol} = this.formObj.formLayout;
      return layout.indexOf('horizontal') !== -1
          ? labelCol ?
              {
                labelCol: {span: labelCol},
                wrapperCol: {span: wrapperCol ? wrapperCol : 24 - labelCol},
              } : {
                labelCol: {span: 6},
                wrapperCol: {span: 18},
              }
          : {};
    },
    getLayout() {
      const {layout} = this.formObj.formLayout;
      return layout.indexOf('horizontal') !== -1
          ? 'horizontal'
          : 'vertical'
    },
    getLayoutAlign() {
      const {layout} = this.formObj.formLayout;
      return layout.indexOf('right') !== -1
          ? 'right'
          : 'left'
    }
  },
  mounted() {
  },
  methods: {
    rowClick(id) {
      this.formObj.formItemList.forEach(formItem => {
        formItem.selected = false
        formItem.item.forEach(item => {
          if (item.id == id) {
            item.selected = true
          } else {
            item.selected = false
          }
        })
      })
      this.$forceUpdate()
    },
    // 复制JSON
    copyJSON() {
      copy(JSON.stringify(this.formObj))
    },
    // 下载组件
    downCode() {
      this.$message.info('该功能开发中')
    },
    goGitHub() {
      window.open('')
    },
    closeMenu() {
      this.dropShow = false
    },
    mouseclick() {
      this.dropShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  overflow-y: auto;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  /* 文字不可选中 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.col-box {
  box-sizing: border-box;
}

.col-selected {
  cursor: move;
  //background-color: #f6f5ec;
  //border: 1px solid #d3d7d4;
}

</style>
