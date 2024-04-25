<?php

function phone_format ($phone) {
    $phone = preg_replace('/[^0-9]/', '', $phone);
    $phone = preg_replace('/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/', '+$1 ($2) $3-$4-$5', $phone);
    return $phone;
}

?>