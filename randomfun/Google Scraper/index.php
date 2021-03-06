<?php

include("simple_html_dom.php");

$in = "Beautiful Bangladesh";
$in = str_replace(' ','+',$in); // space is a +
$url  = 'http://www.google.com/search?hl=en&tbo=d&site=&source=hp&q='.$in.'&oq='.$in.'';

print $url."<br>";

$html = file_get_html($url);

$i=0;
$linkObjs = $html->find('h3.r a'); 
foreach ($linkObjs as $linkObj) {
    $title = trim($linkObj->plaintext);
    $link  = trim($linkObj->href);

    // if it is not a direct link but url reference found inside it, then extract
    if (!preg_match('/^https?/', $link) && preg_match('/q=(.+)&amp;sa=/U', $link, $matches) && preg_match('/^https?/', $matches[1])) {
        $link = $matches[1];
    } else if (!preg_match('/^https?/', $link)) { // skip if it is not a valid link
        continue;
    }

    $descr = $html->find('span.st',$i); // description is not a child element of H3 thereforce we use a counter and recheck.
    $i++;   
    echo '<p>Title: ' . $title . '<br />';
    echo 'Link: ' . $link . '<br />';
    echo 'Description: ' . $descr . '</p>';
}
?>