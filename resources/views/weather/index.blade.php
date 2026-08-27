<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prakiraan Cuaca</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <h1 class="text-center mb-4">Prakiraan Cuaca - BMKG Juanda</h1>
        <div class="card shadow-sm">
            <div class="card-body">
                {!! $weatherData !!}
            </div>
        </div>
    </div>
</body>
</html>
