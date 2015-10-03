$(document).ready() { function() {
var board_width = 40;
var board_height = 40;
var dim = 20;

 /* generate the game board */
$("#game_board").append("<table>table</table>");
for (var y = 0; y <= board_height; y += board_height / dim) {
    $("tb").append("<tr></tr>");
    for (var x = 0; x <= board_width; x +=board_width / dim) {
        tdHtml = "<td>" + (board_width / dim * y + x) + "</td>";
        $(current_tr).append(tdHtml);
    }
}
}
}