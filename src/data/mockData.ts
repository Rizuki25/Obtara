import type { DoseOccurrence, Medication, Profile } from '../domain/types'

function atToday(hour: number, minute = 0) {
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export const mockProfile: Profile = {
  id: 'profile-rizqie',
  name: 'Rizqie (Saya)',
  shortName: 'Rizqie',
}

const images = {
  blisterBlue: {
    src: '/images/medications/blister-blue.jpg',
    alt: 'Foto demo berbagai obat dalam kemasan blister',
    label: 'Foto demo obat / fisik tablet',
    credit: 'Foto demo: Volodymyr Hryshchenko · Unsplash',
  },
  blisterRed: {
    src: '/images/medications/blister-red.jpg',
    alt: 'Foto demo kemasan blister obat berwarna putih dan merah',
    label: 'Foto demo dus / label kemasan',
    credit: 'Foto demo: Melany · Unsplash',
  },
  blisterPack: {
    src: '/images/medications/blister-pack.jpg',
    alt: 'Foto demo kemasan obat berbentuk blister',
    label: 'Foto demo obat / fisik tablet',
    credit: 'Foto demo: Brett Jordan · Unsplash',
  },
  pillsOrange: {
    src: '/images/medications/pills-orange.jpg',
    alt: 'Foto demo obat dan kapsul dalam kemasan',
    label: 'Foto demo obat / fisik',
    credit: 'Foto demo: Anna Shvets · Pexels',
  },
  assorted: {
    src: '/images/medications/assorted-pills.jpg',
    alt: 'Foto demo pil dan tablet beragam warna',
    label: 'Foto demo dus / label kemasan',
    credit: 'Foto demo: Melany · Unsplash',
  },
}

export const medications: Medication[] = [
  {
    id: 'med-amlodipine',
    name: 'Amlodipine Besylate',
    brand: 'Norvask / Generik',
    strength: '10 mg',
    form: 'Tablet',
    amountPerDose: '1 tablet',
    instructions: 'Sesudah makan',
    location: 'Kotak Obat Utama · Laci 1 (Label Merah)',
    note: 'Diminum pagi hari untuk menjaga tekanan darah stabil.',
    visualLabel: 'A',
    tint: 'purple',
    stock: 18,
    images: [images.blisterBlue, images.assorted],
  },
  {
    id: 'med-allopurinol',
    name: 'Allopurinol',
    brand: 'Generik',
    strength: '100 mg',
    form: 'Tablet',
    amountPerDose: '1 tablet',
    instructions: 'Sesudah makan',
    location: 'Kotak Obat Ayah · Meja Samping Tempat Tidur',
    note: 'Periksa label dan jumlah tablet sebelum mengonfirmasi.',
    visualLabel: 'AL',
    tint: 'sky',
    stock: 18,
    images: [images.blisterRed, images.blisterPack],
  },
  {
    id: 'med-metformin',
    name: 'Metformin HCl',
    brand: 'Generik',
    strength: '500 mg',
    form: 'Tablet',
    amountPerDose: '1 tablet',
    instructions: 'Saat makan',
    location: 'Meja Makan · Wadah Biru',
    note: 'Gunakan bersama makanan sesuai instruksi pada label.',
    visualLabel: 'M',
    tint: 'purple',
    stock: 24,
    images: [images.assorted, images.blisterBlue],
  },
  {
    id: 'med-salbutamol',
    name: 'Salbutamol Inhaler',
    brand: 'Ventolin / Generik',
    strength: '2 semprot',
    form: 'Puff',
    amountPerDose: '2 puff',
    instructions: 'Bebas',
    location: 'Tas Kerja · Kantong Depan',
    note: 'Ikuti petunjuk penggunaan inhaler pada kemasan.',
    visualLabel: 'S',
    tint: 'orange',
    stock: 16,
    images: [images.pillsOrange, images.blisterRed],
  },
]

export const initialOccurrences: DoseOccurrence[] = [
  {
    id: 'dose-amlodipine-morning',
    medicationId: 'med-amlodipine',
    profileName: 'Ibu Sumarni',
    profileTint: 'purple',
    scheduledAt: atToday(7, 0),
    status: 'unconfirmed',
  },
  {
    id: 'dose-allopurinol-morning',
    medicationId: 'med-allopurinol',
    profileName: 'Ayah Budi',
    profileTint: 'sky',
    scheduledAt: atToday(8, 0),
    status: 'confirmed',
    actionedAt: atToday(8, 7),
  },
  {
    id: 'dose-metformin-noon',
    medicationId: 'med-metformin',
    profileName: 'Ibu Sumarni',
    profileTint: 'purple',
    scheduledAt: atToday(13, 0),
    status: 'due',
  },
  {
    id: 'dose-salbutamol-noon',
    medicationId: 'med-salbutamol',
    profileName: 'Rizqie (Saya)',
    profileTint: 'teal',
    scheduledAt: atToday(12, 0),
    status: 'snoozed',
    remindAt: atToday(12, 30),
  },
  {
    id: 'dose-metformin-night',
    medicationId: 'med-metformin',
    profileName: 'Ibu Sumarni',
    profileTint: 'purple',
    scheduledAt: atToday(19, 0),
    status: 'scheduled',
  },
]
