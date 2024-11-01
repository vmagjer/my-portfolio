class TimeProgress {
    constructor(duration, loop = false) {
        this.startTime = performance.now();
        this.duration = duration;
        this.loop = loop;

        this.getProgress = this.getProgress.bind(this);
    }

    getProgress() {
        const currentTime = performance.now();
        const elapsedTime = currentTime - this.startTime;
        const progress = elapsedTime / this.duration;
        if (this.loop && progress > 1) {
            this.startTime = currentTime;
            return this.getProgress();
        }
        return Math.min(progress, 1); // Clamp progress between 0 and 1
    }
}

export default TimeProgress;