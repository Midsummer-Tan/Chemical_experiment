<template>
<div>
  <v-alert :value="true" type="warning" outline>
      <v-avatar size="60px">
        <img src="/images/yoda.png" alt="avatar" >
      </v-avatar>
      &emsp;吸取与挤出液体时：长按绿色按钮，按到橙色为档位一，按到红色为档位二，松开鼠标按钮回到绿色即原状态。
  </v-alert>
  <div class="progress-factor">
    <div class="progress-bar">
      <div
        class="bar has-rotation has-colors navy ruler-3"
        role="progressbar"
        :aria-valuenow="valueNow"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="scale"></div>
        <div class="scale-para">0</div>
        <div class="tooltip white"></div>
        <div class="bar-face face-position roof percentage3"></div>
        <div class="bar-face face-position back percentage3"></div>
        <div class="bar-face face-position floor percentage3 volume-lights"></div>
        <div class="bar-face face-position left"></div>
        <div class="bar-face face-position right"></div>
        <div class="bar-face face-position front percentage3 volume-lights shine"></div>
      </div>
    </div>
  </div>
  <div style="height:50px;"></div>
</div>
  
</template>
<style scoped>
@import "./css/component.css";
@import "./css/custom-bars.css";
</style>
<script>
export default {
  name: "myPipetteProgress",
  props:[
    'valueNow',
  ],
  methods: {}
};
</script>
