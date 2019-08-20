<template>
  <div class="progress-factor">
    <div class="progress-bar">
      <div
        class="bar has-rotation has-colors cyann ruler-3"
        role="progressbar"
        :aria-valuenow="valueNow"
        aria-valuemin="0"
        aria-valuemax="25"
      >
        
        <div class="scale"></div>
		<div
          class="scale2"
          style="margin-left:2%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:4%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:6%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:8%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:12%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:14%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:16%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:18%;position: absolute"
        ></div>
        <div class="scale-para">0</div>
		<div
          class="scale1"
          style="margin-left:10%;position: absolute"
        ></div>




        <div
          class="scale"
          style="margin-left:20%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:22%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:24%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:26%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:28%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:32%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:34%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:36%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:38%;position: absolute"
        ></div>
		<div
          class="scale-para"
          style="margin-left:8%"
        >2.5</div>
        <div
          class="scale-para"
          style="margin-left:20%"
        >5</div>
		<div
          class="scale1"
          style="margin-left:30%;position: absolute"
        ></div>




        <div
          class="scale"
          style="margin-left:40%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:42%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:44%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:46%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:48%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:52%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:54%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:56%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:58%;position: absolute"
        ></div>
        <div
          class="scale-para"
          style="margin-left:40%"
        >10</div>
		<div
          class="scale1"
          style="margin-left:50%;position: absolute"
        ></div>




        <div
          class="scale"
          style="margin-left:60%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:62%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:64%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:66%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:68%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:72%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:74%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:76%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:78%;position: absolute"
        ></div>
        <div
          class="scale-para"
          style="margin-left:60%"
        >15</div>
		<div
          class="scale1"
          style="margin-left:70%;position: absolute"
        ></div>




        <div
          class="scale"
          style="margin-left:80%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:82%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:84%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:86%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:88%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:92%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:94%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:96%;position: absolute"
        ></div>
		<div
          class="scale2"
          style="margin-left:98%;position: absolute"
        ></div>
        <div
          class="scale-para"
          style="margin-left:80%"
        >20</div>
		<div
          class="scale1"
          style="margin-left:90%;position: absolute"
        ></div>

        <div
          class="scale"
          style="margin-left:100%;position: absolute"
        ></div>
		<div
          class="scale-para"
          style="margin-left:100%"
        >25ml</div>
        <div class="bar-face face-position roof percentage1"></div>
        <div class="bar-face face-position back percentage1"></div>
        <div class="bar-face face-position floor percentage1 volume-lights"></div>
        <div class="bar-face face-position left"></div>
        <div class="bar-face face-position right"></div>
        <div class="bar-face face-position front percentage1 volume-lights shine"></div>
      </div>
    </div>
  </div>
</template>
<style  scoped>
@import "./css/component.css";
@import "./css/custom-bars.css";
</style>
<script>
export default {
  name: "myProgress",
  props:['valueNow'],
  methods: {}
}
</script>
