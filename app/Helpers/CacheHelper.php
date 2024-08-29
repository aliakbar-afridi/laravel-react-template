<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Cache;

class CacheHelper
{

    public static function getCache($key, $callback, $tags = [])
    {
        $isCacheEnabled = config('constants.isCacheEnabled');
        if ($isCacheEnabled) {
            $cacheUpdateTimeInMinutes = (int) config('constants.cacheUpdateTimeInMinutes');
            $cacheUpdateTimeInMinutes *= 60;
            return Cache::remember($key, $cacheUpdateTimeInMinutes, $callback);
        } else {
            return $callback();
        }
    }
}
