'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('PaymentInstructions', [
      {
        paymentId: 1,
        title: 'BNI Internet Banking',
        body: `<ol style='list-style: decimal;'><li>Masuk ke Halaman website internet banking BNI (ibank.bni.co.id).</li><li>Masuk ke akun kamu dengan mengisi User ID dan PIN internet banking kamu.</li><li>Pilih menu 'Transfer' lalu pilih 'Virtual Account Billing'.</li><li>Masukkan nomor Virtual Account AksiHijau yang tertera lalu pilih 'Lanjut'.</li><li>Konfirmasi dengan input Otentikasi Token.</li><li>Transaksi selesai, mohon simpan nomor invoice sebagai bukti pembayaran.</li></ol>`
      },
      {
        paymentId: 1,
        title: 'ATM BNI',
        body: `<ol style='list-style: decimal;'> <li> Masukkan kartu ATM BNI dan PIN ATM BNI kamu. </li> <li> Masuk ke akun kamu dengan mengisi User ID dan PIN internet banking kamu. </li> <li> Pilih menu 'VIRTUAL ACCOUNT BILLING' Masukkan nomor Virtual Account AksiHijau. </li> <li> Cek nama dan nominal pembayaran, apabila telah sesuai pilih 'Benar'. </li> <li> Transaksi selesai, pilih 'Tidak' untuk tidak melanjutkan transaksi lain. </li> <li> Terakhir jangan lupa ambil kartu ATM BNI kamu. </li> </ol>`
      },
      {
        paymentId: 2,
        title: 'BCA Internet Banking (KlikBCA)',
        body: `<ol style='list-style: decimal;'> <li> Masuk ke halaman website KlikBCA (https://klikbca.com) dan pilih menu 'Login Individual'. </li> <li> Masuk ke akun KlikBCA kamu dengan mengisi User ID dan PIN Internet Banking kamu. </li> <li> Pilih menu 'Transfer ke BCA Virtual Account'. </li> <li> Masukkan nomor Virtual Account AksiHijau yang tertera lalu pilih 'Lanjutkan'. </li> <li> Cek nama dan nominal pembayaran, apabila telah sesuai pilih 'Lanjutkan'. </li> <li> Masukkan respon KeyBCA APPLI 1 yang muncul pada Token BCA lalu pilih 'Kirim'. </li> <li> Transaksi selesai, mohon simpan nomor invoice sebagai bukti pembayaran. </li> </ol>`
      },
      {
        paymentId: 2,
        title: 'ATM BCA',
        body: `<ol style='list-style: decimal;'> <li> Masukkan kartu ATM BCA dan PIN ATM BCA kamu. </li> <li> Pilih menu 'Transaksi Lainnya' lalu. </li> <li> Pilih menu 'Transfer' lalu pilih 'Ke Rek. BCA Virtual Account'. </li> <li> Klik Input No Virtual Account dan masukkan nomor Virtual Account AksiHijau lalu klik 'OK'. </li> <li> Cek nama dan nominal pembayaran, apabila telah sesuai pilih 'Benar'. </li> <li> Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih 'Ya', atau pilih 'Tidak' jika data di layar masih salah. </li> <li> Transaksi selesai, pilih 'Tidak' untuk tidak melanjutkan transaksi lain. </li> <li> Terakhir jangan lupa ambil Kartu ATM BCA kamu. </li> </ol>`
      },
      {
        paymentId: 3,
        title: 'BRI Internet Banking',
        body: `<ol style='list-style: decimal;'> <li> Masuk ke Halaman website internet banking BRI (ib.bri.co.id). </li> <li> Masuk ke akun kamu dengan mengisi User ID dan PIN internet banking kamu. </li> <li> Pilih menu 'Pembayaran' lalu pilih 'BRIVA'. </li> <li> Masukkan nomor Virtual Account AksiHijau yang tertera lalu masukkan nominal yang akan dibayarkan. </li> <li> Masukkan Password dan Mtoken Kamu. </li> <li> Transaksi selesai, mohon simpan nomor invoice sebagai bukti pembayaran. </li> </ol>`
      },
      {
        paymentId: 3,
        title: 'ATM BRI',
        body: `<ol style='list-style: decimal;'> <li> Masukkan kartu ATM BRI dan PIN ATM BRI kamu. </li> <li> Pilih 'Menu Lainnya' lalu pilih menu 'Pembayaran'. </li> <li> Pilih 'BRIVA' lalu masukkan nomor Virtual Account AksiHijau lalu tekan 'Benar'. </li> <li> Cek nama dan nominal pembayaran, apabila telah sesuai pilih 'Ya'. </li> <li> Transaksi selesai, pilih 'Tidak' untuk tidak melanjutkan transaksi lain. </li> <li> Terakhir jangan lupa ambil kartu ATM BRI kamu. </li> </ol>`
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
