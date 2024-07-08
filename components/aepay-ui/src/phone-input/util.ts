import { AsYouType } from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/metadata.full.json';
import type { CountryCode, MetadataJson } from 'libphonenumber-js/core';

class PhoneCore {
  private metadata: MetadataJson;
  private prefix: string = '+';

  constructor(metadata: MetadataJson) {
    this.metadata = metadata;
  }

  formatCountryCallingCodePrefix(code: string) {
    return `${this.prefix}${code}`;
  }

  get countryCallingCodes() {
    return Object.keys(this.metadata.country_calling_codes);
  }

  get countryCodes() {
    return Object.keys(this.metadata.countries).filter((_) => _ !== '001');
  }

  formatNumber(num: string, splitChar: string) {
    if (typeof num !== 'string') {
      return '';
    }

    const [callingCode, phone] = num.split(splitChar);
    const asYouType = this.asYouType(callingCode);
    asYouType.input(phone);
    return asYouType.getNumber().formatInternational();
  }

  isSupportedCountry(countryCode: CountryCode): boolean {
    return this.metadata.countries.hasOwnProperty(countryCode);
  }

  getCountry(countryCode: CountryCode) {
    if (this.isSupportedCountry(countryCode)) {
      return this.metadata.countries[countryCode];
    }

    return null;
  }

  getCountryCallingCode(countryCode: string) {
    const country = this.getCountry(countryCode as CountryCode);
    return country ? country[0] : null;
  }

  getCountryCallingCodes(searchText?: string): string[] {
    if (!searchText) {
      return this.countryCallingCodes;
    }

    let query = searchText.trim();

    if (query.startsWith(this.prefix)) {
      query = query.slice(this.prefix.length);
    }

    if (/^[a-zA-Z]+$/.test(query)) {
      return this.countryCodes
        .filter((country) => country === query.toUpperCase())
        .map((key) => this.getCountryCallingCode(key))
        .filter(Boolean);
    }

    return this.countryCallingCodes.filter((code) => code.indexOf(query) >= 0);
  }

  asYouType(callingCode: string) {
    return new AsYouType({ defaultCallingCode: callingCode }, this.metadata);
  }

  getCallingCode(code: string) {
    if (code && code.indexOf(this.prefix) >= 0) {
      return code.slice(this.prefix.length);
    }

    return code;
  }

  isValidPhoneNumber(callingCode: string, nationalNumber: string): boolean {
    const asYouType = this.asYouType(callingCode);
    asYouType.input(nationalNumber);
    return asYouType.isValid();
  }
}

export default new PhoneCore(metadata);
