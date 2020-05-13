export default class Translate {
  constructor(api) {
    this.start(api);
  }
  start(api) {
    if(!api) return console.log('Install the key Yandex translate !');
    this.api = api;
  }

  async checkLanguage(word) {
    if(!this.api) return console.log('Install the key Yandex translate !');
    if (!word) return null;
    const url = `https://translate.yandex.net/api/v1.5/tr.json/detect?key=${this.api}&text=${word}&hint=ru,en`;
    return await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        //console.log(`Слово: '${word}' определен как: ${res.lang}`);
        this.infoTranslate();
        return res.lang !== 'en'? this.getTranslation(word): word;
      });
  }
  async getTranslation(word) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.api}&text=${word}&lang=ru-en`;
    const res = await fetch(url);
    const data = await res.json();

    //console.log(`И '${word}' было переведенно в '${data.text}'`);
    this.infoTranslate(data.lang, data.text);
    return data.text.join(',');
  }

  infoTranslate(lang = null, translateWord = null) {
    let translateObject = document.querySelector('.translate');

    if (lang !== null) {
      translateObject.classList.add('active');
      translateObject.innerText = `Showing results for "${translateWord}"`;
    } else {
      translateObject.classList.remove('active');
      translateObject.innerText = '';
    }
  }
}
