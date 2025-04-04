<x-mail::message>
  <div>
    <h2>Pesan Kontak Baru</h2>

    Nama Depan :{{ $data['first_name'] }}
    Nama Belakang: {{ $data['last_name'] }}
    No. HP: {{ $data['no_hp'] }}
    Email: {{ $data['email'] }}
    Subjek: {{ $data['subject'] }}

    Pesan:
    {{ $data['message'] }}
  </div>


  {{-- <x-mail::button :url="''">
    Button Text
  </x-mail::button> --}}

  Thanks,<br>
  {{ config('app.name') }}
</x-mail::message>