export interface ScalpZoneData {
  id: string;
  name: string;
  symptoms: string;
  causes: string;
  when?: string; // Optional field for "When does it happen?" (specific to female data)
}

export enum ZoneId {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
}

export type Gender = 'male' | 'female';