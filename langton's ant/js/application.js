/*Copyright (C) 2015  Seiman Andrei

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This implementation is Langton's ant game that can be found 
    here https://en.wikipedia.org/wiki/Langton's_ant, representing a 
    celular automata algorithm

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
 	If modifying or altering it please mention the author, Thank you
*/




function init() {
    var steps = 500;
    var currentTile;
    var i = 0;

    function turn90Right() {
        var angle = $('#theAnt').attr('rotate');
        angle = parseInt(angle) + 90;
        if (angle == 360) {
            angle = 0;
        }
        $('#theAnt').css({
            transform: 'rotate(' + angle + 'deg)'
        });
        $('#theAnt').attr('rotate', angle);
        flipColor(currentTile)
        moveForward(angle);
    }

    function turn90Left() {

        var angle = $('#theAnt').attr('rotate');
        if (angle == 0) {
            angle = 360;
        }
        angle = parseInt(angle) - 90;
        $('#theAnt').css({
            transform: 'rotate(' + angle + 'deg)'
        });
        $('#theAnt').attr('rotate', angle);
        flipColor(currentTile)
        moveForward(angle);
    }

    function moveForward(angle) {
    	var img = $('#theAnt');
    	var currTRindex = $('#theAnt').closest('tr').index();
    	var currTDindex = $('#theAnt').parent().index();
    	if(angle == 0 || angle == 360){
    		//move up
    		if(currTRindex != 0){
    			currTRindex -= 1;
    			$('tr:eq('+currTRindex+') td:eq('+currTDindex+')').append(img);
    		}
    	}else if(angle == 90){
    		//move right
    		if(currTDindex != 29){
    			currTDindex += 1;
    			$('tr:eq('+currTRindex+') td:eq('+currTDindex+')').append(img);
    		}
    	}else if(angle == 180){
    		//move down
    		if(currTRindex != 29){
    			currTRindex += 1;
    			$('tr:eq('+currTRindex+') td:eq('+currTDindex+')').append(img);
    		}
    	}else{
    		//move left
    		if(currTDindex != 0){
    			currTDindex -= 1;
    			$('tr:eq('+currTRindex+') td:eq('+currTDindex+')').append(img);
    		}
    	}
    }

    function flipColor(currentTile) {
        if (currentTile.css('backgroundColor') == 'rgb(0, 0, 0)') {
            currentTile.css('backgroundColor', '#FFF');
        } else {
            currentTile.css('backgroundColor', 'rgb(0, 0, 0)');
        }
    }

    function startProgress() {
        currentTile = $('#theAnt').parent();
        if (currentTile.css('backgroundColor') == 'rgb(0, 0, 0)') {
            turn90Left();
        } else {
            turn90Right();
        }
        if (i < steps) {
            setTimeout(function() {
                i += 1;
                startProgress();
            }, 500);
        }
    }
    startProgress();
}
