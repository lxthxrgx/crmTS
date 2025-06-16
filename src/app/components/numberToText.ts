export function formatUkrCurrencyText(amount: number): string {
    const ones = [
      '', 'одна', 'дві', 'три', 'чотири', 'п’ять', 'шість', 'сім', 'вісім', 'дев’ять'
    ];
  
    const onesMale = [
      '', 'один', 'два', 'три', 'чотири', 'п’ять', 'шість', 'сім', 'вісім', 'дев’ять'
    ];
  
    const teens = [
      'десять', 'одинадцять', 'дванадцять', 'тринадцять', 'чотирнадцять',
      'п’ятнадцять', 'шістнадцять', 'сімнадцять', 'вісімнадцять', 'дев’ятнадцять'
    ];
  
    const tens = [
      '', '', 'двадцять', 'тридцять', 'сорок', 'п’ятдесят', 'шістдесят',
      'сімдесят', 'вісімдесят', 'дев’яносто'
    ];
  
    const hundreds = [
      '', 'сто', 'двісті', 'триста', 'чотириста',
      'п’ятсот', 'шістсот', 'сімсот', 'вісімсот', 'дев’ятсот'
    ];
  
    const forms = {
      thousand: ['тисяча', 'тисячі', 'тисяч'],
      million: ['мільйон', 'мільйони', 'мільйонів'],
      billion: ['мільярд', 'мільярди', 'мільярдів'],
      hryvnia: ['гривня', 'гривні', 'гривень'],
      hrn: ['грн.'],
      coin: ['копійка', 'копійки', 'копійок'],
      coin2: ['коп.']
    };
  
    function getWordForm(n: number, form: string[]): string {
      const lastDigit = n % 10;
      const lastTwo = n % 100;
      if (lastTwo > 10 && lastTwo < 20) return form[2];
      if (lastDigit === 1) return form[0];
      if (lastDigit >= 2 && lastDigit <= 4) return form[1];
      return form[2];
    }
  
    function convertTriad(n: number, isFemale: boolean): string {
      const h = Math.floor(n / 100);
      const t = Math.floor((n % 100) / 10);
      const o = n % 10;
      let words = [];
  
      if (h > 0) words.push(hundreds[h]);
      if (t === 1) {
        words.push(teens[o]);
      } else {
        if (t > 1) words.push(tens[t]);
        if (o > 0) words.push((isFemale ? ones : onesMale)[o]);
      }
  
      return words.join(' ');
    }
  
    function splitNumber(num: number): [number, number] {
      const hryvnia = Math.floor(num);
      const coins = Math.round((num - hryvnia) * 100);
      return [hryvnia, coins];
    }
  
    function convertFull(n: number): string {
      if (n === 0) return 'нуль';
      const parts: string[] = [];
  
      const billions = Math.floor(n / 1_000_000_000);
      const millions = Math.floor((n % 1_000_000_000) / 1_000_000);
      const thousands = Math.floor((n % 1_000_000) / 1000);
      const rest = n % 1000;
  
      if (billions) parts.push(convertTriad(billions, false) + ' ' + getWordForm(billions, forms.billion));
      if (millions) parts.push(convertTriad(millions, false) + ' ' + getWordForm(millions, forms.million));
      if (thousands) parts.push(convertTriad(thousands, true) + ' ' + getWordForm(thousands, forms.thousand));
      if (rest) parts.push(convertTriad(rest, false));
  
      return parts.join(' ');
    }
  
    const [hryvnia, coins] = splitNumber(amount);
  
    // const hryvniaText = '(' + convertFull(hryvnia) + ')' + ' ' + getWordForm(hryvnia, forms.hrn);
    const hryvniaText = '(' + convertFull(hryvnia) + ') грн.';
    const coinStr = coins.toString().padStart(2, '0');
    // const coinText = coinStr + ' ' + getWordForm(coins, forms.coin);
    const coinText = coinStr + ' коп.';
  
    return `${capitalize(hryvniaText)} ${coinText}`;
  }
  
  function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  

export function AreaToText()
{

}