<template>
  <div>
    <div class="box">
      <input
        id="upload_file"
        class="upload_file"
        type="file"
        @change="handleFileChange"
        ref="inputer"
      >
      <label for="upload_file"></label>
      <v-btn block round depressed color="primary darken-1">{{file?fileName:"选择文件"}}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "dim-upload",
  data() {
    return {
      file: null,
      fileName: ""
    };
  },
  props: {
    type: String
  },
  methods: {
    handleFileChange(e) {
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0];
      let size = Math.floor(this.file.size / 1024);
      if (size > 1000) {
        this.file = null;
        return false;
      }
      var format = this.file.name.split(".")[1];
      if (format != this.type) {
        this.file = null;
        return false;
      }
      // 触发这个组件对象的input事件
      this.$emit("input", this.file);
      this.fileName = this.file.name;
      // 这里就可以获取到文件的名字了
      // return v-model
      this.value = this.file;
      // 这里加个回调也是可以的
      this.onChange && this.onChange(this.file, inputDOM.value);
    }
  }
};
</script>

<style scoped>
.box {
  position: relative;
}
.upload_file {
  position: absolute;
  height: 0px;
  left: -9999px;
}
/* 使label充满整个box*/
label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10; /* 这个z-index之后说到*/
}
</style>
