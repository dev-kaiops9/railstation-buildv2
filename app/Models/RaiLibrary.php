<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RaiLibrary extends Model
{
    protected $table = 'rai_libraries';
    protected $fillable = [
        'station_id',
        'name',
        'file_path',
        'file_extension',
        'file_size'
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function getFileExtensionAttribute()
    {
        return strtolower(pathinfo($this->file_path, PATHINFO_EXTENSION));
    }

    public function isPdf()
    {
        return $this->file_extension === 'pdf';
    }

    public function getReadableFileSize()
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));

        return round($bytes, 2) . ' ' . $units[$pow];
    }
}
