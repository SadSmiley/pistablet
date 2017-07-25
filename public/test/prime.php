<?php

$x = $_GET["x"];
$ctr = 0;

while($x != 1)
{
	$formula = check_smallest_divisor($x);

	echo "$x / <span style='color: red'>" . $formula["ans"] . "</span> = " . $formula["rem"];
	echo "<br>";

	$output[$ctr] = $formula["ans"];
	$y = $formula["rem"];
	$ctr++;

	$x = $y;
}


function check_smallest_divisor($num)
{
	for($ctr = 2; $ctr <= $num; $ctr++)
	{
		
		if(($num % $ctr) == 0)
		{
			$r["ans"] = $ctr;
			$r["rem"] = $num / $ctr; 
			break 1;
		}
	}

	return $r;
}

?>