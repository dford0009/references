var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = '/numInfo';
const numEl = document.getElementById('num');
const submitEl = document.getElementById('num-form');
const answerEl = document.getElementById('answer');
submitEl.addEventListener('submit', fetchCalculation);
function fetchCalculation(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const url = `${API_URL}/${numEl.value}`;
        const response = yield fetch(url);
        const numInfo = yield response.json();
        const numInfoEl = createNumInfoEl(numInfo);
        answerEl.innerHTML = '';
        answerEl.appendChild(numInfoEl);
    });
}
function createNumInfoEl(numInfo) {
    const rootEl = document.createElement('div');
    const numDigitsEl = document.createElement('div');
    const isEvenEl = document.createElement('div');
    const isPrimeEl = document.createElement('div');
    rootEl.appendChild(numDigitsEl);
    rootEl.appendChild(isEvenEl);
    rootEl.appendChild(isPrimeEl);
    numDigitsEl.innerText = `Number of digits: ${numInfo.numDigits}`;
    isEvenEl.innerText = `Is Even: ${numInfo.isEven}`;
    isPrimeEl.innerText = `Is Prime: ${numInfo.isPrime}`;
    return rootEl;
}
