<?php
function getDateTime()
{
    return 'Hello-World';
}

if (isset($_GET['function']) && $_GET['function'] == 'getDateTime') {
    require_once 'my_function.php';
    echo getDateTime();
}

?>