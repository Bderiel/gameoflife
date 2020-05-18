class Grid {
    private gridState: { state: number, y: number, x: number, liveNeighbors: number }[][] = [];
    canvas: CanvasRenderingContext2D = document.getElementById("myCanvas").getContext("2d");;

    private set generation(val) {
        document.querySelector('.generation').textContent = `GEN: ${val}`
    };

    private set alive(val) {
        document.querySelector('.alive').textContent = `Cells Alive: ${val}`
    };

    private _generation = 1;
    private interval;

    constructor(x: number, y: number) {
        this.createGrid(x, y);
        this.checkState();
        this.updateCells();
    }

    public reset(x: number, y: number) {
        this.canvas.clearRect(0, 0, 1500, 800);
        this.gridState = [];
        this.createGrid(x, y);
        this.updateCells();
        this._generation = 1;
        this.generation = 1;
        window.clearInterval(this.interval);
    }

    public start() {
        this.interval = window.setInterval(() => {
            this.checkState();
            this.updateCells();
            this._generation++;
            this.generation = this._generation;
        }, 100)
    }

    public step() {
        this.checkState();
        this.updateCells();
        this._generation++;
        this.generation = this._generation;
    }

    private createGrid(x: number, y: number) {
        for (let i = 0; i < y; i++) {
            const row = [];
            for (let j = 0; j < x; j++) {
                const state = Math.floor(Math.random() * 100);
                row.push({ state: state > 4 ? 0 : 1, y: i, x: j });
            }
            this.gridState.push(row);
        }

    }

    private toggle(x, y, val, color?) {

        if (val === 1) {
            this.canvas.beginPath();
            this.canvas.rect(x, y, 1, 1);
            this.canvas.fillStyle = color //|| "white";
            this.canvas.fill();
        } else {
            this.canvas.beginPath();
            this.canvas.rect(x, y, 1, 1);
            this.canvas.fillStyle = "black";
            this.canvas.fill();
        }
    }

    private checkState() {
        let alive = 0;
        for (let i = 0; i < this.gridState.length; i++) {
            for (let j = 0; j < this.gridState[i].length; j++) {
                const cell = this.gridState[i][j];
                alive += cell.state;
                let liveNeighbors = 0;

                liveNeighbors += this.gridState?.[i - 1]?.[j]?.state; //top center
                liveNeighbors += this.gridState?.[i - 1]?.[j - 1]?.state; //top left
                liveNeighbors += this.gridState?.[i - 1]?.[j + 1]?.state; //top right
                liveNeighbors += this.gridState?.[i]?.[j + 1]?.state || 0; //middle right
                liveNeighbors += this.gridState?.[i]?.[j - 1]?.state || 0; //middle left
                liveNeighbors += this.gridState?.[i + 1]?.[j]?.state; //bottom center
                liveNeighbors += this.gridState?.[i + 1]?.[j - 1]?.state; //bottom left
                liveNeighbors += this.gridState?.[i + 1]?.[j + 1]?.state; //bottom right

                cell.liveNeighbors = liveNeighbors;

            }
        }
        this.alive = alive;

    }

    private updateCells() {
        this.canvas.clearRect(0, 0, 400, 400); //this should clear the canvas ahead of each redraw

        for (let i = 0; i < this.gridState.length; i++) {
            for (let j = 0; j < this.gridState[i].length; j++) {
                const cell = this.gridState[i][j];

                if (cell.liveNeighbors === 3 && cell.state === 0) { // cell is born again 3
                    cell.state = 1;
                    this.toggle(j, i, cell.state, 'red')
                }

                else if ((cell.liveNeighbors === 2 || cell.liveNeighbors === 3)  && cell.state) { // lives on if 2 or 3
                    cell.state = 1;
                    this.toggle(j, i, cell.state, 'white');
                }
                else if (cell.liveNeighbors > 3 && cell.state) { // overpopulation 
                    cell.state = 0;
                    this.toggle(j, i, cell.state);
                }

                else if (cell.liveNeighbors < 2 && cell.state) { // less than 2 underpop
                    cell.state = 0;
                    this.toggle(j, i, cell.state, 'green');
                }


            }
        }
    }
}

const grid = new Grid(1500, 800);


document.getElementsByClassName('reset')[0].addEventListener('click', () => {
    grid.reset(1500, 800);
})

document.getElementsByClassName('step')[0].addEventListener('click', () => {
    grid.step();
})

document.getElementsByClassName('start')[0].addEventListener('click', () => {
    grid.start();
})

