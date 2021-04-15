<template>
  <a-dropdown :visible="dropShow" :trigger="['contextmenu']">
    <div @click="closeMenu" @contextmenu.prevent="mouseclick" class="content">
      <a-form
          style="width: 100%;height: 100%;"
          :layout="getLayout"
          id="form"
          :labelAlign="getLayoutAlign"
          :ref="refName"
          :model="form"
          :rules="rules"
          v-bind="formItemLayout"
      >
        <a-row class="row-box" v-for="formItem in formItemList" :gutter="formItem.gutter" :key="formItem.rowId">
          <div class="handle-box">
            <a-icon class="handle" type="menu" />
          </div>
          <a-col v-for="item in formItem.item"
                 @click="rowClick(item.id)"
                 :span="item.span"
                 :key="item.id">
            <a-form-item :ref="item.modelName"
                         :class="[item.selected?'col-selected':'','col-box']"
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
import Sortable from 'sortablejs';

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
      formItemList: this.formObj.formItemList,
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
    let _this = this
    //获取对象
    var el = document.getElementById('form');
    //初始化
    Sortable.create(el, {
      animation: 500,
      handle: '.handle', // handle's class
      //拖动结束
      onEnd: function (evt) {
        console.log(evt);
        _this.formItemList.splice(evt.newIndex, 0, _this.formItemList.splice(evt.oldIndex, 1)[0]);
      },
    });
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
  flex: 1;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 4px;
  /* 文字不可选中 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .row-box{
    position: relative;
    margin-bottom: 10px;
    border-bottom: 1px dashed #8c8c8c;

    .handle-box{
      position: absolute;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      top: 0;
      right: -10px;
      cursor: move;
      .handle{
        font-size: 16px;
        color: #2c3e50;
        line-height: 20px;
        margin-top: -10px;
      }
    }
  }
}

.col-box {
  box-sizing: border-box;
}

.col-selected {
  //cursor: move;
  //background-color: #f6f5ec;
  border: 1px dashed #008792;
}

</style>
