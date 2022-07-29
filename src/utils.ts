export const nextFrame = (callback: () => void) => {
  let rafId: number = 0;

  rafId = requestAnimationFrame(() => {
    callback();
    cancelAnimationFrame(rafId);
  });
};
