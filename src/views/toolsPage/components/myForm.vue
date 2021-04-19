<template>
  <a-dropdown :visible="dropShow" :trigger="['contextmenu']">
    <div @click="closeMenu" @contextmenu.prevent="mouseclick" class="content">
      <a-spin :spinning="repaintLoading" :indicator="indicator" tip="重新构建表单中...">
        <a-form-model
            style="width: 100%;height: 100%;"
            :layout="getLayout"
            id="form"
            :labelAlign="getLayoutAlign"
            :ref="refName"
            :model="form"
            :rules="formObj.rules"
        >
          <draggable v-model="formItemList"
                     animation="500"
                     filter="#row_last"
                     :move="lastRowMove"
                     handle=".handle">
            <a-row :class="['row-box',formItem.selected?'row-selected':'']"
                   v-for="(formItem,index) in formItemList"
                   :gutter="formItem.gutter"
                   :id="formItem.rowId"
                   :key="formItem.rowId">
              <div v-if="index!=formItemList.length-1" class="handle-box">
                <a-popover placement="left">
                  <template slot="content">
                    <span>拖动列</span>
                  </template>
                  <a-icon class="handle" type="drag"/>
                </a-popover>
                <a-popover placement="left">
                  <template slot="content">
                    <span>编辑列</span>
                  </template>
                  <a-icon @click="selectRow(formItem.rowId)" class="icon edit" type="edit"/>
                </a-popover>
                <a-popover placement="left">
                  <template slot="content">
                    <span>删除列</span>
                  </template>
                  <a-icon @click="delRow(index)" class="icon del" type="delete"/>
                </a-popover>
              </div>
              <div class="tip-add" v-if="index==formItemList.length-1">
                <p>拖动到此处添加新的行</p>
              </div>
              <draggable style="width: 100%;display: flex"
                         v-model="formItem.item"
                         group="item"
                         handle=".ant-form-item-label"
                         animation="500">
                <div v-for="item in formItem.item"
                     class="my-col"
                     @click="rowClick(item.id)"
                     :style="{flex:item.span}"
                     :key="item.id">
                  <!-- Input -- trim -->
                  <a-form-model-item :ref="item.modelName"
                                     v-if="item.type == 'input'&&formObj.formTrim"
                                     :class="[item.selected?'col-selected':'','col-box']"
                                     :label="item.label"
                                     :prop="item.modelName"
                                     v-bind="{
                                               labelCol: {span: item.bind.labelCol},
                                               wrapperCol: {span: item.bind.wrapperCol},
                                             }"
                                     :name="item.modelName">
                    <a-input v-if="item.valueType == 'number'"
                             :placeholder="item.placeholder"
                             :allow-clear="item.allowClear"
                             v-model.trim.number="form[item.modelName]">
                      <a-icon v-if="item.hasPrefix" slot="prefix" :type="item.prefix"/>
                      <a-icon v-if="item.hasSuffix" slot="suffix" :type="item.suffix"/>
                    </a-input>
                    <a-input v-else :placeholder="item.placeholder"
                             :allow-clear="item.allowClear"
                             v-model.trim="form[item.modelName]">
                      <a-icon v-if="item.hasPrefix" slot="prefix" :type="item.prefix"/>
                      <a-icon v-if="item.hasSuffix" slot="suffix" :type="item.suffix"/>
                    </a-input>
                  </a-form-model-item>
                  <!-- Input -- no trim -->
                  <a-form-model-item :ref="item.modelName"
                                     v-else-if="item.type == 'input'"
                                     :class="[item.selected?'col-selected':'','col-box']"
                                     :label="item.label"
                                     :prop="item.modelName"
                                     :name="item.modelName">
                    <a-input v-if="item.valueType == 'number'"
                             :placeholder="item.placeholder"
                             :allow-clear="item.allowClear"
                             v-model.number="form[item.modelName]">
                      <a-icon v-if="item.hasPrefix" slot="prefix" :type="item.prefix"/>
                      <a-icon v-if="item.hasSuffix" slot="suffix" :type="item.suffix"/>
                    </a-input>
                    <a-input v-else :placeholder="item.placeholder"
                             :allow-clear="item.allowClear"
                             v-model="form[item.modelName]">
                      <a-icon v-if="item.hasPrefix" slot="prefix" :type="item.prefix"/>
                      <a-icon v-if="item.hasSuffix" slot="suffix" :type="item.suffix"/>
                    </a-input>
                  </a-form-model-item>
                </div>
              </draggable>
            </a-row>
          </draggable>
        </a-form-model>
      </a-spin>
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
// import Sortable from 'sortablejs';
import draggable from 'vuedraggable'

