<div>
  <h2>Pesan Kontak Baru</h2>

  <p><strong>Nama Depan:</strong> {{ $data['first_name'] }}</p>
  <p><strong>Nama Belakang:</strong> {{ $data['last_name'] }}</p>
  <p><strong>No. HP:</strong> {{ $data['no_hp'] }}</p>
  <p><strong>Email:</strong> {{ $data['email'] }}</p>
  <p><strong>Subjek:</strong> {{ $data['subject'] }}</p>

  <hr>

  <p><strong>Pesan:</strong></p>
  <p>{{ $data['message'] }}</p>
</div>