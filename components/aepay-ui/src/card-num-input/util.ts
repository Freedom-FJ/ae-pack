const cardBrandMap: Record<string, (v: string) => boolean> = {
  amex(v: string) {
    return /^3[47]/.test(v);
  },
  mastercard(v: string) {
    if (/^5[1-5]/.test(v)) {
      return true;
    }
    if (v.length >= 6) {
      const num = parseInt(v.slice(0, 6));
      if ((num >= 222100 && num <= 229236) || (num >= 229240 && num <= 272099)) {
        return true;
      }
    }

    return false;
  },
  maestro(v: string) {
    return (
      /^[5][0]/.test(v) ||
      /^5[6-9]/.test(v) ||
      /^6[0-9]/.test(v) ||
      /^218441/.test(v) ||
      /^229237/.test(v) ||
      /^229238/.test(v) ||
      /^229239/.test(v)
    );
  },
  visa(v: string) {
    return /^[4]/.test(v);
  },
  jcb(v: string) {
    if (v.length >= 6) {
      const num = parseInt(v.slice(0, 6));
      if (num >= 352800 && num <= 358999) {
        return true;
      }
    }
    return false;
  },
  discover(v: string) {
    return (
      /^60110[0-9]/.test(v) ||
      /^6011[2-4][0-9]/.test(v) ||
      /^601174/.test(v) ||
      /^60117[7-9]/.test(v) ||
      /^60118[6-9]|^60119[0-9]/.test(v) ||
      /^64[4-9][0-9][0-9][0-9]/.test(v) ||
      /^6500[0-3]0/.test(v)
    );
  },
  diners(v: string) {
    return (
      /^30[0-5][0-9][0-9][0-9]/.test(v) ||
      /^3095[0-9][0-9]/.test(v) ||
      /^36[0-9][0-9][0-9][0-9]/.test(v)
    );
  },
  mir(v: string) {
    return /^220/.test(v) || /^676454/.test(v) || /^676531/.test(v) || /^676884/.test(v);
  },
  hipercard(v: string) {
    return (
      /^384100/.test(v) ||
      /^384140/.test(v) ||
      /^384160/.test(v) ||
      /^606282/.test(v) ||
      /^637095/.test(v) ||
      /^637568/.test(v) ||
      /^637599/.test(v) ||
      /^637609/.test(v) ||
      /^637612/.test(v)
    );
  },
  elo(v: string) {
    if (v.length >= 6) {
      const num = parseInt(v.slice(0, 6));
      if (
        /^40117[8-9]/.test(v) ||
        /^431274/.test(v) ||
        /^438935/.test(v) ||
        /^451416/.test(v) ||
        /^457393/.test(v) ||
        /^45763[1-2]/.test(v) ||
        /^504175/.test(v) ||
        (num >= 506699 && num <= 506778) ||
        /^509[0-9][0-9][0-9]/.test(v) ||
        /^627780/.test(v) ||
        /^636297/.test(v) ||
        /^63636[8-9]/.test(v) ||
        /^65003[1-3]/.test(v) ||
        (num >= 650035 && num <= 650051) ||
        (num >= 650405 && num <= 650439) ||
        (num >= 650485 && num <= 650538) ||
        (num >= 650541 && num <= 650598) ||
        /^6507[0-1][0-8]/.test(v) ||
        (num >= 650901 && num <= 650920) ||
        (num >= 651652 && num <= 651679) ||
        /^6550[0-1][0-9]/.test(v) ||
        (num >= 655021 && num <= 655058)
      ) {
        return true;
      }
    }
    return false;
  },
  troy(v: string) {
    return /^9792\d{12}$/.test(v);
  },
};

const CardHelper = {
  /**
   * from '1332DS22323232AB9999' to '1332 2232 3232 9999'
   * @param value
   */
  cardNumFormat(value: string) {
    let cardNum = value || '';
    cardNum = cardNum && cardNum.replace(/\D/g, '');
    const cardBrand = this.getBrand(cardNum);
    cardNum = cardNum && this.preFromatCardNum(cardNum, cardBrand);
    return cardNum;
  },

  /**
   * 在卡号输入的过程中，提前预判卡品牌，对输入进行格式化
   * @param {string<number>} cardNum 纯数字组成的卡号
   * @param {string} cardBrand
   */
  preFromatCardNum(cardNum: string, cardBrand: string) {
    let formattedCardNum = cardNum;
    switch (cardBrand) {
      case 'amex':
        if (formattedCardNum.length > 4) {
          formattedCardNum = formattedCardNum.replace(/(\d{4})(?=\d)/, '$1 ');
        }
        if (formattedCardNum.length > 11) {
          formattedCardNum = formattedCardNum.replace(/(\d{4})\s(\d{6}(?=\d))/, '$1 $2 ');
        }
        break;
      case 'diners':
        if (formattedCardNum.length > 5) {
          formattedCardNum = formattedCardNum.replace(/(\d{5})(?=\d)/, '$1 ');
        }
        if (formattedCardNum.length > 10) {
          formattedCardNum = formattedCardNum.replace(/(\d{5})\s(\d{4}(?=\d))/, '$1 $2 ');
        }
        if (formattedCardNum.length > 16) {
          formattedCardNum = formattedCardNum.replace(
            /(\d{5})\s(\d{4})\s(\d{5}(?=\d))/,
            '$1 $2 $3 '
          );
        }
        break;
      default:
        formattedCardNum = formattedCardNum.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        break;
    }
    return formattedCardNum;
  },

  /**
   * 根据卡号来判断卡品牌，必须是纯数字的卡号
   * @param {string} cardNum
   */
  getBrand(cardNum: string) {
    let cardBrand = 'other';
    Object.keys(cardBrandMap).forEach((brand) => {
      const brandRule = cardBrandMap[brand];
      if (brandRule(cardNum)) cardBrand = brand;
    });

    return cardBrand;
  },

  /**
   * 移除卡有效期中多余的内容
   * @param {string} value
   */
  expiresFormat(value: string) {
    let expires = value;
    expires = expires.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/');
    if (expires.length > 5) {
      expires = expires.slice(0, 5);
    }
    return expires;
  },

  /**
   * 校验输入的是否是有效卡号，可以是带空格的字符串
   * @param {string} value
   */
  cardNumberValidate(value: string) {
    value = value || '';
    if (value.length === 0) {
      return false;
    }
    value = value.replace(/\s+/g, '');
    let nCheck = 0;
    let nDigit = 0;
    let bEven = false;
    for (let n = value.length - 1; n >= 0; n--) {
      const cDigit = value.charAt(n);
      nDigit = parseInt(cDigit, 10);
      if (bEven) {
        nDigit *= 2;
        if (nDigit > 9) nDigit -= 9;
      }
      nCheck += nDigit;
      bEven = !bEven;
    }
    return nCheck % 10 === 0;
  },
};

export default CardHelper;
