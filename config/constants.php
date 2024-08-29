<?php
// Constants available

return [
    'app' => [
        'isCacheEnabled' => false,
        'cacheUpdateTimeInMinutes' => 5,
    ],
    'user_types' => [
        'student' => 'S',
        'teacher' => 'T',
        'parent' => 'P',
        'administration' => 'A',
        'owner' => 'O',
    ],

    'user_status' => [
        'active' => 1,
        'pending' => 2,
        'rejected' => 3,

        // related to students
        'struck_off' => 4,

    ],
    "pagination_limit" => 40,
];
