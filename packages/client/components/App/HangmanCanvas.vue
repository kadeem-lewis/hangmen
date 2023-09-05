<template>
  <div class="flex">
    <canvas ref="canvas" class="border-2 border-current" />
  </div>
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

const currentPart = ref(0);

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    initialDrawing();
  }
});

const drawLine = (fromX: number, fromY: number, toX: number, toY: number) => {
  if (ctx) {
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }
};

const initialDrawing = () => {
  if (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 5;
    ctx.beginPath();
    drawLine(70, 130, 130, 130); //base plank
    drawLine(100, 10, 100, 130); //beam
    drawLine(80, 10, 140, 10); //horizontal top plank
    drawLine(100, 50, 130, 10);
    ctx.lineWidth = 2;
    drawLine(135, 10, 135, 20); //rope
  }
};

const head = () => {
  if (ctx) {
    ctx.beginPath();
    ctx.arc(70, 30, 10, 0, Math.PI * 2, true);
    ctx.stroke();
  }
};

const body = () => drawLine(70, 40, 70, 80);
const leftArm = () => drawLine(70, 50, 50, 70);
const rightArm = () => drawLine(70, 50, 90, 70);
const leftLeg = () => drawLine(70, 80, 50, 110);
const rightLeg = () => drawLine(70, 80, 90, 110);

const drawNextPart = () => {
  currentPart.value++;
  switch (currentPart.value) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};
</script>
