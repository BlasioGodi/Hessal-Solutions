<!DOCTYPE html>
<html>

<head>
    <title>AJAX Example</title>
    <script>
    function getData() {
        var xhttp = new XMLHttpRequest();
        var dateTiming;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("datetime").innerHTML = this.responseText;
                dateTiming = this.responseText;
                console.log(dateTiming);
            }
        };
        xhttp.open("GET", "my_function.php?function=getDateTime", true);
        xhttp.send();
    }
    </script>
</head>

<body>

    <h1>AJAX Example</h1>

    <p>Click the button to get the current date and time:</p>

    <button onclick="getData()">Get Data</button>

    <p id="datetime"></p>

</body>

</html>