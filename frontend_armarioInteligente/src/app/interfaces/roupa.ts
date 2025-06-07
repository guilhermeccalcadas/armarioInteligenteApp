export interface Roupa {
  _id?: string;          // MongoDB normalmente envia o _id
  nome?: string;
  categoria: 'cabeça' | 'tronco' | 'pernas' | 'calçado';
  fotoUrl?: string;
  cor?: string;
  tamanho: 'XS' | 'S' | 'M' | 'L' | 'XL';
  marca?: string;
  dataUltimoUso?: string;  // em ISO string, podes converter para Date se quiseres
}