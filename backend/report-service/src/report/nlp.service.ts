import { Injectable, OnModuleInit } from '@nestjs/common';
import * as natural from 'natural';

@Injectable()
export class NlpService implements OnModuleInit {
  private classifier: natural.BayesClassifier;

  constructor() {
    // Inisialisasi klasifier bahasa Indonesia
    this.classifier = new natural.BayesClassifier(natural.PorterStemmer);
  }

  onModuleInit() {
    this.trainClassifier();
  }

  private trainClassifier() {
    // Kategori Infrastruktur
    this.classifier.addDocument(
      'jalan depan masjid rusak parah',
      'Infrastruktur',
    );
    this.classifier.addDocument('aspal jalan berlubang', 'Infrastruktur');
    this.classifier.addDocument(
      'jembatan ambruk tidak bisa dilewati',
      'Infrastruktur',
    );
    this.classifier.addDocument(
      'tiang listrik roboh menimpa rumah',
      'Infrastruktur',
    );
    this.classifier.addDocument('paving block jalan hancur', 'Infrastruktur');
    this.classifier.addDocument(
      'lampu jalan mati gelap gulita',
      'Infrastruktur',
    );
    this.classifier.addDocument(
      'saluran air jalan tertutup aspal',
      'Infrastruktur',
    );

    // Kategori Lingkungan (Kebersihan/Bencana)
    this.classifier.addDocument('sampah menumpuk bau busuk', 'Lingkungan');
    this.classifier.addDocument('selokan mampet penuh sampah', 'Lingkungan');
    this.classifier.addDocument('banjir setinggi lutut', 'Lingkungan');
    this.classifier.addDocument(
      'pohon tumbang menghalangi jalan',
      'Lingkungan',
    );
    this.classifier.addDocument(
      'warga membuang sampah sembarangan',
      'Lingkungan',
    );
    this.classifier.addDocument('air sungai kotor dan tercemar', 'Lingkungan');

    // Kategori Keamanan
    this.classifier.addDocument('ada pencurian motor', 'Keamanan');
    this.classifier.addDocument('maling tertangkap warga', 'Keamanan');
    this.classifier.addDocument(
      'keributan antar warga di pos ronda',
      'Keamanan',
    );
    this.classifier.addDocument('balap liar sangat mengganggu', 'Keamanan');
    this.classifier.addDocument('orang mabuk bikin onar', 'Keamanan');

    // Kategori Kesehatan
    this.classifier.addDocument('warga butuh ambulans segera', 'Kesehatan');
    this.classifier.addDocument(
      'banyak warga kena demam berdarah',
      'Kesehatan',
    );
    this.classifier.addDocument('balita gizi buruk', 'Kesehatan');
    this.classifier.addDocument('wabah diare', 'Kesehatan');
    this.classifier.addDocument('posyandu kekurangan obat', 'Kesehatan');

    // Kategori Sosial
    this.classifier.addDocument('warga miskin belum dapat bansos', 'Sosial');
    this.classifier.addDocument('pembagian sembako tidak merata', 'Sosial');
    this.classifier.addDocument('lansia butuh bantuan hidup', 'Sosial');
    this.classifier.addDocument('anak yatim piatu putus sekolah', 'Sosial');

    // kategori Elekrtronik
    this.classifier.addDocument('laptop mati', 'Elektronik');
    this.classifier.addDocument('komputer/laptop/PC mati', 'Elektronik');
    this.classifier.addDocument('mouse mati', 'Elektronik');
    this.classifier.addDocument('keyboard mati', 'Elektronik');
    this.classifier.addDocument('monitor mati', 'Elektronik');
    this.classifier.addDocument('Ricecooker mati', 'Elektronik');
    this.classifier.addDocument('Stop kontak mati', 'Elektronik');

    // Mulai proses training
    this.classifier.train();
  }

  /**
   * Mengembalikan prediksi kategori berdasarkan deskripsi laporan.
   */
  public predictCategory(text: string): string {
    if (!text || text.trim() === '') return 'Lainnya';
    const predicted = this.classifier.classify(text);
    return predicted;
  }
}