export default {
  name: "myForm",
  components: {draggable},
  props: {
    formObj: {
      type: Object,
      default: () => {
        return {
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
                  span: 12,
                  id: 'col_15451548',
                  label: '输入框1',
                  placeholder: '请输入1',
                  modelName: 'input_one'
                },
                {
                  type: 'input',
                  span: 12,
                  id: 'col_15452548',
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
                  id: 'col_15451148',
                  label: '输入框1',
                  placeholder: '请输入输入框',
                  modelName: 'input_one'
                },
                {
                  span: 12,
                  id: 'col_15451148',
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
        }
      }
    }
  },
  data() {
    return {
      form: this.formObj.form,
      refName: this.formObj.refName,
      rules: JSON.parse(JSON.stringify(this.formObj.rules)),
      formItemList: this.formObj.formItemList,
      dropShow: false,
      repaintLoading: false,
      indicator: <a-icon type="loading" spin/>,
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
    // let _this = this
    // 行拖动
    // 获取对象
    // var el = document.getElementById('form');
    // console.log(el);
    // // 初始化
    // Sortable.create(el, {
    //   animation: 500,
    //   fallbackOnBody: true,
    //   handle: '.handle', // handle's class
    //   //拖动结束
    //   onEnd: function (evt) {
    //     console.log(evt.newIndex);
    //     _this.formItemList.splice(evt.newIndex, 0, _this.formItemList.splice(evt.oldIndex, 1)[0]);
    //   },
    // });

    // var colList = document.querySelectorAll('.row-box');
    // colList.forEach((col, index) => {
    //   Sortable.create(col, {
    //     fallbackOnBody: true,
    //     animation: 500,
    //     //拖动结束
    //     onEnd: function (evt) {
    //       _this.formItemList[index].item.splice(evt.newIndex, 0, _this.formItemList[index].item.splice(evt.oldIndex, 1)[0]);
    //       console.log(index);
    //       console.log(evt.newIndex);
    //       console.log(_this.formItemList[index].item);
    //       // _this.formItemList.splice(evt.newIndex, 0, _this.formItemList.splice(evt.oldIndex, 1)[0]);
    //     },
    //   });
    // })
  },
  methods: {
    repaint() {
      this.repaintLoading = true
      this.formItemList = []
      setTimeout(() => {
        this.formItemList = this.formObj.formItemList
        this.repaintLoading = false
      }, 800)
    },
    rowClick(id) {
      this.$emit('selectedId', id)
      this.formObj.formItemList.forEach(formItem => {
        formItem.selected = false
        if (formItem.item) {
          formItem.item.forEach(item => {
            if (item.id == id) {
              item.selected = true
            } else {
              item.selected = false
            }
          })
        }
      })
      this.$forceUpdate()
    },
    selectRow(id) {
      this.$emit('selectRow', id)
      this.formObj.formItemList.forEach(formItem => {
        if (formItem.rowId == id) {
          formItem.selected = true
        } else {
          formItem.selected = false
        }
        if (formItem.item) {
          formItem.item.forEach(item => {
            item.selected = false
          })
        }
      })
      this.$forceUpdate()
    },
    // 删除行
    delRow(index) {
      let _this = this
      this.$confirm({
        title: '是否删除改行表单数据',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          _this.$emit('delRow', index)
        }
      });
    },
    // 复制JSON
    copyJSON() {
      let postForm = JSON.parse(JSON.stringify(this.formObj))
      postForm.formItemList.pop()
      copy(JSON.stringify(postForm))
      this.dropShow = false
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
    },
    save() {
      this.$emit('updateFormList', this.formItemList)
    },
    lastRowMove(e) {
      if (e.related.id == 'row_last') return false;
      return true;
    },
  },
  watch: {
    formItemList: {
      deep: true,
      handler(newVal) {
        if (newVal[newVal.length - 1].item && newVal[newVal.length - 1].item.length) {
          this.$emit('updateNewRow')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .ant-spin-nested-loading {
  height: 100%;
}

::v-deep .ant-form-item-label {
  cursor: move;

  > label {
    cursor: move;
  }
}

.content {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 26px 20px 20px;
  border-radius: 4px;
  /* 文字不可选中 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .row-box {
    min-height: 85px;
    position: relative;
    //margin-bottom: 20px;
    padding-top: 20px;
    border-bottom: 1px dashed #8c8c8c;
    transition: background-position .4s ease-in-out;
    background-position-x: -100px;
    background-image: linear-gradient(to right, #e3f9fd, #ffffff, #ffffff);
    background-position: 100% 0;
    background-size: 200%;
    display: flex;
    flex-direction: row;

    .my-col {
      flex: 1;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 10px;
    }

    .handle-box {
      position: absolute;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      top: 0;
      right: -18px;

      .handle {
        cursor: move;
        font-size: 18px;
        color: #2c3e50;
        line-height: 22px;
        transition: all .2s ease-in-out;
        //margin-top: -10px;

        &:hover {
          transform: scale(1.5);
          color: #1890ff
        }
      }

      .icon {
        cursor: pointer;
        font-size: 16px;
        color: #2c3e50;
        line-height: 22px;
        transition: all .2s ease-in-out;
        //margin-top: -10px;
      }

      .edit:hover {
        transform: scale(1.5);
        color: #008792
      }

      .del:hover {
        transform: scale(1.5);
        color: #f5222d
      }
    }
  }

  .row-selected {
    background-image: linear-gradient(to right, #e3f9fd, #ffffff, #ffffff);
    background-position: 0 0;
  }
}

.col-box {
  box-sizing: border-box;
  transition: all .2s ease-in-out;
}

.col-selected {
  //cursor: move;
  //background-color: #f6f5ec;
  //border: 1px dashed #008792;
  box-shadow: 0 0 0 2px #ffffff,
  0 0 0 2px #ffffff,
  0 0 3px 2px rgba(42, 42, 42, 0.6);
}

#row_last {
  background-image: none;
  border-left: #8c8c8c dashed 1px;
  border-right: #8c8c8c dashed 1px;
  background-color: rgba(227, 249, 253, 0.5) !important;
  transition: background-color .4s ease-in-out;

  &:hover {
    background-color: rgba(227, 249, 253, 0.8) !important;
  }

  .tip-add {
    position: absolute;
    line-height: 45px;
    width: 100%;

    p {
      text-align: center;
      color: #8c8c8c;
    }
  }
}


</style>
