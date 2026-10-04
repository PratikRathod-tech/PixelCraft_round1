export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private currentFPS = 60;
  private degradedLOD = false;

  public update(onDegrade?: () => void, onRecover?: () => void): number {
    this.frameCount++;
    const now = performance.now();
    const delta = now - this.lastTime;

    if (delta >= 1000) {
      this.currentFPS = Math.round((this.frameCount * 1000) / delta);
      this.frameCount = 0;
      this.lastTime = now;

      if (this.currentFPS < 35 && !this.degradedLOD) {
        this.degradedLOD = true;
        onDegrade?.();
      } else if (this.currentFPS >= 50 && this.degradedLOD) {
        this.degradedLOD = false;
        onRecover?.();
      }
    }
    return this.currentFPS;
  }

  public getFPS(): number {
    return this.currentFPS;
  }

  public isDegraded(): boolean {
    return this.degradedLOD;
  }
}

export const globalPerfMonitor = new PerformanceMonitor();
