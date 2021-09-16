<template>
  <a :class="$style.link">31312312312</a>
  <div :class="style.link">31312312312</div>
  <h2>11111111111</h2>
  <h3>11111111111</h3>
  <div class="postcss"></div>
</template>

<script setup lang="ts">
// 外链css 内链css两种写法
import style from './HelloWorld.module.css'

interface State {
  count: number;
}


</script>
<style module>
.link {
  color: blue;
}
</style>

<style lang="less" scoped>
@color:green;
h2{
  color: @color;
}
</style>

<style lang="scss" scoped>
$color:#222520;
h3{
  color: $color;
}
.postcss {
  height: 50px;
  width: 200px;
  background-color: orange;
  transform: rotate(90deg);
}
</style>