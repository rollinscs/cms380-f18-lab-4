// Clear button
function clearDice() {
	// Remove the histogram if one exists
	if ($('#histogram_pane_dice').highcharts()) {
		$('#histogram_pane_dice').highcharts().destroy();
	}
	$('#stats_pane_dice').css('visibility', 'hidden')

	// Empty the results pane
	$('#histogram_pane_dice').empty();
}

function clearCoins() {
	// Remove the histogram if one exists
	if ($('#histogram_pane_coins').highcharts()) {
		$('#histogram_pane_coins').highcharts().destroy();
	}
	$('#stats_pane_coins').css('visibility', 'hidden')

	// Empty the results pane
	$('#histogram_pane_coins').empty();
}

// Draw the histogram for the given array of mean values
function updateHistogramDice(trials) {

	// Create histogram bins
	var numDice = $('#number_of_dice').val();
	var binStep = 1 / numDice;

	var min = trials[0];
	var max = trials[0];
	for (var i = 0; i < trials.length; i++) {
		if (trials[i] < min) {
			min = trials[i];
		}
		if (trials[i] > max) {
			max = trials[i];
		}
	}

	var bins = [];
	var counts = [];
	var bin = 1.0 - binStep / 2;
	while (bin <= 6.0 + binStep / 2) {
		bins.push(bin);
		counts.push(0);
		bin += binStep;
	}
	var numBins = bins.length;

	for (var i = 0; i < trials.length; i++) {
		for (var j = 0; j < numBins; j++) {
			if (trials[i] <= bins[j]) {
				counts[j] += 1;
				break;
			}
		}
	}

	var data = []
	for (var i = 0; i < bins.length; i++) {
		data.push([bins[i] - binStep/2, counts[i]]);
	}

	var xLabelString = 'Average of ' + numDice + ' dice';
	if (numDice == 1) {
		xLabelString = 'Results of single die roll';
	}

	$('#histogram_pane_dice').highcharts({
        chart: {
            type: 'column'
        },
        title: {
        	text: ''
        },
        xAxis: {
        	title: {
            	text: xLabelString
            },
            min: .9,
            max: 6.1,
            tickInterval: 1.0
        },
        yAxis: {
            title: {
                text: 'Count'
            }
        },
        series: [{
        	name: 'Values',
            data: data,
            showInLegend: false
        }]
    });
}


function updateHistogramCoins(trials) {

	// Create histogram bins
	var numCoins = $('#number_of_coins').val();
	var binStep = 1 / numCoins;

	var min = trials[0];
	var max = trials[0];
	for (var i = 0; i < trials.length; i++) {
		if (trials[i] < min) {
			min = trials[i];
		}
		if (trials[i] > max) {
			max = trials[i];
		}
	}

	var bins = [];
	var counts = [];
	var bin = 0.0 - binStep / 2;
	while (bin <= 1.0 + binStep / 2) {
		bins.push(bin);
		counts.push(0);
		bin += binStep;
	}
	var numBins = bins.length;

	for (var i = 0; i < trials.length; i++) {
		for (var j = 0; j < numBins; j++) {
			if (trials[i] <= bins[j]) {
				counts[j] += 1;
				break;
			}
		}
	}

	var data = []
	for (var i = 0; i < bins.length; i++) {
		data.push([bins[i] - binStep/2, counts[i]]);
	}

	var xLabelString = 'Fraction of heads from ' + numCoins + ' flips';
	if (numCoins == 1) {
		xLabelString = 'Results of single coin flip';
	}

	$('#histogram_pane_coins').highcharts({
        chart: {
            type: 'column'
        },
        title: {
        	text: ''
        },
        xAxis: {
        	title: {
            	text: xLabelString
            },
            min: 0.0,
            max: 1.0,
            tickInterval: .1
        },
        yAxis: {
            title: {
                text: 'Count'
            }
        },
        series: [{
        	name: 'Values',
            data: data,
            showInLegend: false
        }]
    });
}


