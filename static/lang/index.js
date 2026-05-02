import Vue from 'vue'
// 引入 多语言包
import VueI18n from 'vue-i18n'
import zh from './zh.js'
import en from './en.js'
import sp from './sp.js'
import al from './al.js'
import jp from './jp.js'
import ro from './ro.js'
import ru from './ru.js'


Vue.use(VueI18n)

// 创建实例
const i18n = new VueI18n({
    locale: uni.getStorageSync('lang') ? uni.getStorageSync('lang') : "en",
    messages: {
        zh, en, sp, al, jp, ro, ru
    }
});

export default i18n;