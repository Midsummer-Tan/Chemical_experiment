<template>
   <div class="progress-factor"> 
	<div class="progress-bar">
		<div class="bar has-rotation has-colors cyan ruler-3" role="progressbar" :aria-valuenow="ariaValuenow" aria-valuemin="0" aria-valuemax="25">
			<div class="tooltip white"></div>
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
@import './css/component.css';
@import './css/custom-bars.css';
</style>
<script>
export default {
  	name:'my-progress',
	props: ['ariaValuenow'],
    methods:{
    }
   }

</script>