// Generate single trial and append to list of trials
function singleTrialDice() {
    
    console.log("Here");

	// Get number of dice
	var numDice = $('#number_of_dice').val();
	console.log(numDice);

	if (numDice < 1) {
		alert('Number of dice must be at least 1.');
		return;
	}

	// Destroy the histogram if it exists
	clearDice();

	// Clear the contents of the results pane
	$('#histogram_pane_dice').empty();

	// Generate single random trial
	var roll = [];
	var sum = 0;
	for (var i = 0; i < numDice; i++) {
		var d = Math.floor(Math.random() * 6) + 1;
		roll.push(d);
		sum += d;

		// Append the image corresponding to the value of d to
		// the results pane
		var filename = 'die' + d + '.png';
		var htmlString = '<img src="' + filename + '" width="75px"/img>';
		$('#histogram_pane_dice').append(htmlString);
	}
	var mean = sum / numDice;
	mean = mean.toFixed(2);

	// Build a string showing the calculation of the mean
	var meanString = '(';
	for (var i = 0; i < roll.length - 1; i++) {
		meanString += roll[i] + ' + ';
	}
	meanString += roll[roll.length - 1];
	meanString += ') / ' + numDice;


	$('#histogram_pane_dice').append('<p style="margin-top:25px">The mean is ' + meanString + '</p>');
	$('#histogram_pane_dice').append('<p>= ' + sum + ' / ' + numDice + '</p>');
	$('#histogram_pane_dice').append('<p>= ' + mean + '</p>')


	/***
	// Display calculation string to results pane
	$('#histogram_pane').append('<table style = "margin-top: 25px">');
	$('#histogram_pane').append('<tr>');
	$('#histogram_pane').append('<td>Mean:</td> <td style="padding-left:10px">' + meanString + '</td>');
	$('#histogram_pane').append('</tr>');
	$('#histogram_pane').append('</table>');
	***/
}


function singleTrialCoins() {
    
	// Get number of dice
	var numCoins = $('#number_of_coins').val();

	if (numCoins < 1) {
		alert('Number of coins must be at least 1.');
		return;
	}

	// Destroy the histogram if it exists
	clearCoins();

	// Clear the contents of the results pane
	$('#histogram_pane_coins').empty();

	// Generate single random trial
	var flips = [];
	var sum = 0;
    var prob_of_heads = $('#prob_of_heads').val();
	for (var i = 0; i < numCoins; i++) {
        var r = Math.random();
        var d = 0;
        if (r > 1 - prob_of_heads) {
            d = 1;   
        }
        flips.push(d);
		sum += d;

		// Append the image corresponding to the value of d to
		// the results pane
		//var filename = 'die' + d + '.png';
		//var htmlString = '<img src="' + filename + '" width="75px"/img>';
        var htmlString = 'T ';
        if (d == 1) {
            htmlString = 'H ';   
        }
        $('#histogram_pane_coins').append(htmlString);
	}
	var mean = sum / numCoins;
	mean = mean.toFixed(2);

	// Build a string showing the calculation of the mean
	var meanString = '(';
	for (var i = 0; i < flips.length - 1; i++) {
		meanString += flips[i] + ' + ';
	}
	meanString += flips[flips.length - 1];
	meanString += ') / ' + numCoins;


	$('#histogram_pane_coins').append('<p style="margin-top:25px">The fration of heads is ' + meanString + '</p>');
	$('#histogram_pane_coins').append('<p>= ' + sum + ' / ' + numCoins + '</p>');
	$('#histogram_pane_coins').append('<p>= ' + mean + '</p>')


	/***
	// Display calculation string to results pane
	$('#histogram_pane').append('<table style = "margin-top: 25px">');
	$('#histogram_pane').append('<tr>');
	$('#histogram_pane').append('<td>Mean:</td> <td style="padding-left:10px">' + meanString + '</td>');
	$('#histogram_pane').append('</tr>');
	$('#histogram_pane').append('</table>');
	***/
}

