"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const now = new Date();

    const campaigns = [
      {
        userId: 1,
        soilId: 1,
        title: "Kampanye Penanaman Pohon di Taman Kota",
        slug: "kampanye-penanaman-pohon-taman-kota",
        image: "https://via.placeholder.com/640x480.png/00ff00?text=Kampanye+1",
        target: 1000000,
        description:
          "<strong>Kampanye penanaman 1000 pohon</strong><p>Kampanye ini bertujuan untuk menanam pohon-pohon hijau di taman-taman kota untuk meningkatkan keindahan dan kualitas udara di lingkungan sekitar.</p>",
        deadline: new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        ),
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 1,
        soilId: 1,
        title: "Kampanye Penanaman Pohon di Sekolah-sekolah",
        slug: "kampanye-penanaman-pohon-sekolah",
        image: "https://via.placeholder.com/640x480.png/00ff00?text=Kampanye+2",
        target: 2000000,
        description:
          "<strong>Kampanye penanaman 2000 pohon</strong><p>Partisipasi dalam kampanye ini akan membantu menyediakan ruang hijau di sekitar sekolah-sekolah, menciptakan lingkungan yang lebih sejuk dan nyaman untuk para siswa.</p>",
        deadline: new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        ),
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 1,
        soilId: 1,
        title: "Kampanye Penanaman Pohon di Perkampungan",
        slug: "kampanye-penanaman-pohon-perkampungan",
        image: "https://via.placeholder.com/640x480.png/00ff00?text=Kampanye+3",
        target: 3000000,
        description:
          "<strong>Kampanye penanaman 3000 pohon</strong><p>Bergabunglah dengan kampanye ini untuk menanam pohon-pohon di perkampungan dan menciptakan lingkungan yang lebih hijau dan alami untuk penduduk setempat.</p>",
        deadline: new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        ),
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 1,
        soilId: 1,
        title: "Kampanye Penanaman Pohon di Pantai",
        slug: "kampanye-penanaman-pohon-pantai",
        image: "https://via.placeholder.com/640x480.png/00ff00?text=Kampanye+4",
        target: 4000000,
        description:
          "<strong>Kampanye penanaman 4000 pohon</strong><p>Bantu menjaga keindahan pantai dengan bergabung dalam kampanye penanaman pohon di sepanjang garis pantai. Pohon-pohon ini akan membantu mencegah abrasi dan menciptakan habitat yang baik bagi flora dan fauna pantai.</p>",
        deadline: new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        ),
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: 1,
        soilId: 1,
        title: "Kampanye Penanaman Pohon di Hutan",
        slug: "kampanye-penanaman-pohon-hutan",
        image: "https://via.placeholder.com/640x480.png/00ff00?text=Kampanye+5",
        target: 5000000,
        description:
          "<strong>Kampanye penanaman 5000 pohon</strong><p>Ikuti kampanye ini untuk membantu memulihkan hutan-hutan yang terdegradasi. Dengan menanam pohon-pohon baru, kita dapat meningkatkan biodiversitas dan menjaga kelestarian lingkungan hutan.</p>",
        deadline: new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        ),
        createdAt: now,
        updatedAt: now,
      },
    ];

    await queryInterface.bulkInsert("Campaigns",campaigns,{});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
