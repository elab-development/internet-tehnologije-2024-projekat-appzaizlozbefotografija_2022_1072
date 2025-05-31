<?php

namespace App\Mail;

use App\Models\Prijava;
use App\Models\Korisnik;
use App\Models\Izlozba;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PotvrdaPrijaveMail extends Mailable
{
    use Queueable, SerializesModels;

    public $prijava;
    public $korisnik;
    public $izlozba;
    public $qrKodBase64;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($prijava, $korisnik, $izlozba, $qrKodBase64)
    {
        $this->prijava = $prijava;
        $this->korisnik = $korisnik;
        $this->izlozba = $izlozba;
        $this->qrKodBase64 = $qrKodBase64;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Potvrda o prijavi na izložbu')
                    ->markdown('emails.potvrda');
    }
}