// Generate multiple trials
function multipleTrialsDice() {

	var trials = [];

	// Get number of dice and number of trials
	var numDice = $('#number_of_dice').val();
	console.log(numDice);
	if (numDice < 1) {
		alert('Number of dice must be at least 1.');
		return;
	}

	var numTrials = $('#number_of_trials_dice').val();
	console.log(numTrials);
	if (numTrials < 1) {
		alert('Number of trials must be at least 1.');
		return;
	}

	// Generate multiple trials and append average of each to trial list
	for (var t = 0; t < numTrials; t++)  {
		var roll = [];
		var sum = 0;
		for (var i = 0; i < numDice; i++) {
			var d = Math.floor(Math.random() * 6) + 1;
			roll.push(d);
			sum += d;
		}
		trials.push(sum / numDice);
	}

	// Update histogram
	updateHistogramDice(trials);

	// Display stats
	var sum = 0;
	var sumSquares = 0;
	var min = trials[0];
	var max = trials[0];

	for (var i = 0; i < trials.length; i++) {
		sum += trials[i];
		sumSquares += trials[i] * trials[i];
		if (trials[i] > max) {
			max = trials[i];
		}
		if (trials[i] < min) {
			min = trials[i];
		}
	}

	var mean = sum / trials.length;
	var stdDev = sumSquares / trials.length - mean * mean;
	var range = max - min;

	$('#mean_field_dice').html(mean.toFixed(3));
	$('#std_dev_field_dice').html(stdDev.toFixed(3));
	$('#min_field_dice').html(min.toFixed(3));
	$('#max_field_dice').html(max.toFixed(3));
	$('#stats_pane_dice').css('visibility', 'visible')

}



function multipleTrialsCoins() {

	var trials = [];

	// Get number of dice and number of trials
	var numCoins = $('#number_of_coins').val();
	console.log(numCoins);
	if (numCoins < 1) {
		alert('Number of coins must be at least 1.');
		return;
	}

	var numTrials = $('#number_of_trials_coins').val();
	console.log(numTrials);
	if (numTrials < 1) {
		alert('Number of trials must be at least 1.');
		return;
	}

	// Generate multiple trials and append average of each to trial list
    var prob_of_heads = $('#prob_of_heads').val();
	for (var t = 0; t < numTrials; t++)  {
		var flips = [];
		var sum = 0;
		for (var i = 0; i < numCoins; i++) {
            var r = Math.random();
            var d = 0;
            if (r > 1 - prob_of_heads) {
                d = 1;
            }
            
			flips.push(d);
			sum += d;
		}
		trials.push(sum / numCoins);
	}
    
	// Update histogram
	updateHistogramCoins(trials);

	// Display stats
	var sum = 0;
	var sumSquares = 0;
	var min = trials[0];
	var max = trials[0];

	for (var i = 0; i < trials.length; i++) {
		sum += trials[i];
		sumSquares += trials[i] * trials[i];
		if (trials[i] > max) {
			max = trials[i];
		}
		if (trials[i] < min) {
			min = trials[i];
		}
	}

	var mean = sum / trials.length;
	var stdDev = sumSquares / trials.length - mean * mean;
	var range = max - min;

	$('#mean_field_coins').html(mean.toFixed(3));
	$('#std_dev_field_coins').html(stdDev.toFixed(3));
	$('#min_field_coins').html(min.toFixed(3));
	$('#max_field_coins').html(max.toFixed(3));
	$('#stats_pane_coins').css('visibility', 'visible')

}

/*** Main ***/

// List that will store means of each trial roll
var histogram_width = $('#histogram_pane_dice').width();
var histogram_height = histogram_width * .75;


$(document).ready(function(){
	$('#clear_button_dice').click(clearDice);
	$('#single_trial_button_dice').click(singleTrialDice);
	$('#multi_trial_button_dice').click(multipleTrialsDice);
    
	$('#clear_button_coins').click(clearCoins);
	$('#single_trial_button_coins').click(singleTrialCoins);
	$('#multi_trial_button_coins').click(multipleTrialsCoins);
});

