$(document).ready(function() {
    var start_date = null;
    var current_board = null;
    var cells;


    $("#speed_slider").slider({
        min:0,
        max:10000
    });

    /* click on the submit button will set up the game board.*/
    $("#submit").click(function(e) {
        e.preventDefault();

        dim = parseInt($("#input_board_dim").val());

        var speed = $("#speed_slider").slider("option", "values");

        if (isNaN(dim) || dim < 20 || dim > 200) {
            alert("Invalid dimension: " + $("#input_board_dim").val() + "<br>" + "Please input an integer between 20 and 200.");
            return;
        }

        /* Empty the current board (if any) when the user tries to set up a new board.*/
        if(current_board != null) {
            current_board.kill();
        }

        cells = new Array(dim*dim);
        current_board = new game_board(dim, cells);

        /* clear the input field after the grid is set up.*/
        $('input[type=text]').val(' ');
    });

    /* When the "start" button is clicked: 1 .start the game (cells start to update status) */
    /* 2. changed the button to a "stop" button */
    /* When the "stop button is clicked: stop updating the status of cells. */
    $("#start_stop").click(function(e) {
        e.preventDefault();
        var now = new Date();
        if (current_board == null) {
            alert("Please set up the game board first.")
        } else if (start_date == null){
            start_date = now;
            $(this).text("Stop");
            interval_timer = setInterval(current_board.update_cell(), speed);
        } else {
            clearInterval(interval_timer);
            start_date = null;
            $(this).text("Start");
        }
    });

    /* reset the status of all the cells when the reset button is clicked.*/
    $("#reset").click(function(e) {
        e.preventDefault();
        if(current_board != null) {
            current_board.kill();
            current_board = new game_board(dim, cells);
        }
    });

    /* When the game is stopped, user could advance the automaton by one step by clicking the "next" button. */
    $("#next").click(function(e) {
        e.preventDefault();
        if($("#start_stop").text == "Stop") {
            update_cell;
        }
    });

    /* The user could fill the grid randomly before the game start. */
    $("#randomize").click(function(e) {
        e.preventDefault();
    });





});

 /* generate the game board */

 var game_board = function(dim, cells) {
    this.dim = dim;
    this.killed = false;
    this.started = false;
    this.cells = cells;


    var BOARD_WIDTH = 1200;
    var BOARD_HEIGHT = 1200;


    /* set up the new game. The initial status for all cells are "dead" (0). */
    $("#game_board").css({width: BOARD_WIDTH + 20,
                          height: BOARD_HEIGHT + 20
                          })
                    .append("<table></table>");
    $("table").css({
        width: BOARD_WIDTH,
        height: BOARD_HEIGHT
      });

    for (var row = 0; row <= dim - 1; row += 1) {
        var current_tr = $("<tr></tr>").appendTo("table");
        current_tr.css({
            width: BOARD_WIDTH + "px",
            height: BOARD_HEIGHT/dim + "px"
            });
        cells[row] = new Array;
        for (var col = 0; col <= dim - 1; col += 1) {
            var current_td = $("<td></td>").appendTo(current_tr);
            current_td.css({
                width: 100*(1/dim) + "%"
            });
            current_td.attr({"id": row+" "+col, "alive": 0, "lived": 0});
            var cell = new Cell(this, current_td, row, col);
            cells[row][col] = cell;
        }
    }
 }




game_board.prototype.kill = function() {
    if(this.killed) {
        return true;
    }

    $("#game_board").empty();
    this.killed = true;
}




/* update cell status*/
game_board.prototype.update_cell = function(cells) {
    this.cellsNow = cells;
    this.cellsNext = cells.slice();
    
	
}


var Cell = function(game_board, cell, row, col) {
    this.game_board = game_board;
    this.cell = cell;
    this.row = row;
    this.col = col;
    this.alive = $(cell).attr('alive');
    this.lived =$(cell).attr('lived');

    var c = this;
    
    this.cell.click(function (e) {
    	e.preventDefault();
    	if ((e.button == 0) && !e.shiftKey && !e.altKey) {
    		c.leftclick();
    	}else if ((e.button == 0) && e.shiftKey) {
    		c.shiftleftclick();
    	}else if ((e.button ==0) && e.altKey) {
    		c.altleftclick();
    	}
    });
}


/* Cell.prototype.rightclick = function() {

} */

/* Left clicking on a cell flips that cell's state. */
Cell.prototype.leftclick = function() {
	var c = this;
    if (this.alive == 0){
    	if(this.lived == 0) {
        	this.lived = 1;
        }
        this.alive = 1;
    } else {
        this.alive = 0;
    } 

    $(this.cell).attr({"alive": c.alive, "lived": c.lived});
}


/* Shift left clicking on a cell force that cell to be alive if it isn't already. */
Cell.prototype.shiftleftclick = function () {
	this.alive = 1;
	this.lived = 1;
	$(this.cell).attr({"alive": 1, "lived": 1});
}

/* Alt left clicking on a cell foces it to be dead if it isn't already. */
Cell.prototype.altleftclick = function () {
	this.alive = 0;
	$(this.cell).attr({"alive": 0});
}


/*Cell.prototype.getNeibors = function() {

}*/


