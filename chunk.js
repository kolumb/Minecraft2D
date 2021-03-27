class Chunk {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
        this.map = [];
        for (let y = 0; y < this.size.y; y++) {
            this.map[y] = [];
            for (let x = 0; x < this.size.x; x++) {
                const noiseScale = 0.15;
                const noiseScale2 = 0.01;
                const sampleX = this.pos.x + x * noiseScale;
                const sampleY = this.pos.y + y * noiseScale;
                const sampleX2 = this.pos.x + x * noiseScale2 + 100;
                const sampleY2 = this.pos.y + y * noiseScale2 + 100;
                this.map[y][x] = 0.0 < noise.simplex2(sampleX, sampleY) * noise.simplex2(sampleX2, sampleY2) + y / this.size.y / 0.4 - 1.5;
            }
        }
        this.color = randomColor();
    }
    draw() {
        ctx.fillStyle = this.color;
        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                if (this.map[y][x])
                    ctx.fillRect(this.pos.x + x * cellSize - Math.floor(camera.x), this.pos.y + y * cellSize - Math.floor(camera.y), cellSize, cellSize);
            }
        }
    }
}