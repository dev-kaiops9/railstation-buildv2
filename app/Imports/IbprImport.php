<?php

namespace App\Imports;

use App\Models\IBPR;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;

class IbprImport implements ToModel, WithStartRow, SkipsEmptyRows
{
    private $station_id;

    public function __construct($station_id)
    {
        $this->station_id = $station_id;
    }

    public function startRow(): int
    {
        return 13;
    }

    private function cleanNumber($value)
    {
        if (!$value) {
            return null;
        }

        if (is_numeric($value)) {
            $number = (int) $value;

            if ($number >= 0 && $number <= 5) {
                return $number;
            }
        }

        return null;
    }

    private function cleanDate($value)
    {
        if (!$value) {
            return null;
        }

        try {
            return \Carbon\Carbon::parse($value)->format('Y-m-d');
        } catch (\Exception $e) {
            return null;
        }
    }

    private function detectEffectiveness($t, $s, $r)
    {
        if ($t == 'V') return 'Tinggi';
        if ($s == 'V') return 'Sedang';
        if ($r == 'V') return 'Rendah';

        return null;
    }

    private function cleanText($value)
    {
        if (!$value) {
            return null;
        }

        // jika ada rumus Excel
        if (str_starts_with($value, '=')) {
            return null;
        }

        // jika ada error excel
        if (str_contains($value, '#REF') || str_contains($value, '#N/A')) {
            return null;
        }

        return trim($value);
    }

    public function model(array $row)
    {
        $hazard = $this->cleanText($row[1] ?? null);
        $control = $this->cleanText($row[2] ?? null);
        $risk = $this->cleanText($row[8] ?? null);

        // jika semua kolom utama kosong -> skip
        if (!$hazard && !$control && !$risk) {
            return null;
        }

        $effectiveness = $this->detectEffectiveness(
            $row[4] ?? null,
            $row[5] ?? null,
            $row[6] ?? null
        );

        return new IBPR([

            'station_id' => $this->station_id,

            'hazard_description' => $this->cleanText($row[1] ?? null),
            'control_explanation' => $this->cleanText($row[2] ?? null),
            'control_reference' => $this->cleanText($row[3] ?? null),
            'effectiveness' => $effectiveness,
            'responsible_position' => $this->cleanText($row[7] ?? null),

            'risk_explanation' => $this->cleanText($row[8] ?? null),

            'probability' => $this->cleanNumber($row[9] ?? null),
            'impact' => $this->cleanNumber($row[10] ?? null),

            'action_plan_explanation' => $this->cleanText($row[12] ?? null),
            'action_plan_reference' => $this->cleanText($row[13] ?? null),
            'action_plan_responsible' => $this->cleanText($row[14] ?? null),

            'completion_date' => $this->cleanDate($row[15] ?? null),

            'after_probability' => $this->cleanNumber($row[16] ?? null),
            'after_impact' => $this->cleanNumber($row[17] ?? null),
        ]);
    }

}