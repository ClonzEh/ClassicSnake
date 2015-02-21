<?php
$directory = 'dependencies';

if ( ! is_dir($directory)) {
    exit('Invalid directory path for images');
}

$files = array();

foreach (scandir($directory) as $file) {
    if ('.' === $file) continue;
    if ('..' === $file) continue;

    $files[] = $directory . '/' . $file;
}

$directory = 'scripts';

if ( ! is_dir($directory)) {
    exit('Invalid directory path for images');
}


foreach (scandir($directory) as $file) {
    if ('.' === $file) continue;
    if ('..' === $file) continue;

    $files[] = $directory . '/' . $file;
}

echo json_encode($files);
?>