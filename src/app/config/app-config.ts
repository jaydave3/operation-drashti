export interface AppConfig {
  appName: string;
  tagline: string;
  primaryPasscode: string;
  acceptedPasscodes: string[];
  friendName: string;
  targetName: string;
  hint: string;
}

export const APP_CONFIG: AppConfig = {
  appName: 'Operation Drashti 💗',
  tagline: 'A tiny corner of the internet where you are allowed to smile.',
  primaryPasscode: '1101',
  // Accepts birthday formats (MMDD / DDMM / year / smile) so Drashti easily unlocks her surprise
  acceptedPasscodes: ['1101', '0111', '11/01', '01/11', '2001', 'SMILE'],
  friendName: 'Jay',
  targetName: 'Drashti',
  hint: 'The special 4-digit date when our favorite future MD arrived in this world! (Think of your birthday date 🎂🩺)'
};
