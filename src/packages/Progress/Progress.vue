<template>
  <div class="progress-factor">
    <div class="progress-bar">
      <div
        class="bar has-rotation has-colors dark ruler-3"
        role="progressbar"
        :aria-valuenow="ariaValuenow"
        aria-valuemin="0"
        aria-valuemax="25"
      >
        <div
          class="tooltip white"
          style="z-index:2"
        ></div>
        <div class="scale"></div>
        <div class="scale-para">0</div>
        <div
          class="scale"
          style="margin-left:20%;position: absolute"
        ></div>
        <div
          class="scale-para"
          style="margin-left:20%"
        >5</div>
        <div
          class="scale"
          style="margin-left:40%;position: absolute"
        ></div>
        <div
          class="scale-para"
          style="margin-left:40%"
        >10</div>
        <div
          class="scale"
          style="margin-left:60%;position: absolute"
        ></div>
        <div
          class="scale-para"
          style="margin-left:60%"
        >15</div>
        <div
          class="scale"
          style="margin-left:80%;position: absolute"
        ></div>
        <div
          class="scale-para"
          style="margin-left:80%"
        >20</div>

        <div
          class="scale"
          style="margin-left:100%;position: absolute"
        ></div>
					   <div
          class="scale-para"
          style="margin-left:100%"
        >25</div>
        <div class="bar-face face-position roof percentage"></div>
        <div class="bar-face face-position back percentage"></div>
        <div class="bar-face face-position floor percentage volume-lights"></div>
        <div class="bar-face face-position left"></div>
        <div class="bar-face face-position right"></div>
        <div class="bar-face face-position front percentage volume-lights shine"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "./css/component.css";
@import "./css/custom-bars.css";
</style>
<script>
export default {
  name: "my-progress",
  props: ["ariaValuenow"],
  methods: {}
};
</script>
