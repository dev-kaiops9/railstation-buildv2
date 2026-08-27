<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
@page{
    margin:20px;
}
</style>
<style>

body{
    font-family: DejaVu Sans, sans-serif;
    font-size:10px;
}

table{
    width:100%;
    border-collapse:collapse;
}

th,td{
    border:1px solid #000;
    padding:3px;
    text-align:center;
}

th{
    background:#2c5282;
    color:white;
    font-size:9px;
}

td{
    font-size:9px;
}

.text-center{
    text-align:center;
}

.risk-low{
    background:#c6f6d5;
}

.risk-medium{
    background:#fefcbf;
}

.risk-high{
    background:#feb2b2;
}

</style>

</head>

<body>

<div class="header">

<div class="title">
IDENTIFIKASI BAHAYA DAN PENILAIAN RISIKO (IBPR)
</div>

<div class="subtitle">
Tanggal Cetak : {{ date('d M Y') }}
</div>

</div>

<table>

<thead>

<tr>

<th>ID</th>
<th>Bahaya</th>
<th>Penjelasan Kontrol</th>
<th>Referensi</th>
<th>Efektivitas</th>
<th>Penanggung Jawab</th>

<th>Penjelasan Risiko</th>
<th>Probabilitas</th>
<th>Dampak</th>
<th>Nilai Risiko</th>

<th>Rencana Tindak Lanjut</th>
<th>Referensi</th>
<th>Penanggung Jawab</th>
<th>Tanggal Selesai</th>

<th>Probabilitas Akhir</th>
<th>Dampak Akhir</th>
<th>Nilai Risiko Akhir</th>

</tr>

</thead>

<tbody>

@foreach($data as $row)

@php

$risk = $row->probability * $row->impact;
$final = $row->after_probability * $row->after_impact;

$riskClass = $risk >= 6 ? 'risk-high' : ($risk >= 3 ? 'risk-medium' : 'risk-low');
$finalClass = $final >= 6 ? 'risk-high' : ($final >= 3 ? 'risk-medium' : 'risk-low');

@endphp

<tr>

<td class="text-center">{{ $row->id }}</td>

<td>{{ $row->hazard_description }}</td>

<td>{{ $row->control_explanation }}</td>

<td class="text-center">{{ $row->control_reference }}</td>

<td class="text-center">{{ $row->effectiveness }}</td>

<td class="text-center">{{ $row->responsible_position }}</td>

<td>{{ $row->risk_explanation }}</td>

<td class="text-center">{{ $row->probability }}</td>

<td class="text-center">{{ $row->impact }}</td>

<td class="text-center {{ $riskClass }}">
{{ $risk }}
</td>

<td>{{ $row->action_plan_explanation }}</td>

<td class="text-center">{{ $row->action_plan_reference }}</td>

<td class="text-center">{{ $row->action_plan_responsible }}</td>

<td class="text-center">{{ $row->completion_date }}</td>

<td class="text-center">{{ $row->after_probability }}</td>

<td class="text-center">{{ $row->after_impact }}</td>

<td class="text-center {{ $finalClass }}">
{{ $final }}
</td>

</tr>

@endforeach

</tbody>

</table>

</body>
</html>