var data_url = "http://starlord.hackerearth.com/gamesarena";
function getGamesPanel(data){
	var games_panel = '<div class="col-md-6 game-item">'+
		'<div class="panel panel-info"> '+ 
		'<div class="panel-heading">'+data["title"]+'</div>'+
		'<div class="panel-body">'+'<p>Genre : '+data["genre"]+'</p>'+
		'<p>Platform : '+data["platform"]+'</p>'+
		'<p>Score : '+data["score"]+'</p>'+
		'<p>Editor\'s Choice : '+data["editors_choice"]+'</p>'+
		'</div>'+
		'</div>'+
		'</div>';

	return games_panel;
}

var games_api_data = [];

function populate_data_table(data){
	var games_data_list = $("#games_data_list");
	for(var counter = 0; counter < data.length; counter++){
		games_data_list.append("<option "+"val="+data[counter]["title"]+">"+data[counter]["title"]+"</option>");
	}
}

function populate_data(data){
	var games_list = $("#games_list");
	for(var counter = 0; counter < data.length; counter++){
		games_list.append(getGamesPanel(data[counter]));
	}
}

$.ajax({
	url: data_url,
	success: function(data){
		games_api_data = data.slice(1);
		populate_data_table(games_api_data);
		populate_data(games_api_data);
	}
});

$("#game_name").change(function(){
	var data = $(".game-item");
	var games_list = $("#games_list");
	var search_keyword = $(this).val();
	games_list.empty();
	for(var counter = 0; counter < games_api_data.length; counter++){
		if(games_api_data[counter]["title"].indexOf(search_keyword) != -1 ){
			populate_data([games_api_data[counter]]);		
		}
	}
});