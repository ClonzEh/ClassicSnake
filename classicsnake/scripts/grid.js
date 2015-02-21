//@param = gridObject{ x, y, rows, cols, width, height, spacingX, spacingY }, gridSpot{ x, y, width, height }, func : function(shape) { }
//returns grid[][]
function createGrid(rows, cols, func) {

    var newGrid = new Array(rows); //create rows

    for (var i = 0; i < newGrid.length; i++) { newGrid[i] = new Array(cols); } //create columns

    for (var i = 0, x = 0, y = 0; i < rows * cols; i++) {

        newGrid[x][y] = func(x, y);
        x++;
        if (x == rows) { x = 0; y++;}
    }
    return newGrid;
}



/*for (var i = 0; i < this.grid.length; i++) { this.grid[i] = new Array(this.gridObject.columns); } //create columns

 for (var i = 0, x = 0, y = 0; i < this.gridObject.rows * this.gridObject.columns; i++) {

 var a = this.gridSpot;
 var nextX = x * a.width + (x * this.gridObject.spacingX) + this.gridObject.x;
 var nextY = y * a.height + (y * this.gridObject.spacingY) + this.gridObject.y;

 var shapeX = ~~(a.x + nextX);
 var shapeY = ~~(a.y + nextY);

 var rectangle = new rect(shapeX, shapeY, ~~a.width, ~~a.height);


 var shape = createShape(rectangle, this.mainColors.open, 'shape', this.gridContainer);

 shape.character = false;
 shape.pathblock = false;
 shape.pathPenalty = 0;
 shape.pos = { x: x, y: y};
 shape.setBounds(0, 0, rectangle.width, rectangle.height);
 *//*shape.cache(0,0,rectangle.width,rectangle.height);
 shape.updateCache();*//*
 *//*shape.on('mouseover', function(e) {

 if (clonazia.game.mouseDown == true) {

 if (clonazia.game.isPainting && clonazia.game.moveCharacter == false && e.currentTarget.name == "shape") {

 e.currentTarget.graphics._fill.style = clonazia.game.blockColor;
 e.currentTarget.pathblock = clonazia.game.blockType;
 }
 if (clonazia.game.moveCharacter != "") {

 clonazia.game.moveableCharacters[clonazia.game.moveCharacter].move(e.currentTarget);
 }
 }

 });*//*

 this.grid[x][y] = shape;
 x++;
 if (x == this.gridObject.rows) { x = 0; y++;}
 }*/