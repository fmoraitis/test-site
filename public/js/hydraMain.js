// window.addEventListener('DOMContentLoaded', function() {
//   const canvas = document.getElementById("myCanvas2");
//   const grid = document.getElementById("imageGrid");
//   if (canvas && grid && window.Hydra) {
//     const hydra = new Hydra({
//       canvas: canvas,
//       detectAudio: false
//     });

//     // Use the image grid as a source
//     s0.init({ src: grid });

//     // Example: swirl the image grid and output to the background canvas
//     src(s0)
//       .modulate(osc(10, 0.1, 1.5), 0.2)
//       .out();
//   } else {
//     console.log("Hydra, canvas, or imageGrid not found");
//   }
// });
window.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById("myCanvas2");
  const img = document.querySelector("#imageGrid img");
  if (canvas && img && window.Hydra) {
    const hydra = new Hydra({
      canvas: canvas,
      detectAudio: false
    });

    // Create your original background effect on o0
    osc(3, 0.1, 1.2)
      .color(0.2, 0.4, 1.0)
      .kaleid(5)
      .out(o0);

    // Use the first image as a source on s0
    s0.init({ src: img });

    // Combine background and swirled image
    src(o0)
      .add(
        src(s0)
          .modulate(osc(10, 0.1, 1.5), 0.2),
        0.7
      )
      .out(o0);
  } else {
    console.log("Hydra, canvas, or image not found");
  }
});