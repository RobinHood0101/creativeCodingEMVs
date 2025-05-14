<script>
import p5 from "p5";
export default {
    name: "conwaysGame",
    data() {
        return {
            newGame: [],
        };
    },
    mounted() {
        this.createCanvas();
    },
    beforeDestroy() {
        if (this.p) {
            this.p.remove();
        }
    },
    methods: {
        createCanvas() {
            this.p = new p5(this.sketch, this.$refs.conwaysGame);
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(400, 400);
            };

            p.draw = () => {
                // test
                //
                let currentGame = [];
                if (this.newGame.length > 0) {
                    currentGame = this.newGame;
                } else {
                    currentGame = [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    ];
                }

                let indexY = 0;
                let indexX = 0;
                // Vertical
                for (let y = 0; y < p.height; y += 20) {
                    // Horizontal
                    for (let x = 0; x < p.width; x += 20) {
                        if (indexX === 20) {
                            indexX = 0;
                        }

                        // Alive cell
                        if (currentGame[indexY][indexX] === 1) {
                            p.fill(100);
                            p.square(x, y, 20);
                            p.fill(255);
                            indexX++;
                            continue;
                        }

                        // Dead cell
                        p.fill(255);
                        p.square(x, y, 20);
                        indexX++;

                        // Check
                        let currentCell = currentGame[indexY][indexX];

                        let neighbour1 = this.getCell(indexY - 1, indexX - 1, currentGame);
                        let neighbour2 = this.getCell(indexY - 1, indexX, currentGame);
                        let neighbour3 = this.getCell(indexY - 1, indexX + 1, currentGame);
                        let neighbour4 = this.getCell(indexY, indexX + 1, currentGame);
                        let neighbour5 = this.getCell(indexY + 1, indexX + 1, currentGame);
                        let neighbour6 = this.getCell(indexY + 1, indexX, currentGame);
                        let neighbour7 = this.getCell(indexY + 1, indexX - 1, currentGame);
                        let neighbour8 = this.getCell(indexY, indexX - 1, currentGame);

                        let neighbours = [
                            neighbour1,
                            neighbour2,
                            neighbour3,
                            neighbour4,
                            neighbour5,
                            neighbour6,
                            neighbour7,
                            neighbour8,
                        ];

                        // loop over cells
                        let neighbourCount = 0;
                        for (let neighbour of neighbours) {
                            if (neighbour === 1) {
                                neighbourCount++;
                            }
                        }
                        //Check 1: Zelle hat weniger als 2 nachbar
                        if (neighbourCount <= 2) {
                            currentGame[indexY][indexX] = 0;
                        }

                        // Check 2:
                        if (neighbourCount === 2 || (neighbourCount === 3 && currentCell === 1)) {
                            currentGame[indexY][indexX] = 1;
                        }

                        // Check 3:
                        if (neighbourCount > 3) {
                            currentGame[indexY][indexX] = 0;
                        }

                        // Check 4:
                        if (neighbourCount === 3 && currentCell === 0) {
                            currentGame[indexY][indexX] = 1;
                        }
                    }
                    indexY++;
                }
                this.newGame = currentGame;
            };

            p.mousePressed = () => {
                //console.log("Mouse pressed");
            };
        },
        getCell(y, x, grid) {
            if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
                return grid[y][x];
            }
            return 0;
        },
    },
};
</script>

<template>
    <main>
        <h1>Conways Game of Life</h1>
        <div ref="conwaysGame"></div>
    </main>
</template>
