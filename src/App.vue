<template>
  <input type="checkbox" aria-label="test" v-model="showContent"/>Displays the scope of content<br/>
  <br/>Drag and drop to test the effect of changing the size<br/><br/>
  <div ref = "nine-patch" class="nine-patch">
    <div v-if="showContent" class="content" @mousedown="mouseDown"/>
    <div ref="corner" class="corner"/>
  </div>
</template>

<style lang="css" scoped src="./App.css"/>
<script src="./App.js"/>
