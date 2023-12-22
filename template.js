// variabel reply-an
const wd = `Aset apa yang ingin anda tarik? Harap memasukan jumlah dan ticker. Misalnya 14500 IDR

Jika anda ingin membatalkan proses penarikan, gunakan perintah /cancel`

const deposit = 
`
Silahkan Pilih Salah Satu Asset 
untuk mendapatkan alamat Deposit`

const pulsa = `Isi pulsa / token listrik otomatis menggunakan saldo mahawallet dengan mudah dan harga terjangkau

Petunjuk: Silakan buka halaman daftar harga dibawah ini sesuai provider yang anda gunakan 
dan klik tombol "Beli" pada produk yang ingin anda beli, maka otomatis akan diarahkan ke mahawallet lalu ikuti semua intruksi transaksi sampai selesai`

const convert = `Aset apa yang ingin anda convert? Harap menggunakan format di bawah ini untuk melakukan penukaran:

┌ [Jumlah] [DariAsset] [KeAsset]
├ Misal 1: 5000 TRX IDR
├ Misal 2: 5000 IDR TRX
└ Misal 3: 0.1 BNB IDR

Jika anda ingin membatalkan proses penukaran, gunakan perintah /cancel`

const referal = `Ingin mendapatkan penghasilan ekstra? Caranya sangat mudah! Referensikan MahaWallet kepada teman, saudara atau rekan kerja anda. Ajak mereka untuk daftar dan transaksi di MahaWallet. Syarat dan ketentuan berlaku Lihat Disini (https://telegra.ph/Sistem-Referral-MahaWallet-11-29)

Link Afiliasi: https://t.me/MahaWalletBot?start=refid25caa8591b874b57f531
• Downline anda: 0 orang
• Bonus undangan: 0 IDR`

const linkRef = `Klik tombol dibawah ini untuk membagikan link undangan`

const bonus = `🎁 Bonus Mingguan
Total Rp 1.000.000,- Setiap Minggu!

Bonus Mingguan adalah bonus yang diberikan setiap hari minggu kepada pengguna mahachanger yang melakukan transaksi dengan minimal transaksi Rp 100.000,- dalam satu periode mingguan tersebut. Transaksi dihitung dari hari minggu hingga sabtu (7 hari), jika anda melakukan transaksi minimal Rp 100.000,- maka berkesempatan mendapatkan bonus ini.

S & K Bonus Mingguan?
•••> Melakukan transaksi minimal Rp 100.000,- dalam 1 minggu (hari minggu hingga sabtu)
•••> Transaksi yang dihitung adalah convert/penukaran crypto (baik crypto ke rupiah ataupun rupiah ke crypto) saja
•••> Wajib follow sosial media mahachanger Instagram (https://instagram.com/mahachanger) dan Facebook (https://facebook.com/mahachanger)
•••> Bonus diberikan kepada 5 pengguna yang beruntung
•••> Besarnya bonus masing-masing pemenang Rp 200.000,-
•••> Diundi setiap hari minggu (periode hari minggu hingga sabtu)
•••> Bonus berupa saldo MahaWallet yang otomatis masuk ke saldo pemenang
•••> Pengguna kemungkinan bisa mendapatkan bonus berulang-ulang (tidak dibatasi)

Sejak kapan bonus ini dimulai?
Pengundian bonus tahap pertama dimulai pada hari minggu kedua di bulan Maret 2022. Bonus akan diberikan setiap minggu hingga batas waktu yang belum ditentukan. Pastikan anda telah memenuhi S & K diatas agar berkesempatan mendapatkan bonus mingguan hingga jutaan rupiah. Tingkatkan terus transaksi anda.`


const tolong = `Apa itu MahaWallet?

MahaWallet merupakan layanan penukaran aset digital crypto dari dan ke rupiah secara cepat dan praktis. MahaWallet secara otomatis membuat alamat dompet crypto untuk anda di beberapa blockchain. Saat ini tersedia: BNB BEP20, BUSD BEP20, TRX, USDT TRC20, SOL dan Rupiah IDR. Nikmati kemudahan bertransaksi mulai dari Rp 10,000 saja.

MahaWallet dikelola oleh Mahachanger dan kami sudah bekerjasama dengan OyIndonesia (https://www.oyindonesia.com/) yang merupakan layanan payment gateway terdaftar dan diawasi bank indonesia. No Perjanjian Kerja Sama: 12/DHB/03/MI/2020`


module.exports = {wd, deposit, pulsa, referal, linkRef, convert, bonus, tolong}