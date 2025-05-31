@component('mail::message')
# Potvrda o prijavi

Poštovani {{ $korisnik->ime }},

Uspešno ste se prijavili za izložbu: **{{ $izlozba->naziv }}**.

Datum izložbe: **{{ \Carbon\Carbon::parse($izlozba->datum)->format('d.m.Y') }}**

@component('mail::panel')
Ovo je vaš QR kod za pristup izložbi:
<br>
<img src="data:image/png;base64,{{ $qrKodBase64 }}" alt="QR Kod" />
@endcomponent

Hvala što koristite našu aplikaciju!

@endcomponent
