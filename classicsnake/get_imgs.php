<?php
$directory = 'images';

if ( ! is_dir($directory)) {
    exit('Invalid directory path for images');
}

$files = array();

foreach (scandir($directory) as $file) {
    if ('.' === $file) continue;
    if ('..' === $file) continue;

    $files[] = '/' . $directory . $file;
}

$directory = 'sounds';

if ( ! is_dir($directory)) {
    exit('Invalid directory path for sounds');
}

foreach (scandir($directory) as $file) {
    if ('.' === $file) continue;
    if ('..' === $file) continue;

    $files[] = $file;
}

echo json_encode($files);
?>